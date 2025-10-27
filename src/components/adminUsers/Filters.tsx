import React from 'react';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';

interface FiltersProps {
  filters: {
    name: string;
    category: string;
    company: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const categories = ['GESTOR', 'AVALIADOR', 'ADMINISTRADOR', 'COMUM', 'MEMBRO DE STARTUP'];
  const companies = ['PAGUE MENOS', 'LOJAS AMERICANAS', 'MAGAZINE LUIZA', 'VIA VAREJO', 'CASAS BAHIA', 'NATURA', 'AMBEV', 'RENNER'];

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Filtro por Nome */}
        <div>
          <Label htmlFor="name">Nome</Label>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={filters.name}
            onChange={(e) => onFilterChange('name', e.target.value)}
            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 dark:focus:border-brand-800"
          />
        </div>

        {/* Filtro por Nível de Usuário */}
        <div>
          <Label htmlFor="category">Nível de Usuário</Label>
          <Select
            options={[{ value: '', label: 'Todos os níveis' }, ...categories.map(cat => ({ value: cat, label: cat }))]}
            placeholder="Selecione o nível"
            onChange={(value) => onFilterChange('category', value)}
            defaultValue={filters.category}
          />
        </div>

        {/* Filtro por Empresa */}
        <div>
          <Label htmlFor="company">Empresa</Label>
          <Select
            options={[{ value: '', label: 'Todas as empresas' }, ...companies.map(comp => ({ value: comp, label: comp }))]}
            placeholder="Selecione a empresa"
            onChange={(value) => onFilterChange('company', value)}
            defaultValue={filters.company}
          />
        </div>

        {/* Botão Limpar Filtros */}
        <div>
          <button
            onClick={() => {
              onFilterChange('name', '');
              onFilterChange('category', '');
              onFilterChange('company', '');
            }}
            className="w-full px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

    </div>
  );
}