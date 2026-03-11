import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { PageHero } from "@/components/sections/page-hero"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { ServiceGrid } from "@/components/sections/service-grid"
import { ProcessSteps } from "@/components/sections/process-steps"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"

export const metadata: Metadata = buildMetadata({
  title: "Agence de communication à Beaune - Studio Digital PME | Globe Créateur",
  description: "Agence de communication à Beaune spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises beaunoises. Studio basé à 40 min de Beaune.",
  path: "/agence-communication-beaune",
})

const avantages = [
  { title: "Proximité Beaune", description: "À 40 minutes de Beaune, on se déplace pour les shootings, les réunions et les audits sur place." },
  { title: "Expertise viticole & tourisme", description: "On connaît l'écosystème beaunois : domaines viticoles, hôtels, restaurants étoilés, commerces du centre historique." },
  { title: "Un seul interlocuteur", description: "Fini la coordination entre 4 prestataires. Un contact unique qui gère l'ensemble de votre communication." },
  { title: "Résultats mesurables", description: "Reporting mensuel avec des vrais chiffres : trafic, positions Google, demandes de contact, engagement." },
  { title: "Tarifs PME", description: "Des forfaits pensés pour les budgets PME beaunoises. Pas de surprise, pas de coût caché." },
  { title: "Vision 360°", description: "Site, SEO, réseaux et contenu travaillent ensemble dans une stratégie cohérente pour votre entreprise." },
]

const steps = [
  { number: "01", title: "Audit gratuit", description: "On analyse votre communication actuelle : site, SEO, réseaux, concurrents sur le marché beaunois." },
  { number: "02", title: "Stratégie sur-mesure", description: "On construit un plan d'action adapté à vos objectifs et au tissu économique de Beaune." },
  { number: "03", title: "Production & lancement", description: "Site, contenus, visuels : on produit tout en interne et on lance avec votre validation." },
  { number: "04", title: "Pilotage continu", description: "Gestion des réseaux, SEO, mises à jour. Reporting mensuel et ajustements." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 40, suffix: "min", label: "De Beaune" },
]

const faqAgence = [
  { question: "Êtes-vous basés à Beaune ?", answer: "Notre studio est à Longvic, aux portes de Dijon, à environ 40 minutes de Beaune. On se déplace régulièrement à Beaune pour les shootings photo, les réunions et les audits. Le pilotage courant se fait par visio et email." },
  { question: "Travaillez-vous avec des domaines viticoles ?", answer: "Oui, c'est même une de nos spécialités. On accompagne des domaines et maisons de vin avec des sites immersifs, de la photo de produit, du SEO local et de la gestion de réseaux sociaux. On connaît les codes du secteur viticole bourguignon." },
  { question: "Combien coûte un site internet pour une entreprise à Beaune ?", answer: "Un site vitrine professionnel démarre à partir de 2 500 € HT. Pour un site plus complet avec réservation en ligne ou boutique, comptez 4 000 à 8 000 € HT. Le devis est gratuit et détaillé. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure le site." },
  { question: "Pourquoi ne pas prendre une agence parisienne moins chère ?", answer: "Une agence à Paris ne viendra pas shooter vos vignes un matin de septembre. Elle ne connaîtra pas la saisonnalité touristique de Beaune, ni les attentes des visiteurs des Hospices. Notre ancrage local est un avantage concurrentiel réel pour votre communication." },
  { question: "Vous gérez aussi les réseaux sociaux ?", answer: "Oui. On prend en charge la stratégie éditoriale, la création de contenus (photos, vidéos, visuels), la publication et le reporting. On adapte le ton et le calendrier à votre secteur et à la saisonnalité beaunoise (vendanges, Hospices, saison touristique)." },
  { question: "Je n'ai pas de site internet. Par où commencer ?", answer: "Par un audit gratuit. On regarde votre situation actuelle et on vous recommande la meilleure approche. Pour la plupart des PME beaunoises, on commence par un site internet optimisé SEO + une fiche Google Business Profile bien travaillée." },
  { question: "Combien de temps pour avoir un site internet ?", answer: "Un site vitrine prend 3 à 5 semaines. Un site plus complexe (multi-pages, blog, réservation) peut prendre 6 à 10 semaines. On vous donne un planning précis dès le devis." },
  { question: "Vous faites aussi de la photo et vidéo sur Beaune ?", answer: "Oui, on se déplace à Beaune et dans tout le vignoble pour les shootings. Photo produit, photo d'ambiance, portraits d'équipe, vidéo corporate, vidéo Reels/TikTok. On intervient aussi pour des événements (dégustations, salons)." },
]

export default function AgenceBeaunePage() {
  return (
    <>
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Beaune", href: "/agence-communication-beaune" }]} />

      <PageHero
        badge="Agence communication Beaune"
        title="Votre agence de communication à Beaune"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME beaunoises. Un studio intégré à 40 min de Beaune, qui connaît votre marché."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises de Beaune nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication qui connaît Beaune</h2>
            <p>
              Beaune, c&apos;est la capitale des vins de Bourgogne, un patrimoine
              UNESCO, des Hospices mondialement connus et un tissu économique
              dynamique entre tourisme, viticulture et commerce. Votre communication
              doit refléter cette richesse - pas ressembler à un template générique.
            </p>
            <p>
              Globe Créateur accompagne les PME beaunoises avec une communication
              sur-mesure qui parle à vos clients. On connaît la saisonnalité de
              votre marché, les attentes des touristes, et la concurrence locale.
              On fonctionne comme votre{" "}
              <strong>équipe communication externalisée</strong>.
            </p>

            <h2>Ce qu&apos;on fait pour les entreprises à Beaune</h2>
            <p>Nos compétences réunies sous un même toit :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines, sites de domaines viticoles, landing pages de réservation.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation sans perte de référencement.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local</Link> -
                Google Business Profile, référencement &quot;Beaune&quot;, Pack Local, avis clients.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Shooting vignoble, produit, ambiance. Vidéo corporate et Reels.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Réseaux sociaux, planning éditorial, reporting mensuel.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour automatiser vos tâches répétitives.
              </li>
            </ul>

            <h2>Le marché beaunois : nos observations terrain</h2>
            <p>
              Beaune attire plus de 300 000 visiteurs par an. La majorité cherche
              sur Google avant de réserver un hôtel, un restaurant ou une
              dégustation. Si votre site n&apos;apparaît pas dans les 3 premiers
              résultats, vous laissez ces clients à vos concurrents.
            </p>
            <p>
              On constate que beaucoup de PME beaunoises ont encore des sites
              datés, pas optimisés mobile, avec un SEO inexistant. C&apos;est une
              opportunité : avec un site moderne et un référencement local bien
              travaillé, vous pouvez prendre des positions rapidement.
            </p>

            <h2>Forfaits communication pour les PME de Beaune</h2>
            <p>
              Plutôt qu&apos;un projet ponctuel livré et oublié, on propose des{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link> qui
              incluent l&apos;ensemble de votre communication. Le site internet est
              souvent inclus dans le forfait.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. Un investissement
              prévisible dans une communication qui travaille pour vous chaque jour,
              même en dehors de la saison touristique.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Beaune</h2>
            <p>
              On travaille avec des PME de tous secteurs, mais on a une expertise
              forte pour les entreprises beaunoises :
            </p>
            <ul>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et hébergements</Link> - Sites immersifs, réservation directe, SEO local hôtelier</li>
              <li>Domaines viticoles - Sites de présentation, vente en ligne, visites et dégustations</li>
              <li>Restaurants et bars à vin - Photos appétissantes, Google Business, réseaux sociaux</li>
              <li>Commerces du centre-ville - Visibilité locale, fiche Google, site vitrine</li>
              <li>Prestataires tourisme - Guides, circuits, activités : site + SEO pour capter les visiteurs</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      <Stats stats={stats} />

      <ServiceGrid
        services={services}
        title="Nos expertises"
        subtitle="Tout ce dont votre communication a besoin, sous un même toit."
        badge="Services"
      />

      <ProcessSteps
        title="Comment ça se passe"
        subtitle="De l'audit initial au pilotage continu, un process transparent."
        badge="Notre méthode"
        steps={steps}
      />

      <Testimonials
        items={temoignages}
        title="Ils nous font confiance en Bourgogne"
        badge="Témoignages"
      />

      <FaqAccordion
        items={faqAgence}
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir avant de nous contacter."
        badge="FAQ"
      />

      <CtaSection
        title="Prêt à booster votre communication à Beaune ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
