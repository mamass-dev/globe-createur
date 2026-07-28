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
import { CityCrosslinks } from "@/components/sections/city-crosslinks"
import { RelatedBlogPosts } from "@/components/sections/related-blog-posts"
import { ContactCard } from "@/components/sections/contact-card"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"

export const metadata: Metadata = buildMetadata({
  title: "Agence de communication à Nevers — Web, SEO & contenu pour PME | Globe Créateur",
  description: "Agence de communication et agence web pour les PME de Nevers et de la Nièvre : création de site internet, SEO local, photo, vidéo, réseaux sociaux. Audit offert et devis gratuit sous 24 h.",
  path: "/agence-communication-nevers",
  keywords: ["agence communication Nevers", "agence web Nevers", "création site internet Nevers", "agence SEO Nevers", "agence de communication Nevers", "agence digitale Nevers", "webmarketing Nevers", "référencement Nevers", "agence Nièvre"],
})

const avantages = [
  { title: "Proximité Bourgogne Ouest", description: "À 2h de Nevers, on intervient dans la Nièvre pour vos projets. Shooting, réunion de lancement ou audit terrain : on se déplace." },
  { title: "Connaissance du terroir nivernais", description: "Pouilly-Fumé, Magny-Cours, Loire sauvage : on connaît les atouts de votre territoire et on les valorise dans votre communication." },
  { title: "Interlocuteur unique", description: "Site, SEO, photo, vidéo, réseaux : un seul contact qui pilote tout. Pas de coordination entre 4 freelances différents." },
  { title: "Budget maîtrisé", description: "Nos forfaits sont pensés pour les PME nivernaises. Pas de tarif parisien, pas de coût caché. Vous savez ce que vous payez chaque mois." },
  { title: "Résultats mesurables", description: "On ne promet pas du « branding », on livre des résultats : trafic, positions Google, demandes de contact. Tout est chiffré chaque mois." },
  { title: "Vision globale", description: "Votre site, votre SEO et vos réseaux sociaux sont pilotés ensemble. Une seule stratégie cohérente, pas des actions dispersées." },
]

const steps = [
  { number: "01", title: "Audit offert", description: "On analyse votre présence en ligne : site, SEO, réseaux sociaux, fiche Google. On regarde aussi ce que font vos concurrents dans la Nièvre." },
  { number: "02", title: "Stratégie locale", description: "On construit un plan adapté au marché nivernais : mots-clés locaux, calendrier saisonnier (Magny-Cours, tourisme Loire), cibles prioritaires." },
  { number: "03", title: "Production & livraison", description: "Site web, visuels, contenus, photos : tout est produit en interne. On valide chaque étape avec vous avant publication." },
  { number: "04", title: "Pilotage mensuel", description: "Gestion des réseaux sociaux, optimisation SEO, mises à jour. Un reporting clair chaque mois avec les indicateurs qui comptent." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 2, suffix: "h", label: "De Nevers" },
]

const faqAgence = [
  { question: "Êtes-vous basés à Nevers ?", answer: "Non, notre studio est à Longvic près de Dijon, à environ 2h de Nevers. On se déplace dans la Nièvre pour les réunions de démarrage, les shootings et les audits. Le pilotage courant (réseaux sociaux, SEO, mises à jour) se fait à distance par visio et email." },
  { question: "Pourquoi choisir une agence dijonnaise plutôt qu'une agence locale ?", answer: "Nevers compte peu d'agences de communication intégrées. Les PME nivernaises font souvent appel à des freelances isolés ou à des agences parisiennes chères. Notre modèle de studio intégré (site + SEO + photo + vidéo + réseaux) offre une solution complète à un tarif compétitif." },
  { question: "Combien coûte un site internet pour une PME à Nevers ?", answer: "Le tarif dépend de la complexité du projet. Le devis est gratuit, détaillé et sans engagement. Nos forfaits mensuels peuvent inclure la création du site." },
  { question: "Connaissez-vous le marché nivernais ?", answer: "On travaille avec des entreprises de toute la Bourgogne. On connaît les enjeux de la Nièvre : tourisme vert autour de la Loire, événements Magny-Cours, appellations viticoles (Pouilly-Fumé, Coteaux du Giennois), commerce de centre-ville à redynamiser." },
  { question: "Vous gérez les réseaux sociaux ?", answer: "Oui, de A à Z. Stratégie éditoriale, création de contenus (photos, vidéos, visuels), publication, modération et reporting. On adapte les formats et le calendrier à votre activité et à la saisonnalité nivernaise." },
  { question: "Pouvez-vous m'aider à attirer les touristes dans la Nièvre ?", answer: "C'est un de nos axes forts. SEO local, Google Business Profile, site immersif, contenus photo et vidéo qui mettent en valeur votre lieu ou votre activité. On travaille la visibilité sur les requêtes touristiques « Nièvre », « Loire à vélo », « Magny-Cours »." },
  { question: "En combien de temps un site est-il prêt ?", answer: "Comptez 3 à 5 semaines pour un site vitrine. Un site plus complexe (multi-pages, blog, réservation) demande 6 à 10 semaines. Le planning est défini dès le devis validé." },
  { question: "Faites-vous des photos et vidéos dans la Nièvre ?", answer: "Oui, on se déplace dans toute la Nièvre. Photo de paysage, reportage d'activité, portraits d'équipe, vidéo drone sur la Loire, vidéo courte pour les réseaux sociaux. On intervient aussi sur vos événements (courses Magny-Cours, marchés, foires)." },
]

export const revalidate = 3600

export default function AgenceNeversPage() {
  if (!isCityPublished("agence-communication-nevers")) notFound()

  return (
    <>
      <CityLocalBusinessSchema
        city="Nevers"
        description="Agence de communication à Nevers spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises nivernaises. Studio basé à 2h de Nevers."
        slug="agence-communication-nevers"
        geo={{ lat: 46.990, lng: 3.159 }}
      />
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Nevers", href: "/agence-communication-nevers" }]} />

      <PageHero
        badge="Agence communication Nevers"
        title="Votre agence de communication à Nevers"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME nivernaises. Un studio intégré à 2h de Nevers, ancré en Bourgogne."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises de Nevers nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication au service des PME nivernaises</h2>
            <p>
              Nevers, préfecture de la Nièvre, est une ville de caractère au
              confluent de la Loire et de la Nièvre. Circuit de Magny-Cours,
              vignobles de Pouilly-sur-Loire, patrimoine ducal, tourisme fluvial :
              le territoire a des atouts considérables. Mais beaucoup d&apos;entreprises
              locales restent invisibles en ligne.
            </p>
            <p>
              Globe Créateur accompagne les PME nivernaises avec une communication
              digitale complète. On ne se contente pas de créer un joli site - on
              construit une présence en ligne qui génère du trafic et des clients.
              On fonctionne comme votre{" "}
              <strong>équipe communication externalisée</strong>.
            </p>

            <h2>Ce qu&apos;on fait pour les entreprises à Nevers</h2>
            <p>Toutes nos expertises réunies :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines, sites touristiques, landing pages pour vos activités nivernaises.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation de votre site avec préservation du référencement acquis.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local Nevers</Link> -
                Positionnement sur les requêtes &quot;Nevers&quot; et &quot;Nièvre&quot;, Google Business Profile, avis clients.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Reportage terrain, photo produit, vidéo corporate, drone sur la Loire.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Réseaux sociaux, calendrier éditorial adapté, reporting mensuel.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour simplifier vos processus internes.
              </li>
            </ul>

            <h2>Création et refonte de site internet à Nevers</h2>
            <p>
              C&apos;est la demande n°1 des entreprises nivernaises qui nous
              contactent : un site vitrine moderne, ou la refonte d&apos;un site
              vieillissant qui ne génère plus rien. On crée des sites sur mesure
              — pas de template acheté 50 € — pensés dès le départ pour le
              référencement local : structure optimisée pour les recherches
              &quot;Nevers&quot; et &quot;Nièvre&quot;, vitesse de chargement
              irréprochable, version mobile prioritaire.
            </p>
            <p>
              Pour une refonte, on applique une méthode stricte de{" "}
              <Link href="/blog/refaire-son-site-sans-perdre-son-seo">
                migration sans perte de référencement
              </Link>{" "}
              : audit de l&apos;existant, redirections 301, conservation des
              contenus qui rankent. Votre nouveau site repart avec l&apos;acquis
              Google de l&apos;ancien, pas de zéro.
            </p>

            <h2>Branding, logo et identité visuelle à Nevers</h2>
            <p>
              Un site n&apos;est convaincant que si l&apos;image qu&apos;il porte
              l&apos;est aussi. On conçoit des identités visuelles complètes pour
              les entreprises nivernaises : logo, charte graphique, supports
              print et digitaux, déclinaisons réseaux sociaux. Avec un principe :
              votre image doit être à la hauteur de votre savoir-faire, et
              cohérente partout où vos clients vous croisent — site, fiche
              Google, réseaux, véhicules, devanture.
            </p>

            <h2>Le marché nivernais : une vraie carte à jouer en digital</h2>
            <p>
              La Nièvre connaît un renouveau touristique porté par la Loire à
              vélo, le circuit de Magny-Cours et un tourisme vert en pleine
              expansion. Parallèlement, le commerce de centre-ville de Nevers
              se réinvente et de nouvelles entreprises s&apos;installent, attirées
              par le cadre de vie et des coûts plus bas qu&apos;en métropole.
            </p>
            <p>
              Côté digital, le terrain est encore largement ouvert. Peu de PME
              nivernaises investissent sérieusement dans leur SEO local ou leurs
              réseaux sociaux. C&apos;est l&apos;occasion idéale : un site bien
              référencé et une fiche Google optimisée suffisent souvent à dominer
              les résultats locaux.
            </p>

            <h2>Comment vos clients vous cherchent dans la Nièvre</h2>
            <p>
              La Nièvre est l&apos;un des départements les moins densément peuplés
              de France, et ça change tout pour votre stratégie digitale. Vos
              clients ne cherchent pas seulement &quot;à Nevers&quot; : ils tapent
              aussi Cosne-Cours-sur-Loire, Decize, La Charité-sur-Loire, ou
              directement &quot;dans la Nièvre&quot;. Une entreprise nivernaise
              qui limite sa visibilité à sa seule commune passe à côté de la
              majorité de son marché réel.
            </p>
            <p>
              Concrètement, ça veut dire deux choses. D&apos;abord, votre fiche
              Google doit être configurée en <strong>zone de chalandise</strong> et
              non en simple adresse, pour couvrir tout votre périmètre
              d&apos;intervention. Ensuite, votre site doit assumer une visibilité
              départementale : parler de la Nièvre, pas seulement de votre rue.
            </p>
            <p>
              L&apos;autre particularité du marché nivernais, c&apos;est la
              faiblesse de la concurrence en ligne : beaucoup d&apos;entreprises
              locales ont un site datant de plusieurs années, jamais retravaillé
              pour le référencement. Là où il faut 12 à 18 mois pour émerger dans
              une métropole, un site bien construit et une fiche Google active
              peuvent prendre les premières positions locales en quelques mois
              dans la Nièvre. C&apos;est une fenêtre d&apos;opportunité — elle se
              refermera à mesure que le territoire se digitalise.
            </p>

            <h2>Forfaits communication pour les PME de Nevers</h2>
            <p>
              Créer un site puis le laisser dormir, ça ne marche pas. Nos{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link>{" "}
              couvrent tout : site internet, SEO, réseaux sociaux, contenus
              visuels. Un investissement fixe et prévisible.
            </p>
            <p>
              Trois formules adaptées à votre budget et vos objectifs. Le site web est souvent
              inclus dans le forfait. On adapte le périmètre à vos ambitions et
              à vos priorités.
            </p>

            <h2>Les secteurs qu&apos;on accompagne dans la Nièvre</h2>
            <p>
              On travaille avec des PME de tous secteurs, avec un intérêt
              particulier pour le tissu nivernais :
            </p>
            <ul>
              <li>Tourisme et loisirs - Sites immersifs, SEO touristique, photo drone, Loire à vélo</li>
              <li>Sport automobile et événements Magny-Cours - Communication événementielle, réseaux sociaux, vidéo</li>
              <li>Domaines viticoles (Pouilly-Fumé) - Sites de domaine, vente en ligne, SEO viticole</li>
              <li>Commerces de centre-ville - Fiche Google, site vitrine, Instagram, visibilité locale</li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et chambres d&apos;hôtes</Link> - Sites de réservation, SEO hôtelier, photos professionnelles</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Nevers" />

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

      <CityCrosslinks currentSlug="agence-communication-nevers" />

      <RelatedBlogPosts title="Conseils communication & SEO local" subtitle="Nos derniers articles pour développer votre visibilité." />

      <CtaSection
        title="Prêt à booster votre communication à Nevers ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
