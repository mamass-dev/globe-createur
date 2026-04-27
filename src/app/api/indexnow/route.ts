import { NextResponse } from "next/server"
import { INDEXNOW_KEY, SITE_URL } from "@/lib/constants"

const HOST = new URL(SITE_URL).host

export async function POST(req: Request) {
  let body: { urls?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const urls = Array.isArray(body.urls) ? (body.urls as string[]) : null
  if (!urls || urls.length === 0) {
    return NextResponse.json({ error: "Provide a non-empty 'urls' array" }, { status: 400 })
  }

  const validUrls = urls.filter((u) => {
    try {
      return new URL(u).host === HOST
    } catch {
      return false
    }
  })

  if (validUrls.length === 0) {
    return NextResponse.json({ error: "No valid URLs for this host" }, { status: 400 })
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: validUrls,
  }

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ]

  const results = await Promise.allSettled(
    endpoints.map((url) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }).then(async (r) => ({ url, status: r.status, ok: r.ok }))
    )
  )

  return NextResponse.json({
    submitted: validUrls.length,
    endpoints: results.map((r, i) =>
      r.status === "fulfilled" ? r.value : { url: endpoints[i], error: String(r.reason) }
    ),
  })
}
