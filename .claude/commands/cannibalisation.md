---
description: Détecter et résoudre les cannibalisations (plusieurs pages en concurrence sur une même requête)
---

Lis `docs/agent-seo/contexte.md`.

1. `node scripts/gsc-data.mjs query-page 90 500`
2. Détecte les requêtes où **≥2 pages différentes** apparaissent. Pour chacune :
   - Vraie cannibalisation (deux pages visent la même intention et se partagent les clics/positions instables) ou fausse alerte (intentions différentes légitimes) ?
   - Quelle page est la légitime (la plus forte / la plus alignée) ?
3. **Résolutions** selon le cas :
   - Fusionner (le contenu du perdant enrichit le gagnant + redirection 301 dans `next.config.ts`)
   - Différencier (ré-angler le perdant sur une intention distincte, ajuster title/H1)
   - Désoptimiser (retirer le mot-clé du perdant, rediriger son maillage vers le gagnant)
4. Sortie : tableau des cannibalisations confirmées (requête, pages, clics partagés, résolution recommandée), puis exécution des résolutions validées (édition MDX, redirections) — Axel relit et pousse.
