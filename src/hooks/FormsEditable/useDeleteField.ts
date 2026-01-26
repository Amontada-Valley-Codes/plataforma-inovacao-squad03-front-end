import { api } from "@/api/axiosConfig"

export const useDeleteField = () => {
  const deleteField = async (fieldId: string) => {
    await api.delete(`/forms/fields/${fieldId}`)
  }

  return { deleteField }
}
