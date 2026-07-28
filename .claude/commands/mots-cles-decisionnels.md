---
description: Identifier les mots-clés à forte intention d'achat (bas de funnel) pour l'agence
argument-hint: [service : site web, SEO, IA… — défaut : tous]
---

Lis `docs/agent-seo/contexte.md`. Périmètre : $ARGUMENTS

Cherche les requêtes que tape un dirigeant de TPE/PME **prêt à acheter** :
- Patterns : « prix/tarif/devis/combien coûte + <service> », « agence <service> + <ville BFC> », « <concurrent ou solution> avis », « meilleure agence… », « exemple de site <métier> »
- Sources : autocomplétion Google sur ces patterns, GSC (`node scripts/gsc-data.mjs query 90 200` — les requêtes décisionnelles où on apparaît déjà), PAA des SERP.
- Pour chaque mot-clé décisionnel trouvé : la SERP actuelle (qui ranke ?), notre position GSC éventuelle, et la **page de destination idéale** (existante ou à créer — souvent une page tarifs, un comparatif honnête, ou un outil type calculateur).

Sortie : top 15 mots-clés décisionnels triés par (proximité de l'achat × accessibilité), chacun avec sa page cible et l'action requise. Ces pages sont prioritaires sur tout le reste : c'est là que sont les devis.
