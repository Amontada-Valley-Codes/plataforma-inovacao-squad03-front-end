'use client'
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../ui/button"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"
import { api } from "@/api/axiosConfig"
import { Eye, EyeOff } from "lucide-react" // ícones do lucide-react
import { AxiosError } from 'axios';
import { getUserRole } from '../elements/CommentsElements/GetUserRole';
import Image from "next/image";

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

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁 controle do olhinho

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.senha, // mapeando para password da API
      });

      localStorage.setItem("authtoken", response.data.access_token);

      toast.success("Login realizado com sucesso!", {
        description: "Você será redirecionado em instantes...",
      });

      {getUserRole() === "ADMIN" ? (

        setTimeout(() => router.push("/dashboard-admin"), 1500)
        
      ) : (

        setTimeout(() => router.push("/admin"), 1500)

      )}


    } catch (error) {
      const err = error as AxiosError;
      console.error("Erro ao fazer login:", err);

      if (err.response) {
        const status = err.response.status;
        if (status === 400) {
          toast.error("Erro nos dados enviados.", { description: "Verifique se o email e senha estão corretos." });
        } else if (status === 401) {
          toast.error("Email ou senha incorretos.", { description: "Verifique suas credenciais e tente novamente." });
        } else if (status === 404) {
          toast.error("Usuário não encontrado.", { description: "Esse email não está cadastrado." });
        } else if (status === 500) {
          toast.error("Erro interno do servidor.", { description: "Tente novamente mais tarde." });
        } else {
          toast.error("Erro inesperado.", { description: "Algo deu errado, tente novamente." });
        }
      } else if (err.request) {
        toast.error("Falha de conexão com o servidor.", { description: "Verifique sua internet e tente novamente." });
      } else {
        toast.error("Erro desconhecido.", { description: err.message || "Tente novamente mais tarde." });
      }
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
           <Toaster position="top-right" richColors />
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

                <Image 
                    src="/Topic.png" 
                    alt="Logo Nina Hub" 
                    width={140}
                    height={35}
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
                    <div className="mb-6 text-left relative">
                        <label className="block mb-1 text-sm font-medium text-black">Senha:</label>
                      <div className="relative flex items-center">
                            <input 
                                type={showPassword ? "text" : "password"}
                                {...register("senha")}
                                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black pr-10"
                                required
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
                    <div>
                        <Button
                          type="submit"
                          className="w-full bg-[#7EB627] text-white font-medium py-2 rounded-lg hover:bg-[#6aa21f] transition"
                          disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="animate-pulse">Entrando...</span>
                            ) : (
                              "Entrar"
                            )}
                          </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
