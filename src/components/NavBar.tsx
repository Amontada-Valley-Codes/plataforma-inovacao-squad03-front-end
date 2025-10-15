"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface NavItem {
  href: string
  label: string
}

interface HeaderProps {
  navItems?: NavItem[]
}

export function Header({
  navItems = [
    { href: "#sobre", label: "Sobre" },
    { href: "#solucoes", label: "Soluções" },
    { href: "#startups", label: "Startups" },
    { href: "#contato", label: "Contato" },
    { href: "#login", label: "Login" },
  ],
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("")
  const router = useRouter()

  const navigationItems = useMemo(() => navItems, [navItems])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navigationItems
        .map((item) => {
          const element = document.querySelector(item.href)
          if (element) {
            const rect = element.getBoundingClientRect()
            return {
              href: item.href,
              top: rect.top,
              bottom: rect.bottom,
            }
          }
          return null
        })
        .filter(Boolean)

      const activeSection = sections.find(
        (section) => section && section.top <= 100 && section.bottom > 100
      )

      if (activeSection) {
        setCurrentSection(activeSection.href)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [navigationItems])

  const navigateToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/Topic.png"
                alt="Logo Topic"
                width={100}
                height={100}
                priority
                className="flex-shrink-0"
              />
            </Link>

            {/* Navegação Desktop */}
            <div className="hidden md:flex items-center space-x-10 ml-auto">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    navigateToSection(item.href)
                  }}
                  className="group relative py-2"
                >
                  <span
                    className={`text-base font-semibold uppercase tracking-wide transition-all duration-300 ${
                      currentSection === item.href
                        ? "text-[#0E0062]"
                        : "text-[#0E0062] group-hover:text-[#5BC30D]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 ${
                      currentSection === item.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}

              <Button 
                variant={"ninaButton"} 
                className="px-10 font-bold tracking-wide"
                onClick={() => {router.push("login")}}
                >
                  LOGIN
                </Button>

            </div>

            {/* Botão mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#0A065C] transition-colors duration-200 ml-auto"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden shadow-md">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    navigateToSection(item.href)
                  }}
                  className={`block w-full text-center uppercase font-bold tracking-wide px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                    currentSection === item.href
                      ? "bg-gray-100 text-[#0A065C] font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#0A065C]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}