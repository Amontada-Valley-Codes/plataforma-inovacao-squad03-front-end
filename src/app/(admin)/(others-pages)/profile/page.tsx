import InfoCorpCard from "@/components/user-profile/InfoCorpCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Profile() {
  return (
    <div>
    
        <div className="space-y-6 ">
          <UserMetaCard />
          <UserInfoCard />
          <InfoCorpCard />
        </div>
 
    </div>
  );
}
