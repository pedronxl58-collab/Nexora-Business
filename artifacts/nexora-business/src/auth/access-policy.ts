export type TenantRole = "owner" | "admin" | "member";

/**
 * A principal created from a server-verified session.
 * Never construct this value from URL parameters, form fields, or local storage.
 */
export type VerifiedPrincipal =
  | { scope: "platform-admin"; subject: string }
  | {
      scope: "tenant";
      subject: string;
      tenantId: string;
      role: TenantRole;
    };

export type PrivateArea = "nexora-admin" | "tenant";
export type AccessDecision = "allow" | "sign-in-required" | "forbidden";

export function decidePrivateAreaAccess(
  principal: VerifiedPrincipal | null,
  area: PrivateArea,
): AccessDecision {
  if (!principal) return "sign-in-required";

  if (area === "nexora-admin") {
    return principal.scope === "platform-admin" ? "allow" : "forbidden";
  }

  return principal.scope === "tenant" ? "allow" : "forbidden";
}
