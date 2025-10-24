"use client";
import React from "react";
import DialogForm from "@/components/elements/formChallengers/DialogForm";

export function ChallengesHeader() {
  return (
    <div className="rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="text-blue">
        <h1 className="text-2xl md:text-3xl font-medium mb-1">
          Desafios Corporativos
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Ambiente de desenvolvimento de desafios
        </p>
      </div>

      <DialogForm />
    </div>
  );
}
