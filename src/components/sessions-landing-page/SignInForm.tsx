'use client'
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Axios from "axios"
import { Button } from "../ui/button"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  senha: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(20, "Senha deve ter no máximo 20 caracteres"),
})

type LoginData = z.infer<typeof loginSchema>

export default function UserLogin() {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await Axios.post("/auth/login", data)
      console.log("Login bem-sucedido:", response.data)
    } catch (error) {
      console.error("Erro ao fazer login:", error)
    }
  }

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

                <img 
                    src="/Topic.png" 
                    alt="Logo Nina Hub" 
                    className="mx-auto mb-4 w-32 sm:w-35"
                />

                <h2 className="text-xl font-bold text-[#7EB627] uppercase mb-2">
                    Login
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Digite o seu e-mail e senha de acesso.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 text-left">
                        <label className="block mb-1 text-sm font-medium text-black">Email:</label>
                        <input 
                            type="email"
                             {...register("email")}
                              className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6 text-left">
                        <label className="block mb-1 text-sm font-medium text-black">Senha:</label>
                        <input 
                            type="password"
                            {...register("senha")}
                            className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black"
                            required
                        />
                        {errors.senha && (
                        <p className="text-red-500 text-xs">{errors.senha.message}</p>
                        )}
                    </div>
                    <div>
                        <Button 
                            type="submit"
                            className="w-full bg-[#7EB627] text-white font-medium py-2 rounded-lg hover:bg-[#6aa21f] transition"
                        >
                            Entrar
                        </Button>
                    </div>
                </form>

                <p className="text-xs sm:text-sm text-gray-500 mt-7">
                    Ainda não tem uma corporação? <a href="/signup" className="text-[#7EB627] hover:underline">Crie a sua agora.</a>
                </p>
            </div>
        </div>
    )
}
