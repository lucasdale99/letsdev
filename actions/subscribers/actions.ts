"use server";

import { parseWithZod } from "@conform-to/zod";
import { SubscriberForm, subscriberSchema } from "./subscriber.schema";
import { db } from "@/lib/db";
import { mail } from "@/utils/email";
import Subscribed from "@/email/Subscribed";
import { subscribersTable } from "@/lib/schema";

export async function save(email: SubscriberForm) {
  await db.insert(subscribersTable).values(email);
}

export async function addSubscriber(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: subscriberSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  let data = submission.value;

  await save(data);
  await mail(Subscribed, {
    subject: `Thanks for Subscribing!`,
    to: [data.email],
    props: {
      email: data.email,
    },
  });
}
