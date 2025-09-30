"use client";
 
import { GripVertical } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/Kanban";
 
interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
}
 
const COLUMN_TITLES: Record<string, string> = {
  generation: "Geração de Ideias",
  pre_screening: "Pré-Triagem",
  ideation: "Ideação",
  detailed_screening: "Triagem Detalhada",
  experimentation: "Experimentação",
};
 
export default function KanbanDemo() {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    generation: [
      {
        id: "1",
        title: "Add authentication",
        priority: "high",
        assignee: "John Doe",
        dueDate: "2024-04-01",
      },
      {
        id: "2",
        title: "Create API endpoints",
        priority: "medium",
        assignee: "Jane Smith",
        dueDate: "2024-04-05",
      },
      {
        id: "3",
        title: "Write documentation",
        priority: "low",
        assignee: "Bob Johnson",
        dueDate: "2024-04-10",
      },
    ],
    pre_screening: [
      {
        id: "4",
        title: "Design system updates",
        priority: "high",
        assignee: "Alice Brown",
        dueDate: "2024-03-28",
      },
      {
        id: "5",
        title: "Implement dark mode",
        priority: "medium",
        assignee: "Charlie Wilson",
        dueDate: "2024-04-02",
      },
    ],
    ideation: [
      {
        id: "6",
        title: "Setup project",
        priority: "high",
        assignee: "Eve Davis",
        dueDate: "2024-03-25",
      },
      {
        id: "7",
        title: "Initial commit",
        priority: "low",
        assignee: "Frank White",
        dueDate: "2024-03-24",
      },
    ],
    detailed_screening: [
      {
        id: "8",
        title: "Setup project",
        priority: "high",
        assignee: "Eve Davis",
        dueDate: "2024-03-25",
      },
      {
        id: "9",
        title: "Initial commit",
        priority: "low",
        assignee: "Frank White",
        dueDate: "2024-03-24",
      },
    ],
    experimentation: [
      {
        id: "10",
        title: "Setup project",
        priority: "high",
        assignee: "Eve Davis",
        dueDate: "2024-03-25",
      },
      {
        id: "11",
        title: "Initial commit",
        priority: "low",
        assignee: "Frank White",
        dueDate: "2024-03-24",
      },
    ],
  });
 
  return (
    <Kanban.Root
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <Kanban.Board className="flex gap-4 p-2 overflow-x-auto w-full min-w-0 scrollbar-hidden h-full">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <Kanban.Column
            key={columnValue}
            value={columnValue}
            className="w-72 flex-none border-[#C9C9C9] bg-white h-full " // largura fixa e impede encolher
          >
            {/* cabeçalho da coluna */}
            <div className="bg-[#7EB627] text-white px-3 py-2 rounded-t-md flex items-center justify-between">
           
                <span className="font-semibold text-sm">
                  {COLUMN_TITLES[columnValue]}
                </span>
                <Badge
                  variant="secondary"
                  className="pointer-events-none rounded-sm"
                >
                  {tasks.length}
                </Badge>
              
              <Kanban.ColumnHandle asChild>
                <Button variant="ghost" size="icon">
                  <GripVertical className="h-4 w-4" />
                </Button>
              </Kanban.ColumnHandle>
            </div>

            {/* cards */}
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <Kanban.Item key={task.id} value={task.id} asHandle asChild>
                  <div className="rounded-md shadow-xs shadow-black/40 bg-card p-3">
                    {/* conteúdo do card */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="line-clamp-1 font-medium text-sm">
                          {task.title}
                        </span>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                          className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground text-xs">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <div className="size-2 rounded-full bg-primary/20" />
                            <span className="line-clamp-1">{task.assignee}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <time className="text-[10px] tabular-nums">
                            {task.dueDate}
                          </time>
                        )}
                      </div>
                    </div>
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