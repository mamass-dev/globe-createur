import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { PageHero } from "@/components/sections/page-hero"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { ProcessSteps } from "@/components/sections/process-steps"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema, BreadcrumbSchema, ServiceSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { ContactCard } from "@/components/sections/contact-card"

export const metadata: Metadata = buildMetadata({
  title: "Google Business Profile à Dijon - Optimisation fiche Google | Globe Créateur",
  description: "Optimisation de votre fiche Google Business Profile à Dijon. Apparaissez dans le Pack Local, Google Maps et attirez des clients locaux. Audit gratuit de votre fiche.",
  path: "/google-business-profile-dijon",
})

const avantages = [
  { title: "Pack Local Google", description: "Apparaissez dans les 3 résultats Google Maps qui captent 44 % des clics sur les recherches locales." },
  { title: "Visibilité immédiate", description: "Contrairement au SEO classique (3-6 mois), une fiche optimisée peut générer des appels dès la première semaine." },
  { title: "Avis clients", description: "On met en place une stratégie d'avis pour construire votre réputation en ligne et rassurer vos prospects." },
  { title: "Photos professionnelles", description: "Les fiches avec photos reçoivent 42 % de demandes d'itinéraire en plus. On s'occupe du shooting." },
  { title: "Posts & actualités", description: "Publications régulières sur votre fiche pour montrer que votre entreprise est active et à jour." },
  { title: "Statistiques détaillées", description: "On suit les appels, les demandes d'itinéraire, les visites site et on optimise en continu." },
]

const steps = [
  { number: "01", title: "Audit de votre fiche", description: "On analyse votre fiche actuelle (ou on la crée si elle n'existe pas) : catégories, description, photos, avis, horaires." },
  { number: "02", title: "Optimisation complète", description: "On renseigne toutes les informations : attributs, services, zone de chalandise, photos pro, description optimisée SEO." },
  { number: "03", title: "Stratégie d'avis", description: "On met en place un process simple pour collecter des avis authentiques de vos clients satisfaits." },
  { number: "04", title: "Pilotage mensuel", description: "Publications régulières, réponses aux avis, suivi des statistiques, ajustements pour maintenir vos positions." },
]

const faqGBP = [
  { question: "C'est quoi Google Business Profile ?", answer: "C'est la fiche gratuite de votre entreprise sur Google. Elle apparaît dans Google Maps et dans les résultats de recherche locale (le \"Pack Local\" avec les 3 résultats et la carte). C'est souvent le premier point de contact entre vous et vos clients." },
  { question: "Ma fiche Google est déjà créée, pourquoi l'optimiser ?", answer: "90 % des fiches sont mal remplies : mauvaise catégorie, description vide, pas de photos, pas de posts, avis sans réponse. Une fiche optimisée peut multiplier par 3 à 5 vos appels et demandes d'itinéraire." },
  { question: "Combien de temps pour apparaître dans le Pack Local ?", answer: "Ça dépend de la concurrence sur votre secteur et votre ville. En général, les premiers résultats sont visibles en 2 à 4 semaines après optimisation. Pour des secteurs très concurrencés (restaurants, plombiers), ça peut prendre 1 à 3 mois." },
  { question: "Combien coûte l'optimisation d'une fiche Google ?", answer: "L'optimisation ponctuelle d'une fiche coûte entre 350 et 650 € HT selon la complexité. Le pilotage mensuel est inclus dans nos forfaits communication. Un devis gratuit est disponible sur demande." },
  { question: "Pouvez-vous gérer les faux avis ou avis négatifs ?", answer: "Oui. On vous aide à signaler les faux avis à Google et on rédige des réponses professionnelles aux avis négatifs. Une bonne gestion des avis négatifs peut même renforcer la confiance des prospects." },
  { question: "Est-ce que ça remplace le SEO de mon site ?", answer: "Non, c'est complémentaire. Le SEO de votre site vous positionne dans les résultats organiques. Google Business Profile vous positionne dans le Pack Local et Google Maps. L'idéal est de travailler les deux." },
  { question: "Je n'ai pas de locaux physiques ouverts au public, c'est utile ?", answer: "Oui. Google Business Profile propose un mode \"zone de chalandise\" pour les entreprises qui se déplacent chez leurs clients (artisans, plombiers, consultants). Vous apparaissez dans les recherches locales sans afficher d'adresse." },
  { question: "Vous intervenez uniquement à Dijon ?", answer: "Non. On optimise les fiches Google d'entreprises dans toute la Bourgogne : Dijon, Beaune, Chalon-sur-Saône, Auxerre, Besançon. Les techniques sont les mêmes, on les adapte à votre zone géographique." },
]

export default function GoogleBusinessProfilePage() {
  return (
    <>
      <FaqSchema items={faqGBP} />
      <BreadcrumbSchema items={[
        { name: "Accueil", href: "/" },
        { name: "Google Business Profile Dijon", href: "/google-business-profile-dijon" },
      ]} />
      <ServiceSchema
        name="Optimisation Google Business Profile"
        description="Optimisation et gestion de votre fiche Google Business Profile pour apparaître dans le Pack Local et Google Maps à Dijon."
        url="/google-business-profile-dijon"
      />

      <Breadcrumb items={[{ name: "Google Business Profile Dijon", href: "/google-business-profile-dijon" }]} />

      <PageHero
        badge="Google Business Profile"
        title="Dominez Google Maps à Dijon"
        subtitle="Votre fiche Google est souvent le premier contact avec vos clients. On l'optimise pour que vous apparaissiez en haut du Pack Local et que votre téléphone sonne."
        ctaLabel="Audit gratuit de votre fiche"
        ctaHref="/devis"
        secondaryLabel="Voir nos services SEO"
        secondaryHref="/services/seo-local-dijon"
      />

      <BenefitsGrid
        title="Pourquoi optimiser votre fiche Google"
        badge="Avantages"
        benefits={avantages}
      />

      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Google Business Profile : le levier SEO local n°1</h2>
            <p>
              46 % des recherches Google ont une intention locale. Quand un dijonnais
              tape &quot;restaurant japonais Dijon&quot; ou &quot;plombier près de moi&quot;,
              Google affiche d&apos;abord le <strong>Pack Local</strong> : 3 fiches avec
              carte, avis, horaires et bouton d&apos;appel. Si vous n&apos;y êtes pas,
              vous êtes invisible.
            </p>
            <p>
              Pourtant, la majorité des PME dijonnaises ont une fiche Google incomplète
              ou non optimisée. Mauvaise catégorie, zéro photo, description vide,
              avis sans réponse. C&apos;est une opportunité perdue chaque jour.
            </p>

            <h2>Ce qu&apos;on optimise sur votre fiche Google</h2>
            <ul>
              <li><strong>Catégories</strong> - La catégorie principale détermine dans quelles recherches vous apparaissez. On choisit les plus pertinentes.</li>
              <li><strong>Description</strong> - 750 caractères optimisés avec vos mots-clés locaux et votre proposition de valeur.</li>
              <li><strong>Photos professionnelles</strong> - Façade, intérieur, équipe, produits. Les fiches avec 100+ photos reçoivent 520 % d&apos;appels en plus.</li>
              <li><strong>Attributs et services</strong> - Wi-Fi, accessibilité, paiement, horaires spéciaux : chaque détail compte.</li>
              <li><strong>Zone de chalandise</strong> - Définir précisément les villes et quartiers que vous desservez.</li>
              <li><strong>Posts réguliers</strong> - Actualités, offres, événements : Google valorise les fiches actives.</li>
            </ul>

            <h2>La stratégie d&apos;avis qui fait la différence</h2>
            <p>
              Les avis sont le facteur n°1 de classement dans le Pack Local.
              Mais demander des avis ne suffit pas : il faut un <strong>process
              systématique</strong> intégré à votre parcours client.
            </p>
            <p>
              On met en place un système simple (QR code, SMS automatique, email
              post-prestation) qui génère des avis réguliers sans effort de votre
              part. Et on répond à chaque avis — positif comme négatif — de
              manière professionnelle.
            </p>

            <h2>Google Business Profile + site internet : le combo gagnant</h2>
            <p>
              Votre fiche Google renvoie vers votre site. Si votre site est lent,
              pas adapté mobile ou vide de contenu, Google le sait et pénalise
              votre classement. C&apos;est pourquoi on travaille les deux ensemble :
            </p>
            <ul>
              <li><Link href="/services/creation-site-internet-dijon">Site internet optimisé</Link> qui renforce la crédibilité de votre fiche</li>
              <li><Link href="/services/seo-local-dijon">SEO local</Link> qui booste vos positions organiques ET votre fiche Google</li>
              <li><Link href="/services/creation-contenu-pme">Photos et vidéos professionnelles</Link> utilisées sur la fiche et le site</li>
            </ul>

            <h2>Pour qui ?</h2>
            <p>
              Toute entreprise locale qui reçoit des clients ou se déplace chez
              eux. Nos clients types :
            </p>
            <ul>
              <li><Link href="/secteurs/restaurants-food">Restaurants et bars</Link></li>
              <li><Link href="/secteurs/hotels-lieux-evenementiels">Hôtels et hébergements</Link></li>
              <li><Link href="/secteurs/artisans-btp">Artisans et BTP</Link></li>
              <li><Link href="/secteurs/professions-liberales">Professions libérales</Link></li>
              <li>Commerces, instituts de beauté, garages, salles de sport...</li>
            </ul>
          </div>
        </AnimateOnScroll>
      </Container>

      <ProcessSteps
        title="Notre méthode en 4 étapes"
        subtitle="De l'audit à la gestion continue, on s'occupe de tout."
        badge="Process"
        steps={steps}
      />

      <ContactCard city="Dijon" />

      <FaqAccordion
        items={faqGBP}
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir sur Google Business Profile."
        badge="FAQ"
      />

      <CtaSection
        title="Faites auditer votre fiche Google gratuitement"
        subtitle="On analyse votre fiche et on vous dit exactement quoi améliorer. Sans engagement."
        variant="primary"
        ctaLabel="Demander un audit gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
