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
import ConfirmDeleteMOdal from "./ConfirmDeleteModal";
import { FORMATING_ROLE } from "../elements/CommentsElements/Comment";

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

  

const filteredData = useMemo(() => {
  return tableData.filter(user => {
    return (
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.category === '' || FORMATING_ROLE[user.role] === filters.category) &&
      (filters.company === '' || user.enterprise?.name.toLowerCase().includes(filters.company.toLowerCase()))
    );
  });
}, [filters, tableData]);


  const getBadgeColor = (category: string) => {
    switch (category) {
      case "ORGANIZER":
        return "success";
      case "ADMIN":
        return "primary";
      case "TECHNOLOGY_OFFICE":
        return "warning";
      case "COLLABORATOR":
        return "info";
      case "OBSERVER":
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
                      <ConfirmDeleteMOdal id={user.id} name={user.name} table={table} setTable={setTable}/>
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