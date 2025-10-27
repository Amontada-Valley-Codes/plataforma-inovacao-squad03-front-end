"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreDotIcon } from "@/icons";
import { Button } from "../ui/button";
import { useChallengesByCorporation, ChallengeSector, ChallengeStatus, CorporationChallenge } from "@/hooks/useChallengesByCorporation";
import { useChallengesFilters } from "@/context/ChallengesFiltersContext";
import { api } from "@/api/axiosConfig";
import DialogFormEdit from "../elements/formChallengers/DialogFormEdit";
import ChallengeViewDialog from "./ChallengeViewDialog";

// Mapeamento de setores para áreas/temas
const sectorToAreaMap: Record<ChallengeSector, string> = {
  "TECHNOLOGY": "Tecnologia",
  "EDUCATION": "Educação",
  "HEALTH": "Saúde",
  "FINANCE": "Finanças",
  "ENERGY": "Energia",
  "RETAIL": "Varejo",
  "MANUFACTURING": "Manufatura",
  "TRANSPORTATION": "Transporte",
  "AGRICULTURE": "Agricultura",
  "OTHER": "Outros"
};

// Mapeamento de status para exibição
const statusMap: Record<ChallengeStatus, string> = {
  "GENERATION": "Geração",
  "PRE_SCREENING": "Pré-Triagem",
  "IDEATION": "Ideação",
  "DETAILED_SCREENING": "Triagem Detalhada",
  "EXPERIMENTATION": "Experimentação"
};

// Mapeamento de cores para os badges
const statusColorMap: Record<ChallengeStatus, "success" | "warning" | "info" | "light" | "primary"> = {
  "GENERATION": "primary",
  "PRE_SCREENING": "info",
  "IDEATION": "warning",
  "DETAILED_SCREENING": "info",
  "EXPERIMENTATION": "success"
};

interface RecentChallengesProps {
  title?: string;
  initialLimit?: number;
  showLoadMore?: boolean;
  onView?: (challenge: CorporationChallenge) => void;
  onEdit?: (challenge: CorporationChallenge) => void;
  onDelete?: (challenge: CorporationChallenge) => void;
}

export default function RecentChallenges({
  title = "Desafios da Corporação",
  initialLimit = 5,
  showLoadMore = true,
  onDelete,
}: RecentChallengesProps) {
  
  let filters = { search: "", area: "", date: "" };
  try {
    const context = useChallengesFilters();
    filters = context.filters;
  } catch {
    // Use default filters if context is not available
  }
  
  const memoizedFilters = useMemo(() => filters, [filters.search, filters.area, filters.date]);
  
  const { challenges, loading, error, refetch, hasMore, loadMore } = useChallengesByCorporation({
    page: 1,
    limit: initialLimit
  });

  // Filtrar desafios baseado nos filtros ativos
  const filteredChallenges = useMemo(() => {
    if (!challenges) return [];
    
    return challenges.filter(challenge => {
      // Filtro por busca (nome)
      if (filters.search && !challenge.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Filtro por área/setor
      if (filters.area && challenge.sector !== filters.area.toUpperCase()) {
        return false;
      }
      
      // Filtro por data
      if (filters.date) {
        const challengeDate = new Date(challenge.startDate).toISOString().split('T')[0];
        if (challengeDate !== filters.date) {
          return false;
        }
      }
      
      return true;
    });
  }, [challenges, memoizedFilters.search, memoizedFilters.area, memoizedFilters.date]);



  const handleDelete = async (challenge: CorporationChallenge) => {
    try {
      const token = localStorage.getItem("authtoken");
      
      await api.delete(`/challenges/${challenge.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Recarrega a lista após deletar
      refetch();
      
      onDelete?.(challenge);
    } catch (error) {
      console.error("Erro ao deletar desafio:", error);
    }
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading && challenges.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {title}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Carregando desafios...</div>
        </div>
      </div>
    );
  }

  if (error && challenges.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {title}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500">{error}</div>
          <Button onClick={refetch} className="ml-4" size="sm">
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredChallenges?.length || 0} de {challenges?.length || 0} desafio(s) da sua corporação
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nome do Desafio
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Área/Tema
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                POCs Recebidas
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data Início
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredChallenges && filteredChallenges.map((challenge) => (
              <TableRow key={challenge.id} className="">
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {challenge.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {sectorToAreaMap[challenge.sector]}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-800 dark:text-white/90">
                      {challenge.pocCount}
                    </span>
                    <span>POCs</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={statusColorMap[challenge.status]}
                  >
                    {statusMap[challenge.status]}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDate(challenge.startDate)}
                </TableCell>
                <TableCell className="py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card">
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <ChallengeViewDialog challenge={challenge}>
                          <span className="flex items-center gap-2 w-full">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Visualizar
                          </span>
                        </ChallengeViewDialog>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <DialogFormEdit 
                          id={challenge.id}
                          realod={true}
                          setReload={() => refetch()}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(challenge)}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="red" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>

        {filteredChallenges.length === 0 && !loading && (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">
              {challenges.length === 0 
                ? "Nenhum desafio encontrado para sua corporação" 
                : "Nenhum desafio encontrado com os filtros aplicados"
              }
            </div>
          </div>
        )}

        {/* Loading mais itens */}
        {loading && filteredChallenges.length > 0 && (
          <div className="flex items-center justify-center py-4">
            <div className="text-gray-500">Carregando mais desafios...</div>
          </div>
        )}

        {/* Botão Load More */}
        {showLoadMore && hasMore && !loading && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={loadMore}
              variant="outline"
              className="px-6"
            >
              Carregar Mais
            </Button>
          </div>
        )}

        {/* Mensagem quando não há mais itens */}
        {!hasMore && filteredChallenges.length > 0 && (
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-500">
              Todos os desafios da corporação foram carregados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}