---
description: Détecter et exploiter les gains rapides dans Search Console (positions 5-15, CTR faibles)
---

Lis `docs/agent-seo/contexte.md`.

1. `node scripts/gsc-data.mjs query-page 28 300` et `node scripts/gsc-data.mjs query 90 300`
2. Détecte trois familles de quick wins :
   - **Portée de main** : requêtes en position 5-15 avec des impressions — un coup de pouce (contenu enrichi, maillage, fraîcheur) peut les faire passer en page 1
   - **CTR anormalement bas** : position ≤8 mais CTR < moitié du CTR attendu pour cette position → title/meta à réécrire (pas assez cliquables)
   - **Impressions sans clics** : forte visibilité, zéro clic → mauvais alignement intention/contenu
3. Pour chaque quick win retenu (top 10) : la page concernée, le diagnostic précis, et **l'action exacte** (réécrire tel title, ajouter telle section qui répond à la requête, tel lien interne depuis telle page forte)
4. Applique directement les corrections simples (titles/metas dans les frontmatters MDX, sections courtes) si demandé — Axel relit et pousse.

Sortie : tableau des quick wins triés par (impact estimé × facilité), actions faites vs à valider.
