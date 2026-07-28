import Image from "next/image"
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/lib/cl-racing"

export function CLRGallery() {
  const [featured, ...rest] = GALLERY_PHOTOS

  return (
    <section id="galerie" className="relative py-24 md:py-32 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-[11px]">
              <span className="h-px w-8 bg-indigo-600 dark:bg-indigo-400" />
              Galerie · roulages CL Racing
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mt-4 leading-[1.05] text-slate-900 dark:text-white">
              Le rendu sur la piste
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mt-5 leading-relaxed">
              Quelques exemples de prises de vue récentes — action en virage, panning, détails et
              ambiance paddock. Chaque pilote reçoit l&apos;intégralité des photos réussies de ses
              sessions.
            </p>
          </div>
          <a
            href="#reservation"
            className="shrink-0 self-start md:self-end inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            Réserver mes photos
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
          <PhotoCard
            photo={featured}
            className="lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[560px]"
            featured
          />
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4">
            {rest.slice(0, 4).map((photo) => (
              <PhotoCard
                key={photo.src}
                photo={photo}
                className={photo.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"}
              />
            ))}
          </div>
        </div>

        {rest.length > 4 && (
          <div className="mt-3 md:mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {rest.slice(4).map((photo) => (
              <PhotoCard
                key={photo.src}
                photo={photo}
                className={photo.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"}
              />
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white text-xl shrink-0">
              📷
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Plus de 500 photos livrées aux pilotes en 2026
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                La galerie complète est partagée en privé après chaque roulage.
              </p>
            </div>
          </div>
          <a
            href="#reservation"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all uppercase tracking-widest"
          >
            Réserver
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

type PhotoCardProps = {
  photo: GalleryPhoto
  className?: string
  featured?: boolean
}

function PhotoCard({ photo, className = "", featured = false }: PhotoCardProps) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={
          featured
            ? "(min-width: 1024px) 60vw, 100vw"
            : "(min-width: 1024px) 22vw, (min-width: 768px) 50vw, 50vw"
        }
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute top-3 right-3 z-10">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm ${
            photo.tag === "Action"
              ? "bg-gradient-to-r from-indigo-600 to-violet-500 text-white"
              : photo.tag === "Détail"
                ? "bg-white/90 text-slate-900 border border-white/40"
                : "bg-slate-900/80 text-white border border-white/20"
          }`}
        >
          {photo.tag}
        </span>
      </div>

      <figcaption
        className={`absolute left-3 right-3 z-10 ${featured ? "bottom-4 md:bottom-6 md:left-6 md:right-6" : "bottom-3"}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-white/80 font-bold">
          Circuit de Vaison · 2026
        </div>
        {featured && (
          <div className="mt-2 text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight max-w-md">
            Trajectoires capturées en haute définition
          </div>
        )}
      </figcaption>
    </figure>
  )
}
