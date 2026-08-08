# Veille SEO/IA Hebdo — Semaine du 2 au 8 août 2026

> Format : 3-6 brèves max — titre en une ligne, l'essentiel en 2 phrases, **« Pour nous : »** l'action ou la non-action.

---

## 1. Next.js 16.3 : navigations instantanées + Server Fast Refresh — impact Core Web Vitals direct

Next.js 16.3 (sorti le 3/08) introduit **Instant Navigations** (streaming ou cache côté client pour rendu instantané au clic) et **Server Fast Refresh** (rechargement serveur à grain fin). Les métriques `size` et `First Load JS` sont retirées du build — Vercel recommande Lighthouse/Vercel Analytics pour la vraie performance.
**Pour nous** : Mettre à jour globecreateur.fr vers 16.3 dès que possible (pas de breaking changes signalés). Le gain sur INP/LCP pour les pages villes pSEO (lourdes en contenu) est concret. Action : planifier l'upgrade en branche `seo/auto-202608xx-next16-upgrade` cette semaine, tester `npm run build` localement.

---

## 2. AI Overviews : patterns de citation stabilisés — l'autorité topique constante prime sur l'optimisation one-shot

Études 2026 (Stackmatix, Enfuse) : les sources citées dans les AI Overviews sont désormais **prévisibles** — ce sont les sites qui démontrent une autorité topique *soutenue* (contenu régulier, entités claires, earned media). Le CTR organique chute jusqu'à -61 % sur les requêtes informationnelles avec AIO.
**Pour nous** : Confirme notre Axe 5 (outil SEO : rediriger le trafic existant) + Axe 1/2/3 (contenu local massif, régulier, entités Dijon/BFC). Pas de nouvelle check-liste « GEO » — continuer à publier du contenu local E-E-A-T hebdo (articles + pages villes) et soigner le maillage. Action : vérifier que chaque nouvelle page/article a bloc `Answer` direct en tête + données structurées `Article`/`LocalBusiness`.

---

## 3. Prochain Core Update attendu août/septembre 2026 — fenêtre de tir pour consolider avant le recalibrage

Cadence 3-4 mois : après le Core Update de mai 2026 (terminé), le suivant est attendu **août ou septembre**. La qualité de contenu et la santé technique *avant* le déploiement déterminent l'impact.
**Pour nous** : Nos 3 chantiers (Dijon refonte ✅, Nevers enrichissement 🔵, Longvic création 🔵) sont exactement les bons leviers. Priorité absolue : finaliser la validation Nevers + Longvic cette semaine (branches en validation), pousser le maillage interne vers Dijon. Pas de nouvelle fonctionnalité technique risquée avant le core update. Action : relancer Axel pour « ok merge » sur Nevers et Longvic mercredi au plus tard.

---

## 4. Google Business Profile 2026 : photos analysées par Vision AI, AR Store Tours, messaging IA — le profil devient le « digital storefront » #1

Sterling Sky (juillet 2026) : Google teste redesign du local pack, ajoute bouton message avec agent IA, analyse la qualité photo via Vision AI (images floues/stock = visibilité réduite), AR Store Tours comme facteur de classement. 46 % des PME n'ont toujours pas revendiqué leur GBP.
**Pour nous** : Opportunité commerciale directe — audit GBP inclus dans notre offre « site inclus + contenu ». Pour Globe : vérifier notre propre fiche (Longvic/Dijon) — photos récentes de l'agence/équipe, services listés, messaging activé. Action : auditer la fiche GBP Globe cette semaine, documenter le process pour le reproduire chez clients.

---

## 5. DMA France : AI Overviews / AI Mode *pas encore déployés* en France (interprétation stricte) — réalité à deux vitesses EU/US

Newzdash / Philippe Yonnet (août 2026) : la France (DMA) bloque le déploiement des AI Overviews et AI Mode. Éditeurs FR : SEO classique encore roi, mais préparer la bascule. Le « split-screen » EU/US impose double stratégie.
**Pour nous** : Avantage concurrentiel temporaire — notre contenu local E-E-A-T (Axes 1-3) capte encore 100 % des clics info en France. Mais il faut **se préparer** : structurer les entités (LocalBusiness, Person Axel, services), earned media (citations presse locale BFC), technique irréprochable. Action : ajouter `speakable` + `FAQPage` schema sur pages villes + article « site internet PME » ; lister 5 cibles presse locale BFC pour earned media.

---

## 6. Modèles open-weights (Kimi K3 Moonshot 2.8T, Mistral Shieldstral 3B) : commoditisation de l'IA — viable pour agence sans dépendre OpenAI/Anthropic

Kimi K3 : 1M contexte, surpasse GPT-5.6 en blind test front-end, prix agressif. Mistral Shieldstral : modération multimodal open-weights. La barrière technique pour « construire ses propres outils IA » s'effondre.
**Pour nous** : Test concret pour Globe Créateur — agent veille (déjà en prod via Hermes), générateur de briefs SEO, modération contenu client. Pas d'urgence business, mais **avantage coût/contrôle** à moyen terme. Action : réserver 2h cette semaine pour tester Kimi K3 en local (Ollama) sur génération de méta titles/descriptions pages villes — comparer qualité vs Claude.

---

## Synthèse GSC semaine (28j glissants au 5/08)

| Métrique | Valeur | Tendance |
|----------|--------|----------|
| Clics totaux | 49 | ➡️ stable (faible) |
| Impressions | 11 480 | 📈 **+185 %** vs 28j préc. |
| CTR moyen | 0.43 % | 📉 très bas (requêtes info nationale) |
| Position moyenne | 24.6 | ➡️ stable |

**Lecture** : L'explosion d'impressions (pages villes indexées + refonte Dijon) ne se convertit pas en clics — confirment le besoin **Axe 1/2/3** : contenu local décisionnel + pages villes en page 1. Le CTR montera quand Dijon/Nevers/Chalon passeront top 10.