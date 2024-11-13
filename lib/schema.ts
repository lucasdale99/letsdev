import {
  pgTable,
  serial,
  uuid,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const blogsTable = pgTable("blogs_table", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const subscribersTable = pgTable("subscribers_table", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const workExperienceTable = pgTable("work_experience", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  startDate: varchar("start_date", { length: 255 }).notNull(),
  endDate: varchar("end_date", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type SelectBlog = typeof blogsTable.$inferSelect;
export type InsertSubscriber = typeof subscribersTable.$inferInsert;
export type WorkExperience = typeof workExperienceTable.$inferSelect;
export type NewWorkExperience = typeof workExperienceTable.$inferInsert;
