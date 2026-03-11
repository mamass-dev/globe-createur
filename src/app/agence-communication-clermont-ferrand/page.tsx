import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { isCityPublished } from "@/lib/scheduled-pages"
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
import { ContactCard } from "@/components/sections/contact-card"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"

export const metadata: Metadata = buildMetadata({
  title: "Agence de communication Clermont-Ferrand - Studio Digital PME | Globe Créateur",
  description: "Agence de communication pour les PME de Clermont-Ferrand. Sites web, SEO, photo, vidéo et réseaux sociaux. Studio intégré à 3h de Clermont, tarifs compétitifs.",
  path: "/agence-communication-clermont-ferrand",
})

const avantages = [
  { title: "Regard extérieur, ancrage terrain", description: "À 3h de Clermont-Ferrand, on apporte un regard neuf sur votre marché tout en se déplaçant pour les projets terrain." },
  { title: "Expertise PME industrielles", description: "Michelin a mis Clermont sur la carte, mais la ville regorge de PME industrielles. On sait communiquer sur des savoir-faire techniques." },
  { title: "Studio intégré", description: "Site web, SEO, photo, vidéo, réseaux sociaux : tout sous un même toit. Un seul prestataire, zéro coordination à faire de votre côté." },
  { title: "Tarifs hors métropole", description: "On n'a pas les charges d'une agence clermontoise de la place de Jaude. Résultat : des tarifs 20 à 30% plus bas à qualité égale." },
  { title: "Résultats mesurables", description: "Reporting mensuel clair avec trafic, positions SEO, leads et engagement. On pilote votre communication aux données, pas au feeling." },
  { title: "Flexibilité PME", description: "On s'adapte à votre rythme et à vos contraintes. Pas de process lourd, pas de comité de validation interminable." },
]

const steps = [
  { number: "01", title: "Audit de départ", description: "On évalue votre présence en ligne : site, SEO, réseaux sociaux, fiche Google. On analyse aussi vos concurrents sur le marché clermontois." },
  { number: "02", title: "Plan d'action personnalisé", description: "On construit une stratégie adaptée à votre secteur et au bassin clermontois : mots-clés, contenus, calendrier, objectifs chiffrés." },
  { number: "03", title: "Production & déploiement", description: "Création du site, contenus, shootings photo/vidéo. Tout est produit en interne, validé avec vous à chaque étape." },
  { number: "04", title: "Suivi continu", description: "Réseaux sociaux, optimisation SEO, mises à jour. Reporting mensuel et ajustements stratégiques pour améliorer les performances." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 3, suffix: "h", label: "De Clermont-Fd" },
]

const faqAgence = [
  { question: "Pourquoi choisir une agence à 3h de Clermont-Ferrand ?", answer: "Parce que la distance ne change rien à la qualité des livrables. Les réunions courantes se font en visio, et on se déplace à Clermont pour les shootings et les lancements de projet. Notre avantage : des tarifs plus compétitifs qu'une agence du centre de Clermont, et un studio intégré qui réunit toutes les compétences." },
  { question: "Comment gérez-vous les projets à distance ?", answer: "Visio pour les points réguliers, outils collaboratifs (Notion, Figma) pour le suivi, déplacements à Clermont pour les temps forts (shooting, réunion de lancement, audit terrain). 80% du travail de communication se fait devant un écran — la proximité physique n'est nécessaire que pour le terrain." },
  { question: "Combien coûte un site internet pour une PME à Clermont ?", answer: "Un site vitrine professionnel démarre à 2 500 € HT. Un site avec fonctionnalités avancées (boutique, réservation, espace client) se situe entre 4 000 et 8 000 € HT. Le devis est gratuit et sans engagement. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure la création du site." },
  { question: "Travaillez-vous avec des entreprises industrielles ?", answer: "Oui, c'est un de nos axes forts. Clermont-Ferrand a un tissu industriel dense au-delà de Michelin : sous-traitance auto, caoutchouc, agroalimentaire. On sait vulgariser un savoir-faire technique et le mettre en valeur sur le web et LinkedIn." },
  { question: "Vous gérez les réseaux sociaux ?", answer: "Oui, intégralement. Stratégie, création de contenus (photos, vidéos, visuels), publication, community management et reporting mensuel. LinkedIn B2B, Instagram marque employeur, Facebook local — on adapte les canaux à votre cible." },
  { question: "Pouvez-vous m'aider à recruter ?", answer: "La marque employeur est un enjeu central à Clermont-Ferrand où les talents sont courtisés. On travaille sur votre présence en ligne (site carrière, vidéos métiers, réseaux sociaux) pour rendre votre entreprise attractive auprès des candidats." },
  { question: "Combien de temps pour créer un site ?", answer: "Un site vitrine se livre en 3 à 5 semaines. Un site plus complexe (catalogue, blog, e-commerce) nécessite 6 à 10 semaines. Le planning est défini dès le départ pour que vous ayez une visibilité totale." },
  { question: "Faites-vous de la photo et vidéo à Clermont-Ferrand ?", answer: "Oui, on se déplace à Clermont et dans le Puy-de-Dôme pour les shootings. Photo industrielle, photo culinaire, reportage d'entreprise, vidéo corporate, drone sur la chaîne des Puys. On intervient aussi sur vos événements professionnels." },
]

export const revalidate = 3600

export default function AgenceClermontFerrandPage() {
  if (!isCityPublished("agence-communication-clermont-ferrand")) notFound()

  return (
    <>
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Clermont-Ferrand", href: "/agence-communication-clermont-ferrand" }]} />

      <PageHero
        badge="Agence communication Clermont-Ferrand"
        title="Votre agence de communication à Clermont-Ferrand"
        subtitle="Sites web, SEO, photo, vidéo et réseaux sociaux pour les PME clermontoises. Un studio intégré à taille humaine, une alternative aux agences locales."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi des PME clermontoises travaillent avec nous"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence qui parle aux PME de Clermont-Ferrand</h2>
            <p>
              Clermont-Ferrand, capitale de l&apos;Auvergne, est une ville
              d&apos;industrie, d&apos;innovation et d&apos;université. Au pied
              de la chaîne des Puys (patrimoine mondial UNESCO), la métropole
              clermontoise abrite un tissu de PME industrielles et de services
              dynamiques, dans l&apos;ombre du géant Michelin.
            </p>
            <p>
              Globe Créateur propose une alternative aux agences clermontoises :
              un <strong>studio intégré à taille humaine</strong> qui réunit
              toutes les compétences (site, SEO, photo, vidéo, réseaux) sous un
              même toit. On travaille à distance pour le quotidien et on se
              déplace à Clermont pour le terrain.
            </p>

            <h2>Nos services pour les entreprises à Clermont-Ferrand</h2>
            <p>Un seul studio, toutes les expertises :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines industriels, sites de services, landing pages. Design sur-mesure, optimisé conversion.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation visuelle et technique sans perte de référencement acquis.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local Clermont-Ferrand</Link> -
                Référencement sur les requêtes &quot;Clermont-Ferrand&quot;, Google Business Profile, stratégie de contenu.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Reportage industriel, photo produit, vidéo corporate, drone chaîne des Puys.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                LinkedIn B2B, Instagram, planning éditorial, community management, reporting.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour digitaliser vos process et gagner en productivité.
              </li>
            </ul>

            <h2>Le marché clermontois : au-delà de Michelin</h2>
            <p>
              Clermont-Ferrand et sa métropole comptent près de 300 000
              habitants. La ville est un pôle industriel majeur (caoutchouc,
              agroalimentaire, pharma) et universitaire (40 000 étudiants). Le
              tourisme volcanique se développe fortement depuis le classement
              UNESCO de la chaîne des Puys en 2018.
            </p>
            <p>
              Mais les PME clermontoises sont souvent en retard sur le digital.
              Sites d&apos;entreprises qui datent de 2012, LinkedIn laissé à
              l&apos;abandon, fiches Google incomplètes. Les grandes entreprises
              captent toute la visibilité en ligne. Pour une PME, un site
              moderne et un SEO local travaillé permettent de se faire une
              place rapidement dans les résultats de recherche clermontois.
            </p>

            <h2>Forfaits communication pour les PME de Clermont-Ferrand</h2>
            <p>
              Un site seul ne suffit pas à générer des clients. Nos{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link>{" "}
              incluent tout : site internet, SEO, réseaux sociaux, production
              de contenus visuels. Un budget fixe chaque mois, pas de devis
              surprise.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. Le site web est souvent
              inclus dans le forfait. On s&apos;adapte à vos enjeux : visibilité
              locale, recrutement, développement commercial B2B, tourisme.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Clermont-Ferrand</h2>
            <p>
              On travaille avec des PME de tous secteurs, avec une attention
              particulière pour le tissu clermontois :
            </p>
            <ul>
              <li>PME industrielles et sous-traitants - Sites techniques, SEO B2B, LinkedIn, reportage industriel</li>
              <li>Agroalimentaire et terroir auvergnat - Sites produits, e-commerce, photo food, SEO terroir</li>
              <li>Tourisme et volcanisme - Sites immersifs, SEO touristique &quot;chaîne des Puys&quot;, vidéo drone</li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et hébergements</Link> - Sites de réservation, SEO hôtelier, photos et vidéos d&apos;ambiance</li>
              <li>Start-ups et entreprises tech - Branding, site moderne, stratégie d&apos;acquisition, LinkedIn</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Clermont-Ferrand" />

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
        title="Ils nous font confiance"
        badge="Témoignages"
      />

      <FaqAccordion
        items={faqAgence}
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir avant de nous contacter."
        badge="FAQ"
      />

      <CtaSection
        title="Prêt à booster votre communication à Clermont-Ferrand ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
