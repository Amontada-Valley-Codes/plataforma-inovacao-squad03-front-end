"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { ChevronDownIcon } from "lucide-react";


const inviteSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido"),
  select: z.string().min(1, "Escolha uma opção"),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export default function InviteUserModal() {
  const { isOpen, openModal, closeModal } = useModal();

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

  const options = [{ value: "MANAGER", label: "Gestor" }];

  const onSubmit = (data: InviteFormData) => {
    console.log("Dados enviados:", data);
    alert("Convite enviado!");
    reset();
    closeModal();
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

        <h4 className="font-semibold text-blue mb-7 text-[30px] dark:text-white/90">
          Convite de usuário
        </h4>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Digite o email do convidado"
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
              Enviar convite
            </Button>
          </div>
        </form>

      </Modal>
    </div>
  );
}
