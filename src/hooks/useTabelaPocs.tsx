import { useState, useEffect, useMemo } from "react";
import { api } from "@/api/axiosConfig";
import Badge from "@/components/ui/badge/Badge";

// Tipos
export interface Startup {
  name: string;
}

export interface Challenge {
  name: string;
}

export interface Poc {
  id: string;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "IN_PROGRESS" | "COMPLETED";
  startup: Startup;
  challenge: Challenge;
  challengeId: string;
  startupId: string;
  createdById: string;
}

export interface PaginationMeta {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface PocResponse {
  data: Poc[];
  meta: PaginationMeta;
}

// Mapeamentos
const statusMap: Record<string, string> = {
  "PENDING": "Pendente",
  "APPROVED": "Aprovado", 
  "REJECTED": "Rejeitado",
  "IN_PROGRESS": "Em Andamento",
  "COMPLETED": "Concluído"
};

const statusColorMap: Record<string, "success" | "warning" | "info" | "light" | "primary"> = {
  "PENDING": "warning",
  "APPROVED": "success",
  "REJECTED": "light",
  "IN_PROGRESS": "info",
  "COMPLETED": "primary"
};

// Hook para buscar POCs
function usePocsByCorporation(page: number = 1, limit: number = 10) {
  const [data, setData] = useState<PocResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPocs = async (page: number, limit: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("authtoken");
      
      const response = await api.get(`/poc/PaginedByCorporation?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setData(response.data);
    } catch (err) {
      setError("Erro ao carregar POCs");
      console.error("Erro ao buscar POCs:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => fetchPocs(page, limit);

  useEffect(() => {
    fetchPocs(page, limit);
  }, [page, limit]);

  return {
    pocs: data?.data || [],
    pagination: data?.meta,
    loading,
    error,
    refetch,
    hasMore: data?.meta ? data.meta.currentPage < data.meta.totalPages : false
  };
}

// Hook principal da tabela
export function useTabelaPocs(onDelete?: (poc: Poc) => void) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { pocs, pagination, loading, error, refetch, hasMore } = usePocsByCorporation(currentPage, pageSize);

  const handleDelete = async (poc: Poc) => {
    try {
      const token = localStorage.getItem("authtoken");
      
      await api.delete(`/poc/${poc.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      refetch();
      onDelete?.(poc);
    } catch (error) {
      console.error("Erro ao deletar POC:", error);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const dynamicColumns = useMemo(() => {
    if (pocs.length === 0) return [];
    
    const firstPoc = pocs[0];
    const columns = Object.keys(firstPoc).filter(key => 
      !['challengeId', 'startupId', 'createdById', 'id'].includes(key)
    );
    
    const columnOrder = ['title', 'status', 'startup', 'challenge'];
    const orderedColumns = columnOrder.filter(col => columns.includes(col));
    const otherColumns = columns.filter(col => !columnOrder.includes(col));
    
    return [...orderedColumns, ...otherColumns];
  }, [pocs]);

  const formatColumnName = (columnName: string): string => {
    const nameMap: Record<string, string> = {
      'title': 'Título',
      'status': 'Status',
      'startup': 'Startup',
      'challenge': 'Desafio',
      'id': 'ID'
    };
    
    return nameMap[columnName] || columnName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/_/g, ' ');
  };

  const renderCellContent = (poc: Poc, column: string): React.ReactNode => {
    const value = poc[column as keyof Poc];
    
    switch (column) {
      case 'status':
        const statusValue = value as string;
        const badgeColor = statusColorMap[statusValue] || "light";
        const statusText = statusMap[statusValue] || statusValue;
        
        return (
          <Badge size="sm" color={badgeColor}>
            {statusText}
          </Badge>
        );
      
      case 'startup':
        return (value as Startup).name;
      
      case 'challenge':
        return (value as Challenge).name;
      
      case 'id':
        return (value as string).substring(0, 8) + '...';
      
      default:
        return value as React.ReactNode;
    }
  };

  return {
    pocs,
    pagination,
    loading,
    error,
    refetch,
    hasMore,
    currentPage,
    pageSize,
    dynamicColumns,
    handleDelete,
    handleNextPage,
    handlePrevPage,
    handlePageSizeChange,
    formatColumnName,
    renderCellContent
  };
}