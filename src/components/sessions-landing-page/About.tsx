import Image from "next/image"

export default function About() {
  return (
    <section className="flex flex-col lg:flex-row w-full min-h-screen bg-[#FFFFFF]">
      
      {/* Lado da Imagem */}
      <div className="relative w-full h-[300px] lg:w-1/2 lg:h-screen">
        <Image
          src="/Imagem_2.png" // certifique-se de que está em /public
          alt="Sobre a plataforma de inovação"
          fill
          quality={100}
          className="object-cover"
          priority
        />
      </div>

      {/* Lado do Texto */}
      <div className="flex flex-col justify-normal w-full lg:w-1/2 px-6 lg:px-12 py-10">
        
        <p className="text-[16px] text-justify font-light md:text-[20px] lg:text-[25px] text-gray-600 leading-relaxed">
          Ferramenta que nasceu com o objetivo de conectar pessoas e projetos, para criar soluções de forma inteligente e integrada. <br/>
          Nossa plataforma reúne as ferramentas necessárias para transformar a organização interna dos seus projetos e gerar um ambiente
          de interação que acelera a resolução de problemas.
        </p>
      </div>
    </section>
  )
}
