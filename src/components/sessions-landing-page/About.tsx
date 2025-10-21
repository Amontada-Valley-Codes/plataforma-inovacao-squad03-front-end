import Image from "next/image"
import { IoIosArrowDropdown } from "react-icons/io";

export default function About() {
  return (
    <section className="relative flex flex-col lg:flex-row w-full min-h-screen bg-[#FFFFFF]" id="sobre">
      
      {/* Lado da Imagem */}
      <div className="relative w-full h-[300px] lg:w-1/2 lg:h-screen z-0 hidden lg:block">
        <Image
          src="/Imagem_2.png" 
          alt="Sobre a plataforma de inovação."
          fill
          quality={100}
          className="object-cover"
          priority
        />
      </div>

      {/* Lado do Texto */}
      <div className="flex flex-col justify-normal w-full lg:w-1/2 lg:px-12 lg:mt-10 py-10 px-10 sm:px-0 mt-16 font-light z-0">
            <div className="max-w-[480px] mx-auto">

                <p className="text-[22px] text-justify tracking-wide md:text-[32px] lg:text-[24px] text-gray-600 leading-relaxed">
                Um sistema que nasceu com o objetivo de conectar pessoas e projetos, 
                para criar <span className="font-bold text-green">soluções</span> de forma inteligente e integrada.
                </p>
                <p className="text-[22px] text-justify md:text-[32px] lg:text-[24px] text-gray-600 leading-relaxed mt-10">
                Nossa plataforma reúne as ferramentas necessárias para transformar a 
                organização interna dos seus projetos e gerar um ambiente de interação 
                que acelera a resolução de problemas.
                </p>
            </div>
        </div>

        <div className="absolute top-1/2 left-[40%] lg:left-[8%] -translate-y-1/2 z-10 pointer-events-none hidden lg:block"
             aria-hidden="true">
          <Image
          src="/Imagem1.png" 
          alt="Mockup Dashboard."
          width={800}
          height={800}
          quality={100}
          className="object-contain"
          priority
        />          
        </div>

        {/* Elemento verde */}
          <div
            className="
              flex flex-col 
              items-center 
              justify-center 
              text-center
              absolute 
              bottom-0 
              bg-green 
              rounded-t-3xl
              w-[60%] 
              h-40
              left-1/2 
              -translate-x-1/2

              sm:w-[80%] 
              sm:h-44

              md:w-[50%] 
              md:h-70

              lg:w-75 
              lg:h-52 
              lg:rounded-t-4xl 
              lg:left-auto 
              lg:right-1/7 
              lg:translate-x-0
            "
          >
            <p className="text-white font-medium text-[20px] sm:text-center sm:p-4 md:text-[34px] lg:text-[26px] leading-snug lg:ml-10 lg:text-left">
              Conheça o que nosso sistema oferece
            </p>
            <IoIosArrowDropdown className="fill-white w-8 h-8 sm:w-9 sm:h-9 md:w-14 md:h-14 lg:w-10 lg:h-10 lg:mx-auto mt-4"/>
          </div>

    </section>
  )
}
