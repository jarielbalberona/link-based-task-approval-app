import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

import { timestamps } from "@/databases/drizzle/helpers";
import { ROLE_LIST } from "@/databases/drizzle/lists";

export const ROLE_TYPE = pgEnum("role_type", ROLE_LIST.enumValues);

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name"),
	username: text("username").unique(),
	email: text("email").unique(),
	password: text("password"),
	emailVerified: timestamp("email_verified", { withTimezone: true }),
	image: text("image"),
  role: ROLE_TYPE("role").default("MANAGER"),
  alias: text("alias").unique(),
	...timestamps
});
