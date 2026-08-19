import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { SITE_URL, SITE_NAME } from "@/lib/constants"
import { getServiceBySlug, services } from "@/lib/data/services"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProcessSteps } from "@/components/sections/process-steps"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { RelatedServices } from "@/components/sections/related-services"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"
import { JsonLd } from "@/components/seo/json-ld"
import { VectorisationForm } from "@/components/forms/vectorisation-form"
import {
  VECTO_OFFRES,
  VECTO_LIVRABLES,
  VECTO_DELAI_HEURES,
  formatPrixVecto,
} from "@/lib/data/vectorisation"
import {
  ArrowRight,
  Printer,
  Shirt,
  Store,
  Car,
  Sparkles,
  ImageOff,
  FileWarning,
  Check,
  Hand,
  Clock,
  ShieldCheck,
} from "lucide-react"

const service = getServiceBySlug("vectorisation-logo")!
const PATH = "/services/vectorisation-logo"

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: PATH,
  keywords: service.keywords,
})

/* ─── Visuel avant/après : le même « G » en pixels (agrandi) puis en vecteurs ─── */
function PixelVsVector() {
  // Matrice 12×12 d'un glyphe simplifié, rendue en carrés pour simuler un JPG agrandi
  const rows = [
    "000111111000",
    "001100001100",
    "011000000110",
    "110000000000",
    "110000000000",
    "110000111111",
    "110000000011",
    "110000000011",
    "011000000110",
    "001100001100",
    "000111111000",
    "000000000000",
  ]
  const cell = 10
  return (
    <div className="grid grid-cols-2 gap-4 lg:gap-6" aria-hidden="true">
      <div className="border border-[#2a2a2a] bg-[#141414] p-5">
        <p className="font-mono-accent text-[10px] font-bold uppercase tracking-[0.25em] text-aluminium">Avant — votre PNG agrandi</p>
        <svg viewBox="0 0 120 120" className="mt-4 w-full max-w-[220px] mx-auto" shapeRendering="crispEdges">
          {rows.map((row, y) =>
            row.split("").map((c, x) =>
              c === "1" ? (
                <rect
                  key={`${x}-${y}`}
                  x={x * cell}
                  y={y * cell}
                  width={cell}
                  height={cell}
                  fill="#f5f2ec"
                  opacity={(x + y) % 3 === 0 ? 0.75 : 1}
                />
              ) : (x + y) % 7 === 0 && Math.abs(x - 6) + Math.abs(y - 5) < 7 ? (
                <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="#f5f2ec" opacity={0.18} />
              ) : null
            )
          )}
        </svg>
        <p className="mt-4 text-xs text-aluminium text-center">Pixelisé, bords en escalier, halo autour des formes. Refusé par l&apos;imprimeur.</p>
      </div>
      <div className="border border-signal/40 bg-[#141414] p-5">
        <p className="font-mono-accent text-[10px] font-bold uppercase tracking-[0.25em] text-signal">Après — le même logo vectorisé</p>
        <svg viewBox="0 0 120 120" className="mt-4 w-full max-w-[220px] mx-auto">
          <path
            d="M 95 38 A 40 40 0 1 0 98 60 L 60 60 L 60 74 L 83 74 A 26 26 0 1 1 80 44 Z"
            fill="#f5f2ec"
          />
        </svg>
        <p className="mt-4 text-xs text-aluminium text-center">Courbes nettes à toute taille : carte de visite, camion ou façade. Fichiers AI, EPS, SVG, PDF.</p>
      </div>
    </div>
  )
}

const symptomes = [
  {
    icon: FileWarning,
    title: "L'imprimeur réclame un « fichier vectoriel », « .ai » ou « .eps »",
    text: "Et vous n'avez qu'un PNG ou un JPG. C'est la situation la plus courante, et c'est exactement ce qu'on règle.",
  },
  {
    icon: ImageOff,
    title: "Votre logo devient flou ou pixelisé dès qu'on l'agrandit",
    text: "Parfait sur Instagram, illisible sur un kakémono : votre fichier est fait de pixels, pas de formes.",
  },
  {
    icon: Sparkles,
    title: "Votre logo a été créé avec une IA ou sur Canva",
    text: "ChatGPT, Midjourney, Looka, Canva… Ces outils livrent une image, jamais un vrai fichier d'impression. Le résultat est joli mais inexploitable tel quel.",
  },
  {
    icon: Shirt,
    title: "Le brodeur, l'enseigniste ou le flocage textile bloque",
    text: "Les machines de marquage lisent des tracés, pas des images. Sans vecteur, pas de t-shirt, pas de véhicule, pas d'enseigne.",
  },
]

const usages = [
  { icon: Printer, label: "Imprimerie : cartes, flyers, plaquettes, kakémonos" },
  { icon: Shirt, label: "Textile : broderie, sérigraphie, flocage" },
  { icon: Store, label: "Enseigne, vitrine, signalétique, gravure" },
  { icon: Car, label: "Covering véhicule, stand, bâche grand format" },
]

const etapes = [
  {
    number: "01",
    title: "Vous envoyez votre logo",
    description:
      "PNG, JPG, PDF, capture d'écran… envoyez la meilleure qualité que vous avez via le formulaire ci-dessous. Deux minutes, pas de compte à créer.",
  },
  {
    number: "02",
    title: "On vérifie, vous payez",
    description:
      "Un designer regarde votre fichier et vous confirme le forfait adapté (ou vous dit franchement si le logo doit être repris). Vous recevez ensuite un lien de paiement sécurisé.",
  },
  {
    number: "03",
    title: "On redessine à la main",
    description:
      "Pas de tracé automatique : chaque forme est reconstruite proprement, la typographie est identifiée ou recomposée, les couleurs sont normalisées.",
  },
  {
    number: "04",
    title: `Livraison sous ${VECTO_DELAI_HEURES} h`,
    description:
      "Vous recevez vos fichiers AI, EPS, SVG, PDF et PNG HD par email, prêts à transmettre à n'importe quel imprimeur. Une retouche incluse si besoin.",
  },
]

const engagements = [
  { icon: Hand, title: "Fait main, par un designer", text: "Les convertisseurs automatiques (Vectorizer, Illustrator « Image Trace ») produisent des formes approximatives et des lettres bancales. On redessine." },
  { icon: Clock, title: `${VECTO_DELAI_HEURES} h ouvrées, chrono`, text: "Le délai court à la validation du paiement. Besoin pour ce soir ? Dites-le dans le message, on vous répond honnêtement." },
  { icon: ShieldCheck, title: "Paiement après vérification", text: "On ne vous fait rien payer tant qu'on n'a pas regardé votre fichier. Si le forfait choisi n'est pas le bon, on vous le dit avant." },
]

const faqItems = [
  {
    question: "C'est quoi, concrètement, un logo vectorisé ?",
    answer:
      "Une image classique (PNG, JPG) est une grille de petits carrés de couleur : les pixels. Quand on l'agrandit, les carrés grossissent et le logo devient flou ou « en escalier ». Un logo vectorisé, lui, est décrit par des formes mathématiques (courbes, points, couleurs). Il peut être agrandi à la taille d'un camion ou réduit sur un stylo sans jamais perdre en netteté. C'est ce format que réclament les imprimeurs, brodeurs et enseignistes, généralement sous les extensions .ai, .eps, .svg ou PDF vectoriel.",
  },
  {
    question: "Quel fichier dois-je vous envoyer ?",
    answer:
      "Le meilleur que vous ayez : le PNG ou JPG le plus grand, un PDF, ou même une capture d'écran si c'est tout ce qui vous reste. Si vous connaissez la police utilisée ou les couleurs exactes, indiquez-le dans le message, ça accélère le travail. Fichiers acceptés : PNG, JPG, WEBP, PDF, SVG, GIF, HEIC, jusqu'à 4 Mo (au-delà, collez un lien WeTransfer ou Drive).",
  },
  {
    question: "Mon logo a été fait avec ChatGPT, Midjourney ou Canva : ça se vectorise ?",
    answer:
      "Oui, et c'est aujourd'hui la majorité des demandes. Deux cas. Si le logo est net et les formes claires, le forfait Vectorisation suffit. Si l'IA a produit des lettres déformées, des symétries fausses ou des détails trop fins pour être imprimés, on vous le signale après vérification et on vous propose une reprise : le logo est nettoyé et corrigé avant d'être vectorisé. Dans tous les cas, on vous le dit avant que vous payiez.",
  },
  {
    question: "Pourquoi ne pas utiliser un convertisseur gratuit en ligne ?",
    answer:
      "Vous pouvez essayer, mais le résultat est rarement imprimable : les outils automatiques tracent les pixels tels quels, halos et défauts compris, produisent des centaines de points inutiles et transforment le texte en formes bancales. Un imprimeur sérieux le refusera ou vous facturera la remise au propre. Ici, un designer redessine chaque forme et recompose la typographie : vous avez un vrai fichier source, exploitable pendant des années.",
  },
  {
    question: "Quels fichiers vais-je recevoir ?",
    answer:
      "Le fichier source AI (Adobe Illustrator), un EPS (format universel des ateliers de marquage), un SVG (pour le web), un PDF vectoriel et un PNG haute définition sur fond transparent. Avec le forfait déclinaisons, vous recevez en plus les versions noir, blanc et négatif, les références couleurs CMJN / RVB / HEX / Pantone, et une page de règles d'utilisation.",
  },
  {
    question: `Le délai de ${VECTO_DELAI_HEURES} h est-il garanti ?`,
    answer:
      `Le délai court à partir de la validation de votre paiement, en jours ouvrés. Pour un logo simple ou un forfait déclinaisons, ${VECTO_DELAI_HEURES} h est notre standard. Pour une reprise de logo, le délai est précisé dans le devis. Si votre besoin est urgent (impression le lendemain matin), écrivez-le dans le message : on vous dit tout de suite si c'est tenable.`,
  },
  {
    question: "Est-ce que vous changez mon logo ?",
    answer:
      "Non. La vectorisation reproduit fidèlement votre logo, en plus net. On corrige uniquement ce qui relève du défaut technique (bord flou, halo, lettre légèrement irrégulière), et on vous signale ce qui pourrait poser problème à l'impression. Si vous souhaitez aller plus loin (simplifier, moderniser, créer une vraie identité), c'est le rôle de la reprise de logo ou d'une prestation de branding.",
  },
  {
    question: "Ai-je le droit d'utiliser un logo généré par IA ?",
    answer:
      "La question mérite d'être posée, et la réponse dépend de l'outil utilisé et de ses conditions d'utilisation, ainsi que de l'absence de ressemblance avec une marque existante. La vectorisation ne modifie pas votre situation juridique : nous reproduisons le logo que vous nous confiez, vous restez responsable de son originalité. Si vous avez un doute, un dépôt à l'INPI et une vérification d'antériorité sont de bonnes précautions avant d'imprimer en grande quantité.",
  },
  {
    question: "Travaillez-vous uniquement avec des entreprises de Dijon ?",
    answer:
      "Non : tout se passe en ligne, de l'envoi du logo à la livraison des fichiers. Nous sommes une agence basée à Dijon, mais nous vectorisons des logos pour des artisans, commerçants, associations et PME de toute la France. Une facture avec TVA vous est transmise avec la livraison.",
  },
]

const related = services.filter((s) => ["creation-contenu-pme", "creation-site-internet-dijon"].includes(s.slug))

export default function VectorisationLogoPage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.metaDescription} url={PATH} />
      <FaqSchema items={faqItems} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}${PATH}#offres`,
          name: "Vectorisation de logo",
          serviceType: "Vectorisation de logo",
          provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
          areaServed: { "@type": "Country", name: "France" },
          offers: VECTO_OFFRES.filter((o) => o.prixHT !== null).map((o) => ({
            "@type": "Offer",
            name: o.nom,
            price: o.prixHT,
            priceCurrency: "EUR",
            url: `${SITE_URL}${PATH}#tarifs`,
            availability: "https://schema.org/InStock",
          })),
        }}
      />

      <Breadcrumb
        items={[
          { name: "Services", href: "/services" },
          { name: "Vectorisation de logo", href: PATH },
        ]}
      />

      {/* ─── 1. Hero : le symptôme, pas le jargon ─── */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />
        <Container className="relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-signal text-xs font-bold uppercase tracking-[0.2em] font-mono-accent">
                <span className="h-[3px] w-6 bg-signal" />
                Vectorisation de logo — livrée sous {VECTO_DELAI_HEURES} h
              </span>
              <h1 className="text-impact mt-6 text-4xl sm:text-5xl lg:text-6xl text-ivory">
                Votre logo est flou à l&apos;impression ? On le rend net, à toutes les tailles.
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-aluminium leading-relaxed max-w-2xl">
                Vous avez un logo en PNG ou JPG — fait sur Canva, généré par une IA ou récupéré d&apos;un
                ancien prestataire — et l&apos;imprimeur vous demande « le fichier vectoriel ». Envoyez-le
                nous : un designer le redessine à la main et vous livre les vrais fichiers d&apos;impression
                (AI, EPS, SVG, PDF) sous {VECTO_DELAI_HEURES} h. Dès {formatPrixVecto(VECTO_OFFRES[0])}.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href="#envoyer" size="lg" className="group">
                  Envoyer mon logo
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="#cest-quoi" size="lg" variant="outline">
                  C&apos;est quoi, un logo vectorisé ?
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-aluminium">
                <li className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-signal" /> Redessin manuel, pas de tracé auto</li>
                <li className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-signal" /> Paiement après vérification</li>
                <li className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-signal" /> Partout en France, 100 % en ligne</li>
              </ul>
            </div>
            <AnimateOnScroll>
              <PixelVsVector />
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ─── 2. Vous êtes au bon endroit si… ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <SectionHeader
            badge="Ça vous parle ?"
            title="Quatre situations, un seul problème : il vous manque le bon fichier"
            subtitle="Pas besoin de connaître le vocabulaire. Si vous vous reconnaissez dans l'une de ces phrases, vous êtes au bon endroit."
            align="left"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {symptomes.map((s) => (
              <AnimateOnScroll key={s.title}>
                <Card hover className="h-full p-6 lg:p-8">
                  <s.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-ivory">{s.title}</h3>
                  <p className="mt-2 text-sm text-aluminium leading-relaxed">{s.text}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 3. Pédagogie : pixels vs vecteurs ─── */}
      <section className="py-20 lg:py-28 scroll-mt-20" id="cest-quoi">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
                — Expliqué simplement
              </span>
              <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">
                Vectoriser un logo, c&apos;est quoi ?
              </h2>
              <div className="mt-6 space-y-5 text-aluminium leading-relaxed">
                <p>
                  Une image classique — PNG, JPG, capture d&apos;écran — est une mosaïque de minuscules
                  carrés de couleur : les <strong className="text-ivory">pixels</strong>. Tant qu&apos;on
                  la regarde à sa taille d&apos;origine, tout va bien. Dès qu&apos;on l&apos;agrandit, les
                  carrés grossissent : le logo devient flou, les bords font des escaliers, un halo apparaît
                  autour des formes.
                </p>
                <p>
                  Un <strong className="text-ivory">logo vectorisé</strong> n&apos;est pas fait de pixels,
                  mais de formes décrites mathématiquement : des courbes, des points, des couleurs. On peut
                  l&apos;afficher sur un stylo ou sur une façade de dix mètres, il reste parfaitement net.
                  C&apos;est pour ça que tous les professionnels de l&apos;impression le réclament, sous
                  les extensions <span className="font-mono-accent text-ivory">.ai</span>,{" "}
                  <span className="font-mono-accent text-ivory">.eps</span>,{" "}
                  <span className="font-mono-accent text-ivory">.svg</span> ou PDF vectoriel.
                </p>
                <p>
                  <strong className="text-ivory">Vectoriser</strong>, c&apos;est donc reconstruire votre
                  logo dans ce format. Et ça ne se fait pas d&apos;un clic : les convertisseurs automatiques
                  tracent les défauts avec le reste. Un designer, lui, redessine chaque forme, retrouve ou
                  recompose la typographie et normalise les couleurs. Le résultat est un fichier source
                  propre, que vous gardez et réutilisez pendant des années.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="border border-[#1c1c1c] bg-[#141414] p-6 lg:p-8">
                <p className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-aluminium">
                  Là où le vectoriel est indispensable
                </p>
                <ul className="mt-5 space-y-4">
                  {usages.map((u) => (
                    <li key={u.label} className="flex items-center gap-3 text-sm text-ivory">
                      <u.icon className="h-5 w-5 text-signal shrink-0" aria-hidden="true" />
                      {u.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-[#2a2a2a] pt-6">
                  <p className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-aluminium">
                    Pourquoi les logos IA et Canva coincent
                  </p>
                  <p className="mt-3 text-sm text-aluminium leading-relaxed">
                    ChatGPT, Midjourney, Looka, Canva ou Ideogram génèrent une <em>image</em> : jolie à
                    l&apos;écran, mais en pixels, souvent en basse définition, avec un fond qui n&apos;est
                    pas vraiment transparent et des lettres qui ne sont pas de vraies polices. Pour
                    l&apos;imprimeur, c&apos;est un brouillon. Nous en faisons un logo.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ─── 4. Comment ça marche ─── */}
      <ProcessSteps
        badge="Comment ça marche"
        title={`De votre PNG aux fichiers d'impression en ${VECTO_DELAI_HEURES} h`}
        subtitle="Quatre étapes, aucune compétence technique demandée de votre côté."
        steps={etapes}
      />

      {/* ─── 5. Ce que vous recevez ─── */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            badge="Les fichiers livrés"
            title="Tout ce qu'un imprimeur pourra vous demander, dans le bon format"
            subtitle="Vous n'aurez plus jamais à chercher « le bon fichier » : vous les aurez tous, nommés clairement."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VECTO_LIVRABLES.map((l) => (
              <AnimateOnScroll key={l.ext}>
                <div className="h-full border border-[#1c1c1c] bg-[#141414] p-6">
                  <span className="font-mono-accent text-2xl font-bold text-signal">.{l.ext.toLowerCase().replace(" hd", "")}</span>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-ivory">{l.ext}</p>
                  <p className="mt-3 text-sm text-aluminium leading-relaxed">{l.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {engagements.map((e) => (
              <AnimateOnScroll key={e.title}>
                <div className="flex gap-4">
                  <e.icon className="h-6 w-6 text-signal shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold text-ivory">{e.title}</h3>
                    <p className="mt-1.5 text-sm text-aluminium leading-relaxed">{e.text}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 6. Tarifs ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c] scroll-mt-20" id="tarifs">
        <Container>
          <SectionHeader
            badge="Tarifs"
            title="Un prix fixe, annoncé avant de commencer"
            subtitle="Pas de surprise : vous choisissez un forfait, on vérifie que c'est le bon, vous payez, on livre."
          />
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {VECTO_OFFRES.map((o) => (
              <AnimateOnScroll key={o.id}>
                <Card className={`h-full flex flex-col ${o.populaire ? "border-signal/60" : ""}`}>
                  <span className={`font-mono-accent text-xs font-bold uppercase tracking-widest ${o.populaire ? "text-signal" : "text-aluminium"}`}>
                    {o.populaire ? "Le plus demandé" : o.id === "reprise" ? "Si le logo doit être corrigé" : "L'essentiel"}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-ivory">{o.nom}</h3>
                  <p className="mt-3 text-sm text-aluminium leading-relaxed">{o.accroche}</p>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {o.inclus.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-aluminium">
                        <Check className="h-4 w-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
                    <span className="text-3xl font-bold text-ivory">{formatPrixVecto(o)}</span>
                    <p className="mt-3 text-xs text-aluminium leading-relaxed">
                      <strong className="text-ivory">Pour qui :</strong> {o.pourQui}
                    </p>
                  </div>
                  <Button href="#envoyer" className="mt-6" variant={o.populaire ? "primary" : "outline"}>
                    {o.prixHT === null ? "Demander un devis" : "Choisir ce forfait"}
                  </Button>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
          <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-aluminium leading-relaxed">
            Prix HT, facture avec TVA fournie. Le délai de {VECTO_DELAI_HEURES} h s&apos;entend en jours
            ouvrés à partir du paiement. Plusieurs logos à vectoriser ? Dites-le dans le message, on
            ajuste.
          </p>
        </Container>
      </section>

      {/* ─── 7. Formulaire d'envoi ─── */}
      <section className="py-20 lg:py-28 scroll-mt-20" id="envoyer">
        <Container>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
                — Envoyer mon logo
              </span>
              <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">
                Deux minutes maintenant, un logo propre demain
              </h2>
              <p className="mt-6 text-aluminium leading-relaxed">
                Déposez votre fichier, choisissez un forfait, laissez votre email. On vérifie, on vous
                envoie le lien de paiement, et vos fichiers arrivent sous {VECTO_DELAI_HEURES} h.
              </p>
              <p className="mt-4 text-sm text-aluminium leading-relaxed">
                Vous préférez parler à quelqu&apos;un avant ?{" "}
                <Link href="/contact" className="font-bold text-ivory hover:text-signal transition-colors">
                  Contactez-nous
                </Link>{" "}
                ou écrivez à contact@globecreateur.fr avec votre logo en pièce jointe.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="border border-[#1c1c1c] bg-[#0f0f0f] p-6 lg:p-10">
                <VectorisationForm />
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ─── 8. FAQ ─── */}
      <FaqAccordion items={faqItems} title="Questions fréquentes sur la vectorisation de logo" badge="FAQ" />

      {/* ─── 9. Et après ? ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <div className="max-w-3xl">
            <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
              — Et si le logo lui-même méritait mieux ?
            </span>
            <h2 className="text-impact mt-4 text-3xl lg:text-4xl text-ivory">
              La vectorisation règle le fichier. Le branding règle l&apos;image.
            </h2>
            <p className="mt-5 text-aluminium leading-relaxed">
              Beaucoup de clients arrivent pour un fichier propre et repartent avec une question : « et si on
              en profitait pour faire un vrai logo ? ». Globe Créateur est un studio de création à Dijon :
              identité visuelle, charte graphique, supports imprimés, site internet. Si votre logo IA a
              servi à démarrer, on peut vous aider à passer à l&apos;étape suivante — sans jamais vous y
              forcer.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <Link href="/services/creation-contenu-pme" className="inline-flex items-center gap-1.5 font-bold text-ivory hover:text-signal transition-colors">
                Design & création de contenu <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/tarifs" className="inline-flex items-center gap-1.5 font-bold text-ivory hover:text-signal transition-colors">
                Nos tarifs <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/projets" className="inline-flex items-center gap-1.5 font-bold text-ivory hover:text-signal transition-colors">
                Voir nos projets <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <RelatedServices services={related} />
    </>
  )
}
