"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiLoader } from "react-icons/fi";
import { Calendar1, CalendarClock } from 'lucide-react';
import { BiCategory } from "react-icons/bi";
import { CorporationChallenge } from "@/hooks/useChallengesByCorporation";
import CardComments from "../elements/CommentsElements/CardComments";
import { useEffect, useState } from "react";
import { api } from "@/api/axiosConfig";

const COLUMN_TITLES: Record<string, string> = {
  GENERATION: "Geração de Ideias",
  PRE_SCREENING: "Pré-Triagem",
  IDEATION: "Ideação",
  DETAILED_SCREENING: "Triagem Detalhada",
  EXPERIMENTATION: "Experimentação",
};

const FORMATING_SECTORS: Record<string, string> = {
  HEALTH: "Saúde",
  EDUCATION: "Educação", 
  TECHNOLOGY: "Tecnologia", 
  FINANCE: "Finanças", 
  ENERGY: "Energia",
  RETAIL: "Varejo",
  MANUFACTURING: "Manufatura",
  TRANSPORTATION: "Transporte",
  AGRICULTURE: "Agricultura",
  OTHER: "Outros"
};

interface ChallengeViewDialogProps {
  challenge: CorporationChallenge;
  children: React.ReactNode;
}

interface ChallengeDetails extends CorporationChallenge {
  description?: string;
  endDate?: string;
}

export default function ChallengeViewDialog({ challenge, children }: ChallengeViewDialogProps) {
  const [challengeDetails, setChallengeDetails] = useState<ChallengeDetails>(challenge);

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        const response = await api.get(`/challenges/${challenge.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChallengeDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do desafio:", error);
      }
    };

    fetchChallengeDetails();
  }, [challenge.id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="flex flex-col bg-card md:min-w-[600px]">
        <div className="flex justify-between items-center border-b-2">
          <DialogTitle className="text-[22px] text-blue font-medium mb-2">
            {challengeDetails.name}
          </DialogTitle>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto min-h-[200px] max-h-[500px] scrollbar-hidden px-2 transition-all">
          <div className="flex flex-col gap-8">
            <DialogHeader className="flex flex-col justify-start items-start">
              <div className="flex flex-col text-start">
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[16px] items-center">
                  <span className="font-semibold flex items-center gap-1">
                    <FiLoader /> Status:
                  </span>
                  <span className="flex justify-center bg-blue/80 dark:bg-gray-600 px-2 text-[14px] rounded-[14px] text-white">
                    {COLUMN_TITLES[challengeDetails.status] || challengeDetails.status}
                  </span>

                  <span className="font-semibold flex items-center gap-1">
                    <Calendar1 size={17} /> Data de início:
                  </span>
                  <span>{formatDate(challengeDetails.startDate)}</span>

                  {challengeDetails.endDate && (
                    <>
                      <span className="font-semibold flex items-center gap-1">
                        <CalendarClock size={17} /> Data de entrega:
                      </span>
                      <span>{formatDate(challengeDetails.endDate)}</span>
                    </>
                  )}

                  <span className="font-semibold flex items-center gap-1">
                    <BiCategory /> Setor:
                  </span>
                  <span>{FORMATING_SECTORS[challengeDetails.sector]}</span>
                </div>
              </div>
            </DialogHeader>

            {challengeDetails.description && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-[18px]">Descrição:</span>
                <p className="break-words whitespace-normal break-all">
                  {challengeDetails.description}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <CardComments challangerId={challengeDetails.id}/>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}