import { api } from "@/api/axiosConfig"

interface FormBaseData {
  title: string
  description: string
  version: string
  stage: string
}

export const useCreateFormBase = () => {
  const createFormBase = async (data: FormBaseData) => {
    const res = await api.post("/forms", data)
    return res.data
  }

  return { createFormBase }
}
