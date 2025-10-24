import DialogForm from "@/components/elements/formChallengers/DialogForm";
import KanbanDemo from "@/components/elements/kanbanElements/KanbanDemo";


export default function Challengers() {

    return (

        <div className="w-full flex-1 min-h-0 flex flex-col">

            {/* Register */}
            <div className="col-span-12 space-y-2 py-4 px-2 flex justify-between items-center rounded-[10px]">

                <div className="text-blue">
                    
                    <h1 className="text-[25px] md:text-[30px] font-medium">
                        Funil de Inovação
                    </h1>

                </div>

                <div>
                    
                    <DialogForm/>

                </div>

            </div>

            {/* Kanban */}
           

            <div className="w-full flex-1 min-h-0">

                <KanbanDemo/>

            </div>

            

        </div>

    )

}