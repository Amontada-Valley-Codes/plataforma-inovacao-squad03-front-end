import Image from "next/image";
import { IoIosArrowDropdown } from "react-icons/io";

export default function About() {
  return (
    <section className="relative flex flex-col lg:flex-row w-full min-h-screen bg-[#FFFFFF]" id="sobre">
      
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

      {/* Lado do texto */}
      <div className="flex flex-col justify-normal w-full lg:w-1/2 px-6 lg:px-12 py-10 mt-14 font-light z-0">
        <div className="max-w-[480px] mx-auto">
          <p className="text-[18px] text-justify tracking-wide md:text-[24px] lg:text-[24px] text-gray-600 leading-relaxed">
            Um sistema que nasceu com o objetivo de conectar pessoas e projetos,
            para criar <span className="font-bold text-green">soluções</span> de forma inteligente e integrada.
          </p>
          <p className="text-[18px] text-justify md:text-[24px] lg:text-[24px] text-gray-600 leading-relaxed mt-10">
            Nossa plataforma reúne as ferramentas necessárias para transformar a
            organização interna dos seus projetos e gerar um ambiente de interação
            que acelera a resolução de problemas.
          </p>
        </div>
      </div>

      {/* Imagem do Desktop */}
      <div
        className="hidden lg:block absolute top-1/2 left-[40%] lg:left-[8%] -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
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

      {/* Shape verde */}
      <div
          className="absolute bottom-0 right-1/2 translate-x-1/2 lg:right-[15%] lg:translate-x-0 bg-green rounded-t-[2rem]
            flex flex-col items-center justify-center sm:w-[70%] md:w-[60%] lg:w-[20%] h-[120px] sm:h-[140px] md:h-[160px] lg:h-52
            px-6 shadow-lg"
        >
          <p className="text-white font-medium text-center tracking-wide sm:text-[10px] sm:leading-snug md:text-[18px] lg:text-[30px]">
            Conheça o que nosso sistema oferece
          </p>
          <IoIosArrowDropdown className="fill-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mt-2" />
        </div>


    </section>
  );
}
