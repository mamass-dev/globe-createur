# Agent SEO Globe Créateur — Contexte partagé

> Lu par toutes les commandes `/…` de l'agent. Objectif : faire croître
> globecreateur.fr de manière quasi automatisée, avec validation d'Axel.
> Budget données : 100 % gratuit (GSC, PageSpeed, recherche web native, autocomplétion).

## Le site
- **Next.js 16, App Router** (`src/app/`), déployé sur Vercel (push main = deploy auto)
- **Blog** : 28 articles MDX dans `content/blog/*.mdx` — contrat de frontmatter STRICT
  (voir ci-dessous), images dans `public/images/blog/`
- **Pages villes (pSEO existant)** : `src/app/agence-communication-{ville}/`
  (dijon, beaune, auxerre, besancon, chalon-sur-saone, clermont-ferrand, dole,
  lyon, macon, nevers…)
- **Outils gratuits (lead magnets)** : `/analyseur-seo`, `/calculateur-roi`,
  `/estimateur`, `/diagnostic`, `/audit-digital`
- **Cible business** : TPE/PME Dijon / Bourgogne-Franche-Comté — sites, SEO,
  outils IA. Offre abonnement « site inclus + contenu en mensualités » (dès 290 €/mois)

## Contrat de frontmatter des articles (OBLIGATOIRE, tous les champs)
```yaml
title, metaTitle (≤60 car.), metaDescription (140-155 car.), keyword,
keywords[4-6], publishedAt, updatedAt, author: "Axel Masson",
category (seo-acquisition | site-web | ia-outils | business-local),
readingTime, image: "/images/blog/<slug>.webp", imageAlt,
relatedServices[], relatedArticles[2-3 slugs existants], template: "article-blog"
```

## Données & scripts disponibles
- **GSC** : service account `service-account.json` (propriété `sc-domain:globecreateur.fr`)
  → helper : `node scripts/gsc-data.mjs <dimension> [jours] [limite]`
  (dimensions : query, page, query-page, date ; défaut 28 jours, 100 lignes)
- **Indexation** : `node scripts/submit-google-indexing.mjs <url>` +
  `node scripts/submit-indexnow.mjs <url>` — à lancer après chaque publication
- **Couvertures** : `node scripts/generate-blog-covers.mjs` (images d'articles)
- **PageSpeed** : API gratuite (clé côté VPS ; en local, tester via l'outil web)
- **Recherche web** : outils natifs Claude Code (WebSearch/WebFetch) — gratuits
- **Autocomplétion Google** (gratuite, idées de mots-clés) :
  `curl "https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&q=<requête>"`

## Règles de l'agent
1. **Jamais de données inventées** : volumes, positions, concurrence — soit mesurés
   (GSC, autocomplétion, SERP fetchée), soit annoncés comme estimations
2. **Le ton d'Axel** (voir `/ton-de-voix`) : direct, concret, preuve par le travail,
   français, zéro jargon marketing creux — E-E-A-T : chaque article montre une
   expérience réelle (chiffres de l'agence, cas clients anonymisés, tests faits)
3. **Publication = validation d'Axel** : l'agent produit (fichiers, commits sur une
   branche si demandé) mais Axel merge/pousse. Après publication : soumettre
   l'URL à l'indexation (scripts ci-dessus)
4. **Maillage systématique** : tout nouveau contenu reçoit ≥2 liens entrants depuis
   des pages existantes et pointe vers ≥1 service + ≥2 articles
5. **AEO/GEO first** : chaque contenu doit être citable par les IA — réponse
   directe en tête de section, données structurées, phrases autoportantes
