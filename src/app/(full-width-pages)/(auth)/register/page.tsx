import UserRegistro from "@/components/sessions-landing-page/UserRegistration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Registration Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Registration Page TailAdmin Dashboard Template",
};

export default function Register() {
  return <UserRegistro />;
}