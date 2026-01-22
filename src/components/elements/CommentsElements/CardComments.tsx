
import { TfiCommentAlt } from "react-icons/tfi";
import CommentSession from "./CommentSession";
import { PropsSessionComment } from "@/types";


export default function CardComments({challangerId}: PropsSessionComment) {

    return (

        <div>

            <div className="flex flex-col gap-5">

                <div className="flex gap-3 items-center"> 
                    <TfiCommentAlt  size={20} color="gray"/> 
                    
                    <span className="text-[20px] font-medium"> Comentários </span>
                </div>


                <div>

                    <CommentSession challangerId={challangerId}/>
                 
                </div>

            </div>

        </div>

    )

}