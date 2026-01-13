import { Button } from "@/components/ui/button"
import Input from "@/components/form/input/InputField";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaPlus } from "react-icons/fa6"
import z from "zod"

const ObjectiveSchema = z.object({
    content: 
        z.string()
        .min(1, "Escreva algo para criar um objetivo estratégico.")
})

type ObjectiveData = z.infer<typeof ObjectiveSchema>

export default function InputObjective() {

const createObjective = async () => {

        try {
            // createObjective = async (data: ObjectiveData) => {
            // const token = localStorage.getItem("authtoken")
            reset()

        } catch(error) {
            console.log(error)
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
                variant={"ninaButton"} 
                size={"icon"} 
                className="absolute top-1 right-2 rounded-full"
            > 
                <FaPlus color="white" className="!w-5 !h-5"/>
            </Button>

        </form>

    )

}