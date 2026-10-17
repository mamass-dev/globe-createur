import { NextResponse, type NextRequest } from "next/server"
import { HQ_URL } from "@/lib/prospects/links"

/*
 * hq.globecreateur.fr : le quartier général (tunnel de prospection), servi par la même
 * application sans en-tête ni pied de page du site, jamais indexé.
 *   hq/                     → admin (liste des prospects)
 *   hq/admin/<slug>         → dossier admin
 *   hq/<slug>               → page du prospect
 *   hq/<slug>/document      → version imprimable
 *   hq/api/…                → mêmes API
 * Les anciennes adresses du site principal (/p/… et /admin/prospects…) redirigent vers hq.
 */

const HQ_HOST = HQ_URL.replace(/^https?:\/\//, "").replace(/\/$/, "")

function noindex(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow")
  return res
}

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase()
  const { pathname, search } = request.nextUrl
  const isHq = host === HQ_HOST || host.startsWith("hq.")

  if (isHq) {
    if (pathname === "/robots.txt") {
      return new NextResponse("User-agent: *\nDisallow: /\n", { headers: { "Content-Type": "text/plain" } })
    }
    const passthrough = pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname.startsWith("/images/") || pathname.startsWith("/fonts/") || /\.[a-z0-9]{2,5}$/i.test(pathname)
    if (passthrough) return noindex(NextResponse.next())

    let target: string
    if (pathname === "/" || pathname === "/admin" || pathname === "/admin/") target = "/admin/prospects"
    else if (pathname.startsWith("/admin/")) target = `/admin/prospects/${pathname.slice("/admin/".length)}`
    else if (pathname.startsWith("/p/")) target = pathname
    else target = `/p${pathname}`
    const url = request.nextUrl.clone()
    url.pathname = target
    return noindex(NextResponse.rewrite(url))
  }

  // Site principal : les anciennes adresses partent vers hq, une fois le DNS du sous-domaine en place
  // (variable HQ_REDIRECTS=1 sur Vercel ; en attendant, /p/… et /admin/prospects… restent servis ici)
  if (process.env.HQ_REDIRECTS !== "1") return NextResponse.next()
  if (pathname.startsWith("/p/")) {
    return NextResponse.redirect(`${HQ_URL}${pathname.slice("/p".length)}${search}`, 308)
  }
  if (pathname === "/admin/prospects" || pathname === "/admin/prospects/") {
    return NextResponse.redirect(`${HQ_URL}/`, 308)
  }
  if (pathname.startsWith("/admin/prospects/")) {
    return NextResponse.redirect(`${HQ_URL}/admin/${pathname.slice("/admin/prospects/".length)}${search}`, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
}
