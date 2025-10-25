import { PropsCard } from "@/types"
import { Badge } from "../../ui/badge"

const PUBLIC_STATE: Record<string, string> = {
  PUBLIC: "PÚBLICO",
  RESTRICTED: "RESTRITO",
};

const FORMATING_SECTORS: Record<string, string> = {
        HEALTH: "Saúde",
        EDUCATION: "Educação", 
        TECHNOLOGY: "Tecnologia", 
        FINANCIAL: "Finanças", 
        SALES: "Vendas",
    }

export default function CardKanban(props: PropsCard) {
    

    return (
        <div className="rounded-md dark:bg-gray-800 bg-card p-4  flex flex-col gap-2 ">
            
            {/* Título e publicado */}
            <div className="flex justify-between items-start">

                <div className="flex flex-col">

                    <h2 className="font-semibold text-sm line-clamp-2">{props.name}</h2>
                    <span className="text-xs text-muted-foreground">{props.corporation.tradingName}</span>
                    
                </div>

                <Badge variant={"secondary"} className="bg-green dark:bg-gray-600 px-2 py-0.5 text-[12px] rounded-[5px] text-white">
                    {PUBLIC_STATE[props.publishOption]}
                </Badge>
                
            </div>

            {/* Setor */}
            
            <span className="self-start bg-blue dark:bg-gray-700 px-3 py-0.5 text-[12px] rounded-full text-white">
                {FORMATING_SECTORS[props.sector]}
            </span>
            

            {/* Datas */}
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Início: {props.startDate}</span>
                <span>Fim: {props.endDate}</span>
            </div>

        </div>
    )
}
