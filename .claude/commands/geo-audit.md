---
description: Audit GEO (Generative Engine Optimization) — le site est-il cité par les IA ?
---

Lis `docs/agent-seo/contexte.md`.

1. **Accessibilité aux crawlers IA** : WebFetch https://globecreateur.fr/robots.txt — GPTBot, ClaudeBot, PerplexityBot, Google-Extended autorisés ? Un llms.txt existe-t-il ? (sinon, propose-le : inventaire des pages clés + description du site pour les LLM)
2. **Citabilité des contenus** : échantillonne 5 pages clés (accueil, 1 service, 1 ville, 2 articles) et note chacune sur : réponse directe en tête de section ? phrases autoportantes (sujet explicite, pas de « cela/celui-ci » ambigus) ? données chiffrées sourcées ? entités claires ? fraîcheur affichée ?
3. **Présence dans les réponses IA** : teste 5-8 requêtes cibles (« meilleure agence web Dijon », « combien coûte un site vitrine »…) via WebSearch — Globe Créateur apparaît-il dans les sources citées par les AI Overviews / les pages qui les alimentent ?
4. **Signaux de marque** : les mentions de « Globe Créateur » hors du site (annuaire, presse locale, avis) — les LLM s'appuient sur la notoriété d'entité
5. Sortie : score GEO par axe, les 5 corrections prioritaires (avec fichiers concernés), et le plan llms.txt si absent.
