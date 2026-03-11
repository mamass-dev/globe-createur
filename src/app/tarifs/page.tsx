import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { PageHero } from "@/components/sections/page-hero"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema, BreadcrumbSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/animate"
import { ContactCard } from "@/components/sections/contact-card"
import { Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Tarifs agence web & communication à Dijon - Prix transparents | Globe Créateur",
  description: "Découvrez nos tarifs : site internet à partir de 2 500 €, forfaits communication dès 890 €/mois. Prix clairs, devis gratuit. Agence web à Dijon pour PME.",
  path: "/tarifs",
})

const projets = [
  {
    type: "Site vitrine",
    price: "2 500 – 4 500",
    unit: "€ HT",
    delai: "3-5 semaines",
    includes: ["Design sur-mesure", "Responsive mobile", "SEO de base intégré", "Formulaire de contact", "Hébergement 1 an offert"],
  },
  {
    type: "Site multi-pages",
    price: "4 500 – 8 000",
    unit: "€ HT",
    delai: "5-8 semaines",
    includes: ["Tout site vitrine +", "Blog intégré", "Pages services détaillées", "SEO avancé", "Intégrations sur-mesure"],
  },
  {
    type: "Refonte de site",
    price: "3 000 – 7 000",
    unit: "€ HT",
    delai: "4-8 semaines",
    includes: ["Audit SEO existant", "Migration sans perte de trafic", "Nouveau design moderne", "Optimisation performance", "Redirections 301"],
  },
  {
    type: "Landing page",
    price: "1 200 – 2 500",
    unit: "€ HT",
    delai: "1-2 semaines",
    includes: ["Design conversion", "A/B testing ready", "Formulaire optimisé", "Tracking analytics", "Mobile-first"],
  },
]

const prestations = [
  { service: "Shooting photo (demi-journée)", price: "650 € HT" },
  { service: "Shooting photo (journée)", price: "950 € HT" },
  { service: "Vidéo corporate (1-2 min)", price: "1 500 – 3 000 € HT" },
  { service: "Vidéo Reels / TikTok (lot de 5)", price: "800 – 1 500 € HT" },
  { service: "Identité visuelle (logo + charte)", price: "1 500 – 3 500 € HT" },
  { service: "Google Business Profile (optimisation)", price: "350 – 650 € HT" },
  { service: "Audit SEO complet", price: "500 – 1 200 € HT" },
  { service: "Automatisation no-code (Make/Zapier)", price: "À partir de 800 € HT" },
]

const faqTarifs = [
  { question: "Pourquoi vos tarifs sont-ils plus accessibles qu'une agence classique ?", answer: "On fonctionne en studio intégré, pas en agence avec 30 salariés et des locaux luxueux. Moins de frais fixes = des tarifs PME. On fait le même travail qu'une grande agence, avec la réactivité en plus." },
  { question: "Les tarifs affichés sont-ils définitifs ?", answer: "Ce sont des fourchettes indicatives. Chaque projet est différent. On vous fournit un devis précis, détaillé et gratuit après avoir compris vos besoins. Pas de surprise, pas de coût caché." },
  { question: "Faut-il payer en une fois ?", answer: "Non. Pour les projets ponctuels : 40 % à la commande, 60 % à la livraison. Pour les forfaits : paiement mensuel par virement. On s'adapte." },
  { question: "Un forfait mensuel est-il plus intéressant qu'un projet ponctuel ?", answer: "Oui, si vous avez besoin d'une communication continue (site + SEO + réseaux + contenu). Le forfait inclut le site internet offert et un accompagnement régulier. Pour un besoin ponctuel (juste un site ou un shooting), le projet suffit." },
  { question: "Le site internet est-il vraiment offert dans les forfaits ?", answer: "Oui. La création d'un site vitrine (valeur 1 500 à 3 000 €) est offerte selon la durée d'engagement : Essentiel 12 mois, Croissance 6 mois, Performance 3 mois. Le site vous appartient, même si vous résiliez." },
  { question: "Combien coûte un accompagnement communication complet ?", answer: "Nos forfaits démarrent à 890 €/mois HT (Essentiel) et vont jusqu'à 2 690 €/mois HT (Performance). C'est 40 à 60 % moins cher qu'un salarié communication (45 000 à 58 000 €/an charges comprises)." },
  { question: "Proposez-vous des tarifs pour les associations ou startups ?", answer: "On étudie chaque situation. Contactez-nous : on peut adapter nos formules selon votre budget et vos objectifs." },
  { question: "Que se passe-t-il après la livraison d'un projet ponctuel ?", answer: "On vous transfère tous les accès. Vous êtes propriétaire de tout. Si vous avez besoin de maintenance ou d'évolutions, on propose des interventions ponctuelles ou un passage en forfait." },
]

export default function TarifsPage() {
  return (
    <>
      <FaqSchema items={faqTarifs} />
      <BreadcrumbSchema items={[
        { name: "Accueil", href: "/" },
        { name: "Tarifs", href: "/tarifs" },
      ]} />

      <Breadcrumb items={[{ name: "Tarifs", href: "/tarifs" }]} />

      <PageHero
        badge="Tarifs transparents"
        title="Des prix clairs, sans surprise"
        subtitle="Projets ponctuels ou accompagnement mensuel : découvrez nos tarifs. Chaque devis est gratuit, détaillé et sans engagement."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Voir les forfaits mensuels"
        secondaryHref="/forfait-communication-pme"
      />

      {/* PROJETS PONCTUELS */}
      <section className="py-16 lg:py-24">
        <Container>
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Projets ponctuels</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Sites internet & projets web</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Un projet défini, un livrable, un prix fixe. Vous savez exactement ce que vous payez.</p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projets.map((projet) => (
              <StaggerItem key={projet.type}>
                <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{projet.type}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{projet.price}</span>
                    <span className="text-sm text-slate-500">{projet.unit}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">Délai : {projet.delai}</p>
                  <ul className="space-y-3">
                    {projet.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* FORFAITS MENSUELS - RENVOI */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <Container>
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Forfaits mensuels</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Votre équipe communication externalisée</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Web, SEO, photo, vidéo, réseaux sociaux : tout inclus dans un forfait mensuel.
                Site internet offert selon engagement. À partir de <strong className="text-indigo-600 dark:text-indigo-400">890 €/mois HT</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {[
                  { name: "Essentiel", price: "890", engagement: "12 mois" },
                  { name: "Croissance", price: "1 490", engagement: "6 mois", popular: true },
                  { name: "Performance", price: "2 690", engagement: "3 mois" },
                ].map((f) => (
                  <div key={f.name} className={`rounded-2xl p-6 border ${f.popular ? "border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 ring-2 ring-indigo-200 dark:ring-indigo-800" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}`}>
                    {f.popular && <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">Le plus populaire</p>}
                    <p className="font-extrabold text-slate-900 dark:text-white">{f.name}</p>
                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{f.price} €<span className="text-sm font-medium text-slate-500">/mois HT</span></p>
                    <p className="text-xs text-slate-400 mt-1">Engagement {f.engagement}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/forfait-communication-pme"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors mt-4"
              >
                Voir le détail des forfaits
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* PRESTATIONS UNITAIRES */}
      <section className="py-16 lg:py-24">
        <Container>
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Prestations à la carte</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Photo, vidéo, SEO et plus</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Besoin d&apos;une prestation ponctuelle ? Voici nos tarifs indicatifs.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
              {prestations.map((p, i) => (
                <div key={p.service} className={`flex items-center justify-between px-6 py-4 ${i < prestations.length - 1 ? "border-b border-slate-100 dark:border-slate-700" : ""}`}>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{p.service}</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap ml-4">{p.price}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* COMPARAISON SALARIÉ vs GLOBE CRÉATEUR */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <Container className="max-w-3xl">
          <AnimateOnScroll>
            <div className="text-center mb-12 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Comparatif</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Salarié vs Globe Créateur</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">Embaucher un chargé de com&apos;</h3>
                <p className="text-2xl lg:text-3xl font-black text-slate-400 mb-4 whitespace-nowrap">45 000 – 58 000 €<span className="text-sm font-medium">/an</span></p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>1 seule compétence</li>
                  <li>Charges sociales, congés, formation</li>
                  <li>Équipement à fournir</li>
                  <li>Risque de turnover</li>
                  <li>Pas de garantie de résultat</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 p-8 ring-2 ring-indigo-200 dark:ring-indigo-800">
                <h3 className="text-lg font-extrabold text-indigo-700 dark:text-indigo-300 mb-4">Globe Créateur (Croissance)</h3>
                <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-4">17 880 €<span className="text-sm font-medium">/an</span></p>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />6 compétences réunies</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />Aucune charge sociale</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />Matériel pro fourni</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />Résiliable, pas de CDI</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />Reporting mensuel</li>
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      <ContactCard />

      <FaqAccordion
        items={faqTarifs}
        title="Questions sur nos tarifs"
        subtitle="Tout ce que vous devez savoir sur nos prix et conditions."
        badge="FAQ"
      />

      <CtaSection
        title="Demandez votre devis gratuit"
        subtitle="On vous répond sous 24h avec un devis détaillé, sans engagement."
        variant="primary"
        ctaLabel="Demander un devis"
        ctaHref="/devis"
      />
    </>
  )
}
