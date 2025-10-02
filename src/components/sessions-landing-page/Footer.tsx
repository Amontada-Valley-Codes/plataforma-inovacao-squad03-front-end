import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div>

                <div>
                    <img src="/logo.png" alt="Logo da Empresa" />
                </div>

                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/sobre">Sobre</Link>
                    <Link href="/solucoes">Soluções</Link>
                    <Link href="/startups">Startups</Link>
                </nav>

                <div>
                    <p>Contato:</p>
                    <a href="mailto:contato@gmail.com">contato@gmail.com</a>
                </div>

                <div>
                    <p>Nossos parceiros:</p>
                <div>
                    <img src="/paguemenos.png" alt="Pague Menos" />
                    <img src="/nna.png" alt="NNA Hub" />
                </div>
                </div>
            </div>
        </footer>
    )
}