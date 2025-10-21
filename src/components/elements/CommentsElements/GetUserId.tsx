import { jwtDecode } from "jwt-decode"

type DecodedToken = {
  userId: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EVALUATOR" | "COMMON" | "STARTUP_MEMBER"
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

