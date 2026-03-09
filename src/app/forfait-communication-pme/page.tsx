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
  title: "Forfait communication PME - Équipe externalisée à Dijon | Globe Créateur",
  description: "Forfaits communication tout-en-un pour PME à Dijon. Web, SEO, photo, vidéo, réseaux sociaux : une équipe complète externalisée à partir de 890 €/mois HT. Site internet offert selon engagement.",
  path: "/forfait-communication-pme",
})

const forfaits = [
  {
    name: "Essentiel",
    price: "890",
    engagement: "12 mois",
    priceSansEngagement: "1 080",
    description: "La base solide pour exister en ligne et commencer à attirer des clients.",
    features: [
      "Site internet offert (selon engagement)",
      "Pilotage mensuel",
      "Plan d'action simplifié",
      "Contenus adaptés aux priorités",
      "1 réseau social optimisé",
      "Mise à jour légère branding",
      "Support email sous 24h",
    ],
    notIncluded: [
      "Shooting photo",
      "Reporting mensuel",
      "Automatisations",
      "Campagnes pub",
    ],
  },
  {
    name: "Croissance",
    price: "1 490",
    engagement: "6 mois",
    priceSansEngagement: "1 790",
    popular: true,
    description: "Pour accélérer votre visibilité locale et générer des demandes régulières.",
    features: [
      "Tout Essentiel +",
      "Stratégie éditoriale 2 réseaux sociaux",
      "Shooting photo mensuel",
      "Contenus mensuels + plan éditorial",
      "Mise à jour régulière du site",
      "Harmonisation branding",
      "Reporting mensuel",
    ],
    notIncluded: [
      "Automatisations",
      "Campagnes pub",
      "Chef de projet dédié",
    ],
  },
  {
    name: "Performance",
    price: "2 690",
    engagement: "3 mois",
    priceSansEngagement: "2 990",
    description: "La communication complète pour dominer votre marché local.",
    features: [
      "Tout Croissance +",
      "Stratégie mensuelle + trimestrielle",
      "Production vidéo professionnelle",
      "Gestion complète réseaux sociaux",
      "Création de pages mensuelles",
      "CRM & automatisations",
      "Campagnes Meta / LinkedIn",
      "Chef de projet dédié",
      "Priorité totale",
    ],
    notIncluded: [],
  },
]

const comparaison = [
  { feature: "Site internet offert", essentiel: true, croissance: true, premium: true },
  { feature: "Pilotage mensuel", essentiel: true, croissance: true, premium: true },
  { feature: "Plan d'action", essentiel: "Simplifié", croissance: "Stratégie éditoriale", premium: "Mensuel + trimestriel" },
  { feature: "Réseaux sociaux", essentiel: "1 réseau", croissance: "2 réseaux", premium: "Gestion complète" },
  { feature: "Shooting photo", essentiel: "Selon besoins", croissance: "Mensuel", premium: "Mensuel" },
  { feature: "Contenus", essentiel: "Priorités", croissance: "Mensuels + plan édito", premium: "Vidéo pro" },
  { feature: "Mise à jour du site", essentiel: false, croissance: true, premium: "Pages mensuelles" },
  { feature: "Branding", essentiel: "Mise à jour légère", croissance: "Harmonisation", premium: true },
  { feature: "Reporting mensuel", essentiel: false, croissance: true, premium: true },
  { feature: "Automatisations / CRM", essentiel: false, croissance: false, premium: true },
  { feature: "Campagnes pub", essentiel: false, croissance: false, premium: "Meta / LinkedIn" },
  { feature: "Chef de projet dédié", essentiel: false, croissance: false, premium: true },
]

const faqForfaits = [
  { question: "Les forfaits sont-ils sans engagement ?", answer: "Oui, les forfaits existent en version sans engagement (résiliables à tout moment). Mais nous recommandons un engagement (12, 6 ou 3 mois selon la formule) car il permet de bénéficier d'un tarif réduit et du site internet offert." },
  { question: "Puis-je changer de forfait en cours de route ?", answer: "Absolument. Vous pouvez passer d'un forfait à un autre (upgrade ou downgrade) avec un préavis d'un mois. Beaucoup de nos clients commencent par l'Essentiel et passent en Croissance après quelques mois quand ils voient les premiers résultats." },
  { question: "Le site internet est-il vraiment offert ?", answer: "Oui. La création d'un site vitrine (valeur 1 500 à 3 000 €) est offerte selon la durée d'engagement : Essentiel 12 mois, Croissance 6 mois, Performance 3 mois. Le site inclut design moderne, SEO intégré, adapté PME. Hors e-commerce." },
  { question: "Que se passe-t-il si je n'utilise pas toutes mes prestations du mois ?", answer: "Les prestations non utilisées peuvent être reportées le mois suivant, dans la limite d'un mois. On veille à adapter le rythme pour que chaque mois soit pleinement exploité." },
  { question: "Que se passe-t-il si je résilie ?", answer: "Votre site internet vous appartient. Si vous résiliez, vous conservez le site et tout le contenu produit (photos, vidéos, textes). On vous transfère les accès complets. La gestion des réseaux sociaux et le SEO s'arrêtent à la date de fin." },
  { question: "Combien de temps avant de voir des résultats ?", answer: "Les résultats en termes d'image (site professionnel, réseaux actifs) sont immédiats. Pour le SEO local et le trafic organique, comptez 2-3 mois pour les premières améliorations et 4-6 mois pour des résultats significatifs." },
  { question: "Dois-je fournir les photos et les textes ?", answer: "Non, c'est inclus. On rédige tous les textes (site, réseaux sociaux, blog) et on réalise les shootings photo (à partir du forfait Croissance). Pour le forfait Essentiel, on utilise des photos existantes ou on organise un shooting initial." },
  { question: "Travaillez-vous uniquement à Dijon ?", answer: "Non. Nous sommes basés à Dijon mais accompagnons des clients à Beaune, Besançon, Lyon et à distance. Les shootings et réunions en personne sont possibles dans toute la Bourgogne-Franche-Comté." },
  { question: "Comment se passent les paiements ?", answer: "Abonnements mensuels facturés en début de mois. Pour les projets ponctuels : 40 % à la commande, 60 % à la livraison. Paiement par virement bancaire." },
  { question: "Un forfait sur-mesure est-il possible ?", answer: "Oui. Si aucun forfait standard ne correspond à vos besoins, on construit une formule sur-mesure. Contactez-nous pour en discuter." },
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
        subtitle="Web, SEO, photo, vidéo, réseaux sociaux : tout ce dont votre PME a besoin, dans un forfait mensuel clair et sans surprise. À partir de 890 €/mois HT. Site internet offert selon engagement."
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
            <h3>Pourquoi c&apos;est plus rentable qu&apos;embaucher</h3>
            <p>
              Le coût réel d&apos;un salarié communication : <strong>45 000 à 58 000 €/an</strong> (salaire + charges),
              pour une seule compétence. Ajoutez les congés, les arrêts, le turnover, le matériel
              à acheter et la formation à financer.
            </p>
            <p>
              Le coût Globe Créateur : <strong>10 680 à 32 280 €/an</strong>, pour une équipe complète
              et multicompétences. Pas de charges, pas de matériel à acheter. Et le site internet
              est <strong>offert selon la durée d&apos;engagement</strong> (valeur 1 500 à 3 000 €).
            </p>
            <p>
              <strong>Économie moyenne constatée : 40 à 60 % par an.</strong>
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
                Trois formules claires. Site internet offert selon engagement. Également disponibles sans engagement.
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
                  <div className="mt-2 mb-1">
                    <span className="text-3xl font-bold text-foreground">{f.price} €</span>
                    <span className="text-gray-400 text-sm"> /mois HT</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-1">
                    Engagement {f.engagement} - Site offert
                  </p>
                  <p className="text-xs text-gray-300 mb-4">
                    Sans engagement : {f.priceSansEngagement} €/mois HT
                  </p>
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
                  <th className="text-center py-3 px-4 font-medium text-foreground">Performance</th>
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
                  <td className="py-4 pr-4 font-semibold text-foreground">Tarif (avec engagement)</td>
                  <td className="py-4 px-4 text-center font-semibold text-foreground">890 €/mois</td>
                  <td className="py-4 px-4 text-center font-semibold text-primary bg-primary/[0.02]">1 490 €/mois</td>
                  <td className="py-4 px-4 text-center font-semibold text-foreground">2 690 €/mois</td>
                </tr>
                <tr className="border-t border-gray-50">
                  <td className="py-3 pr-4 text-sm text-gray-400">Sans engagement</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-400">1 080 €/mois</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-400 bg-primary/[0.02]">1 790 €/mois</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-400">2 990 €/mois</td>
                </tr>
                <tr className="border-t border-gray-50">
                  <td className="py-3 pr-4 text-sm text-gray-400">Engagement</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-400">12 mois</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-400 bg-primary/[0.02]">6 mois</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-400">3 mois</td>
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
                publication et modération des commentaires. Instagram, Facebook, LinkedIn -
                selon votre audience.
              </p>

              <h3>La production de contenu</h3>
              <p>
                À partir du forfait Croissance, un{" "}
                <Link href="/services/creation-contenu-pme">shooting photo professionnel</Link> est
                réalisé chaque trimestre dans vos locaux. Le forfait Performance ajoute une vidéo
                professionnelle par mois et du design graphique illimité.
              </p>

              <h3>L&apos;automatisation</h3>
              <p>
                Le forfait Performance inclut la mise en place de{" "}
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
