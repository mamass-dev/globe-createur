---
description: Vérifier l'indexation des pages du site et soumettre les manquantes
---

Lis `docs/agent-seo/contexte.md`.

1. **Inventaire** : liste toutes les URLs attendues (pages `src/app/*/` + articles `content/blog/` → https://globecreateur.fr/<slug> et /blog/<slug>) + le sitemap (WebFetch https://globecreateur.fr/sitemap.xml — cohérent avec l'inventaire ?)
2. **Détection des non-indexées** : `node scripts/gsc-data.mjs page 90 500` — les pages de l'inventaire qui n'ont AUCUNE impression en 90 jours sont suspectes. Contre-vérifie les suspectes par un `site:globecreateur.fr/<slug>` en WebSearch.
3. **Diagnostic des non-indexées** : orpheline (pas de maillage) ? thin content ? absente du sitemap ? noindex accidentel (grep les metas robots) ?
4. **Actions** : corrige la cause, puis soumets : `node scripts/submit-google-indexing.mjs <url>` + `node scripts/submit-indexnow.mjs <url>`
5. Sortie : tableau (URL, statut, cause, action faite), et le taux d'indexation global du site.
