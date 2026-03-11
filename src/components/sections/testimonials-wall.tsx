"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import type { Temoignage } from "@/lib/data/temoignages"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const h = size === "sm" ? "h-4 w-4" : "h-3 w-3"
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`${h} ${i < rating ? "text-amber-400" : "text-slate-200 dark:text-slate-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function SourceBadge({ source }: { source: "google" | "internal" }) {
  if (source === "google") {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
        <GoogleIcon className="h-3 w-3" />
        Google
      </div>
    )
  }
  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-800 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Client vérifié
    </div>
  )
}

function TestimonialCard({ review, featured }: { review: Temoignage; featured?: boolean }) {
  return (
    <div
      className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured
          ? "bg-indigo-600 dark:bg-indigo-500 border-indigo-500 dark:border-indigo-400 text-white"
          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
      }`}
    >
      {/* Quote mark */}
      <svg
        className={`h-8 w-8 mb-4 ${featured ? "text-indigo-400" : "text-indigo-100 dark:text-slate-700"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
      </svg>

      {/* Content */}
      <p className={`text-sm leading-relaxed mb-5 ${featured ? "text-indigo-50" : "text-slate-600 dark:text-slate-300"}`}>
        {review.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar initial */}
          <div
            className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              featured
                ? "bg-white/20 text-white"
                : "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
            }`}
          >
            {review.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-bold truncate ${featured ? "text-white" : "text-slate-900 dark:text-white"}`}>
              {review.name}
            </p>
            {review.company && (
              <p className={`text-xs truncate ${featured ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"}`}>
                {review.company}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Stars rating={review.rating} size="xs" />
          <SourceBadge source={review.source} />
        </div>
      </div>
    </div>
  )
}

export function TestimonialsWall({ reviews }: { reviews: Temoignage[] }) {
  const [showAll, setShowAll] = useState(false)

  const withContent = reviews.filter((r) => r.content.length > 0)
  const googleCount = reviews.filter((r) => r.source === "google").length
  const internalCount = reviews.filter((r) => r.source === "internal").length
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  // Show 6 by default, all on click
  const visible = showAll ? withContent : withContent.slice(0, 6)

  // Split into 3 columns for masonry effect
  const cols: Temoignage[][] = [[], [], []]
  visible.forEach((r, i) => cols[i % 3].push(r))

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Témoignages
          </h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            Ce que nos clients <br />disent de nous.
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Des retours authentiques, récoltés sur Google et auprès de nos clients.
          </p>
        </div>

        {/* Trust indicators bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          {/* Average rating */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{avgRating}</span>
            <div>
              <Stars rating={Math.round(Number(avgRating))} />
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">note moyenne</p>
            </div>
          </div>

          {/* Google count */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
            <GoogleIcon className="h-5 w-5" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{googleCount} avis</p>
              <p className="text-[10px] text-slate-400 font-medium">Google Reviews</p>
            </div>
          </div>

          {/* Internal count (show only if > 0) */}
          {internalCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
              <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{internalCount} avis</p>
                <p className="text-[10px] text-slate-400 font-medium">Clients vérifiés</p>
              </div>
            </div>
          )}

          {/* 100% satisfaction */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">100%</p>
              <p className="text-[10px] text-slate-400 font-medium">recommandent</p>
            </div>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {visible.map((review, i) => (
            <div key={`${review.name}-${i}`} className="break-inside-avoid">
              <TestimonialCard review={review} featured={review.featured} />
            </div>
          ))}
        </div>

        {/* Show more */}
        {!showAll && withContent.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
            >
              Voir tous les avis ({withContent.length})
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
