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
import { FaqSchema, CityLocalBusinessSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { ContactCard } from "@/components/sections/contact-card"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"

export const metadata: Metadata = buildMetadata({
  title: "Agence de communication à Besançon - Studio Digital PME | Globe Créateur",
  description: "Agence de communication à Besançon spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises bisontines. Studio basé à 1h30 de Besançon.",
  path: "/agence-communication-besancon",
})

const avantages = [
  { title: "Pont Bourgogne-Franche-Comté", description: "À 1h30 de Besançon via l'A36, on intervient régulièrement en Franche-Comté. On connaît les deux versants de la grande région." },
  { title: "Compréhension de l'industrie locale", description: "Microtechniques, horlogerie, sous-traitance industrielle : on sait parler de vos métiers techniques sans jargon creux." },
  { title: "Studio intégré", description: "Site web, SEO, photo, vidéo, réseaux sociaux : tout est produit en interne. Un seul prestataire, une stratégie cohérente." },
  { title: "Tarifs compétitifs", description: "On pratique des tarifs PME, pas des tarifs d'agence parisienne. Forfaits clairs et prévisibles, sans mauvaise surprise." },
  { title: "Reporting transparent", description: "Chaque mois, vous recevez un bilan clair : trafic, positionnement Google, engagement réseaux, demandes de contact générées." },
  { title: "Réactivité terrain", description: "Besoin d'un shooting en urgence ou d'une mise à jour rapide ? On s'organise. Pas de ticket support avec 72h de délai." },
]

const steps = [
  { number: "01", title: "Audit de départ", description: "On analyse votre présence digitale actuelle : site, référencement, réseaux sociaux, concurrents sur le bassin bisontin." },
  { number: "02", title: "Stratégie personnalisée", description: "On construit un plan d'action adapté à votre secteur d'activité et aux spécificités du marché franc-comtois." },
  { number: "03", title: "Réalisation & déploiement", description: "Création du site, production des contenus, visuels et photos. Tout est validé avec vous avant chaque mise en ligne." },
  { number: "04", title: "Accompagnement mensuel", description: "Gestion des réseaux sociaux, optimisation SEO continue, mises à jour. Reporting mensuel et points réguliers." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 1, suffix: "h30", label: "De Besançon" },
]

const faqAgence = [
  { question: "Êtes-vous implantés à Besançon ?", answer: "Notre studio est basé à Longvic, près de Dijon, à environ 1h30 de Besançon par l'A36. On se déplace en Franche-Comté pour les réunions de lancement, les shootings et les audits terrain. Le suivi courant se fait en visio et par email." },
  { question: "Travaillez-vous avec des entreprises industrielles ?", answer: "Oui, on accompagne des PME industrielles et techniques. On sait vulgariser un savoir-faire complexe (microtechniques, usinage, horlogerie) pour le rendre accessible en ligne, que ce soit sur un site vitrine ou sur LinkedIn." },
  { question: "Combien coûte un site internet pour une entreprise à Besançon ?", answer: "Un site vitrine professionnel démarre à 2 500 € HT. Pour un site avec catalogue produit, espace client ou fonctionnalités métier, comptez 4 000 à 8 000 € HT. Le devis est gratuit. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure la création du site." },
  { question: "Pourquoi ne pas prendre une agence bisontine ?", answer: "On ne remplace pas une agence locale, on offre une alternative différente : un studio intégré qui réunit toutes les compétences (site, SEO, photo, vidéo, réseaux) sous un même toit. Moins de coordination, plus de cohérence, et des tarifs souvent plus compétitifs qu'une agence de centre-ville." },
  { question: "Vous gérez les réseaux sociaux de PME industrielles ?", answer: "Oui, et c'est même un de nos points forts. LinkedIn pour le B2B industriel, Instagram pour la marque employeur, Facebook pour le local. On crée les contenus, on publie, on analyse les performances." },
  { question: "Pouvez-vous m'aider à recruter via la communication ?", answer: "Absolument. La marque employeur est un enjeu majeur à Besançon où les talents sont disputés. On travaille sur votre image en ligne (site carrière, vidéos métiers, réseaux sociaux) pour attirer des candidats qualifiés." },
  { question: "Combien de temps pour créer un site ?", answer: "Un site vitrine se livre en 3 à 5 semaines. Un site plus complexe (catalogue, blog, espace client) demande 6 à 10 semaines. On établit un planning précis dès la validation du devis." },
  { question: "Faites-vous de la photo industrielle à Besançon ?", answer: "Oui, on se déplace à Besançon et dans le Doubs pour les shootings. Photo de site industriel, reportage atelier, portraits d'équipe, photo produit technique. On intervient aussi pour vos événements professionnels (salons Micronora, portes ouvertes)." },
]

export const revalidate = 3600

export default function AgenceBesanconPage() {
  if (!isCityPublished("agence-communication-besancon")) notFound()

  return (
    <>
      <CityLocalBusinessSchema
        city="Besançon"
        description="Agence de communication à Besançon spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises bisontines. Studio basé à 1h30 de Besançon."
        slug="agence-communication-besancon"
        geo={{ lat: 47.238, lng: 6.024 }}
      />
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Besançon", href: "/agence-communication-besancon" }]} />

      <PageHero
        badge="Agence communication Besançon"
        title="Votre agence de communication à Besançon"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME bisontines. Un studio intégré à 1h30 de Besançon, au cœur de Bourgogne-Franche-Comté."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises de Besançon nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence qui comprend le tissu économique bisontin</h2>
            <p>
              Besançon, capitale de la Franche-Comté, est une ville d&apos;industrie,
              d&apos;innovation et d&apos;enseignement supérieur. Berceau de
              l&apos;horlogerie française, pôle des microtechniques, ville
              universitaire : votre communication doit parler à ces réalités, pas
              proposer du contenu générique.
            </p>
            <p>
              Globe Créateur accompagne les PME bisontines avec une approche
              concrète et mesurable. On ne vend pas du &quot;branding
              émotionnel&quot; — on construit des outils de communication qui
              génèrent du trafic, des leads et des candidatures. On fonctionne
              comme votre{" "}
              <strong>service communication externalisé</strong>.
            </p>

            <h2>Nos services pour les entreprises à Besançon</h2>
            <p>Un studio intégré, toutes les compétences réunies :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines industriels, sites catalogue, landing pages pour salons professionnels.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation technique et visuelle sans perte de référencement.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local Besançon</Link> -
                Positionnement sur les requêtes &quot;Besançon&quot;, Google Business Profile, Pack Local.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Reportage industriel, photo produit technique, vidéo corporate et marque employeur.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                LinkedIn B2B, Instagram marque employeur, planning éditorial, reporting.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour digitaliser vos process internes.
              </li>
            </ul>

            <h2>Le marché bisontin : un vivier sous-exploité en ligne</h2>
            <p>
              Besançon et son agglomération comptent plus de 190 000 habitants.
              La ville héberge un écosystème industriel dense (TEMIS, pôle des
              microtechniques) et une université qui forme 25 000 étudiants. C&apos;est
              un marché B2B et B2C riche, mais la présence digitale de nombreuses
              PME bisontines reste en retrait.
            </p>
            <p>
              On observe des sites d&apos;entreprises industrielles qui datent de
              2015, des fiches Google incomplètes, des pages LinkedIn abandonnées.
              Résultat : les prospects trouvent vos concurrents avant vous. Un site
              moderne, un SEO local solide et une présence LinkedIn active changent
              la donne rapidement.
            </p>

            <h2>Forfaits communication pour les PME de Besançon</h2>
            <p>
              Un site internet seul ne suffit pas. Nos{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link>{" "}
              couvrent l&apos;ensemble de votre communication : site, SEO,
              réseaux sociaux, contenus visuels. Un budget fixe chaque mois,
              sans surprise.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. Le site internet peut
              être inclus dans le forfait. On s&apos;adapte à vos enjeux :
              visibilité locale, recrutement, développement commercial B2B.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Besançon</h2>
            <p>
              On intervient sur tous les secteurs, avec une expertise renforcée
              pour le marché bisontin :
            </p>
            <ul>
              <li>PME industrielles et sous-traitants - Sites techniques, SEO B2B, LinkedIn, photo industrielle</li>
              <li>Microtechniques et horlogerie - Communication de savoir-faire, site catalogue, salons (Micronora)</li>
              <li>Commerces et restauration - Fiche Google, site vitrine, réseaux sociaux, photos professionnelles</li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et hébergements</Link> - SEO touristique, site de réservation, photos d&apos;ambiance</li>
              <li>Start-ups et entreprises tech - Branding, site moderne, stratégie de contenu, acquisition digitale</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Besançon" />

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
        title="Ils nous font confiance en Bourgogne-Franche-Comté"
        badge="Témoignages"
      />

      <FaqAccordion
        items={faqAgence}
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir avant de nous contacter."
        badge="FAQ"
      />

      <CtaSection
        title="Prêt à booster votre communication à Besançon ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
