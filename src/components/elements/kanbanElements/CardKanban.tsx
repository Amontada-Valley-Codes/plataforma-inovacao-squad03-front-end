import { PropsCard } from "@/types"
import { Badge } from "../../ui/badge"
import CardKanbanDetail from "../CardKanbanDetails"
import { useState } from "react"

const PUBLIC_STATE: Record<string, string> = {
  PUBLIC: "PÚBLICO",
  RESTRICTED: "RESTRITO",
};

export default function CardKanban({
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
    }: PropsCard) {
    

    return (
        <div className="rounded-md dark:bg-gray-800 bg-card p-4  flex flex-col gap-2 ">
            
            {/* Título e publicado */}
            <div className="flex justify-between items-start">

                <div className="flex flex-col">

                    <h2 className="font-semibold text-sm line-clamp-2">{title}</h2>
                    <span className="text-xs text-muted-foreground">{corporationName}</span>
                    
                </div>

                <Badge variant={"secondary"} className="bg-green dark:bg-gray-600 px-2 py-0.5 text-[12px] rounded-[5px] text-white">
                    {PUBLIC_STATE[published]}
                </Badge>
                
            </div>

            {/* Setor */}
            
            <span className="self-start bg-blue dark:bg-gray-700 px-3 py-0.5 text-[12px] rounded-full text-white">
                {sector}
            </span>
            

            {/* Datas */}
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Início: {startDate}</span>
                <span>Fim: {finishDate}</span>
            </div>

        </div>
    )
}
