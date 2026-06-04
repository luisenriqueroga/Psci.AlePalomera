import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest, ctx: RouteContext<"/api/admin/appointments/[id]">) {
  const { id } = await ctx.params
  const { status } = await request.json()

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return Response.json({ error: "Estado inválido." }, { status: 400 })
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: { status },
  })

  return Response.json(updated)
}
