# Offre « Diagnostic & Accompagnement IA » — récapitulatif de déploiement

> Branche `feat/offre-ia` · Créé le 2026-08-06 · Rien n'est publié tant que la branche n'est pas fusionnée.
> Fiche de faits et paramètres : `src/lib/data/dispositif-ia.ts` (source unique de vérité).

## Pages créées

| Page | URL | Intention de recherche | Liens entrants | Liens sortants principaux |
|---|---|---|---|---|
| **Page pilier** | `/services/diagnostic-ia-pme` | « diagnostic IA PME », « accompagnement IA entreprise » (transactionnelle) | Nav + grille services (registre), 7 articles du cluster, `/services/automatisation-nocode-dijon`, `/services/support-communication-pme`, blog automatisation ×2, `/tarifs` | Portail `diag.bpifrance.fr`, sources officielles, `/contact`, `/projets`, `/temoignages`, `/services/automatisation-nocode-dijon` |
| **Calculateur ROI IA** | `/calculateur-roi-ia` | « calculateur ROI IA », « ROI intelligence artificielle » (outil) | Hub `/outils`, article ROI, page pilier | Page pilier |
| Article 1 | `/blog/plan-osez-ia-explique-dirigeants-pme` | « plan osez l'ia » / « osez l'ia bpifrance » | Article pourquoi-automatiser-communication-2026, articles frères 2·5·6 | Pilier, articles 2·5·6, bpifrance.fr, entreprises.gouv.fr, diag.bpifrance.fr |
| Article 2 | `/blog/eligibilite-diag-data-ia-criteres` | « diag data ia éligibilité » | Articles frères 1·3·4 | Pilier (+ ancre #simulateur), articles 1·3·4, diag.bpifrance.fr |
| Article 3 | `/blog/calculer-roi-projet-ia-pme` | « calculer roi projet ia » | Articles frères 2·4·6 | `/calculateur-roi-ia`, pilier, articles 2·4·6 |
| Article 4 | `/blog/cartographier-processus-avant-automatiser` | « cartographie des processus » | Articles frères 3·5·6 | Pilier, `/services/automatisation-nocode-dijon`, articles 3·5·6 |
| Article 5 | `/blog/cas-usage-ia-pme-par-secteur` | « cas d'usage ia pme » | Guide communication digitale, secteurs artisans-btp / e-commerce-local / professions-liberales, articles frères 1·4·7 | Pilier, `/secteurs/artisans-btp`, `/secteurs/e-commerce-local`, articles 1·4·7 |
| Article 6 | `/blog/erreurs-projet-ia-pme` | « pourquoi les projets ia échouent » | Articles frères 1·3·4·7 | Pilier, articles 1·3·4·7 |
| Article 7 | `/blog/ia-donnees-personnelles-rgpd-dirigeant` | « ia rgpd entreprise » | Articles frères 5·6 | Pilier, articles 1·5·6, cnil.fr |

## Maillage entrant ajouté sur les pages existantes

| Page source | Ancre | Destination |
|---|---|---|
| `/services/automatisation-nocode-dijon` | « diagnostic IA pour PME » | Pilier |
| `/services/support-communication-pme` | « l'IA appliquée à votre communication » | Pilier |
| `/blog/automatiser-prospection-commerciale-pme` | « cadrer un projet IA avant d'outiller » | Pilier |
| `/blog/pourquoi-automatiser-communication-2026` | « le plan Osez l'IA » | Article 1 |
| `/blog/guide-communication-digitale-pme-2026` | « cas d'usage IA par secteur » | Article 5 |
| `/secteurs/artisans-btp`, `/secteurs/e-commerce-local`, `/secteurs/professions-liberales` | « ce que l'IA change dans votre métier » | Article 5 |
| `/tarifs` | « diagnostic & accompagnement IA » | Pilier (#tarifs) |
| Registre `services.ts` | relatedServices croisés | Pilier ↔ no-code, support com |

## Composants et infrastructure

- `src/lib/data/dispositif-ia.ts` — Bloc A (faits stables), Bloc B (null), critères d'éligibilité, tarifs GC, helpers d'affichage. **Aucun seuil ni chiffre du dispositif ailleurs que dans ce fichier.**
- `src/components/tools/eligibility-simulator.tsx` — 7 questions, restitution A/B, capture RGPD (case non pré-cochée), via `/api/lead`.
- `src/components/tools/roi-calculator-ia.tsx` — hypothèses affichées et modifiables.
- `src/components/sections/cta-ia.tsx` — 3 intensités (discret / moyen / fort), dispo en MDX.
- Événements Vercel Analytics : `simulateur_ia_demarre`, `simulateur_ia_complete`, `simulateur_ia_lead`, `calculateur_roi_ia_utilise`.
- SEO : ServiceSchema + FaqSchema + BreadcrumbSchema (pilier), FaqSchema (calculateur), ArticleSchema (articles, automatique), sitemap (2 entrées statiques ajoutées), couvertures OG générées (`scripts/generate-blog-covers.mjs`).

## [À VÉRIFIER] restants — bloquants avant publication

1. **Bloc B — paramètres du Diag Data IA** (`parametresInstables` dans `dispositif-ia.ts`) : durée en jours, coût HT, taux de prise en charge. **À confirmer auprès de la direction régionale Bpifrance Bourgogne-Franche-Comté.** Tant que null : formulations qualitatives automatiques, aucun chiffre affiché. Une fois confirmés, renseigner les valeurs → l'affichage chiffré s'active partout.
2. **Critères d'éligibilité** (`ELIGIBILITE_DIAG_DATA_IA`) : relevés dans les sources publiques (10-2 000 ETP, ≥ 1 M€ CA, > 1 an, indépendante, France). Présentés partout comme « critères annoncés » — à faire confirmer par Bpifrance également.
3. Aucun `[À VÉRIFIER]` dans le corps des 7 articles ni des 2 pages (vérifié par balayage).

## Décisions prises sur délégation (2026-08-06) — à entériner ou ajuster

1. **Tarifs Globe Créateur** (alignement marché, modifiables dans `dispositif-ia.ts`) : Diagnostic Flash IA **690 € HT** ; Accompagnement Diag Data IA **à partir de 1 490 € HT**.
2. **Méthode en 4 phases / ~7 semaines** (immersion → cas d'usage → chiffrage → restitution) : proposition de design d'offre, affichée sur le pilier.
3. Noms d'offres : « Diagnostic Flash IA » (direct) vs « Accompagnement Diag Data IA » (adossé au dispositif) — validés en amont.

## Au moment de la publication (fusion sur main)

- [ ] Renseigner ou laisser null le Bloc B selon le retour Bpifrance BFC.
- [ ] Bumper `LAST_SITE_UPDATE` dans `src/app/sitemap.ts` (volontairement non modifié).
- [ ] Soumettre les 9 nouvelles URLs via IndexNow + Google Indexing API (`npm run submit-urls`, script Indexing).
- [ ] Si l'habilitation expert Diag Data IA est obtenue un jour : l'ajouter dans l'emplacement réservé (commentaire dans la section preuves du pilier), avec sa date. Jamais avant.
- [ ] Rappel : aucune mention OPCO / Qualiopi / « formation finançable » tant que la certification Qualiopi n'est pas obtenue.
