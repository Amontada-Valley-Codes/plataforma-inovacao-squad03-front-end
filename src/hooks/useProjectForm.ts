// hooks/useProjectForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormData } from '../schemas/projectSchema';

export const useProjectForm = () => {
  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'ideacao',
    }
  });

  const onSubmit = (data: ProjectFormData) => {
    console.log('Dados do formulário:', data);
    // Lógica de submit aqui
  };

  return {
    methods,
    onSubmit,
  };
};