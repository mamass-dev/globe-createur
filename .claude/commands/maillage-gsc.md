---
description: Maillage interne guidé par les données GSC — pousser les pages qui montent avec les pages qui rankent
---

Lis `docs/agent-seo/contexte.md`.

1. `node scripts/gsc-data.mjs page 28 100` (les pages fortes = sources de jus) et `node scripts/gsc-data.mjs query-page 90 300` (les requêtes en position 6-20 = cibles à pousser)
2. Pour chaque **cible** (page avec requête à portée de page 1) : trouve 2-3 **sources** (pages fortes thématiquement proches) qui ne lui font pas encore de lien — vérifie dans les fichiers
3. Propose chaque lien : fichier source, emplacement dans le texte, **ancre exacte** (la requête GSC visée, naturellement intégrée)
4. Applique les liens validés directement dans les MDX / pages.

C'est la version chirurgicale de `/maillage-systeme` : lui structure, celle-ci exploite la donnée fraîche. À lancer après chaque `/quick-win`.
