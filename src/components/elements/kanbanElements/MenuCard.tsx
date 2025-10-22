import { api } from "@/api/axiosConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PropsCardKanban } from "@/types";
import { IoMdMore } from "react-icons/io";
import DialogFormEdit from "../formChallengers/DialogFormEdit";

export default function MenuCard(props: PropsCardKanban) {

    const handleDelete = async () => {

        try {

            const token = localStorage.getItem("authtoken")

            await api.delete(`/challenges/${props.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            props.setReload(!props.realod)
        } catch(error) {
            console.log("Erro:", error)
        }

    }

    return (

        <DropdownMenu>
        <DropdownMenuTrigger><IoMdMore size={25} color="gray"/></DropdownMenuTrigger>

        <DropdownMenuContent className="bg-card">

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>

                <DialogFormEdit {...props} />

            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-500" onClick={() => {handleDelete()}}>
                <svg className="w-4 h-4" fill="none" stroke="red" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Deletar
            </DropdownMenuItem>
            
        </DropdownMenuContent>
        </DropdownMenu>

    )

}