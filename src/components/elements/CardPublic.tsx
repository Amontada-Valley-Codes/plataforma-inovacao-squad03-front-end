import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PropsCard } from "@/types"
import Image from "next/image"
import { Button } from "../ui/button"

export default function CardPublic({image, corporationName, startDate, finishDate, title, description, sector}: PropsCard) {
    

    return(

        <Card>

            <CardHeader className="flex flex-row justify-start items-center gap-4">

                {/* image */}
                <div>
                    <Image
                    src={image}
                    alt="corporation image"
                    width={40}
                    height={40}
                    className="rounded-full w-auto h-12"

                    />
                </div>

                {/* Nome da empresa */}
                <CardTitle className="text-[22px] text-blue font-medium">{corporationName}</CardTitle>

            </CardHeader>

            <CardContent className="flex flex-col justify-start items-start">

                <h1 className="text-[18px] text-blue font-medium mb-4"> {title} </h1>

                {/* descrição */}
                <p>{description}</p>

            </CardContent>

            <CardFooter className="flex justify-center md:justify-end items-center">

                {/* botão */}
                <Button variant={"ninaButton"} className="px-16"> Ver mais </Button>

            </CardFooter>

        </Card>

    )

}