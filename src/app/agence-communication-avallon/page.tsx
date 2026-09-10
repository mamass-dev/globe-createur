import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
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
import { OffresFixesSection } from "@/components/sections/offres-fixes-section"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"

/*
 * Page ville Avallon (Yonne, 89) — créée le 2026-09-10.
 * Chiffres : INSEE dossier complet commune 89025 (population 2023, établissements fin 2024,
 * créations 2025, emploi salarié fin 2024) et Wikipédia FR (statut, A6, distances, employeurs).
 * Aucun cas client ni résultat chiffré inventé. Vérifier les chiffres INSEE à chaque millésime.
 */

const SLUG = "agence-communication-avallon"

export const metadata: Metadata = buildMetadata({
  title: "Agence de communication à Avallon (89) - Sites, SEO local, photo | Globe Créateur",
  description:
    "Agence de communication pour les PME d'Avallon et de l'Avallonnais : création de site internet, SEO local, fiche Google, photo, vidéo, réseaux sociaux. Studio bourguignon à 1 h 15 par l'A6, déplacements sur place.",
  path: `/${SLUG}`,
})

const avantages = [
  { title: "Sur place à Avallon", description: "Longvic–Avallon, c'est 108 km par l'A38 et l'A6, environ 1 h 15. On vient pour les shootings, les réunions de cadrage et les audits ; le reste se pilote à distance." },
  { title: "Un vide à occuper", description: "Aucune agence de communication complète n'est installée à Avallon. Les prestataires qui ciblent la ville sont à Auxerre, Sens ou Dijon, avec des pages génériques. Une PME avallonnaise bien accompagnée prend l'avantage vite." },
  { title: "Un seul interlocuteur", description: "Site, SEO, photo, vidéo, réseaux : tout est produit et coordonné par le même studio. Vous n'orchestrez pas quatre prestataires." },
  { title: "Résultats mesurables", description: "Reporting mensuel avec les vrais chiffres : trafic, positions Google, appels depuis la fiche, demandes de contact." },
  { title: "Tarifs PME", description: "Forfaits mensuels pensés pour les budgets de l'Avallonnais, et des offres à prix fixe pour les besoins courts." },
  { title: "Deux clientèles, une stratégie", description: "L'Avallonnais vit de sa clientèle locale et des visiteurs du Morvan et de Vézelay. On construit une visibilité qui parle aux deux." },
]

const steps = [
  { number: "01", title: "Audit gratuit", description: "On analyse votre présence actuelle : site, fiche Google, réseaux, et ce que font vos concurrents de l'Avallonnais et de l'Yonne." },
  { number: "02", title: "Stratégie sur-mesure", description: "Un plan d'action adapté à votre activité et à votre clientèle : locale, touristique, ou les deux." },
  { number: "03", title: "Production & lancement", description: "Site, contenus, photos, visuels : produits en interne, validés par vous, mis en ligne." },
  { number: "04", title: "Pilotage continu", description: "Réseaux, SEO, mises à jour, reporting mensuel. On ajuste au fil des saisons." },
]

const stats = [
  { value: 702, suffix: "", label: "Établissements actifs à Avallon (INSEE, fin 2024)" },
  { value: 80, suffix: "", label: "Entreprises créées à Avallon en 2025 (INSEE)" },
  { value: 1, suffix: " h 15", label: "De notre studio par l'A6" },
  { value: 0, suffix: "", label: "Agence de communication installée à Avallon" },
]

const faqAgence = [
  { question: "Êtes-vous basés à Avallon ?", answer: "Non, notre studio est à Longvic, aux portes de Dijon, à environ 1 h 15 d'Avallon par l'A38 et l'A6 (sortie 22). On se déplace dans l'Avallonnais pour les shootings, les réunions importantes et les audits sur place. Le pilotage courant se fait par visio et email." },
  { question: "Pourquoi n'y a-t-il pas d'agence de communication à Avallon ?", answer: "La ville compte environ 6 300 habitants et une intercommunalité de 19 000 : trop petit pour qu'une agence complète s'y installe, assez grand pour que des centaines d'entreprises aient besoin de visibilité. Les prestataires qui se positionnent sur Avallon sont basés à Auxerre, Sens ou Dijon et s'adressent à la ville avec une page générique. C'est précisément ce vide qu'on comble, avec une présence sur place quand il le faut." },
  { question: "Quels types d'entreprises accompagnez-vous dans l'Avallonnais ?", answer: "Gîtes, chambres d'hôtes, hôtels et restaurants qui vivent des visiteurs du Morvan et de Vézelay ; commerces et artisans du centre-ville et des zones d'activité ; professions libérales et services ; entreprises industrielles et logistiques installées près de l'A6. On s'adapte à votre marché." },
  { question: "Combien coûte un site internet pour une entreprise d'Avallon ?", answer: "Le tarif dépend du projet. Le devis est gratuit, détaillé et sans engagement ; un site vitrine sur mesure se situe entre 2 000 et 6 000 € selon les pages, les contenus et les photos. Pour un besoin court, nos offres à prix fixe (landing page en 5 jours, fiche Google optimisée, audit SEO flash) affichent leur prix avant commande." },
  { question: "Le SEO local vaut-il le coup dans une ville de cette taille ?", answer: "Oui, et d'autant plus que peu d'entreprises avallonnaises y investissent. Sur des requêtes comme « plombier Avallon », « restaurant Avallon » ou « gîte Morvan », la concurrence en ligne est faible : une fiche Google complète et un site bien construit suffisent souvent pour apparaître dans le bloc Maps en quelques mois." },
  { question: "Vous gérez aussi les réseaux sociaux ?", answer: "Oui : stratégie éditoriale, création de contenus, publication et reporting. Le calendrier est calé sur la saisonnalité de l'Avallonnais, avec ses pics de fréquentation touristique au printemps et à l'été." },
  { question: "Je n'ai pas encore de site. Par où commencer ?", answer: "Par une fiche Google Business complète et un audit gratuit de votre situation. Ensuite, selon votre activité, une landing page en 5 jours ou un site vitrine. On vous dit honnêtement ce qui a du sens pour votre budget." },
  { question: "Combien de temps pour créer un site ?", answer: "Un site vitrine prend 3 à 5 semaines. Une landing page à prix fixe est en ligne sous 5 jours ouvrés. Le planning est fixé dès le devis." },
]

export default function AgenceAvallonPage() {
  if (!isCityPublished(SLUG)) notFound()

  return (
    <>
      <CityLocalBusinessSchema
        city="Avallon"
        description="Agence de communication pour les PME d'Avallon et de l'Avallonnais : création de site internet, SEO local, fiche Google, photo, vidéo, réseaux sociaux. Studio bourguignon, déplacements sur place."
        slug={SLUG}
        geo={{ lat: 47.49, lng: 3.908 }}
      />
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Avallon", href: `/${SLUG}` }]} />

      <PageHero
        badge="Agence communication Avallon"
        title="Votre agence de communication à Avallon"
        subtitle="Sites internet, SEO local, fiche Google, photo, vidéo et réseaux sociaux pour les PME de l'Avallonnais. Un studio bourguignon complet, à 1 h 15 par l'A6, qui se déplace sur place."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises d'Avallon nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Avallon : une ville active, sans agence de communication sur place</h2>
            <p>
              Avallon est l&apos;une des deux sous-préfectures de l&apos;Yonne, avec 6 305 habitants
              en 2023 et une intercommunalité, Avallon-Vézelay-Morvan, qui en compte près de 19 000.
              Fin 2024, l&apos;INSEE y recense 702 établissements actifs, dont 250 dans le
              commerce, les transports et les services, 110 dans les services spécialisés, 51 dans
              l&apos;industrie et 32 dans la construction. 80 entreprises y ont encore été créées en 2025.
            </p>
            <p>
              Le tissu économique est plus dense que ne le laisse penser la taille de la ville :
              le groupe Schiever, enseigne de grande distribution présente dans tout le
              Nord-Est, a son siège à Avallon ; Pneu Laurent, filiale de Michelin, y rechape des
              pneus poids lourds exportés à 85 %. Autour, des dizaines d&apos;artisans, de commerces,
              de cabinets et d&apos;hébergements touristiques qui, pour la plupart, n&apos;ont
              personne pour s&apos;occuper de leur visibilité.
            </p>
            <p>
              Car c&apos;est le point clé : <strong>aucune agence de communication complète
              n&apos;est installée à Avallon</strong>. Les prestataires qui ciblent la ville sont à
              Auxerre, à Sens ou à Dijon, et lui consacrent une page générique parmi cinquante
              autres villes. Globe Créateur fait le choix inverse : un studio qui connaît
              l&apos;Avallonnais, qui se déplace, et qui réunit toutes les compétences sous un
              même toit.
            </p>

            <h2>Ce qu&apos;on fait pour les entreprises à Avallon</h2>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> -
                Sites vitrines, sites multi-pages, boutiques en ligne, pensés pour Google dès la conception.
              </li>
              <li>
                <Link href="/services/landing-page-5-jours">Landing page en 5 jours</Link> -
                Une page qui présente votre offre et récolte des demandes, à prix fixe.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> -
                Modernisation sans perdre votre référencement.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local</Link> et{" "}
                <Link href="/services/fiche-google-business-optimisee">fiche Google Business optimisée</Link> -
                Bloc Maps, requêtes « métier + Avallon », avis clients.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> -
                Shooting sur place dans l&apos;Avallonnais, vidéo, identité visuelle.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> -
                Réseaux sociaux, calendrier éditorial, reporting mensuel.
              </li>
            </ul>

            <h2>Avallon, carrefour entre l&apos;A6, le Morvan et Vézelay</h2>
            <p>
              L&apos;Avallonnais a une géographie qui dicte sa communication. La sortie 22 de
              l&apos;A6 est à 8 km : la ville capte des automobilistes entre Paris et Lyon, des
              entreprises de transport et de logistique, et une clientèle francilienne à deux
              heures de route. À l&apos;ouest, Vézelay et sa basilique ; au sud, le parc naturel
              régional du Morvan, dont Avallon est l&apos;une des portes d&apos;entrée. Auxerre
              est à 51 km, Dijon à 108.
            </p>
            <p>
              Pour un gîte, un restaurant, une chambre d&apos;hôtes ou un producteur, cela
              signifie deux clientèles qui ne cherchent pas la même chose. Le visiteur du
              week-end tape « gîte Morvan », « restaurant Vézelay », « que faire à Avallon » sur
              son téléphone plusieurs jours avant de partir. L&apos;habitant de l&apos;Avallonnais
              cherche « plombier Avallon », « garage Avallon », « coiffeur Avallon » et regarde
              d&apos;abord le bloc Maps. Un site et une fiche Google construits pour l&apos;un
              seulement laissent l&apos;autre moitié du marché à la concurrence.
            </p>
            <p>
              Notre approche : on identifie d&apos;abord de quelle clientèle vit votre activité,
              puis on bâtit la présence en ligne autour. Pages « métier + ville » et fiche Google
              pour le local ; contenus, photos et pages « séjour » pour le touristique ; les deux
              quand il le faut. Et comme peu d&apos;entreprises de l&apos;Avallonnais publient du
              contenu ancré localement, celles qui le font prennent des positions durables avec
              relativement peu d&apos;efforts.
            </p>

            <h2>Forfaits communication et offres à prix fixe</h2>
            <p>
              Deux façons de travailler ensemble. Les{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link> prennent en charge
              l&apos;ensemble de votre communication, site compris, avec un reporting chaque
              mois. Les <Link href="/tarifs">offres à prix fixe</Link> répondent à un besoin court
              et bien délimité : fiche Google optimisée en 5 jours, audit SEO flash sous 48 h,
              landing page en 5 jours, vectorisation de logo pour vos supports imprimés.
            </p>

            <h2>Les secteurs qu&apos;on accompagne dans l&apos;Avallonnais</h2>
            <ul>
              <li>Hébergement et restauration - Gîtes, chambres d&apos;hôtes, hôtels et restaurants du Morvan et de Vézelay : photos, fiche Google, réservation, réseaux</li>
              <li>Commerces et artisans - Centre-ville d&apos;Avallon et zones commerciales : visibilité locale, bloc Maps, avis</li>
              <li>Artisans du bâtiment - Couvreurs, maçons, chauffagistes du Morvan : site, demandes de devis, SEO « métier + commune »</li>
              <li>Professions libérales et santé - Crédibilité en ligne, prise de rendez-vous, référencement local</li>
              <li>Industrie, transport et logistique - Sites corporate, recrutement, LinkedIn, supports B2B</li>
              <li>Producteurs et circuits courts - Vente en ligne, photos produits, contenus de saison</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      <ContactCard city="Avallon" />

      <Stats stats={stats} />

      <OffresFixesSection />

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

      <CityCrosslinks currentSlug={SLUG} />

      <RelatedBlogPosts title="Conseils communication & SEO local" subtitle="Nos derniers articles pour développer votre visibilité." />

      <CtaSection
        title="Prêt à rendre votre entreprise visible à Avallon ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, réponse sous 24 h ouvrées."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
