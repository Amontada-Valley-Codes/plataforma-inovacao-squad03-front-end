import Hero from "@/components/sessions-landing-page/Hero";
import About from "@/components/sessions-landing-page/About";
import {Header} from "@/components/NavBar";
import Services from "@/components/sessions-landing-page/Services";
import Startups from "@/components/sessions-landing-page/Startups";
import Footer from "@/components/sessions-landing-page/Footer";

export default function Initial() {

  return (

    <div>
        <Header
          navItems={[
            { href: "#sobre", label: "Sobre" },
            { href: "#servicos", label: "Serviços" },
            { href: "#startups", label: "Startups" },
            { href: "#contato", label: "Contato" },
          ]}
        />

        <Hero/>

        <About/>

        <Services/>

        <Startups/>

        <Footer/>
    </div>
    
  );
}
