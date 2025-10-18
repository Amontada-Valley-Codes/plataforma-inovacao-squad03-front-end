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

    const createComment = async (data: CommentData) => {

        try {
            const token = localStorage.getItem("authtoken")

            api.post("/comments", {
                content: data.content,
                challengeId: props.challengerId
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            props.setCommentsUplaod(!props.commentsUpload)
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
    } = useForm<CommentData>({
        resolver: zodResolver(commentSchema)
    })

    return (

        <form onSubmit={handleSubmit(createComment)} className="w-full relative">

            <Input
                placeholder="Escreva um comentário"
                className="pr-15"
                {...register("content") as any}
            />

            {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
            )}



            <Button
                type="submit"
                variant={"ninaButton"} 
                size={"icon"} 
                className="absolute top-1 right-2 rounded-full"
            > 
                <IoIosSend color="white" className="!w-5 !h-5"/>
            </Button>

        </form>

    )

}