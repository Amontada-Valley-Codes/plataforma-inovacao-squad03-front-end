"use client";

import { InnovationMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import  RecentChallenges  from "@/components/pageDesafios/Tabela";
import { useDashboard } from "@/hooks/useDashboard";

export function DashboardContent() {
  const { dashboardData, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Nenhum dado encontrado</div>
      </div>
    );
  }

  
  const metricsData = [
    {
      title: "Startups Conectadas",
      value: dashboardData.challenges.startupsConectadas,
      change: 0,
      changeType: "increase" as const,
      icon: "startups" as const,
    },
    {
      title: "Desafios Criados",
      value: dashboardData.challenges.totalCriados,
      change: 8.2, 
      changeType: "increase" as const,
      icon: "challenges" as const,
    },
    {
      title: "Desafios Concluídos",
      value: dashboardData.challenges.concluidos,
      change: 18.7,
      changeType: "increase" as const,
      icon: "ideas" as const,
    },
    {
      title: "Desafios Em Andamento",
      value: dashboardData.challenges.pendentes,
      change: 0, 
      changeType: "increase" as const,
      icon: "pocs" as const,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <InnovationMetrics metrics={metricsData} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget 
          empresa={{
            id: dashboardData.empresa.id,
            tradingName: dashboardData.empresa.tradingName,
            legalName: dashboardData.empresa.legalName
          }}
          desafiosConcluidos={dashboardData.challenges.concluidos}
          totalDesafios={dashboardData.challenges.totalCriados}
        />
      </div>

      <div className="col-span-12">
        <StatisticsChart 
          
        />
      </div>

      <div className="col-span-12 xl:col-span-12">
        <RecentChallenges />
      </div>
    </div>
  );
}