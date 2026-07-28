---
description: Audit et refonte du maillage interne du site (architecture de liens systématique)
---

Lis `docs/agent-seo/contexte.md`.

1. **Cartographie** : liste toutes les pages (`content/blog/*.mdx` + `src/app/*/`) et extrais les liens internes existants (grep des href internes + relatedArticles/relatedServices des frontmatters)
2. **Diagnostic** :
   - Pages orphelines (aucun lien entrant) — les pires
   - Pages piliers sous-alimentées (les pages business : services, villes — reçoivent-elles les liens des articles ?)
   - Ancres : génériques (« cliquez ici », « cet article ») vs descriptives (mot-clé)
   - Silos incohérents (un article SEO qui ne pointe vers aucune page service SEO)
3. **Règles du système** (à faire respecter ensuite par tout nouveau contenu) :
   - Tout article → ≥1 page service + ≥2 articles connexes ; toute page service → ses articles satellites
   - Les pages décisionnelles (tarifs, devis, villes) reçoivent le PLUS de liens
4. Sortie : le plan de correction concret — pour chaque page à corriger : liens à ajouter (source → cible + ancre proposée), en commençant par les orphelines et les pages décisionnelles. Applique directement les corrections dans les fichiers MDX (frontmatter relatedArticles + liens en corps de texte) si demandé.
