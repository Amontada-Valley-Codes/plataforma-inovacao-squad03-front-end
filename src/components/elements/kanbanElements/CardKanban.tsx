import { PropsCard } from "@/types"

const FORMATING_SECTORS: Record<string, string> = {
        HEALTH: "Saúde",
        EDUCATION: "Educação", 
        TECHNOLOGY: "Tecnologia", 
        FINANCIAL: "Finanças", 
        SALES: "Vendas",
    }

export default function CardKanban(props: PropsCard) {
    

    return (
        <div className="rounded-md dark:bg-gray-800 bg-card p-4 shadow-md flex flex-col gap-2">
            
            
            {/* Título e publicado */}
            <div className="flex justify-between items-start">

                <div className="flex flex-col">

                    <h2 className="font-semibold text-sm line-clamp-2">{props.name}</h2>
                    
                </div>
                
            </div>

            {/* Setor */}

            <div className="flex gap-2">

                {props.status === "GENERATION" && (

                    <span className="self-start bg-green text-white text-[12px] px-2 py-0.5 rounded-[5px]">
                        Novo
                    </span>

                )}

                
                <span className="self-start bg-blue dark:bg-gray-700 px-3 py-0.5 text-[12px] rounded-[5px] text-white">
                    {FORMATING_SECTORS[props.sector]}
                </span>
            
            </div>
            {/* Datas */}
           

        </div>
    )
}
