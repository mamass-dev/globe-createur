---
description: Générer concrètement des pages programmatiques dans le repo (à partir d'un template validé)
argument-hint: <template> <cibles (ex. "villes: sens, troyes" ou "métiers: restaurateur, artisan")>
---

Lis `docs/agent-seo/contexte.md`. Demande : $ARGUMENTS

⚠️ Prérequis : un template validé via `/modeles-pseo`. Jamais de génération en masse sans spec.

1. Pour CHAQUE page à générer : collecte d'abord les données uniques (recherche web : tissu économique local, spécificités du métier, concurrence locale) — si les données uniques représentent <40 % de la page, NE LA GÉNÈRE PAS (thin content = danger pour tout le site)
2. Génère la page dans `src/app/<slug>/page.tsx` en suivant STRICTEMENT le pattern des pages villes existantes (lis-en une comme modèle : composants, metas, structure)
3. Maillage : ajoute les liens depuis les pages sœurs (villes voisines / métiers proches) et la page pilier
4. `npm run build` pour vérifier que tout compile
5. Sortie : liste des pages créées, checklist qualité (contenu unique %, metas, maillage, build OK), et le rappel : **Axel relit et pousse** — après déploiement, soumettre les URLs (`node scripts/submit-google-indexing.mjs` + `submit-indexnow.mjs`)

Limite : 5 pages max par session — la qualité avant le volume.
