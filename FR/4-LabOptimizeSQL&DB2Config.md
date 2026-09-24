# Guide de Lab : Optimisation SQL statique & Db2 for z/OS
## Lab pratique : Analyse SQL, modélisation relationnelle et optimisation des performances Db2 sur CBSA

---

## Table des matières


1. [Exercice 1 : Inventaire et analyse des instructions SQL à l'échelle de l'application](#exercice-1--inventaire-et-analyse-des-instructions-sql-à-léchelle-de-lapplication)
2. [Exercice 2 : Récupérer les JCLs DDL](#exercice-2--récupérer-les-jcls-ddl)
3. [Exercice 3 : Rétro-ingénierie du DDL vers un schéma entité-association (ERD)](#exercice-3--rétro-ingénierie-du-ddl-vers-un-schéma-entité-association-erd)
4. [Exercice 4 : Analyse globale d'amélioration des performances (DDL + SQL)](#exercice-4--analyse-globale-damélioration-des-performances-ddl--sql)
5. [Exercice 5 : Appliquer les améliorations de performances — Créer l'index manquant](#exercice-5--appliquer-les-améliorations-de-performances--créer-lindex-manquant)
6. [Exercice 6 : Génération d'un diagramme d'architecture au format draw.io](#exercice-6--génération-dun-diagramme-darchitecture-au-format-drawio)

---

## Vue d'ensemble et objectifs du Lab

Dans ce lab pratique, vous explorerez et analyserez l'architecture de base de données relationnelle ainsi que la couche SQL embarqué de l'application **IBM CBSA (Customer Banking Sample Application)** sur z/OS.

En complétant ce lab, vous apprendrez à :
1. Identifier et inventorier les instructions Db2 SQL embarquées (`EXEC SQL ... END-EXEC`) à travers les modules COBOL d'entreprise.
2. Analyser les modèles de programmation SQL, identifier les anti-patterns et découvrir les opportunités d'optimisation (ex. Multi-Row Fetch, contention de verrous, journalisation excessive de colonnes).
3. Inspecter les DDL Db2 for z/OS et les définitions de stockage physique (Bases de données, Groupes de stockage, Tablespaces, Tables et Index).
4. Faire de la rétro-ingénierie et générer un **schéma entité-association (ERD)** ainsi qu'une **hiérarchie de stockage physique**.
5. Formuler des améliorations pour la base de données physique et rédiger des requêtes SQL optimisées.
6. Exporter des modèles d'architecture visuels au format de diagramme **draw.io**.

---

## Architecture du Lab et prérequis

- **Application** : IBM CBSA (Customer Banking Sample Application)
- **Langages** : IBM Enterprise COBOL for z/OS, CICS BMS, Db2 Embedded SQL, JCL
- **Répertoires clés** :
  - `cobol_src/`, `cobol_src2/`, `cobol_src3/` : Code source COBOL applicatif
  - `cobol_copy/` : Copybooks partagés et déclarations SQL (`SQLCA`, `ACCDB2`, `PROCDB2`, `CONTDB2`)
  - `db2jcl/` : Scripts JCL Db2 et définitions DDL
  - `docs/` : Documentation technique et rapports générés
  - `graph/` : Schémas d'architecture, diagrammes ERD et visuels

---


## Exercice 1 : Inventaire et analyse des instructions SQL à l'échelle de l'application

### Contexte
Les applications mainframe d'entreprise combinent souvent plusieurs sources de données (VSAM, Db2, IMS DL/I). Avant d'optimiser les opérations en base de données ou de concevoir des services, les architectes et développeurs doivent établir un catalogue précis de toutes les instructions SQL et identifier les éventuels anti-patterns.

### Mode Bob à utiliser
🧰 **Z Code**

Le mode Agent permet d'exécuter des commandes système et de manipuler des fichiers.

### Prompt à exécuter

```text
create a md report about SQL statements in the application. For each COBOL module, SQL statements should be listed with a text explaining the potential optimizations or SQL statements best practice deviations.
```

### Résultat attendu et étapes de vérification

1. **Fichier généré** : [`docs/CBSA-analysis-sql-statements.md`](docs/CBSA-analysis-sql-statements.md:1)
2. **Concepts clés à vérifier dans le rapport généré** :
   - **Programmes identifiés (10 modules)** :
     - [`cobol_src/BANKDATA.cbl`](cobol_src/BANKDATA.cbl:1) (Initialisation des données par lots / Batch)
     - [`cobol_src/CREACC.cbl`](cobol_src2/CREACC.cbl:1) (Service de création de compte)
     - ...
   - **Anti-patterns identifiés** :
     - Point chaud de concurrence sur la gestion des séquences de la table `CONTROL`.
     - Réécriture complète de la ligne lors des mises à jour de solde dans `DBCRFUN` et `XFRFUN`.
     - Parcours de curseur ligne par ligne dans `INQACCCU` au lieu d'un Multi-Row Fetch (MRF).
     - Surcharge liée à l'utilisation d'un curseur pour des recherches sur clé unique dans `INQACC`.

---
## Exercice 2 : Récupérer les JCLs DDL

### Contexte
La base de données CBSA est initialisée à partir d'un ensemble de JCLs fournis dans le sous-répertoire CBSA de notre dépôt Git. Copions-les dans notre espace de travail pour une analyse plus approfondie.

### Mode Bob à utiliser
🧰 **Agent**

### Prompt à exécuter

```text
Retrieve the directory named "CBSA/etc/install/base/db2jcl" from the GitHub repository https://github.com/ovallod/Bob4z-a-thon.git and place it in this workspace as "db2jcl". Then remove any temporary working directory you would have created.
```

### Résultat attendu et étapes de vérification

Bob exécute la commande Git et crée le répertoire `db2jcl` à la racine de l'espace de travail avec les fichiers JCL.

---
## Exercice 3 : Rétro-ingénierie du DDL vers un schéma entité-association (ERD)

### Contexte
Les bases de données physiques Db2 sur z/OS sont configurées à l'aide de jobs JCL exécutant `IKJEFT01` et `DSNTEP2` pour appliquer les instructions DDL. Dans cette étape, vous analyserez les fichiers DDL situés sous `db2jcl/` afin de comprendre le modèle de données et les contraintes relationnelles.

### Mode Bob à utiliser
🧰 **Z Code**

### Prompt à exécuter

```text
using DDL files in @db2jcl create an entity relationship diagram of the database
```

### Résultat attendu et étapes de vérification

1. **Fichier généré** : [`graph/CBSA-archi-database-erd.md`](graph/CBSA-archi-database-erd.md:1)
2. **Concepts clés à vérifier** :
   - **Tables et structures de données** :
     - `IBMUSER.ACCOUNT` ([`db2jcl/CRETB01.jcl`](db2jcl/CRETB01.jcl:20)) : Table maîtresse des comptes principaux. Clé primaire composite sur `(ACCOUNT_SORTCODE, ACCOUNT_NUMBER)`.
     - `IBMUSER.PROCTRAN` ([`db2jcl/CRETB02.jcl`](db2jcl/CRETB02.jcl:20)) : Journal des transactions et événements d'audit. Relation de clé étrangère vers `ACCOUNT`.
     - `IBMUSER.CONTROL` ([`db2jcl/CRETB03.jcl`](db2jcl/CRETB03.jcl:21)) : Table de paramètres et de génération de séquences. Clé unique sur `CONTROL_NAME`.
     - ...
   - **Diagrammes Mermaid** :
     - Un diagramme ER Mermaid montrant la relation `ACCOUNT` $1:N$ `PROCTRAN`.
     - Un diagramme hiérarchique Mermaid cartographiant Groupes de stockage $\rightarrow$ Tablespaces $\rightarrow$ Tables $\rightarrow$ Index.

---

## Exercice 4 : Analyse globale d'amélioration des performances (DDL + SQL)

### Contexte
L'obtention d'un débit optimal et d'une faible latence sur les charges de travail mainframe nécessite d'aligner la conception physique de la base de données (clustering, index, partitionnement, buffer pools) avec les chemins d'accès SQL applicatifs.

### Mode Bob à utiliser
🧰 **Z Code**

### Prompt à exécuter

```text
according to the DDL definitions and SQL statements in the application, identify all potential performance improvements either in the SQL statements writing or in the database definition
```

### Résultat attendu et étapes de vérification

1. **Fichier généré** : [`docs/CBSA-analysis-db2-performance-improvements.md`](docs/CBSA-analysis-db2-performance-improvements.md:1)
2. **Principales conclusions de performance à examiner** :
   - **Optimisations DDL** :
     - *Critique* : Index manquant sur `PROCTRAN` — provoque des balayages de table complets (table scans) lors des consultations d'historique. Recommandation : ajouter un index composite de clustering.
     - *Critique* : Verrouillage procédural sur `CONTROL` — recommandation de remplacer par des objets natifs Db2 `SEQUENCE`.
     - *Modernisation* : Migrer les tablespaces par défaut vers des Universal Table Spaces (UTS Partition-By-Growth) avec `LOCKSIZE ROW`.
   - **Optimisations SQL** :
     - Restreindre les clauses `SET` des `UPDATE ACCOUNT` aux seules colonnes modifiées (`AVAILABLE_BALANCE`, `ACTUAL_BALANCE`) pour réduire le volume de logs d'environ 50%.
     - Convertir la boucle de fetch dans `INQACCCU` en `FETCH NEXT ROWSET FOR 20 ROWS` (Multi-Row Fetch).
     - Remplacer le curseur dans `INQACC` par un `SELECT ... INTO` unique (singleton).
     - Éliminer les interblocages (deadlocks) lors des virements dans `XFRFUN` en appliquant un ordre de verrouillage canonique (`MIN(account_key)` en premier).

---

## Exercice 5 : Appliquer les améliorations de performances — Créer l'index manquant

### Contexte
Obtenir des recommandations est une première étape, les appliquer est encore mieux.

### Mode Bob à utiliser
🧰 **Z Code**

### Prompt à exécuter

```text
create a new JCL in order to create the missing index on PROCTRAN as pointed by  paragraph 3.1 in @docs\CBSA-analysis-db2-performance-improvements.md
```

### Résultat attendu et étapes de vérification

1. **Fichier généré** : `db2jcl/CREI401.jcl`
2. **Points clés de performance à inspecter** :
   - **Contenu du fichier** :
```sql
CREATE INDEX IBMUSER.PROCTRAN_IX1
   ON IBMUSER.PROCTRAN (PROCTRAN_SORTCODE ASC,
                        PROCTRAN_NUMBER   ASC,
                        PROCTRAN_DATE     DESC,
                        PROCTRAN_TIME     DESC)
   USING STOGROUP PROCTRAN
   CLUSTER;
```

---

## Exercice 6 : Génération d'un diagramme d'architecture au format draw.io

### Contexte
Bien que les diagrammes Markdown soient pratiques pour la documentation, les architectes système ont fréquemment besoin de diagrammes éditables dans des formats standards comme draw.io / diagrams.net.

### Prompt à exécuter

```text
create a draw.io chart for the Physical Storage Hierarchy in @graph\CBSA-archi-database-erd.md
```

### Résultat attendu et étapes de vérification

1. **Fichier généré** : [`graph/CBSA-archi-physical-storage-hierarchy.drawio`](graph/CBSA-archi-physical-storage-hierarchy.drawio:1)
2. **Vérification visuelle** :
   - Ouvrir le fichier `.drawio` avec l'extension **Draw.io Integration** dans VS Code ou l'importer sur [app.diagrams.net](https://app.diagrams.net).
   - Vérifier les couches d'imbrication visuelles :
     - **Couche Base de données** : `Database CBSA` (`BP1`, `BP2`).
     - **Groupes de stockage** : `ACCOUNT`, `PROCTRAN`, `CONTROL` (`VCAT DSNV12DP`).
     - **Tablespaces** : `CBSA.ACCOUNT`, `CBSA.PROCTRAN`, `CBSA.CONTROL`.
     - **Tables** : `IBMUSER.ACCOUNT`, `IBMUSER.PROCTRAN`, `IBMUSER.CONTROL`.
     - **Index** : `ACCTINDX`, `ACCTCUST`...

---

## Prochaines étapes...

- Demander à Bob de mettre à jour la documentation SQL suite à la création du nouvel index
- Créer une "skill" pour générer automatiquement la documentation et les recommandations

## Conclusion et points clés à retenir

Au cours de cette session de lab, vous avez maîtrisé le processus d'analyse d'un sous-système de base de données mainframe critique :
- Comment effectuer une découverte automatisée des requêtes SQL transverses dans le code source COBOL.
- Comment évaluer les chemins d'accès Db2 et les comportements de verrouillage pour éviter les interblocages et conditions de concurrence.
- Comment traduire des scripts DDL JCL z/OS en diagrammes relationnels standards et modèles graphiques draw.io.
- <b>Ce type d'analyse <b>statique</b> ne remplace pas le travail d'optimisation d'un expert DB2 connecté à une base de données alimentée.</b>
