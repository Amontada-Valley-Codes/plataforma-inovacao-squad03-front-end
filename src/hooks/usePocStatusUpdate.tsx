import { useState } from "react";
import { api } from "@/api/axiosConfig";

export type PocStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export function usePocStatusUpdate() {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (pocId: string, status: PocStatus) => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("authtoken");
      
      await api.patch(`/poc/${pocId}/status`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return true;
    } catch (error) {
      console.error("Erro ao atualizar status do POC:", error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    updateStatus
  };
}