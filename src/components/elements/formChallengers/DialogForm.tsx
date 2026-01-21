"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { Modal } from "@/components/ui/modal"
import { VersionCard } from "@/components/pageDesafios/VersionCard"
import { FormBuilder } from "./formseditable/form-builder"
import { DynamicForm } from "./formseditable/dynamic-form"
import type { FormConfig, FormField } from "@/lib/types"

export default function DialogForm() {
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

  return (
    <>
      <Button
        onClick={openFullscreenModal}
        variant="ninaButton"
        className="px-10 md:px-12 md:text-[16px] text-white"
      >
        Novo desafio
      </Button>

      <Modal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        size="large"
      >
      
        <div className="flex h-full flex-col">

        
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              
              <VersionCard
                title="Aplicativo de conexões empresariais"
                startDate="18-11-2025"
              />

              <VersionCard
                title="Versão 1.3"
                startDate="20-11-2025"
              /> 
              <VersionCard
                title="Versão 1.3"
                startDate="20-11-2025"
              />


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
