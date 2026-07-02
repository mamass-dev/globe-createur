import { readFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import { getCard } from "@/lib/cards"
import { CONTACT } from "@/lib/constants"

export const runtime = "nodejs"

type Ctx = { params: Promise<{ slug: string }> }

/** Échappe les caractères réservés d'une valeur vCard 3.0 (RFC 2426). */
function esc(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n")
}

async function photoAsBase64Jpeg(publicPath: string): Promise<string | null> {
  try {
    const abs = path.join(process.cwd(), "public", publicPath)
    const raw = await readFile(abs)
    const jpeg = await sharp(raw).resize(400, 400, { fit: "cover", position: "top" }).jpeg({ quality: 82 }).toBuffer()
    return jpeg.toString("base64")
  } catch {
    return null
  }
}

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params
  const card = getCard(slug)
  if (!card) return new Response("Not found", { status: 404 })

  const photo = await photoAsBase64Jpeg(card.photo)
  const a = CONTACT.address

  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(card.lastName)};${esc(card.firstName)};;;`,
    `FN:${esc(card.fullName)}`,
    `ORG:${esc(card.org)}`,
    `TITLE:${esc(card.role)}`,
  ]

  if (card.phoneE164) lines.push(`TEL;TYPE=CELL,VOICE:${card.phoneE164}`)
  lines.push(`EMAIL;TYPE=INTERNET,WORK:${card.email}`)
  lines.push(`URL:${card.website}`)

  let item = 0
  if (card.linkedin) {
    item += 1
    lines.push(`item${item}.URL:${card.linkedin}`, `item${item}.X-ABLabel:LinkedIn`)
  }
  if (card.instagram) {
    item += 1
    lines.push(`item${item}.URL:${card.instagram}`, `item${item}.X-ABLabel:Instagram`)
  }

  lines.push(
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.city)};${esc(a.region)};${esc(a.zip)};${esc("France")}`
  )
  if (photo) lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photo}`)
  lines.push(`REV:${new Date().toISOString()}`, "END:VCARD")

  const vcard = lines.join("\r\n")
  const filename = `${card.slug}.vcf`

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  })
}
