import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT } from "@/lib/constants"
import { services } from "@/lib/data/services"
import { getBlogPosts } from "@/lib/content"
import { faqGenerales, faqSeo, faqContenu, faqAutomatisation, faqCollaboration } from "@/lib/data/faq"
import type { FaqItem } from "@/lib/types"

export const revalidate = 3600

function formatFaqs(items: FaqItem[]): string {
  return items.map((faq) => `### ${faq.question}\n${faq.answer}`).join("\n\n")
}

export function GET() {
  const posts = getBlogPosts()

  const content = `# ${SITE_NAME} — Documentation complète

> ${SITE_DESCRIPTION}

## À propos de Globe Créateur

Globe Créateur est un studio de communication 360° basé à ${CONTACT.address.city} (Dijon), en Bourgogne-Franche-Comté, France. Fondé par Axel Masson (Directeur Créatif) et Adrien Lecrivain, le studio réunit une équipe complète : photographe, vidéaste, designer, développeur web et chef de projet.

**Mission** : Accompagner les PME, indépendants et lieux à vivre dans leur croissance digitale avec une approche 360° — un seul interlocuteur pour le web, le SEO, le contenu, les réseaux sociaux et l'automatisation.

**Coordonnées** :
- Adresse : ${CONTACT.address.street}, ${CONTACT.address.zip} ${CONTACT.address.city}
- Email : ${CONTACT.email}
- Site : ${SITE_URL}
- Instagram : ${CONTACT.socials.instagram}
- LinkedIn : ${CONTACT.socials.linkedin}

**Chiffres clés** :
- 110+ projets livrés
- 30+ entreprises partenaires
- 97% de satisfaction client
- 350+ shootings photo/vidéo
- Note Google : 5/5 (10 avis)

---

## Services

${services
  .map(
    (s) => `### ${s.title}
${s.metaDescription}
- **Mot-clé principal** : ${s.keyword}
- **URL** : ${SITE_URL}/services/${s.slug}
`
  )
  .join("\n")}

---

## Tarification

### Sites internet (projets ponctuels)
- **Site vitrine simple** (3-5 pages) : 900 – 1 500 € HT, livré en 3-5 semaines
- **Site stratégique** (5-10 pages) : 1 800 – 3 000 € HT, livré en 4-6 semaines
- **Site sur mesure** (UX/UI complète) : 3 500 – 6 000 € HT, livré en 6-10 semaines

### Forfaits communication mensuels (site offert avec engagement)
- **Essentiel** : 890 €/mois HT (engagement 12 mois)
- **Croissance** : 1 490 €/mois HT (engagement 6 mois)
- **Performance** : 2 690 €/mois HT (engagement 3 mois)

### Autres prestations
- Shooting photo/vidéo : 650 – 950 € HT / journée
- Automatisation no-code : à partir de 600 € HT
- Refonte de site : à partir de 1 200 € HT

---

## FAQ — Questions fréquentes

### Questions générales
${formatFaqs(faqGenerales)}

### SEO & Référencement
${formatFaqs(faqSeo)}

### Contenu & Production
${formatFaqs(faqContenu)}

### Automatisation
${formatFaqs(faqAutomatisation)}

### Collaboration
${formatFaqs(faqCollaboration)}

---

## Articles de blog

${posts
  .map(
    (post) => `### ${post.frontmatter.title}
- **Date** : ${post.frontmatter.publishedAt}
- **Catégorie** : ${post.frontmatter.category}
- **Résumé** : ${post.frontmatter.metaDescription}
- **URL** : ${SITE_URL}/blog/${post.slug}
`
  )
  .join("\n")}

---

## Secteurs d'activité

Globe Créateur accompagne spécifiquement ces secteurs :
- **Hôtels & Lieux événementiels** : Sites vitrines immersifs, visites virtuelles, booking en ligne
- **Restaurants & Food** : Photographie culinaire, menu digital, Google Business optimisé
- **Artisans & BTP** : Visibilité locale, galerie de réalisations, demande de devis en ligne
- **Professions libérales** : Site professionnel, prise de rendez-vous, visibilité Google

---

## Outils gratuits

- **Audit Digital** (${SITE_URL}/audit-digital) : Quiz interactif pour évaluer sa présence en ligne, avec rapport personnalisé
- **Calculateur ROI** (${SITE_URL}/calculateur-roi) : Estimation du retour sur investissement d'un site web professionnel
- **Analyseur SEO** (${SITE_URL}/analyseur-seo) : Analyse technique SEO de n'importe quelle URL

---

## Zone d'intervention

Siège à Longvic (Dijon), interventions dans toute la Bourgogne-Franche-Comté :
Dijon, Beaune, Chalon-sur-Saône, Auxerre, Besançon, Dole, Mâcon, Nevers, Lyon, Clermont-Ferrand.
Accompagnement à distance possible partout en France.

---

*Dernière mise à jour : ${new Date().toISOString().split("T")[0]}*
*Source : ${SITE_URL}*
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
