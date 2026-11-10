import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgPolicy,
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

const currentTenantId = sql`nullif(current_setting('nexora.tenant_id', true), '')::uuid`;
const currentAuthSubject = sql`nullif(current_setting('nexora.auth_subject', true), '')`;
const platformOwnerContext = sql`current_setting('nexora.platform_owner', true) = 'true'`;

export const nexoraTenantsTable = pgTable(
  "nexora_tenants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    pgPolicy("nexora_tenants_select_scope", {
      for: "select",
      using: sql`${table.id} = ${currentTenantId} OR ${platformOwnerContext}`,
    }),
    pgPolicy("nexora_tenants_insert_platform_owner", {
      for: "insert",
      withCheck: platformOwnerContext,
    }),
    pgPolicy("nexora_tenants_update_platform_owner", {
      for: "update",
      using: platformOwnerContext,
      withCheck: platformOwnerContext,
    }),
    pgPolicy("nexora_tenants_delete_platform_owner", {
      for: "delete",
      using: platformOwnerContext,
    }),
  ],
).enableRLS();

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
    uniqueIndex("nexora_membership_subject_uidx").on(table.authSubject),
    index("nexora_membership_subject_idx").on(table.authSubject),
    pgPolicy("nexora_memberships_select_scope", {
      for: "select",
      using: sql`${table.authSubject} = ${currentAuthSubject} OR ${table.tenantId} = ${currentTenantId} OR ${platformOwnerContext}`,
    }),
    pgPolicy("nexora_memberships_insert_platform_owner", {
      for: "insert",
      withCheck: platformOwnerContext,
    }),
    pgPolicy("nexora_memberships_update_platform_owner", {
      for: "update",
      using: platformOwnerContext,
      withCheck: platformOwnerContext,
    }),
    pgPolicy("nexora_memberships_delete_platform_owner", {
      for: "delete",
      using: platformOwnerContext,
    }),
  ],
).enableRLS();

export const nexoraPlatformAdminsTable = pgTable(
  "nexora_platform_admins",
  {
    authSubject: text("auth_subject").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    pgPolicy("nexora_platform_admins_self_read", {
      for: "select",
      using: sql`${table.authSubject} = ${currentAuthSubject}`,
    }),
  ],
).enableRLS();

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
    pgPolicy("nexora_tenant_modules_select_scope", {
      for: "select",
      using: sql`${table.tenantId} = ${currentTenantId} OR ${platformOwnerContext}`,
    }),
    pgPolicy("nexora_tenant_modules_insert_platform_owner", {
      for: "insert",
      withCheck: platformOwnerContext,
    }),
    pgPolicy("nexora_tenant_modules_update_platform_owner", {
      for: "update",
      using: platformOwnerContext,
      withCheck: platformOwnerContext,
    }),
    pgPolicy("nexora_tenant_modules_delete_platform_owner", {
      for: "delete",
      using: platformOwnerContext,
    }),
  ],
).enableRLS();

export const nexoraAuditEventsTable = pgTable(
  "nexora_audit_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorSubject: text("actor_subject"),
    tenantId: uuid("tenant_id").references(() => nexoraTenantsTable.id, {
      onDelete: "set null",
    }),
    eventType: text("event_type").notNull(),
    route: text("route").notNull(),
    httpStatus: integer("http_status").notNull(),
    requestId: text("request_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("nexora_audit_actor_created_idx").on(
      table.actorSubject,
      table.createdAt,
    ),
    index("nexora_audit_tenant_created_idx").on(
      table.tenantId,
      table.createdAt,
    ),
    pgPolicy("nexora_audit_events_insert_scoped", {
      for: "insert",
      withCheck: sql`(${table.actorSubject} IS NULL AND ${table.tenantId} IS NULL) OR (${table.actorSubject} = ${currentAuthSubject} AND (${table.tenantId} IS NULL OR ${table.tenantId} = ${currentTenantId}))`,
    }),
    pgPolicy("nexora_audit_events_select_scoped", {
      for: "select",
      using: sql`${table.actorSubject} = ${currentAuthSubject} OR ${table.tenantId} = ${currentTenantId} OR ${platformOwnerContext}`,
    }),
  ],
).enableRLS();

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
export const insertNexoraAuditEventSchema = createInsertSchema(
  nexoraAuditEventsTable,
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
export type InsertNexoraAuditEvent = z.infer<
  typeof insertNexoraAuditEventSchema
>;
export type NexoraTenant = typeof nexoraTenantsTable.$inferSelect;
export type NexoraMembership = typeof nexoraMembershipsTable.$inferSelect;
export type NexoraPlatformAdmin = typeof nexoraPlatformAdminsTable.$inferSelect;
export type NexoraTenantModule = typeof nexoraTenantModulesTable.$inferSelect;
export type NexoraAuditEvent = typeof nexoraAuditEventsTable.$inferSelect;
