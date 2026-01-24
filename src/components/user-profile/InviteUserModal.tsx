"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import { getUserRole } from "../elements/CommentsElements/GetUserRole";
import { api } from "@/api/axiosConfig";
import { getUserCorporationId } from "../elements/CommentsElements/GetUserRole";
import { toast } from "sonner";
import { AxiosError } from "axios";


const inviteSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório.")
    .refine((val) => val.includes("@"), {
      message: "O e-mail deve conter @.",
    }),
  select: z.string().min(1, "Escolha uma opção."),
  name: z
    .string()
    .min(5, "O nome é muito curto."),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres.")
    .max(20, "Senha deve ter no máximo 20 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial.")
});

type InviteFormData = z.infer<typeof inviteSchema>;

export default function InviteUserModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const isAdmin = getUserRole() === "ADMIN"
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      select: "",
    },
  });

  const options = isAdmin ? [
      { value: "ORGANIZER", label: "Organizador" },
    ] 
    : 
    [ 
      { value: "ORGANIZER", label: "Organizador" },
      { value: "TECHNOLOGY_OFFICE", label: "Escritório de Tranformação"}, 
      { value: "COLLABORATOR", label: "Colaborador"},
      { value: "OBSERVER", label: "Obeservador"},
    ]

  const onSubmit = async (data: InviteFormData) => {
  try {
      const corporationId = getUserCorporationId();

      await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        corporationId,
        role: data.select,
      });

      toast.success("Cadastro realizado com sucesso!", {
        description: `O usuário ${data.name} foi cadastrado!`,
      });

      reset();
      closeModal();

    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        const status = err.response.status;

        if (status === 400) {
          toast.error("Erro nos dados enviados.", {
            description: "Verifique se as informações estão corretas",
          });
        } else if (status === 404) {
          toast.error("Corporação não encontrada.");
        } else if (status === 409) {
          toast.error("Email já está em uso.");
        } else if (status === 500) {
          toast.error("Erro interno do servidor.");
        } else {
          toast.error("Erro inesperado.");
        }
      } else if (err.request) {
        toast.error("Falha de conexão com o servidor.");
      } else {
        toast.error("Erro desconhecido.");
      }
    }
  };


  return (
    <div>
      <Button
        variant="ninaButton"
        className="px-8 md:px-10 py-2.5 text-white whitespace-nowrap"
        onClick={openModal}
      >
        Adicionar
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >

        <h4 className="font-semibold text-blue mb-7 text-[25px] dark:text-white/90">
         Cadastrar Usuário
        </h4>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Digite o nome do usuário"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Digite o email do usuário"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label>Cargo de Usuário</Label>
            <div className="relative">
              <Select
                options={options}
                placeholder="Selecione uma opção"
                onChange={(value) => setValue("select", value)}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
            {errors.select && (
              <p className="text-red-500 text-sm mt-1">
                {errors.select.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Crie uma senha para o usuário"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-8">
            <Button
              type="button"
              size="sm"
              variant="ninaButton"
              className="bg-white border-1 text-blue border-blue"
              onClick={closeModal}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm" variant="ninaButton">
              Cadastrar
            </Button>
          </div>
        </form>

      </Modal>
    </div>
  );
}
