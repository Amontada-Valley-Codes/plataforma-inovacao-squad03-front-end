"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";


export default function SubmissionForm() {
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
    // Simulação de envio
    console.log({ message, files });
    alert("PoC enviada com sucesso!");
    setMessage("");
    setFiles([]);
  };

  return (
    <ComponentCard 
    title="Submissão de PoC" 
    className="w-full">

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Título */}
        <div>
          <Label htmlFor="title">Título da PoC</Label>
          <Input id="title" type="text" placeholder="Digite o título da PoC" />
        </div>

        {/* Descrição */}
        <div>
          <Label htmlFor="description">Descrição</Label>
          <TextArea
            id="description"
            value={message}
            onChange={(value) => setMessage(value)}
            rows={5}
            placeholder="Descreva brevemente a sua PoC"
            required
          />
        </div>

        {/* Contato */}
        <div>
          <Label htmlFor="contact">Pessoa de Contato</Label>
          <Input id="contact" type="text" placeholder="Nome do responsável" required />
        </div>

        {/* Upload de Arquivos */}
        <div>
          <Label htmlFor="files">Arquivos</Label>
          <input
            id="files"
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
          />
          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Enviar PoC
        </button>
      </form>
    </ComponentCard>
  );
}
