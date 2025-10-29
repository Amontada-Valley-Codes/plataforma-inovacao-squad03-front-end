import { useState } from "react";
import { api } from "@/api/axiosConfig";
import { type Poc } from "./useTabelaPocs";

export interface PocDetalhes extends Poc {
  description?: string;
  contactPerson?: string;
  filePath?: string;
}

export function usePocDetalhes() {
  const [pocDetalhes, setPocDetalhes] = useState<PocDetalhes | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPocDetalhes = async (pocId: string, fallbackPoc: Poc) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authtoken");
      
      const response = await api.get('/poc', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const pocCompleto = response.data.find((p: PocDetalhes) => p.id === pocId);
      setPocDetalhes(pocCompleto || fallbackPoc);
    } catch (error) {
      console.error("Erro ao buscar detalhes do POC:", error);
      setPocDetalhes(fallbackPoc);
    } finally {
      setLoading(false);
    }
  };

  return {
    pocDetalhes,
    loading,
    fetchPocDetalhes
  };
}