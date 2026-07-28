---
description: Brief de contenu complet et actionnable pour un article ou une page
argument-hint: <mot-clé principal>
---

Lis `docs/agent-seo/contexte.md`. Mot-clé : $ARGUMENTS

Produis le brief en enchaînant (ou en réutilisant si déjà faits) `/preparation-semantique` et un coup d'œil GSC (`node scripts/gsc-data.mjs query 90 200` filtré sur le sujet).

Le brief contient :
1. **Cadrage** : mot-clé principal + secondaires, intention, persona (dirigeant TPE/PME BFC), objectif business (lead, autorité, maillage)
2. **Metas** : title (≤60 car.), metaDescription (140-155 car.) — conformes au contrat de frontmatter
3. **Plan détaillé** : H2/H3 avec pour chaque section l'angle, les points à couvrir, la question PAA à laquelle elle répond, et la **réponse directe en 2 phrases à placer en tête** (format AEO)
4. **Exigences E-E-A-T** : quelle expérience réelle de l'agence injecter (chiffre, cas, test) — champ à remplir par Axel si l'agent ne la connaît pas
5. **Maillage prévu** : 2-3 articles existants qui feront un lien entrant, les liens sortants (services + articles) — slugs réels du repo
6. **Specs** : longueur cible, image (idée de visuel + alt), catégorie, relatedServices/relatedArticles

Sauvegarde le brief dans `/Users/mamass/linkedin-vault/seo-globecreateur/briefs/<slug>.md`. Il alimente ensuite `/workflow-article`.
