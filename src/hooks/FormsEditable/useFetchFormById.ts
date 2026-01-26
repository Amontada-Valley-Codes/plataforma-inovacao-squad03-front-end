import { api } from "@/api/axiosConfig"
import type { FormWithFields } from "@/lib/types"

export const useFetchFormById = () => {
  const fetchFormById = async (id: string) => {
    const res = await api.get<FormWithFields>(`/forms/${id}`)
    return res.data
  }

  return { fetchFormById }
}
