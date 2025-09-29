// Exemplo de como usar o NavBar em diferentes páginas

import Navbar from './NavBar'

// Exemplo 1: NavBar padrão (como estava antes)
export const DefaultNavbar = () => {
  return <Navbar />
}

// Exemplo 2: NavBar personalizado para uma página de blog
export const BlogNavbar = () => {
  return (
    <Navbar
      brandName="Meu Blog"
      navigationItems={[
        { id: "home", label: "Home" },
        { id: "articles", label: "Artigos" },
        { id: "categories", label: "Categorias" },
        { id: "about", label: "Sobre" },
        { id: "contact", label: "Contato" }
      ]}
      initialSection="home"
    />
  )
}

// Exemplo 3: NavBar para uma página de empresa
export const CompanyNavbar = () => {
  return (
    <Navbar
      brandName="MinhaEmpresa"
      navigationItems={[
        { id: "inicio", label: "Início" },
        { id: "servicos", label: "Serviços" },
        { id: "equipe", label: "Equipe" },
        { id: "projetos", label: "Projetos" },
        { id: "contato", label: "Contato" }
      ]}
      initialSection="inicio"
    />
  )
}

// Exemplo 4: NavBar simples com poucos itens
export const SimpleNavbar = () => {
  return (
    <Navbar
      brandName="Portfolio"
      navigationItems={[
        { id: "work", label: "Trabalhos" },
        { id: "contact", label: "Contato" }
      ]}
      initialSection="work"
    />
  )
}