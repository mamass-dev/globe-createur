---
description: Concevoir un cluster de contenus optimisé AEO (Answer Engine Optimization) — page pilier + satellites
argument-hint: <thème du cluster (ex. "coût d'un site web")>
---

Lis `docs/agent-seo/contexte.md`. Thème : $ARGUMENTS

1. **Cartographie des questions** : toutes les questions que la cible pose sur ce thème (PAA via WebSearch, autocomplétion « <thème> + comment/pourquoi/combien/quel », forums via WebSearch site:reddit.com ou forums FR)
2. **Architecture pilier-satellites** :
   - 1 page pilier (la référence exhaustive, vise le mot-clé de tête)
   - 4-8 satellites (une question précise chacun, format réponse directe)
   - Chaque satellite : réponse complète en 2-3 phrases EN TÊTE (le bloc citable par les IA et les featured snippets), puis le développement
3. **Maillage interne du cluster** : pilier ↔ satellites systématique, ancres = la question
4. **Données structurées** : FAQPage sur le pilier, Article sur les satellites (voir `/donnees-structurees`)
5. Croise avec l'existant (`content/blog/`) : quels satellites existent déjà ? lesquels créer ?

Sortie : schéma du cluster (pilier + satellites avec slugs), l'ordre de production recommandé, et les briefs à lancer (`/brief-contenu <mot-clé>` pour chacun).
