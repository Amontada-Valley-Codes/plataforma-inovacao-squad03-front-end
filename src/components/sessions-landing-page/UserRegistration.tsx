"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../ui/button"
import { Toaster } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { api } from "@/api/axiosConfig"


const registroSchema = z
  .object({
    nome: z.string().min(2, "Nome é obrigatório").max(50, "Nome muito longo"),

    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),

    senha: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(20, "Senha deve ter no máximo 20 caracteres")
      .regex(
        /(?=.*[A-Z])(?=.*[^A-Za-z0-9])/,
        "Senha deve conter pelo menos uma letra maiúscula e um caractere especial"
      ),

    confirmarSenha: z.string().min(8, "Confirmação de senha é obrigatória"),

    role: z.enum(["ORGANIZER"]),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

type RegistroData = z.infer<typeof registroSchema>

export default function UserRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroData>({
    resolver: zodResolver(registroSchema),
    defaultValues: {
      role: "ORGANIZER",
    },
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const corporationId = searchParams.get("enterpriseId")

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = async (data: RegistroData) => {
    if (!corporationId) {
      alert("ID da corporação não encontrado.")
      return
    }

    setIsLoading(true)

    try {
      await api.post("/auth/register", {
        name: data.nome,
        email: data.email,
        password: data.senha,
        corporationId: corporationId,
        role: data.role,
      })

      router.push("/dashboard-admin")
    } catch (error) {
      console.error("Erro ao registrar usuário:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <Toaster position="top-right" richColors />

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center overflow-auto max-h-[600px] scrollbar-hidden">
        <Image
          src="/Topic.png"
          alt="Logo Nina Hub"
          width={140}
          height={35}
          className="mx-auto mb-4 w-32 sm:w-35"
        />

        <h2 className="text-xl font-bold text-[#7EB627] uppercase mb-2">
          Registro de Usuário
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Crie sua conta preenchendo os campos abaixo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nome */}
          <div className="mb-4 text-left">
            <label className="block mb-1 text-sm font-medium text-black">
              Nome:
            </label>
            <input
              type="text"
              {...register("nome")}
              className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs">{errors.nome.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4 text-left">
            <label className="block mb-1 text-sm font-medium text-black">
              Email:
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Senha */}
          <div className="mb-4 text-left relative">
            <label className="block mb-1 text-sm font-medium text-black">
              Senha:
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                {...register("senha")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700 flex items-center justify-center h-full"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.senha && (
              <p className="text-red-500 text-xs">{errors.senha.message}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div className="mb-4 text-left relative">
            <label className="block mb-1 text-sm font-medium text-black">
              Confirmar Senha:
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmarSenha")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 text-gray-500 hover:text-gray-700 flex items-center justify-center h-full"
              >
                {showConfirmPassword ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>
            </div>
            {errors.confirmarSenha && (
              <p className="text-red-500 text-xs">
                {errors.confirmarSenha.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="mb-6 text-left">
            <label className="block mb-1 text-sm font-medium text-black">
              Tipo de Usuário:
            </label>
            <select
              {...register("role")}
              className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black"
            >
              <option value="ORGANIZER">Organizador</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#7EB627] text-white font-medium py-2 rounded-lg hover:bg-[#6aa21f] transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">Registrando...</span>
            ) : (
              "Registrar"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
