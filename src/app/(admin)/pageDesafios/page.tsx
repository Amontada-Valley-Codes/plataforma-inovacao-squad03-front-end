"use client";
import React from "react";
import { ChallengesHeader } from "@/components/pageDesafios/Header";
import { ChallengesFilters } from "@/components/pageDesafios/Filtros";
import  RecentChallenges  from "@/components/pageDesafios/Tabela";
import { ChallengesFiltersProvider } from "@/context/ChallengesFiltersContext";

export default function ChallengesPage() {
  return (
    <ChallengesFiltersProvider>
      <div className="p-4">
        <ChallengesHeader />
        <ChallengesFilters />
        <div className="col-span-12 xl:col-span-12">
          <RecentChallenges />
        </div>
      </div>
    </ChallengesFiltersProvider>
  );
}
