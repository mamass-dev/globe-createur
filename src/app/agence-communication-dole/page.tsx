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
  title: "Agence de communication à Dole - Studio Digital PME | Globe Créateur",
  description: "Agence de communication à Dole spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises doloises. Studio basé à 1h15 de Dole.",
  path: "/agence-communication-dole",
})

const avantages = [
  { title: "Proximité Jura", description: "À 1h15 de Dole via l'A39, on se déplace régulièrement dans le Jura. Réunions, shootings et audits terrain inclus dans notre accompagnement." },
  { title: "Sensibilité patrimoine & terroir", description: "Ville natale de Pasteur, canal du Rhône au Rhin, Jura viticole : on valorise ce qui rend Dole unique dans votre communication." },
  { title: "Studio tout-en-un", description: "Site web, SEO, photo, vidéo, réseaux sociaux : tout est géré en interne. Un seul contrat, une seule stratégie, un seul interlocuteur." },
  { title: "Prix PME, qualité agence", description: "Des forfaits accessibles aux budgets des PME doloises. La qualité d'une agence structurée sans le prix d'une grosse structure." },
  { title: "Reporting clair", description: "Chaque mois, un bilan lisible : trafic web, positions Google, engagement réseaux, demandes de contact. Des vrais chiffres, pas du blabla." },
  { title: "Agilité & réactivité", description: "Petite structure = réactivité. Une urgence, un événement de dernière minute ? On s'adapte sans vous faire passer par 3 niveaux de validation." },
]

const steps = [
  { number: "01", title: "Audit gratuit", description: "On fait le point sur votre présence digitale : site, SEO, réseaux sociaux, fiche Google. On regarde aussi vos concurrents sur le bassin dolois." },
  { number: "02", title: "Stratégie sur-mesure", description: "On construit un plan d'action adapté à Dole et au Jura : positionnement, mots-clés locaux, calendrier éditorial, objectifs chiffrés." },
  { number: "03", title: "Production complète", description: "Création du site, shooting photo, contenus rédactionnels et visuels. Tout est produit en interne et validé avec vous." },
  { number: "04", title: "Gestion continue", description: "Réseaux sociaux, SEO, mises à jour du site. Reporting mensuel et ajustements stratégiques selon les résultats obtenus." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 1, suffix: "h15", label: "De Dole" },
]

const faqAgence = [
  { question: "Êtes-vous installés à Dole ?", answer: "Notre studio est basé à Longvic, aux portes de Dijon, à environ 1h15 de Dole par l'A39. On se déplace dans le Jura pour les réunions de lancement, les shootings et les audits sur place. Le pilotage courant se fait en visio et par email." },
  { question: "Pourquoi choisir votre agence plutôt qu'un prestataire local ?", answer: "Dole dispose de peu d'agences intégrées offrant site + SEO + photo + vidéo + réseaux sous un même toit. Notre modèle de studio vous évite de coordonner plusieurs freelances. Un seul contrat, une stratégie cohérente, et des tarifs compétitifs." },
  { question: "Combien coûte un site internet pour une entreprise à Dole ?", answer: "Un site vitrine professionnel démarre à 2 500 € HT. Pour un site avec boutique en ligne ou fonctionnalités spécifiques, comptez 4 000 à 8 000 € HT. Devis gratuit et détaillé. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure la création du site." },
  { question: "Travaillez-vous avec des commerces de centre-ville ?", answer: "Oui, c'est un de nos cas d'usage les plus fréquents. Fiche Google Business Profile optimisée, site vitrine simple et efficace, présence Instagram ou Facebook régulière. On aide les commerces dolois à capter les clients qui cherchent sur Google." },
  { question: "Vous gérez les réseaux sociaux ?", answer: "Oui, intégralement. Stratégie éditoriale, création de contenus visuels, publication, modération des commentaires et reporting mensuel. On adapte le ton et le rythme à votre activité et à la vie locale doloise." },
  { question: "Pouvez-vous mettre en valeur le patrimoine de Dole dans notre communication ?", answer: "Absolument. Que vous soyez un hôtel, un restaurant ou un commerce du centre historique, on intègre le patrimoine dolois (vieille ville, canal, maison Pasteur) dans vos visuels et vos contenus. C'est un atout différenciant face aux grandes villes voisines." },
  { question: "En combien de temps livrez-vous un site ?", answer: "Un site vitrine prend 3 à 5 semaines. Un projet plus complexe (multi-pages, blog, réservation en ligne) nécessite 6 à 10 semaines. Le planning précis est défini dès la validation du devis." },
  { question: "Faites-vous de la photo et vidéo à Dole ?", answer: "Oui, on se déplace à Dole et dans le Jura pour tous types de shootings. Photo de produit, photo d'ambiance en centre-ville, portraits d'équipe, vidéo corporate, Reels Instagram. On couvre aussi vos événements (marchés, fêtes, portes ouvertes)." },
]

export const revalidate = 3600

export default function AgenceDolePage() {
  if (!isCityPublished("agence-communication-dole")) notFound()

  return (
    <>
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Dole", href: "/agence-communication-dole" }]} />

      <PageHero
        badge="Agence communication Dole"
        title="Votre agence de communication à Dole"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME doloises. Un studio intégré à 1h15 de Dole, au cœur de Bourgogne-Franche-Comté."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises de Dole nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication qui connaît le marché dolois</h2>
            <p>
              Dole, sous-préfecture du Jura et ville natale de Louis Pasteur,
              est une cité de caractère avec un centre historique remarquable,
              un canal animé et un tissu de PME dynamiques. Entre patrimoine,
              commerce de proximité et vignoble jurassien, votre communication
              mérite mieux qu&apos;un template générique.
            </p>
            <p>
              Globe Créateur accompagne les entreprises doloises avec une
              communication sur-mesure. On connaît le bassin dolois, ses
              événements, sa saisonnalité et ses enjeux. On fonctionne comme
              votre{" "}
              <strong>service communication externalisé</strong> — disponible,
              réactif et orienté résultats.
            </p>

            <h2>Nos services pour les entreprises à Dole</h2>
            <p>Un studio intégré, toutes les compétences sous un même toit :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines pour commerces, artisans et PME du bassin dolois.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation de votre site avec un design actuel et un SEO renforcé.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local Dole</Link> -
                Référencement &quot;Dole&quot; et &quot;Jura&quot;, Google Business Profile, Pack Local, avis clients.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Shooting en centre-ville, photo produit, vidéo corporate, Reels pour les réseaux.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Réseaux sociaux, planning éditorial, reporting mensuel, gestion de communauté.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour automatiser vos tâches administratives.
              </li>
            </ul>

            <h2>Le marché dolois : potentiel digital sous-exploité</h2>
            <p>
              Dole et son agglomération comptent environ 50 000 habitants. La
              ville bénéficie d&apos;une position géographique stratégique entre
              Dijon et Besançon, avec un accès direct à l&apos;A39. Le centre-ville
              connaît un renouveau commercial, et le tourisme fluvial autour du
              canal du Rhône au Rhin attire une clientèle croissante.
            </p>
            <p>
              Pourtant, la présence en ligne de nombreuses PME doloises reste
              embryonnaire. Des sites datés, des fiches Google incomplètes, des
              réseaux sociaux sans stratégie. Le digital est une opportunité
              pour les entreprises doloises qui veulent se démarquer : moins de
              concurrence en ligne qu&apos;à Dijon ou Besançon, et des positions
              à prendre rapidement.
            </p>

            <h2>Forfaits communication pour les PME de Dole</h2>
            <p>
              On ne fait pas de la communication &quot;one shot&quot;. Nos{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link>{" "}
              incluent l&apos;ensemble de vos besoins : site internet, SEO,
              réseaux sociaux, production de contenus. Un budget fixe, sans
              mauvaise surprise.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. Le site web est
              généralement inclus dans le forfait. On ajuste le périmètre
              selon vos objectifs et votre budget.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Dole</h2>
            <p>
              On travaille avec des PME de tous horizons, avec une sensibilité
              particulière pour :
            </p>
            <ul>
              <li>Commerces du centre historique - Fiche Google, site vitrine, Instagram, visibilité dans les recherches locales</li>
              <li>Artisans et métiers de bouche - Photo produit, site, réseaux sociaux, SEO &quot;artisan Dole&quot;</li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et hébergements</Link> - Sites de réservation, SEO touristique, photos professionnelles</li>
              <li>Tourisme fluvial et activités canal - Sites immersifs, SEO tourisme, vidéo drone canal du Rhône au Rhin</li>
              <li>PME industrielles du Jura - Sites techniques, communication B2B, LinkedIn, photo industrielle</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Dole" />

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
        title="Prêt à booster votre communication à Dole ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
