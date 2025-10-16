"use client";
import { InnovationMetrics } from "@/components/ecommerce/EcommerceMetrics";
import { Button } from "@/components/ui/button";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";



export default function dashboardCorporation() {
  const corporationMetrics = [
    {
      title: "Startups Cadastradas",
      value: 5,
      change: 18.5,
      changeType: "increase" as const,
      icon: "startups" as const,
    },
    {
      title: "Corporações Cadastradas",
      value: 7,
      change: 12.3,
      changeType: "increase" as const,
      icon: "challenges" as const,
    },
    {
      title: "Usuários Ativos",
      value: 11,
      change: 25.7,
      changeType: "increase" as const,
      icon: "ideas" as const,
    },

  ];

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
                <RecentOrders />
      </div>
    </div>
  );
}