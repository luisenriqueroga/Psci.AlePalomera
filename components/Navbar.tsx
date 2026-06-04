import Link from "next/link"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-brown-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-brown-900 text-lg tracking-tight">
          Lic. Alejandra Palomera
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-brown-700">
          <Link href="/#sobre-mi" className="hover:text-sage-600 transition-colors">
            Sobre mí
          </Link>
          <Link href="/#servicios" className="hover:text-sage-600 transition-colors">
            Servicios
          </Link>
          <Link href="/#testimonios" className="hover:text-sage-600 transition-colors">
            Testimonios
          </Link>
          <Link
            href="/agendar"
            className="bg-terra-500 text-white px-4 py-2 rounded-full hover:bg-terra-600 transition-colors"
          >
            Agendar consulta
          </Link>
        </nav>
        <Link
          href="/agendar"
          className="md:hidden bg-terra-500 text-white px-3 py-1.5 text-sm rounded-full hover:bg-terra-600 transition-colors"
        >
          Agendar
        </Link>
      </div>
    </header>
  )
}
