"use client"

import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { Modal } from "@/components/ui/modal"
import { VersionCard } from "@/components/pageDesafios/VersionCard"

export default function DialogForm() {
  const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal,
  } = useModal()

  return (
    <>
      <Button
        onClick={openFullscreenModal}
        variant="ninaButton"
        className="px-10 md:px-12 md:text-[16px] text-white"
      >
        Novo desafio
      </Button>

      <Modal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        size="large"
      >
      
        <div className="flex h-full flex-col">

        
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              
              <VersionCard
                title="Aplicativo de conexões empresariais"
                startDate="18-11-2025"
              />

              <VersionCard
                title="Versão 1.3"
                startDate="20-11-2025"
              /> 
              <VersionCard
                title="Versão 1.3"
                startDate="20-11-2025"
              />


            </div>
          </div>

     
          <div className=" bottom-0 flex justify-end gap-3  bg-white p-4 dark:bg-gray-900">
            <Button variant="destructive" onClick={closeFullscreenModal}>
              Cancelar
            </Button>

            <Button variant="ninaButton">
              Adicionar Formulários
            </Button>
          </div>

        </div>
      </Modal>
    </>
  )
}
