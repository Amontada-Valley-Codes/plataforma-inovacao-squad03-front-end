"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { Modal } from "@/components/ui/modal"
import { VersionCard } from "@/components/pageDesafios/VersionCard"
import { FormBuilder } from "./formseditable/form-builder"
import { DynamicForm } from "./formseditable/dynamic-form"
import type { FormConfig, FormField, FormListItem } from "@/lib/types"
import { api } from "@/api/axiosConfig"

export default function DialogForm() {

  const [forms, setForms] = useState<FormListItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal,
  } = useModal()

  const {
    isOpen: isFormBuilderModalOpen,
    openModal: openFormBuilderModal,
    closeModal: closeFormBuilderModal,
  } = useModal()

  const {
    isOpen: isPreviewModalOpen,
    openModal: openPreviewModal,
    closeModal: closePreviewModal,
  } = useModal()

  const [formConfig, setFormConfig] = useState<FormConfig>({
    version: 1,
    fields: [],
  })

  const handleAddField = (field: Omit<FormField, "id" | "order">) => {
    const newField: FormField = {
      ...field,
      id: `field_${Date.now()}`,
      order: formConfig.fields.length,
    } as FormField
    setFormConfig((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }))
  }

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }))
  }

  const handleRemoveField = (id: string) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }))
  }

  const handleReorderFields = (fields: FormField[]) => {
    const reorderedFields = fields.map((field, index) => ({
      ...field,
      order: index,
    }))
    setFormConfig((prev) => ({
      ...prev,
      fields: reorderedFields,
    }))
  }

  useEffect(() => {
  const fetchForms = async () => {
    try {
      const res = await api.get<FormListItem[]>("/forms")
      setForms(res.data)
    } catch (err) {
      console.error("Erro ao buscar formulários", err)
    } finally {
      setLoading(false)
    }
  }

  fetchForms()
}, [])

  return (
    <>
      <Button
        onClick={openFullscreenModal}
        variant="ninaButton"
        className="px-10 md:px-12    md:text-[16px] text-white"
      >
        Novo desafio
      </Button>

      <Modal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        size="large"
      >
      
        <div className="flex h-full flex-col">

          <div className="rounded-[10px] py-5 px-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="text-blue">
              <h1 className="text-2xl md:text-3xl font-medium mb-1">
                Meus Formulários
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Criação e gerenciamento
              </p>
            </div>
        </div>


        
         <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {loading ? (
              <p>Carregando formulários...</p>
            ) : forms.length === 0 ? (
              <p>Nenhum formulário Criado</p>
            ) : (
              forms.map((form) => (
                <VersionCard
                  key={form.id}
                  title={form.title}
                  startDate={form.createdAt}
                  onUse={() => {
                    console.log("Usar formulário:", form.id)
                  }}
                  onEdit={() => {
                    console.log("Editar formulário:", form.id)
                    openFormBuilderModal()
                  }}
                  onDelete={() => {
                    console.log("Excluir formulário:", form.id)
                  }}
                />
              ))
            )}
          </div>

         

        </div>


     
          <div className=" bottom-0 flex justify-end gap-3  bg-white p-4 dark:bg-gray-900">
            <Button variant="destructive" onClick={closeFullscreenModal}>
              Cancelar
            </Button>

            <Button variant="ninaButton" onClick={openFormBuilderModal}>
              Adicionar Formulários
            </Button>
          </div>

        </div>
      </Modal>

      <Modal
        isOpen={isFormBuilderModalOpen}
        onClose={closeFormBuilderModal}
        size="large"
      >
        <div className="p-6">
          <FormBuilder
            config={formConfig}
            onAddField={handleAddField}
            onUpdateField={handleUpdateField}
            onRemoveField={handleRemoveField}
            onReorderFields={handleReorderFields}
            onPreview={openPreviewModal}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        size="large"
      >
        <div className="p-6">
          <DynamicForm
            config={formConfig}
            onSubmit={(data) => {
              console.log("Form data:", data)
              alert("Formulário enviado! Veja o console para os dados.")
            }}
          />
        </div>
      </Modal>
    </>
  )
}
