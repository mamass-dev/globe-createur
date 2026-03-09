import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/constants"

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité de ${SITE_NAME}. Traitement des données personnelles, droits des utilisateurs et gestion des cookies.`,
  path: "/politique-confidentialite",
})

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Politique de confidentialité", href: "/politique-confidentialite" },
        ]}
      />

      <Container className="py-12 lg:py-20 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Politique de confidentialité
        </h1>

        <div className="prose max-w-none">
          <p>
            La présente politique de confidentialité décrit comment{" "}
            <strong>{SITE_NAME}</strong> collecte, utilise et protège les
            données personnelles des utilisateurs du site{" "}
            <strong>{SITE_URL}</strong>, conformément au Règlement Général sur
            la Protection des Données (RGPD) et à la loi Informatique et
            Libertés.
          </p>

          <h2>1. Responsable du traitement</h2>
          <ul>
            <li><strong>Identité :</strong> Axel Masson - {SITE_NAME}</li>
            <li>
              <strong>Adresse :</strong> {CONTACT.address.street},{" "}
              {CONTACT.address.zip} {CONTACT.address.city}
            </li>
            <li>
              <strong>Email :</strong>{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
          </ul>

          <h2>2. Données collectées</h2>
          <p>
            Nous collectons uniquement les données que vous nous transmettez
            volontairement via les formulaires du site :
          </p>
          <ul>
            <li>
              <strong>Formulaire de contact :</strong> nom, adresse email, message
            </li>
            <li>
              <strong>Formulaire de devis :</strong> nom, adresse email,
              nom de l&apos;entreprise (optionnel),
              type de service souhaité, budget estimé, description du projet
            </li>
          </ul>
          <p>
            Aucune donnée n&apos;est collectée automatiquement à votre insu. Nous ne
            collectons pas de données sensibles (origine ethnique, opinions
            politiques, données de santé, etc.).
          </p>

          <h2>3. Finalités du traitement</h2>
          <p>Les données collectées sont utilisées pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact et de devis</li>
            <li>Vous adresser une proposition commerciale personnalisée</li>
            <li>Assurer le suivi de la relation commerciale</li>
            <li>Améliorer nos services et l&apos;expérience utilisateur du site</li>
          </ul>
          <p>
            <strong>
              Vos données ne sont jamais vendues, louées ou partagées avec des
              tiers à des fins commerciales.
            </strong>
          </p>

          <h2>4. Base légale du traitement</h2>
          <ul>
            <li>
              <strong>Consentement :</strong> lorsque vous remplissez un
              formulaire de contact ou de devis, vous consentez au traitement
              de vos données pour la finalité indiquée.
            </li>
            <li>
              <strong>Intérêt légitime :</strong> amélioration du site et de
              nos services.
            </li>
            <li>
              <strong>Exécution contractuelle :</strong> suivi des projets en
              cours avec nos clients.
            </li>
          </ul>

          <h2>5. Durée de conservation</h2>
          <ul>
            <li>
              <strong>Données de contact et devis :</strong> 3 ans à compter
              du dernier échange
            </li>
            <li>
              <strong>Données clients :</strong> durée de la relation
              contractuelle + 3 ans après la fin du contrat
            </li>
            <li>
              <strong>Cookies :</strong> 13 mois maximum
            </li>
          </ul>

          <h2>6. Destinataires des données</h2>
          <p>
            Vos données peuvent être transmises aux prestataires techniques
            suivants, dans le strict cadre de leur mission :
          </p>
          <ul>
            <li>
              <strong>Vercel Inc.</strong> - Hébergement du site (serveurs aux
              États-Unis, clauses contractuelles types UE-US)
            </li>
            <li>
              <strong>Resend</strong> - Envoi des emails transactionnels
              (notifications de formulaires)
            </li>
          </ul>
          <p>
            Ces prestataires agissent en qualité de sous-traitants et sont
            soumis à des obligations contractuelles de confidentialité et de
            sécurité.
          </p>

          <h2>7. Cookies</h2>
          <p>Le site peut utiliser les types de cookies suivants :</p>
          <ul>
            <li>
              <strong>Cookies strictement nécessaires :</strong> assurent le
              fonctionnement technique du site (aucun consentement requis)
            </li>
            <li>
              <strong>Cookies de mesure d&apos;audience :</strong> permettent de
              mesurer la fréquentation du site et d&apos;identifier les contenus
              les plus consultés (soumis à consentement)
            </li>
          </ul>
          <p>
            Aucun cookie publicitaire ou de suivi marketing n&apos;est utilisé sur
            ce site.
          </p>

          <h2>8. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants sur vos
            données personnelles :
          </p>
          <ul>
            <li>
              <strong>Droit d&apos;accès :</strong> obtenir la confirmation que des
              données vous concernant sont traitées et en recevoir une copie
            </li>
            <li>
              <strong>Droit de rectification :</strong> demander la correction
              de données inexactes ou incomplètes
            </li>
            <li>
              <strong>Droit à l&apos;effacement :</strong> demander la suppression
              de vos données dans les conditions prévues par le RGPD
            </li>
            <li>
              <strong>Droit à la limitation :</strong> demander la limitation
              du traitement de vos données
            </li>
            <li>
              <strong>Droit à la portabilité :</strong> recevoir vos données
              dans un format structuré et lisible par machine
            </li>
            <li>
              <strong>Droit d&apos;opposition :</strong> vous opposer au traitement
              de vos données pour des motifs légitimes
            </li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous par email à{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Nous nous
            engageons à répondre dans un délai de 30 jours.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            introduire une réclamation auprès de la{" "}
            <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et
            des Libertés) - <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
          </p>

          <h2>9. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données personnelles contre tout
            accès non autorisé, altération, divulgation ou destruction :
          </p>
          <ul>
            <li>Chiffrement HTTPS sur l&apos;ensemble du site</li>
            <li>Accès restreint aux données par authentification</li>
            <li>Hébergement sur des infrastructures sécurisées (Vercel)</li>
            <li>Aucune donnée bancaire collectée ou stockée</li>
          </ul>

          <h2>10. Modifications</h2>
          <p>
            La présente politique de confidentialité peut être mise à jour à
            tout moment. En cas de modification substantielle, un avis sera
            publié sur le site. La date de dernière mise à jour figure
            ci-dessous.
          </p>

          <p className="text-sm text-gray-400 mt-8">
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </Container>
    </>
  )
}
