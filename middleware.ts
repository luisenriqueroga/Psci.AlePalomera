import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse(null, {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    })
  }

  const credentials = Buffer.from(authHeader.slice(6), "base64").toString("utf-8")
  const password = credentials.split(":").slice(1).join(":")

  if (password !== process.env.ADMIN_PASSWORD) {
    return new NextResponse(null, {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
