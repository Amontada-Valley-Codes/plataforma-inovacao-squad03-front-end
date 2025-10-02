
export default function Hero() {
  return (
    <section className="w-full h-screen bg-[url('/Background_Hero.png')] bg-cover bg-center relative">

      {/* Overlay leve para melhorar o contraste */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative w-full h-full flex items-center">

        {/* Conteúdo lado esquerdo */}

        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 w-full lg:w-2/3 space-y-8">
          <h1 className="text-white tracking-wider font-medium text-[45px] leading-16 ml-5 md:text-[60px] md:leading-20 lg:text-[80px] lg:leading-22 max-w-3xl lg:ml-16 lg:mt-20">
            Plataforma <br></br>
            de Inovação 
            Corporativa
          </h1>

          <p className="text-white font-light tracking-wide ml-2 text-[20px] md:text-[24px] lg:text-xl max-w-xl border border-white/70 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm lg:ml-16">
            Um ambiente onde grandes empresas e mentes brilhantes se unem para
            transformar ideias em soluções.
          </p>

        </div>

        {/* Espaço vazio do lado direito (para futuros elementos/ilustrações/celular voando) */}
        <div className="hidden lg:block w-1/3" />
      </div>
    </section>
  )
}