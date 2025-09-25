import Image from "next/image"
import { Button } from "../ui/button"

export default function About() {

    return (

        <div className="flex flex-col lg:flex-row justify-center items-center w-full min-h-screen py-5 bg-[#F5F5F5]">

            {/* Image */}
            <div className="w-full h-1/2 lg:w-1/2 lg:h-full flex justify-center lg:justify-start items-center">

                <Image
                    src={"/Foto.png"}
                    alt=""
                    width={600}
                    height={700}
                    className="object-contain w-full lg:w-[90%] h-auto lg:h-full"
                />

            </div> 

            {/* Content */}
            <div className="w-full h-fit lg:w-1/2 lg:h-full py-5 px-5 ">
                
                <div className="w-full h-full flex flex-col justify-center md:gap-10 lg:gap-8">
                    
                    <h1 className="text-[20px] md:text-[30px] font-medium text-[#0E0062] mb-5 lg:mb-0">
                        Sobre a plaforma de inovação
                    </h1>

                    <p className="text-[16px] md:text-[25px] lg:text-[24px] mb-5 md:mb-0">

                        Lorem ipsum dolor sit amet consectetur adipiscing elit. 
                        Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                        In id cursus mi pretium tellus duis convallis. Tempus leo 
                        eu aenean sed diam urna tempor. Pulvinar vivamus fringilla 
                        lacus nec metus bibendum egestas. Iaculis massa nisl malesuada 
                        lacinia integer nunc posuere. Ut hendrerit semper vel class 
                        aptent taciti sociosqu. Ad litora torquent per conubia nostra 
                        inceptos himenaeos.

                    </p>
                    
                    <div>

                        <Button 
                            variant={"ninaButton"} size={"default"}
                            className="px-16"
                        > 

                            Saiba mais

                        </Button>

                    </div>

                </div>

            </div>
            
        </div>

    )

}