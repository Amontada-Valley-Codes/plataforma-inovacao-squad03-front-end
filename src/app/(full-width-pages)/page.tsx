import Hero from "@/components/sessions-landing-page/Hero";
import About from "@/components/sessions-landing-page/About";
import {Header} from "@/components/NavBar";
import Services from "@/components/sessions-landing-page/Services";

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

        <About/>

        <Services/>

    </div>
    
  );
}
