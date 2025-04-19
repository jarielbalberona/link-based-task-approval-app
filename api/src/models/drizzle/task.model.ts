import { relations, } from "drizzle-orm";
import { uuid, varchar } from "drizzle-orm/pg-core";
import {
  pgTable,
  text,
  timestamp,
  boolean
} from "drizzle-orm/pg-core";

import { users } from "./user.model";

// Tasks Table
export const tasks = pgTable('tasks', {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  createdBy: uuid('created_by').references(() => users.id).notNull(), // manager
  createdAt: timestamp('created_at').defaultNow(),
  assigned: boolean("assigned").default(false),
});

export const taskAssignments = pgTable('task_assignments', {
  id: uuid("id").primaryKey().defaultRandom(),
  taskId: uuid('task_id').references(() => tasks.id).notNull(),
  assigneeEmail: varchar('assignee_email', { length: 255 }).notNull(), // don't require user to exist
  token: text('token').notNull().unique(), // JWT token
  status: varchar('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending'),
  respondedAt: timestamp('responded_at'),
  expiresAt: timestamp('expires_at'), // JWT token expiration
});

export const taskApprovals = pgTable('task_approvals', {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid('assignment_id').references(() => taskAssignments.id).notNull(),
  action: varchar('action', { enum: ['approved', 'rejected'] }).notNull(),
  respondedAt: timestamp('responded_at').defaultNow(),
});

// Relationships
export const tasksRelations = relations(tasks, ({ one, many }) => ({
  creator: one(users, {
    fields: [tasks.createdBy],
    references: [users.id]
  }),
  assignments: many(taskAssignments)
}));

export const taskAssignmentsRelations = relations(taskAssignments, ({ one, many }) => ({
  task: one(tasks, {
    fields: [taskAssignments.taskId],
    references: [tasks.id]
  }),
  approvals: many(taskApprovals)
}));

export const taskApprovalsRelations = relations(taskApprovals, ({ one }) => ({
  assignment: one(taskAssignments, {
    fields: [taskApprovals.assignmentId],
    references: [taskAssignments.id]
  })
}));
