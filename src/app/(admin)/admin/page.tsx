import type { Metadata } from "next";
import {InnovationMetrics  } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";


export const metadata: Metadata = {
  title: "Dashboard Admin | Plataforma de Inovação",
  description: "Dashboard administrativo da Plataforma de Inovação",
};

export default function Ecommerce() {
  const metricsData = [
    {
      title: "Startups Conectadas",
      value: 8,
      change: 15.3,
      changeType: "increase" as const,
      icon: "startups" as const,
    },
    {
      title: "Desafios Criados",
      value: 5,
      change: 8.2,
      changeType: "increase" as const,
      icon: "challenges" as const,
    },
    
    {
      title: "Desafios em Analise",
      value: 8,
      change: 18.7,
      changeType: "increase" as const,
      icon: "ideas" as const,
    },
    {
      title: "POCs em Andamento",
      value: 14,
      change: -5.2,
      changeType: "decrease" as const,
      icon: "pocs" as const,
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <InnovationMetrics metrics={metricsData} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

        <div className="col-span-12 xl:col-span-12">
          <RecentOrders />
        </div>
    </div>
  );
}
