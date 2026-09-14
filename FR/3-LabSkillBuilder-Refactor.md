# Exercices Avancés IBM Bob Premium Package for Z
## Exercice1 : Coding Standard Skill | Exercice 2 : Refactorisation VSAM vers DB2

**Durée estimée :** 1-2 heures  
**Niveau :** Avancé  
**Prérequis :** Connaissance de COBOL et CICS

---

## 📋 Table des Matières

1. [Exercice 1 : Génération d'un Coding Standard Skill Personnalisé](#exercice-1--génération-dun-coding-standard-skill-personnalisé)
2. [Exercice 2 : Refactorisation VSAM vers DB2](#exercice-2--refactorisation-vsam-vers-db2)

---

## Exercice 1 : Génération d'un Coding Standard Skill Personnalisé

### 🎯 Objectif

Créer un skill de coding standard personnalisé qui analyse votre code COBOL existant et génère automatiquement des standards documentés réutilisables pour garantir la cohérence du code dans toute l'équipe.

### 🔧 Mode Bob à Utiliser

**Mode : 🧰 Z Code**

---

## 📋 Scénario Pas-à-Pas

### **Étape 1 : Génération Initiale du Skill**

#### 💬 Prompt Bob

```
Génère un coding standard skill dans mon espace de travail en analysant les programmes COBOL existants
```

#### ⚙️ Ce que Bob fait

Bob va :
1. Analyser tous les programmes COBOL du workspace
2. Identifier les patterns de codage récurrents (nommage, structures, gestion d'erreur)
3. Générer trois fichiers dans `.bob/` :
   - `CBSA-standards-reference.md` : Documentation des standards
   - `CBSA-example.md` : Exemples de code conforme
   - `skills.md` : Définition du skill

#### ✅ Exemple de résultat

Bob crée trois fichiers documentant :
- Conventions de nommage (programmes, variables, paragraphes)
- Structure standard des programmes
- Gestion d'erreur (codes 0-9)
- Patterns CICS et SQL
- Règles de qualité de code

---

### **Étape 2 : Personnalisation du Standard (Optionnel)**

#### 💬 Prompt Bob

```
Modifie le fichier CBSA-standards-reference.md pour ajouter les règles suivantes :
- Les variables de compteur doivent commencer par CTR-
- Les paragraphes de validation doivent se terminer par -VALIDATION
- Ajouter une section sur les standards de logging
```

#### ⚙️ Ce que Bob fait

Bob met à jour le fichier de référence avec vos règles spécifiques et intègre les nouvelles conventions dans le skill.

---

### **Étape 3 : Génération de Code avec le Standard**

#### 💬 Prompt Bob

```
Crée-moi un programme COBOL qui :
- Recherche un client par son email
- Valide le format de l'email
- Retourne les informations du client si trouvé
- Gère toutes les erreurs possibles

Suis le CBSA-standards-reference.md pour la structure et les conventions
```

#### ⚙️ Ce que Bob fait

Bob va :
1. Lire le fichier `CBSA-standards-reference.md`
2. Appliquer tous les standards documentés
3. Générer un programme COBOL complet et conforme (ex: `BNKINQE.cbl`)
4. Documenter le code avec les commentaires appropriés

---

## 💡 Valeur Ajoutée

| Aspect | Sans Skill | Avec Skill |
|--------|-----------|-----------|
| Analyse des standards | 2-3 jours | 2 minutes |
| Documentation | Incomplète | Exhaustive |
| Génération de code | Standards variables | Standards garantis |
| Cohérence | Variable | 100% |
| Onboarding | 2-3 semaines | 1-2 jours |

**Gain global : 95% de réduction du temps**

---

## 📋 Cas d'Usage

1. **Onboarding** : Référence claire des standards pour nouveaux développeurs
2. **Modernisation** : Génération de nouveau code cohérent avec l'ancien
3. **Harmonisation** : Standards unifiés pour toute l'organisation
4. **Audit** : Standards documentés et traçables

---

## 🎓 Points Clés à Retenir

### ✅ Avantages

- **Automatisation** : Bob extrait automatiquement les patterns
- **Réutilisabilité** : Le skill s'applique à tous vos futurs développements
- **Cohérence** : Garantit l'uniformité du code
- **Évolutif** : Le skill peut être mis à jour au fil du temps

### ⚠️ Points d'Attention

1. Vérifiez les standards détectés lors de la première génération
2. Adaptez les fichiers générés à vos besoins spécifiques
3. Mettez à jour le skill quand vos standards évoluent
4. Partagez le skill avec toute l'équipe

---

## Exercice 2 : Refactorisation VSAM vers DB2

### 🎯 Objectif

Moderniser un programme COBOL existant qui utilise des fichiers VSAM en le refactorisant pour utiliser DB2, tout en maintenant la compatibilité fonctionnelle et en améliorant les performances.

### 🔧 Mode Bob à Utiliser

**Mode : 📐 Z Architect**

---

## 📋 Scénario Pas-à-Pas

### **Étape 0 : Création du Document extractionGoal.md**

#### 💬 Prompt Bob

```
Crée un document extractionGoal.md qui définit les principes de refactorisation pour la migration VSAM vers DB2, incluant :

1. Préservation de la Fonctionnalité
2. Mapping des Opérations VSAM vers SQL
3. Gestion Transactionnelle
4. Optimisation des Parcours Séquentiels
5. Gestion d'Erreur Robuste
6. Utilisation des Variables Hôtes
7. Optimisation des Performances
8. Structure et Modularité
9. Compatibilité et Migration Progressive
10. Documentation et Traçabilité

Inclus également une checklist de refactorisation et les critères de succès.
```

#### ⚙️ Ce que Bob fait

Bob crée le fichier `extractionGoal.md` (485 lignes) contenant :
- 10 principes détaillés avec exemples COBOL
- Tableaux de correspondance VSAM→DB2
- Checklist en 3 phases
- Critères de succès mesurables

---

### **Étape 1 : Analyse du Programme VSAM Existant**

#### 💬 Prompt Bob

```
Analyse le programme BNKCUST qui utilise des fichiers VSAM et identifie :
- Les opérations VSAM utilisées (READ, WRITE, REWRITE, DELETE, STARTBR, READNEXT)
- Les structures de données manipulées
- Les clés d'accès et index
- Les patterns d'accès aux données
- Les points de complexité pour la migration
```

#### ⚙️ Ce que Bob fait

Bob va :
1. Analyser le code COBOL pour identifier toutes les commandes CICS VSAM
2. Extraire les structures de données (copybooks, working-storage)
3. Identifier les clés primaires et secondaires utilisées
4. Documenter les patterns d'accès
5. Évaluer la complexité de migration pour chaque opération

#### ✅ Exemple de résultat

Bob génère un rapport d'analyse détaillé avec :
- Fichiers VSAM utilisés (type, clés, longueur)
- Opérations identifiées (READ, STARTBR/READNEXT, REWRITE, WRITE, DELETE)
- Tableau de complexité de migration
- Recommandations (créer table DB2, remplacer opérations, ajouter index)

---

### **Étape 2 : Conception du Modèle de Données DB2**

#### 💬 Prompt Bob

```
Propose un modèle de données DB2 pour remplacer le fichier VSAM CUSTOMER, incluant :
- La définition DDL de la table
- Les index nécessaires
- Les contraintes d'intégrité
- Les considérations de performance
```

#### ⚙️ Ce que Bob fait

Bob va :
1. Analyser la structure VSAM existante
2. Concevoir le schéma DB2 optimal
3. Générer les scripts DDL (CREATE TABLE, INDEX, CONSTRAINTS)
4. Proposer les index appropriés
5. Documenter les choix de conception

#### ✅ Exemple de résultat

Bob génère :
- Scripts DDL complets pour la table CUSTOMER
- Index sur clés primaires et secondaires
- Contraintes CHECK et DEFAULT
- Documentation des décisions de conception

---

### **Étape 3 : Refactorisation Interactive avec le Skill Command**

#### 💬 Prompt Bob (Mode 🧰 Z Code)

```
/refactor BNKCUST.cbl extractionGoal.md
```

**Explication** :
- `/refactor` : Commande du skill de refactorisation interactive
- `BNKCUST.cbl` : Fichier source à refactoriser
- `extractionGoal.md` : Document contenant les principes

#### ⚙️ Ce que Bob fait

Bob lance le **workflow interactif de refactorisation** en 4 phases :

**Phase 1 - Analyse** :
- Détecte toutes les opérations VSAM
- Charge les principes depuis extractionGoal.md
- Propose un plan de refactorisation

**Phase 2 - Validation** :
- Présente chaque transformation VSAM→SQL
- Demande confirmation utilisateur

**Phase 3 - Génération** :
- Génère le code refactorisé progressivement
- Remplace READ par SELECT, STARTBR/READNEXT par CURSOR, etc.
- Ajoute gestion transactionnelle (COMMIT/ROLLBACK)

**Phase 4 - Rapport Final** :
- Génère un rapport de comparaison AVANT/APRÈS
- Documente tous les changements

#### ✅ Exemple de résultat

Programme COBOL refactorisé avec :
- Toutes les opérations VSAM remplacées par SQL
- Curseurs DB2 pour parcours séquentiels
- Gestion transactionnelle complète
- Gestion d'erreur SQL robuste
- Compatibilité COMMAREA préservée

---

### **Étape 4 : Plan de Migration et Tests**

#### 💬 Prompt Bob

```
Crée un plan de migration complet pour passer de VSAM à DB2, incluant :
- Les étapes de migration
- La stratégie de test
- Le plan de rollback
- Les considérations de performance
- La checklist de validation
```

#### ⚙️ Ce que Bob fait

Bob génère un plan de migration détaillé en 5 phases :

1. **Préparation** : Création environnement DB2, migration données
2. **Développement** : Refactorisation code, tests unitaires
3. **Tests d'Intégration** : Tests fonctionnels, performance, charge
4. **Déploiement** : Bascule, validation post-déploiement
5. **Stabilisation** : Monitoring, optimisation

Inclut également :
- Plan de rollback (2 scénarios)
- Matrice des risques et mitigations
- Checklist de validation finale

---

## 💡 Valeur Ajoutée

| Aspect | Approche Manuelle | Avec Bob |
|--------|-------------------|----------|
| Analyse VSAM | 2-3 jours | 10 minutes |
| Conception DB2 | 3-5 jours | 15 minutes |
| Refactorisation code | 1-2 semaines | 30 minutes |
| Plan de migration | 3-5 jours | 20 minutes |

**Gain global : 90-95% de réduction du temps**

---

## 📋 Cas d'Usage

1. **Modernisation Progressive** : Migration par étapes des fichiers VSAM
2. **Amélioration des Performances** : Requêtes complexes plus rapides avec DB2
3. **Intégration Moderne** : Accès aux données depuis applications web/mobile
4. **Conformité et Audit** : Intégrité référentielle garantie

---

## 🎓 Points Clés à Retenir

### ✅ Avantages de la Migration

- **Performance** : DB2 optimisé pour requêtes complexes
- **Intégrité** : Contraintes et transactions ACID
- **Flexibilité** : SQL standard, jointures, agrégations
- **Intégration** : Accès facilité depuis autres systèmes

### ⚠️ Points d'Attention

1. Tester sous charge réelle avant production
2. Maintenir l'interface COMMAREA existante
3. Gérer correctement COMMIT/ROLLBACK
4. Surveiller DB2 après migration
5. Former l'équipe sur SQL et DB2

### 💡 Bonnes Pratiques

- **Tests exhaustifs** : Valider tous les scénarios
- **Migration progressive** : Un programme à la fois
- **Monitoring continu** : Surveiller performance DB2
- **Rollback ready** : Plan de secours testé

---

## 🚀 Récapitulatif des Prompts Clés

### Exercice 1 - Coding Standards

```
1. Génère un coding standard skill dans mon espace de travail en analysant les programmes COBOL existants

2. Modifie le fichier CBSA-standards-reference.md pour ajouter les règles suivantes : [...]

3. Crée-moi un programme COBOL qui [...] Suis le CBSA-standards-reference.md
```

### Exercice 2 - Refactorisation VSAM→DB2

```
1. Crée un document extractionGoal.md qui définit les principes de refactorisation [...]

2. Analyse le programme BNKCUST qui utilise des fichiers VSAM et identifie : [...]

3. Propose un modèle de données DB2 pour remplacer le fichier VSAM CUSTOMER [...]

4. /refactor BNKCUST.cbl extractionGoal.md

5. Crée un plan de migration complet pour passer de VSAM à DB2 [...]
```

---

## 📊 Gains Mesurables

| Exercice | Tâche | Sans Bob | Avec Bob | Gain |
|----------|-------|----------|----------|------|
| **1** | Coding Standards | 2-3 jours | 2 minutes | 99.9% |
| **2** | Migration VSAM→DB2 | 3-4 semaines | 75 minutes | 99.5% |

---

**Version** : 1.0  
**Date** : 2 juin 2026  
**Auteur** : IBM Bob Premium Package for Z Team

**Transformez votre façon de travailler avec le mainframe ! 🚀**