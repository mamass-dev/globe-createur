import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { SITE_URL } from "@/lib/constants"
import { JsonLd } from "@/components/seo/json-ld"
import { FaqSchema } from "@/components/seo/schemas"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Button } from "@/components/ui/button"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { ImageVectorizer } from "@/components/tools/image-vectorizer"
import { Lock, Zap, Smartphone, ArrowRight, Hand, Clock, FileCheck } from "lucide-react"

const PATH = "/vectoriser-une-image"

export const metadata: Metadata = buildMetadata({
  title: "Vectoriser une image gratuitement en ligne : PNG, JPG vers SVG en 10 s",
  description:
    "Vectorisez une image ou un logo gratuitement, sans inscription : déposez un PNG ou un JPG, récupérez un SVG en quelques secondes. Le tracé se fait dans votre navigateur, rien n'est envoyé. Et si le résultat ne suffit pas pour l'imprimeur, un designer le redessine à la main pour 69 € HT.",
  path: PATH,
  keywords: [
    "vectoriser une image",
    "vectoriser une image gratuit",
    "vectoriser une image en ligne",
    "vectoriser un logo",
    "vectoriser un logo gratuitement",
    "convertir png en svg",
    "convertir jpg en svg",
    "image vectorielle",
    "logo en vectoriel",
    "convertir logo en vectoriel",
  ],
})

/*
 * Page outil « Vectoriser une image » (2026-10-17).
 * Cible : « vectoriser une image » (6 600/mois), « vectoriser une image gratuit » (2 900),
 * « vectoriser un logo » (1 000), « logo en vectoriel » (320). Source : DataForSEO, France.
 * Règles : honnête sur les limites du tracé automatique, aucun chiffre inventé, pas de cadratin.
 */

const FAQ = [
  {
    question: "C'est vraiment gratuit et sans inscription ?",
    answer:
      "Oui. Vous déposez l'image, vous téléchargez le SVG. Pas de compte, pas d'e-mail, pas de filigrane, pas de limite de nombre d'images. L'outil tourne entièrement dans votre navigateur.",
  },
  {
    question: "Mon image est-elle envoyée sur vos serveurs ?",
    answer:
      "Non. Le tracé est calculé par votre navigateur, sur votre ordinateur ou votre téléphone. L'image ne quitte pas votre appareil. Vous pouvez d'ailleurs couper la connexion une fois la page chargée : l'outil fonctionne toujours.",
  },
  {
    question: "Quelle différence entre cet outil gratuit et la vectorisation à 69 € ?",
    answer:
      "L'outil trace automatiquement le contour des zones de couleur : il reproduit les pixels, défauts compris. Un designer, lui, redessine le logo : formes géométriques propres, typographie identifiée et recomposée, couleurs exactes, fichiers AI, EPS, SVG et PDF prêts pour l'imprimeur. Le premier dépanne, le second est définitif.",
  },
  {
    question: "Quels formats puis-je déposer ?",
    answer:
      "PNG, JPG, WEBP, GIF, et une photo prise avec le téléphone. Les images sont réduites à 1 200 px de côté avant le tracé pour rester rapides sur mobile. Un PDF ou un SVG ne sont pas acceptés : le SVG est déjà vectoriel, et un PDF de logo contient souvent déjà des vecteurs à extraire, ce qu'on fait dans la prestation manuelle.",
  },
  {
    question: "Le SVG obtenu convient-il à un imprimeur ?",
    answer:
      "Pour un logo simple à aplats nets, souvent oui, après vérification à fort zoom. Pour un logo avec du texte, des dégradés, une ombre, ou une image de départ floue ou petite, le tracé montre des bords tremblés et des lettres déformées. L'imprimeur le verra. C'est là qu'un redessin manuel devient nécessaire.",
  },
  {
    question: "Puis-je vectoriser une photo ?",
    answer:
      "Oui, avec le réglage Affiche, qui réduit la photo à 8 couleurs. Le résultat est un effet posterisé, utile pour un visuel, pas une reproduction fidèle. Une photo n'a pas de formes à vectoriser : c'est une limite de principe, pas de l'outil.",
  },
  {
    question: "Comment ouvrir ou modifier le fichier SVG ?",
    answer:
      "Il s'ouvre dans n'importe quel navigateur, dans Illustrator, Inkscape (gratuit), Affinity Designer, Figma ou Canva. Chaque zone de couleur est une forme indépendante que vous pouvez recolorer ou supprimer.",
  },
  {
    question: "Pourquoi une agence propose-t-elle cet outil gratuitement ?",
    answer:
      "Parce que la moitié des logos qu'on reçoit à vectoriser auraient pu être tracés automatiquement, et que l'autre moitié ne le pourra jamais. L'outil vous permet de le vérifier vous-même en dix secondes. Si le tracé suffit, tant mieux. Sinon, vous savez exactement pourquoi vous nous confiez le logo.",
  },
]

const ETAPES = [
  { icon: Smartphone, title: "Déposez ou photographiez", text: "Un PNG, un JPG, une capture, ou une photo du logo sur une carte de visite." },
  { icon: Zap, title: "Choisissez le type", text: "Logo, noir et blanc, détaillé ou affiche. Le tracé se recalcule à chaque changement." },
  { icon: FileCheck, title: "Zoomez, puis téléchargez", text: "Comparez vecteur et original à fort zoom. Si les bords sont nets, le SVG est prêt." },
]

export default function VectoriserUneImagePage() {
  return (
    <>
      <FaqSchema items={FAQ} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "@id": `${SITE_URL}${PATH}#app`,
          name: "Vectoriseur d'image gratuit Globe Créateur",
          url: `${SITE_URL}${PATH}`,
          applicationCategory: "DesignApplication",
          operatingSystem: "Web",
          browserRequirements: "Navigateur web récent",
          inLanguage: "fr-FR",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
          description: "Vectorisation gratuite d'une image ou d'un logo (PNG, JPG, WEBP) en SVG, directement dans le navigateur, sans inscription.",
          provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Globe Créateur" },
          featureList: ["Tracé automatique en SVG", "Traitement local, aucune image envoyée", "Réglages logo, noir et blanc, détaillé, affiche", "Comparaison vecteur / original avec zoom", "Prise de photo depuis le téléphone"],
        }}
      />

      <Breadcrumb items={[{ name: "Outils", href: "/outils" }, { name: "Vectoriser une image", href: PATH }]} />

      {/* Hero court : l'outil doit être visible sans défiler sur mobile */}
      <section className="pt-24 pb-6 lg:pt-32 lg:pb-8">
        <Container>
          <div className="inline-flex items-center gap-2 border border-[#2a2a2a] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-signal">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Gratuit · sans inscription · rien n&apos;est envoyé
          </div>
          <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory leading-[1.05] max-w-4xl">
            Vectoriser une image, gratuitement, en dix secondes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-aluminium leading-relaxed max-w-2xl">
            Déposez un PNG, un JPG ou une photo de votre logo, récupérez un fichier SVG. Le calcul se fait dans votre navigateur, même sur téléphone.
          </p>
        </Container>
      </section>

      <Container className="pb-12 lg:pb-16">
        <ImageVectorizer />
      </Container>

      {/* Étapes */}
      <section className="border-y border-[#1c1c1c] bg-[#0f0f0f] py-14 lg:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {ETAPES.map((e, i) => (
              <AnimateOnScroll key={e.title} delay={i * 0.08}>
                <e.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                <p className="mt-4 text-lg font-bold text-ivory">{e.title}</p>
                <p className="mt-2 text-sm text-aluminium leading-relaxed">{e.text}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Contenu éditorial */}
      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Ce que fait exactement cet outil</h2>
            <p>
              Une image PNG ou JPG est une grille de pixels. Un fichier vectoriel (SVG, AI, EPS, PDF)
              décrit des formes : des courbes, des couleurs, des contours, qui s&apos;agrandissent
              à l&apos;infini sans perdre en netteté. C&apos;est ce que réclament un imprimeur, un
              brodeur, un enseigniste ou un fabricant de covering.
            </p>
            <p>
              L&apos;outil <strong>regroupe les pixels de l&apos;image en quelques couleurs</strong>,
              puis <strong>trace le contour de chaque zone</strong> avec des courbes. Le résultat
              est un vrai SVG, composé de formes indépendantes, que vous pouvez ouvrir dans
              Illustrator, Inkscape, Figma ou Canva. Tout est calculé par votre navigateur :
              aucune image n&apos;est envoyée sur un serveur, et rien n&apos;est conservé.
            </p>

            <h2>Quand le tracé automatique suffit</h2>
            <ul>
              <li><strong>Un logo à aplats nets</strong>, deux à six couleurs, sans dégradé ni ombre, à partir d&apos;un fichier de bonne taille (au moins 800 px de large).</li>
              <li><strong>Un pictogramme ou une signature</strong> en noir sur fond clair : le réglage Noir et blanc donne un résultat propre.</li>
              <li><strong>Une forme simple à recolorer</strong> dans un logiciel de dessin.</li>
            </ul>

            <h2>Quand il ne suffira pas, et pourquoi</h2>
            <p>
              Le tracé reproduit ce qu&apos;il voit, défauts compris. Il ne sait pas qu&apos;un cercle
              est un cercle, qu&apos;une lettre est une lettre d&apos;une police donnée, ni qu&apos;un
              bord flou devrait être net. Concrètement :
            </p>
            <ul>
              <li><strong>Le texte</strong> ressort avec des lettres irrégulières, parce que chaque lettre est tracée comme une tache et non recomposée dans sa police.</li>
              <li><strong>Les dégradés et les ombres</strong> deviennent des bandes de couleurs plates.</li>
              <li><strong>Une image petite ou compressée</strong> (logo récupéré sur un site, capture d&apos;écran, JPG très compressé) donne des bords tremblés, visibles dès qu&apos;on agrandit.</li>
              <li><strong>Les logos générés par une IA</strong> ont presque toujours des détails incohérents que le tracé fige au lieu de corriger.</li>
            </ul>
            <p>
              Dans ces cas, la seule méthode qui tient est le{" "}
              <Link href="/services/vectorisation-logo">redessin manuel du logo</Link> : un
              designer reconstruit chaque forme, identifie la typographie, remet les couleurs
              exactes, et livre les fichiers AI, EPS, SVG et PDF. Chez nous c&apos;est 69 € HT,
              livré sous 24 h, et remboursé si le logo ne peut pas être repris. On explique
              la différence en détail dans{" "}
              <Link href="/blog/comment-vectoriser-un-logo">comment vectoriser un logo</Link>.
            </p>

            <h2>Vérifier un SVG avant de l&apos;envoyer à l&apos;imprimeur</h2>
            <ol>
              <li>Ouvrez-le dans un navigateur et zoomez à 400 %. Les bords doivent rester nets, sans escalier ni ondulation.</li>
              <li>Comptez les formes : un logo propre en a quelques dizaines, pas plusieurs milliers. Trop de formes signifie que le tracé a suivi le bruit de l&apos;image.</li>
              <li>Regardez les lettres une à une. Si deux lettres identiques n&apos;ont pas la même forme, le texte devra être recomposé.</li>
              <li>Vérifiez les couleurs : un tracé automatique crée des teintes intermédiaires. L&apos;imprimeur a besoin de couleurs franches, idéalement en CMJN ou Pantone.</li>
            </ol>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* Pont vers la prestation */}
      <section className="border-y border-[#1c1c1c] bg-[#0f0f0f] py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <AnimateOnScroll>
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Si le tracé ne suffit pas</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-ivory leading-tight">Un designer redessine votre logo à la main, livré sous 24 h.</h2>
            <p className="mt-4 text-aluminium leading-relaxed">
              Envoyez le même fichier que vous venez de déposer ici. On identifie la police, on reconstruit les formes, on remet les couleurs exactes, et vous recevez un dossier complet pour l&apos;imprimeur. Si le logo ne peut pas être repris proprement, on vous le dit avant et on rembourse.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-aluminium sm:grid-cols-3">
              <li className="flex items-center gap-2"><Hand className="h-4 w-4 text-signal" aria-hidden="true" /> Redessin manuel</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-signal" aria-hidden="true" /> 24 h après paiement</li>
              <li className="flex items-center gap-2"><FileCheck className="h-4 w-4 text-signal" aria-hidden="true" /> AI, EPS, SVG, PDF, PNG</li>
            </ul>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1} className="border border-[#1c1c1c] bg-noir p-6 lg:p-8">
            <p className="text-sm text-aluminium">Vectorisation de logo</p>
            <p className="mt-1 text-4xl font-bold text-ivory">69 € <span className="text-base font-normal text-aluminium">HT</span></p>
            <p className="mt-2 text-sm text-aluminium">Déclinaisons noir, blanc, négatif et références couleurs : 149 € HT.</p>
            <Button href="/services/vectorisation-logo#envoyer" size="md" className="mt-6 w-full" track={{ event: "cta_click", props: { cta: "vectorisation-pro", location: "vectoriseur-page" } }}>
              Envoyer mon logo <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </AnimateOnScroll>
        </Container>
      </section>

      <FaqAccordion items={FAQ} title="Questions fréquentes" badge="FAQ" />
    </>
  )
}
