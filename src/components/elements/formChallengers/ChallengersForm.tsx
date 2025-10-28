"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon } from '@/icons';
import ComponentCard from '@/components/common/ComponentCard';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import DatePicker from '@/components/form/date-picker';
import TextArea from '@/components/form/input/TextArea';
import { projectSchema, ProjectFormData } from '@/schemas/projectSchema';
import { sectorOptions } from '@/types/selectOptions';
import { api } from '@/api/axiosConfig';


interface CreateChallengeRequest {
  name: string;
  startDate: string;
  endDate: string;
  sector: string;
  description: string;
  publishOption: string;
}

interface CreateChallengeResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  sector: string;
  description: string;
  publishOption: string;
  corporationId: string;
  status: string;
}

export default function ChallengersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      challengeName: "",
      startDate: "",
      deliveryDate: "",
      sector: "",
      description: ""
    }
  });

  const formatDateForAPI = (dateString: string, isEndDate = false): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString + 'T00:00:00');
    
    if (isEndDate) {
      date.setHours(23, 59, 59, 999);
    } else {
      date.setHours(0, 0, 0, 0);
    }
    
    return date.toISOString();
  };

  const createChallenge = async (data: CreateChallengeRequest): Promise<CreateChallengeResponse> => {
    const token = localStorage.getItem('authtoken');
    
    const response = await api.post('/challenges', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const onSubmit = async (formData: ProjectFormData) => {
    try {
      const apiData: CreateChallengeRequest = {
        name: formData.challengeName,
        startDate: formatDateForAPI(formData.startDate, false),
        endDate: formatDateForAPI(formData.deliveryDate, true),
        sector: formData.sector,
        description: formData.description,
        publishOption: "RESTRICTED"
      };

      await createChallenge(apiData);
      
      reset();
      window.location.reload()

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao criar challenge.');
    }
  };

  const handleSelectChange = (field: keyof ProjectFormData) => (value: string) => {
    setValue(field, value, { shouldValidate: true });
  };

  const handleDateChange = (field: keyof ProjectFormData) => (dates: Date[], currentDateString: string) => {
    const formattedDate = currentDateString || (dates[0] ? dates[0].toISOString().split('T')[0] : '');
    setValue(field, formattedDate, { shouldValidate: true });
  };

  return (
    <ComponentCard title="Adicione Um Desafio">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="challengeName">Nome do Desafio</Label>
          <Input
            type="text"
            placeholder="Digite o nome do desafio"
            name={register('challengeName').name}
            onChange={register('challengeName').onChange}
            ref={register('challengeName').ref}
          />
          {errors.challengeName && (
            <p className="mt-1 text-sm text-red-500">{errors.challengeName.message}</p>
          )}
        </div>



        <div>
          <DatePicker
            id="start-date"
            label="Data de início"
            placeholder="Selecione a data de início"
            value={watch('startDate')}
            onChange={handleDateChange('startDate')}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <DatePicker
            id="delivery-date"
            label="Data de entrega"
            placeholder="Selecione a data de entrega"
            value={watch('deliveryDate')}
            onChange={handleDateChange('deliveryDate')}
          />
          {errors.deliveryDate && (
            <p className="mt-1 text-sm text-red-500">{errors.deliveryDate.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="sector">Setor</Label>
          <div className="relative">
            <Select
              options={sectorOptions}
              placeholder="Selecione o setor"
              onChange={handleSelectChange('sector')}
              className="dark:bg-dark-900"
              defaultValue={watch('sector')}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.sector && (
            <p className="mt-1 text-sm text-red-500">{errors.sector.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <TextArea
            value={watch('description') || ''}
            onChange={(value) => setValue('description', value, { shouldValidate: true })}
            rows={6}
            placeholder="Descreva do Desafio..."
            error={!!errors.description}
            hint={errors.description?.message}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Formulário'}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}