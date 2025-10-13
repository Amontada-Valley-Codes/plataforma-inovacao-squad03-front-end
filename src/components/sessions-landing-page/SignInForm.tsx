'use client'
import { Button } from "../ui/button"

export default function UserLogin() {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

                <img 
                    src="/Topic.png" 
                    alt="Logo Nina Hub" 
                    className="mx-auto mb-4 w-32 sm:w-35"
                />

                <h2 className="text-xl font-bold text-[#7EB627] uppercase mb-2">
                    Login
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Digite o seu e-mail e senha de acesso.
                </p>

                <form>
                    <div className="mb-4 text-left">
                        <label className="block mb-1 text-sm font-medium">Email:</label>
                        <input 
                            type="email"
                            className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                            required
                        />
                    </div>
                    <div className="mb-6 text-left">
                        <label className="block mb-1 text-sm font-medium">Senha:</label>
                        <input 
                            type="password"
                            className="w-full border border-black rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-[#7EB627]"
                            required
                        />
                    </div>
                    <div>
                        <Button 
                            type="submit"
                            className="w-full bg-[#7EB627] text-white font-medium py-2 rounded-lg hover:bg-[#6aa21f] transition"
                        >
                            Entrar
                        </Button>
                    </div>
                </form>

                <p className="text-xs sm:text-sm text-gray-500 mt-7">
                    Ainda não tem uma corporação? <a href="/signup" className="text-[#7EB627] hover:underline">Crie a sua agora.</a>
                </p>
            </div>
        </div>
    )
}
