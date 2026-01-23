"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Button } from "../ui/button";
import { useAllChallengesPagination, ChallengeSector, ChallengeStatus } from "@/hooks/useAllChallengesPagination";

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

const statusMap: Record<ChallengeStatus, string> = {
  "GENERATION": "Captura de Ideias",
  "MATERIALIZATION": "Materialização",
  "PRE_SCREENING": "Pré-Triagem",
  "DETAILED_SCREENING": "Triagem Detalhada",
  "EXPERIMENTATION": "Experimentação",
  "SCALE": "Escala"
};

const statusColorMap: Record<ChallengeStatus, "success" | "warning" | "info" | "light" | "primary"> = {
  "GENERATION": "primary",
  "PRE_SCREENING": "info",
  "MATERIALIZATION": "warning",
  "DETAILED_SCREENING": "info",
  "EXPERIMENTATION": "success",
  "SCALE": "light"
};

interface AllChallengesProps {
  title?: string;
  initialLimit?: number;
  showLoadMore?: boolean;
}

export default function AllChallenges({
  title = "Todos os Desafios",
  initialLimit = 5,
  showLoadMore = true
}: AllChallengesProps) {
  const { challenges, loading, error, hasMore, loadMore } = useAllChallengesPagination({
    page: 1,
    limit: initialLimit
  });

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
            {challenges.length} desafio(s) encontrado(s)
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
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
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {challenges.map((challenge) => (
              <TableRow key={challenge.id}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {challenges.length === 0 && !loading && (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">Nenhum desafio encontrado</div>
          </div>
        )}

        {loading && challenges.length > 0 && (
          <div className="flex items-center justify-center py-4">
            <div className="text-gray-500">Carregando mais desafios...</div>
          </div>
        )}

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

        {!hasMore && challenges.length > 0 && (
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-500">
              Todos os desafios foram carregados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}