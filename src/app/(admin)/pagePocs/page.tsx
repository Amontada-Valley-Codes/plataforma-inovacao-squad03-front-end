'use client'

import TabelaPocs from "@/components/dashboard/Tabela-pocs";
import { useState } from "react";

export default function PagePocs() {
  const [reloadKey, setReloadKey] = useState(0);

  const forceReloadAll = () => {
    setReloadKey(prev => prev + 1);
  };

  return (
    <div className="w-full min-h-full mb-5">
      <div className="rounded-[10px] py-2 flex flex-col sm:justify-between gap-6">

        <div className="text-blue">
          <h1 className="text-2xl md:text-3 xl font-medium mb-1">
            Gestão de POCs
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground">
            Provas de Conceito em desenvolvimento
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <TabelaPocs
            key={`pending-${reloadKey}`}
            typeTable={{ title: "POCs Pendentes", status: "PENDING" }}
            onGlobalRefresh={forceReloadAll}
          />

          <TabelaPocs
            key={`rejected-${reloadKey}`}
            typeTable={{ title: "POCs Rejeitados", status: "REJECTED" }}
            onGlobalRefresh={forceReloadAll}
          />

          <TabelaPocs
            key={`accepted-${reloadKey}`}
            typeTable={{ title: "POCs Aceitos", status: "ACCEPTED" }}
            onGlobalRefresh={forceReloadAll}
          />

        </div>

      </div>
    </div>
  );
}
