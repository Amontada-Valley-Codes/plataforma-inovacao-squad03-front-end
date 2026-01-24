import { CardObjectiveProps } from "@/types";
import MenuObjective from "./MenuObjective";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { api } from "@/api/axiosConfig";
import Input from "@/components/form/input/InputField";

export default function CardObjective(props: CardObjectiveProps) {
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(props.title)
    

    useEffect(() => {
    if (isEdit) {
        setValue(props.title)
    }
    }, [isEdit, props.title])

    const handleObjectiveEdit = async () => {

        try {
            const token = localStorage.getItem("authtoken")

            const response = await api.patch(`/strategic-objectives/${props.id}`, {
                title: value
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setValue(response.data.title)
            setIsEdit(false)
            props.setObjectUpload(!props.ObjectiveUpload)

        } catch(error) {
            console.log(error)
        }

    }

    return (

        <div className="w-full flex flex-col border-2 justify-center rounded-[14px] px-4 py-2">
            
            <div className="flex justify-between items-start w-full">

                {/* Conteúdo do objetivo estratégico */}
                <div className="w-full">
                    {isEdit ? (
                        <div className="w-full flex flex-col gap-2 mb-3">
                            <Input
                                className="border rounded px-2 py-1 w-full"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />

                            <div className="flex gap-2">
                                <Button 
                                    variant={"ninaButton"} 
                                    onClick={() => {handleObjectiveEdit()}} 
                                    disabled={!value.trim()} 
                                > 
                                    Salvar 
                                </Button>

                                <Button 
                                    variant={"outline"} 
                                    onClick={() => {setIsEdit(!isEdit)}} className="text-blue border-blue" 
                                > 
                                    Descartar Alterações 
                                </Button>
                            </div>

                        </div>
                    ) : (
                        <p className="text-blue text-[20px]">
                            {props.title}
                        </p>
                    )}
                </div>

                {/* Menu de editar ou deletar */}
                <div className="flex justify-start items-start text-blue">
                    <MenuObjective
                        id={props.id}
                        ObjectiveUpload={props.ObjectiveUpload}
                        setObjectUpload={props.setObjectUpload}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                    />
                </div>

            </div>

            <div>

                {/* Data de criação */}
                <div>
                    <span className="text-sm text-gray-500">
                        Criado em: {props.createdAt}
                    </span>
                    
                </div>

            </div>

        </div>
        
    )

}