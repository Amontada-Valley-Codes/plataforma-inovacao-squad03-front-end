import { useState } from "react"
import { api } from "@/api/axiosConfig"
import { toast } from "sonner"
import type { FormField } from "@/lib/types"

const typeMapping: Record<string, string> = {
  text: "SHORT_TEXT",
  textarea: "LONG_TEXT",
  email: "EMAIL",
  number: "NUMBER",
  select: "SINGLE_SELECT",
  multiselect: "MULTI_SELECT",
  date: "DATE",
}

export const useReorderFields = () => {
  const [loading, setLoading] = useState(false)

  const reorderFields = async (fields: FormField[]) => {
    setLoading(true)
    try {
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        await api.patch(`/forms/fields/${field.id}`, {

          label: field.label,
          type: typeMapping[field.type] || field.type,
          placeholder: field.placeholder || undefined,
          required: field.required,
          order: i,
          options: field.options || [],

        })
      }
      toast.success("Campos reordenados com sucesso!")
      return true
    } catch {
      toast.error("Erro ao reordenar campos")
    } finally {
      setLoading(false)
    }
  }

  return { reorderFields, loading }
}
