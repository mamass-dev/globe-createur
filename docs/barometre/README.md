# Baromètre SEO des sites de Dijon

Édition septembre 2026 — 621 sites d'entreprises dijonnaises (commerces, restaurants, services, santé, immobilier…) relevés dans OpenStreetMap (tags `website` sur la commune de Dijon, chaînes nationales et institutions exclues), analysés avec les 13 critères de l'analyseur SEO du site.

- `2026-09-dijon-sites.json` : la liste source (nom, URL, catégorie OSM)
- `2026-09-dijon-results.json` : résultats bruts par site (score, statut de chaque critère)
- `stats.py` / `sector.py` : calculs utilisés dans l'article (chemins à adapter)

Refaire l'édition suivante : `node --experimental-strip-types scripts/barometre-seo-dijon.ts <sites.json> <results.json>` (requête Overpass dans l'historique de session du 2026-09-27 ; miroir `overpass.kumi.systems`).

Règle éditoriale : les chiffres publiés sont agrégés et anonymes. Aucun site n'est nommé négativement.
