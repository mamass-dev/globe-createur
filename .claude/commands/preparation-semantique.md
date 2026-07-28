---
description: Préparer le champ sémantique complet d'un sujet avant rédaction (entités, questions, vocabulaire)
argument-hint: <mot-clé principal du futur contenu>
---

Lis `docs/agent-seo/contexte.md`. Sujet : $ARGUMENTS

1. **Fetch le top 5 de la SERP** (WebSearch puis WebFetch des pages qui ranquent) et extrais : les sous-thèmes couverts par tous (obligatoires), ceux couverts par un seul (différenciants), les questions traitées (H2/H3 + PAA).
2. **Champ lexical** : le vocabulaire spécialisé récurrent (termes techniques, synonymes, co-occurrences fortes) que Google s'attend à trouver sur ce sujet.
3. **Entités** : personnes, outils, marques, lieux, concepts à mentionner (base du travail de `/entites-vectorielles`).
4. **Les manques** : ce que la SERP ne couvre PAS et que l'expérience de l'agence permet d'apporter (données réelles, cas Dijon/BFC, tests faits) — c'est l'angle E-E-A-T.

Sortie : fiche sémantique structurée (sous-thèmes obligatoires / différenciants / questions / lexique / entités / angle unique) — prête à alimenter `/brief-contenu`.
