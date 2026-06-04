import Link from "next/link"

const SERVICES = [
  {
    title: "Psicoterapia Gestalt",
    description:
      "Trabajo desde el aquí y ahora, fomentando la presencia, la responsabilidad y el contacto genuino contigo mismo y con tu vida.",
    icon: "🌿",
  },
  {
    title: "Desórdenes alimentarios",
    description:
      "Acompañamiento especializado en la relación con la comida, imagen corporal y autoestima. Un espacio sin juicios para sanar desde adentro.",
    icon: "🍃",
  },
  {
    title: "Regulación emocional",
    description:
      "Aprende a reconocer, nombrar y gestionar tus emociones con herramientas concretas de mindfulness y awareness.",
    icon: "🌊",
  },
  {
    title: "Autoestima y autocuidado",
    description:
      "Construimos juntos una relación más amable contigo mismo, fortaleciendo tu bienestar y tu capacidad de cuidarte.",
    icon: "💛",
  },
  {
    title: "Acompañamiento presencial",
    description:
      "Un espacio de escucha, contención y vínculo terapéutico para transitar procesos de transformación desde el amor y la conciencia.",
    icon: "🤝",
  },
  {
    title: "Terapia online",
    description:
      "Accede a consultas desde donde estés, con la misma calidez, presencia y confidencialidad de la sesión presencial.",
    icon: "💻",
  },
]

const TESTIMONIALS = [
  {
    name: "María L.",
    text: "Alejandra me ayudó a entenderme a mí misma de una manera que nunca pensé posible. Su calidez y presencia hacen la diferencia.",
  },
  {
    name: "Carlos R.",
    text: "Fui escéptico al principio, pero después de unos meses de terapia puedo decir que cambió mi vida. La recomiendo con toda confianza.",
  },
  {
    name: "Sofía M.",
    text: "El proceso con Alejandra fue transformador. Aprendí a reconocer mis emociones y hoy tengo herramientas que uso todos los días. ¡Gracias!",
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sage-50 via-cream to-terra-50 py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-terra-600 font-medium mb-3 tracking-wide uppercase text-sm">
              Psicóloga · Alejandra Palomera
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-brown-900 leading-tight mb-6">
              Un espacio para escucharte y crecer
            </h1>
            <p className="text-brown-500 text-lg leading-relaxed mb-8">
              Acompaño a personas y parejas en su camino hacia el bienestar emocional. Con empatía,
              herramientas basadas en evidencia y total confidencialidad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/agendar"
                className="bg-terra-500 text-white px-6 py-3 rounded-full font-medium hover:bg-terra-600 transition-colors"
              >
                Agendar mi consulta
              </Link>
              <Link
                href="#sobre-mi"
                className="border border-brown-300 text-brown-700 px-6 py-3 rounded-full font-medium hover:border-sage-500 hover:text-sage-600 transition-colors"
              >
                Conocerme
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 rounded-full bg-sage-100 flex items-center justify-center text-8xl shadow-inner">
              🌿
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 px-6 border-y border-brown-100 bg-brown-50">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-brown-500 text-center">
          {[
            ["10+", "Años de experiencia"],
            ["500+", "Pacientes acompañados"],
            ["95%", "Satisfacción"],
            ["100%", "Confidencialidad"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold text-brown-900">{num}</p>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="sobre-mi" className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-2xl bg-sage-100 flex items-center justify-center text-8xl shadow-sm">
              👩‍⚕️
            </div>
          </div>
          <div>
            <p className="text-terra-600 font-medium mb-2 uppercase text-sm tracking-wide">
              Sobre Alejandra
            </p>
            <h2 className="text-3xl font-bold text-brown-900 mb-5">Alejandra Palomera</h2>
            <p className="text-brown-500 leading-relaxed mb-4">
              Acompaño desde la empatía, la presencia y el respeto, para construir juntas y juntos
              una relación más amable con nosotros mismos y con la vida.
            </p>
            <p className="text-brown-500 leading-relaxed mb-6">
              Mi propósito es acompañar procesos de transformación desde el amor, la escucha y la
              conciencia. Trabajo con enfoque Gestalt, centrado en la persona y con herramientas de
              mindfulness y regulación emocional.
            </p>
            <ul className="space-y-2 text-sm text-brown-700">
              {[
                "Psicoterapia Gestalt",
                "Terapia centrada en la persona",
                "Intervenciones en salud emocional",
                "Especialización en trastornos de la conducta alimentaria",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-24 px-6 bg-sage-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-terra-600 font-medium mb-2 uppercase text-sm tracking-wide">
              Servicios
            </p>
            <h2 className="text-3xl font-bold text-brown-900">¿En qué puedo ayudarte?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-brown-100"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-brown-900 mb-2">{service.title}</h3>
                <p className="text-brown-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-terra-600 font-medium mb-2 uppercase text-sm tracking-wide">
              Proceso
            </p>
            <h2 className="text-3xl font-bold text-brown-900">Dar el primer paso es fácil</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Agenda tu consulta",
                desc: "Elige el día y horario que mejor te convenga desde nuestra página de reservas.",
              },
              {
                step: "02",
                title: "Primera sesión",
                desc: "Nos conocemos, escucho tu historia y definimos juntos los objetivos del proceso.",
              },
              {
                step: "03",
                title: "Tu proceso de cambio",
                desc: "Trabajamos a tu ritmo con herramientas personalizadas para tu bienestar.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="text-3xl font-bold text-sage-200 shrink-0">{step}</div>
                <div>
                  <h3 className="font-semibold text-brown-900 mb-2">{title}</h3>
                  <p className="text-brown-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="py-24 px-6 bg-terra-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-terra-600 font-medium mb-2 uppercase text-sm tracking-wide">
              Testimonios
            </p>
            <h2 className="text-3xl font-bold text-brown-900">Lo que dicen mis pacientes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-terra-100"
              >
                <p className="text-brown-600 leading-relaxed mb-5 text-sm italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center text-sm font-semibold text-sage-700">
                    {t.name[0]}
                  </div>
                  <p className="text-brown-900 font-medium text-sm">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-sage-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">¿Listo para dar el primer paso?</h2>
          <p className="text-sage-100 mb-8 text-lg">
            Agenda una consulta hoy. El camino hacia el bienestar comienza con una sola decisión.
          </p>
          <Link
            href="/agendar"
            className="bg-terra-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-terra-600 transition-colors inline-block"
          >
            Agendar mi consulta
          </Link>
        </div>
      </section>
    </>
  )
}
