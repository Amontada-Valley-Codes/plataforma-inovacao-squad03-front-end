"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { Modal } from "@/components/ui/modal"
import { VersionCard } from "@/components/pageDesafios/VersionCard"
import { FormBuilder } from "./formseditable/form-builder"
import { DynamicForm } from "./formseditable/dynamic-form"
import { FormBaseCreator, type FormBaseData } from "./formseditable/form-base-creator"
import type { FormConfig, FormField, FormListItem } from "@/lib/types"
import { useCreateFormBase } from "@/hooks/FormsEditable/useCreateFormBase"
import { useAddFieldToForm } from "@/hooks/FormsEditable/useAddFieldToForm"
import { useFetchForms } from "@/hooks/FormsEditable/useFetchForms"
import { useFetchFormById } from "@/hooks/FormsEditable/useFetchFormById"
import { useDeleteForm } from "@/hooks/FormsEditable/useDeleteForm"
import { useReorderFields } from "@/hooks/FormsEditable/useReorderFields"
import { useUpdateField } from "@/hooks/FormsEditable/useUpdateField"
import { useDeleteField } from "@/hooks/FormsEditable/useDeleteField"
import { toast } from "sonner"

export default function DialogForm() {
  const [forms, setForms] = useState<FormListItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentFormId, setCurrentFormId] = useState<string | null>(null)
  const [currentFormTitle, setCurrentFormTitle] = useState<string>("")
  const [currentFormDescription, setCurrentFormDescription] = useState<string>("")
  const [deleteFormId, setDeleteFormId] = useState<string | null>(null)

  const { createFormBase } = useCreateFormBase()
  const { addFieldToForm } = useAddFieldToForm()
  const { fetchForms: fetchFormsAPI } = useFetchForms()
  const { fetchFormById: fetchFormByIdAPI } = useFetchFormById()
  const { deleteForm } = useDeleteForm()
  const { reorderFields } = useReorderFields()
  const { updateField } = useUpdateField()
  const { deleteField } = useDeleteField()

  const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal,
  } = useModal()

  const {
    isOpen: isFormBaseModalOpen,
    openModal: openFormBaseModal,
    closeModal: closeFormBaseModal,
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


  const handleCreateFormBase = async (data: FormBaseData) => {
    try {
      const result = await createFormBase(data)
      
      setCurrentFormId(result.id)
      setCurrentFormTitle(data.title)
      setCurrentFormDescription(data.description)
      setFormConfig({
        version: Number(data.version),
        fields: [],
      })
      
      closeFormBaseModal()
      openFormBuilderModal()
      
      await fetchForms()
    } catch {
      toast.error("Erro ao criar formulário")
    }
  }

  const handleAddFieldToAPI = async (field: Omit<FormField, "id" | "order">) => {
    if (!currentFormId) return

    try {
      const result = await addFieldToForm(currentFormId, field, formConfig.fields.length)
      
      const newField: FormField = {
        ...field,
        id: result.id || `field_${Date.now()}`,
        order: formConfig.fields.length,
      } as FormField

      setFormConfig((prev) => ({
        ...prev,
        fields: [...prev.fields, newField],
      }))
    } catch {
      toast.error("Erro ao adicionar campo")
    }
  }

  const handleReorderFields = async (fields: FormField[]) => {
    const updatedFields = fields.map((field, index) => ({
      ...field,
      order: index,
    }))

    setFormConfig((prev) => ({
      ...prev,
      fields: updatedFields,
    }))

    try {
      await reorderFields(updatedFields)
    } catch {
      // Erro já tratado no hook
    }
  }

  const handleUpdateField = async (id: string, updates: Partial<FormField>) => {
    try {
      const fieldToUpdate = formConfig.fields.find(f => f.id === id)
      if (!fieldToUpdate) return

      const updatedField = { ...fieldToUpdate, ...updates } as FormField
      await updateField(id, updatedField)

      setFormConfig((prev) => ({
        ...prev,
        fields: prev.fields.map((f) => (f.id === id ? updatedField : f)),
      }))
      toast.success("Campo atualizado com sucesso!")
    } catch {
      // Erro já tratado no hook
    }
  }

  const handleRemoveField = async (id: string) => {
    try {
      await deleteField(id)
      setFormConfig((prev) => ({
        ...prev,
        fields: prev.fields.filter((f) => f.id !== id),
      }))
      toast.success("Campo excluído com sucesso!")
    } catch {
      // Erro já tratado no hook
    }
  }

  const handleSaveForm = async () => {
    toast.success("Formulário salvo com sucesso!")
    closeFormBuilderModal()
    setCurrentFormId(null)
    await fetchForms()
  }

  const handleDeleteForm = async () => {
    if (!deleteFormId) return

    try {
      await deleteForm(deleteFormId)
      toast.success("Formulário excluído com sucesso!")
      setDeleteFormId(null)
      await fetchForms()
    } catch {
      toast.error("Erro ao excluir formulário")
    }
  }

  const fetchForms = async () => {
    const token = localStorage.getItem("authtoken")
    
    if (!token) {
      console.warn("Usuário não autenticado")
      setLoading(false)
      return
    }

    try {
      const data = await fetchFormsAPI()
      setForms(data)
    } catch {
      toast.error("Erro ao buscar formulários")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const fetchFormById = async (id: string) => {
    try {
      const data = await fetchFormByIdAPI(id)

      setCurrentFormId(id)
      setCurrentFormTitle(data.title || "")
      setCurrentFormDescription(data.description || "")
      setFormConfig({
        version: Number(data.version),
        fields: data.fields || [],
      })

      openPreviewModal()
    } catch {
      toast.error("Erro ao buscar formulário")
    }
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
                <p>Nenhum formulário criado</p>
              ) : (
                forms.map((form) => (
                  <VersionCard
                    key={form.id}
                    title={form.title}
                    startDate={form.createdAt}
                    onUse={() => fetchFormById(form.id)}
                    onEdit={() => fetchFormById(form.id)}
                    onDelete={() => setDeleteFormId(form.id)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 bg-white p-4 dark:bg-gray-900">
            <Button variant="destructive" onClick={closeFullscreenModal}>
              Cancelar
            </Button>

            <Button variant="ninaButton" onClick={openFormBaseModal}>
              Adicionar Formulários
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isFormBaseModalOpen}
        onClose={closeFormBaseModal}
        size="default"
      >
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-blue dark:text-white mb-6">
            Criar Novo Formulário
          </h3>
          <FormBaseCreator
            onSubmit={handleCreateFormBase}
            onCancel={closeFormBaseModal}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isFormBuilderModalOpen}
        onClose={closeFormBuilderModal}
        size="large"
      >
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <FormBuilder
            config={formConfig}
            formTitle={currentFormTitle}
            formDescription={currentFormDescription}
            onAddField={handleAddFieldToAPI}
            onUpdateField={handleUpdateField}
            onRemoveField={handleRemoveField}
            onReorderFields={handleReorderFields}
            onPreview={openPreviewModal}
            onSaveForm={handleSaveForm}
          />
        </div>
      </Modal>


      <Modal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        size="large"
      >
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <DynamicForm
            config={formConfig}
            onSubmit={(data) => {
              console.log("Form data:", data)
              toast.success("Formulário enviado!")
            }}
          />
        </div>
      </Modal>

      <Modal isOpen={!!deleteFormId} onClose={() => setDeleteFormId(null)} size="default">
        <div className="p-6">
          <h4 className="font-semibold text-blue dark:text-white mb-3 text-[20px]">Excluir formulário?</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Tem certeza que deseja excluir o formulário &quot;{forms.find(f => f.id === deleteFormId)?.title}&quot;? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={() => setDeleteFormId(null)} className="px-6">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteForm} className="px-6">
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
