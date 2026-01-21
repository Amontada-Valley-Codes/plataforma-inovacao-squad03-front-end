"use client"

import { useState, useEffect } from "react"
import type { FormField, FieldType } from "@/lib/types"
import { Modal } from "@/components/ui/modal"
import { FieldEditorForm } from "./components/FieldEditorForm"
import { generateId } from "@/lib/store"

interface FieldEditorProps {
  field: FormField | null
  isOpen: boolean
  onClose: () => void
  onSave: (field: FormField) => void
}

const FIELD_TYPES: { value: FieldType; label: string; description: string }[] = [
  { value: "text", label: "Texto Curto", description: "Campo de texto simples" },
  { value: "textarea", label: "Texto Longo", description: "Área de texto para descrições" },
  { value: "email", label: "E-mail", description: "Campo de e-mail com validação" },
  { value: "number", label: "Número", description: "Apenas valores numéricos" },
  { value: "select", label: "Seleção Única", description: "Dropdown com uma opção" },
  { value: "multiselect", label: "Múltipla Escolha", description: "Checkbox com várias opções" },
  { value: "date", label: "Data", description: "Seletor de data" },
]

function getInitialFormData(field: FormField | null): Partial<FormField> {
  if (field) {
    return { ...field }
  }
  return {
    label: "",
    name: "",
    type: "text",
    placeholder: "",
    required: false,
    helpText: "",
    options: [],
  }
}

export function FieldEditor({ field, isOpen, onClose, onSave }: FieldEditorProps) {
  const isEditing = !!field
  const [formData, setFormData] = useState<Partial<FormField>>(getInitialFormData(field))
  const [newOption, setNewOption] = useState("")

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(field))
      setNewOption("")
    }
  }, [isOpen, field])

  const handleChange = (key: keyof FormField, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddOption = () => {
    if (newOption.trim()) {
      handleChange("options", [...(formData.options || []), newOption.trim()])
      setNewOption("")
    }
  }

  const handleRemoveOption = (index: number) => {
    handleChange(
      "options",
      (formData.options || []).filter((_, i) => i !== index),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const name =
      formData.name ||
      formData.label
        ?.toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "") ||
      ""

    const savedField: FormField = {
      id: field?.id || generateId(),
      name,
      label: formData.label || "",
      type: formData.type || "text",
      placeholder: formData.placeholder,
      required: formData.required || false,
      helpText: formData.helpText,
      options: formData.options,
      order: field?.order || 0,
    }

    onSave(savedField)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="default">
      <div className="p-6 max-h-[85vh] overflow-y-auto">
        <FieldEditorForm
          formData={formData}
          isEditing={isEditing}
          newOption={newOption}
          onFormDataChange={handleChange}
          onNewOptionChange={setNewOption}
          onAddOption={handleAddOption}
          onRemoveOption={handleRemoveOption}
          onSubmit={handleSubmit}
          onCancel={onClose}
          fieldTypes={FIELD_TYPES}
        />
      </div>
    </Modal>
  )
}
