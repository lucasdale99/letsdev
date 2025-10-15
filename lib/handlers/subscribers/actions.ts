"use server";

import { parseWithZod } from "@conform-to/zod";
import { SubscriberForm, subscriberSchema } from "./subscriber.schema";
import { mail } from "@/utils/email";
import { Subscribed, Unsubscribed } from "@/lib/emails";
import {
  createSubscriber,
  deleteSubscriber,
  getSubscriberByEmail,
} from "@/lib/db/actions/subscriber";
import { Post, PostNotificationEmail } from "@/lib/emails/postNotification";
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import React from "react";
import { render } from "@react-email/render";

type ActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function save(email: SubscriberForm): Promise<ActionResponse> {
  try {
    // Check if already subscribed
    const existing = await getSubscriberByEmail(email.email);

    if (existing.data) {
      return {
        status: "error",
        message: "This email is already subscribed to the newsletter.",
      };
    }

    const result = await createSubscriber(email);

    return {
      status: result.success ? "success" : "error",
      message: "Successfully subscribed to the newsletter!",
    };
  } catch (error) {
    console.error("Error saving subscriber:", error);
    return {
      status: "error",
      message: "Failed to subscribe. Please try again later.",
    };
  }
}

export async function unsubscribe(email: string): Promise<ActionResponse> {
  try {
    // Check if email exists before unsubscribing
    const existing = await getSubscriberByEmail(email);

    if (!existing.data) {
      return {
        status: "error",
        message: "Could not find subscriber with this email.",
      };
    }

    const result = await deleteSubscriber(existing.data.id);

    return {
      status: result.success ? "success" : "error",
      message: "Successfully unsubscribed from the newsletter.",
    };
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return {
      status: "error",
      message: "Failed to unsubscribe. Please try again later.",
    };
  }
}

export async function addSubscriber(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: subscriberSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const result = await save(submission.value);

  if (result.status === "success") {
    await mail(Subscribed, {
      subject: `Thanks for Subscribing!`,
      to: [submission.value.email],
      props: {
        email: submission.value.email,
      },
    });
  }
  return result;
}

export async function removeSubscriber(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: subscriberSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const result = await unsubscribe(submission.value.email);
  if (result.status === "success") {
    await mail(Unsubscribed, {
      subject: `Sorry to see you go!`,
      to: [submission.value.email],
      props: {
        email: submission.value.email,
      },
    });
  } else {
    return result;
  }
}

export async function sendNewPostEmail({
  post,
  to,
  subject,
  html,
  text,
}: {
  post: Post;
  to: string | string[];
  subject?: string;
  html?: string;
  text?: string;
}) {
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
  if (!region) throw new Error("AWS region not configured (AWS_REGION)");

  const client = new SESClient({ region });

  const from = process.env.SES_FROM_ADDRESS || process.env.EMAIL_FROM;
  if (!from) throw new Error("SES_FROM_ADDRESS (or EMAIL_FROM) is not set");

  const recipients = Array.isArray(to) ? to : [to];

  const defaultSubject = subject ?? `New post published: ${post.title}`;

  const defaultHtml =
    html ??
    (await render(React.createElement(PostNotificationEmail, { post }), {
      pretty: true,
    }));

  const params = {
    Source: from,
    Destination: { ToAddresses: recipients },
    Message: {
      Subject: { Data: defaultSubject },
      Body: {
        Html: { Data: defaultHtml },
        ...(text ? { Text: { Data: text } } : {}),
      },
    },
  };

  const command = new SendEmailCommand(params);
  const res = await client.send(command);
  return res.MessageId;
}
