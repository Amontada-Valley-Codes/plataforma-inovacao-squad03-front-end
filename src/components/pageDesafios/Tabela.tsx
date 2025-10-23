"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";
import { Button } from "../ui/button";
import { useChallengesByCorporation, ChallengeSector, ChallengeStatus, CorporationChallenge } from "@/hooks/useChallengesByCorporation";

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
  "GENERATION": "Geração",
  "PRE_SCREENING": "Pré-Triagem",
  "IDEATION": "Ideação",
  "DETAILED_SCREENING": "Triagem Detalhada",
  "EXPERIMENTATION": "Experimentação"
};

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
  onView,
  onEdit,
  onDelete,
}: RecentChallengesProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  const { challenges, loading, error, refetch, hasMore, loadMore } = useChallengesByCorporation({
    page: 1,
    limit: initialLimit
  });

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  const handleView = (challenge: CorporationChallenge) => {
    closeDropdown();
    onView?.(challenge);
  };

  const handleEdit = (challenge: CorporationChallenge) => {
    closeDropdown();
    onEdit?.(challenge);
  };

  const handleDelete = (challenge: CorporationChallenge) => {
    closeDropdown();
    onDelete?.(challenge);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading && challenges.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4">
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
        <div className="flex flex-col gap-2 mb-4">
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
            {challenges.length} desafio(s) da sua corporação
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

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {challenges.map((challenge) => (
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
                  <div className="relative inline-block">
                    <button 
                      onClick={() => toggleDropdown(challenge.id)} 
                      className="dropdown-toggle p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === challenge.id}
                      onClose={closeDropdown}
                      className="w-40 p-2"
                    >
                      <DropdownItem
                        onItemClick={() => handleView(challenge)}
                        className="flex items-center gap-2 w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Visualizar
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={() => handleEdit(challenge)}
                        className="flex items-center gap-2 w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={() => handleDelete(challenge)}
                        className="flex items-center gap-2 w-full font-normal text-left text-red-500 rounded-lg hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Deletar
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {challenges.length === 0 && !loading && (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">Nenhum desafio encontrado para sua corporação</div>
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
              Todos os desafios da corporação foram carregados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}