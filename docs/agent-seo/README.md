# 🎯 Agent SEO Globe Créateur

> Machine de croissance SEO/GEO de globecreateur.fr — 26 commandes, 100 % données
> gratuites (GSC, PageSpeed, autocomplétion, recherche web). Se lance depuis le
> repo : `cd ~/globe-createur && claude` puis `/commande`.
> Contexte partagé : `docs/agent-seo/contexte.md` · Helper données : `scripts/gsc-data.mjs`

## Arborescence

```
📁 Agent SEO
┣ 📁 Mots-clés
┃ ┣ /recherche-mots-cles      → explorer un sujet (autocomplétion + GSC + SERP)
┃ ┣ /clustering-mots-cles     → regrouper en clusters (1 page = 1 cluster)
┃ ┣ /mots-cles-decisionnels   → les requêtes bas de funnel (là où sont les devis)
┃ ┗ /mots-cles-overview       → vue portefeuille : acquis, à portée, trous
┣ 📁 Sémantique
┃ ┣ /preparation-semantique   → champ sémantique complet avant rédaction
┃ ┣ /entites-vectorielles     → entités & relations (compréhension Google/LLM)
┃ ┗ /brief-contenu            → brief actionnable → docs/agent-seo/briefs/
┣ 📁 Architecture
┃ ┣ /cluster-aeo              → pilier + satellites format réponse directe
┃ ┣ /modeles-pseo             → concevoir/améliorer les templates programmatiques
┃ ┣ /programmatique-pseo      → générer les pages (max 5/session, anti-thin)
┃ ┗ /maillage-systeme         → architecture de liens interne complète
┣ 📁 Données Search Console
┃ ┣ /quick-win                → positions 5-15, CTR faibles → actions immédiates
┃ ┣ /cannibalisation          → pages en concurrence → fusion/différenciation
┃ ┣ /maillage-gsc             → liens chirurgicaux guidés par la data
┃ ┗ /indexation-check         → pages non indexées → diagnostic + soumission
┣ 📁 Contenu
┃ ┣ /workflow-article         → article complet A→Z (MDX prêt à publier)
┃ ┣ /ton-de-voix              → la voix d'Axel (référence + audit de texte)
┃ ┣ /redaction-guide          → guides piliers 2500+ mots
┃ ┗ /page-statistiques        → pages stats (aimants à citations IA/backlinks)
┣ 📁 GEO
┃ ┣ /geo-audit                → citabilité par les IA, crawlers, llms.txt
┃ ┣ /donnees-structurees      → Schema.org JSON-LD (audit + implémentation)
┃ ┗ /product-led-seo          → les outils gratuits comme moteurs d'acquisition
┣ 📁 Signaux sociaux
┃ ┣ /reddit-cockpit           → discussions où apporter de la valeur (Axel poste)
┃ ┣ /x-reply-cockpit          → replies à visibilité (via recherche publique)
┃ ┗ /linkedin-journal         → travail SEO → banque d'idées LinkedIn (Hermes)
┗ 📁 Veille
  ┣ /breves-quotidiennes      → 3-6 brèves actionnables (automatisable Hermes)
  ┗ /newsletter-ia            → newsletter mensuelle clients/prospects
```

## Les 3 boucles d'usage

1. **Boucle hebdo data** (15 min) : `/quick-win` → `/maillage-gsc` → appliquer → pousser
2. **Boucle contenu** (par article) : `/recherche-mots-cles` → `/brief-contenu` → `/workflow-article` → relire → pousser → indexation
3. **Boucle mensuelle** : `/mots-cles-overview` + `/cannibalisation` + `/geo-audit` → les 3 chantiers du mois

## Règles non négociables
- Aucune donnée inventée (volumes, stats, positions)
- Publication = validation d'Axel (l'agent produit, Axel pousse)
- Ton de voix : `/ton-de-voix` fait loi
- Après chaque mise en ligne : `scripts/submit-google-indexing.mjs` + `submit-indexnow.mjs`

## Automatisation (phase 2, sur demande)
Les routines candidates pour l'agent Hermes (VPS) : brèves quotidiennes → Telegram,
quick-wins hebdo → Telegram, article hebdo → branche git à valider. À brancher
quand les commandes auront été éprouvées en manuel.
