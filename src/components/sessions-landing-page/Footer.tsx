import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white px-6 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">

                <div className="flex justify-center md:justify-start">
                    <img src="/Topic_2.png" alt="Logo da Empresa" className="w-40" />
                </div>

                <nav className="flex flex-col text-center md:text-left space-y-2 text-green font-medium">
                    <Link href="/" className="hover:text-green transition">Home</Link>
                    <Link href="/sobre" className="hover:text-green transition">Sobre</Link>
                    <Link href="/solucoes" className="hover:text-green transition">Soluções</Link>
                    <Link href="/startups" className="hover:text-green transition">Startups</Link>
                </nav>

                <div className="text-center md:text-left">
                    <p className="text-green font-semibold">Contato:</p>
                    <a href="mailto:contato@gmail.com" className="hover:text-green transition">
                        contato@gmail.com</a>
                </div>

                <div className="text-center md:text-left">
                    <p className="text-green font-semibold mb-3">Nossos parceiros:</p>
                <div className="flex justify-center md:justify-start gap-4">
                    <img src="/logo_pague_menos.png" alt="Pague Menos" className="h-8 object-contain"/>
                    <img src="/logo-nina-light.png" alt="NNA Hub" className="h-8 object-contain" />
                </div>
                </div>
            </div>
        </footer>
    )
}