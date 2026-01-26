import { api } from "@/api/axiosConfig"
import type { FormField } from "@/lib/types"

export const useAddFieldToForm = () => {
  const addFieldToForm = async (formId: string, field: Omit<FormField, "id" | "order">, order: number) => {
    const typeMapping: Record<string, string> = {
      text: "SHORT_TEXT",
      textarea: "LONG_TEXT",
      email: "EMAIL",
      number: "NUMBER",
      select: "SINGLE_SELECT",
      multiselect: "MULTI_SELECT",
      date: "DATE",
    }

    const mappedType = typeMapping[field.type] || field.type.toUpperCase()

    const apiField: Record<string, unknown> = {
      label: field.label,
      type: mappedType,
      required: field.required,
      order,
      options: field.type === "select" || field.type === "multiselect" ? (field.options || []) : [],
    }

    if (field.placeholder && field.placeholder.trim() !== "") {
      apiField.placeholder = field.placeholder
    }

    const res = await api.post(`/forms/${formId}/fields`, apiField)
    return res.data
  }

  return { addFieldToForm }
}
