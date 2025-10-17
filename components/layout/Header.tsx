'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MotionDiv } from '@/components/animations/MotionWrapper'
import { NeuButton } from '@/components/ui/NeuButton'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Studio', href: '/studio' },
  { name: 'Services', href: '/#services' },
  { name: 'Connect', href: '/connect' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-base/95 backdrop-blur-md shadow-neu-flat' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group flex items-center">
            {/* Replace with actual logo once provided */}
            <div className="relative h-10 w-auto transition-all duration-300 group-hover:opacity-80">
              <Image
                src="/logo.svg"
                alt="OloSoma"
                width={160}
                height={40}
                priority
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback to PNG if SVG not found
                  e.currentTarget.src = '/logo.png'
                }}
              />
            </div>
            {/* Temporary fallback until logo is uploaded */}
            <noscript>
              <span className="text-xl font-bold text-white">OloSoma</span>
            </noscript>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href.includes('#') && pathname === '/')

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive ? 'text-teal-accent' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-accent transition-all group-hover:w-full ${
                    isActive ? 'w-full' : ''
                  }`} />
                </Link>
              )
            })}

            <Link href="/connect">
              <NeuButton variant="primary" className="text-sm py-2 px-6">
                Get Started
              </NeuButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-6 h-0.5 bg-teal-accent transition-all ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`block w-6 h-0.5 bg-teal-accent transition-all ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block w-6 h-0.5 bg-teal-accent transition-all ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MotionDiv
            className="md:hidden mt-6 pt-6 border-t border-teal-accent/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-colors ${
                      isActive ? 'text-teal-accent' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <Link href="/connect" onClick={() => setIsMobileMenuOpen(false)}>
                <NeuButton variant="primary" className="w-full">
                  Get Started
                </NeuButton>
              </Link>
            </div>
          </MotionDiv>
        )}
      </nav>
    </header>
  )
}
