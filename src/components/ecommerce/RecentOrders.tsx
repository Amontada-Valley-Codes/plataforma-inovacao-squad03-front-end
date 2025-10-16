import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for the table rows
interface Challenge {
  id: number;
  name: string;
  area: string;
  ideasCount: number;
  status: "Publico" | "Privado" | "Em andamento" | "Concluído";
  startDate: string;
}

// Define the table data using the interface
const tableData: Challenge[] = [
  {
    id: 1,
    name: "Otimização de Processos Logísticos",
    area: "Logística",
    ideasCount: 15,
    status: "Publico",
    startDate: "15/01/2024",
  },
  {
    id: 2,
    name: "Sustentabilidade na Cadeia de Suprimentos",
    area: "Meio Ambiente",
    ideasCount: 8,
    status: "Privado",
    startDate: "10/01/2024",
  },
  {
    id: 3,
    name: "Inteligência Artificial para Atendimento",
    area: "Tecnologia",
    ideasCount: 23,
    status: "Em andamento",
    startDate: "05/01/2024",
  },
  {
    id: 4,
    name: "Redução de Custos Operacionais",
    area: "Operações",
    ideasCount: 12,
    status: "Concluído",
    startDate: "20/12/2023",
  },
  {
    id: 5,
    name: "Experiência do Cliente Digital",
    area: "Marketing",
    ideasCount: 18,
    status: "Publico",
    startDate: "28/12/2023",
  },
];

export default function RecentChallenges() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Últimos Desafios Criados
          </h3>
        </div>


      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nome do Desafio
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Área/Tema
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                POCS Recebidas
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data Início
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((challenge) => (
              <TableRow key={challenge.id} className="">
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {challenge.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {challenge.area}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-800 dark:text-white/90">
                      {challenge.ideasCount}
                    </span>
                    <span>Pocs</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                    challenge.status === "Publico"
                      ? "success"
                      : challenge.status === "Privado"
                      ? "warning"
                      : challenge.status === "Em andamento"
                      ? "info"
                      : "light"   
                  }

                  >
                    {challenge.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {challenge.startDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}