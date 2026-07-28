---
description: Auditer, corriger et générer les données structurées Schema.org (JSON-LD) du site
argument-hint: [page ou type ciblé — défaut : audit global]
---

Lis `docs/agent-seo/contexte.md`. Cible : $ARGUMENTS

1. **Inventaire** : grep `application/ld+json` dans `src/` — quels schémas existent (Organization, LocalBusiness, Article, FAQPage, Service, BreadcrumbList…) et sur quelles pages ?
2. **Le socle attendu** pour une agence locale :
   - Global : Organization + LocalBusiness (adresse Longvic, geo, horaires, sameAs vers les profils)
   - Articles : Article (author Person « Axel Masson », datePublished/Modified, image)
   - Pages villes : Service + areaServed
   - FAQ : FAQPage là où il y a des questions/réponses
   - Fil d'Ariane : BreadcrumbList partout
3. **Écarts et erreurs** : champs manquants, incohérences (NAP différent du footer), doublons
4. **Implémentation** : corrige/ajoute dans les composants Next.js concernés (composant JSON-LD réutilisable si absent), en générant depuis les frontmatters pour les articles (pas de duplication manuelle)
5. **Validation** : npm run build + contrôle d'un échantillon rendu (le JSON-LD est-il bien dans le HTML ?)

Sortie : tableau des schémas (page, type, statut avant/après), fichiers modifiés — Axel relit et pousse.
