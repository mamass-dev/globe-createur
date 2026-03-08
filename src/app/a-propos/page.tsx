import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { Stats } from "@/components/sections/stats"
import { CtaSection } from "@/components/sections/cta-section"
import { AnimateOnScroll } from "@/components/ui/animate"
import { PageHero } from "@/components/sections/page-hero"
import { Check } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "À propos de Globe Créateur — Studio communication 360° à Dijon",
  description: "Globe Créateur, studio de communication fondé par Axel Masson à Longvic (Dijon). Web, SEO, photo, vidéo, design pour PME en Bourgogne. Notre histoire, nos valeurs, notre méthode.",
  path: "/a-propos",
})

const stats = [
  { value: 47, suffix: "+", label: "Projets livrés" },
  { value: 5, label: "Expertises intégrées" },
  { value: 48, suffix: "h", label: "Délai moyen de réponse" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
]

const valeurs = [
  {
    title: "Transparence totale",
    description: "On ne vend pas du mystère. Vous recevez un devis détaillé, un planning clair et un reporting mensuel avec des vrais chiffres. Si quelque chose ne marche pas, on vous le dit.",
  },
  {
    title: "Résultats avant tout",
    description: "On ne fait pas du beau pour le beau. Chaque action — un post Instagram, une page web, un shooting photo — a un objectif mesurable. Si ça ne génère pas de résultat, on ajuste.",
  },
  {
    title: "Proximité terrain",
    description: "Basés à Longvic aux portes de Dijon, on connaît le tissu économique local. On se déplace chez vous, on comprend votre marché et on parle la même langue que vos clients.",
  },
  {
    title: "Engagement total",
    description: "Votre entreprise, on la traite comme la nôtre. On s'investit sur le long terme, pas pour un projet livré et oublié. Votre réussite est notre meilleure carte de visite.",
  },
]

export default function AProposPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "À propos", href: "/a-propos" }]} />

      {/* HERO */}
      <PageHero
        badge="Notre histoire"
        title="Un studio de communication né sur le terrain"
        subtitle="Globe Créateur, c'est l'équipe communication que les PME n'ont pas les moyens d'embaucher — mais dont elles ont besoin pour grandir."
      />

      {/* HISTOIRE */}
      <Container as="article" className="py-16 lg:py-24 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Pourquoi Globe Créateur existe</h2>
            <p>
              Avant de fonder Globe Créateur, j&apos;ai travaillé avec des dizaines de PME en Bourgogne.
              Le même schéma revenait systématiquement : un photographe pour les photos, un freelance
              pour le site, un autre pour les réseaux sociaux, parfois un imprimeur pour les flyers.
              Quatre prestataires, quatre factures, zéro cohérence.
            </p>
            <p>
              Le résultat ? Des photos magnifiques qui dorment sur un disque dur. Un site qui ne ressemble
              pas aux posts Instagram. Des textes écrits par quelqu&apos;un qui ne connaît pas l&apos;entreprise.
              Et un dirigeant qui perd du temps à coordonner tout le monde au lieu de faire son métier.
            </p>
            <p>
              <strong>Globe Créateur est né pour résoudre ce problème.</strong> Un seul interlocuteur — Axel Masson —
              qui coordonne toutes les compétences : développement web, référencement, photographie,
              vidéo, design graphique et gestion des réseaux sociaux. Une vision globale, cohérente,
              au service de résultats concrets.
            </p>

            <h2>Ce qu&apos;on fait concrètement</h2>
            <p>
              On ne se définit pas par nos outils mais par ce qu&apos;on apporte à nos clients.
              Voici les cinq métiers qu&apos;on réunit sous un même toit :
            </p>
            <ul>
              <li>
                <strong><Link href="/services/creation-site-internet-dijon">Web</Link></strong> —
                Sites internet modernes, rapides et conçus pour convertir. Pas de templates WordPress,
                du sur-mesure avec des technologies actuelles (Next.js, React).
              </li>
              <li>
                <strong><Link href="/services/seo-local-dijon">SEO</Link></strong> —
                Référencement local et naturel pour que vos clients vous trouvent sur Google
                quand ils cherchent vos services dans la région.
              </li>
              <li>
                <strong><Link href="/services/creation-contenu-pme">Photo & vidéo</Link></strong> —
                Shooting sur place, production vidéo, retouche. Du contenu réel,
                pas des photos de banque d&apos;images.
              </li>
              <li>
                <strong>Design</strong> — Identité visuelle, supports imprimés,
                visuels réseaux sociaux. Une marque cohérente sur tous les supports.
              </li>
              <li>
                <strong><Link href="/services/support-communication-pme">Pilotage</Link></strong> —
                Planning éditorial, gestion des réseaux sociaux, reporting mensuel.
                Votre communication tourne même quand vous êtes sur le terrain.
              </li>
            </ul>

            <h2>Pour qui on travaille</h2>
            <p>
              Nos clients sont des PME de 2 à 50 salariés, des indépendants et des professions libérales.
              Principalement en Bourgogne-Franche-Comté, mais pas seulement.
            </p>
            <p>
              Des <Link href="/secteurs/hotels-lieux-evenementiels">hôtels</Link> qui veulent réduire
              leur dépendance à Booking. Des restaurants qui veulent remplir sans passer par
              les plateformes. Des artisans qui veulent montrer leur savoir-faire. Des cabinets
              qui veulent inspirer confiance dès le premier clic.
            </p>
            <p>
              Ce qui les réunit : ils n&apos;ont pas d&apos;équipe communication en interne, mais ils savent
              que leur visibilité en ligne est devenue aussi importante que le bouche-à-oreille.
            </p>

            <h2>Pourquoi Dijon</h2>
            <p>
              Le studio est basé à Longvic, à 5 minutes de Dijon. Ce n&apos;est pas un hasard.
            </p>
            <p>
              Être ancré localement, c&apos;est connaître le marché bourguignon, ses saisonnalités,
              ses codes, ses réseaux. C&apos;est pouvoir se déplacer chez nos clients pour un
              shooting photo, une réunion stratégique ou un café. C&apos;est comprendre que le
              restaurateur dijonnais et le domaine viticole de Côte-d&apos;Or n&apos;ont pas les mêmes
              enjeux qu&apos;une startup parisienne.
            </p>
            <p>
              Cette proximité fait la différence. On n&apos;est pas une agence à l&apos;autre bout
              de la France qui livre un site et disparaît. On est votre voisin qui
              s&apos;investit dans votre réussite.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* CHIFFRES */}
      <Stats stats={stats} />

      {/* VALEURS */}
      <Container className="py-16 lg:py-24 max-w-4xl">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary font-mono-accent mb-3">
              Nos valeurs
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Ce en quoi on croit
            </h2>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {valeurs.map((v) => (
            <AnimateOnScroll key={v.title}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.description}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>

      {/* MÉTHODE */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <Container className="max-w-3xl">
          <AnimateOnScroll>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary font-mono-accent mb-3">
                Notre méthode
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Comment on travaille avec vous
              </h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Pas de réunion de 2 heures pour « aligner les visions ». Pas de deck de 40 slides.
                Un process simple :
              </p>
              <ol>
                <li>
                  <strong>On écoute.</strong> Un premier échange (30 min, gratuit) pour comprendre votre
                  situation, vos objectifs et vos contraintes. Pas de questionnaire de 50 cases à cocher.
                </li>
                <li>
                  <strong>On propose.</strong> Sous 48h, vous recevez un{" "}
                  <Link href="/devis">devis détaillé</Link> avec notre recommandation.
                  Ce qu&apos;on ferait, pourquoi, combien ça coûte, combien de temps ça prend.
                </li>
                <li>
                  <strong>On produit.</strong> Chaque livrable passe par une validation. Vous voyez
                  le travail avant qu&apos;il soit publié. Si ça ne vous convient pas, on ajuste.
                </li>
                <li>
                  <strong>On mesure.</strong> Reporting mensuel avec les chiffres qui comptent.
                  Ce qui marche, ce qui ne marche pas, ce qu&apos;on fait le mois suivant.
                </li>
              </ol>
              <p>
                Pour un accompagnement continu, découvrez nos{" "}
                <Link href="/forfait-communication-pme">forfaits communication</Link> à partir de 990 €/mois.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* CTA */}
      <CtaSection
        title="Envie de travailler ensemble ?"
        subtitle="Premier échange gratuit et sans engagement. On se retrouve autour d'un café à Dijon ou en visio."
        variant="primary"
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
      />
    </>
  )
}
