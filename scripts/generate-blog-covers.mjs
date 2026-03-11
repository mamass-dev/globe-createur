import sharp from "sharp"
import { writeFileSync } from "fs"
import { join } from "path"

const OUTPUT_DIR = join(import.meta.dirname, "../public/images/blog")

const covers = [
  {
    filename: "5-erreurs-seo-local-pme.webp",
    title: "5 erreurs qui plombent\nle SEO local de\nvotre PME",
    gradient: { start: "#ef4444", end: "#f97316" }, // red → orange
  },
  {
    filename: "pourquoi-automatiser-communication-2026.webp",
    title: "Pourquoi automatiser\nsa communication\nen 2026",
    gradient: { start: "#8b5cf6", end: "#6366f1" }, // violet → indigo
  },
  {
    filename: "comment-choisir-agence-web-dijon.webp",
    title: "Comment choisir son\nagence web à Dijon\nen 2026",
    gradient: { start: "#0ea5e9", end: "#6366f1" }, // sky → indigo
  },
]

function generateSVG({ title, gradient }) {
  const lines = title.split("\n")
  const titleY = 340
  const lineHeight = 52

  const titleLines = lines
    .map(
      (line, i) =>
        `<text x="100" y="${titleY + i * lineHeight}" font-family="Inter, -apple-system, sans-serif" font-size="44" font-weight="800" fill="white" letter-spacing="-0.02em">${escapeXml(line)}</text>`
    )
    .join("\n    ")

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${gradient.start}" />
      <stop offset="100%" stop-color="${gradient.end}" />
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0.15" />
      <stop offset="100%" stop-color="white" stop-opacity="0.05" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Grid pattern -->
  <g opacity="0.08">
    ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="630" stroke="white" stroke-width="0.5" />`).join("\n    ")}
    ${Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="1200" y2="${i * 50}" stroke="white" stroke-width="0.5" />`).join("\n    ")}
  </g>

  <!-- Glassmorphism shape -->
  <g transform="translate(820, 80)">
    <rect x="0" y="0" width="300" height="220" rx="24" fill="url(#glass)" stroke="white" stroke-opacity="0.12" stroke-width="1" />
    <rect x="30" y="40" width="240" height="140" rx="16" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.08" stroke-width="1" />
  </g>

  <!-- Decorative circle -->
  <circle cx="900" cy="320" r="120" fill="white" fill-opacity="0.05" />

  <!-- Badge -->
  <rect x="100" y="${titleY - 80}" width="120" height="32" rx="16" fill="white" fill-opacity="0.2" />
  <text x="160" y="${titleY - 58}" font-family="Inter, -apple-system, sans-serif" font-size="12" font-weight="700" fill="white" text-anchor="middle" letter-spacing="0.15em">ARTICLE</text>

  <!-- Title -->
  ${titleLines}

  <!-- Brand -->
  <text x="100" y="580" font-family="Inter, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" fill-opacity="0.7">Globe Créateur</text>
</svg>`
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
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
