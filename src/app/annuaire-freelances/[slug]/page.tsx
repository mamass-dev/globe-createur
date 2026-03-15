import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { CtaSection } from "@/components/sections/cta-section"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/seo/json-ld"
import { freelances, getFreelanceBySlug, getFreelancesByCategory, categoryLabels } from "@/lib/data/freelances"
import { SITE_URL } from "@/lib/constants"
import { MapPin, Mail, Globe, Linkedin, Instagram, ArrowLeft, Link2, UserPlus } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return freelances.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const freelance = getFreelanceBySlug(slug)
  if (!freelance) return {}

  return buildMetadata({
    title: `${freelance.name} - ${freelance.title} | Annuaire Freelances Globe Créateur`,
    description: `${freelance.name}, ${freelance.title} à ${freelance.location}. ${freelance.bio.slice(0, 120)}...`,
    path: `/annuaire-freelances/${freelance.slug}`,
    keywords: [freelance.title, freelance.location, ...freelance.skills.slice(0, 3)],
  })
}

function Initials({ name }: { name: string }) {
  const parts = name.split(" ")
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : name.slice(0, 2)

  const colors = [
    "bg-indigo-500", "bg-violet-500", "bg-pink-500", "bg-rose-500",
    "bg-amber-500", "bg-emerald-500", "bg-cyan-500", "bg-blue-500",
  ]
  const colorIndex = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length

  return (
    <div className={`h-24 w-24 ${colors[colorIndex]} text-white text-3xl font-bold rounded-3xl flex items-center justify-center`}>
      {initials.toUpperCase()}
    </div>
  )
}

export default async function FreelanceDetailPage({ params }: Props) {
  const { slug } = await params
  const freelance = getFreelanceBySlug(slug)
  if (!freelance) notFound()

  const related = getFreelancesByCategory(freelance.category).filter((f) => f.slug !== freelance.slug).slice(0, 3)
  const profileUrl = `${SITE_URL}/annuaire-freelances/${freelance.slug}`

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: freelance.name,
    jobTitle: freelance.title,
    url: freelance.website ?? profileUrl,
    email: freelance.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: freelance.location.split(",")[0].trim(),
      addressRegion: "Bourgogne-Franche-Comté",
      addressCountry: "FR",
    },
    knowsAbout: freelance.skills,
  }

  return (
    <>
      <JsonLd data={personSchema} />

      <Breadcrumb
        items={[
          { name: "Annuaire Freelances", href: "/annuaire-freelances" },
          { name: freelance.name, href: `/annuaire-freelances/${freelance.slug}` },
        ]}
      />

      <Container className="pt-28 pb-16 lg:pt-40 lg:pb-24">
        <Link
          href="/annuaire-freelances"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;annuaire
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <Initials name={freelance.name} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-xs font-semibold rounded-full">
                      {categoryLabels[freelance.category].label}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {freelance.name}
                  </h1>
                  <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mt-1">
                    {freelance.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{freelance.location}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">À propos</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{freelance.bio}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Compétences</h2>
                <div className="flex flex-wrap gap-2">
                  {freelance.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-xl"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Link to profile — backlink mechanism */}
            <Card className="p-6 bg-violet-50 dark:bg-violet-950/50 border-violet-100 dark:border-violet-800">
              <div className="flex items-start gap-3">
                <Link2 className="h-5 w-5 text-violet-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Lien vers ce profil
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Ajoutez ce lien sur votre site pour diriger vos visiteurs vers votre fiche vérifiée :
                  </p>
                  <code className="block px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-300 break-all border border-violet-100 dark:border-violet-700">
                    {profileUrl}
                  </code>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact card */}
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${freelance.email}`}
                  className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  <Mail className="h-4 w-4 text-slate-400" />
                  {freelance.email}
                </a>
                {freelance.website && (
                  <a
                    href={freelance.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <Globe className="h-4 w-4 text-slate-400" />
                    Site web
                  </a>
                )}
                {freelance.linkedin && (
                  <a
                    href={freelance.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-slate-400" />
                    LinkedIn
                  </a>
                )}
                {freelance.instagram && (
                  <a
                    href={freelance.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-slate-400" />
                    Instagram
                  </a>
                )}
              </div>

              <div className="mt-6">
                <Button
                  href={`mailto:${freelance.email}?subject=Contact via Globe Créateur`}
                  className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white"
                >
                  <Mail className="h-4 w-4" />
                  Contacter {freelance.name.split(" ")[0]}
                </Button>
              </div>
            </Card>

            {/* Join CTA */}
            <Card className="p-6 bg-gradient-to-br from-violet-600 to-purple-600 border-0 text-white">
              <UserPlus className="h-8 w-8 text-violet-200 mb-3" />
              <h3 className="text-base font-bold mb-2">Vous êtes freelance ?</h3>
              <p className="text-sm text-violet-100 leading-relaxed mb-4">
                Rejoignez l&apos;annuaire gratuitement et gagnez en visibilité.
              </p>
              <Button
                href="/annuaire-freelances/inscription"
                className="w-full bg-white text-violet-600 hover:bg-violet-50"
                size="sm"
              >
                S&apos;inscrire
              </Button>
            </Card>
          </div>
        </div>

        {/* Related freelances */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Autres freelances en {categoryLabels[freelance.category].label}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((f) => (
                <Link key={f.slug} href={`/annuaire-freelances/${f.slug}`}>
                  <Card hover className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-10 w-10 bg-violet-500 text-white font-bold rounded-xl flex items-center justify-center text-sm`}>
                        {f.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{f.name}</p>
                        <p className="text-xs text-slate-400">{f.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{f.title}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      <CtaSection
        title="Un projet digital complet ?"
        subtitle="Besoin d'une équipe intégrée plutôt qu'un freelance ? Globe Créateur est votre studio 360°."
        ctaLabel="Découvrir nos services"
        ctaHref="/services"
        variant="primary"
      />
    </>
  )
}
