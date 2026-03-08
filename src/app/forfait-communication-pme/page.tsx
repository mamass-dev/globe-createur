import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { PageHero } from "@/components/sections/page-hero"
import { Testimonials } from "@/components/sections/testimonials"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/animate"
import { temoignages } from "@/lib/data/temoignages"
import { Check, X } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Forfait communication PME — Équipe externalisée à Dijon | Globe Créateur",
  description: "Forfaits communication tout-en-un pour PME à Dijon. Web, SEO, photo, vidéo, réseaux sociaux : une équipe complète externalisée à partir de 990 €/mois HT. Sans engagement long terme.",
  path: "/forfait-communication-pme",
})

const forfaits = [
  {
    name: "Essentiel",
    price: "990",
    description: "La base solide pour exister en ligne et commencer à attirer des clients.",
    features: [
      "Site vitrine optimisé SEO (5-8 pages)",
      "Fiche Google Business Profile optimisée",
      "2 publications/semaine réseaux sociaux",
      "Gestion des avis Google",
      "Reporting mensuel",
      "Support email sous 24h",
    ],
    notIncluded: [
      "SEO avancé",
      "Blog",
      "Shooting photo",
      "Vidéo",
    ],
  },
  {
    name: "Croissance",
    price: "1 890",
    popular: true,
    description: "Pour accélérer votre visibilité locale et générer des demandes régulières.",
    features: [
      "Tout Essentiel +",
      "SEO local avancé (pages locales, backlinks)",
      "4 publications/semaine réseaux sociaux",
      "1 article de blog optimisé SEO/mois",
      "Shooting photo trimestriel sur place",
      "Veille concurrentielle",
      "Support prioritaire sous 4h",
    ],
    notIncluded: [
      "Vidéo",
      "Automatisation",
      "Campagnes pub",
    ],
  },
  {
    name: "Premium",
    price: "3 490",
    description: "La communication complète pour dominer votre marché local.",
    features: [
      "Tout Croissance +",
      "Stratégie éditoriale complète",
      "1 vidéo professionnelle/mois",
      "Automatisation no-code (Make, Airtable)",
      "Campagnes publicitaires (Google Ads, Meta)",
      "Réunion stratégique mensuelle",
      "Design graphique illimité",
    ],
    notIncluded: [],
  },
]

const comparaison = [
  { feature: "Site internet optimisé SEO", essentiel: true, croissance: true, premium: true },
  { feature: "Fiche Google Business", essentiel: true, croissance: true, premium: true },
  { feature: "Réseaux sociaux", essentiel: "2/sem", croissance: "4/sem", premium: "5/sem" },
  { feature: "Reporting mensuel", essentiel: true, croissance: true, premium: true },
  { feature: "SEO local avancé", essentiel: false, croissance: true, premium: true },
  { feature: "Articles de blog SEO", essentiel: false, croissance: "1/mois", premium: "2/mois" },
  { feature: "Shooting photo", essentiel: false, croissance: "Trimestriel", premium: "Mensuel" },
  { feature: "Vidéo professionnelle", essentiel: false, croissance: false, premium: "1/mois" },
  { feature: "Automatisation no-code", essentiel: false, croissance: false, premium: true },
  { feature: "Campagnes pub", essentiel: false, croissance: false, premium: true },
  { feature: "Réunion stratégique", essentiel: false, croissance: false, premium: "Mensuelle" },
  { feature: "Délai de réponse", essentiel: "24h", croissance: "4h", premium: "2h" },
]

const faqForfaits = [
  { question: "Puis-je changer de forfait en cours de route ?", answer: "Oui. Vous pouvez passer d'un forfait à un autre (upgrade ou downgrade) avec un préavis d'un mois. Beaucoup de nos clients commencent par l'Essentiel et passent en Croissance après 3-6 mois quand ils voient les premiers résultats." },
  { question: "Y a-t-il un engagement minimum ?", answer: "On recommande un engagement de 3 mois minimum pour voir les premiers résultats concrets. Après cette période initiale, le forfait est résiliable avec un préavis d'un mois. Pas d'engagement annuel imposé." },
  { question: "Les forfaits incluent-ils la création du site internet ?", answer: "Oui. Le forfait Essentiel inclut la création d'un site vitrine de 5 à 8 pages, optimisé SEO. Pour les forfaits Croissance et Premium, le site est enrichi en continu (nouvelles pages, articles de blog, optimisations)." },
  { question: "Que se passe-t-il si je résilie mon forfait ?", answer: "Votre site internet vous appartient. Si vous résiliez, vous conservez le site et tout le contenu produit (photos, vidéos, textes). On vous transfère les accès complets. La gestion des réseaux sociaux et le SEO s'arrêtent à la date de fin." },
  { question: "Combien de temps avant de voir des résultats ?", answer: "Les résultats en termes d'image (site professionnel, réseaux actifs) sont immédiats. Pour le SEO local et le trafic organique, comptez 2-3 mois pour les premières améliorations et 4-6 mois pour des résultats significatifs (positions Pack Local, trafic qualifié)." },
  { question: "Dois-je fournir les photos et les textes ?", answer: "Non, c'est inclus. On rédige tous les textes (site, réseaux sociaux, blog) et on réalise les shootings photo (à partir du forfait Croissance). Pour le forfait Essentiel, on utilise des photos existantes ou on organise un shooting initial (en option)." },
  { question: "Comment fonctionne le reporting mensuel ?", answer: "Chaque mois, vous recevez un bilan clair : ce qu'on a fait, les résultats obtenus (trafic, positions Google, engagement réseaux, demandes de contact), et nos recommandations pour le mois suivant. Pas de jargon, des chiffres concrets." },
  { question: "Un forfait sur-mesure est-il possible ?", answer: "Oui. Si aucun forfait standard ne correspond à vos besoins, on construit une formule sur-mesure. Par exemple : un forfait Essentiel avec un shooting photo mensuel ajouté, ou un forfait Croissance sans les réseaux sociaux. Contactez-nous pour en discuter." },
]

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-success mx-auto" />
  if (value === false) return <X className="h-4 w-4 text-gray-200 mx-auto" />
  return <span className="text-xs text-gray-500">{value}</span>
}

export default function ForfaitPage() {
  return (
    <>
      <FaqSchema items={faqForfaits} />

      {/* 1. NAVIGATION */}
      <Breadcrumb items={[{ name: "Forfaits", href: "/forfait-communication-pme" }]} />

      {/* 2. HERO */}
      <PageHero
        badge="Forfaits communication"
        title="Votre équipe communication, sans embaucher"
        subtitle="Web, SEO, photo, vidéo, réseaux sociaux : tout ce dont votre PME a besoin, dans un forfait mensuel clair et sans surprise. À partir de 990 €/mois HT."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
      />

      {/* 3. POURQUOI UN FORFAIT */}
      <Container className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Pourquoi un forfait plutôt qu&apos;un projet ponctuel ?</h2>
            <p>
              Un site internet seul ne suffit pas. Vous pouvez avoir le plus beau site du monde :
              sans contenu régulier, sans SEO, sans réseaux sociaux, il reste invisible.
            </p>
            <p>
              Le problème des projets ponctuels, c&apos;est le « et après ? ». Le site est livré,
              le photographe est reparti, et au bout de 6 mois, plus personne ne s&apos;en occupe.
              Le site date, les réseaux sont morts, Google vous oublie.
            </p>
            <p>
              <strong>Un forfait communication, c&apos;est l&apos;inverse.</strong> C&apos;est une équipe
              qui travaille pour vous chaque mois : du contenu frais, des optimisations SEO,
              des publications régulières, un reporting avec des vrais chiffres. Votre
              communication vit et évolue avec votre entreprise.
            </p>
            <p>
              Et le site internet ? Il est <strong>inclus dans le forfait</strong>.
              Pas besoin de payer un projet à part à 3 000 €.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* 4. GRILLE FORFAITS */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <Container>
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary font-mono-accent mb-3">
                Nos formules
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Choisissez le forfait qui vous correspond
              </h2>
              <p className="mt-3 text-gray-400 max-w-xl mx-auto">
                Trois formules claires. Pas de coût caché. Résiliable après 3 mois.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {forfaits.map((f) => (
              <StaggerItem key={f.name}>
                <Card
                  className={`relative flex flex-col h-full ${f.popular ? "border-primary shadow-lg ring-1 ring-primary/20" : ""}`}
                >
                  {f.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Le plus choisi
                    </span>
                  )}
                  <CardTitle>{f.name}</CardTitle>
                  <div className="mt-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">{f.price} €</span>
                    <span className="text-gray-400 text-sm"> /mois HT</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">{f.description}</p>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {f.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-sm text-gray-500">
                          <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    {f.notIncluded.length > 0 && (
                      <ul className="mt-4 space-y-2 pt-4 border-t border-gray-100">
                        {f.notIncluded.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-sm text-gray-300">
                            <X className="h-4 w-4 shrink-0 mt-0.5" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <div className="mt-6">
                    <Button
                      href="/devis"
                      variant={f.popular ? "primary" : "outline"}
                      className="w-full"
                    >
                      Choisir {f.name}
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 5. COMPARATIF DÉTAILLÉ */}
      <Container className="py-16 lg:py-24">
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Comparatif détaillé
            </h2>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 pr-4 font-medium text-foreground">Fonctionnalité</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">Essentiel</th>
                  <th className="text-center py-3 px-4 font-medium text-primary">Croissance</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparaison.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-50">
                    <td className="py-3 pr-4 text-gray-500">{row.feature}</td>
                    <td className="py-3 px-4 text-center"><CellValue value={row.essentiel} /></td>
                    <td className="py-3 px-4 text-center bg-primary/[0.02]"><CellValue value={row.croissance} /></td>
                    <td className="py-3 px-4 text-center"><CellValue value={row.premium} /></td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200">
                  <td className="py-4 pr-4 font-semibold text-foreground">Tarif</td>
                  <td className="py-4 px-4 text-center font-semibold text-foreground">990 €/mois</td>
                  <td className="py-4 px-4 text-center font-semibold text-primary bg-primary/[0.02]">1 890 €/mois</td>
                  <td className="py-4 px-4 text-center font-semibold text-foreground">3 490 €/mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* 6. CONTENU SEO */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <Container className="max-w-3xl">
          <AnimateOnScroll>
            <div className="prose max-w-none">
              <h2>Ce que comprend chaque forfait, concrètement</h2>

              <h3>Le site internet</h3>
              <p>
                Votre <Link href="/services/creation-site-internet-dijon">site internet</Link> est
                inclus dans tous les forfaits. On le conçoit sur-mesure (pas de template),
                on l&apos;optimise pour le SEO, et on le fait évoluer chaque mois. Technologies
                modernes, temps de chargement rapide, responsive mobile.
              </p>

              <h3>Le SEO local</h3>
              <p>
                Dès le forfait Essentiel, votre fiche{" "}
                <Link href="/services/seo-local-dijon">Google Business Profile</Link> est optimisée
                et vos avis sont suivis. À partir de Croissance, on déploie une stratégie SEO
                locale complète : pages locales, backlinks, contenu de blog optimisé.
              </p>

              <h3>Les réseaux sociaux</h3>
              <p>
                On gère vos{" "}
                <Link href="/services/support-communication-pme">réseaux sociaux</Link> de A à Z :
                création du planning éditorial, rédaction des posts, création des visuels,
                publication et modération des commentaires. Instagram, Facebook, LinkedIn —
                selon votre audience.
              </p>

              <h3>La production de contenu</h3>
              <p>
                À partir du forfait Croissance, un{" "}
                <Link href="/services/creation-contenu-pme">shooting photo professionnel</Link> est
                réalisé chaque trimestre dans vos locaux. Le forfait Premium ajoute une vidéo
                professionnelle par mois et du design graphique illimité.
              </p>

              <h3>L&apos;automatisation</h3>
              <p>
                Le forfait Premium inclut la mise en place de{" "}
                <Link href="/services/automatisation-nocode-dijon">workflows automatisés</Link> :
                envoi de devis, suivi de prospects, publication automatique, tableaux de bord.
                Pour vous faire gagner 5 à 10 heures par semaine.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 7. TÉMOIGNAGES */}
      <Testimonials
        items={temoignages.slice(0, 2)}
        title="Ils ont choisi un forfait"
        badge="Témoignages"
      />

      {/* 8. FAQ */}
      <FaqAccordion
        items={faqForfaits}
        title="Questions sur les forfaits"
        subtitle="Les réponses aux questions les plus fréquentes."
        badge="FAQ"
      />

      {/* 9. CTA */}
      <CtaSection
        title="Besoin d'un forfait sur-mesure ?"
        subtitle="Chaque entreprise est unique. On construit une formule adaptée à vos objectifs et votre budget."
        variant="primary"
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
