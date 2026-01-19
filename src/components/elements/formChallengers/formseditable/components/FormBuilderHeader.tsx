"use client"

import { Button } from "@/components/ui/button"
import { Plus, History, Eye } from "lucide-react"

interface FormBuilderHeaderProps {
  version: number
  fieldsCount: number
  onAddField: () => void
  onPreview?: () => void
}

export function FormBuilderHeader({ version, fieldsCount, onAddField, onPreview }: FormBuilderHeaderProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h4 className="font-semibold text-blue dark:text-white text-[22px] mb-1">
            Configuração do Formulário
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <History className="h-4 w-4" />
            Versão {version} - {fieldsCount} campo{fieldsCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-2">
          {onPreview && (
            <Button onClick={onPreview} variant="outline" className="gap-2 px-8">
              <Eye className="h-4 w-4" />
              Visualizar
            </Button>
          )}
          <Button onClick={onAddField} variant="ninaButton" className="gap-2 px-6">
            <Plus className="h-4 w-4" />
            Adicionar Campo
          </Button>
        </div>
      </div>
    </div>
  )
}
