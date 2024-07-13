ALTER TABLE "folder" RENAME COLUMN "icon_id" TO "icon";--> statement-breakpoint
ALTER TABLE "folder" RENAME COLUMN "in_trash" TO "is_archived";--> statement-breakpoint
ALTER TABLE "note" RENAME COLUMN "logo" TO "icon";--> statement-breakpoint
ALTER TABLE "note" RENAME COLUMN "data" TO "content";--> statement-breakpoint
ALTER TABLE "note" RENAME COLUMN "in_trash" TO "is_archived";--> statement-breakpoint
ALTER TABLE "workspace" RENAME COLUMN "workspace_owner" TO "userId";--> statement-breakpoint
ALTER TABLE "folder" DROP COLUMN IF EXISTS "data";--> statement-breakpoint
ALTER TABLE "folder" DROP COLUMN IF EXISTS "logo";--> statement-breakpoint
ALTER TABLE "folder" DROP COLUMN IF EXISTS "banner_url";