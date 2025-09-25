"use client"

import LoopLogos from "../elements/LoopLogos";

export default function SessionsLogo() {

    return (

        <div className="w-full h-fit">

            {/* Frase */}
            <div className="w-full h-1/3 flex justify-center items-center py-5 px-5">

                <h1 className="text-center text-[25px] lg:text-[30px] text-[#0E0062] font-semibold"> 

                    Empresas que acreditam em inovar no presente <br></br> para construir o futuro: 
                    
                </h1>

            </div>

            {/* Logos */}
            <div className="w-full h-2/3 py-2 mb-20">

                <LoopLogos/>

            </div>
            
        </div>

    )

}