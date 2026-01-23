import { jwtDecode } from "jwt-decode"
import { DecodedToken } from "./GetUserId";


export function getUserRole(): "ADMIN" | "COLLABORATOR" | " OBSERVER" | "ORGANIZER" | "STARTUP_MEMBER" | "TECHNOLOGY_OFFICE" | null{
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("authtoken");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role
  } catch {
    console.log("Token inválido");
    return null;
  }
}

export function getUserCorporationId() : string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("authtoken");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.corporationId
  } catch {
    console.log("Token inválido");
    return null;
  }
}