import { api } from "@/api/axiosConfig"

export const useDeleteForm = () => {
  const deleteForm = async (formId: string) => {
    await api.delete(`/forms/${formId}`)
  }

  return { deleteForm }
}
