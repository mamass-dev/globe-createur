---
description: Analyse d'entités — renforcer la compréhension du contenu par Google et les LLM
argument-hint: <slug d'un article existant, ou sujet à préparer>
---

Lis `docs/agent-seo/contexte.md`. Cible : $ARGUMENTS

Les moteurs (et les IA génératives) raisonnent en entités et relations, pas en mots-clés. Analyse :
1. **Entités présentes** dans le contenu cible (lis le fichier MDX si slug) : personnes, organisations, lieux, outils, concepts — et leur clarté (sont-elles introduites sans ambiguïté ?)
2. **Entités attendues manquantes** : compare avec le top 3 de la SERP et la fiche `/preparation-semantique` — quelles entités tous les concurrents mentionnent-ils ?
3. **Relations à expliciter** : « X est un outil de Y », « A se situe à B » — les phrases sujet-verbe-objet autoportantes que les LLM peuvent citer telles quelles
4. **Ancrage local** : les entités BFC (villes, institutions type CCI, événements) qui ancrent Globe Créateur comme entité locale de référence

Sortie : liste d'ajouts/reformulations concrets par section du contenu, + les données structurées à poser (`/donnees-structurees`) pour déclarer les entités (Organization, Person, Service, LocalBusiness).
