"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import { useModal } from "@/hooks/useModal";
import { PropsCard } from "@/types";
import CardKanban from "./CardKanban";
import CardComments from "../CommentsElements/CardComments";
import { api } from "@/api/axiosConfig";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Badge } from "@/components/ui/badge"
import { COLUMN_TITLES } from "./KanbanDemo";

const FORMATING_SECTORS: Record<string, string> = {
        HEALTH: "Saúde",
        EDUCATION: "Educação", 
        TECHNOLOGY: "Tecnologia", 
        FINANCIAL: "Finanças", 
        SALES: "Vendas",
    }


export default function ModalCardKanban(props: PropsCard) {
    const { isOpen, openModal, closeModal } = useModal();
    const [changeContent, setChangeContent] = useState(true)

    useEffect(() => {
            
            const updateChallenge = async () => {
    
                const token = localStorage.getItem("authtoken")
    
                api.patch(`/challenges/${props.id}`, {
                    status: props.status
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
            updateChallenge()
    
        }, [props.status, props.id]);

    return (
    <div>
        <div onClick={openModal}>
            <CardKanban {...props} />
        </div>

        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="lg:max-w-[100px] lg:min-w-[1000px] max-h-[560px] min-h-[560px] p-5 mx-5 lg:p-10 overflow-auto lg:overflow-hidden"
        >
            <div className="flex flex-col lg:flex-row h-full justify-between items-start gap-5">

                <div className="w-full lg:w-1/2 ">

                    <h4 className="font-semibold text-blue mb-4 text-[18px] md:text-[25px] dark:text-white/90 border-b-3 border-green">
                        {props.name}
                    </h4>

                    <div className="flex gap-2 mb-4">
                        <button 
                            onClick={() => setChangeContent(true)}
                            className="flex justify-center items-center gap-1 bg-gray-300 px-4 hover:bg-blue-400/70 hover:text-gray-800"
                        >
                            <AiOutlineInfoCircle />
                            Informações
                        </button>

                        <button 
                            onClick={() => setChangeContent(false)}
                            className="flex justify-center items-center bg-gray-300 px-4 hover:bg-blue-400/70 hover:text-gray-800"
                        >
                            {COLUMN_TITLES[props.status]}
                        </button>
                    </div>            

                    <div className="max-h-[350px] min-h-[350px] overflow-auto">

                        {changeContent? (

                            <div>
                                
                                <div className="flex justify-between items-center gap-2">
                                    
                                    <Badge variant={"topicBadge"} className="text-[14px] px-4 py-0.5">
                                        {FORMATING_SECTORS[props.sector]}
                                    </Badge>

                                    <div className="flex gap-4 text-[14px] text-muted-foreground">

                                        <span>Início: {props.startDate}</span>
                                        <span>Fim: {props.endDate}</span>

                                    </div>  

                                </div>

                                <div className="">

                                </div>   

                            </div>

                        ) : (

                            <div>
                                Etapa
                            </div>
                        )}
                        

                    </div>

                </div>
                        
                <div className="lg:h-[480px] bg-gray-300 w-full h-1 lg:w-1"></div>

                <div className="w-full lg:w-1/2">
                    <CardComments challangerId={props.id}/>
                </div>
            
            </div>


        </Modal>
        
    </div>
    );
}
