import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface User {
  id: number;
  name: string;
  email: string;
  category: string;
  company: string;
}

// Define the table data using the interface
const tableData: User[] = [
  {
    id: 1,
    name: "José da Silva",
    email: "josedasilva@gmail.com",
    category: "GESTOR",
    company: "PAGUE MENOS",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@empresa.com",
    category: "AVALIADOR",
    company: "LOJAS AMERICANAS",
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlos.santos@tech.com",
    category: "ADMINISTRADOR",
    company: "MAGAZINE LUIZA",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@corporation.com",
    category: "COMUM",
    company: "VIA VAREJO",
  },
  {
    id: 5,
    name: "Paulo Rodrigues",
    email: "paulo.rodrigues@empresa.com",
    category: "GESTOR",
    company: "CASAS BAHIA",
  },
  {
    id: 6,
    name: "Fernanda Lima",
    email: "fernanda.lima@tech.com",
    category: "AVALIADOR",
    company: "NATURA",
  },
  {
    id: 7,
    name: "Ricardo Almeida",
    email: "ricardo.almeida@corp.com",
    category: "ADMINISTRADOR",
    company: "AMBEV",
  },
  {
    id: 8,
    name: "Juliana Pereira",
    email: "juliana.pereira@empresa.com",
    category: "COMUM",
    company: "RENNER",
  },
];

interface FiltersProps {
  name: string;
  category: string;
  company: string;
}

interface BasicTableOneProps {
  filters: FiltersProps;
}

export default function BasicTableOne({ filters }: BasicTableOneProps) {
  const filteredData = useMemo(() => {
    return tableData.filter(user => {
      return (
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.category === '' || user.category === filters.category) &&
        (filters.company === '' || user.company === filters.company)
      );
    });
  }, [filters]);

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "GESTOR":
        return "success";
      case "ADMINISTRADOR":
        return "primary";
      case "AVALIADOR":
        return "warning";
      case "COMUM":
        return "info";
      default:
        return "success";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  NOME
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  EMAIL
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  NÍVEL DE USUÁRIO
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  EMPRESA
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  AÇÕES
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={getBadgeColor(user.category)}
                    >
                      {user.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.company}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-primary-600  hover:bg-gray-100 text-theme-sm font-medium rounded-full border border-primary-600 transition-all duration-200">
                        REENVIAR
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        title="Deletar usuário"
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                          />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}