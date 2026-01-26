import { api } from "@/api/axiosConfig"
import type { FormField } from "@/lib/types"

export const useUpdateField = () => {
  const updateField = async (fieldId: string, field: FormField) => {
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
      order: field.order,
      options: field.type === "select" || field.type === "multiselect" ? (field.options || []) : [],
    }

    if (field.placeholder && field.placeholder.trim() !== "") {
      apiField.placeholder = field.placeholder
    }

    const res = await api.patch(`/forms/fields/${fieldId}`, apiField)
    return res.data
  }

  return { updateField }
}
