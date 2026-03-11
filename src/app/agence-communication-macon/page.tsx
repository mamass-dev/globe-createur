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
  title: "Agence de communication à Mâcon - Studio Digital PME | Globe Créateur",
  description: "Agence de communication à Mâcon spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises mâconnaises. Studio basé à 1h15 de Mâcon.",
  path: "/agence-communication-macon",
})

const avantages = [
  { title: "Ancrage Bourgogne Sud", description: "À 1h15 de Mâcon, on connaît le tissu économique sud-bourguignon et ses spécificités. On se déplace pour vos projets." },
  { title: "Expertise vignoble & tourisme", description: "Mâconnais, Pouilly-Fuissé, Roche de Solutré : on maîtrise les codes du terroir viticole et touristique local." },
  { title: "Un interlocuteur unique", description: "Site, SEO, photo, réseaux sociaux : un seul contact qui coordonne l'ensemble. Fini le ping-pong entre prestataires." },
  { title: "Tarifs adaptés PME", description: "Des forfaits conçus pour les budgets des PME mâconnaises. Transparence totale, aucun coût caché." },
  { title: "Résultats chiffrés", description: "Reporting mensuel clair : positions Google, trafic organique, demandes de devis, taux d'engagement sur les réseaux." },
  { title: "Stratégie cohérente", description: "Votre site, votre SEO et vos réseaux sociaux travaillent ensemble dans une stratégie unifiée, pas en silos." },
]

const steps = [
  { number: "01", title: "Diagnostic gratuit", description: "On passe au crible votre présence en ligne : site, SEO, réseaux, fiche Google. On analyse aussi vos concurrents sur le marché mâconnais." },
  { number: "02", title: "Plan d'action ciblé", description: "On bâtit une stratégie adaptée au bassin de Mâcon : positionnement, mots-clés locaux, calendrier éditorial saisonnier." },
  { number: "03", title: "Production intégrée", description: "Site web, contenus, visuels, shooting photo : tout est produit en interne. Validation à chaque étape avant mise en ligne." },
  { number: "04", title: "Suivi & optimisation", description: "Gestion continue de vos réseaux, SEO, mises à jour du site. Reporting mensuel et ajustements selon les résultats." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 1, suffix: "h15", label: "De Mâcon" },
]

const faqAgence = [
  { question: "Êtes-vous basés à Mâcon ?", answer: "Notre studio est à Longvic, près de Dijon, à environ 1h15 de Mâcon. On se déplace régulièrement en Saône-et-Loire pour les shootings, réunions et audits terrain. Le suivi courant se fait par visio et email." },
  { question: "Travaillez-vous avec des domaines viticoles du Mâconnais ?", answer: "Oui, on accompagne plusieurs domaines en Bourgogne. On connaît les appellations du Mâconnais (Pouilly-Fuissé, Saint-Véran, Viré-Clessé) et les codes visuels du secteur viticole. Sites immersifs, photo produit, SEO local et réseaux sociaux." },
  { question: "Combien coûte un site internet pour une PME à Mâcon ?", answer: "Un site vitrine professionnel démarre à partir de 2 500 € HT. Pour un site avec boutique en ligne ou fonctionnalités avancées, comptez 4 000 à 8 000 € HT. Le devis est gratuit et sans engagement. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure le site." },
  { question: "Pourquoi choisir une agence bourguignonne plutôt qu'une agence lyonnaise ?", answer: "Lyon est à 70 km de Mâcon, mais les agences lyonnaises facturent des tarifs métropolitains et ne connaissent pas forcément le tissu économique mâconnais. Nous, on travaille avec des PME de Bourgogne au quotidien. On connaît vos enjeux et on pratique des tarifs adaptés." },
  { question: "Vous gérez les réseaux sociaux ?", answer: "Oui, de la stratégie à la publication. On crée les contenus (photos, vidéos, visuels), on gère le calendrier éditorial et on adapte le ton à votre cible. Reporting mensuel inclus pour suivre les performances." },
  { question: "Je suis commerçant en centre-ville de Mâcon, que pouvez-vous faire pour moi ?", answer: "On commence par optimiser votre fiche Google Business Profile pour que vous apparaissiez dans les recherches locales. Ensuite, un site vitrine optimisé SEO et une présence réseaux sociaux régulière. C'est le trio gagnant pour un commerce de centre-ville." },
  { question: "Combien de temps pour créer un site web ?", answer: "Un site vitrine prend 3 à 5 semaines. Un site plus ambitieux (multi-pages, blog, e-commerce) peut nécessiter 6 à 10 semaines. On vous communique un planning précis dès le devis validé." },
  { question: "Faites-vous de la photo et vidéo à Mâcon ?", answer: "Oui, on se déplace dans tout le Mâconnais pour les shootings. Photo produit, photo d'ambiance, portraits d'équipe, vidéo corporate, vidéo courte pour les réseaux sociaux. On intervient aussi sur vos événements (salons, foires aux vins, portes ouvertes)." },
]

export const revalidate = 3600

export default function AgenceMaconPage() {
  if (!isCityPublished("agence-communication-macon")) notFound()

  return (
    <>
      <CityLocalBusinessSchema
        city="Mâcon"
        description="Agence de communication à Mâcon spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises mâconnaises. Studio basé à 1h15 de Mâcon."
        slug="agence-communication-macon"
        geo={{ lat: 46.307, lng: 4.834 }}
      />
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Mâcon", href: "/agence-communication-macon" }]} />

      <PageHero
        badge="Agence communication Mâcon"
        title="Votre agence de communication à Mâcon"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME mâconnaises. Un studio intégré à 1h15 de Mâcon, ancré en Bourgogne."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises de Mâcon nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication connectée au marché mâconnais</h2>
            <p>
              Mâcon, préfecture de Saône-et-Loire, se situe à la croisée de la
              Bourgogne et du Beaujolais. Entre vignobles du Mâconnais, tourisme
              fluvial sur la Saône et dynamisme commercial en centre-ville, les
              entreprises locales ont besoin d&apos;une communication qui reflète
              cette identité — pas d&apos;un template parisien plaqué.
            </p>
            <p>
              Globe Créateur accompagne les PME mâconnaises avec une approche
              sur-mesure. On connaît les appellations locales, la saisonnalité
              touristique et le tissu économique de la Saône-et-Loire. On
              fonctionne comme votre{" "}
              <strong>département communication externalisé</strong>.
            </p>

            <h2>Nos services pour les entreprises à Mâcon</h2>
            <p>Toutes nos compétences sous un même toit :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines, sites viticoles, landing pages pour votre activité mâconnaise.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation de votre site sans perdre votre référencement acquis.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local Mâcon</Link> -
                Google Business Profile, référencement sur les requêtes &quot;Mâcon&quot;, Pack Local, gestion des avis.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Shooting dans les vignes du Mâconnais, photo produit, vidéo corporate et Reels.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Gestion de vos réseaux sociaux, planning éditorial, reporting mensuel.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour gagner du temps sur vos tâches répétitives.
              </li>
            </ul>

            <h2>Le marché mâconnais : opportunités digitales</h2>
            <p>
              Mâcon bénéficie d&apos;une position stratégique sur l&apos;axe
              Dijon-Lyon, avec un bassin de plus de 80 000 habitants dans
              l&apos;agglomération. Le vignoble du Mâconnais (Pouilly-Fuissé en
              tête) attire un tourisme œnologique croissant, et le commerce de
              centre-ville se renouvelle.
            </p>
            <p>
              Pourtant, beaucoup de PME mâconnaises restent peu visibles en
              ligne. Sites vitrines datés, fiches Google incomplètes, réseaux
              sociaux en friche. C&apos;est une fenêtre de tir : avec un site
              moderne et un SEO local bien travaillé, vous pouvez rapidement
              prendre des positions sur les recherches &quot;à Mâcon&quot;.
            </p>

            <h2>Forfaits communication pour les PME de Mâcon</h2>
            <p>
              On ne livre pas un site puis on disparaît. Nos{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link>{" "}
              incluent l&apos;ensemble de votre communication : site internet,
              SEO, réseaux sociaux, contenus visuels. Un investissement
              prévisible chaque mois.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. Le site internet est
              souvent inclus dans le forfait. On s&apos;adapte à votre budget
              et à vos priorités.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Mâcon</h2>
            <p>
              On travaille avec des PME de tous secteurs, avec une expertise
              particulière pour :
            </p>
            <ul>
              <li>Domaines viticoles du Mâconnais - Sites immersifs, vente en ligne, SEO &quot;vin Mâcon&quot;</li>
              <li>Commerces de centre-ville - Visibilité locale, fiche Google optimisée, réseaux sociaux</li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et hébergements</Link> - Sites de réservation, SEO hôtelier, photos professionnelles</li>
              <li>Restaurants et cavistes - Photos food, menu en ligne, avis Google, Instagram</li>
              <li>Artisans et prestataires de services - Site vitrine, référencement local, génération de leads</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Mâcon" />

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
        title="Prêt à booster votre communication à Mâcon ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
