import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

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

export type InsertBlog = typeof blogsTable.$inferInsert;
export type SelectBlog = typeof blogsTable.$inferSelect;
