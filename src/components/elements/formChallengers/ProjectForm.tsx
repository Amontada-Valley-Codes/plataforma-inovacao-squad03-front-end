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
import { statusOptions, sectorOptions } from '@/types/selectOptions';

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'ideacao',
    }
  });

  const onSubmit = (data: ProjectFormData) => {
    console.log('Dados do formulário:', data);
  };

  const handleSelectChange = (field: keyof ProjectFormData) => (value: string) => {
    setValue(field, value);
  };

  const handleDateChange = (field: keyof ProjectFormData) => (dates: any, currentDateString: string) => {
    setValue(field, currentDateString);
  };

  return (
    <ComponentCard title="Formulário de Projeto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="status">Status</Label>
          <div className="relative">
            <Select
              options={statusOptions}
              placeholder="Selecione o status"
              onChange={handleSelectChange('status')}
              className="dark:bg-dark-900"
              defaultValue="ideacao"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div>
          <DatePicker
            id="start-date"
            label="Data de início"
            placeholder="Selecione a data de início"
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
            onChange={(value) => setValue('description', value)}
            rows={6}
            placeholder="Descreva o projeto..."
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
