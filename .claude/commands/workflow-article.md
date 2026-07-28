---
description: Produire un article complet de A à Z (brief → rédaction → MDX → maillage → prêt à publier)
argument-hint: <mot-clé ou slug d'un brief existant dans docs/agent-seo/briefs/>
---

Lis `docs/agent-seo/contexte.md` et `/ton-de-voix` (la voix d'Axel est non négociable). Cible : $ARGUMENTS

1. **Brief** : charge `docs/agent-seo/briefs/<slug>.md` s'il existe, sinon exécute `/brief-contenu` d'abord
2. **Rédaction** — les règles :
   - Chaque H2 ouvre par la réponse directe en 2-3 phrases (bloc citable AEO), puis développe
   - E-E-A-T obligatoire : au moins 2 éléments d'expérience réelle (chiffres agence, cas anonymisé, test effectué) — si tu ne les as pas, mets un bloc `<!-- AXEL: insérer ton exemple ici -->` plutôt que d'inventer
   - Concret > théorie : exemples chiffrés BFC, captures d'outils, pas-à-pas
   - 1 CTA naturel vers un service ou un outil gratuit du site, jamais plus
3. **Fichier** : `content/blog/<slug>.mdx` avec le frontmatter COMPLET du contrat (metaTitle ≤60, metaDescription 140-155, keywords, category, relatedServices, relatedArticles réels…) — prends un article existant comme modèle de style MDX
4. **Maillage entrant** : ajoute 2 liens vers ce nouvel article depuis des articles existants pertinents (édite-les)
5. **Image** : `node scripts/generate-blog-covers.mjs` si applicable, sinon note l'image à créer
6. **Vérifie** : `npm run build`
7. Sortie : récap (fichier créé, liens ajoutés, blocs AXEL à compléter) — **Axel relit, complète les blocs, pousse** ; après déploiement : scripts d'indexation.
