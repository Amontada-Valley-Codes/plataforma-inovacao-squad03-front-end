import Image from "next/image"
import { IoIosArrowDropdown } from "react-icons/io";

export default function About() {
  return (
    <section className="relative flex flex-col lg:flex-row w-full min-h-screen bg-[#FFFFFF]">
      
      {/* Lado da Imagem */}
      <div className="relative w-full h-[300px] lg:w-1/2 lg:h-screen z-0">
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
      <div className="flex flex-col justify-normal w-full lg:w-1/2 px-6 lg:px-12 py-10 mt-20 font-light z-0">
            <div className="max-w-[480px] mx-auto">

                <p className="text-[16px] text-justify tracking-wide md:text-[20px] lg:text-[24px] text-gray-600 leading-relaxed">
                Um sistema que nasceu com o objetivo de conectar pessoas e projetos, 
                para criar <span className="font-bold text-green">soluções</span> de forma inteligente e integrada.
                </p>
                <p className="text-[16px] text-justify md:text-[20px] lg:text-[24px] text-gray-600 leading-relaxed mt-10">
                Nossa plataforma reúne as ferramentas necessárias para transformar a 
                organização interna dos seus projetos e gerar um ambiente de interação 
                que acelera a resolução de problemas.
                </p>
            </div>
        </div>

        <div className="absolute top-1/2 left-[40%] lg:left-[8%] -translate-y-1/2 z-10 pointer-events-none"
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

        <div  className="flex flex-col absolute right-1/7 rounded-t-4xl bottom-0 w-75 h-52 bg-green">
            <p className="text-white justify-center font-medium text-[30px] mt-5 ml-10 leading-10">
              Conheça o que nosso sistema oferece
            </p>
            <IoIosArrowDropdown className="fill-white w-10 h-10 stroke-white mx-auto mt-3"/>
          </div>
    </section>
  )
}
