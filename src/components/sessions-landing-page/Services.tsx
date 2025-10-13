
export default function Services() {
  return (

    <div
      className="w-full min-h-screen bg-white
                 bg-[url('/imagemfundo1.png')] bg-cover bg-center 
                 flex items-center py-12 sm:py-16 md:py-20"
        id="servicos"
    >

        {/* Content */}
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 
                        gap-y-10 gap-x-16 px-6 sm:px-10 md:px-14 lg:px-20"
        >
      
            <div>
            <h2 className="text-blue text-4x1 sm:text-[32px] font-semibold flex items-center">
                <span className="h-15 w-2.5 bg-green mr-3" />
                Gestão de desafios
            </h2>
            <p className="text-gray mt-2 text-sm sm:text-[20px] ml-6">
                Publique problemas estratégicos e receba propostas.
            </p>
            </div>

       
            <div>
            <h2 className="text-blue text-4x1 sm:text-[32px] font-semibold flex items-center">
                <span className="h-15 w-2.5 bg-green mr-3" />
                Avaliação e seleção colaborativa
            </h2>
            <p className="text-gray mt-2 text-sm sm:text-[20px] ml-6">
                Ambiente de avaliação e feedback estruturado.
            </p>
            </div>

     
            <div>
            <h2 className="text-blue text-4x1 sm:text-[32px] font-semibold flex items-center mt-6">
                <span className="h-15 w-2.5 bg-green mr-3" />
                Banco de ideias e soluções
            </h2>
            <p className="text-gray mt-2 text-sm sm:text-[20px] ml-6">
                Centralize ideias, utilizando de avaliação e priorização.
            </p>
            </div>

            <div>
            <h2 className="text-blue text-4x1 sm:text-[32px] font-semibold flex items-center mt-6">
                <span className="h-15 w-2.5 bg-green mr-3" />
                Comunicação e engajamento
            </h2>
            <p className="text-gray mt-2 text-sm sm:text-[20px] ml-6">
                Dashboard, organização kanban e ambiente de comentários.
            </p>
            </div>

            <div>
            <h2 className="text-blue text-4x1 sm:text-[32px] font-semibold flex items-center mt-5">
                <span className="h-15 w-2.5 bg-green mr-3" />
                Matchmaking
            </h2>
            <p className="text-gray mt-2 text-sm sm:text-[20px] ml-6">
                Filtros que aproximam desafios de soluções com startups e parceiros.
            </p>
            </div>
        </div>
    </div>
  );
}