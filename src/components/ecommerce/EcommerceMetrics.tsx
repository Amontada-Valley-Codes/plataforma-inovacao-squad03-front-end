"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";

// Definindo a interface para as props
interface MetricItem {
  title: string;
  value: number | string;
  change: number;
  changeType: "increase" | "decrease";
  icon: "startups" | "challenges" | "ideas" | "pocs";
}

interface InnovationMetricsProps {
  metrics: MetricItem[];
}

// Mapeamento de ícones
const iconMap = {
  startups: GroupIcon,
  challenges: BoxIconLine,
  ideas: GroupIcon,
  pocs: BoxIconLine,
};

export const InnovationMetrics: React.FC<InnovationMetricsProps> = ({ metrics }) => {
  return (
    <div className="w-full">
      {/* Cabeçalho com título fixo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Métricas de Inovação
        </h3>
        <p className="mt-1 mb-8 text-gray-500 text-theme-sm dark:text-gray-400">
          Principais indicadores da plataforma
        </p>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = iconMap[metric.icon];
          
          return (
            <div 
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-4">
                <IconComponent className="text-gray-800 size-6 dark:text-white/90" />
              </div>

              <div className="flex items-end justify-between flex-1">
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">
                    {metric.title}
                  </span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90 truncate">
                    {metric.value}
                  </h4>
                </div>
                
                <div className="flex-shrink-0 ml-3">
                  <Badge color={metric.changeType === "increase" ? "success" : "error"}>
                    <span className="flex items-center gap-1">
                      {metric.changeType === "increase" ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      {Math.abs(metric.change)}%
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};