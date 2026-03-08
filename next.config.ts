import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // Fusion site-web-pme → création-site-internet-dijon
      { source: "/services/site-web-pme", destination: "/services/creation-site-internet-dijon", permanent: true },
      { source: "/services/site-web-pme/", destination: "/services/creation-site-internet-dijon", permanent: true },
      // Ancienne page création → fusion
      { source: "/creation-site-internet-pme", destination: "/services/creation-site-internet-dijon", permanent: true },
      { source: "/creation-site-internet-pme/", destination: "/services/creation-site-internet-dijon", permanent: true },
      // Pages copy-copy (erreurs WordPress)
      { source: "/services/site-web-pme-copy-copy", destination: "/services/creation-site-internet-dijon", permanent: true },
      { source: "/services/site-web-pme-copy-copy/", destination: "/services/creation-site-internet-dijon", permanent: true },
      // Externaliser → forfait
      { source: "/externaliser-communication-pme", destination: "/forfait-communication-pme", permanent: true },
      { source: "/externaliser-communication-pme/", destination: "/forfait-communication-pme", permanent: true },
      // Anciennes pages services vers nouvelles
      { source: "/services/photo-video-pme", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/photo-video-pme/", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/design-graphique-pme", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/design-graphique-pme/", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/reseaux-sociaux-pme", destination: "/services/support-communication-pme", permanent: true },
      { source: "/services/reseaux-sociaux-pme/", destination: "/services/support-communication-pme", permanent: true },
      // Anciennes pages services copy-copy WordPress
      { source: "/services/service-creation-de-contenu-copy-copy", destination: "/services/automatisation-nocode-dijon", permanent: true },
      { source: "/services/service-creation-de-contenu-copy-copy/", destination: "/services/automatisation-nocode-dijon", permanent: true },
      { source: "/services/service-creation-de-contenu-copy-copy-copy", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/service-creation-de-contenu-copy-copy-copy/", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/service-creation-de-contenu-copy-copy-2", destination: "/services/seo-local-dijon", permanent: true },
      { source: "/services/service-creation-de-contenu-copy-copy-2/", destination: "/services/seo-local-dijon", permanent: true },
      { source: "/services/service-creation-de-contenu-copy-copy-3", destination: "/services/support-communication-pme", permanent: true },
      { source: "/services/service-creation-de-contenu-copy-copy-3/", destination: "/services/support-communication-pme", permanent: true },
      // Anciennes pages contenu/video
      { source: "/creation-contenu-pme", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/creation-contenu-pme/", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/service-creation-de-contenu/video-reels", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/services/service-creation-de-contenu/video-reels/", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/video-reels", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/video-reels/", destination: "/services/creation-contenu-pme", permanent: true },
      { source: "/portfolio-video", destination: "/projets", permanent: true },
      { source: "/portfolio-video/", destination: "/projets", permanent: true },
      // Anciennes pages support/site-web
      { source: "/support-communication-pme", destination: "/services/support-communication-pme", permanent: true },
      { source: "/support-communication-pme/", destination: "/services/support-communication-pme", permanent: true },
      { source: "/site-web-pme", destination: "/services/creation-site-internet-dijon", permanent: true },
      { source: "/site-web-pme/", destination: "/services/creation-site-internet-dijon", permanent: true },
      // Anciens slugs projets WordPress
      { source: "/domaine-arnaut-boue-documentaire", destination: "/projets/domaine-arnaut-boue", permanent: true },
      { source: "/domaine-arnaut-boue-documentaire/", destination: "/projets/domaine-arnaut-boue", permanent: true },
      { source: "/body-cherie-creation-dune-landing-page-optimisee-pour-la-conversion", destination: "/projets/body-cherie", permanent: true },
      { source: "/body-cherie-creation-dune-landing-page-optimisee-pour-la-conversion/", destination: "/projets/body-cherie", permanent: true },
      { source: "/leet-design-dune-application-mobile-moderne-et-intuitive", destination: "/projets/leet-app", permanent: true },
      { source: "/leet-design-dune-application-mobile-moderne-et-intuitive/", destination: "/projets/leet-app", permanent: true },
      { source: "/helite-airbag-shooting-photo-pour-une-nouvelle-collection", destination: "/projets/helite-airbag", permanent: true },
      { source: "/helite-airbag-shooting-photo-pour-une-nouvelle-collection/", destination: "/projets/helite-airbag", permanent: true },
      { source: "/motorfest-dijon-photographie-officielle-de-levenement-automobile", destination: "/projets/motorfest-dijon", permanent: true },
      { source: "/motorfest-dijon-photographie-officielle-de-levenement-automobile/", destination: "/projets/motorfest-dijon", permanent: true },
      // Ancien article blog WordPress
      { source: "/combien-coute-un-site-vitrine-a-dijon-en-2025", destination: "/blog/combien-coute-site-vitrine-dijon", permanent: true },
      { source: "/combien-coute-un-site-vitrine-a-dijon-en-2025/", destination: "/blog/combien-coute-site-vitrine-dijon", permanent: true },
      // Anciennes pages WordPress (niveau racine)
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/faqs/", destination: "/faq", permanent: true },
      { source: "/accueil-2", destination: "/", permanent: true },
      { source: "/accueil-2/", destination: "/", permanent: true },
      // MetForm wildcard
      { source: "/metform-form/:path*", destination: "/contact", permanent: true },
      // Feed RSS
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/feed/", destination: "/blog", permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
