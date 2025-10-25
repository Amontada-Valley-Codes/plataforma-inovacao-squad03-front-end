"use client";
import React from "react";
import { ChallengesHeader } from "@/components/pageDesafios/Header";
import { ChallengesFilters } from "@/components/pageDesafios/Filtros";
import  RecentChallenges  from "@/components/pageDesafios/Tabela";


export default function ChallengesPage() {
  return (
    <div className="p-4">
      <ChallengesHeader />
      <ChallengesFilters />
      <div className="col-span-12 xl:col-span-12">
        <RecentChallenges />
      </div>
    </div>
  );
}
