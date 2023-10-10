type ValidationType = {
  max?: number
  min?: number
}
export type Validation = {
  type: string
  message: string
}

export type FormValidationValue = Record<string, ValidationType>
export type FormValidation = Record<string, Validation[]>
