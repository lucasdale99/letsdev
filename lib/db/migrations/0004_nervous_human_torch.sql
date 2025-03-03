CREATE TABLE IF NOT EXISTS "work_experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"start_date" varchar(255) NOT NULL,
	"end_date" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs_table" ADD COLUMN "published" boolean DEFAULT false NOT NULL;