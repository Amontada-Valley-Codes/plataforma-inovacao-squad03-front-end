import SignInForm from "@/components/sessions-landing-page/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "",
};

export default function SignIn() {
  return <SignInForm />;
}
