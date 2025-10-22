"use client";

import { useState, useEffect } from "react";
import { api } from "@/api/axiosConfig";

interface DashboardChallenges {
  startupsConectadas: number;
  totalCriados: number;
  concluidos: number;
  pendentes: number;
  publicos: number;
  privados: number;
}

interface DashboardEmpresa {
  id: string;
  cnpj: string;
  legalName: string;
  tradingName: string;
  foundationDate: string;
  logo: Array<{
    url: string;
    public_id: string;
  }>;
  mainAddress: string;
  mainPhone: string;
  generalEmail: string;
  website: string;
  sector: string;
  size: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  challenges: DashboardChallenges;
  empresa: DashboardEmpresa;
}

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("authtoken");
      
      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setDashboardData(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do dashboard:", err);
      setError("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboard
  };
}