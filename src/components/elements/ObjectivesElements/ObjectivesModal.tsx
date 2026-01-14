"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import InputObjective from "./InputObjective";
import CardObjective from "./CardObjective";
import { CardObjectiveProps } from "@/types";

export default function ObjectivesModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const [objectives] = useState<CardObjectiveProps[]>([]) // , setObjectives
  const [objectiveUpload, setObjectUpload] = useState(false)

  useEffect(() => {

    const getObjectives = async () => {
      
    }
    getObjectives()

  }, [objectiveUpload])

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
                  
                  <InputObjective
                    ObjectiveUpload={objectiveUpload}
                    setObjectUpload={setObjectUpload}

                  />

                </div>

                {objectives.length > 0 ? (

                  <div className="max-h-[300px] scrollbar-hidden overflow-auto space-y-2">

                    {objectives.map((objective, index) => (
                      <CardObjective
                        key={index}
                        id={objective.id}
                        content={objective.content}
                        createDate={objective.createDate}
                        ObjectiveUpload={objectiveUpload}
                        setObjectUpload={setObjectUpload}
                      />
                    ))}

                  </div>

                ) 
                : 
                (
                  <div className="flex justify-center items-center">
                    <span className="text-blue" >Ainda não há nenhum objetivo estratégico.</span>
                  </div>
                )}

            </div>

            
        </Modal>
    </div>
  );
}
