"use client";
import React from "react";
import { Modal } from "../../ui/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import InputObjective from "./InputObjective";
import CardObjective from "./CardObjective";

export default function ObjectivesModal() {
  const { isOpen, openModal, closeModal } = useModal();

  const objectives = [
    {
      content: "Algum objetivo que eles cria aí.",
      createDate: "01/10/26"
    },
    {
      content: "Outro objetivo que eles cria aí.",
      createDate: "01/10/26"
    },
    
  ]

  return (
    <div>
        <Button
        variant="ninaButton"
        className="px-10 md:px-12 md:text-[16px] text-white w-full"
        onClick={openModal}
      >
        Objetivos
      </Button>

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[600px] max-h-[600px] p-5 lg:p-10 mx-2"
        >
            <div className="mb-4 border-b-2 py-2">

                <h4 className="font-semibold text-blue text-[25px]">
                    Objetivos Estratégicos
                </h4>
                <span className="text-md leading-6 text-gray-500">
                    Crie e edite os objetivos estratégicos da sua empresa
                </span>

            </div>

            <div className="space-y-4">

                <div className="py-2">
                  
                  <InputObjective/>

                </div>

                <div className="max-h-[300px] scrollbar-hidden overflow-auto space-y-2">
                    {objectives.map((objective, index) => (
                      <CardObjective
                        key={index}
                        content={objective.content}
                        createDate={objective.createDate}
                      />
                    ))}

                </div>

            </div>

            
        </Modal>
    </div>
  );
}
