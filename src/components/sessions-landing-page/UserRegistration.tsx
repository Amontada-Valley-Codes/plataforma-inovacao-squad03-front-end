'use client'
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "@/api/axiosConfig"
import { Button } from "../ui/button"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { AxiosError } from "axios";

// ✅ Schema de registro
const registroSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome é obrigatório")
    .max(50, "Nome muito longo"),
  senha: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(20, "Senha deve ter no máximo 20 caracteres"),
  confirmarSenha: z
    .string()
    .min(8, "Confirmação de senha é obrigatória"),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type RegistroData = z.infer<typeof registroSchema>;

export default function UserRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroData>({
    resolver: zodResolver(registroSchema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: RegistroData) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth", {
        name: data.nome,
        password: data.senha,
      });

      toast.success("Usuário registrado com sucesso!", {
        description: "Você será redirecionado para o login.",
      });

      setTimeout(() => router.push("/login"), 1500);

    } catch (error) {
      const err = error as AxiosError;
      console.error("Erro ao registrar usuário:", err);

      if (err.response) {
        const status = err.response.status;
        if (status === 400) {
          toast.error("Erro nos dados enviados.", { description: "Verifique se todos os campos estão corretos." });
        } else if (status === 409) {
          toast.error("Usuário já existe.", { description: "Escolha outro nome." });
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
        <img
          src="/Topic.png"
          alt="Logo Nina Hub"
          className="mx-auto mb-4 w-32 sm:w-35"
        />

        <h2 className="text-xl font-bold text-[#7EB627] uppercase mb-2">
          Registro de Usuário
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Crie sua conta preenchendo os campos abaixo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo Nome */}
          <div className="mb-4 text-left">
            <label className="block mb-1 text-sm font-medium text-black">Nome:</label>
            <input
              type="text"
              {...register("nome")}
              className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black"
            />
            {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
          </div>

          {/* Campo Senha */}
          <div className="mb-4 text-left relative">
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
            {errors.senha && <p className="text-red-500 text-xs">{errors.senha.message}</p>}
          </div>

          {/* Campo Confirmar Senha */}
          <div className="mb-6 text-left relative">
            <label className="block mb-1 text-sm font-medium text-black">Confirmar Senha:</label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmarSenha")}
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627] text-black pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700 flex items-center justify-center h-full"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.confirmarSenha && <p className="text-red-500 text-xs">{errors.confirmarSenha.message}</p>}
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
  );
}
