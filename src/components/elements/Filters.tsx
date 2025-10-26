import { FaHashtag } from "react-icons/fa6";

interface FiltersProps {
  onSelectSector: (sector: string | null) => void;
}

export default function Filters({ onSelectSector }: FiltersProps) {
  const links = [
    { label: "Todos", tipo: null, icon: FaHashtag },
    { label: "Saúde", tipo: "HEALTH", icon: FaHashtag },
    { label: "Educação", tipo: "EDUCATION", icon: FaHashtag },
    { label: "Tecnologia", tipo: "TECHNOLOGY", icon: FaHashtag },
    { label: "Finanças", tipo: "FINANCIAL", icon: FaHashtag },
    { label: "Vendas", tipo: "SALES", icon: FaHashtag },
  ];

  return (
    <div className="z-[1001] bg-transparent px-2 py-2 overflow-x-auto scrollbar-hide flex items-center gap-2 w-max max-w-full mt-1">
      {links.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => onSelectSector(item.tipo)}
            className="flex items-center gap-2 bg-white text-[#003f5c] dark:hover:text-white border border-[#c9c9c9] uppercase text-[13px] px-4 py-2 rounded-2xl font-medium tracking-wide hover:bg-green/30 dark:hover:bg-green transition-all whitespace-nowrap"
          >
            <Icon size={14} className="text-[#003f5c] dark:hover:text-white" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
