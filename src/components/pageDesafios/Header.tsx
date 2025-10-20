"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface ChallengesHeaderProps {
  onNewChallenge: () => void;
}

export function ChallengesHeader({ onNewChallenge }: ChallengesHeaderProps) {
  return (
    <div className="bg-card rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="text-blue">
        <h1 className="text-2xl md:text-3xl font-medium mb-1">
          Desafios Corporativos
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Ambiente de desenvolvimento de desafios
        </p>
      </div>

      <Button 
        variant="ninaButton" 
        className="px-8 md:px-10 py-2.5 text-white whitespace-nowrap"
        onClick={onNewChallenge}
      >
         Novo Desafio
      </Button>
    </div>
  );
}
