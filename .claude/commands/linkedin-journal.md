---
description: Journal LinkedIn — transformer le travail SEO du site en contenus LinkedIn (pont avec l'agent Hermes)
---

Lis `docs/agent-seo/contexte.md`.

Le travail SEO fait sur globecreateur.fr est une mine de contenus LinkedIn « build in public ». Cette commande fait le pont avec la machine LinkedIn (agent Hermes, vault Obsidian).

1. **Récolte** : qu'a-t-on fait récemment sur le site ? (git log récent, derniers articles publiés, quick wins appliqués, chiffres GSC marquants — `node scripts/gsc-data.mjs date 28` pour la tendance)
2. **Transforme en angles LinkedIn** (2-4 idées) : le résultat chiffré (« +229 % de clics en appliquant X »), la leçon (« l'erreur que je corrige le plus souvent »), le coulisses (« comment je fais un audit en 1 h »), le contre-pied (« arrêtez de payer pour Y »)
3. **Livraison** : ajoute les idées formatées dans `/Users/mamass/linkedin-vault/linkedin/banque-idees.md` (section « Proposées par l'agent »), commit + push du vault — l'agent Hermes les piochera pour les posts du matin
4. Rappel des règles du vault : véridique uniquement, chiffres réels, max 1 post/semaine sur l'offre commerciale.
