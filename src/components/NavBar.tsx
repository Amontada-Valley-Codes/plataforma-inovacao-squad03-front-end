"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface NavItem {
  href: string
  label: string
}

interface HeaderProps {
  navItems?: NavItem[]
  ctaText?: string
  ctaHref?: string
  mobileCtaText?: string
}

export function Header({
  navItems = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contato", label: "Contato" }
  ],
  ctaText = "Começar",
  ctaHref = "#",
  mobileCtaText = "Começar"
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("")

  const navigationItems = useMemo(() => navItems, [navItems])

  useEffect(() => {
    const handleScroll = () => {
      // Detecta se rolou mais de 50px
      setIsScrolled(window.scrollY > 50)

      // Detecta seção ativa
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

      // Encontra a seção que está mais visível na tela
      const activeSection = sections.find((section) => section && section.top <= 100 && section.bottom > 100)

      if (activeSection) {
        setCurrentSection(activeSection.href)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Chama uma vez para definir estado inicial

    return () => window.removeEventListener("scroll", handleScroll)
  }, [navigationItems])

  const navigateToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 80 // Altura do navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false) // Fecha o menu mobile
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? "bg-gray-900/50 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold">
              <Link href="/">
                <Image
                  src="/ninna.png"
                  alt="Logo NInna"
                  width={160}
                  height={120}
                  className="flex-shrink-0"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navigationItems.map((item) => (
                <button 
                  key={item.href} 
                  onClick={() => navigateToSection(item.href)} 
                  className="group relative py-2"
                >
                  <span
                    className={`text-base font-medium transition-all duration-300 cursor-pointer ${
                      currentSection === item.href ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                      currentSection === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex gap-4 items-center">
              <Button 
                className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-300" 
                asChild
              >
                <Link href={ctaHref}>
                  {ctaText}
                  <ChevronRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => navigateToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base transition-all duration-200 ${
                    currentSection === item.href
                      ? "bg-gray-800 text-white font-medium"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-800">
                <Button 
                  className="w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-300" 
                  asChild
                >
                  <Link href={ctaHref}>
                    {mobileCtaText}
                    <ChevronRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}