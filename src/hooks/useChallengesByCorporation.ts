
"use client";

import { useState, useEffect } from "react";
import { api } from "@/api/axiosConfig";

export type ChallengeStatus = 
  | "GENERATION" 
  | "PRE_SCREENING" 
  | "IDEATION" 
  | "DETAILED_SCREENING" 
  | "EXPERIMENTATION";

export type ChallengeSector =
  | "HEALTH"
  | "TECHNOLOGY"
  | "EDUCATION"
  | "FINANCE"
  | "ENERGY"
  | "RETAIL"
  | "MANUFACTURING"
  | "TRANSPORTATION"
  | "AGRICULTURE"
  | "OTHER";

export interface CorporationChallenge {
  id: string;
  name: string;
  sector: ChallengeSector;
  status: ChallengeStatus;
  startDate: string;
  pocCount: number;
}

interface UseChallengesByCorporationProps {
  page?: number;
  limit?: number;
  autoFetch?: boolean;
}

interface UseChallengesByCorporationReturn {
  challenges: CorporationChallenge[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  currentPage: number;
  hasMore: boolean;
  loadMore: () => void;
}

export function useChallengesByCorporation({
  page = 1,
  limit = 10,
  autoFetch = true
}: UseChallengesByCorporationProps): UseChallengesByCorporationReturn {
  const [challenges, setChallenges] = useState<CorporationChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [hasMore, setHasMore] = useState(true);

  const fetchChallenges = async (pageNum: number = currentPage, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("authtoken");
      
      const response = await api.get("/challenges/challengePaginedByCorporation", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page: pageNum,
          limit
        }
      });
      
      const newChallenges = response.data;
      
      if (append) {
        setChallenges(prev => [...prev, ...newChallenges]);
      } else {
        setChallenges(newChallenges);
      }
      
      // Verifica se há mais páginas
      setHasMore(newChallenges.length === limit);
      
    } catch (err) {
      console.error("Erro ao buscar challenges da corporação:", err);
      setError("Erro ao carregar desafios da corporação");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchChallenges(nextPage, true);
    }
  };

  const refetch = () => {
    fetchChallenges(1, false);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchChallenges(page, false);
    }
  }, []);

  return {
    challenges,
    loading,
    error,
    refetch,
    currentPage,
    hasMore,
    loadMore
  };
}