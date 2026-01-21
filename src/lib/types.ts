export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'email' 
  | 'number' 
  | 'select' 
  | 'multiselect' 
  | 'date'

export interface FormField {
  id: string
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required: boolean
  helpText?: string
  options?: string[]
  order: number
}

export interface FormConfig {
  version: number
  fields: FormField[]
}

export interface FormListItem {
  id: string
  title: string
  description: string
  version: string
  createdAt: string
  fieldsCount: number
}