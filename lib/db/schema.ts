import {
  pgTable,
  serial,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const blogsTable = pgTable("blogs_table", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull(),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  published: boolean("published").notNull().default(false),
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

export const blogLikesTable = pgTable(
  "blog_likes",
  {
    id: serial("id").primaryKey(),
    blogId: integer("blog_id")
      .notNull()
      .references(() => blogsTable.id, { onDelete: "cascade" }),
    anonymousId: text("anonymous_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      // Create a unique constraint to prevent duplicate likes
      uniqueLike: uniqueIndex("unique_blog_like").on(
        table.blogId,
        table.anonymousId
      ),
    };
  }
);

export type SelectBlog = typeof blogsTable.$inferSelect;
export type InsertSubscriber = typeof subscribersTable.$inferInsert;
export type WorkExperience = typeof workExperienceTable.$inferSelect;
export type NewWorkExperience = typeof workExperienceTable.$inferInsert;
export type InsertBlog = typeof blogsTable.$inferInsert;

export const insertBlogSchema = createInsertSchema(blogsTable, {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  views: z.number().optional(),
  likes: z.number().optional(),
  published: z.boolean().optional().default(false),
  slug: z.string().optional(),
});
export const insertSubscriberSchema = createInsertSchema(subscribersTable);
