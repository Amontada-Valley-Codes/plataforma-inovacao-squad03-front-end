"use client"

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import ReInviteUserModal from "../user-profile/ReInviteUserModal";
import { api } from "@/api/axiosConfig";

interface User {
  id: string
  name: string;
  email: string;
  role: string;
  enterprise: {
    id: string;
    name: string;
  }
}

interface FiltersProps {
  name: string;
  category: string;
  company: string;
}

interface BasicTableOneProps {
  filters: FiltersProps;
}

const FORMATING_ROLE: Record<string, string> = {

  ADMIN: "ADMINISTRADOR",
  MANAGER: "GESTOR",
  EVALUATOR: "AVALIADOR",
  COMMON: "Comum",
  STARTUP_MEMBER: "MEMBRO DE STARTUP"

}

export default function BasicTableOne({ filters }: BasicTableOneProps) {
  const [tableData, setTableData] = useState<User[]>([])
  const [table, setTable] = useState(false)

  useEffect(() => {

    const getUsers = async () => {

      try {

        const token = localStorage.getItem("authtoken")

        const response = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data)
        setTableData(response.data)

      } catch(error) {
        console.log(error)
      }
    }
    getUsers()

  }, [table])

  const deleteUser = async (id: string) => {

    try {

      const token = localStorage.getItem("authtoken")

      api.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTable(!table)

    } catch(error) {
      console.log(error)
    }

  }

 const filteredData = useMemo(() => {
  return tableData.filter(user => {
    return (
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.category === '' || FORMATING_ROLE[user.role] === filters.category) &&
      (filters.company === '' || user.enterprise?.name === filters.company )
    );
  });
}, [filters, tableData]);

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "MANAGER":
        return "success";
      case "ADMIN":
        return "primary";
      case "EVALUATOR":
        return "warning";
      case "COMOM":
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
                      color={getBadgeColor(FORMATING_ROLE[user.role])}
                    >
                      {FORMATING_ROLE[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.enterprise?.name || '-'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <ReInviteUserModal/>
                      <button 
                        onClick={() => {deleteUser(user.id)}}
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