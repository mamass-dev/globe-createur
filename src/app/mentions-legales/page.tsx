import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/constants"

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${SITE_NAME}. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.`,
  path: "/mentions-legales",
})

export default function MentionsLegalesPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Mentions légales", href: "/mentions-legales" }]} />

      <Container className="py-12 lg:py-20 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Mentions légales
        </h1>

        <div className="prose max-w-none">
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la loi
            n°2004-575 du 21 juin 2004 pour la Confiance dans l&apos;Économie
            Numérique (LCEN), les présentes mentions légales sont portées à la
            connaissance des utilisateurs du site <strong>{SITE_URL}</strong>.
          </p>

          <h2>1. Éditeur du site</h2>
          <ul>
            <li><strong>Raison sociale :</strong> {SITE_NAME}</li>
            <li><strong>Forme juridique :</strong> Entreprise individuelle</li>
            <li><strong>Responsable de la publication :</strong> Axel Masson</li>
            <li>
              <strong>Adresse :</strong> {CONTACT.address.street},{" "}
              {CONTACT.address.zip} {CONTACT.address.city}
            </li>
            <li>
              <strong>Email :</strong>{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li><strong>SIRET :</strong> [À compléter]</li>
          </ul>

          <h2>2. Hébergeur</h2>
          <ul>
            <li><strong>Raison sociale :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
            <li><strong>Site web :</strong> vercel.com</li>
          </ul>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur le site {SITE_URL} (textes,
            images, photographies, vidéos, logos, icônes, sons, logiciels, mises
            en page, bases de données) est protégé par le droit d&apos;auteur et le
            droit de la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite sauf autorisation écrite
            préalable d&apos;Axel Masson.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l&apos;un quelconque des
            éléments qu&apos;il contient sera considérée comme constitutive d&apos;une
            contrefaçon et poursuivie conformément aux dispositions des
            articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
          </p>

          <h2>4. Limitation de responsabilité</h2>
          <p>
            {SITE_NAME} s&apos;efforce de fournir des informations aussi précises que
            possible sur le site. Toutefois, il ne pourra être tenu responsable
            des omissions, des inexactitudes et des carences dans la mise à jour,
            qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui
            fournissent ces informations.
          </p>
          <p>
            Toutes les informations indiquées sur le site sont données à titre
            indicatif et sont susceptibles d&apos;évoluer. Par ailleurs, les
            renseignements figurant sur le site ne sont pas exhaustifs. Ils sont
            donnés sous réserve de modifications ayant été apportées depuis leur
            mise en ligne.
          </p>

          <h2>5. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens hypertextes vers d&apos;autres sites
            internet. {SITE_NAME} n&apos;exerce aucun contrôle sur ces sites et
            décline toute responsabilité quant à leur contenu ou aux éventuels
            traitements de données personnelles qu&apos;ils effectuent.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Le site {SITE_URL} peut utiliser des cookies à des fins de mesure
            d&apos;audience et d&apos;amélioration de l&apos;expérience utilisateur. Pour plus
            d&apos;informations sur l&apos;utilisation des cookies et le traitement de vos
            données personnelles, consultez notre{" "}
            <a href="/politique-confidentialite">politique de confidentialité</a>.
          </p>

          <h2>7. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français.
            En cas de litige, et après tentative de résolution amiable, les
            tribunaux français seront seuls compétents.
          </p>

          <p className="text-sm text-gray-400 mt-8">
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </Container>
    </>
  )
}
