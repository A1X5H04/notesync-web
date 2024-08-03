import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  primaryKey,
  pgEnum,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { createId, init } from "@paralleldrive/cuid2";

const smallCuid = init({
  length: 5,
});

export const taskPriority = pgEnum("task_priority", [
  "trivial",
  "moderate",
  "critical",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull(),
  image: text("image"),
  hashedPassword: text("hash_password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

// Application Tables

export const workspaces = pgTable("workspace", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  isPrivate: boolean("is_private").default(false),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export const workspaceMembers = pgTable("workspace_member", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  role: text("role").notNull(),
});

export const folders = pgTable("folder", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  parentId: uuid("parent_id"),
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

export const project = pgTable("project", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  icon: text("icon").notNull(),
  folderId: uuid("folder_id")
    .notNull()
    .references(() => folders.id, { onDelete: "cascade" }),
  isArchived: boolean("is_archived").default(false),
});

export const projectColumn = pgTable("project_column", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  projectId: text("project_id").notNull(),
  title: text("title").notNull(),
  isArchived: boolean("is_archived").default(false),
});

export const projectTask = pgTable("project_task", {
  id: varchar("id", { length: 5 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => smallCuid()),
  columnId: text("column_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  isArchived: boolean("is_archived").default(false),
  priority: taskPriority("priority").default("moderate"),
  dueDate: timestamp("due_date", { mode: "date" }),
});

export const projectAssignee = pgTable(
  "project_assignee",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    columnId: text("column_id").notNull(),
    taskId: text("task_id").notNull(),
    userId: text("user_id").notNull(),
  },
  (assignee) => ({
    columnIdx: index("assignee_column_idx").on(assignee.columnId),
    taskIdx: index("assignee_task_idx").on(assignee.taskId),
  })
);

// More Features to add later
export const task = pgTable(
  "task",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    icon: text("icon").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    folderId: uuid("folder_id")
      .notNull()
      .references(() => folders.id, { onDelete: "cascade" }),
    isArchived: boolean("is_archived").default(false),
    priority: taskPriority("priority").default("moderate"),
    dueDate: timestamp("due_date", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  },
  (task) => ({
    taskFolderIdx: index("task_workspace_idx").on(task.folderId),
    taskUserIdx: index("task_user_idx").on(task.userId),
  })
);

export const taskItem = pgTable("task_item", {
  id: varchar("id", {
    length: 5,
  })
    .primaryKey()
    .notNull()
    .$defaultFn(() => smallCuid()),
  parentId: varchar("parent_id", { length: 5 }),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").default(false),
  priority: taskPriority("priority").default("moderate"),
});

export type Workspace = InferSelectModel<typeof workspaces>;
export type Folder = InferSelectModel<typeof folders>;
export type Note = InferSelectModel<typeof notes>;
export type Task = InferSelectModel<typeof task>;
export type TaskItem = InferSelectModel<typeof taskItem>;
