import { Button } from "../ui/button";

export default function Hero() {

    return (

        <div className="w-full h-screen bg-[url('/Background_Hero.png')] bg-cover bg-center">

            <div className="w-full h-full flex">

                <div className="flex justify-start px-6 md:px-15 lg:px-0 lg:justify-center items-center w-full lg:w-2/3 h-full">

                    <div className="space-y-4">

                        <h1 className="text-[28px] md:text-[40px] lg:text-[50px] text-white leading-11  lg:leading-15">
                            
                            Uma plataforma que <br></br> une ideias à <span className="text-[#7EB627] font-medium">soluções</span>.

                        </h1>
                
                        <Button className="px-16" variant={"ninaButton"} size={"default"} > Saiba mais </Button>

                    </div>

                </div>

                <div className="hidden w-1/3 h-full lg:block">

                </div>

            </div>

        </div>

    )

}