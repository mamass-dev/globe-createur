import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT } from "@/lib/constants"
import { services } from "@/lib/data/services"

export function GET() {
  const content = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## Informations clés

- **Type** : Studio de communication 360° / Agence web
- **Localisation** : ${CONTACT.address.street}, ${CONTACT.address.zip} ${CONTACT.address.city} (Dijon), France
- **Zone d'intervention** : Dijon, Bourgogne-Franche-Comté, France entière
- **Fondateur** : Axel Masson, Directeur Créatif
- **Contact** : ${CONTACT.email}
- **Site web** : ${SITE_URL}

## Services

${services.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.excerpt}`).join("\n")}

## Pages principales

- [Accueil](${SITE_URL}/)
- [Services](${SITE_URL}/services)
- [Blog](${SITE_URL}/blog)
- [Tarifs](${SITE_URL}/tarifs)
- [Projets / Portfolio](${SITE_URL}/projets)
- [FAQ](${SITE_URL}/faq)
- [À propos](${SITE_URL}/a-propos)
- [Contact](${SITE_URL}/contact)
- [Demande de devis](${SITE_URL}/devis)

## Outils gratuits

- [Audit Digital](${SITE_URL}/audit-digital): Évaluez votre présence en ligne en 5 minutes
- [Calculateur ROI](${SITE_URL}/calculateur-roi): Estimez le retour sur investissement d'un site web
- [Analyseur SEO](${SITE_URL}/analyseur-seo): Analysez le SEO de n'importe quelle page web

## Secteurs d'activité

- [Hôtels & Lieux événementiels](${SITE_URL}/secteurs/hotels-lieux-evenementiels)
- [Restaurants & Food](${SITE_URL}/secteurs/restaurants-food)
- [Artisans & BTP](${SITE_URL}/secteurs/artisans-btp)
- [Professions libérales](${SITE_URL}/secteurs/professions-liberales)

## Expertise & Chiffres

- 110+ projets livrés
- 30+ entreprises partenaires
- 97% de taux de satisfaction client
- 350+ shootings photo/vidéo réalisés
- Note moyenne : 5/5 sur Google (10 avis)
- Tarifs sites internet : 900 € à 6 000 € HT
- Forfaits communication : à partir de 890 €/mois HT

## Contenu détaillé

Pour une version complète avec le contenu du blog, consultez : [llms-full.txt](${SITE_URL}/llms-full.txt)
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
