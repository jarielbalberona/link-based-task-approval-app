import { relations } from "drizzle-orm";
import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";

import { timestamps } from "@/databases/drizzle/helpers";
import { TOKEN_LIST } from "@/databases/drizzle/lists";
import { users } from "./user.model";

export const TOKEN_TYPE = pgEnum("token_type", TOKEN_LIST.enumValues);


export const authentications = pgTable("authentications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  sessionState: text("session_state"),
  ...timestamps
});


export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
	sessionId: text("session_id").notNull().unique(),
	sessionCookie: text("session_cookie").unique(),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { withTimezone: true }).notNull(),
	...timestamps
});

export const verificationTokens = pgTable(
	"verification_tokens",
	{
    id: uuid("id").primaryKey().defaultRandom(),
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		tokenType: TOKEN_TYPE("token_type").notNull(),
		expires: timestamp("expires", { withTimezone: true }).notNull(),
		...timestamps
	},
	table => ({
		identifierTypeIdx: uniqueIndex("identifier_type_idx").on(table.identifier, table.tokenType)
	})
);

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
	authentications: many(authentications),
	sessions: many(sessions)
}));

export const authenticationsRelations = relations(authentications, ({ one }) => ({
	user: one(users, {
		fields: [authentications.userId],
		references: [users.id]
	})
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));
