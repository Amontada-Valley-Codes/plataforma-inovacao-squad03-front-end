import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { PropsComment } from "@/types"


const FORMATING_ROLE: Record<string, string> = {

  ADMIN: "Admin",
  MANAGER: "Gestor",
  EVALUATOR: "Avaliador",
  COMMON: "Comum",

}

export default function Comment(props: PropsComment) {
  return (
    
    <div className="flex flex-col gap-2 rounded-2xl border p-4 bg-card shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b-1 pb-2">
        <div className="flex items-center gap-4 ">

          <span className="font-medium text-[16px]">{props.user.name}</span>
          <Badge variant="topicBadge" className="text-[14px] px-2 py-0.5">
            {FORMATING_ROLE[props.user.role]}
          </Badge>

        </div>
      </div>

      {/* Contente */}
      <div className="text-sm text-muted-foreground whitespace-pre-line pt-2">
        {props.content}
      </div>

      {/* Footter */}
      <div className="flex justify-between mt-2">

        <div className="flex justify-start text-gray text-[12px] items-center">
            <span>{props.createdAt}</span>
        </div>

        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Deletar
          </Button>
        </div>
      </div>

    </div>
  )
}
