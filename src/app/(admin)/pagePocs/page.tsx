'use client'

import TabelaPocs from "@/components/dashboard/Tabela-pocs";

export default function PagePocs() {
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

        <div>
          <TabelaPocs/>
        </div>

      </div>
    </div>
  );
}
