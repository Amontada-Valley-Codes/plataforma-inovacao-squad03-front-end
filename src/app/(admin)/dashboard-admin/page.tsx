"use client";
import { InnovationMetrics } from "@/components/ecommerce/EcommerceMetrics";
import AllChallenges from "@/components/ecommerce/AllChallenges";
import { useDashboardAdmin } from "@/hooks/useDashboardAdmin";
import ComponentCard from "@/components/common/ComponentCard";
import BarChartOne from "@/components/charts/bar/BarChartOne";
export default function DashboardCorporation() {
  const { dashboardData, loading, error } = useDashboardAdmin();


  const corporationMetrics = dashboardData ? [
    {
      title: "Startups Cadastradas",
      value: dashboardData.totalStartups,
      change: 18,
      changeType: "increase" as const,
      icon: "startups" as const,
    },
    {
      title: "Corporações Cadastradas",
      value: dashboardData.totalCorporations,
      change: 50,
      changeType: "increase" as const,
      icon: "challenges" as const,
    },
    {
      title: "Gestores Ativos",
      value: dashboardData.totalManagers,
      change: 0,
      changeType: "increase" as const,
      icon: "ideas" as const,
    },
  ] : [];

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
          <InnovationMetrics metrics={[]} />
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
        <div className="rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 my-4">
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
      
       <div className="col-span-12 mt-5">
        <ComponentCard title="Desafios por Categoria">
          <BarChartOne />
        </ComponentCard>
      </div>
       <div className="col-span-12 xl:col-span-12 my-3">
        <AllChallenges 
          title="Todos os Desafios da Plataforma"
          initialLimit={10}
          showLoadMore={true}
        />
      </div>

    </div>
  );
}