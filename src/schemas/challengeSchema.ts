import { z } from 'zod';

export const challengeSchema = z.object({
  name: z.string().min(1, 'Nome do desafio é obrigatório'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de fim é obrigatória'),
  sector: z.string().min(1, 'Setor é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  publishOption: z.string().min(1, 'Opção de publicação é obrigatória'),
});

export type ChallengeFormData = z.infer<typeof challengeSchema>;