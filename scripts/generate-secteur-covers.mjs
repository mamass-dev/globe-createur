import sharp from "sharp"
import { join } from "path"

const OUTPUT_DIR = join(import.meta.dirname, "../public/images/secteurs")

const covers = [
  {
    filename: "immobilier.webp",
    title: "Communication\nImmobilier",
    gradient: { start: "#0ea5e9", end: "#3b82f6" },
    icon: "🏠",
  },
  {
    filename: "bien-etre-sante.webp",
    title: "Bien-être\n& Santé",
    gradient: { start: "#10b981", end: "#059669" },
    icon: "🧘",
  },
  {
    filename: "e-commerce-local.webp",
    title: "E-commerce\nLocal",
    gradient: { start: "#f59e0b", end: "#ef4444" },
    icon: "🛍️",
  },
]

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

function generateSVG({ title, gradient, icon }) {
  const lines = title.split("\n")
  const titleY = 320
  const lineHeight = 64

  const titleLines = lines
    .map(
      (line, i) =>
        `<text x="100" y="${titleY + i * lineHeight}" font-family="Inter, -apple-system, sans-serif" font-size="54" font-weight="800" fill="white" letter-spacing="-0.02em">${escapeXml(line)}</text>`
    )
    .join("\n    ")

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${gradient.start}" />
      <stop offset="100%" stop-color="${gradient.end}" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Grid pattern -->
  <g opacity="0.08">
    ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="630" stroke="white" stroke-width="0.5" />`).join("\n    ")}
    ${Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="1200" y2="${i * 50}" stroke="white" stroke-width="0.5" />`).join("\n    ")}
  </g>

  <!-- Decorative circles -->
  <circle cx="950" cy="200" r="180" fill="white" fill-opacity="0.06" />
  <circle cx="1000" cy="350" r="120" fill="white" fill-opacity="0.04" />

  <!-- Badge -->
  <rect x="100" y="${titleY - 80}" width="140" height="32" rx="16" fill="white" fill-opacity="0.2" />
  <text x="170" y="${titleY - 58}" font-family="Inter, -apple-system, sans-serif" font-size="12" font-weight="700" fill="white" text-anchor="middle" letter-spacing="0.15em">SECTEUR</text>

  <!-- Title -->
  ${titleLines}

  <!-- Brand -->
  <text x="100" y="580" font-family="Inter, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" fill-opacity="0.7">Globe Créateur</text>
</svg>`
}

async function main() {
  for (const cover of covers) {
    const svg = generateSVG(cover)
    const outputPath = join(OUTPUT_DIR, cover.filename)

    await sharp(Buffer.from(svg))
      .resize(1200, 630)
      .webp({ quality: 85 })
      .toFile(outputPath)

    console.log(`✓ ${cover.filename}`)
  }
  console.log("Done!")
}

main()
