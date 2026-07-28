---
description: Recherche de mots-clés autour d'un sujet (autocomplétion + GSC + SERP) — 100 % gratuit
argument-hint: <sujet ou mot-clé de départ>
---

Lis `docs/agent-seo/contexte.md` si ce n'est pas déjà fait. Sujet : $ARGUMENTS

1. **Expansion** — collecte large :
   - Autocomplétion Google (gratuite) : `curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&q=<variante>"` sur 6-10 variantes (le sujet + qui/comment/prix/meilleur/vs/avis/ville + lettres a-z sur le sujet principal)
   - GSC : `node scripts/gsc-data.mjs query 90 200` — filtre les requêtes liées au sujet (on rank déjà dessus = data réelle)
   - WebSearch sur le sujet : note les People Also Ask et les angles des titres qui ranquent
2. **Qualification** de chaque mot-clé retenu (30-60 max) :
   - Intention : informationnelle / commerciale / transactionnelle / locale
   - Preuve de demande : vu en autocomplétion ? impressions GSC ? présent dans les PAA ?
   - Difficulté estimée : fetch la SERP (WebFetch sur google.com/search?q=…) — qui occupe le top 5 ? (gros médias = dur ; PME locales/forums = accessible)
3. **Sortie** : tableau markdown trié par opportunité (demande × accessibilité × pertinence business pour une agence web locale), avec pour chaque mot-clé : intention, preuve de demande, difficulté estimée, type de contenu recommandé (article, page ville, page service, outil).
   ⚠️ Pas de volumes inventés — uniquement des preuves observées, annoncées comme telles.

Termine en proposant les 3 mots-clés à attaquer en premier et pourquoi.
