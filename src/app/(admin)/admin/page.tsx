import type { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard Corporativa | Topic",
  description: "Dashboard administrativo da Plataforma de Inovação",
};

export default function dashboardCorporation() {
  return (
    <div>
      <div className="bg-card rounded-[10px] py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4  my-4">
        <div className="text-blue">
          <h1 className="text-2xl md:text-3xl font-medium mb-1">
            Dashboard Corporativa
          </h1>
      
        </div>
      </div>
      
      <DashboardContent />
    </div>
  );
}