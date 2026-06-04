import BookingSection from "@/components/BookingSection"

export const metadata = {
  title: "Agendar consulta | Dra. Ana García",
  description: "Agenda tu consulta con la Dra. Ana García. Elige el día y horario que mejor te convenga.",
}

export default function AgendarPage() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-terra-600 font-medium mb-2 uppercase text-sm tracking-wide">
            Reservas online
          </p>
          <h1 className="text-3xl font-bold text-brown-900 mb-3">Agenda tu consulta</h1>
          <p className="text-brown-500 max-w-md mx-auto">
            Elige el día y horario que mejor se adapte a tu agenda. Recibirás una confirmación por email.
          </p>
        </div>
        <BookingSection />
      </div>
    </section>
  )
}
