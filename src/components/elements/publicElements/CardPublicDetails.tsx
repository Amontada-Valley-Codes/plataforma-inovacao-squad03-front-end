import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PropsCard } from "@/types"
import Image from "next/image"
import { FiLoader } from "react-icons/fi";
import { Calendar1, CalendarClock } from 'lucide-react';
import { BiCategory } from "react-icons/bi";

export default function CardPublicDetails({ name, startDate, endDate, description, sector, status,corporation}: PropsCard) {

    return (

        <Dialog>

        <DialogTrigger asChild>

            <Button variant={"ninaButton"} className="px-16 text-white"> Ver mais </Button>
            
        </DialogTrigger>

        <DialogContent className="flex flex-col gap-8 bg-card max-h-[600px] overflow-y-auto scrollbar-hidden">

            <DialogHeader className="flex flex-col justify-start items-start gap-6">

            <div className="flex flex-row justify-start items-center gap-4 py-3 border-b-2 w-full">

                    <div>
                        <Image
                        src={corporation.logo.url}
                        alt="corporation image"
                        width={40}
                        height={40}
                        className="rounded-full w-12 h-12 object-cover object-center"

                        />
                    </div>

                <DialogTitle className="text-[24px] text-blue font-medium">{corporation.tradingName}</DialogTitle>

            </div>

            <div className="flex flex-col gap-4 text-start">

                <DialogTitle className="text-[22px] text-blue font-medium mb-2" >{name}</DialogTitle>
                
                {/* Sessão informações */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[16px] items-center">

                {/* status */}
                    <span className="font-semibold flex items-center gap-1">
                        <FiLoader /> Status:
                    </span>

                    <span className="flex justify-center bg-blue/80 dark:bg-gray-600 px-2 text-[14px] rounded-[14px] text-white">
                        {status}
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

                    <span>{endDate}</span>

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

            <Button variant={"ninaButton"} size={"default"} className="text-white"> POC </Button>


        </DialogContent>

        </Dialog>

    )

}