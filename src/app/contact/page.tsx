import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { ContactForm } from "@/components/forms/contact-form"
import { CONTACT } from "@/lib/constants"
import { Mail, MapPin } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Contact — Parlons de votre projet",
  description: "Contactez Globe Créateur pour discuter de votre projet web, SEO ou communication. Réponse sous 24h.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Contact", href: "/contact" }]} />

      <Container className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Contactez-nous</h1>
            <p className="mt-3 text-gray-500">
              Une question, un projet ? Écrivez-nous. Nous répondons sous 24h.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-gray-500 hover:text-primary text-sm transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Adresse</p>
                  <p className="text-gray-500 text-sm">
                    {CONTACT.address.street}
                    <br />
                    {CONTACT.address.zip} {CONTACT.address.city}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={CONTACT.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={CONTACT.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
