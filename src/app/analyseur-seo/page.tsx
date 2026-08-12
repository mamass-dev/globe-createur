import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { SeoAnalyzer } from "@/components/tools/seo-analyzer"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Search, Shield, Zap, BarChart3 } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Analyse SEO gratuite — Score sur 100 en 5 secondes | Globe Créateur",
  description:
    "Audit SEO gratuit en ligne : score sur 100, 13+ critères vérifiés (title, meta, H1, HTTPS, données structurées), recommandations concrètes. Sans inscription, sans email, résultat immédiat. Testez votre site maintenant.",
  path: "/analyseur-seo",
  keywords: ["analyse SEO", "analyse SEO gratuite", "analyse SEO en ligne", "analyseur SEO", "analyseur SEO gratuit", "audit SEO gratuit", "audit SEO en ligne", "test SEO en ligne", "test SEO site", "score SEO", "outil SEO gratuit", "diagnostic SEO", "vérifier SEO site", "analyser SEO site"],
})

const faqItems = [
  {
    question: "L'analyse SEO est-elle vraiment gratuite ?",
    answer:
      "Oui, 100 % gratuite. Entrez votre URL et obtenez instantanément votre score SEO avec des recommandations concrètes.",
  },
  {
    question: "Quels critères sont analysés ?",
    answer:
      "L'outil vérifie 13+ critères répartis en 4 catégories : contenu (title, meta, headings, images), technique (HTTPS, canonical, viewport, données structurées), réseaux sociaux (Open Graph, Twitter Card) et performance (si disponible).",
  },
  {
    question: "Les résultats sont-ils fiables ?",
    answer:
      "L'analyseur donne un aperçu rapide des points clés du SEO on-page. Pour un audit technique complet (crawl profond, analyse des backlinks, positions), un audit professionnel par notre équipe est recommandé.",
  },
  {
    question: "Comment améliorer mon score SEO ?",
    answer:
      "Chaque critère est accompagné d'une recommandation actionnable. Commencez par corriger les erreurs (en rouge), puis les avertissements (en orange). Les optimisations les plus impactantes : balise title, meta description, H1 unique et HTTPS.",
  },
  {
    question: "Puis-je analyser le site d'un concurrent ?",
    answer:
      "Oui ! L'outil analyse n'importe quelle URL publique. C'est un excellent moyen de comparer votre site avec ceux de vos concurrents.",
  },
  {
    question: "À quelle fréquence faut-il refaire une analyse SEO ?",
    answer:
      "Après chaque modification importante de votre site (refonte, nouvelle page, changement de titles), puis un contrôle trimestriel. Un score peut se dégrader sans que vous le sachiez : une mise à jour de thème ou de plugin peut casser une balise ou introduire un noindex.",
  },
  {
    question: "Un bon score SEO garantit-il d'être premier sur Google ?",
    answer:
      "Non. Le score mesure vos fondations techniques on-page. Le classement dépend aussi de la qualité de votre contenu, de votre notoriété (backlinks, avis) et de la concurrence sur vos mots-clés. Un bon score est nécessaire, pas suffisant : c'est le billet d'entrée dans la course.",
  },
]

const features = [
  { icon: Search, label: "13+ critères", desc: "Analyse complète" },
  { icon: Shield, label: "Instantané", desc: "Résultats en secondes" },
  { icon: Zap, label: "Actionnable", desc: "Recommandations précises" },
]

export default function AnalyseurSeoPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[{ name: "Analyseur SEO", href: "/analyseur-seo" }]}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-semibold mb-6">
            <BarChart3 className="h-4 w-4" />
            Outil gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Analysez le{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">SEO</span>{" "}
            de votre site
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Entrez votre URL et obtenez un diagnostic SEO complet en quelques secondes.
            Score, erreurs et recommandations personnalisées.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <f.icon className="h-4 w-4 text-green-500" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{f.label}</p>
                  <p className="text-[11px] text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Analyzer */}
      <Container className="py-12 lg:py-20">
        <SeoAnalyzer />
      </Container>

      {/* Contenu éditorial */}
      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Que vérifie exactement cette analyse SEO ?</h2>
            <p>
              L&apos;outil télécharge votre page comme le ferait Googlebot, puis passe
              en revue <strong>13 critères on-page</strong> répartis en quatre familles.
              Ce sont les fondations : si elles sont mal posées, aucun contenu, aussi
              bon soit-il, ne se positionnera correctement.
            </p>
            <h3>Contenu</h3>
            <ul>
              <li><strong>Balise title</strong> - C&apos;est le lien bleu affiché dans Google. Elle doit exister, faire 30 à 60 caractères et contenir votre mot-clé principal.</li>
              <li><strong>Meta description</strong> - Elle n&apos;influence pas directement le classement, mais c&apos;est elle qui donne (ou non) envie de cliquer. 120 à 160 caractères.</li>
              <li><strong>Balise H1</strong> - Le titre principal de la page. Il doit être unique : plusieurs H1 diluent le sujet aux yeux de Google.</li>
              <li><strong>Structure H2-H3</strong> - Une hiérarchie de titres claire aide Google à comprendre l&apos;organisation de votre contenu.</li>
              <li><strong>Attributs alt des images</strong> - Chaque image doit être décrite : c&apos;est essentiel pour l&apos;accessibilité et pour Google Images.</li>
            </ul>
            <h3>Technique</h3>
            <ul>
              <li><strong>HTTPS</strong> - Un site non sécurisé est pénalisé par Google et affiche un avertissement dans le navigateur.</li>
              <li><strong>URL canonique</strong> - Elle indique à Google la version de référence de la page et évite le contenu dupliqué.</li>
              <li><strong>Attribut lang</strong> - Il précise la langue de la page, indispensable pour être bien classé sur les recherches en français.</li>
              <li><strong>Meta viewport</strong> - Sans elle, votre site s&apos;affiche mal sur mobile. Or Google indexe d&apos;abord la version mobile.</li>
              <li><strong>Meta robots</strong> - Une balise noindex oubliée peut rendre une page totalement invisible dans Google. Ça arrive plus souvent qu&apos;on ne le croit, notamment après une refonte.</li>
              <li><strong>Données structurées (JSON-LD)</strong> - Elles permettent d&apos;obtenir des résultats enrichis : étoiles d&apos;avis, FAQ dépliée, fil d&apos;Ariane.</li>
            </ul>
            <h3>Réseaux sociaux</h3>
            <ul>
              <li><strong>Open Graph</strong> - Ces balises contrôlent l&apos;aperçu de votre page quand elle est partagée sur Facebook, LinkedIn ou WhatsApp.</li>
              <li><strong>Twitter Card</strong> - L&apos;équivalent pour X/Twitter.</li>
            </ul>
            <p>
              Quand c&apos;est possible, l&apos;outil interroge aussi{" "}
              <strong>Google PageSpeed Insights</strong> pour ajouter deux scores de
              performance mobile à l&apos;analyse.
            </p>

            <h2>Comment interpréter votre score SEO</h2>
            <p>
              Le score sur 100 pondère chaque critère selon son impact réel.
              En pratique : <strong>au-dessus de 85</strong>, vos fondations sont saines
              et le levier suivant est le contenu et la notoriété. <strong>Entre 60 et 85</strong>,
              des corrections simples (title, meta description, H1) peuvent débloquer
              des positions rapidement. <strong>En dessous de 60</strong>, votre site
              part avec un handicap technique face à ses concurrents, et c&apos;est
              généralement le signe d&apos;un site vieillissant ou mal construit.
            </p>
            <p>
              Un bon réflexe : analysez aussi <strong>deux ou trois concurrents</strong> qui
              vous devancent sur Google. Si leur score est nettement supérieur au vôtre,
              vous savez pourquoi ils sont devant, et ce qu&apos;il faut corriger.
            </p>

            <h2>Par où commencer pour améliorer votre référencement</h2>
            <p>
              Corrigez dans cet ordre : d&apos;abord les <strong>erreurs bloquantes</strong>{" "}
              (noindex accidentel, absence de HTTPS, pas de title), puis les{" "}
              <strong>éléments de visibilité</strong> (title et meta description bien
              rédigés, H1 clair), enfin les <strong>optimisations de confort</strong>{" "}
              (données structurées, Open Graph). Les premières se corrigent en minutes
              et peuvent avoir un effet spectaculaire ; les dernières affinent des
              fondations déjà saines.
            </p>

            <h2>Les limites d&apos;une analyse SEO automatique</h2>
            <p>
              Cet outil vérifie ce qui est mesurable instantanément sur une page. Il ne
              voit ni vos <strong>positions Google réelles</strong>, ni vos{" "}
              <strong>backlinks</strong>, ni la <strong>qualité de votre contenu</strong> face
              à la concurrence, ni les problèmes de crawl à l&apos;échelle du site. C&apos;est
              la différence entre prendre sa température et passer un bilan complet. Pour
              aller plus loin, notre <Link href="/services/seo-local-dijon">accompagnement SEO local</Link>{" "}
              inclut un audit complet de votre site, et notre{" "}
              <a href="/audit-digital">audit digital gratuit</a> évalue l&apos;ensemble de
              votre présence en ligne en 2 minutes.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fréquentes"
        badge="FAQ"
      />

      <CtaSection
        title="Un audit SEO plus poussé ?"
        subtitle="Nos experts analysent votre site en profondeur : crawl technique, backlinks, positions et plan d'action."
        ctaLabel="Demander un audit complet"
        variant="primary"
      />
    </>
  )
}
