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
  title: "Agence de communication à Dijon — Studio 360° pour PME | Globe Créateur",
  description: "Agence de communication à Dijon spécialisée PME. Web, SEO local, photo, vidéo, design et réseaux sociaux. Un interlocuteur unique, des résultats mesurables. Studio basé à Longvic.",
  path: "/agence-communication-dijon",
})

const avantages = [
  { title: "Un seul interlocuteur", description: "Fini la coordination entre 4 prestataires. Un seul contact qui gère l'ensemble de votre communication." },
  { title: "Ancrage local", description: "Basés à Longvic (Dijon), on connaît le marché bourguignon, ses codes et son tissu économique." },
  { title: "Résultats mesurables", description: "Reporting mensuel avec des vrais chiffres : trafic, positions Google, demandes de contact, engagement." },
  { title: "Tarifs PME", description: "Des forfaits pensés pour les budgets PME. Pas de surprise, pas de coût caché." },
  { title: "Réactivité", description: "Réponse sous 24h, intervention sous 48h. On n'est pas une agence qui met 2 semaines à répondre à un email." },
  { title: "Vision 360°", description: "Chaque action s'inscrit dans une stratégie globale. Le site, le SEO, les réseaux et le contenu travaillent ensemble." },
]

const steps = [
  { number: "01", title: "Audit gratuit", description: "On analyse votre communication actuelle : site, SEO, réseaux, concurrents. Vous savez où vous en êtes." },
  { number: "02", title: "Stratégie sur-mesure", description: "On construit un plan d'action adapté à vos objectifs, votre secteur et votre budget." },
  { number: "03", title: "Production & lancement", description: "Site, contenus, visuels : on produit tout en interne et on lance avec votre validation." },
  { number: "04", title: "Pilotage continu", description: "Gestion des réseaux, SEO, mises à jour. Reporting mensuel et ajustements." },
]

const stats = [
  { value: 47, suffix: "+", label: "Projets livrés en Bourgogne" },
  { value: 5, label: "Expertises intégrées" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 1, label: "Interlocuteur unique" },
]

const faqAgence = [
  { question: "Quelle est la différence entre Globe Créateur et une agence de communication classique ?", answer: "Une agence classique a souvent des équipes séparées (un graphiste, un développeur, un rédacteur) avec un chef de projet qui coordonne. Chez Globe Créateur, c'est un studio intégré : un interlocuteur unique qui maîtrise l'ensemble de la chaîne. Moins d'intermédiaires, plus de cohérence, des coûts réduits." },
  { question: "Travaillez-vous uniquement avec des entreprises dijonnaises ?", answer: "Non. Notre studio est à Longvic, aux portes de Dijon, mais nous accompagnons des entreprises dans toute la Bourgogne-Franche-Comté : Beaune, Chalon-sur-Saône, Auxerre, Besançon. Nous nous déplaçons pour les shootings photo et les réunions, et le pilotage se fait à distance." },
  { question: "Quels types d'entreprises accompagnez-vous ?", answer: "Des PME de 2 à 50 salariés, des indépendants et des professions libérales. Nos clients types : hôtels, restaurants, commerces, artisans, cabinets (avocats, comptables, architectes), PME de services, lieux événementiels." },
  { question: "Combien coûte un accompagnement communication ?", answer: "Nos forfaits communication démarrent à 990 €/mois HT (forfait Essentiel). Pour un projet ponctuel (site internet, shooting photo), les tarifs dépendent du scope. Dans tous les cas, le devis est gratuit, détaillé et sans engagement." },
  { question: "Je n'ai pas de site internet. Par où commencer ?", answer: "Par un audit gratuit. On regarde votre situation actuelle (même si c'est zéro) et on vous recommande la meilleure approche. Pour la plupart des PME, on commence par un site internet optimisé SEO + une fiche Google Business Profile. C'est la base." },
  { question: "Combien de temps pour avoir un site internet ?", answer: "Un site vitrine prend 3 à 5 semaines de la maquette à la mise en ligne. Un site plus complexe (multi-pages, blog, fonctionnalités sur-mesure) peut prendre 6 à 10 semaines. On vous donne un planning précis dès le devis." },
  { question: "Vous faites aussi l'impression (flyers, cartes de visite) ?", answer: "On crée les visuels (design, mise en page) mais on ne gère pas l'impression. En revanche, on travaille avec des imprimeurs locaux de confiance et on peut vous recommander le bon partenaire." },
  { question: "Comment savoir si j'ai besoin d'une agence ou d'un freelance ?", answer: "Si vous avez besoin d'une seule compétence (juste un logo, juste des photos), un freelance peut suffire. Si vous avez besoin d'une communication cohérente et continue (site + SEO + réseaux + contenu), un studio intégré comme Globe Créateur est plus efficace et souvent moins cher que 4 freelances." },
]

export default function AgencePage() {
  return (
    <>
      <FaqSchema items={faqAgence} />

      {/* 1. NAVIGATION */}
      <Breadcrumb items={[{ name: "Agence communication Dijon", href: "/agence-communication-dijon" }]} />

      {/* 2. HERO */}
      <PageHero
        badge="Agence communication Dijon"
        title="Votre agence de communication à Dijon, en version studio"
        subtitle="Web, SEO, photo, vidéo, design, réseaux sociaux — un studio intégré dédié aux PME qui veulent se démarquer. Basé à Longvic, on intervient dans toute la Bourgogne."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      {/* 3. AVANTAGES */}
      <BenefitsGrid
        title="Pourquoi les PME dijonnaises nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      {/* 4. CONTENU SEO */}
      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication pensée pour les PME</h2>
            <p>
              Les grandes entreprises ont des directions communication avec 10 personnes.
              Les PME de Dijon ont un dirigeant qui fait tout — y compris la com&apos;,
              le soir, quand il a le temps. C&apos;est-à-dire jamais.
            </p>
            <p>
              Globe Créateur comble ce vide. On fonctionne comme votre{" "}
              <strong>équipe communication externalisée</strong> : on gère votre site,
              votre référencement, vos réseaux sociaux, vos photos et vos visuels.
              Un seul interlocuteur — Axel Masson — qui coordonne l&apos;ensemble et
              vous rend des comptes chaque mois.
            </p>

            <h2>Ce qu&apos;on fait pour nos clients à Dijon</h2>
            <p>Concrètement, voici les compétences qu&apos;on réunit :</p>
            <ul>
              <li>
                <Link href="/services/creation-site-internet-dijon">Création de sites internet</Link> —
                Sites vitrines, landing pages, sites multi-pages. Sur-mesure, pas de template WordPress.
              </li>
              <li>
                <Link href="/services/refonte-site-internet-dijon">Refonte de sites existants</Link> —
                Modernisation sans perte de référencement. Migration WordPress → Next.js.
              </li>
              <li>
                <Link href="/services/seo-local-dijon">SEO local</Link> —
                Google Business Profile, référencement local, Pack Local, avis clients.
              </li>
              <li>
                <Link href="/services/creation-contenu-pme">Photo, vidéo et design</Link> —
                Shooting sur place, production vidéo, identité visuelle, visuels réseaux sociaux.
              </li>
              <li>
                <Link href="/services/support-communication-pme">Pilotage communication</Link> —
                Réseaux sociaux, planning éditorial, reporting mensuel.
              </li>
              <li>
                <Link href="/services/automatisation-nocode-dijon">Automatisation no-code</Link> —
                Make, Airtable, Notion pour automatiser vos tâches répétitives.
              </li>
            </ul>

            <h2>Pourquoi une agence locale fait la différence</h2>
            <p>
              Vous pouvez trouver une agence web à Paris pour 3 fois moins cher.
              Mais elle ne viendra pas shooter vos locaux un mardi matin. Elle ne
              connaîtra pas la saisonnalité du marché bourguignon. Elle ne comprendra
              pas que votre client type, c&apos;est le cadre dijonnais qui cherche un
              restaurant pour son anniversaire de mariage, pas un persona marketing
              fictif dans un PowerPoint.
            </p>
            <p>
              <strong>Notre ancrage local est un avantage concurrentiel.</strong>{" "}
              On connaît Dijon, Beaune, la Côte-d&apos;Or. On se déplace chez vous.
              On comprend votre marché parce qu&apos;on y vit.
            </p>

            <h2>Le modèle forfait : votre communication au mois</h2>
            <p>
              Plutôt qu&apos;un projet ponctuel livré et oublié, on propose des{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link> qui
              incluent l&apos;ensemble de votre communication. Le site internet est souvent
              inclus dans le forfait — pas besoin de payer un projet à part.
            </p>
            <p>
              Trois formules à partir de 990 €/mois HT. Un investissement prévisible
              dans une communication qui travaille pour vous chaque jour.
            </p>

            <h2>Les secteurs qu&apos;on connaît bien</h2>
            <p>
              On travaille avec des PME de tous secteurs, mais on a développé une
              expertise particulière pour :
            </p>
            <ul>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et hébergements</Link> — Sites immersifs, réservation directe, SEO local hôtelier</li>
              <li><Link href="/secteurs/lieux-evenementiels">Lieux événementiels</Link> — Valorisation visuelle, formulaire de demande, galeries photo</li>
              <li>Restaurants et bars — Photos appétissantes, Google Business, réseaux sociaux</li>
              <li>Commerces et artisans — Visibilité locale, fiche Google, site vitrine</li>
              <li>Professions libérales — Crédibilité en ligne, référencement, prise de rendez-vous</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* 5. CHIFFRES */}
      <Stats stats={stats} />

      {/* 6. SERVICES */}
      <ServiceGrid
        services={services}
        title="Nos expertises"
        subtitle="Tout ce dont votre communication a besoin, sous un même toit."
        badge="Services"
      />

      {/* 7. PROCESS */}
      <ProcessSteps
        title="Comment ça se passe"
        subtitle="De l'audit initial au pilotage continu, un process transparent."
        badge="Notre méthode"
        steps={steps}
      />

      {/* 8. TÉMOIGNAGES */}
      <Testimonials
        items={temoignages}
        title="Ils nous font confiance à Dijon"
        badge="Témoignages"
      />

      {/* 9. FAQ */}
      <FaqAccordion
        items={faqAgence}
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir avant de nous contacter."
        badge="FAQ"
      />

      {/* 10. CTA */}
      <CtaSection
        title="Prêt à professionnaliser votre communication ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
