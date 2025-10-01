import Image from "next/image";

export default function Services() {

    return (

        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#F5F5F5]">

                {/* Image */}
                <div className="w-full flex justify-center items-center"> 

                    <Image
                        src={"/imagemfundo1.png"}
                        alt="Imagem de fundo - Services"
                        width={800}
                        height={800}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen object-cover"
                    />

                </div>                 

        </div>
    )
}
