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
