import { MdLocationOn, MdHotel, MdRestaurant } from "react-icons/md";
import { FaPizzaSlice, FaMartiniGlass, FaHotel } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa6";

export default function Filters() {

    const links = [
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
        { label: "TECNOLOGIA", tipo: "TECNOLOGIA", icon: FaHashtag },
       
    ];

    return (

        <div className="z-[1001] bg-transparent px-2 py-2 overflow-x-auto scrollbar-hide flex items-center gap-2 w-max max-w-full mt-1">
        {links.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="flex items-center gap-2 bg-white text-[#003f5c] border-1 border-[#c9c9c9] uppercase text-[13px] px-4 py-2 rounded-2xl font-medium tracking-wide hover:bg-[#5bc30d]/30 transition-all whitespace-nowrap"
            >
              <Icon size={14} className="text-[#003f5c]" />
              {item.label}
            </button>
          );
        })}
      </div>
    )

}