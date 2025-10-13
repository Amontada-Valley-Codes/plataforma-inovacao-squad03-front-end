// schemas/projectSchema.ts
import { z } from 'zod';

export const projectSchema = z.object({
  challengeName: z.string().optional().refine(val => val && val.length > 0, 'Nome do desafio é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),

  // o option diz que o campo inicial vai ser undefined ai o refine aplica a validaçao costumizada que verifica se o valor E se não está vazio
  startDate: z.string().optional().refine(val => val && val.length > 0, 'Data de início é obrigatória'),
  deliveryDate: z.string().optional().refine(val => val && val.length > 0, 'Data de entrega é obrigatória'),
  sector: z.string().optional().refine(val => val && val.length > 0, 'Setor é obrigatório'),
  description: z.string().optional()
    .refine(val => val && val.length > 0, 'Descrição é obrigatória')
    .refine(val => !val || val.length <= 500, 'Descrição muito longa'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;