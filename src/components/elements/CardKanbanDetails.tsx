import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiLoader } from "react-icons/fi";
import { Calendar1, CalendarClock } from 'lucide-react';
import { BiCategory } from "react-icons/bi";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    id: string;
    image: string;
    corporationName: string;
    startDate: string;
    finishDate: string;
    title: string;
    description: string;
    sector: string;
    status: string;
    published: "PUBLICO" | "RESTRITO" | string;
}

const COLUMN_TITLES: Record<string, string> = {
  generation: "Geração de Ideias",
  pre_screening: "Pré-Triagem",
  ideation: "Ideação",
  detailed_screening: "Triagem Detalhada",
  experimentation: "Experimentação",
};



export default function CardKanbanDetail(
    { 
        open, 
        setOpen,
        id,
        image,
        corporationName,
        startDate,
        finishDate,
        title,
        description,
        sector,
        status,
        published
    }: Props ) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className="flex flex-col bg-card">

            {/* header */}
            <div className="flex justify-between items-center border-b-2">

                <DialogTitle className="text-[22px] text-blue font-medium mb-2" >{title}</DialogTitle>

                {/* opções */}
                <div>
                    
                </div>

            </div>

            {/* content */}
            <div className="flex flex-col">

                {/* informações */}
                <div className="flex flex-col gap-8 ">

                    <DialogHeader className="flex flex-col justify-start items-start">

                        <div className="flex flex-col text-start">
                            
                            {/* Sessão informações */}
                            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[16px] items-center">

                                {/* status */}
                                <span className="font-semibold flex items-center gap-1">
                                    <FiLoader /> Status:
                                </span>

                                <span className="flex justify-center bg-blue/80 dark:bg-gray-600 px-2 text-[14px] rounded-[14px] text-white">
                                    {COLUMN_TITLES[status] || status}
                                </span>

                                {/* data de início */}
                                <span className="font-semibold flex items-center gap-1">
                                    <Calendar1 size={17} /> Data de início:
                                </span>

                                <span>{startDate}</span>

                                {/* data de entrega */}
                                <span className="font-semibold flex items-center gap-1">
                                    <CalendarClock size={17} /> Data de entrega:
                                </span>

                                <span>{finishDate}</span>

                                {/* setor */}
                                <span className="font-semibold flex items-center gap-1">
                                    <BiCategory /> Setor:
                                </span>

                                <span>{sector}</span>

                            </div>

                        </div>

                    </DialogHeader>

                    {/* descrição */}
                    <div className="flex flex-col gap-2">

                        <span className="font-semibold text-[18px]">Descrição:</span>

                        <p>{description}</p>

                    </div>

                </div>
                
                {/* comentários */}
                {status === "ideation" && (

                    <div className="flex flex-col">
                        
                        {/* header dos comentarios */}
                        <div>
                            <h1> Comentários </h1>
                        </div>

                        {/* corpo */}
                        <div>

                        </div>

                    </div>

                )}

            </div>

        </DialogContent>
    </Dialog>
  );
}
