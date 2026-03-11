"use client"

import { useEffect, useState } from "react"
import type { Temoignage } from "@/lib/data/temoignages"

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-slate-200 dark:text-slate-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function GoogleReviewsBadge({ reviews }: { reviews: Temoignage[] }) {
  const [current, setCurrent] = useState(0)

  // Only rotate through reviews that have content
  const reviewsWithContent = reviews.filter((r) => r.content.length > 0)

  useEffect(() => {
    if (reviewsWithContent.length === 0) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviewsWithContent.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [reviewsWithContent.length])

  const review = reviewsWithContent[current]
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 shadow-sm">
      {/* Google icon + rating */}
      <div className="flex items-center gap-3 shrink-0">
        <svg className="h-6 w-6" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{avgRating}</span>
            <Stars rating={Math.round(Number(avgRating))} />
          </div>
          <span className="text-[11px] text-slate-400 font-medium">{reviews.length} avis Google</span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

      {/* Rotating review excerpt — fixed height to prevent layout shift */}
      {review && (
        <div key={current} className="hidden sm:block w-56 overflow-hidden animate-fade-in">
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed h-[2.5rem]">
            &laquo; {review.content} &raquo;
          </p>
          <p className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5 truncate">
            {review.name}{review.company ? `, ${review.company}` : ""}
          </p>
        </div>
      )}
    </div>
  )
}
