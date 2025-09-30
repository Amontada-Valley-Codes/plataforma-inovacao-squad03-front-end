import KanbanDemo from "@/components/elements/KanbanDemo";
import { Button } from "@/components/ui/button";


export default function Challengers() {

    return (

        <div className="w-full min-h-screen">

            {/* Register */}
            <div className="col-span-12 space-y-2 bg-[#F5F6F7] p-5">

                <div className="text-[#0E0062] md:px-5">
                    
                    <h1 className="text-[25px] md:text-[30px] font-medium">
                        Desafios
                    </h1>

                    <p className="text-[16px] md:text-[18px]"> Ambiente de desenvolvimento de desafios </p>

                </div>

                <div className="w-full h-full flex justify-end items-end">
                    
                    <Button variant={"ninaButton"} className="px-10 md:px-12 md:text-[16px]"> Novo desafio </Button>

                </div>

            </div>

            {/* Kanban */}
            <div className="w-full h-4/5 min-w-0">

                <div className="w-full h-full min-w-0">

                    <KanbanDemo/>

                </div>

            </div>

        </div>

    )

}