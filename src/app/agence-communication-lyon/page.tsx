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
  title: "Agence de communication Lyon - Alternative PME | Globe Créateur",
  description: "Alternative aux grosses agences lyonnaises. Sites web, SEO, photo, vidéo et réseaux sociaux pour les PME. Studio à taille humaine à 2h de Lyon, tarifs compétitifs.",
  path: "/agence-communication-lyon",
})

const avantages = [
  { title: "Alternative à taille humaine", description: "Vous en avez marre des grosses agences lyonnaises qui vous traitent comme un petit compte ? Chez nous, chaque client est prioritaire." },
  { title: "Tarifs 30 à 40% sous Lyon", description: "Même qualité de livrables, mais sans les loyers du 2e arrondissement. On répercute nos coûts réduits sur vos tarifs." },
  { title: "Studio intégré complet", description: "Site web, SEO, photo, vidéo, réseaux sociaux : tout en interne. Pas de sous-traitance, pas de surprise, une stratégie cohérente." },
  { title: "Interlocuteur dédié", description: "Pas de chargé de compte junior qui change tous les 6 mois. Un contact senior qui connaît votre entreprise sur le long terme." },
  { title: "Résultats prouvés", description: "Reporting mensuel avec des métriques concrètes : trafic, positions Google, leads, engagement. On est jugés sur les résultats, pas sur les slides." },
  { title: "Réactivité PME", description: "Validation en 24h, pas en 2 semaines. On s'adapte au rythme des PME, pas à celui des comités de direction de grands groupes." },
]

const steps = [
  { number: "01", title: "Audit gratuit", description: "On analyse votre présence en ligne actuelle : site, SEO, réseaux, et on compare avec vos concurrents sur le marché lyonnais et régional." },
  { number: "02", title: "Stratégie ciblée", description: "On bâtit un plan d'action réaliste : positionnement face à la concurrence lyonnaise, mots-clés à fort potentiel, quick wins identifiés." },
  { number: "03", title: "Production & lancement", description: "Création du site, shooting photo, contenus et visuels. Tout est produit en interne. Validation à chaque jalon avant mise en ligne." },
  { number: "04", title: "Pilotage & croissance", description: "Gestion des réseaux sociaux, SEO continu, campagnes saisonnières. Reporting mensuel et optimisations data-driven." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 2, suffix: "h", label: "De Lyon" },
]

const faqAgence = [
  { question: "Pourquoi choisir une agence à 2h de Lyon plutôt qu'une agence lyonnaise ?", answer: "Parce qu'à Lyon, les PME sont souvent le « petit client » d'une grosse agence. Chez nous, vous êtes un client stratégique. On vous offre un interlocuteur dédié, des tarifs 30 à 40% inférieurs et la même qualité de livrables. La distance n'est plus un frein avec les outils actuels." },
  { question: "Comment se passent les réunions et les shootings ?", answer: "Les points réguliers se font en visio (Google Meet ou Zoom). Pour les shootings photo/vidéo et les réunions de lancement, on se déplace à Lyon. On intègre ces déplacements dans nos forfaits, pas de surcoût." },
  { question: "Combien coûte un site internet avec votre agence ?", answer: "Un site vitrine professionnel démarre à 2 500 € HT — soit 30 à 40% de moins qu'une agence du centre de Lyon. Pour un site avec fonctionnalités avancées (e-commerce, réservation, espace client), comptez 4 000 à 8 000 € HT. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure le site." },
  { question: "Vous connaissez le marché lyonnais ?", answer: "On travaille avec des clients dont les concurrents sont à Lyon. On connaît le niveau d'exigence du marché lyonnais, les standards visuels et le positionnement des agences locales. Notre avantage : on offre la même qualité sans les coûts de structure d'une agence Presqu'île." },
  { question: "Vous gérez les réseaux sociaux ?", answer: "Oui, c'est un de nos piliers. Stratégie, création de contenus (photos, vidéos, visuels), publication, community management et reporting. On travaille Instagram, LinkedIn, Facebook et TikTok selon votre cible." },
  { question: "J'ai déjà un site mais il ne génère rien. Que faire ?", answer: "C'est le cas de figure le plus courant. On commence par un audit SEO et UX gratuit pour identifier les blocages. Souvent, c'est un problème de référencement, de vitesse ou de structure. Une refonte ciblée avec un vrai travail SEO change la donne en quelques mois." },
  { question: "Combien de temps pour créer un site ?", answer: "Un site vitrine se livre en 3 à 5 semaines. Un site e-commerce ou multi-fonctionnalités demande 6 à 10 semaines. On établit un retroplanning précis dès la validation du devis." },
  { question: "Faites-vous de la photo et vidéo à Lyon ?", answer: "Oui, on se déplace à Lyon pour tous types de shootings. Photo culinaire pour les restaurants lyonnais, reportage d'entreprise, portraits corporate, vidéo institutionnelle, Reels et TikTok. On intervient dans toute l'agglomération et au-delà." },
]

export const revalidate = 3600

export default function AgenceLyonPage() {
  if (!isCityPublished("agence-communication-lyon")) notFound()

  return (
    <>
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Lyon", href: "/agence-communication-lyon" }]} />

      <PageHero
        badge="Agence communication Lyon"
        title="L'alternative aux grosses agences lyonnaises"
        subtitle="Sites web, SEO, photo, vidéo et réseaux sociaux pour les PME. Un studio intégré à taille humaine, 30 à 40% moins cher qu'une agence du centre de Lyon."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi des PME lyonnaises travaillent avec nous"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Le problème des PME à Lyon</h2>
            <p>
              Lyon est la 2e ville de France et un marché hyper-concurrentiel.
              Des dizaines d&apos;agences de communication se battent pour les
              grands comptes — et les PME se retrouvent souvent avec le stagiaire
              ou le chargé de compte le moins expérimenté. Résultat : des
              prestations chères, des délais longs et un manque d&apos;attention.
            </p>
            <p>
              Globe Créateur propose une alternative claire : un{" "}
              <strong>studio intégré à taille humaine</strong> où chaque client
              est stratégique. On réunit toutes les compétences en interne (site,
              SEO, photo, vidéo, réseaux), on facture 30 à 40% de moins qu&apos;une
              agence Presqu&apos;île, et on délivre la même qualité.
            </p>

            <h2>Nos services pour les PME lyonnaises</h2>
            <p>Toutes nos compétences, un seul studio :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines, sites e-commerce, landing pages. Design sur-mesure, pas de template.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Votre site a 5 ans et ne convertit pas ? On le modernise sans perdre votre SEO.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local et national</Link> -
                Référencement Google, stratégie de contenu, Pack Local, Google Business Profile.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Photo culinaire, vidéo corporate, Reels, TikTok, portraits d&apos;équipe. On se déplace à Lyon.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Réseaux sociaux (Instagram, LinkedIn, TikTok), planning éditorial, community management.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour automatiser vos process et gagner du temps.
              </li>
            </ul>

            <h2>Lyon vs agence à taille humaine : le vrai comparatif</h2>
            <p>
              Une agence de communication à Lyon facture en moyenne 15 000 à
              30 000 € pour un site internet PME, avec des délais de 3 à 6
              mois. Pour ce prix, vous aurez peut-être un beau site — mais
              pas forcément un site qui génère des clients.
            </p>
            <p>
              Notre approche est différente. On livre un site en 3 à 5 semaines,
              optimisé SEO dès le départ, pour un budget 2 à 3 fois inférieur.
              Et on ne s&apos;arrête pas au site : nos forfaits mensuels couvrent
              l&apos;ensemble de votre communication digitale. Un investissement
              prévisible qui travaille pour vous chaque jour.
            </p>

            <h2>Forfaits communication : l&apos;alternative au budget agence lyonnaise</h2>
            <p>
              Plutôt que des devis à 5 chiffres pour chaque projet, nos{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link>{" "}
              regroupent tout : site internet, SEO, réseaux sociaux, contenus
              visuels. Prévisible, scalable, sans engagement longue durée.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. À Lyon, une agence
              comparable facturerait facilement 2 000 à 4 000 €/mois pour le
              même périmètre. On fait le même travail avec moins de charges
              de structure.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Lyon</h2>
            <p>
              On travaille avec des PME de tous secteurs qui cherchent une
              alternative aux grosses agences lyonnaises :
            </p>
            <ul>
              <li>Restaurants et food - Photo culinaire, Instagram, Google Business, site avec réservation</li>
              <li>Start-ups et scale-ups - Branding, site performant, acquisition digitale, LinkedIn B2B</li>
              <li>Commerces et boutiques - Site e-commerce, SEO local, réseaux sociaux, photos produit</li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et lieux événementiels</Link> - Sites immersifs, SEO hôtelier, photos professionnelles, vidéo</li>
              <li>Prestataires B2B et consultants - Site vitrine, LinkedIn, SEO, génération de leads qualifiés</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Lyon" />

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
        title="Marre de payer trop cher pour pas assez ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
