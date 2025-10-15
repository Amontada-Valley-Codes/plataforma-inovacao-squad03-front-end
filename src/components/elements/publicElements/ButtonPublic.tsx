import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    published: "PUBLIC" | "RESTRICTED";
    state: string
} 

export default function ButtonPublic({published, state}: Props) {
    const [isHidden, setIsHidden] = useState(state)

    const StyleVariant = {
        PUBLIC: {
            bg: "bg-red-500",
            hover: "hover:scale-105"
        },
        RESTRICTED: {
            bg: "bg-[#5BC30D]",
            hover: "hover:scale-105"
        },
    }

    return (
        
        <Button 
            variant={"ninaButton"} 
            size={"newsize"} 
            className={`
                ${StyleVariant[published].bg} 
                ${StyleVariant[published].hover} 
                ${isHidden === "EXPERIMENTATION" ? "block" : "hidden"}
                
            `}>
                    
            <span>{published === "RESTRICTED" ? "Publicar" : "Ocultar"}</span>

        </Button>

    )

}