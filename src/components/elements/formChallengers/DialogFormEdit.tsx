import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ChallengersFormEdit from "./ChallengersFormEdit"
import { PropsFormChallenger } from "@/types"



export default function DialogFormEdit(props: PropsFormChallenger) {

    return (

        <Dialog>

            <DialogTrigger asChild>
                

                <span className="flex gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                </span>

            </DialogTrigger>

            <DialogContent className="max-h-[700px] overflow-y-auto scrollbar-hidden">

                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <ChallengersFormEdit {...props} />

            </DialogContent>

        </Dialog>

    )

}