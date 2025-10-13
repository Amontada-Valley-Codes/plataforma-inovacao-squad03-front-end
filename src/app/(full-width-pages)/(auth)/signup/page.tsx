'use client'

export default function UserCadastro() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg h-[600px] flex flex-col">

        <div className="p-6 border-b border-gray-200 text-center">
          <img src="/Topic.png" alt="Logo" className="mx-auto h-20 sm:h-20" />
          <h2 className="text-green-600 font-bold text-xl mt-4">CADASTRO</h2>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 sm:p-6">
          <form className="space-y-4 sm:space-y-6">

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Nome da Startup:</label>
              <input
                type="text"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">CNPJ:</label>
              <input
                type="text"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Segmento de Atuação:</label>
              <input
                type="text"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Problemas que resolve:</label>
              <input
                type="text"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Tecnologias utilizadas:</label>
              <input
                type="text"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Estágio de maturidade:</label>
              <select className="defaultValue w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]">
                <option>Escolha uma opção:</option>
                <option>Ideação</option>
                <option>Operação</option>
                <option>Tração</option>
                <option>Escala</option>
              </select>
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Localização:</label>
              <input
                type="text"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Fundadores:</label>
              <input
                type="text"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Pitch:</label>
              <input
                type="file"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div className="text-left">
              <label className="block mb-1 text-sm font-medium">Links úteis:</label>
              <input
                type="url"
                className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#7EB627] text-white font-medium py-2 rounded-lg hover:bg-[#6aa21f] transition"
              >
                Cadastrar
              </button>
            </div>

            <p className="flex items-center justify-center text-xs sm:text-sm text-gray-500 mt-6">
                    Já faz parte de uma corporação? 
                    <a href="/signin" className="text-green hover:underline ml-1" > Faça login </a>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}
