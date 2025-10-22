import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PropsCard } from "@/types"
import Image from "next/image"
import CardPublicDetails from "./CardPublicDetails"

export default function CardPublic(props: PropsCard) {
    

    return(

        <Card>

            <CardHeader className="flex flex-row justify-start items-center gap-4">

                {/* imagem */}
                <div>
                    <Image
                        src={props.corporation.logo[0].url || "/default-logo.png"}
                        alt="corporation image"
                        width={40}
                        height={40}
                        className="rounded-full w-12 h-12 object-cover object-center"

                    />
                </div>

                {/* Nome da empresa */}
                <CardTitle className="text-[22px] text-blue font-medium">{props.corporation.tradingName}</CardTitle>

            </CardHeader>

            <CardContent className="flex flex-col justify-start items-start">

                <h1 className="text-[18px] text-blue font-medium mb-4"> {props.name} </h1>

                {/* descrição */}
                <p className="line-clamp-3 text-muted-foreground">{props.description}</p>

            </CardContent>

            <CardFooter className="flex justify-center md:justify-end items-center">

                {/* botão */}
                <CardPublicDetails {...props} />

            </CardFooter>

        </Card>

    )

}