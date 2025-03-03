"use server";

import { db } from "../db";
import { subscribersTable } from "../schema";
import { eq } from "drizzle-orm";

export type SubscriberInput = typeof subscribersTable.$inferInsert;
export type Subscriber = typeof subscribersTable.$inferSelect;

export async function createSubscriber(data: SubscriberInput) {
  try {
    const result = await db.insert(subscribersTable).values(data);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getSubscribers() {
  try {
    const result = await db.select().from(subscribersTable);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteSubscriber(id: string) {
  try {
    const result = await db
      .delete(subscribersTable)
      .where(eq(subscribersTable.id, id));
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getSubscriberByEmail(email: string) {
  try {
    const result = await db
      .select()
      .from(subscribersTable)
      .where(eq(subscribersTable.email, email));
    return { success: true, data: result[0] };
  } catch (error) {
    return { success: false, error };
  }
}
