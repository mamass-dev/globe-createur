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
import { CityCrosslinks } from "@/components/sections/city-crosslinks"
import { RelatedBlogPosts } from "@/components/sections/related-blog-posts"
import { ContactCard } from "@/components/sections/contact-card"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"

export const metadata: Metadata = buildMetadata({
  title: "Agence de communication à Longvic — Web, SEO & contenu pour PME | Globe Créateur",
  description: "Globe Créateur, agence de communication basée à Longvic (Dijon) : création de site internet, SEO local, photo, vidéo, réseaux sociaux. Notre studio est ici, pas à 2h de route. Audit offert.",
  path: "/agence-communication-longvic",
  keywords: ["agence communication Longvic", "agence web Longvic", "création site internet Longvic", "agence SEO Longvic", "agence de communication Longvic", "webmarketing Longvic", "référencement Longvic", "PME Longvic"],
})

const avantages = [
  { title: "On est vraiment ici", description: "Pas de studio parisien qui vous vend la « proximité » depuis Paris : notre agence est basée à Longvic. Un rendez-vous, c'est 10 minutes de route, pas une visio forcée." },
  { title: "Zone d'activité, on la connaît", description: "La ZAE de Longvic est l'une des plus importantes de la métropole dijonnoise. On y travaille, on y vit, on connaît ses commerces, ses artisans et ses entreprises." },
  { title: "Interlocuteur unique", description: "Site, SEO, photo, vidéo, réseaux : un seul contact qui pilote tout. Pas de coordination entre 4 prestataires différents." },
  { title: "Budget maîtrisé", description: "Des forfaits pensés pour les PME locales. Pas de tarif parisien, pas de coût caché. Vous savez ce que vous payez chaque mois." },
  { title: "Résultats mesurables", description: "On ne vend pas du « branding » flou : trafic, positions Google, demandes de contact. Tout est chiffré chaque mois." },
  { title: "Vision globale", description: "Votre site, votre SEO et vos réseaux sociaux sont pilotés ensemble, avec une seule stratégie cohérente." },
]

const steps = [
  { number: "01", title: "Audit offert", description: "On analyse votre présence en ligne : site, SEO, réseaux sociaux, fiche Google. On regarde aussi ce que font vos voisins de la zone d'activité." },
  { number: "02", title: "Stratégie locale", description: "On construit un plan adapté à votre secteur et à votre zone de chalandise : Longvic, Dijon Métropole, Côte-d'Or." },
  { number: "03", title: "Production & livraison", description: "Site web, visuels, contenus, photos : tout est produit en interne. On valide chaque étape avec vous avant publication." },
  { number: "04", title: "Pilotage mensuel", description: "Gestion des réseaux sociaux, optimisation SEO, mises à jour. Un reporting clair chaque mois avec les indicateurs qui comptent." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 0, suffix: " min", label: "De route depuis Longvic" },
]

const faqAgence = [
  { question: "Êtes-vous vraiment basés à Longvic ?", answer: "Oui. Notre studio est au 13 Rue du Professeur Louis Néel, à Longvic. Ce n'est pas une adresse de domiciliation : c'est là qu'on travaille tous les jours. On peut vous recevoir sur place ou passer chez vous si vous êtes dans la zone d'activité." },
  { question: "Pourquoi une agence de com' choisirait Longvic plutôt que le centre de Dijon ?", answer: "<!-- AXEL: raison précise du choix de Longvic pour l'implantation du studio (loyer, accès, proximité clients de la ZAE, autre) -->" },
  { question: "Combien coûte un site internet pour une PME à Longvic ?", answer: "Le tarif dépend de la complexité du projet. Le devis est gratuit, détaillé et sans engagement. Nos forfaits mensuels peuvent inclure la création du site." },
  { question: "Vous accompagnez des entreprises de la zone d'activité de Longvic ?", answer: "<!-- AXEL: cas clients réels situés dans la ZAE de Longvic ou à proximité (secteur, type de mission) -->" },
  { question: "Vous gérez aussi les réseaux sociaux ?", answer: "Oui, de A à Z. Stratégie éditoriale, création de contenus (photos, vidéos, visuels), publication, modération et reporting. On adapte le calendrier à votre activité." },
  { question: "En combien de temps un site est-il prêt ?", answer: "Comptez 3 à 5 semaines pour un site vitrine. Un site plus complexe (multi-pages, blog, réservation) demande 6 à 10 semaines. Le planning est défini dès le devis validé." },
  { question: "Faites-vous des photos et vidéos sur place, à Longvic ?", answer: "Oui, c'est même plus simple qu'ailleurs : pas de trajet, pas de frais de déplacement à facturer. Reportage terrain, photo produit, vidéo pour vos réseaux sociaux — on peut être chez vous dans la journée." },
  { question: "Pourquoi ne pas juste passer par une agence du centre-ville de Dijon ?", answer: "Vous pouvez, mais la question n'est pas la localisation, c'est le modèle : chez nous, c'est un studio intégré (site + SEO + photo + vidéo + réseaux) avec un seul interlocuteur, pas une agence qui sous-traite à 4 freelances. Être à Longvic ne change rien à ça — sauf qu'on est encore plus proches si vous êtes dans le secteur." },
]

export default function AgenceLongvicPage() {
  return (
    <>
      <CityLocalBusinessSchema
        city="Longvic"
        description="Agence de communication basée à Longvic, aux portes de Dijon. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME de la zone d'activité de Longvic et de la métropole dijonnaise."
        slug="agence-communication-longvic"
        geo={{ lat: 47.297, lng: 5.063 }}
      />
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Longvic", href: "/agence-communication-longvic" }]} />

      <PageHero
        badge="Agence communication Longvic — notre siège"
        title="Votre agence de communication à Longvic"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME de Longvic et de la métropole dijonnaise. Notre studio est ici — littéralement à deux pas."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises de Longvic nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication, basée à Longvic, pas juste « dans la région »</h2>
            <p>
              La plupart des pages de ce type commencent par « notre studio est à
              X heures de chez vous ». Pas celle-ci. Longvic, c&apos;est chez nous.
              Notre siège est au 13 Rue du Professeur Louis Néel, dans la zone
              d&apos;activité. Si vous êtes une entreprise de Longvic, on n&apos;est
              pas une agence distante qui promet de la proximité — on est votre
              voisin.
            </p>
            <p>
              Globe Créateur accompagne les PME de Longvic et de la métropole
              dijonnaise avec une communication digitale complète. On fonctionne
              comme votre <strong>équipe communication externalisée</strong> :
              site, SEO, réseaux sociaux, photo et vidéo, pilotés par un seul
              interlocuteur.
            </p>

            <h2>Ce qu&apos;on fait pour les entreprises à Longvic</h2>
            <p>Toutes nos expertises réunies :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines, sites multi-pages, landing pages pour votre activité.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation de votre site avec préservation du référencement acquis.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local Longvic</Link> -
                Positionnement sur les requêtes « Longvic » et « Dijon Métropole », Google Business Profile, avis clients.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Reportage terrain, photo produit, vidéo corporate — sans frais de déplacement puisqu&apos;on est déjà là.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Réseaux sociaux, calendrier éditorial, reporting mensuel.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> -
                Make, Airtable, Notion pour simplifier vos processus internes.
              </li>
            </ul>

            <h2>La zone d&apos;activité de Longvic : un tissu économique qu&apos;on connaît de l&apos;intérieur</h2>
            <p>
              La ZAE de Longvic est l&apos;une des plus importantes zones
              d&apos;activité de Dijon Métropole en nombre d&apos;emplois — autour
              de 7 000 emplois selon les derniers chiffres de la métropole, en
              croissance ces dernières années, portée notamment par le commerce
              de gros et les équipements automobiles. Ce n&apos;est pas une
              statistique abstraite pour nous : c&apos;est notre environnement de
              travail quotidien.
            </p>
            <p>
              Beaucoup d&apos;entreprises installées dans la zone — commerce de
              gros, artisanat, services aux entreprises — ont un site vieillissant
              ou une visibilité en ligne minimale, alors que leur activité est
              solide. C&apos;est le décalage qu&apos;on corrige : un tissu
              économique dense, mais une présence digitale qui ne suit pas
              toujours.
            </p>

            <h2>Création et refonte de site internet à Longvic</h2>
            <p>
              On crée des sites sur mesure — pas de template acheté 50 € — pensés
              dès le départ pour le référencement local : structure optimisée pour
              les recherches « Longvic » et « Dijon », vitesse de chargement
              irréprochable, version mobile prioritaire.
            </p>
            <p>
              Pour une refonte, on applique une méthode stricte de{" "}
              <Link href="/blog/refaire-son-site-sans-perdre-son-seo">
                migration sans perte de référencement
              </Link>{" "}
              : audit de l&apos;existant, redirections 301, conservation des
              contenus qui rankent.
            </p>

            <h2>Branding, logo et identité visuelle à Longvic</h2>
            <p>
              Un site n&apos;est convaincant que si l&apos;image qu&apos;il porte
              l&apos;est aussi. On conçoit des identités visuelles complètes pour
              les entreprises de Longvic : logo, charte graphique, supports print
              et digitaux, déclinaisons réseaux sociaux.
            </p>

            <h2>Pourquoi passer par l&apos;agence qui est littéralement dans votre rue</h2>
            <p>
              Vous pouvez trouver une agence web moins chère à distance. Mais elle
              ne connaîtra pas votre zone d&apos;activité, ne pourra pas passer
              en 10 minutes pour un shooting ou un point rapide, et ne comprendra
              pas la réalité d&apos;une PME installée à Longvic : logistique,
              accès poids lourds, clientèle B2B ou B2C locale.
            </p>
            <p>
              <strong>Notre proximité n&apos;est pas un argument marketing, c&apos;est
              un fait vérifiable</strong> : notre adresse est publique, notre studio
              est ouvert, et le trajet pour venir nous voir se compte en minutes.
            </p>

            <h2>Forfaits communication pour les PME de Longvic</h2>
            <p>
              Créer un site puis le laisser dormir, ça ne marche pas. Nos{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link>{" "}
              couvrent tout : site internet, SEO, réseaux sociaux, contenus
              visuels. Un investissement fixe et prévisible.
            </p>
            <p>
              Trois formules adaptées à votre budget et vos objectifs. Le site web
              est souvent inclus dans le forfait.
            </p>

            <h2>Les secteurs qu&apos;on accompagne à Longvic</h2>
            <p>
              On travaille avec des PME de tous secteurs, avec une attention
              particulière pour le tissu local :
            </p>
            <ul>
              <li>Commerce de gros et distribution - Site B2B, catalogue en ligne, SEO sectoriel</li>
              <li>Artisans et industrie légère - Site vitrine, portfolio de réalisations, fiche Google optimisée</li>
              <li>Automobile et équipementiers - Communication technique, visuels produit, référencement local</li>
              <li>Commerces et services de proximité - Fiche Google, site vitrine, réseaux sociaux</li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et lieux événementiels</Link> - Sites de réservation, photos professionnelles</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CONTACT PRIVILÉGIÉ */}
      <ContactCard city="Longvic" />

      <Stats stats={stats} />

      <ServiceGrid
        services={services}
        title="Nos expertises"
        subtitle="Tout ce dont votre communication a besoin, sous un même toit — à deux pas de chez vous."
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

      <CityCrosslinks currentSlug="agence-communication-longvic" />

      <RelatedBlogPosts title="Conseils communication & SEO local" subtitle="Nos derniers articles pour développer votre visibilité." />

      <CtaSection
        title="Prêt à booster votre communication à Longvic ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h. Et si vous êtes dans le secteur, on peut passer directement."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
