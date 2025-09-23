import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const deals = pgTable("deals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  broker: text("broker").notNull(),
  bdd: text("bdd").notNull(),
  dealNumber: integer("deal_number").notNull(),
  status: text("status").notNull(), // DealStage enum
  brand: text("brand").notNull(), // DealBrand enum
  ncoExisting: text("nco_existing").notNull(), // 'NCO' | 'Existing' | 'Takeover'
  dealType: text("deal_type").notNull(), // DealType enum
  notes: text("notes").notNull().default(""),
  rsf: text("rsf").notNull().default(""),
  owner: text("owner").notNull(),
  weeklyHistory: jsonb("weekly_history").notNull().default([]), // WeeklyHistory[]
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDealSchema = createInsertSchema(deals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDeal = z.infer<typeof insertDealSchema>;
export type Deal = typeof deals.$inferSelect;
