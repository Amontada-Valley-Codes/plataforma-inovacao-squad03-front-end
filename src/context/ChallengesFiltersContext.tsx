"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ChallengesFilters {
  search: string;
  area: string;
  date: string;
}

interface ChallengesFiltersContextType {
  filters: ChallengesFilters;
  setFilters: React.Dispatch<React.SetStateAction<ChallengesFilters>>;
  updateFilter: (key: keyof ChallengesFilters, value: string) => void;
  clearFilters: () => void;
}

const ChallengesFiltersContext = createContext<ChallengesFiltersContextType | undefined>(undefined);

export function ChallengesFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ChallengesFilters>({
    search: "",
    area: "",
    date: ""
  });

  const updateFilter = (key: keyof ChallengesFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      area: "",
      date: ""
    });
  };

  return (
    <ChallengesFiltersContext.Provider value={{ filters, setFilters, updateFilter, clearFilters }}>
      {children}
    </ChallengesFiltersContext.Provider>
  );
}

export function useChallengesFilters() {
  const context = useContext(ChallengesFiltersContext);
  if (context === undefined) {
    throw new Error("useChallengesFilters must be used within a ChallengesFiltersProvider");
  }
  return context;
}