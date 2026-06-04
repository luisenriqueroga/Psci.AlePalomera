import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-brown-300 py-12 mt-20">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-semibold text-white text-lg mb-2">Dra. Ana García</p>
          <p className="text-sm leading-relaxed">
            Psicóloga clínica con más de 10 años de experiencia. Un espacio seguro para tu bienestar.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Navegación</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#sobre-mi" className="hover:text-white transition-colors">
                Sobre mí
              </Link>
            </li>
            <li>
              <Link href="/#servicios" className="hover:text-white transition-colors">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/agendar" className="hover:text-white transition-colors">
                Agendar consulta
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Contacto</p>
          <ul className="space-y-2 text-sm">
            <li>contacto@draanagarcia.com</li>
            <li>+54 11 1234-5678</li>
            <li>Buenos Aires, Argentina</li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-8 pt-6 border-t border-brown-700 text-xs text-center">
        © {new Date().getFullYear()} Dra. Ana García. Todos los derechos reservados.
      </div>
    </footer>
  )
}
