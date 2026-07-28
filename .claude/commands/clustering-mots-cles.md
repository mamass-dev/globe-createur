---
description: Regrouper une liste de mots-clés en clusters (une page = un cluster, pas un mot-clé)
argument-hint: <liste de mots-clés, ou "gsc" pour partir des données Search Console>
---

Lis `docs/agent-seo/contexte.md`. Entrée : $ARGUMENTS (si « gsc » : `node scripts/gsc-data.mjs query 90 300`).

1. **Regroupe par intention de recherche identique** : deux mots-clés vont dans le même cluster si la MÊME page peut ranker sur les deux (teste au doute : WebSearch les deux — si les SERP se recouvrent à ≥50 %, même cluster).
2. Pour chaque cluster : nomme-le, désigne le **mot-clé principal** (le plus fort) et les secondaires, l'intention dominante, et le **type de page** cible (article, page service, page ville, outil, comparatif).
3. **Croise avec l'existant** : pour chaque cluster, la page est-elle déjà couverte par `content/blog/` ou `src/app/` ? → statut : couvert / à optimiser / à créer.
4. Sortie : tableau des clusters trié par priorité business, puis le **plan d'action** — quelles pages créer (avec slug proposé), quelles pages existantes étendre, dans quel ordre.

Règle d'or : ne jamais proposer deux pages qui se cannibaliseraient (même intention = même page).
