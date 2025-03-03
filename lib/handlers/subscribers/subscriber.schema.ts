import { z } from "zod";

export const subscriberSchema = z.object({
  email: z.string().email(),
});

export type SubscriberForm = z.infer<typeof subscriberSchema>;
