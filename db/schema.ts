import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const workspaces = pgTable("workspace", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  userId: uuid("userId").notNull(),
  title: text("title").notNull(),
  isPrivate: boolean("is_private").default(false),
  inTrash: boolean("in_trash").default(false),
  bannerUrl: text("banner_url").notNull(),
});

export const folders = pgTable("folder", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  icon: text("icon").notNull(),
  isArchived: boolean("is_archived").default(false),
});

export const notes = pgTable("note", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  folderId: uuid("folder_id")
    .notNull()
    .references(() => folders.id, { onDelete: "cascade" }),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isArchived: boolean("is_archived").default(false),
  bannerUrl: text("banner_url").notNull(),
});

/*
  TODO:
 
  Features to add in this web app
 
  - Kanban Board
  - Tasks
  - Calender
  -
 
 */ 

export type Workspace = InferSelectModel<typeof workspaces>;
export type Folder = InferSelectModel<typeof folders>;
export type Note = InferSelectModel<typeof notes>;
