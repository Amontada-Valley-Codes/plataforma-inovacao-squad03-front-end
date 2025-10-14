import Input from "../form/input/InputField";
import { Button } from "../ui/button";
import { IoIosSend } from "react-icons/io";

export default function InputComment() {

    return (

        <div className="w-full relative">
            <Input
                placeholder="Escreva um comentário"
                className="pr-15"
            />
            <Button variant={"ninaButton"} size={"icon"} className="absolute top-1 right-2 rounded-full"> 
                <IoIosSend color="white" className="!w-5 !h-5"/>
            </Button>
        </div>

    )

}