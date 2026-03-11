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
  title: "Agence de communication à Auxerre - Studio Digital PME | Globe Créateur",
  description: "Agence de communication à Auxerre spécialisée PME. Sites web, SEO local, photo, vidéo et réseaux sociaux pour les entreprises auxerroises. Studio basé en Bourgogne.",
  path: "/agence-communication-auxerre",
})

const avantages = [
  { title: "Intervention à Auxerre", description: "On se déplace dans l'Yonne pour les shootings, les réunions et les audits. Le pilotage courant se fait à distance." },
  { title: "Connaissance de l'Yonne", description: "On connaît le marché icaunais, ses spécificités et les opportunités SEO peu exploitées dans le département." },
  { title: "Un seul interlocuteur", description: "Fini la coordination entre 4 prestataires. Un contact unique qui gère l'ensemble de votre communication." },
  { title: "Résultats mesurables", description: "Reporting mensuel avec des vrais chiffres : trafic, positions Google, demandes de contact, engagement." },
  { title: "Tarifs PME", description: "Des forfaits pensés pour les budgets PME. Pas de surprise, pas de coût caché." },
  { title: "Vision 360°", description: "Site, SEO, réseaux et contenu travaillent ensemble dans une stratégie cohérente pour votre entreprise." },
]

const steps = [
  { number: "01", title: "Audit gratuit", description: "On analyse votre communication actuelle : site, SEO, réseaux, concurrents sur le marché auxerrois." },
  { number: "02", title: "Stratégie sur-mesure", description: "On construit un plan d'action adapté à vos objectifs et au bassin économique d'Auxerre et de l'Yonne." },
  { number: "03", title: "Production & lancement", description: "Site, contenus, visuels : on produit tout en interne et on lance avec votre validation." },
  { number: "04", title: "Pilotage continu", description: "Gestion des réseaux, SEO, mises à jour. Reporting mensuel et ajustements." },
]

const stats = [
  { value: 110, suffix: "+", label: "Projets réalisés" },
  { value: 30, suffix: "+", label: "PME accompagnées" },
  { value: 97, suffix: "%", label: "Clients satisfaits" },
  { value: 1, suffix: "h30", label: "D'Auxerre" },
]

const faqAgence = [
  { question: "Êtes-vous basés à Auxerre ?", answer: "Notre studio est à Longvic, aux portes de Dijon, à environ 1h30 d'Auxerre. On se déplace dans l'Yonne pour les shootings et les réunions importantes. Le pilotage courant (stratégie, reporting, ajustements) se fait par visio et email, ce qui fonctionne très bien." },
  { question: "Pourquoi choisir une agence dijonnaise plutôt qu'une agence locale ?", answer: "Auxerre compte très peu d'agences de communication complètes. La plupart des prestataires locaux sont des freelances spécialisés dans un seul domaine. Globe Créateur réunit toutes les compétences (web, SEO, photo, vidéo, design, réseaux) avec un seul interlocuteur, pour une communication cohérente." },
  { question: "Combien coûte un site internet pour une entreprise à Auxerre ?", answer: "Un site vitrine professionnel démarre à partir de 2 500 € HT. Pour un site plus complet, comptez 4 000 à 8 000 € HT. Le devis est gratuit et détaillé. Nos forfaits mensuels (à partir de 890 €/mois) peuvent inclure le site." },
  { question: "Quel intérêt d'investir dans le SEO local à Auxerre ?", answer: "La concurrence en ligne sur Auxerre est très faible. Peu d'entreprises locales font du SEO. C'est une opportunité : avec un site optimisé et un bon référencement local, vous pouvez dominer les résultats Google sur vos mots-clés en quelques mois, là où à Paris ça prendrait des années." },
  { question: "Vous gérez aussi les réseaux sociaux ?", answer: "Oui. Stratégie éditoriale, création de contenus, publication et reporting. On adapte le calendrier aux événements locaux et à la saisonnalité de votre activité." },
  { question: "Je n'ai pas de site internet. Par où commencer ?", answer: "Par un audit gratuit. On analyse votre situation et on recommande la meilleure approche. Un site optimisé SEO + une fiche Google Business Profile est généralement la base pour toute PME auxerroise." },
  { question: "Combien de temps pour créer un site ?", answer: "Un site vitrine prend 3 à 5 semaines. Un site plus complexe peut prendre 6 à 10 semaines. Planning précis dès le devis." },
  { question: "Quels secteurs accompagnez-vous dans l'Yonne ?", answer: "Tous les secteurs PME : commerces, artisans, professions libérales, restaurants, hôtels, prestataires de services, entreprises industrielles. On s'adapte à votre marché et à vos objectifs." },
]

export default function AgenceAuxerrePage() {
  return (
    <>
      <FaqSchema items={faqAgence} />

      <Breadcrumb items={[{ name: "Agence communication Auxerre", href: "/agence-communication-auxerre" }]} />

      <PageHero
        badge="Agence communication Auxerre"
        title="Votre agence de communication à Auxerre"
        subtitle="Sites web, SEO local, photo, vidéo et réseaux sociaux pour les PME auxerroises. Un studio intégré bourguignon au service de votre visibilité."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      <BenefitsGrid
        title="Pourquoi les entreprises d'Auxerre nous choisissent"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Une agence de communication pour les PME d&apos;Auxerre</h2>
            <p>
              Auxerre est la préfecture de l&apos;Yonne, avec un centre historique
              remarquable, un vignoble réputé (Chablis, Irancy) et un tissu
              économique diversifié. Mais côté digital, beaucoup d&apos;entreprises
              auxerroises sont encore en retard : sites obsolètes, pas de SEO,
              réseaux sociaux inexistants.
            </p>
            <p>
              Globe Créateur comble ce vide. On fonctionne comme votre{" "}
              <strong>équipe communication externalisée</strong> : on gère votre
              site, votre référencement, vos réseaux sociaux, vos photos et vos
              visuels. Un seul interlocuteur qui coordonne l&apos;ensemble.
            </p>

            <h2>Ce qu&apos;on fait pour les entreprises à Auxerre</h2>
            <p>Nos compétences réunies sous un même toit :</p>
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
                Google Business Profile, référencement &quot;Auxerre&quot;, Pack Local, avis clients.
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

            <h2>Auxerre : un territoire SEO sous-exploité</h2>
            <p>
              C&apos;est le principal avantage des PME auxerroises : la concurrence
              SEO est quasi inexistante. Très peu d&apos;entreprises de l&apos;Yonne
              investissent dans le référencement local. Résultat : avec un site
              moderne et un SEO bien travaillé, vous pouvez atteindre le top 3
              Google en quelques mois sur vos mots-clés stratégiques.
            </p>
            <p>
              On cible les recherches locales : &quot;restaurant Auxerre&quot;,
              &quot;architecte Yonne&quot;, &quot;comptable Auxerre&quot;...
              Chaque requête est un client potentiel qui vous cherche.
            </p>

            <h2>Forfaits communication pour les PME de l&apos;Yonne</h2>
            <p>
              Plutôt qu&apos;un projet ponctuel livré et oublié, on propose des{" "}
              <Link href="/forfait-communication-pme">forfaits mensuels</Link> qui
              incluent l&apos;ensemble de votre communication. Le site internet
              est souvent inclus.
            </p>
            <p>
              Trois formules à partir de 890 €/mois HT. Un investissement
              prévisible dans une communication professionnelle et continue.
            </p>

            <h2>Les secteurs qu&apos;on accompagne dans l&apos;Yonne</h2>
            <p>
              On travaille avec des PME de tous secteurs dans le département :
            </p>
            <ul>
              <li>Vignoble Chablisien - Sites de domaines, vente en ligne, dégustations, tourisme viticole</li>
              <li>Commerces et artisans - Centre-ville d&apos;Auxerre, Sens, Joigny : visibilité locale</li>
              <li>Restaurants et hôtels - Photos, Google Business, réseaux sociaux, réservation</li>
              <li>Professions libérales - Crédibilité en ligne, SEO, prise de rendez-vous</li>
              <li>Entreprises industrielles et B2B - Sites corporate, plaquettes digitales, LinkedIn</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

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
        title="Prêt à booster votre communication à Auxerre ?"
        subtitle="Audit gratuit de votre présence en ligne. Sans engagement, sous 48h."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
