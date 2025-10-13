// schemas/projectSchema.ts
import { z } from 'zod';

export const projectSchema = z.object({
  status: z.string().min(1, 'Status é obrigatório'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  deliveryDate: z.string().min(1, 'Data de entrega é obrigatória'),
  sector: z.string().min(1, 'Setor é obrigatório'),
  description: z.string()
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição muito longa'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;