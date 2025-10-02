import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { PropsCard } from "@/types"


export default function CardPublicDetails({id, image, corporationName, startDate, finishDate, title, description, sector, status, published}: PropsCard) {

    return (

        <Dialog>

        <DialogTrigger asChild>

            <Button variant={"ninaButton"} className="px-16 text-white"> Ver mais </Button>
            
        </DialogTrigger>

        <DialogContent>

            <DialogHeader>

            <DialogTitle>Are you absolutely sure?</DialogTitle>

            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>

            </DialogHeader>

            

        </DialogContent>

        </Dialog>

    )

}