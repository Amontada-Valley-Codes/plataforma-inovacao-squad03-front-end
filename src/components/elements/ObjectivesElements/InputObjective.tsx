import { Button } from "@/components/ui/button"
import Input from "@/components/form/input/InputField";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa6"
import z from "zod"
import { InputObjectiveProps } from "@/types";
import { api } from "@/api/axiosConfig";
import { useState } from "react";

const ObjectiveSchema = z.object({
    content: 
        z.string()
        .min(1, "Escreva algo para criar um objetivo estratégico.")
})

type ObjectiveData = z.infer<typeof ObjectiveSchema>

export default function InputObjective(props: InputObjectiveProps) {
    const [loading, setLoading] = useState(false)

    const createObjective = async (data: ObjectiveData) => {

            try {
                setLoading(true)

                const token = localStorage.getItem("authtoken")
                
                await api.post("/strategic-objectives", {
                    title: data.content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                props.setObjectUpload(!props.ObjectiveUpload)
                reset()

            } catch(error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
            
        }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ObjectiveData>({
        resolver: zodResolver(ObjectiveSchema)
    })

    return (

        <form onSubmit={handleSubmit(createObjective)} className="w-full relative">

            <Input
                placeholder="Crie um objetivo estratégico"
                className="pr-15"
                {...register("content")}
            />

            {errors.content && (
                <span className="text-red-500 text-[14px]">{errors.content.message}</span>
            )}

            <Button
                type="submit"
                disabled={loading}
                variant={"ninaButton"} 
                size={"icon"} 
                className="absolute top-1 right-2 rounded-full"
            >   
                {loading? (
                    <div className="flex justify-center">
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <FaPlus color="white" className="!w-5 !h-5"/>
                )}
                
            </Button>

        </form>

    )

}