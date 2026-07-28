---
description: Rédiger un guide complet de référence (format long, pilier — 2500+ mots)
argument-hint: <sujet du guide>
---

Lis `docs/agent-seo/contexte.md` et `/ton-de-voix`. Sujet : $ARGUMENTS

Le guide est le format pilier : la page qu'on veut voir citée par Google ET les IA comme LA référence francophone accessible sur le sujet.

1. Fondations : `/preparation-semantique` sur le sujet (ou réutilise si fait)
2. **Structure de guide** :
   - Intro : à qui il s'adresse + ce qu'on saura faire à la fin (pas de blabla)
   - Sommaire ancré (liens #)
   - Progression logique : comprendre → décider → faire → vérifier
   - Chaque section : réponse directe d'abord, développement, exemple concret BFC
   - Encadrés récurrents : « En pratique » (le geste exact), « L'erreur classique », « Notre retour d'expérience » (E-E-A-T — bloc AXEL si donnée manquante)
   - FAQ finale (les PAA) + données structurées FAQPage
3. Fichier MDX complet (contrat de frontmatter), maillage : le guide reçoit des liens de TOUS les articles connexes existants (édite-les) et devient le hub de son cluster
4. `npm run build`, récap, validation Axel avant push.
