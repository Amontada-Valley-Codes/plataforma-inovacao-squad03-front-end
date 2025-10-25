'use client'
import { useForm } from "react-hook-form"
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/api/axiosConfig";

const pocValidationSchema = z.object({
  title: z.string()
  .min(3, "O título está muito curto."),
  description: z.string()
  .min(10, "Sua descrição está muito curta!"),
  contactPerson: z
    .string()
    .min(3, "Informe o nome da pessoa de contato."),
  challengeId: z
    .string(),
  file: z
    .any()
    .refine((files) => files?.length === 1, "Um arquivo é obrigatório.")
    .refine(
      (files) => files && files[0]?.type === "application/pdf",
      "O arquivo deve ser um PDF.")
    .refine(
      (files) => files && files[0]?.size <= 10 * 1024 * 1024,
      "O tamanho máximo permitido é 10MB."),    
});

type PocFormData = z.infer<typeof pocValidationSchema>

type Props ={
  challengeId: string;
}

export default function PocForm({challengeId}: Props) {

  const { 
  register, 
  handleSubmit,
  reset, 
  formState: { errors }
 } = useForm<PocFormData>({
  resolver: zodResolver(pocValidationSchema),
  defaultValues: {
    challengeId,
  },
});

const onSubmitHandler = async (data: PocFormData) => {
  console.log("✅ onSubmitHandler foi chamado com:", data);
    try {
      const token = localStorage.getItem("authtoken");
      const formData = new FormData();
      console.log(data)

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("contactPerson", data.contactPerson);
      formData.append("challengeId", challengeId);
      formData.append("file", data.file[0]);

      console.log("FormData enviada:", [...formData.entries()]);


      await api.post("/poc", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("PoC enviada com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao enviar PoC:", error);
      alert("Erro ao enviar PoC. Tente novamente.");
    }
  };

  console.log("Erros atuais:", errors);


return (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full">
    <form action=""
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-full max-w-4xl p-6 md:p-10 space-y-6 transition-all duration-300">

    <div className="text-[25px] md:text-[30px] text-blue font-medium text-center">
          Submissão de PoC
    </div>    

    <div>
      <label htmlFor="title">Título da PoC</label>
      <input
      {...register("title")}
      id="title" 
      type="text"
      placeholder="Digite o título da PoC"
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green"      
      />
      {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
    </div>

    <div>
      <label htmlFor="description">Descrição</label>
      <textarea
      {...register("description")} 
      name="description" 
      id="description"
      rows={5}
      placeholder="Descreva brevemente a sua POC."
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green"
      />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
    </div>

    <div>
      <label htmlFor="contactPerson">Responsável</label>
      <input
      {...register("contactPerson")} 
      type="text" 
      name="contactPerson" 
      id="contactPerson"
      placeholder="Nome do Responsável"
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green" />
      {errors.contactPerson && (
            <p className="mt-1 text-sm text-red-500">
              {errors.contactPerson.message}
            </p>
          )}
    </div>

    <div>
      <input type="hidden" 
      {...register("challengeId")}
       defaultValue={challengeId} />

    </div>

    <div>
      <label htmlFor="file">Arquivo do Projeto</label>
      <input
        type="file"
        id="file"
        accept="application/pdf"
        {...register("file")}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green"
      />
    </div>

    <button
    type="submit"
    title="button"
    className="px-6 py-3 text-white bg-green rounded-md hover:scale-105 transition-all w-full">
      Enviar PoC
    </button>
  </form>
  </div>
);
}