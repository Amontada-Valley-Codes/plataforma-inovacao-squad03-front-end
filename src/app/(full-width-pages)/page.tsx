import Hero from "@/components/sessions-landing-page/Hero";
import SessionsLogo from "@/components/sessions-landing-page/SessionLogos";
import About from "@/components/sessions-landing-page/About";
import {Header} from "@/components/NavBar";

export default function Initial() {

  return (

    <div>
        <Header
          navItems={[
            { href: "#sobre", label: "Sobre" },
            { href: "#servicos", label: "Serviços" },
            { href: "#portfolio", label: "Portfolio" },
            { href: "#contato", label: "Contato" }
          ]}
          ctaText="Faça Login"
          ctaHref="#contato"
          mobileCtaText="Começar"
        />

        <Hero/>

        <SessionsLogo/>

        <About/>

    </div>
    
  );
}
