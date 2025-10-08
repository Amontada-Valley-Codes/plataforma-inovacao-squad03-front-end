"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import * as Kanban from "@/components/ui/Kanban";
import { PropsCard } from "@/types";
import CardKanban from "./CardKanban";
import { GripVertical } from "lucide-react"; // import do ícone
import CardKanbanDetail from "./CardKanbanDetails";

const COLUMN_TITLES: Record<string, string> = {
  generation: "Geração de Ideias",
  pre_screening: "Pré-Triagem",
  ideation: "Ideação",
  detailed_screening: "Triagem Detalhada",
  experimentation: "Experimentação",
};

const allCards: PropsCard[] = [ 
  { 
    id: "1", 
    image: "/empresa.png", 
    corporationName: "Pague Menos", 
    startDate: "2025/10/01", 
    finishDate: "2025/10/15", 
    title: "Novo Sistema de Pedidos", 
    description: "Implementação de sistema para controle de pedidos online.", 
    sector: "Varejo", 
    status: "generation", 
    published: "PUBLICO", 
  }, 
  { 
    id: "2", 
    image: "/empresa.png", 
    corporationName: "Unimed", 
    startDate: "2025/09/15", 
    finishDate: "2025/10/05", 
    title: "App de Agendamento", 
    description: "Aplicativo de agendamento para pacientes.", 
    sector: "Saúde", 
    status: "experimentation", 
    published: "RESTRITO", 
  }, 
  { 
    id: "3", 
    image: "/empresa.png", 
    corporationName: "Unimed", 
    startDate: "2025/09/15", 
    finishDate: "2025/10/05", 
    title: "App de Agendamento", 
    description: "Aplicativo de agendamento para pacientes.", 
    sector: "Saúde", 
    status: "ideation", 
    published: "RESTRITO", 
  }, 
  { 
    id: "4", 
    image: "/empresa.png", 
    corporationName: "Unimed", 
    startDate: "2025/09/15", 
    finishDate: "2025/10/05", 
    title: "App de Agendamento", 
    description: "Aplicativo de agendamento para pacientes.", 
    sector: "Saúde", 
    status: "pre_screening", 
    published: "RESTRITO", 
  }, 
];

export default function KanbanDemo() {
  const [cards, setCards] = React.useState<PropsCard[]>(allCards);

  const columns = React.useMemo(() => {
    const grouped: Record<string, PropsCard[]> = {
      generation: [],
      pre_screening: [],
      ideation: [],
      detailed_screening: [],
      experimentation: [],
    };
    for (const card of cards) {
      if (grouped[card.status]) grouped[card.status].push(card);
    }
    return grouped;
  }, [cards]);

  return (
    <Kanban.Root
      value={columns}
      onValueChange={(newColumns) => {
        const updatedCards: PropsCard[] = [];
        for (const [columnKey, items] of Object.entries(newColumns)) {
          for (const item of items) {
            updatedCards.push({ ...item, status: columnKey });
          }
        }
        setCards(updatedCards);
      }}
      getItemValue={(item) => item.id}
    >
      <Kanban.Board className="flex gap-4 p-2 overflow-x-auto w-full min-w-0 scrollbar-hidden h-full">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <Kanban.Column
            key={columnValue}
            value={columnValue}
            className="w-72 flex-none border-[#C9C9C9] dark:border-gray-700 bg-gray-50 dark:bg-gray-900 h-full"
          >
            {/* Cabeçalho da coluna */}
            <div className="text-blue bg-card px-3 py-2 rounded-md flex items-center border-b-2 border-l-10 border-l-green justify-between">
              <span className="font-semibold text-[18px]">
                {COLUMN_TITLES[columnValue]}
              </span>
              <Badge variant="secondary" className="pointer-events-none rounded-sm">
                {tasks.length}
              </Badge>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
              
              {tasks.map((card) => (
                <Kanban.Item key={card.id} value={card.id} asChild>

                  <div className="relative bg-card shadow-md rounded-md hover:scale-102 transition-all">
                    
                    <div>
                      <CardKanbanDetail {...card} />
                    </div>
                    
                    <Kanban.ItemHandle className="absolute top-2 right-0 cursor-grab text-gray-500 hover:text-gray-700">
                      <GripVertical className="h-4 w-4" />
                    </Kanban.ItemHandle>

                  </div>
                </Kanban.Item>
              ))}
            </div>
          </Kanban.Column>
        ))}
      </Kanban.Board>

      <Kanban.Overlay>
        <div className="size-full overflow-x-auto rounded-md bg-primary/10" />
      </Kanban.Overlay>
    </Kanban.Root>
  );
}
