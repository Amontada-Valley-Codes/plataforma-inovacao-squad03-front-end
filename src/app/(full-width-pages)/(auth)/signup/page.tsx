'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { api } from "@/api/axiosConfig"

const enterpriseValidation = z.object({
  cnpj: z
    .string()
    .min(14, "CNPJ deve ter pelo menos 14 caracteres!")
    .nonempty("CNPJ é obrigatório!"),
  legalName: z
    .string()
    .min(2, "Nome legal é obrigatório!")
    .nonempty("Nome legal é obrigatório!"),
  tradingName: z
    .string()
    .nonempty("Nome comercial é obrigatório!"),
  foundationDate: z
    .string()
    .nonempty("Data de fundação é obrigatória!"),
  logo: z
    .any()
    .refine((file) => file?.length === 1, "Envie apenas uma imagem!")
    .refine(
      (file) =>
        !file?.[0] ||
        ["image/jpeg", "image/png", "image/webp"].includes(file[0].type),
      "Apenas imagens JPG, PNG ou WEBP são aceitas!"
    )
    .optional(),
  mainAddress: z
    .string()
    .min(5, "Endereço é obrigatório!")
    .nonempty("Endereço é obrigatório!"),
  mainPhone: z
    .string()
    .min(8, "Telefone inválido!")

    .nonempty("Telefone é obrigatório!"),
  generalEmail: z
    .string()
    .email("Email é obrigatório!")
    .nonempty("Email é obrigatório!"),
  website: z
    .string()
    .url("Website é obrigatório!")
    .nonempty("Website é obrigatório!"),
  sector: z
    .string()
    .nonempty("Setor é obrigatório!"),
  size: z
    .string()
    .nonempty("Tamanho é obrigatório!"),
})

type EnterpriseFormData = z.infer<typeof enterpriseValidation>

export default function EnterpriseCadaster() {
  const { register, handleSubmit, formState: { errors } } = useForm<EnterpriseFormData>({
    resolver: zodResolver(enterpriseValidation),
  })


const router = useRouter()

const onSubmit = async (data: EnterpriseFormData) => {
  try {
    const response = await api.post("/enterprise", {
      cnpj: data.cnpj,
      legalName: data.legalName,
      tradingName: data.tradingName,
      foundationDate: data.foundationDate,
      logo: data.logo,
      mainAddress: data.mainAddress,
      mainPhone: data.mainPhone,
      generalEmail: data.generalEmail,
      website: data.website,
      sector: data.sector,
      size: data.size
    })

    router.push("/admin")

  } catch (error) {
    console.error("Erro ao fazer cadastro de empresa.", error)
  }

}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg h-[600px] flex flex-col">

        <div className="p-6 border-b border-gray-200 text-center">
          <img src="/Topic.png" alt="Logo" className="mx-auto h-20 sm:h-20" />
          <h2 className="text-green-600 font-bold text-xl mt-4"> CADASTRO DE EMPRESA </h2>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 sm:p-6">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> CNPJ: </label>
              <input
                type="text"
                placeholder="Digite o CNPJ da sua empresa"
                {...register("cnpj")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.cnpj && <p className="text-red-500 text-xs">{errors.cnpj.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Nome Legal: </label>
              <input
                type="text"
                placeholder="Digite o nome de registro da sua empresa"
                {...register("legalName")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.legalName && <p className="text-red-500 text-xs">{errors.legalName.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Nome Comercial: </label>
              <input
                type="text"
                placeholder="Digite o nome público da sua empresa"
                {...register("tradingName")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.tradingName && <p className="text-red-500 text-xs">{errors.tradingName.message}</p>}
            </div>

            <div className="text-left">
              <label className=""> Data de Fundação: </label>
              <input
                type="date"
                {...register("foundationDate")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.foundationDate && <p className="text-red-500 text-xs">{errors.foundationDate.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Logo: </label>
              <input
                type="file"
                accept="image/*"
                {...register("logo")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.logo && <p className="text-red-500 text-xs">{errors.logo.message as string}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Endereço: </label>
              <input
                type="text"
                placeholder="Digite o endereço principal da sua empresa"
                {...register("mainAddress")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.mainAddress && <p className="text-red-500 text-xs">{errors.mainAddress.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Telefone: </label>
              <input
                type="text"
                placeholder="Digite o telefone principal da sua empresa"
                {...register("mainPhone")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.mainPhone && <p className="text-red-500 text-xs">{errors.mainPhone.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Email: </label>
              <input
                type="email"
                placeholder="Digite o email da sua empresa"
                {...register("generalEmail")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.generalEmail && <p className="text-red-500 text-xs">{errors.generalEmail.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Website: </label>
              <input
                type="url"
                placeholder="Digite a URL do seu website"
                {...register("website")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.website && <p className="text-red-500 text-xs">{errors.website.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Setor: </label>
              <input
                type="text"
                placeholder="Digite o setor da sua empresa"
                {...register("sector")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.sector && <p className="text-red-500 text-xs">{errors.sector.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium"> Tamanho: </label>
              <input
                type="text"
                 placeholder="Digite o porte empresarial"
                {...register("size")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
              />
              {errors.size && <p className="text-red-500 text-xs">{errors.size.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#7EB627] text-white font-medium py-2 rounded-lg hover:bg-[#6aa21f] transition"
              >
                Cadastrar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

