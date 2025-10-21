import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/api/axiosConfig";

interface Props {
    id: string;
    published: "PUBLIC" | "RESTRICTED";
    state: string
    reload: boolean
    setReload: (prev: boolean) => void
} 


export default function ButtonPublic({id, published, state, reload, setReload}: Props) {
    const [isHidden] = useState(state)

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

    const handlePublic = async () => {

        const statusPublic = published === "PUBLIC" ? "RESTRICTED" : "PUBLIC"

        try{
            const token = localStorage.getItem("authtoken")

            await api.put(`/challenges/${id}`, {
                publishOption: statusPublic
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setReload(!reload)
            

        } catch(error) {
            console.log(error)
        }

    }

    return (
        
        <Button 
            variant={"ninaButton"} 
            size={"newsize"}
            onClick={handlePublic}
            className={`
                ${StyleVariant[published].bg} 
                ${StyleVariant[published].hover} 
                ${isHidden === "EXPERIMENTATION" ? "block" : "hidden"}
                border-none
            `}>
                    
            <span>{published === "RESTRICTED" ? "Publicar" : "Ocultar"}</span>

        </Button>

    )

}