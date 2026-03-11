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
import { FaqSchema, CityLocalBusinessSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { ContactCard } from "@/components/sections/contact-card"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"

export const metadata: Metadata = buildMetadata({
  title: "Agence de communication à Chalon-sur-Saône - Studio Digital PME | Globe Créateur",
  description: "Agence de communication à Chalon-sur-Saône spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux. Studio basé en Bourgogne, à 1h de Chalon.",
  path: "/agence-communication-chalon-sur-saone",
})

const avantages = [
  { title: "Proximité Chalon", description: "À 1h de Chalon-sur-Saône, on se déplace pour les shootings, les réunions et les audits sur place." },
  { title: "Connaissance du marché", description: "On connaît le tissu économique chalonnais : industrie, commerce, services, et le dynamisme du Grand Chalon." },
  { title: "Un seul interlocuteur", description: "Fini la coordination entre 4 prestataires. Un contact unique qui gère l'ensemble de votre communication." },
  { title: "Résultats mesurables", description: "Reporting mensuel avec des vrais chiffres : trafic, positions Google, demandes de contact, engagement." },
  { title: "Tarifs PME", description: "Des forfaits pensés pour les budgets PME. Pas de surprise, pas de coût caché." },
  { title: "Vision 360°", description: "Site, SEO, réseaux et contenu travaillent ensemble dans une stratégie globale pour votre entreprise." },
]

const steps = [
  { number: "01", title: "Audit gratuit", description: "On analyse votre communication actuelle : site, SEO, réseaux, concurrents sur le marché chalonnais." },
  { number: "02", title: "Stratégie sur-mesure", description: "On construit un plan d'action adapté à vos objectifs et au bassin économique de Chalon-sur-Saône." },
  { number: "03", title: "Production & lancement", description: "Site, contenus, visuels : on produit tout en interne et on lance avec votre validation." },
  { number: "04", title: "Pilotage continu", description: "Gestion des réseaux, SEO, mises à jour. Reporting mensuel et ajustements." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 1, suffix: "h", label: "De Chalon-sur-Saône" },
]

const faqAgence = [
  { question: "Êtes-vous basés à Chalon-sur-Saône ?", answer: "Notre studio est à Longvic, aux portes de Dijon, à environ 1 heure de Chalon-sur-Saône. On se déplace régulièrement dans le Grand Chalon pour les shootings, les réunions et les audits. Le pilotage courant se fait par visio et email." },
  { question: "Pourquoi choisir Globe Créateur plutôt qu'une agence chalonnaise ?", answer: "Chalon-sur-Saône compte peu d'agences de communication intégrées. La plupart sont des freelances spécialisés dans un seul domaine. Globe Créateur réunit toutes les compétences (web, SEO, photo, vidéo, design, réseaux) sous un même toit, avec un seul interlocuteur." },
  { question: "Combien coûte un site internet pour une entreprise à Chalon ?", answer: "Un site vitrine professionnel démarre à partir de 2 500 € HT. Pour un site plus complet, comptez 4 000 à 8 000 € HT. Le devis est gratuit et détaillé. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure le site." },
  { question: "Vous travaillez avec quels types d'entreprises ?", answer: "Des PME de 2 à 50 salariés, des indépendants et des professions libérales. À Chalon-sur-Saône, on accompagne des commerces du centre-ville, des entreprises de la zone industrielle, des prestataires de services, des restaurants et des professionnels de santé." },
  { question: "Vous gérez aussi les réseaux sociaux ?", answer: "Oui. On prend en charge la stratégie éditoriale, la création de contenus, la publication et le reporting. On adapte le calendrier à votre activité et aux événements locaux chalonnais." },
  { question: "Je n'ai pas de site internet. Par où commencer ?", answer: "Par un audit gratuit. On analyse votre situation et on recommande la meilleure approche. Pour la plupart des PME chalonnaises, on commence par un site optimisé SEO + une fiche Google Business Profile." },
  { question: "Combien de temps pour créer un site ?", answer: "Un site vitrine prend 3 à 5 semaines. Un site plus complexe peut prendre 6 à 10 semaines. Planning précis dès le devis." },
  { question: "Vous vous déplacez à Chalon pour les photos ?", answer: "Oui, on se déplace à Chalon-sur-Saône et dans tout le Grand Chalon pour les shootings photo et vidéo. Portraits d'équipe, photos de locaux, produits, événements. On intervient aussi pour les salons et événements professionnels." },
]

export default function AgenceChalonsurSaonePage() {
  return (
    <>
      <CityLocalBusinessSchema
        city="Chalon-sur-Saône"
        description="Agence de communication à Chalon-sur-Saône spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux. Studio basé en Bourgogne, à 1h de Chalon."
        slug="agence-communication-chalon-sur-saone"
        geo={{ lat: 46.781, lng: 4.854 }}
      />
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Chalon-sur-Saône", href: "/agence-communication-chalon-sur-saone" }]} />

      <PageHero
        badge="Agence communication Chalon-sur-Saône"
        title="Votre agence de communication à Chalon-sur-Saône"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME chalonnaises. Un studio intégré en Bourgogne, au service de votre croissance."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises de Chalon nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication pour les PME chalonnaises</h2>
            <p>
              Chalon-sur-Saône est la deuxième ville de Saône-et-Loire, avec un
              bassin économique dynamique : industrie, commerce, services,
              artisanat. Le Grand Chalon regroupe plus de 100 000 habitants et
              des milliers d&apos;entreprises qui ont besoin de visibilité.
            </p>
            <p>
              Pourtant, beaucoup de PME chalonnaises n&apos;ont pas de présence
              en ligne digne de ce nom. Un site daté, pas de SEO, des réseaux
              sociaux abandonnés. Globe Créateur change ça. On fonctionne comme
              votre <strong>équipe communication externalisée</strong> : un seul
              interlocuteur qui gère l&apos;ensemble de votre communication.
            </p>

            <h2>Ce qu&apos;on fait pour les entreprises à Chalon</h2>
            <p>Toutes nos compétences réunies :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines, landing pages, sites multi-pages sur-mesure.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation sans perte de référencement.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local</Link> -
                Google Business Profile, référencement &quot;Chalon-sur-Saône&quot;, Pack Local.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Shooting sur place, vidéo corporate, identité visuelle.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Réseaux sociaux, planning éditorial, reporting mensuel.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour automatiser vos process.
              </li>
            </ul>

            <h2>Le marché chalonnais : une opportunité SEO</h2>
            <p>
              Bonne nouvelle pour les PME de Chalon-sur-Saône : la concurrence
              en ligne est encore faible. Peu d&apos;entreprises locales investissent
              dans le SEO. Ça veut dire qu&apos;avec un site bien construit et un
              référencement local travaillé, vous pouvez rapidement apparaître
              dans les premiers résultats Google.
            </p>
            <p>
              On cible les recherches que font vos clients : &quot;restaurant
              Chalon-sur-Saône&quot;, &quot;plombier Chalon&quot;, &quot;comptable
              Grand Chalon&quot;... Chaque requête locale est une opportunité
              de capter un client qui cherche exactement ce que vous proposez.
            </p>

            <h2>Forfaits communication pour les PME de Chalon</h2>
            <p>
              Plutôt qu&apos;un projet ponctuel, on propose des{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link> qui
              incluent l&apos;ensemble de votre communication. Le site internet
              est souvent inclus dans le forfait.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. Un investissement
              prévisible dans une communication professionnelle et continue.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Chalon-sur-Saône</h2>
            <p>
              On travaille avec des PME de tous secteurs autour de Chalon :
            </p>
            <ul>
              <li>Commerces et retail - Centre-ville, zones commerciales, e-commerce local</li>
              <li>Industrie et B2B - Sites corporate, plaquettes digitales, LinkedIn</li>
              <li>Restaurants et hôtels - Photos, Google Business, réseaux sociaux, réservation</li>
              <li>Professions libérales - Crédibilité en ligne, SEO, prise de rendez-vous</li>
              <li>Artisans et services - Visibilité locale, fiche Google, site vitrine</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Chalon-sur-Saône" />

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
        title="Prêt à booster votre communication à Chalon ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
