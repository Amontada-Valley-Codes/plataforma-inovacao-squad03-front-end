"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { type Poc } from "@/hooks/useTabelaPocs";
import { usePocDetalhes } from "@/hooks/usePocDetalhes";
import { usePocStatusUpdate, type PocStatus } from "@/hooks/usePocStatusUpdate";

interface PocAvaliarModalProps {
  poc: Poc;
  onStatusUpdate?: () => void;
}

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
  const { pocDetalhes, loading: loadingDetalhes, fetchPocDetalhes } = usePocDetalhes();
  const { isUpdating, updateStatus } = usePocStatusUpdate();

  useEffect(() => {
    if (isOpen) {
      fetchPocDetalhes(poc.id, poc);
      // Scroll para o topo do modal
      setTimeout(() => {
        const modalElement = document.querySelector('[role="dialog"]');
        if (modalElement) {
          modalElement.scrollTop = 0;
        }
      }, 100);
    }
  }, [isOpen]);

  const handleStatusUpdate = async () => {
    const success = await updateStatus(poc.id, selectedStatus);
    if (success) {
      onStatusUpdate?.();
      closeModal();
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
        className="flex flex-col bg-card md:min-w-[600px] max-w-[700px] p-0"
      >
        {/* header */}
        <div className="flex justify-between items-center border-b-2 p-6">
          <h4 className="text-[22px] text-blue font-medium">
            Avaliar POC
          </h4>
        </div>
        
        {/* content */}
        <div className="flex flex-col gap-5 overflow-y-auto min-h-[200px] max-h-[500px] scrollbar-hidden px-6 py-4 transition-all">
          {loadingDetalhes ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Carregando detalhes...</div>
            </div>
          ) : (
            <>
              {/* informações */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col justify-start items-start">
                  <div className="flex flex-col text-start w-full">
                    {/* Sessão informações */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[18px] items-center">
                      {/* título */}
                      <span className="font-semibold">Título:</span>
                      <span>{pocDetalhes?.title || poc.title}</span>

                      {/* startup */}
                      <span className="font-semibold">Startup:</span>
                      <span>{pocDetalhes?.startup?.name || poc.startup.name}</span>

                      {/* desafio */}
                      <span className="font-semibold">Desafio:</span>
                      <span>{pocDetalhes?.challenge?.name || poc.challenge.name}</span>

                      {/* status */}
                      <span className="font-semibold">Status:</span>
                      <span className="flex justify-center bg-blue/80 dark:bg-gray-600 px-2 text-[16px] rounded-[14px] text-white w-fit">
                        {statusMap[poc.status] || poc.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* descrição */}
                {pocDetalhes?.description && (
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-[20px]">Descrição:</span>
                    <p className="break-words whitespace-normal break-all text-[16px]">{pocDetalhes.description}</p>
                  </div>
                )}

                {/* arquivo */}
                {pocDetalhes?.filePath && (
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-[20px]">Arquivo:</span>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <iframe
                        src={pocDetalhes.filePath}
                        className="w-full h-96 border border-gray-300 rounded-lg"
                        title="Visualização do arquivo POC"
                      />
                    </div>
                  </div>
                )}

                {/* alterar status */}
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-[20px]">Alterar Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as PocStatus)}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 text-[16px] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right bg-[length:16px_16px] bg-[position:right_12px_center]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`
                    }}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-end w-full gap-3 p-6 border-t">
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