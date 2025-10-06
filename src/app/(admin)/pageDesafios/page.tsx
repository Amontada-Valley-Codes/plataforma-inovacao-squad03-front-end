"use client";
import React, { useState } from "react";
import { ChallengesHeader } from "@/components/pageDesafios/Header";
import { ChallengesFilters } from "@/components/pageDesafios/Filtros";
import  RecentChallenges  from "@/components/pageDesafios/Tabela";
import RecentOrders from "@/components/ecommerce/RecentOrders";

export default function ChallengesPage() {
  const [showNewChallengeModal, setShowNewChallengeModal] = useState(false);

  const handleNewChallenge = () => {
    setShowNewChallengeModal(true);
  };

  return (
    <div className="p-4">
      <ChallengesHeader onNewChallenge={handleNewChallenge} />
      <ChallengesFilters />
      <div className="col-span-12 xl:col-span-12">
        <RecentChallenges />
      </div>
    </div>
  );
}
