import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { ContactForm } from "@/components/forms/contact-form"
import { CONTACT } from "@/lib/constants"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

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
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Contacter Globe Créateur</h1>
            <p className="mt-3 text-gray-500">
              Discutons de vos idées et de vos besoins en visio, par mail, ou autour d&apos;un café à Dijon.
              Appel découverte de 20 minutes gratuit — retour sous 24h.
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
                  <p className="text-xs text-gray-300 mt-0.5">Réponse en moins de 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Téléphone</p>
                  <a href={`tel:${CONTACT.phone}`} className="text-gray-500 hover:text-primary text-sm transition-colors">
                    {CONTACT.phone.replace("+33", "0").replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}
                  </a>
                  <p className="text-xs text-gray-300 mt-0.5">Du lundi au vendredi, 9h-18h</p>
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
                  <p className="text-xs text-gray-300 mt-0.5">Sur rendez-vous uniquement</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Zone d&apos;intervention</p>
                  <p className="text-gray-500 text-sm">
                    Dijon, Beaune, Talant, Chenôve et toute la Côte-d&apos;Or.
                    <br />
                    Accompagnement à distance dans toute la France.
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
