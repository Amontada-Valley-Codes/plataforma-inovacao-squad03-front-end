import { api } from "@/api/axiosConfig";
import Input from "@/components/form/input/InputField";
import { Button } from "@/components/ui/button";
import { PropsInputComments } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import z from "zod";

const commentSchema = z.object({
    content: 
        z.string()
        .min(1, "Escreva algo para criar um comentário")
})

type CommentData = z.infer<typeof commentSchema>

export default function InputComment(props: PropsInputComments) {
    const [loading, setLoading] = useState(false)

    const createComment = async (data: CommentData) => {

        try {
            setLoading(true)

            const token = localStorage.getItem("authtoken")

            await api.post("/comments", {
                content: data.content,
                challengeId: props.challengerId
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            props.setCommentsUpload(!props.commentsUpload)
            reset()

        } catch(error) {
            console.log(error)
        }  finally{
            setLoading(false)
        }
        
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<CommentData>({
        resolver: zodResolver(commentSchema)
    })

    return (

        <form onSubmit={handleSubmit(createComment)} className="w-full relative">

            <Input
                placeholder="Escreva um comentário"
                className="pr-15"
                {...register("content")}
            />

            {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
            )}

            <Button
                type="submit"
                variant={"ninaButton"} 
                disabled={loading}
                size={"icon"} 
                className="absolute top-1 right-2 rounded-full"
            > 
                {loading? (
                     <div className="flex justify-center">
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) :
                (
                    <IoIosSend color="white" className="!w-5 !h-5"/>
                )}
            </Button>

        </form>

    )

}