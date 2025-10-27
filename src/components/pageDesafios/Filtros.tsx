"use client";
import React from "react";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import { useChallengesFilters } from "@/context/ChallengesFiltersContext";

export function ChallengesFilters() {
  const { filters, updateFilter } = useChallengesFilters();

  // Opções para os selects
  const areaOptions = [
    { value: "technology", label: "Tecnologia" },
    { value: "education", label: "Educação" },
    { value: "finance", label: "Financeiro" },
    { value: "health", label: "Saúde" },
    { value: "sales", label: "Vendas" },
  ];

  // Funções de atualização
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter('search', e.target.value);
  };

  const handleAreaChange = (value: string) => {
    updateFilter('area', value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter('date', e.target.value);
  };

  return (
    <div className="col-span-12 mb-5 rounded-[10px] mt-4">
      {/* Barra de Filtros/Pesquisa - Tudo na mesma linha */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        
        {/* Buscar por nome */}
        <div className="flex-1 md:flex-[2] min-w-0">
          <Label className="block mb-2">Buscar por nome</Label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar desafios..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Filtro por área/tema */}
        <div className="flex-1 min-w-0">
          <Label className="block mb-2">Área/Tema</Label>
          <div className="relative">
            <Select
              options={areaOptions}
              placeholder="Selecionar área"
              onChange={handleAreaChange}
              className="w-full dark:bg-gray-800 h-[48px]"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Filtro por data */}
        <div className="flex-1 min-w-0">
          <Label className="block mb-2">Data de início</Label>
          <div className="relative">
            <input
              type="date"
              value={filters.date}
              onChange={handleDateChange}
              className="w-full px-4 py-3 h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Botão limpar filtros */}
        <div className="flex-1 min-w-0">
          <Label className="block mb-2">&nbsp;</Label>
          <button
            onClick={() => {
              updateFilter('search', '');
              updateFilter('area', '');
              updateFilter('date', '');
            }}
            className="w-full px-4 py-3 h-[48px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>

      </div>

      {/* Mostrar filtros ativos */}
      {(filters.area || filters.date || filters.search) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtros Ativos:
          </Label>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                Busca: {filters.search}
                <button
                  onClick={() => updateFilter('search', '')}
                  className="ml-2 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            )}
            {filters.area && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Área: {areaOptions.find(opt => opt.value === filters.area)?.label}
                <button
                  onClick={() => handleAreaChange("")}
                  className="ml-2 hover:text-blue-600 dark:hover:text-blue-300"
                >
                  ×
                </button>
              </span>
            )}

            {filters.date && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Data: {new Date(filters.date).toLocaleDateString('pt-BR')}
                <button
                  onClick={() => updateFilter('date', '')}
                  className="ml-2 hover:text-purple-600 dark:hover:text-purple-300"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}