'use client'

import CardPublic from "@/components/elements/publicElements/CardPublic";
import Filters from "@/components/elements/Filters";
import { PropsCard } from "@/types";
import { useEffect, useRef, useState } from "react";
import { api } from "@/api/axiosConfig";

export default function Workflow() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<PropsCard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);


  useEffect(() => {
    const getChallengesPublic = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        const response = await api.get("/challenges/publicos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getChallengesPublic();
  }, []);

    const filteredPosts = posts.filter((post) => {
        const term = searchTerm.toLowerCase();

        const matchesSearch =
            post.name?.toLowerCase().includes(term) ||
            post.corporation.tradingName?.toLowerCase().includes(term)
          

        const matchesSector =
            !selectedSector || post.sector?.toUpperCase() === selectedSector;

        return matchesSearch && matchesSector;
    });


  return (
    <div className="w-full min-h-full mb-5">

        <div className="flex justify-between px-2 md:px-5 py-2 flex-col md:flex-row">

        <h1 className="text-[25px] md:text-[30px] text-blue font-medium">
            Desafios Publicados
        </h1>

        {/* searchbar */}
        <div className="relative py-2 md:py-0">
            <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
            <svg
                className="fill-gray-500 dark:fill-gray-400"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
                />
            </svg>
            </span>

            <input
            ref={inputRef}
            type="text"
            placeholder="Pesquise desafios aqui"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 xl:w-[430px]"
            />
        </div>
        </div>

      {/* categorias */}
      <div>
        <Filters onSelectSector={(sector) => setSelectedSector(sector)} />
      </div>

      {/* desafios */}
      <div className="mt-4 gap-5 grid md:grid-cols-2">
        {filteredPosts.map((post, index) => (
          <div key={index}>
            <CardPublic {...post} id={post.id} />
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-gray-400 text-center col-span-full">
            Nenhum desafio encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
