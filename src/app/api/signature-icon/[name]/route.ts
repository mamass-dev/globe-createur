import sharp from "sharp"
import { SOCIAL_ICON_PATHS, type SocialIconKey } from "@/lib/signature-icons"

export const runtime = "nodejs"

/**
 * PNG d'icône réseau pour les signatures email : /api/signature-icon/linkedin.png?c=e63a2b
 * Rendu 72 px (net sur écran Retina, affiché en 18 px), cache un an.
 */
export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const key = name.replace(/\.png$/i, "") as SocialIconKey
  const d = SOCIAL_ICON_PATHS[key]
  if (!d) return new Response("Not found", { status: 404 })
  const c = new URL(req.url).searchParams.get("c") ?? ""
  const color = /^[0-9a-f]{6}$/i.test(c) ? `#${c}` : "#4f46e5"
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="${color}"><path d="${d}"/></svg>`
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  })
}
