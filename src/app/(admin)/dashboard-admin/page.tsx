"use client";
import { InnovationMetrics } from "@/components/ecommerce/EcommerceMetrics";
import RecentChallenges from "@/components/ecommerce/RecentChallenges";
import { useDashboardAdmin } from "@/hooks/useDashboardAdmin";

export default function DashboardCorporation() {
  const { dashboardData, loading, error } = useDashboardAdmin();

  const defaultMetrics = [
    {
      title: "Startups Cadastradas",
      value: 0,
      change: 0,
      changeType: "increase" as const,
      icon: "startups" as const,
    },
    {
      title: "Corporações Cadastradas",
      value: 0,
      change: 0,
      changeType: "increase" as const,
      icon: "challenges" as const,
    },
    {
      title: "Gestores Ativos",
      value: 0,
      change: 0,
      changeType: "increase" as const,
      icon: "ideas" as const,
    },
  ];

  const corporationMetrics = dashboardData ? [
    {
      title: "Startups Cadastradas",
      value: dashboardData.totalStartups,
      change: 18.5,
      changeType: "increase" as const,
      icon: "startups" as const,
    },
    {
      title: "Corporações Cadastradas",
      value: dashboardData.totalCorporations,
      change: 12.3,
      changeType: "increase" as const,
      icon: "challenges" as const,
    },
    {
      title: "Gestores Ativos",
      value: dashboardData.totalManagers,
      change: 25.7,
      changeType: "increase" as const,
      icon: "ideas" as const,
    },
  ] : defaultMetrics;

  if (loading) {
    return (
      <div>
        <div className="bg-card rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 my-4">
          <div className="text-blue">
            <h1 className="text-2xl md:text-3xl font-medium mb-1">
              Dashboard Administrativa
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Visão geral das métricas e indicadores da plataforma.
            </p>
          </div>
        </div>
        
        <div className="[&_.grid]:lg:grid-cols-3 [&_h3]:hidden [&_p]:hidden">
          <InnovationMetrics metrics={defaultMetrics} />
        </div>
        
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Carregando dados administrativos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="bg-card rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 my-4">
          <div className="text-blue">
            <h1 className="text-2xl md:text-3xl font-medium mb-1">
              Dashboard Administrativa
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Visão geral das métricas e indicadores da plataforma.
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
        <div className="bg-card rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 my-4">
          <div className="text-blue">
            <h1 className="text-2xl md:text-3xl font-medium mb-1">
              Dashboard Administrativa
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Visão geral das métricas e indicadores da plataforma.
            </p>
          </div>


        </div>
      
      <div className="[&_.grid]:lg:grid-cols-3 [&_h3]:hidden [&_p]:hidden">
        <InnovationMetrics metrics={corporationMetrics} />
      </div>
      
       <div className="col-span-12 xl:col-span-12 mt-3">
        <RecentChallenges />
      </div>
    </div>
  );
}