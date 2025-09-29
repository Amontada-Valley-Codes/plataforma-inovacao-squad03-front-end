// Exemplos de uso do componente Header

import { Header } from './NavBar'

// Exemplo 1: Header padrão (como estava antes)
export const DefaultHeader = () => {
  return <Header />
}

// Exemplo 2: Header personalizado para blog
export const BlogHeader = () => {
  return (
    <Header
      navItems={[
        { href: "#home", label: "Home" },
        { href: "#articles", label: "Artigos" },
        { href: "#categories", label: "Categorias" },
        { href: "#about", label: "Sobre" }
      ]}
      ctaText="Assinar Newsletter"
      ctaHref="/newsletter"
      mobileCtaText="Assinar"
    />
  )
}

// Exemplo 3: Header para e-commerce
export const EcommerceHeader = () => {
  return (
    <Header
      logoWidth={140}
      logoHeight={100}
      navItems={[
        { href: "#products", label: "Produtos" },
        { href: "#categories", label: "Categorias" },
        { href: "#offers", label: "Ofertas" },
        { href: "#support", label: "Suporte" }
      ]}
      ctaText="Minha Conta"
      ctaHref="/account"
      mobileCtaText="Login"
    />
  )
}

// Exemplo 4: Header simples
export const SimpleHeader = () => {
  return (
    <Header
      navItems={[
        { href: "#work", label: "Trabalhos" },
        { href: "#contact", label: "Contato" }
      ]}
      ctaText="Contratar"
      ctaHref="/hire"
      mobileCtaText="Contratar"
    />
  )
}