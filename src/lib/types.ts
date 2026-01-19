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
