import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSlotsForDay } from "@/lib/slots"

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date")
  if (!date) {
    return Response.json({ error: "date required" }, { status: 400 })
  }

  const appointments = await prisma.appointment.findMany({
    where: { date, status: { not: "cancelled" } },
    select: { timeSlot: true },
  })

  const blockedSlots = await prisma.blockedSlot.findMany({
    where: { date },
    select: { timeSlot: true },
  })

  const booked = [
    ...appointments.map((a) => a.timeSlot),
    ...blockedSlots.map((b) => b.timeSlot),
  ]

  return Response.json({ booked })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { date, timeSlot, name, email, phone, service, notes } = body

  if (!date || !timeSlot || !name || !email || !phone || !service) {
    return Response.json({ error: "Todos los campos requeridos deben completarse." }, { status: 400 })
  }

  const slots = getSlotsForDay(date)
  if (!slots.includes(timeSlot)) {
    return Response.json({ error: "Horario no disponible." }, { status: 400 })
  }

  const existing = await prisma.appointment.findFirst({
    where: { date, timeSlot, status: { not: "cancelled" } },
  })

  if (existing) {
    return Response.json({ error: "Este horario ya fue reservado. Por favor elige otro." }, { status: 409 })
  }

  const appointment = await prisma.appointment.create({
    data: { date, timeSlot, name, email, phone, service, notes: notes || null },
  })

  return Response.json(appointment, { status: 201 })
}
