"use client";
import React from "react";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";
import Button from "../ui/button/Button";
import { api } from "@/api/axiosConfig";


interface PropsModalDelete {
    id: string;
    name: string;
    table: boolean;
    setTable: (prev: boolean) => void;
}

export default function ConfirmDeleteMOdal(props: PropsModalDelete) {
    const { isOpen, openModal, closeModal } = useModal();

    const deleteUser = async (id: string) => {
    
        try {
    
          const token = localStorage.getItem("authtoken")
    
          api.delete(`/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    
          props.setTable(!props.table)
    
        } catch(error) {
          console.log(error)
        }
    
      }

    
    return (
        <div>
            <button
                onClick={openModal}
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

        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            showCloseButton={false}
            className="max-w-[507px] p-6 lg:p-10"
        >
            <div className="text-center">
            <h4 className="mb-2 text-[20px] font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
                Deseja deletar este usuário?
            </h4>
            <p className="text-[16px] leading-6 text-gray-500 dark:text-gray-400">
                O usuário {props.name} será deletado permanentemente do sistema. 
            </p>

            <div className="flex items-center justify-center w-full gap-3 mt-8">
                <Button size="sm" variant="outline" className="border-1 border-blue" onClick={closeModal}>
                Cancelar
                </Button>
                <Button size="sm" className="bg-red-500 hover:bg-red-700" onClick={() => deleteUser(props.id)}>
                Deletar
                </Button>
            </div>
            </div>
        </Modal>
        </div>
    );
}
