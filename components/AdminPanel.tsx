"use client"

import { useEffect, useState } from "react"

type Appointment = {
  id: string
  date: string
  timeSlot: string
  name: string
  email: string
  phone: string
  service: string
  notes: string | null
  status: string
  createdAt: string
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-terra-100 text-terra-700",
  confirmed: "bg-sage-100 text-sage-700",
  cancelled: "bg-brown-100 text-brown-500",
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

export default function AdminPanel() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [updating, setUpdating] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/appointments")
      const data = await res.json()
      setAppointments(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    try {
      await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      await load()
    } finally {
      setUpdating(null)
    }
  }

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter)
  const counts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  }

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { key: "all", label: "Total", color: "bg-brown-50 border-brown-200" },
          { key: "pending", label: "Pendientes", color: "bg-terra-50 border-terra-200" },
          { key: "confirmed", label: "Confirmadas", color: "bg-sage-50 border-sage-200" },
          { key: "cancelled", label: "Canceladas", color: "bg-brown-50 border-brown-200" },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-xl border p-4 text-left transition-all ${color} ${filter === key ? "ring-2 ring-offset-1 ring-brown-400" : ""}`}
          >
            <p className="text-2xl font-bold text-brown-900">{counts[key as keyof typeof counts]}</p>
            <p className="text-sm text-brown-500">{label}</p>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-brown-400 py-12">Cargando citas...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-brown-400">
          <p className="text-4xl mb-3">📋</p>
          <p>No hay citas en esta categoría</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brown-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brown-100 bg-brown-50 text-brown-500 text-left">
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Hora</th>
                <th className="px-4 py-3 font-medium">Paciente</th>
                <th className="px-4 py-3 font-medium">Servicio</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt) => (
                <tr key={appt.id} className="border-b border-brown-50 hover:bg-cream transition-colors">
                  <td className="px-4 py-3 font-medium text-brown-900">{formatDate(appt.date)}</td>
                  <td className="px-4 py-3 text-brown-700">{appt.timeSlot}</td>
                  <td className="px-4 py-3">
                    <p className="text-brown-900 font-medium">{appt.name}</p>
                    <p className="text-brown-400 text-xs">{appt.email}</p>
                  </td>
                  <td className="px-4 py-3 text-brown-600">{appt.service}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[appt.status] ?? "bg-brown-100 text-brown-500"}`}>
                      {STATUS_LABELS[appt.status] ?? appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {appt.status !== "confirmed" && (
                        <button
                          disabled={updating === appt.id}
                          onClick={() => updateStatus(appt.id, "confirmed")}
                          className="px-2.5 py-1 text-xs rounded-lg bg-sage-100 text-sage-700 hover:bg-sage-200 transition-colors disabled:opacity-50"
                        >
                          Confirmar
                        </button>
                      )}
                      {appt.status !== "cancelled" && (
                        <button
                          disabled={updating === appt.id}
                          onClick={() => updateStatus(appt.id, "cancelled")}
                          className="px-2.5 py-1 text-xs rounded-lg bg-brown-100 text-brown-500 hover:bg-brown-200 transition-colors disabled:opacity-50"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
