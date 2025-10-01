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
            { href: "#startups", label: "Startups" },
            { href: "#contato", label: "Contato" },
            { href: "#login", label: "Login" }
          ]}
        />

        <Hero/>

        <SessionsLogo/>

        <About/>

    </div>
    
  );
}
