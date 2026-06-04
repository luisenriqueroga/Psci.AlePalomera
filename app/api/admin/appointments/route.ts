import { prisma } from "@/lib/prisma"

export async function GET() {
  const appointments = await prisma.appointment.findMany({
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
  })
  return Response.json(appointments)
}
