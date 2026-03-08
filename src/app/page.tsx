import { Hero } from "@/components/sections/hero"
import { LogoMarquee } from "@/components/sections/logo-marquee"
import { ServiceGrid } from "@/components/sections/service-grid"
import { Stats } from "@/components/sections/stats"
import { ProcessSteps } from "@/components/sections/process-steps"
import { Testimonials } from "@/components/sections/testimonials"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { services } from "@/lib/data/services"
import { temoignages } from "@/lib/data/temoignages"
import { faqGenerales } from "@/lib/data/faq"

const stats = [
  { value: 47, suffix: "+", label: "Projets livrés" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 12, label: "Mois d'expérience moyenne" },
  { value: 5, label: "Expertises intégrées" },
]

const steps = [
  { number: "01", title: "Audit & Brief", description: "Analyse de votre situation, objectifs et concurrents pour définir la stratégie." },
  { number: "02", title: "Conception", description: "Maquettes UX/UI, arborescence et contenus optimisés SEO." },
  { number: "03", title: "Développement", description: "Intégration sur-mesure, responsive et performante." },
  { number: "04", title: "Lancement & Suivi", description: "Mise en ligne, formation et accompagnement continu." },
]

const clientLogos = [
  { name: "Hôtel Le Bourguignon" },
  { name: "Domaine des Tilleuls" },
  { name: "Atelier Déco SL" },
  { name: "Moreau & Fils BTP" },
  { name: "Vignobles Martin" },
  { name: "Clinic'Auto Dijon" },
  { name: "Boulangerie Parisot" },
  { name: "Cabinet Leroy" },
]

export default function HomePage() {
  return (
    <>
      <FaqSchema items={faqGenerales.slice(0, 5)} />

      {/* 1. ATTENTION — Hero */}
      <Hero
        title="Votre équipe communication externalisée à Dijon"
        subtitle="Web, SEO, photo, vidéo, design, réseaux sociaux : un studio 360° dédié aux PME qui veulent se démarquer sans embaucher."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      {/* 2. CONFIANCE — Social proof */}
      <LogoMarquee
        title="Ils nous font confiance"
        logos={clientLogos}
      />

      {/* 3. INTÉRÊT — Services */}
      <ServiceGrid
        services={services}
        title="Nos services"
        subtitle="Une offre complète pour construire, optimiser et animer votre présence digitale."
        badge="Expertises"
      />

      {/* 4. PREUVE — Chiffres */}
      <Stats stats={stats} />

      {/* 5. RASSURER — Process */}
      <ProcessSteps
        title="Comment ça marche"
        subtitle="Un processus simple et transparent, du brief à la mise en ligne."
        badge="Notre méthode"
        steps={steps}
      />

      {/* 6. DÉSIR — Témoignages */}
      <Testimonials
        items={temoignages}
        title="Ce que disent nos clients"
        subtitle="Des PME de Bourgogne qui nous font confiance."
        badge="Témoignages"
      />

      {/* 7. OBJECTIONS — FAQ */}
      <FaqAccordion
        items={faqGenerales.slice(0, 5)}
        title="Questions fréquentes"
        subtitle="Les réponses aux questions que vous vous posez."
        badge="FAQ"
      />

      {/* 8. ACTION — CTA final */}
      <CtaSection
        title="Prêt à booster votre communication ?"
        subtitle="Discutons de votre projet. Premier échange gratuit et sans engagement."
        variant="primary"
      />
    </>
  )
}
