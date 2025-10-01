"use client";

import { useState, useRef } from "react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      {/* Ícone visível só no mobile */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setTimeout(() => inputRef.current?.focus(), 100); // foca no input quando abrir
        }}
        className="block lg:hidden p-2"
      >
        <svg
          className="fill-gray-600 dark:fill-gray-300"
          width="22"
          height="22"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
          />
        </svg>
      </button>

      {/* Campo de busca */}
      <div
        className={`
          absolute top-10 left-0 w-[90vw] sm:w-[300px] lg:static lg:w-auto
          transition-all duration-200
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none lg:opacity-100 lg:scale-100"}
        `}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 
                     shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
                     dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
        />
      </div>
    </div>
  );
}
