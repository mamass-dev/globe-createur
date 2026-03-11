import Image from "next/image"
import type { Author } from "@/lib/data/authors"

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex items-start gap-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
      <Image
        src={author.avatar}
        alt={author.name}
        width={64}
        height={64}
        className="h-16 w-16 rounded-full object-cover shrink-0"
      />
      <div className="space-y-1.5">
        <p className="text-base font-bold text-slate-900 dark:text-white">{author.name}</p>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{author.role}</p>
        {author.bio && (
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{author.bio}</p>
        )}
        {author.socials && (
          <div className="flex items-center gap-3 pt-2">
            {author.socials.linkedin && (
              <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {author.socials.twitter && (
              <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            )}
            {author.socials.website && (
              <a href={author.socials.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-4.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.727-3.558"/></svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
