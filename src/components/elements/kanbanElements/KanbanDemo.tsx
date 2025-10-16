"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import * as Kanban from "@/components/ui/Kanban";
import { PropsCard } from "@/types";
import { GripVertical } from "lucide-react"; // import do ícone
import CardKanbanDetail from "./CardKanbanDetails";
import { api } from "@/api/axiosConfig";

const COLUMN_TITLES: Record<string, string> = {
  GENERATION: "Geração de Ideias",
  PRE_SCREENING: "Pré-Triagem",
  IDEATION: "Ideação",
  DETAILED_SCREENING: "Triagem Detalhada",
  EXPERIMENTATION: "Experimentação",
};


export default function KanbanDemo() {
  const [cards, setCards] = React.useState<PropsCard[]>([]);

  React.useEffect(() => {

    const getChallenges = async () => {

      try {

        const token = localStorage.getItem("authtoken")

        const response = await api.get("/challenges", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setCards(response.data)

      } catch(error) {
        console.error("error", error)
      }
    }

    getChallenges()

  }, [])

  const columns = React.useMemo(() => {
    const grouped: Record<string, PropsCard[]> = {
      GENERATION: [],
      PRE_SCREENING: [],
      IDEATION: [],
      DETAILED_SCREENING: [],
      EXPERIMENTATION: [],
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
