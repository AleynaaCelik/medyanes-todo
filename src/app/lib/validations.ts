import { z } from 'zod'

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'Todo başlığı gereklidir')
    .min(3, 'Todo başlığı en az 3 karakter olmalıdır')
    .max(100, 'Todo başlığı en fazla 100 karakter olabilir')
    .trim()
})

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email gereklidir')
    .email('Geçerli bir email adresi girin'),
  name: z
    .string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .optional()
    .or(z.literal(''))
})

export type TodoFormData = z.infer<typeof todoSchema>
export type SignInFormData = z.infer<typeof signInSchema>