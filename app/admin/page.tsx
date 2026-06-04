import AdminPanel from "@/components/AdminPanel"

export const metadata = {
  title: "Panel de administración | Dra. Ana García",
}

export default function AdminPage() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-terra-600 font-medium mb-1 uppercase text-sm tracking-wide">Administración</p>
          <h1 className="text-3xl font-bold text-brown-900">Panel de citas</h1>
          <p className="text-brown-500 mt-1 text-sm">Gestiona todas las consultas agendadas.</p>
        </div>
        <AdminPanel />
      </div>
    </section>
  )
}
