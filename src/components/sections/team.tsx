"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"

const team = [
  {
    name: "Axel Masson",
    role: "Co-fondateur · Stratégie & Web",
    photo: "/images/team/axel-masson.webp",
    bio: "Passionné de digital et d'entrepreneuriat, Axel conçoit les stratégies web et pilote chaque projet de A à Z. Son objectif : transformer chaque euro investi en résultat concret.",
    linkedin: "https://www.linkedin.com/in/axel-masson",
  },
  {
    name: "Adrien Lecrivain",
    role: "Co-fondateur · Photo & Vidéo",
    photo: "/images/team/adrien-lecrivain.webp",
    bio: "Derrière l'objectif, Adrien capture l'essence de chaque marque. Photographe et vidéaste, il donne vie à vos projets avec un œil créatif et une exigence technique.",
    linkedin: "https://www.linkedin.com/in/adrien-lecrivain-b54a692b6/",
  },
]

export function Team() {
  return (
    <section className="py-24 dark:bg-slate-950 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            L'équipe
          </h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            Deux passionnés, <br />une vision commune.
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Basés à Dijon, on met notre énergie au service de vos ambitions. Pas de jargon, pas d'intermédiaire — juste nous, engagés à vos côtés.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="group relative flex flex-col h-full">
              {/* Photo */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Name overlay on photo */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xl font-extrabold text-white">{member.name}</p>
                  <p className="text-xs font-semibold text-indigo-300">{member.role}</p>
                </div>
              </div>

              {/* Bio + LinkedIn */}
              <div className="flex flex-col flex-1 px-1">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs flex-1">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors mt-3"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Voir le profil
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Expert Network */}
        <div className="mt-28 max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Notre réseau d'experts
            </h2>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              Une équipe pluridisciplinaire <br />à votre service.
            </h3>
          </div>

          <div className="relative">
            {/* Centre — Logo */}
            <div className="relative z-10 mx-auto w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-800 shadow-xl flex items-center justify-center">
              <Image src="/images/logo/logo-main.webp" alt="Globe Créateur" width={120} height={120} className="h-14 lg:h-18 w-auto dark:hidden" />
              <Image src="/images/logo/logo-alt.webp" alt="Globe Créateur" width={120} height={120} className="h-14 lg:h-18 w-auto hidden dark:block" />
            </div>

            {/* Connecting lines (decorative) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] rounded-full border border-dashed border-indigo-200 dark:border-indigo-800/50 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] lg:w-[560px] lg:h-[560px] rounded-full border border-dashed border-slate-100 dark:border-slate-800/50 pointer-events-none hidden md:block" />

            {/* Expert nodes — grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { icon: "🌐", title: "Développement Web", desc: "Sites performants & sur-mesure" },
                { icon: "📸", title: "Photo & Vidéo", desc: "Contenu visuel professionnel" },
                { icon: "📈", title: "SEO & Référencement", desc: "Visibilité locale & nationale" },
                { icon: "🎨", title: "Design & Branding", desc: "Identité visuelle forte" },
                { icon: "⚡", title: "Automatisation", desc: "Workflows no-code sur-mesure" },
                { icon: "📱", title: "Réseaux Sociaux", desc: "Community management" },
                { icon: "📊", title: "Stratégie Digitale", desc: "Plans d'action mesurables" },
                { icon: "✍️", title: "Rédaction Web", desc: "Contenus qui convertissent" },
              ].map((expert, i) => (
                <div
                  key={i}
                  className="relative z-10 group p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <span className="text-2xl block mb-3 group-hover:scale-110 transition-transform duration-300">{expert.icon}</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{expert.title}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{expert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
