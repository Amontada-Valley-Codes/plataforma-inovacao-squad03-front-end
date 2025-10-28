"use client";
import BasicTableOne from "@/components/adminUsers/BasicTableOne";
import Filters from "@/components/adminUsers/Filters";
import React, { useState } from "react";
import InviteUserModal from "@/components/user-profile/InviteUserModal";

export default function BasicTables() {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    company: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
      <div>
        <div className="rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 my-4">
          <div className="text-blue">
            <h1 className="text-2xl md:text-3xl font-medium mb-1">
              Gerenciamento de Usuários
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Você pode adicionar usuários ou alterar permissões existentes.
            </p>
          </div>

          <InviteUserModal/>
        </div>
      
      
      <div className="space-y-6">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        
       
        <BasicTableOne filters={filters} />
       
      </div>
    </div>
  );
}
