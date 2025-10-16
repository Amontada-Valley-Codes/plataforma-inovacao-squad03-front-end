import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiLoader } from "react-icons/fi";
import { Calendar1, CalendarClock } from 'lucide-react';
import { BiCategory } from "react-icons/bi";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PropsCard } from "@/types";
import CardKanban from "./CardKanban";
import MenuCard from "./MenuCard";
import CardComments from "../CommentsElements/CardComments";
import ButtonPublic from "../publicElements/ButtonPublic";
import { useEffect } from "react";
import { api } from "@/api/axiosConfig";

const COLUMN_TITLES: Record<string, string> = {
  GENERATION: "Geração de Ideias",
  PRE_SCREENING: "Pré-Triagem",
  IDEATION: "Ideação",
  DETAILED_SCREENING: "Triagem Detalhada",
  EXPERIMENTATION: "Experimentação",
};

export default function CardKanbanDetail(props: PropsCard) {
    
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

    }, [props.status]);

    return (
        <Dialog>

            <DialogTrigger asChild> 

                <div>
                    <CardKanban {...props} /> 
                </div>

            </DialogTrigger>

            <DialogContent className="flex flex-col bg-card md:min-w-[600px]">

                {/* header */}
                <div className="flex justify-between items-center border-b-2">

                    <DialogTitle className="text-[22px] text-blue font-medium mb-2" >{props.name}</DialogTitle>

                    {/* opções */}
                    <div className="flex items-center px-4 gap-2">
                        
                        <ButtonPublic published={props.publishOption} state={props.status}/>

                        <MenuCard {...props} />

                    </div>

                </div>

                {/* content */}
                <div className="flex flex-col gap-5 overflow-y-auto min-h-[200px] max-h-[500px] scrollbar-hidden px-2 transition-all">

                    {/* informações */}
                    <div className="flex flex-col gap-8">

                        <DialogHeader className="flex flex-col justify-start items-start">

                            <div className="flex flex-col text-start">
                                
                                {/* Sessão informações */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[16px] items-center">

                                    {/* status */}
                                    <span className="font-semibold flex items-center gap-1">
                                        <FiLoader /> Status:
                                    </span>

                                    <span className="flex justify-center bg-blue/80 dark:bg-gray-600 px-2 text-[14px] rounded-[14px] text-white">
                                        {COLUMN_TITLES[props.status] || props.status}
                                    </span>

                                    {/* data de início */}
                                    <span className="font-semibold flex items-center gap-1">
                                        <Calendar1 size={17} /> Data de início:
                                    </span>

                                    <span>{props.startDate}</span>

                                    {/* data de entrega */}
                                    <span className="font-semibold flex items-center gap-1">
                                        <CalendarClock size={17} /> Data de entrega:
                                    </span>

                                    <span>{props.endDate}</span>

                                    {/* setor */}
                                    <span className="font-semibold flex items-center gap-1">
                                        <BiCategory /> Setor:
                                    </span>

                                    <span>{props.sector}</span>

                                </div>

                            </div>

                        </DialogHeader>

                        {/* descrição */}
                        <div className="flex flex-col gap-2 ">

                            <span className="font-semibold text-[18px]">Descrição:</span>

                            <p className="break-words whitespace-normal  break-all">{props.description}</p>

                        </div>

                    </div>
                    
                    {/* comentários */}
                    {(props.status === "IDEATION" || props.status === "DETAILED_SCREENING" || props.status === "EXPERIMENTATION") && (
                        <div>
                            <CardComments/>
                        </div>
                    )}

                </div>

            </DialogContent>
        </Dialog>
    );
}
