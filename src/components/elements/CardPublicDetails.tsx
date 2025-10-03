import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { PropsCard } from "@/types"
import Image from "next/image"
import { FiLoader } from "react-icons/fi";
import { Calendar1, CalendarClock } from 'lucide-react';
import { BiCategory } from "react-icons/bi";

export default function CardPublicDetails({id, image, corporationName, startDate, finishDate, title, description, sector, status, published}: PropsCard) {

    return (

        <Dialog>

        <DialogTrigger asChild>

            <Button variant={"ninaButton"} className="px-16 text-white"> Ver mais </Button>
            
        </DialogTrigger>

        <DialogContent className="flex flex-col gap-8 bg-card">

            <DialogHeader className="flex flex-col justify-start items-start gap-6">

            <div className="flex flex-row justify-start items-center gap-4 py-3 border-b-2 w-full">

                    <div>
                        <Image
                        src={image}
                        alt="corporation image"
                        width={40}
                        height={40}
                        className="rounded-full w-12 h-12 object-cover object-center"

                        />
                    </div>

                <DialogTitle className="text-[24px] text-blue font-medium">{corporationName}</DialogTitle>

            </div>

            <div className="flex flex-col gap-4 text-start">

                <DialogTitle className="text-[22px] text-blue font-medium mb-2" >{title}</DialogTitle>
                
                {/* Sessão informações */}
                <div className="flex flex-row items-center text-[16px] gap-6">

                    {/* status */}
                    <div className="flex flex-col gap-2 text-[18px]">

                        <span className="font-semibold flex items-center gap-1"><FiLoader />Status:</span> 
                        <span className="font-semibold flex items-center gap-1"><Calendar1 size={17}/>Data de início:</span>
                        <span className="font-semibold flex items-center gap-1"><CalendarClock size={17}/>Data de entrega:</span>
                        <span className="font-semibold flex items-center gap-1"><BiCategory/>Setor:</span>

                    </div>

                    <div className="flex flex-col gap-3">

                        <span className="bg-blue/80 dark:bg-gray-600 px-4 text-[14px] rounded-[14px] text-white ">{status}</span> 
                        <span > {startDate}</span>
                        <span > {finishDate}</span>
                        <span >{sector}</span>

                    </div>

                </div>

            </div>


            </DialogHeader>

            {/* descrição */}
            <div className="flex flex-col gap-2">

                <span className="font-semibold text-[18px]">Descrição:</span>

                <p>{description}</p>

            </div>

            <Button variant={"ninaButton"} size={"default"} className="text-white"> POC </Button>


        </DialogContent>

        </Dialog>

    )

}