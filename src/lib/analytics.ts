/**
 * Événements de conversion → Rybbit (stats.globecreateur.fr).
 * Le script Rybbit expose `window.rybbit.event(name, props)`. No-op côté serveur
 * ou si le script n'est pas chargé (site id absent, bloqueur…).
 *
 * Taxonomie (props en snake_case, valeurs simples) :
 * - tool_result   { tool, score? }                        → un outil a produit un résultat
 * - lead_submit   { form, source?, service?, budget?… }   → un formulaire a été envoyé avec succès
 * - lead_error    { form }                                → envoi échoué (API / réseau)
 * - cta_click     { cta, location }                       → via data-rybbit-event sur les liens (Button track=…)
 * - whatsapp_click{ location }
 * - signature_copied
 */
import { track as vercelTrack } from "@vercel/analytics"

export type TrackProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    rybbit?: { event: (name: string, props?: TrackProps) => void }
  }
}

export function track(name: string, props?: TrackProps) {
  if (typeof window === "undefined") return
  try {
    window.rybbit?.event(name, props)
    vercelTrack(name, props)
  } catch {
    /* analytics ne doit jamais casser l'UI */
  }
}

/** Attributs data-* pour tracer un clic sur un lien/bouton sans JS (lus par le script Rybbit). */
export function trackAttrs(event: string, props?: Record<string, string>) {
  const attrs: Record<string, string> = { "data-rybbit-event": event }
  for (const [k, v] of Object.entries(props ?? {})) attrs[`data-rybbit-prop-${k}`] = v
  return attrs
}
