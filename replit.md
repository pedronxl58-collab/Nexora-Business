# NEXORA Business

NEXORA Business is a responsive SaaS foundation for a public company site and future, isolated business workspaces.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/nexora-business/` — public site, login state, and private panel shells
- `artifacts/nexora-business/ARCHITECTURE.md` — access boundaries and multi-tenant design
- `artifacts/nexora-business/src/auth/` — private-area access policy; no authentication provider is connected yet
- `lib/db/src/schema/nexora.ts` — PostgreSQL tenant, membership, platform-admin, and module schema
- `lib/api-spec/openapi.yaml` — shared API contract source of truth

## Architecture decisions

- Private routes deny access unless a server-verified principal is provided; frontend checks are only a navigation layer, never the security boundary.
- Platform administrators are modeled separately from tenant memberships. A tenant role never grants platform-admin access.
- Tenant IDs must come from a verified membership on the server, never from a browser-supplied ID.
- No sample accounts, operational rows, payments, or integrations are created in the initial foundation.

## Product

The app currently has a public presentation page, an explicitly unavailable login form, and protected visual shells for Nexora Admin and company workspaces. Financeiro, Vendas, Estoque, Funcionários, Operações, Logística, and Indicadores are marked as future modules.

## User preferences

- Do not present fictional records as real data or add simulated payments and integrations.
- Keep credentials out of source code and enforce tenant separation for future company data.

## Gotchas

- Authentication is not connected; the login form is intentionally disabled and every private route denies access by default.
- Do not treat the browser access policy as authorization. Verify the session, platform role, and tenant membership in the API before returning private data.
- Apply tenant filters to every company-scoped query; consider PostgreSQL Row-Level Security as an additional layer when the server transaction model is established.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
