import {pgTable, uuid, text, integer, timestamp} from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email").unique(),

  totalFee: integer("total_fee").notNull(), 
  finalFee: integer("final_fee").notNull(),
  courseName: text("course_name"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});