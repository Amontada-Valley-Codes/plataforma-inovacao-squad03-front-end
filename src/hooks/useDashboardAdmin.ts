"use client";

import { useState, useEffect } from "react";
import { api } from "@/api/axiosConfig";

interface StartupsByArea {
  _count: {
    id: number;
  };
  areaOfExpertise: string;
}

export interface DashboardAdminData {
  totalStartups: number;
  startupsByArea: StartupsByArea[];
  totalCorporations: number;
  totalManagers: number;
}

export function useDashboardAdmin() {
  const [dashboardData, setDashboardData] = useState<DashboardAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardAdmin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("authtoken");
      
      const response = await api.get("/dashboard/admin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setDashboardData(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados do dashboard admin:", err);
      setError("Erro ao carregar dados do dashboard administrativo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardAdmin();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboardAdmin
  };
}