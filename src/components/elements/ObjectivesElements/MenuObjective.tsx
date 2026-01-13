import { MoreDotIcon } from "@/icons";
import { CardObjectiveProps } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function MenuObjective(props: CardObjectiveProps) {

    const handleDeleteObjective = (() => {

        try {


            
            props.setObjectUpload(!props.ObjectiveUpload)

        } catch(error) {
            console.log(error)
        }


    })

    return (

        <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card p-2 space-y-0.5">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <span className="flex items-center gap-2 w-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Editar
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
               
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 flex items-center" onClick={handleDeleteObjective}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="red" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Deletar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )

}