import { getAsset } from "@/lib/prospects/store"

/** Sert une capture ou une vidéo du constat depuis le magasin privé. Le lien prospect est la seule clé. */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string; name: string }> }) {
  const { slug, name } = await params
  if (!/^[a-z0-9-]{3,60}$/.test(slug)) return new Response("Introuvable", { status: 404 })
  const res = await getAsset(slug, name)
  if (!res) return new Response("Introuvable", { status: 404 })
  const headers = new Headers()
  const type = res.headers?.get?.("content-type") ?? res.blob?.contentType
  if (type) headers.set("Content-Type", type)
  const len = res.headers?.get?.("content-length")
  if (len) headers.set("Content-Length", len)
  headers.set("Cache-Control", "private, max-age=3600")
  headers.set("X-Robots-Tag", "noindex")
  // Lecture partielle (vidéo) : on laisse passer la requête Range telle quelle si le magasin la gère
  void request
  return new Response(res.stream, { status: 200, headers })
}
