import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMdMore } from "react-icons/io";

export default function MenuCard() {

    return (

        <DropdownMenu>
        <DropdownMenuTrigger><IoMdMore size={25}/></DropdownMenuTrigger>
        <DropdownMenuContent>

            <DropdownMenuItem>
                Editar
            </DropdownMenuItem>

            <DropdownMenuItem>
                Deletar
            </DropdownMenuItem>
            

        </DropdownMenuContent>
        </DropdownMenu>

    )

}