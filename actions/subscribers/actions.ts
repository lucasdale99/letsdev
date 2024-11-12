"use server";

import { parseWithZod } from "@conform-to/zod";
import { SubscriberForm, subscriberSchema } from "./subscriber.schema";
import { mail } from "@/utils/email";
import { Subscribed, Unsubscribed } from "@/emails";
import {
  createSubscriber,
  deleteSubscriber,
  getSubscriberByEmail,
} from "@/lib/actions/subscriber";

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
    console.log(result);
    return result;
  }
}
