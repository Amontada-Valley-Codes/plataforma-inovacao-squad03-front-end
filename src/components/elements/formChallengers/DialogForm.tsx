"use client";

import { Button } from "@/components/ui/button"

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";


export default function DialogForm() {
     const {
        isOpen: isFullscreenModalOpen,
        openModal: openFullscreenModal,
        closeModal: closeFullscreenModal,
      } = useModal();

    return (

       <>
        <Button onClick={openFullscreenModal} variant={"ninaButton"} className="px-10 md:px-12 md:text-[16px] text-white"> Novo desafio </Button>

        <Modal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        size="large">
        <div className="relative h-full flex ">

 
        <div className="flex-1 overflow-y-auto  p-6">
       
        </div>

        
        <div className="sticky bottom-0 flex justify-end gap-3  bg-white dark:bg-gray-900 p-4">
        <Button variant="ninaButton">
            Adicionar Formulário
        </Button>
        </div>

        </div>
        </Modal>

       </>



    )

}