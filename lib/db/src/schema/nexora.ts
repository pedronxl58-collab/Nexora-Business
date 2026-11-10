import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const tenantRoleEnum = pgEnum("nexora_tenant_role", [
  "owner",
  "admin",
  "member",
]);

export const nexoraModuleEnum = pgEnum("nexora_module", [
  "financeiro",
  "vendas",
  "estoque",
  "funcionarios",
  "operacoes",
  "logistica",
  "indicadores",
]);

export const nexoraTenantsTable = pgTable("nexora_tenants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const nexoraMembershipsTable = pgTable(
  "nexora_tenant_memberships",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => nexoraTenantsTable.id, { onDelete: "cascade" }),
    authSubject: text("auth_subject").notNull(),
    role: tenantRoleEnum("role").notNull().default("member"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("nexora_membership_tenant_subject_uidx").on(
      table.tenantId,
      table.authSubject,
    ),
    index("nexora_membership_subject_idx").on(table.authSubject),
  ],
);

export const nexoraPlatformAdminsTable = pgTable("nexora_platform_admins", {
  authSubject: text("auth_subject").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const nexoraTenantModulesTable = pgTable(
  "nexora_tenant_modules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => nexoraTenantsTable.id, { onDelete: "cascade" }),
    module: nexoraModuleEnum("module").notNull(),
    enabled: boolean("enabled").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("nexora_tenant_module_uidx").on(table.tenantId, table.module),
  ],
);

export const insertNexoraTenantSchema = createInsertSchema(
  nexoraTenantsTable,
).omit({ id: true, createdAt: true });
export const insertNexoraMembershipSchema = createInsertSchema(
  nexoraMembershipsTable,
).omit({ id: true, createdAt: true });
export const insertNexoraPlatformAdminSchema = createInsertSchema(
  nexoraPlatformAdminsTable,
).omit({ createdAt: true });
export const insertNexoraTenantModuleSchema = createInsertSchema(
  nexoraTenantModulesTable,
).omit({ id: true, createdAt: true });

export type InsertNexoraTenant = z.infer<typeof insertNexoraTenantSchema>;
export type InsertNexoraMembership = z.infer<
  typeof insertNexoraMembershipSchema
>;
export type InsertNexoraPlatformAdmin = z.infer<
  typeof insertNexoraPlatformAdminSchema
>;
export type InsertNexoraTenantModule = z.infer<
  typeof insertNexoraTenantModuleSchema
>;
export type NexoraTenant = typeof nexoraTenantsTable.$inferSelect;
export type NexoraMembership = typeof nexoraMembershipsTable.$inferSelect;
export type NexoraPlatformAdmin = typeof nexoraPlatformAdminsTable.$inferSelect;
export type NexoraTenantModule = typeof nexoraTenantModulesTable.$inferSelect;
