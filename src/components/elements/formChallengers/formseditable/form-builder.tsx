"use client"

import { useState } from "react"
import type { DragEndEvent } from "@dnd-kit/core"
import type { FormField, FormConfig } from "@/lib/types"
import { FormBuilderHeader } from "./components/FormBuilderHeader"
import { FieldsList } from "./components/FieldsList"
import { FieldEditor } from "./field-editor"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface FormBuilderProps {
  config: FormConfig
  onAddField: (field: Omit<FormField, "id" | "order">) => void
  onUpdateField: (id: string, updates: Partial<FormField>) => void
  onRemoveField: (id: string) => void
  onReorderFields: (fields: FormField[]) => void
  onPreview?: () => void
}

const FIELD_TYPE_LABELS: Record<string, string> = {
  text: "Texto",
  textarea: "Texto Longo",
  email: "E-mail",
  number: "Número",
  select: "Seleção",
  multiselect: "Múltipla Escolha",
  date: "Data",
}

const FIELD_TYPE_COLORS: Record<string, string> = {
  text: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  textarea: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  email: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  number: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  select: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
  multiselect: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  date: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
}

export function FormBuilder({ config, onAddField, onUpdateField, onRemoveField, onReorderFields, onPreview }: FormBuilderProps) {
  const [editingField, setEditingField] = useState<FormField | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteFieldId, setDeleteFieldId] = useState<string | null>(null)

  const sortedFields = [...config.fields].sort((a, b) => a.order - b.order)
  const fieldToDelete = sortedFields.find((f) => f.id === deleteFieldId)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = sortedFields.findIndex((f) => f.id === active.id)
    const newIndex = sortedFields.findIndex((f) => f.id === over.id)

    const newFields = [...sortedFields]
    const [removed] = newFields.splice(oldIndex, 1)
    newFields.splice(newIndex, 0, removed)

    onReorderFields(newFields)
  }

  const handleSaveField = (field: FormField) => {
    if (editingField) {
      onUpdateField(field.id, field)
    } else {
      onAddField(field)
    }
    setEditingField(null)
    setIsCreating(false)
  }

  const handleConfirmDelete = () => {
    if (deleteFieldId) {
      onRemoveField(deleteFieldId)
      setDeleteFieldId(null)
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <FormBuilderHeader
          version={config.version}
          fieldsCount={sortedFields.length}
          onAddField={() => setIsCreating(true)}
          onPreview={onPreview}
        />

        <div className="p-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-sm text-blue-800 dark:text-blue-200">
            <strong className="font-semibold">Dica:</strong> Arraste os campos pelo ícone para reordená-los. Clique no lápis para editar ou na lixeira para excluir.
          </div>

          <FieldsList
            fields={sortedFields}
            onEdit={setEditingField}
            onDelete={setDeleteFieldId}
            onReorder={handleDragEnd}
            typeLabels={FIELD_TYPE_LABELS}
            typeColors={FIELD_TYPE_COLORS}
          />
        </div>
      </div>

      <FieldEditor
        field={editingField}
        isOpen={isCreating || !!editingField}
        onClose={() => {
          setEditingField(null)
          setIsCreating(false)
        }}
        onSave={handleSaveField}
      />

      <Modal isOpen={!!deleteFieldId} onClose={() => setDeleteFieldId(null)} size="default">
        <div className="p-6">
          <h4 className="font-semibold text-blue dark:text-white mb-3 text-[20px]">Excluir campo?</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Tem certeza que deseja excluir o campo &quot;{fieldToDelete?.label}&quot;? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={() => setDeleteFieldId(null)} className="px-6">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} className="px-6">
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
