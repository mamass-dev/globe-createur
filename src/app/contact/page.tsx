import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Container } from "@/components/ui/container"
import { ContactForm } from "@/components/forms/contact-form"
import { CONTACT } from "@/lib/constants"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Mail, MapPin, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Contact - Parlons de votre projet",
  description: "D&eacute;marrez votre transformation digitale avec Globe Cr&eacute;ateur. R&eacute;ponse sous 24h.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 pt-32 pb-24 lg:pt-48 lg:pb-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           {/* LEFT COLUMN - Info */}
           <div className="space-y-12">
              <div className="space-y-6">
                 <h1 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Contactez-nous</h1>
                 <h2 className="text-4xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    Commen&ccedil;ons &agrave; construire <br /> <span className="text-gradient">votre succès.</span>
                 </h2>
                 <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                    Vous avez un projet en t&ecirc;te ou vous souhaitez simplement en savoir plus sur nos services ? Parlons-en.
                 </p>
              </div>

              <div className="space-y-10">
                 <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-700">
                       <Mail className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Email</p>
                       <a href={`mailto:${CONTACT.email}`} className="text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {CONTACT.email}
                       </a>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-700">
                       <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Adresse</p>
                       <p className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                          {CONTACT.address.street} <br />
                          {CONTACT.address.zip} {CONTACT.address.city}
                       </p>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-indigo-50 dark:bg-indigo-950/50 rounded-3xl space-y-4">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <p className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">R&eacute;ponse sous 24h</p>
                 </div>
                 <p className="text-sm text-indigo-700/70 dark:text-indigo-400/70 leading-relaxed">
                    Nous &eacute;valuons chaque demande avec soin et vous recontactons rapidement pour planifier un premier &eacute;change.
                 </p>
              </div>
           </div>

           {/* RIGHT COLUMN - Form Card */}
           <div className="bg-white dark:bg-slate-800 p-10 lg:p-16 rounded-[3rem] shadow-2xl shadow-indigo-100 dark:shadow-indigo-950 border border-slate-100 dark:border-slate-700">
              <AnimateOnScroll delay={0.2}>
                 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Envoyez-nous un message</h3>
                 <ContactForm />
              </AnimateOnScroll>
           </div>
        </div>
      </Container>
    </section>
  )
}
