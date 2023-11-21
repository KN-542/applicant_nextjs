type ValidationType = {
  max?: number
  min?: number
  pattern?: RegExp
}
export type Validation = {
  type: string
  message: string
}

export type FormValidationValue = Record<string, ValidationType>
export type FormValidation = Record<string, Validation[]>
