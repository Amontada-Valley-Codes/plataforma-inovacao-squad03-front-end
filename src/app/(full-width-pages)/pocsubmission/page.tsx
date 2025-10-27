'use client'
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/api/axiosConfig";

const pocValidationSchema = z.object({
  title: z.string().min(3, "O título está muito curto."),
  description: z.string().min(10, "Sua descrição está muito curta!"),
  contactPerson: z.string().min(3, "Informe o nome da pessoa de contato."),
  challengeId: z.string(),
  file: z
    .any()
    .refine((files) => files?.length === 1, "Um arquivo é obrigatório.")
    .refine(
      (files) => files && files[0]?.type === "application/pdf",
      "O arquivo deve ser um PDF."
    )
    .refine(
      (files) => files && files[0]?.size <= 10 * 1024 * 1024,
      "O tamanho máximo permitido é 10MB."
    ),
});

type PocFormData = z.infer<typeof pocValidationSchema>;

export default function PocForm() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challengeId") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PocFormData>({
    resolver: zodResolver(pocValidationSchema),
    defaultValues: {
      challengeId,
    },
  });

  const onSubmitHandler = async (data: PocFormData) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const token = localStorage.getItem("authtoken");
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("contactPerson", data.contactPerson);
      formData.append("challengeId", challengeId);
      formData.append("file", data.file[0]);

      console.log("FormData enviada:", [...formData.entries()]);

       await api.post("/poc", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStatusMessage({ type: "success", text: "PoC enviada com sucesso!" });
      reset();
    } catch (error) {
      console.error("Erro ao enviar PoC:", error);
      setStatusMessage({
        type: "error",
        text: "Erro ao enviar PoC. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full max-w-4xl p-6 md:p-10 space-y-6 bg-white shadow-md rounded-2xl transition-all duration-300"
      >
        <div className="text-[25px] md:text-[30px] text-blue font-medium text-center">
          Submissão de PoC
        </div>

        {statusMessage && (
          <div
            className={`p-3 rounded-md text-center font-medium ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <div>
          <label htmlFor="title">Título da PoC</label>
          <input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Digite o título da PoC"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green"
          />
          {errors.title?.message && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.title.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description">Descrição</label>
          <textarea
            {...register("description")}
            id="description"
            rows={5}
            placeholder="Descreva brevemente a sua PoC."
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green"
          />
          {errors.description?.message && (
            <p className="text-red-500">
              {String(errors.description.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contactPerson">Responsável</label>
          <input
            {...register("contactPerson")}
            id="contactPerson"
            type="text"
            placeholder="Nome do Responsável"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green"
          />
          {errors.contactPerson?.message && (
            <p className="text-red-500">
              {String(errors.contactPerson.message)}
            </p>
          )}
        </div>

        <input type="hidden" {...register("challengeId")} />

        <div>
          <label htmlFor="file">Arquivo do Projeto</label>
          <input
            type="file"
            id="file"
            accept="application/pdf"
            {...register("file")}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green"
          />
          {errors.file?.message && (
            <p className="text-red-500">{String(errors.file.message)}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 text-white rounded-md transition-all w-full ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green hover:bg-green-600 hover:scale-105"
          }`}
        >
          {isSubmitting ? "Enviando..." : "Enviar PoC"}
        </button>
      </form>
    </div>
  );
}
