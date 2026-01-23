import { jwtDecode } from "jwt-decode"

export type DecodedToken = {
  userId: string;
  email: string;
  role: "ADMIN" | "COLLABORATOR" | " OBSERVER" | "ORGANIZER" | "STARTUP_MEMBER" | "TECHNOLOGY_OFFICE"
  corporationId: string;
  iat: number;
  exp: number;
}

export function getUserId(): string | null{
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("authtoken");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.userId
  } catch {
    console.log("Token inválido");
    return null;
  }
}

