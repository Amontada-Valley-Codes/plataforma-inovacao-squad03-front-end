"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreDotIcon } from "@/icons";
import { Button } from "../ui/button";
import { useTabelaPocs, type Poc } from "@/hooks/useTabelaPocs";

interface TabelaPocsProps {
  title?: string;
  onView?: (poc: Poc) => void;
  onEdit?: (poc: Poc) => void;
  onDelete?: (poc: Poc) => void;
}

export default function TabelaPocs({
  title = "POCs da Corporação",
  onDelete,
}: TabelaPocsProps) {
  const {
    pocs,
    pagination,
    loading,
    error,
    refetch,
    hasMore,
    currentPage,
    dynamicColumns,
    handleDelete,
    handleNextPage,
    handlePrevPage,
    formatColumnName,
    renderCellContent
  } = useTabelaPocs(onDelete);

  if (loading && pocs.length === 0) {
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
          <div className="text-gray-500">Carregando POCs...</div>
        </div>
      </div>
    );
  }

  if (error && pocs.length === 0) {
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
            {pagination?.totalItems || 0} POC(s) encontrado(s)
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header Dinâmico */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              {dynamicColumns.map(column => (
                <TableCell
                  key={column}
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {formatColumnName(column)}
                </TableCell>
              ))}
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
            {pocs.map((poc) => (
              <TableRow key={poc.id} className="">
                {dynamicColumns.map(column => (
                  <TableCell key={column} className="py-3">
                    {column === 'title' ? (
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {renderCellContent(poc, column)}
                        </p>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-theme-sm dark:text-gray-400">
                        {renderCellContent(poc, column)}
                      </div>
                    )}
                  </TableCell>
                ))}
                <TableCell className="py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card">
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <span className="flex items-center gap-2 w-full">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Visualizar
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <span className="flex items-center gap-2 w-full">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500" 
                        onClick={() => handleDelete(poc)}
                      >
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

        {pocs.length === 0 && !loading && (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-500">
              Nenhum POC encontrado para sua corporação
            </div>
          </div>
        )}

        {/* Controles de paginação */}
        {pagination && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Mostrando {pocs.length} de {pagination.totalItems} itens
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Anterior
              </Button>
              
              <span className="px-3 py-1 text-sm text-gray-500">
                Página {currentPage} de {pagination?.totalPages || 1}
              </span>
              
              <Button
                onClick={handleNextPage}
                disabled={!hasMore}
                variant="outline"
                size="sm"
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}