---
description: Concevoir ou améliorer un template de pages programmatiques (villes, secteurs, comparatifs)
argument-hint: <type de template : villes / secteurs / cas d'usage / comparatifs>
---

Lis `docs/agent-seo/contexte.md`. Template visé : $ARGUMENTS

Le site a déjà un pSEO villes (`src/app/agence-communication-{ville}/`). Analyse et étends :
1. **Audit du template existant** : lis 2-3 pages villes du repo — qu'est-ce qui est vraiment localisé (données, exemples, témoignages) vs simplement substitué ({ville} dans un texte générique) ? Le substitué pur = risque thin content.
2. **Conçois le template amélioré** : chaque page programmatique doit avoir ≥40 % de contenu réellement unique — données locales (population de PME, tissu économique via recherche web), cas clients de la zone, maillage vers les villes voisines, FAQ locale.
3. **Nouveaux axes possibles** (à valider avec les données) : `creation-site-{metier}` (restaurateur, artisan…), `agence-seo-{ville}`, comparatifs `{solution}-vs-{solution}` — pour chacun : demande prouvée ? (autocomplétion + GSC) combien de pages viables ?
4. Sortie : spec du template (structure de page section par section, sources de données par variable, critère de qualité minimal pour publier une page) + la liste des pages à générer triée par demande. Implémentation via `/programmatique-pseo`.
