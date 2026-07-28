# Mission automatique — SEO quotidien de globecreateur.fr (agent Hermes)

> Exécutée chaque matin sur le VPS, AVANT le brief de 7h30. Deux routines :
> `seo-quotidien` (données & optimisations) et `seo-article` (production éditoriale).
> Workdir : `/home/hermes/globe-createur`. Node : utiliser le node de Hermes.
> Toutes les commandes `/…` citées = les fichiers `.claude/commands/<nom>.md` du repo :
> OUVRE le fichier et suis sa procédure.

## Règles absolues
1. **JAMAIS de push direct sur `main`.** Tout changement part sur une branche
   `seo/auto-<date>-<sujet>` poussée sur origin. Axel valide depuis Telegram
   (« ok merge » → alors seulement : merge dans main + push + scripts d'indexation).
2. **Aucune donnée inventée** — GSC, autocomplétion, SERP fetchées uniquement.
3. **Ton de voix** : `.claude/commands/ton-de-voix.md` fait loi sur tout contenu.
   Les faits d'expérience manquants = bloc `<!-- AXEL: ... -->`, jamais inventés.
4. **Économie de contexte** : head -150 sur les gros fichiers, jamais deux lectures
   du même fichier, résumés plutôt que dumps.
5. Rapport Telegram TOUJOURS honnête : étapes faites / échouées / en attente de
   validation, avec le lien de la branche GitHub.

## Préambule commun (chaque run)
```bash
cd ~/globe-createur && git checkout main && git pull
```
Lire `docs/agent-seo/contexte.md` + `docs/agent-seo/roadmap.md` (créer si absent).

## Rotation `seo-quotidien` (selon le jour)

### Lundi — Vue d'ensemble & roadmap
Suivre `/mots-cles-overview`. Mettre à jour `docs/agent-seo/roadmap.md` :
les 3 chantiers de la semaine + la file d'articles priorisée (nourrie par les
trous détectés et `/mots-cles-decisionnels` une fois par mois).
Branche + rapport Telegram (le lundi ne modifie que la roadmap → merge facile).

### Mercredi — Quick wins
Suivre `/quick-win` puis `/maillage-gsc`. APPLIQUER les corrections
(titles/metas dans les frontmatters, liens internes) sur la branche du jour.
Rapport : chaque correction listée (avant → après), lien de branche, « ok merge ? »

### Vendredi — Santé technique
Alterner une semaine sur deux : `/cannibalisation` (+ résolutions sur branche)
ou `/indexation-check` (+ soumissions — les soumissions d'URLs déjà en ligne
ne nécessitent pas de validation). Rapport Telegram.

### Samedi — Veille
Suivre `/breves-quotidiennes` (version hebdo : la semaine écoulée).
Livrer les brèves sur Telegram + pousser les idées d'articles dans la roadmap
et les idées LinkedIn dans le vault (`/linkedin-journal`).

## `seo-article` (mardi et jeudi) — production éditoriale

1. Prendre le 1er sujet de la file dans `docs/agent-seo/roadmap.md`
2. Suivre `/brief-contenu` puis `/workflow-article` À LA LETTRE (MDX complet,
   frontmatter conforme, maillage entrant ajouté, blocs AXEL pour l'expérience)
3. NE PAS lancer `npm run build` (trop lourd pour le VPS) — vérifier à la place :
   frontmatter YAML valide, slugs relatedArticles existants, MDX bien formé
4. Brancher `seo/auto-<date>-article-<slug>`, pousser, marquer le sujet « en
   validation » dans la roadmap
5. Rapport Telegram : titre, angle, mot-clé visé, extrait du hook, blocs AXEL
   à compléter, lien branche. Axel relit sur GitHub (ou demande des corrections
   en répondant), puis « ok merge ».

## Après chaque merge validé
```bash
git checkout main && git merge --no-ff <branche> && git push
node scripts/submit-google-indexing.mjs <url> && node scripts/submit-indexnow.mjs <url>
```
(Vercel déploie automatiquement le push de main.)
