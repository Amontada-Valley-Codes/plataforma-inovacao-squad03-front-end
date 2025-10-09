import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TfiCommentAlt } from "react-icons/tfi";


export default function CardComments() {

    return (

        <Accordion type="single" collapsible>

            <AccordionItem value="item-1">

                <AccordionTrigger className="hover:no-underline">

                    <div className="flex gap-3 items-center"> 
                        <TfiCommentAlt  size={20} color="gray"/> 
                        
                        <span className="text-[18px]"> Comentários </span>
                    </div>

                </AccordionTrigger>

                <AccordionContent>
                    Sessão de comentários
                </AccordionContent>

            </AccordionItem>

        </Accordion>

    )

}