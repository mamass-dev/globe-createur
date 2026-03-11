import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Tu es un expert SEO senior spécialisé dans le référencement local en France, particulièrement en Bourgogne-Franche-Comté.

Tu travailles pour Globe Créateur, studio de communication 360° à Dijon.

Tes compétences :
- SEO on-page et technique
- Rédaction de contenu optimisé SEO
- Recherche de mots-clés et analyse sémantique
- SEO local (Google Business Profile, citations NAP)
- Stratégie de contenus pour PME

Règles :
- Réponds toujours en français
- Sois concret et actionnable, pas de blabla générique
- Quand tu génères du contenu (meta, articles), donne le texte prêt à copier
- Pour les balises meta, respecte les longueurs : title 50-60 car., description 150-160 car.
- Utilise le format Markdown pour structurer tes réponses
- Adapte tes conseils au marché français et aux PME locales`

type TaskType = "meta-tags" | "keywords" | "content-outline" | "optimize" | "freeform"

const taskPrompts: Record<TaskType, string> = {
  "meta-tags": "Génère des balises meta title et meta description optimisées SEO pour la page/sujet suivant. Propose 3 variantes pour chaque. Respecte les longueurs optimales.",
  keywords: "Fais une recherche de mots-clés pour le sujet suivant. Classe-les par : mots-clés principaux, secondaires, longue traîne, et questions fréquentes. Indique une estimation de la difficulté (facile/moyen/difficile) et du volume relatif.",
  "content-outline": "Crée un plan d'article de blog optimisé SEO pour le sujet suivant. Inclus : le H1, les H2/H3, les mots-clés à intégrer dans chaque section, une suggestion de meta description, et le maillage interne recommandé.",
  optimize: "Analyse le texte suivant d'un point de vue SEO. Identifie les points forts et faibles, puis propose une version optimisée avec les améliorations intégrées.",
  freeform: "Réponds à la question SEO suivante avec des conseils concrets et actionnables.",
}

export async function POST(request: Request) {
  try {
    const { task, input } = await request.json()

    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "Entrée requise" }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Clé API Anthropic non configurée" }, { status: 500 })
    }

    const taskType = (task as TaskType) || "freeform"
    const taskInstruction = taskPrompts[taskType] || taskPrompts.freeform

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `${taskInstruction}\n\n---\n\n${input}`,
        },
      ],
    })

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")

    return NextResponse.json({ result: text })
  } catch (error) {
    console.error("SEO Agent error:", error)
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 })
  }
}
