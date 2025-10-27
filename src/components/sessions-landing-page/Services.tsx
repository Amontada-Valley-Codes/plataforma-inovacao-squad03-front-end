
export default function Services() {
  return (

    <div
        className="w-full bg-white
            bg-[url('/imagemfundo1.png')] bg-cover bg-center 
            flex items-center py-35"
        id="servicos"
    >


        {/* Content */}
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 
                        gap-y-10 gap-x-45 px-6 sm:px-10 md:px-14 lg:px-20"
        >
      
            <div>
            <h2 className="text-blue lg:text-4x1 text-[30px] font-semibold flex items-center">
                <span className="h-15 w-2 bg-green mr-3" />
                Gestão de desafios
            </h2>
            <p className="text-gray mt-2 text-[24px] sm:text-[20px] ml-6 leading-snug">
                Publique problemas estratégicos e receba propostas.
            </p>
            </div>

       
            <div>
            <h2 className="text-blue lg:text-4x1 text-[30px] font-semibold flex items-center leading-snug">
                <span className="h-15 w-2 bg-green mr-3" />
                Avaliação e seleção colaborativa
            </h2>
            <p className="text-gray mt-2 text-[24px] sm:text-[20px] ml-6 leading-snug">
                Ambiente de avaliação e feedback estruturado.
            </p>
            </div>

            <div>
            <h2 className="text-blue lg:text-4x1 text-[30px] font-semibold flex items-center leading-snug mt-9">
                <span className="h-15 w-2 bg-green mr-3" />
                Comunicação e engajamento
            </h2>
            <p className="text-gray mt-2 text-[24px] sm:text-[20px] ml-6 leading-snug">
                Dashboard, organização kanban e ambiente de comentários.
            </p>
            </div>

            <div>
            <h2 className="text-blue lg:text-4x1 text-[30px] font-semibold flex items-center leading-snug mt-9">
                <span className="h-15 w-2 bg-green mr-3" />
                Matchmaking
            </h2>
            <p className="text-gray mt-2 text-[24px] sm:text-[20px] ml-6 leading-snug">
                Filtros que aproximam desafios de soluções com startups e parceiros.
            </p>
            </div>
        </div>
    </div>
  );
}