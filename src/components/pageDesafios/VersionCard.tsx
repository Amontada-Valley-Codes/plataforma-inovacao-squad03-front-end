"use client"

import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface VersionCardProps {
  title: string
  startDate: string
  onDelete?: () => void
  onEdit?: () => void
  onUse?: () => void
}

export function VersionCard({
  title,
  startDate,
  onDelete,
  onEdit,
  onUse,
}: VersionCardProps) {
  return (
    <div className="relative w-full rounded-xl border bg-white p-6 shadow-sm">
      
      
      <div className="absolute right-4 top-4">
        <Dialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  onEdit?.()
                }}
              >
                <DialogTrigger className="w-full text-left">
                  Editar
                </DialogTrigger>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-500"
                onClick={onDelete}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="max-h-[700px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar formulário</DialogTitle>
            </DialogHeader>

           
          </DialogContent>
        </Dialog>
      </div>

    
      <div className="space-y-4">
        <span className="text-sm text-muted-foreground">
          Criado em {startDate}
        </span>

        <h2 className="text-lg font-semibold line-clamp-2">
          {title}
        </h2>

        <div className="flex justify-end">
          <Button
            variant="ninaButton"
            size="sm"
            onClick={onUse}
          >
            Usar formulário
          </Button>
        </div>
      </div>
    </div>
  )
}
