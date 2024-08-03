DO $$ BEGIN
 CREATE TYPE "public"."task_priority" AS ENUM('trivial', 'moderate', 'critical');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"user_id" text NOT NULL,
	"icon" text NOT NULL,
	"folder_id" uuid NOT NULL,
	"is_archived" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_assignee" (
	"id" text PRIMARY KEY NOT NULL,
	"column_id" text NOT NULL,
	"task_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_column" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"title" text NOT NULL,
	"is_archived" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_task" (
	"id" varchar(5) PRIMARY KEY NOT NULL,
	"column_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"is_archived" boolean DEFAULT false,
	"priority" "task_priority" DEFAULT 'moderate',
	"due_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"user_id" text NOT NULL,
	"folder_id" uuid NOT NULL,
	"is_archived" boolean DEFAULT false,
	"priority" "task_priority" DEFAULT 'moderate',
	"due_date" timestamp,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_item" (
	"id" varchar(5) PRIMARY KEY NOT NULL,
	"parent_id" varchar(5),
	"title" text NOT NULL,
	"is_completed" boolean DEFAULT false,
	"priority" "task_priority" DEFAULT 'moderate'
);
--> statement-breakpoint
ALTER TABLE "workspace" RENAME COLUMN "banner_url" TO "icon";--> statement-breakpoint
ALTER TABLE "folder" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_folder_id_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_folder_id_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "assignee_column_idx" ON "project_assignee" USING btree ("column_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "assignee_task_idx" ON "project_assignee" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_workspace_idx" ON "task" USING btree ("folder_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_user_idx" ON "task" USING btree ("user_id");