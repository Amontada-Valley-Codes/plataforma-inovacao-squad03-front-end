'use client'
import React, { useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";

export default function Submission() {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles(selected);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ message, files });
    alert("PoC enviada com sucesso!");
    setMessage("");
    setFiles([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-6 md:p-10 space-y-6 transition-all duration-300"
      >
        {/* Título */}
        <div className="text-[25px] md:text-[30px] text-blue font-medium text-center">
          Submissão de PoC
        </div>

        {/* Campo: Título da PoC */}
        <div>
          <Label htmlFor="title">Título da PoC</Label>
          <Input
            id="title"
            type="text"
            placeholder="Digite o título da PoC"
            className="w-full"
          />
        </div>

        {/* Campo: Descrição */}
        <div>
          <Label htmlFor="description">Descrição</Label>
          <TextArea
            id="description"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            rows={5}
            placeholder="Descreva brevemente a sua PoC"
            required
            className="w-full"
          />
        </div>

        {/* Campo: Pessoa de Contato */}
        <div>
          <Label htmlFor="contact">Pessoa de Contato</Label>
          <Input
            id="contact"
            type="text"
            placeholder="Nome do responsável"
            required
            className="w-full"
          />
        </div>

        {/* Upload de Arquivos */}
        <div>
          <Label htmlFor="files">Arquivos</Label>
          <input
            id="files"
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 border border-gray-300 rounded-md h-10 cursor-pointer focus:outline-none"
          />
          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="px-6 py-3 text-white bg-green rounded-md hover:scale-102 transition-all w-full"
        >
          Enviar PoC
        </button>
      </form>
    </div>
  );
}
