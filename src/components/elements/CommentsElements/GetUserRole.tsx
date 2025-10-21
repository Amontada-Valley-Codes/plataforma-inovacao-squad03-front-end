import { jwtDecode } from "jwt-decode"

type DecodedToken = {
  userId: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EVALUATOR" | "COMMON" | "STARTUP_MEMBER"
  corporationId: string;
  iat: number;
  exp: number;
}


export function getUserRole(): "ADMIN" | "MANAGER" | "EVALUATOR" | "COMMON" | "STARTUP_MEMBER" | null{
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