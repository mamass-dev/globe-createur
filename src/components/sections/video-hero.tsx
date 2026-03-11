"use client"

import { useState } from "react"
import Image from "next/image"

type VideoHeroProps = {
  videoId: string
  poster?: string
}

export function VideoHero({ videoId, poster }: VideoHeroProps) {
  const [active, setActive] = useState(false)

  return (
    <div className="relative group">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-100 dark:shadow-indigo-950/50 border border-slate-100 dark:border-slate-800 aspect-video bg-slate-900">
        {/* Thumbnail — lazy loaded, no iframe until click */}
        {!active && (
          <>
            <Image
              src={poster ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Globe Créateur — Showreel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <button
              onClick={() => setActive(true)}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/30 transition-colors duration-500"
            >
              <div className="relative">
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                {/* Button */}
                <div className="relative h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-white/90 dark:bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <svg className="h-6 w-6 lg:h-8 lg:w-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-lg">
                Regarder la vidéo
              </span>
            </button>
          </>
        )}

        {/* Full player — loaded only on click */}
        {active && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Globe Créateur — Présentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    </div>
  )
}
