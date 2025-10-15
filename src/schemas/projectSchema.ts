// schemas/projectSchema.ts
import { z } from 'zod';

export const projectSchema = z.object({
  challengeName: z.string().min(1, 'Nome do desafio é obrigatório'),
  status: z.string().optional().refine(val => val && val.length > 0, 'Opção de publicação é obrigatória'),
  startDate: z.string().optional().refine(val => val && val.length > 0, 'Data de início é obrigatória'),
  deliveryDate: z.string().optional().refine(val => val && val.length > 0, 'Data de entrega é obrigatória'),
  sector: z.string().optional().refine(val => val && val.length > 0, 'Setor é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição muito longa'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;