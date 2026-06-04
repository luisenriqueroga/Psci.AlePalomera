"use client"

import { useState } from "react"
import { SERVICES, getSlotsForDay } from "@/lib/slots"

type Step = "calendar" | "time" | "form" | "success"

function isoToday() {
  const d = new Date()
  return d.toISOString().split("T")[0]
}

function formatDateLabel(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]
const DAY_LABELS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = (firstDay.getDay() + 6) % 7 // Mon=0
  const days: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
  return days
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export default function BookingSection() {
  const today = isoToday()
  const [viewYear, setViewYear] = useState(new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [step, setStep] = useState<Step>("calendar")
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0],
    notes: "",
  })

  const days = buildCalendar(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  async function handleDayClick(day: number) {
    const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`
    if (dateStr < today) return
    const slots = getSlotsForDay(dateStr)
    if (slots.length === 0) return
    setSelectedDate(dateStr)
    setLoading(true)
    try {
      const res = await fetch(`/api/appointments?date=${dateStr}`)
      const data = await res.json()
      setBookedSlots(data.booked ?? [])
    } catch {
      setBookedSlots([])
    } finally {
      setLoading(false)
    }
    setStep("time")
  }

  function handleSlotClick(slot: string) {
    setSelectedSlot(slot)
    setStep("form")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedSlot) return
    setSubmitError("")
    setLoading(true)
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, timeSlot: selectedSlot, ...form }),
      })
      if (!res.ok) {
        const err = await res.json()
        setSubmitError(err.error ?? "Error al agendar. Intenta nuevamente.")
        return
      }
      setStep("success")
    } catch {
      setSubmitError("Error de conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  function resetAll() {
    setStep("calendar")
    setSelectedDate(null)
    setSelectedSlot(null)
    setBookedSlots([])
    setForm({ name: "", email: "", phone: "", service: SERVICES[0], notes: "" })
    setSubmitError("")
  }

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-bold text-brown-900 mb-3">¡Consulta agendada!</h2>
        <p className="text-brown-500 mb-2">
          Tu cita para el{" "}
          <strong className="text-brown-700">{formatDateLabel(selectedDate!)}</strong> a las{" "}
          <strong className="text-brown-700">{selectedSlot}</strong> fue registrada.
        </p>
        <p className="text-brown-500 mb-8">
          Te enviaremos una confirmación a <strong>{form.email}</strong>.
        </p>
        <button
          onClick={resetAll}
          className="bg-sage-500 text-white px-6 py-3 rounded-full hover:bg-sage-600 transition-colors"
        >
          Agendar otra consulta
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-brown-400 mb-8">
        <button onClick={resetAll} className={step === "calendar" ? "text-brown-900 font-medium" : "hover:text-brown-700"}>
          Fecha
        </button>
        <span>/</span>
        <button
          onClick={() => step !== "calendar" && setStep("time")}
          className={step === "time" ? "text-brown-900 font-medium" : step === "calendar" ? "opacity-40" : "hover:text-brown-700"}
          disabled={step === "calendar"}
        >
          Horario
        </button>
        <span>/</span>
        <span className={step === "form" ? "text-brown-900 font-medium" : "opacity-40"}>
          Tus datos
        </span>
      </div>

      {/* Step: Calendar */}
      {step === "calendar" && (
        <div className="bg-white rounded-2xl shadow-sm border border-brown-100 p-6 md:p-8 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-brown-50 transition-colors">
              ‹
            </button>
            <p className="font-semibold text-brown-900">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </p>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-brown-50 transition-colors">
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {DAY_LABELS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-brown-400 py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {days.map((day, i) => {
              if (day === null) return <div key={i} />
              const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`
              const isPast = dateStr < today
              const isSunday = (new Date(dateStr + "T12:00:00").getDay()) === 0
              const disabled = isPast || isSunday
              const isSelected = dateStr === selectedDate
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => handleDayClick(day)}
                  className={`text-sm rounded-full w-9 h-9 mx-auto flex items-center justify-center transition-colors
                    ${disabled ? "text-brown-200 cursor-default" : "hover:bg-sage-100 text-brown-700 cursor-pointer"}
                    ${isSelected ? "bg-sage-500 text-white hover:bg-sage-500" : ""}
                    ${dateStr === today && !isSelected ? "font-bold text-terra-500" : ""}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>
          <p className="text-xs text-brown-400 text-center mt-5">
            Los domingos no hay atención. Sábados: 9–11 hs.
          </p>
        </div>
      )}

      {/* Step: Time slots */}
      {step === "time" && selectedDate && (
        <div className="max-w-md mx-auto">
          <button onClick={resetAll} className="text-sm text-brown-400 hover:text-brown-700 mb-4 flex items-center gap-1">
            ← Cambiar fecha
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-brown-100 p-6 md:p-8">
            <h3 className="font-semibold text-brown-900 mb-1">{formatDateLabel(selectedDate)}</h3>
            <p className="text-sm text-brown-400 mb-6">Selecciona un horario disponible</p>
            {loading ? (
              <p className="text-center text-brown-400 py-6">Cargando horarios...</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {getSlotsForDay(selectedDate).map((slot) => {
                  const isBooked = bookedSlots.includes(slot)
                  return (
                    <button
                      key={slot}
                      disabled={isBooked}
                      onClick={() => handleSlotClick(slot)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-colors border
                        ${isBooked
                          ? "border-brown-100 text-brown-300 bg-brown-50 cursor-default"
                          : "border-sage-200 text-sage-700 bg-sage-50 hover:bg-sage-500 hover:text-white hover:border-sage-500"
                        }`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step: Form */}
      {step === "form" && selectedDate && selectedSlot && (
        <div className="max-w-lg mx-auto">
          <button onClick={() => setStep("time")} className="text-sm text-brown-400 hover:text-brown-700 mb-4 flex items-center gap-1">
            ← Cambiar horario
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-brown-100 p-6 md:p-8">
            <div className="bg-sage-50 rounded-xl px-4 py-3 mb-6 text-sm text-brown-700">
              <span className="font-medium">Cita:</span> {formatDateLabel(selectedDate)} – {selectedSlot} hs
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Nombre completo *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-brown-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage-400 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-brown-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage-400 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Teléfono *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-brown-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage-400 transition-colors"
                  placeholder="+54 11 1234-5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Servicio *</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                  className="w-full border border-brown-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage-400 transition-colors bg-white"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Notas (opcional)</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-brown-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sage-400 transition-colors resize-none"
                  placeholder="¿Hay algo que quieras comentar antes de la consulta?"
                />
              </div>
              {submitError && (
                <p className="text-red-600 text-sm">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-terra-500 text-white py-3 rounded-full font-medium hover:bg-terra-600 transition-colors disabled:opacity-60"
              >
                {loading ? "Agendando..." : "Confirmar consulta"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
