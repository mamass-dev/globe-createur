import { NextResponse } from "next/server"
import * as cheerio from "cheerio"
import { seoAnalyzeSchema, isUrlSafe, rateLimit, getClientIp } from "@/lib/security"

type Check = {
  id: string
  category: "content" | "technical" | "social" | "performance"
  label: string
  status: "pass" | "warning" | "fail"
  value: string
  tip: string
  points: number
  maxPoints: number
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 10, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const body = await request.json()
    const result = seoAnalyzeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "URL requise" }, { status: 400 })
    }

    // Normalize URL
    let targetUrl = result.data.url
    if (!targetUrl.startsWith("http")) targetUrl = "https://" + targetUrl

    // Validate URL
    try {
      new URL(targetUrl)
    } catch {
      return NextResponse.json({ error: "URL invalide" }, { status: 400 })
    }

    // SSRF protection
    if (!isUrlSafe(targetUrl)) {
      return NextResponse.json({ error: "URL non autorisée" }, { status: 400 })
    }

    // Fetch HTML
    let html: string
    let finalUrl: string
    let isHttps: boolean
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; GlobeCreateur SEO Analyzer/1.0)",
          Accept: "text/html",
        },
        redirect: "follow",
      })
      clearTimeout(timeout)
      finalUrl = res.url
      isHttps = finalUrl.startsWith("https://")
      html = await res.text()
    } catch {
      return NextResponse.json({ error: "Impossible de charger cette URL. Vérifiez qu'elle est accessible." }, { status: 422 })
    }

    const $ = cheerio.load(html)
    const checks: Check[] = []

    // ─── CONTENT CHECKS ───

    // 1. Title tag
    const title = $("title").first().text().trim()
    const titleLen = title.length
    checks.push({
      id: "title",
      category: "content",
      label: "Balise <title>",
      status: !title ? "fail" : titleLen < 30 || titleLen > 65 ? "warning" : "pass",
      value: title || "Absente",
      tip: !title
        ? "Ajoutez une balise <title> unique et descriptive (50-60 caractères)."
        : titleLen < 30
          ? `Trop court (${titleLen} car.). Visez 50-60 caractères.`
          : titleLen > 65
            ? `Trop long (${titleLen} car.). Risque de troncature dans Google. Visez 50-60.`
            : `Bonne longueur (${titleLen} car.).`,
      points: !title ? 0 : titleLen < 30 || titleLen > 65 ? 7 : 10,
      maxPoints: 10,
    })

    // 2. Meta description
    const metaDesc = $('meta[name="description"]').attr("content")?.trim() || ""
    const descLen = metaDesc.length
    checks.push({
      id: "meta-description",
      category: "content",
      label: "Meta description",
      status: !metaDesc ? "fail" : descLen < 120 || descLen > 160 ? "warning" : "pass",
      value: metaDesc ? `${descLen} caractères` : "Absente",
      tip: !metaDesc
        ? "Ajoutez une meta description engageante (150-160 caractères) avec vos mots-clés."
        : descLen < 120
          ? `Trop courte (${descLen} car.). Visez 150-160 pour maximiser le CTR.`
          : descLen > 160
            ? `Trop longue (${descLen} car.). Sera tronquée dans Google.`
            : "Bonne longueur.",
      points: !metaDesc ? 0 : descLen < 120 || descLen > 160 ? 7 : 10,
      maxPoints: 10,
    })

    // 3. H1 tag
    const h1s = $("h1")
    const h1Count = h1s.length
    const h1Text = h1s.first().text().trim()
    checks.push({
      id: "h1",
      category: "content",
      label: "Balise <h1>",
      status: h1Count === 0 ? "fail" : h1Count > 1 ? "warning" : "pass",
      value: h1Count === 0 ? "Absente" : h1Count > 1 ? `${h1Count} trouvées (1 seule recommandée)` : h1Text.substring(0, 80),
      tip: h1Count === 0
        ? "Ajoutez une balise <h1> unique contenant votre mot-clé principal."
        : h1Count > 1
          ? "Gardez une seule <h1> par page pour une hiérarchie SEO claire."
          : "Parfait, une seule <h1>.",
      points: h1Count === 1 ? 10 : h1Count > 1 ? 5 : 0,
      maxPoints: 10,
    })

    // 4. Heading structure
    const h2Count = $("h2").length
    const h3Count = $("h3").length
    checks.push({
      id: "headings",
      category: "content",
      label: "Structure des titres (H2-H3)",
      status: h2Count === 0 ? "fail" : h2Count < 2 ? "warning" : "pass",
      value: `${h2Count} H2, ${h3Count} H3`,
      tip: h2Count === 0
        ? "Ajoutez des sous-titres H2 pour structurer votre contenu et cibler des mots-clés secondaires."
        : h2Count < 2
          ? "Ajoutez plus de H2 pour mieux structurer le contenu."
          : "Bonne structure de titres.",
      points: h2Count === 0 ? 0 : h2Count < 2 ? 5 : 8,
      maxPoints: 8,
    })

    // 5. Images without alt
    const images = $("img")
    const totalImages = images.length
    let missingAlt = 0
    images.each((_, el) => {
      const alt = $(el).attr("alt")
      if (!alt || alt.trim() === "") missingAlt++
    })
    checks.push({
      id: "img-alt",
      category: "content",
      label: "Attributs alt des images",
      status: totalImages === 0 ? "warning" : missingAlt === 0 ? "pass" : missingAlt > totalImages / 2 ? "fail" : "warning",
      value: totalImages === 0 ? "Aucune image trouvée" : `${totalImages - missingAlt}/${totalImages} avec alt`,
      tip: totalImages === 0
        ? "Ajoutez des images avec des attributs alt descriptifs."
        : missingAlt > 0
          ? `${missingAlt} image(s) sans attribut alt. Décrivez chaque image pour le SEO et l'accessibilité.`
          : "Toutes les images ont un attribut alt.",
      points: totalImages === 0 ? 4 : missingAlt === 0 ? 8 : Math.max(0, 8 - missingAlt * 2),
      maxPoints: 8,
    })

    // ─── TECHNICAL CHECKS ───

    // 6. HTTPS
    checks.push({
      id: "https",
      category: "technical",
      label: "HTTPS (SSL)",
      status: isHttps ? "pass" : "fail",
      value: isHttps ? "Activé" : "Non sécurisé",
      tip: isHttps
        ? "Votre site est sécurisé en HTTPS."
        : "Passez en HTTPS. Google pénalise les sites non sécurisés.",
      points: isHttps ? 10 : 0,
      maxPoints: 10,
    })

    // 7. Canonical
    const canonical = $('link[rel="canonical"]').attr("href")?.trim() || ""
    checks.push({
      id: "canonical",
      category: "technical",
      label: "URL canonique",
      status: canonical ? "pass" : "warning",
      value: canonical || "Absente",
      tip: canonical
        ? "URL canonique définie."
        : "Ajoutez une balise canonical pour éviter le contenu dupliqué.",
      points: canonical ? 6 : 2,
      maxPoints: 6,
    })

    // 8. Lang attribute
    const lang = $("html").attr("lang")?.trim() || ""
    checks.push({
      id: "lang",
      category: "technical",
      label: "Attribut lang",
      status: lang ? "pass" : "warning",
      value: lang || "Absent",
      tip: lang
        ? `Langue définie : ${lang}`
        : "Ajoutez lang=\"fr\" sur la balise <html> pour indiquer la langue aux moteurs.",
      points: lang ? 4 : 0,
      maxPoints: 4,
    })

    // 9. Meta viewport
    const viewport = $('meta[name="viewport"]').attr("content") || ""
    checks.push({
      id: "viewport",
      category: "technical",
      label: "Meta viewport (mobile)",
      status: viewport ? "pass" : "fail",
      value: viewport ? "Présente" : "Absente",
      tip: viewport
        ? "Votre site est configuré pour le mobile."
        : "Ajoutez <meta name=\"viewport\"> pour le responsive design. Indispensable pour le mobile-first indexing.",
      points: viewport ? 8 : 0,
      maxPoints: 8,
    })

    // 10. Meta robots
    const robots = $('meta[name="robots"]').attr("content")?.toLowerCase() || ""
    const isNoindex = robots.includes("noindex")
    checks.push({
      id: "robots",
      category: "technical",
      label: "Indexation (meta robots)",
      status: isNoindex ? "fail" : "pass",
      value: isNoindex ? "noindex détecté" : robots || "Indexable (par défaut)",
      tip: isNoindex
        ? "Attention : votre page est en noindex. Elle ne sera pas référencée par Google."
        : "Votre page est indexable.",
      points: isNoindex ? 0 : 6,
      maxPoints: 6,
    })

    // 11. Structured data
    const jsonLd = $('script[type="application/ld+json"]')
    checks.push({
      id: "structured-data",
      category: "technical",
      label: "Données structurées (JSON-LD)",
      status: jsonLd.length > 0 ? "pass" : "warning",
      value: jsonLd.length > 0 ? `${jsonLd.length} script(s) trouvé(s)` : "Aucune",
      tip: jsonLd.length > 0
        ? "Données structurées détectées. Cela aide les rich snippets Google."
        : "Ajoutez du JSON-LD (LocalBusiness, Article, FAQ...) pour les rich snippets.",
      points: jsonLd.length > 0 ? 6 : 0,
      maxPoints: 6,
    })

    // ─── SOCIAL CHECKS ───

    // 12. Open Graph
    const ogTitle = $('meta[property="og:title"]').attr("content") || ""
    const ogDesc = $('meta[property="og:description"]').attr("content") || ""
    const ogImage = $('meta[property="og:image"]').attr("content") || ""
    const ogCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length
    checks.push({
      id: "og-tags",
      category: "social",
      label: "Open Graph (Facebook/LinkedIn)",
      status: ogCount === 3 ? "pass" : ogCount > 0 ? "warning" : "fail",
      value: `${ogCount}/3 tags (title, description, image)`,
      tip: ogCount === 3
        ? "Open Graph complet."
        : `Manque : ${[!ogTitle && "og:title", !ogDesc && "og:description", !ogImage && "og:image"].filter(Boolean).join(", ")}. Important pour le partage sur les réseaux.`,
      points: ogCount === 3 ? 8 : ogCount * 2,
      maxPoints: 8,
    })

    // 13. Twitter Card
    const twCard = $('meta[name="twitter:card"]').attr("content") || ""
    const twTitle = $('meta[name="twitter:title"]').attr("content") || $('meta[property="twitter:title"]').attr("content") || ""
    const twCount = [twCard, twTitle].filter(Boolean).length
    checks.push({
      id: "twitter-card",
      category: "social",
      label: "Twitter Card",
      status: twCount === 2 ? "pass" : twCount > 0 ? "warning" : "fail",
      value: twCard || "Absente",
      tip: twCount === 2
        ? "Twitter Card configurée."
        : "Ajoutez les meta twitter:card et twitter:title pour un meilleur affichage sur X/Twitter.",
      points: twCount === 2 ? 6 : twCount * 2,
      maxPoints: 6,
    })

    // ─── PERFORMANCE (basic) ───

    // 14. PageSpeed Insights (if API key available)
    let performanceScore: number | null = null
    const psiKey = process.env.GOOGLE_PSI_API_KEY
    if (psiKey) {
      try {
        const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${psiKey}&strategy=mobile&category=performance&category=seo`
        const psiRes = await fetch(psiUrl)
        if (psiRes.ok) {
          const psiData = await psiRes.json()
          performanceScore = Math.round((psiData.lighthouseResult?.categories?.performance?.score ?? 0) * 100)
          const seoScore = Math.round((psiData.lighthouseResult?.categories?.seo?.score ?? 0) * 100)

          checks.push({
            id: "performance",
            category: "performance",
            label: "Score Performance (PageSpeed)",
            status: performanceScore >= 90 ? "pass" : performanceScore >= 50 ? "warning" : "fail",
            value: `${performanceScore}/100`,
            tip: performanceScore >= 90
              ? "Excellente performance."
              : performanceScore >= 50
                ? "Performance moyenne. Optimisez les images, le CSS et le JavaScript."
                : "Performance faible. Votre site perd des visiteurs et du référencement.",
            points: Math.round(performanceScore / 10),
            maxPoints: 10,
          })

          checks.push({
            id: "psi-seo",
            category: "performance",
            label: "Score SEO (Lighthouse)",
            status: seoScore >= 90 ? "pass" : seoScore >= 50 ? "warning" : "fail",
            value: `${seoScore}/100`,
            tip: seoScore >= 90
              ? "Excellent score SEO technique."
              : "Des optimisations techniques sont nécessaires.",
            points: Math.round(seoScore / 10),
            maxPoints: 10,
          })
        }
      } catch {
        // PageSpeed not available, skip
      }
    }

    // Calculate scores
    const totalPoints = checks.reduce((sum, c) => sum + c.points, 0)
    const totalMax = checks.reduce((sum, c) => sum + c.maxPoints, 0)
    const score = Math.round((totalPoints / totalMax) * 100)

    const categoryScores: Record<string, { points: number; max: number }> = {}
    for (const c of checks) {
      if (!categoryScores[c.category]) categoryScores[c.category] = { points: 0, max: 0 }
      categoryScores[c.category].points += c.points
      categoryScores[c.category].max += c.maxPoints
    }

    return NextResponse.json({
      url: finalUrl,
      score,
      checks,
      categoryScores,
      meta: {
        title: title || null,
        description: metaDesc || null,
        ogImage: ogImage || null,
        h1: h1Text || null,
      },
    })
  } catch (error) {
    console.error("SEO analyze error:", error)
    return NextResponse.json({ error: "Erreur lors de l'analyse" }, { status: 500 })
  }
}
