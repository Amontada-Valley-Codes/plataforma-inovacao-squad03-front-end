import { api } from "@/api/axiosConfig"
import type { FormListItem } from "@/lib/types"

export const useFetchForms = () => {
  const fetchForms = async () => {
    const res = await api.get<FormListItem[]>("/forms")
    return res.data
  }

  return { fetchForms }
}
