import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { getServiceBySlug } from "@/lib/data/services"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Button } from "@/components/ui/button"
import { ProcessSteps } from "@/components/sections/process-steps"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { ContactCard } from "@/components/sections/contact-card"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"

const PATH = "/services/agent-ia-entreprise"
const service = getServiceBySlug("agent-ia-entreprise")!

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: PATH,
})

/*
 * Page « Agents IA en entreprise » (2026-10-10).
 * Règles : aucun cas client inventé, aucun chiffre non sourcé. Les exemples sont des tâches,
 * pas des résultats. Le prix du premier agent est sur devis tant qu'Axel n'a pas fixé de grille ;
 * la porte d'entrée chiffrée est le diagnostic flash existant (dispositif-ia.ts).
 */

const EXEMPLES = [
  {
    title: "Le devis dicté depuis le chantier",
    text: "Vous laissez un message vocal en sortant de chez le client. L'agent le transcrit, reprend les prix de votre catalogue, prépare le devis dans votre outil habituel et vous l'envoie à valider. Vous signez d'un clic, le client le reçoit le soir même.",
  },
  {
    title: "Les relances qui s'arrêtent toutes seules",
    text: "Devis envoyé, pas de réponse : relance à J+3, J+10, J+20, avec un ton qui est le vôtre. Dès que le devis est signé ou refusé, l'agent s'arrête. Même mécanique pour les factures impayées, avec un lien de paiement.",
  },
  {
    title: "Le tri des demandes entrantes",
    text: "Formulaire du site, WhatsApp, e-mail : l'agent lit chaque demande, pose les deux questions qui manquent, qualifie (urgent, devis, hors zone) et vous propose une réponse en moins de cinq minutes. Vous validez ou corrigez.",
  },
  {
    title: "Les factures électroniques reçues",
    text: "Depuis septembre 2026, toute entreprise doit pouvoir recevoir des factures électroniques. L'agent les récupère sur votre plateforme, vérifie le fournisseur et le montant attendu, les range et prépare l'export pour votre expert-comptable.",
  },
  {
    title: "Le compte rendu qui devient des tâches",
    text: "Une réunion enregistrée, un rendez-vous client : l'agent produit le compte rendu, extrait les décisions et crée les tâches dans votre outil, assignées aux bonnes personnes, avec les échéances.",
  },
  {
    title: "La base de connaissances interne",
    text: "Procédures, tarifs, fiches techniques, historique des clients : l'agent répond aux questions de l'équipe à partir de vos documents, et uniquement de vos documents. Un nouveau salarié devient autonome plus vite.",
  },
]

const REGLES = [
  { title: "Validation humaine", text: "L'agent prépare, vous validez. Rien ne part vers un client ou un fournisseur sans qu'une personne ait cliqué, tant que vous n'avez pas décidé l'inverse pour une tâche précise." },
  { title: "Données en Europe", text: "Les automatisations tournent sur un serveur hébergé dans l'Union européenne (n8n auto-hébergé ou Make configuré en Europe). Les modèles d'IA sont choisis selon la sensibilité des données traitées." },
  { title: "Accès au strict nécessaire", text: "Chaque agent dispose de ses propres identifiants, limités aux outils dont il a besoin, avec la double authentification. Ces accès sont listés dans un registre remis avec l'installation." },
  { title: "Un journal de tout ce qui a été fait", text: "Chaque action de l'agent est tracée : ce qu'il a lu, ce qu'il a produit, qui a validé. En cas de doute, vous remontez le fil en deux minutes." },
  { title: "Versions figées, mises à jour testées", text: "Une automatisation ne doit pas casser après une mise à jour de l'outil. Les versions sont figées, les mises à jour sont testées sur une copie avant d'être appliquées." },
  { title: "Vos outils d'abord", text: "On part de ce que vous payez déjà (devis, facturation, agenda, messagerie). Pas de nouvel abonnement sans une raison chiffrée." },
]

const ETAPES = [
  { number: "01", title: "Audit temps perdu", description: "Une heure avec vous, dans votre entreprise. On liste les tâches répétitives, on chiffre le temps qu'elles prennent par semaine et on en retient trois : celles qui coûtent le plus et se prêtent le mieux à un agent." },
  { number: "02", title: "Prototype sur une seule tâche", description: "En deux semaines, un premier agent sur la tâche la plus rentable, branché sur vos vrais outils, testé avec vous sur de vraies demandes. S'il ne tient pas ses promesses, on arrête là." },
  { number: "03", title: "Installation et formation", description: "Mise en service, accès sécurisés, registre des accès, journal d'activité. Une prise en main d'une heure pour l'équipe, avec une fiche d'une page : ce que fait l'agent, ce qu'il ne fait pas, qui valide." },
  { number: "04", title: "Suivi mensuel", description: "Surveillance avec alerte en cas d'erreur, mises à jour testées, ajustements selon ce que l'agent a réellement traité dans le mois. Le rapport compte les heures gagnées et les demandes traitées." },
]

const FAQ = [
  { question: "C'est quoi, concrètement, un agent IA ?", answer: "Un logiciel qui reçoit une demande (un message vocal, un e-mail, un formulaire), utilise vos outils (devis, agenda, facturation, messagerie) et exécute une tâche de bout en bout, en vous demandant validation aux étapes qui comptent. La différence avec un chatbot : il ne se contente pas de répondre, il fait le travail." },
  { question: "Mes données partent-elles chez OpenAI ou aux États-Unis ?", answer: "Pas par défaut. Les automatisations tournent sur un serveur hébergé en Europe, et le choix du modèle d'IA dépend des données : pour des documents sensibles, on utilise un modèle hébergé en Europe ou en local. Tout est écrit dans le registre remis avec l'installation, que votre expert-comptable ou votre conseil peut relire." },
  { question: "Combien ça coûte ?", answer: "L'audit temps perdu fait partie du diagnostic flash à 690 € HT, qui vous donne les trois tâches à automatiser et leur gain estimé. Le premier agent est chiffré sur devis après cet audit, en fonction des outils à relier. Le suivi mensuel est un abonnement, chiffré sur le même devis. Vous savez tout avant de commencer." },
  { question: "Et si l'agent se trompe ?", answer: "C'est pour ça qu'il y a une validation humaine sur tout ce qui sort de l'entreprise, et un journal de chaque action. En phase de prototype, vous relisez tout. Ensuite, vous décidez tâche par tâche ce qui peut partir sans relecture." },
  { question: "Faut-il changer nos logiciels ?", answer: "Non. On relie ce que vous utilisez déjà. Si un outil ne permet aucune connexion, on vous le dit pendant l'audit, et on vous propose une alternative seulement si le gain le justifie." },
  { question: "La facture électronique, c'est obligatoire quand ?", answer: "Depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques. L'obligation d'en émettre s'applique déjà aux grandes entreprises et aux ETI, et s'appliquera aux PME, TPE et micro-entreprises au 1er septembre 2027. Un agent peut prendre en charge la réception, le contrôle et le classement dès maintenant." },
  { question: "Vous intervenez où ?", answer: "Dijon et la Bourgogne-Franche-Comté sur place pour l'audit et l'installation, à distance pour le suivi. Les agents eux-mêmes fonctionnent où que vous soyez." },
]

export default function AgentIaEntreprisePage() {
  return (
    <>
      <ServiceSchema name={service.title} description={service.metaDescription} url={PATH} />
      <FaqSchema items={FAQ} />

      <Breadcrumb
        items={[
          { name: "Services", href: "/services" },
          { name: "Agents IA en entreprise", href: PATH },
        ]}
      />

      {/* 1. Hero */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-signal text-xs font-bold uppercase tracking-[0.2em] font-mono-accent">
              <span className="h-[3px] w-6 bg-signal" />
              Agents IA en entreprise
            </span>
            <h1 className="text-impact mt-6 text-4xl sm:text-5xl lg:text-7xl text-ivory">
              Un assistant qui fait le travail, pas un chatbot qui en parle.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-aluminium leading-relaxed max-w-2xl">
              Devis dictés, relances, tri des demandes, factures électroniques : on installe dans votre
              entreprise un agent IA qui exécute une tâche de bout en bout avec vos outils, sous votre
              validation. Installé chez vous, données en Europe, suivi chaque mois.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/devis?service=agent-ia-entreprise" size="lg" track={{ event: "cta_click", props: { cta: "devis", location: "agent-ia-hero" } }}>
                Demander l&apos;audit temps perdu
              </Button>
              <Button href="/services/diagnostic-ia-pme" size="lg" variant="outline">
                Voir le diagnostic IA
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Le constat */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">Le constat</span>
              <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">
                Le temps d&apos;un dirigeant de PME part dans des tâches qu&apos;une machine peut préparer
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="space-y-5 text-aluminium leading-relaxed">
                <p>
                  Les devis à rédiger le soir, les relances qu&apos;on oublie, les demandes de contact qui
                  attendent deux jours, les factures à ressaisir pour le comptable. Ce ne sont pas des
                  tâches difficiles. Ce sont des tâches répétitives, et elles tombent toujours sur la même
                  personne : vous.
                </p>
                <p>
                  Un agent IA ne remplace pas un salarié. Il prend la partie préparatoire de ces tâches, celle
                  qui ne demande aucune décision, et vous laisse la décision. Un devis pré-rempli à valider
                  plutôt qu&apos;un devis à écrire. Une réponse proposée plutôt qu&apos;une demande en attente.
                </p>
                <p>
                  La condition pour que ça tienne : un cadre. Des accès limités, des données qui restent en
                  Europe, un journal de ce que l&apos;agent a fait, et quelqu&apos;un qui le surveille chaque mois.
                  C&apos;est ce cadre qu&apos;on installe avec l&apos;agent, et c&apos;est ce qui manque dans la
                  plupart des essais faits « vite fait sur ChatGPT ».
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* 3. Exemples de tâches */}
      <section className="py-20 lg:py-28">
        <Container>
          <AnimateOnScroll className="max-w-3xl mb-12">
            <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">Ce qu&apos;un agent peut prendre en charge</span>
            <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">Six tâches qu&apos;on installe le plus souvent</h2>
            <p className="mt-4 text-aluminium">Ce sont des tâches, pas des promesses de résultat : le gain réel se mesure pendant le prototype, sur vos vraies demandes.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1c1c1c] border border-[#1c1c1c]">
            {EXEMPLES.map((e) => (
              <AnimateOnScroll key={e.title} className="bg-[#0a0a0a] p-6 lg:p-8">
                <h3 className="text-xl font-display font-bold text-ivory">{e.title}</h3>
                <p className="mt-3 text-sm text-aluminium leading-relaxed">{e.text}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Règles */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <AnimateOnScroll className="max-w-3xl mb-12">
            <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">Le cadre</span>
            <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">Six règles, écrites dans le devis</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {REGLES.map((r) => (
              <AnimateOnScroll key={r.title}>
                <h3 className="text-lg font-bold text-ivory">{r.title}</h3>
                <p className="mt-2 text-sm text-aluminium leading-relaxed">{r.text}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Méthode */}
      <ProcessSteps
        title="Comment ça se passe"
        subtitle="De l'audit d'une heure au suivi mensuel. On arrête après le prototype si le gain n'est pas là."
        badge="Méthode"
        steps={ETAPES}
      />

      {/* 6. Lien avec l'offre de communication */}
      <Container className="py-12 max-w-3xl">
        <p className="text-aluminium leading-relaxed">
          Les agents s&apos;installent seuls ou dans le cadre de notre{" "}
          <Link href="/forfait-communication-pme" className="font-bold text-ivory hover:text-signal">forfait communication</Link>,
          où ils prennent en charge la réponse aux demandes entrantes et les relances générées par le site. Le{" "}
          <Link href="/services/diagnostic-ia-pme" className="font-bold text-ivory hover:text-signal">diagnostic IA</Link>{" "}
          reste la bonne porte d&apos;entrée si vous voulez d&apos;abord une vue d&apos;ensemble, et l&apos;
          <Link href="/services/automatisation-nocode-dijon" className="font-bold text-ivory hover:text-signal">automatisation no-code</Link>{" "}
          couvre les enchaînements simples qui ne demandent pas d&apos;IA.
        </p>
      </Container>

      <ContactCard city="Dijon" />

      <FaqAccordion
        title="Questions fréquentes"
        subtitle="Ce qu'on nous demande avant d'installer un agent."
        items={FAQ}
      />
    </>
  )
}
