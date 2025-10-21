import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ChallengersForm from "./ChallengersForm"

export default function DialogForm() {

    return (

        <Dialog>

            <DialogTrigger asChild>

                <Button variant={"ninaButton"} className="px-10 md:px-12 md:text-[16px] text-white"> Novo desafio </Button>

            </DialogTrigger>

            <DialogContent className="max-h-[700px] overflow-y-auto scrollbar-hidden">

                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <ChallengersForm/>

            </DialogContent>

        </Dialog>

    )

}