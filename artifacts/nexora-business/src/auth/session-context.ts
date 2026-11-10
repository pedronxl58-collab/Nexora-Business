import { createContext, useContext } from "react";
import type { VerifiedPrincipal } from "./access-policy";

/**
 * Remains null until a real authentication provider supplies a principal
 * obtained from a verified server session.
 */
const VerifiedPrincipalContext = createContext<VerifiedPrincipal | null>(null);

export function useVerifiedPrincipal(): VerifiedPrincipal | null {
  return useContext(VerifiedPrincipalContext);
}
