"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { type Poc } from "@/hooks/useTabelaPocs";
import Badge from "../ui/badge/Badge";
import { api } from "@/api/axiosConfig";

interface PocAvaliarModalProps {
  poc: Poc;
  onStatusUpdate?: () => void;
}

type PocStatus = "PENDING" | "ACCEPTED" | "REJECTED";

const statusMap: Record<string, string> = {
  "PENDING": "Pendente",
  "ACCEPTED": "Aceito",
  "REJECTED": "Rejeitado"
};

const statusColorMap: Record<string, "success" | "warning" | "info" | "light" | "primary"> = {
  "PENDING": "warning",
  "ACCEPTED": "success",
  "REJECTED": "light"
};

const statusOptions: { value: PocStatus; label: string }[] = [
  { value: "PENDING", label: "Pendente" },
  { value: "ACCEPTED", label: "Aceito" },
  { value: "REJECTED", label: "Rejeitado" }
];

export default function PocAvaliarModal({ poc, onStatusUpdate }: PocAvaliarModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedStatus, setSelectedStatus] = useState<PocStatus>(poc.status as PocStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("authtoken");
      
      await api.patch(`/poc/${poc.id}/status`, 
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      onStatusUpdate?.();
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar status do POC:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={openModal}>
        Avaliar
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-5 lg:p-8"
      >
        <h4 className="font-semibold text-gray-800 mb-6 text-title-sm dark:text-white/90">
          Avaliar POC
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título
            </label>
            <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              {poc.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Startup
              </label>
              <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                {poc.startup.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Desafio
              </label>
              <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                {poc.challenge.name}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status Atual
            </label>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-3">
              <Badge
                size="sm"
                color={statusColorMap[poc.status] || "light"}
              >
                {statusMap[poc.status] || poc.status}
              </Badge>
            </div>
            
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alterar Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as PocStatus)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Fechar
          </Button>
          <Button 
            size="sm" 
            onClick={handleStatusUpdate}
            disabled={isUpdating || selectedStatus === poc.status}
          >
            {isUpdating ? "Salvando..." : "Salvar Avaliação"}
          </Button>
        </div>
      </Modal>
    </>
  );
}