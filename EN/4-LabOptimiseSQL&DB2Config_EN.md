# Static SQL Optimization & Db2 for z/OS Lab Guide
## Hands-On Lab: SQL Analysis, Relational Modeling, and Db2 Performance Optimization on CBSA

---

## Table of Contents


1. [Exercise 1: Application-Wide SQL Statement Inventory & Analysis](#exercise-1-application-wide-sql-statement-inventory--analysis)
2. [Exercise 2: Retrieve DDL JCLs](#exercise-2-retrieve-ddl-jcls)
3. [Exercise 3: Reverse-Engineering DDL to an Entity Relationship Diagram (ERD)](#exercise-3-reverse-engineering-ddl-to-an-entity-relationship-diagram-erd)
4. [Exercise 4: Full-Stack Performance Improvement Analysis (DDL + SQL)](#exercise-4-full-stack-performance-improvement-analysis-ddl--sql)
5. [Exercise 5: Apply Performance Improvements — Create Missing Index](#exercise-5-full-stack-performance-improvement-analysis-ddl--sql)
6. [Exercise 6: Generating an Architectural Diagram in draw.io Format](#exercise-6-generating-an-architectural-diagram-in-drawio-format)

---

## Lab Overview & Objectives

In this hands-on lab, you will explore and analyze the relational database architecture and embedded SQL layer of the **IBM CBSA (Customer Banking Sample Application)** on z/OS. 

By completing this lab, you will learn how to:
1. Identify and inventory embedded Db2 SQL statements (`EXEC SQL ... END-EXEC`) across enterprise COBOL modules.
2. Analyze SQL programming patterns, identify anti-patterns, and discover optimization opportunities (e.g. Multi-Row Fetch, lock contention, excessive column logging).
3. Inspect Db2 for z/OS DDL and physical storage definitions (Databases, Storage Groups, Tablespaces, Tables, and Indexes).
4. Reverse-engineer and generate an **Entity-Relationship Diagram (ERD)** and **Physical Storage Hierarchy**.
5. Formulate physical database enhancements and write optimized SQL queries.
6. Export visual architectural models to **draw.io** diagramming format.

---

## Lab Architecture & Prerequisites

- **Application**: IBM CBSA (Customer Banking Sample Application)
- **Languages**: IBM Enterprise COBOL for z/OS, CICS BMS, Db2 Embedded SQL, JCL
- **Key Directories**:
  - `cobol_src/`, `cobol_src2/`, `cobol_src3/`: Application COBOL source code
  - `cobol_copy/`: Shared copybooks and SQL declarations (`SQLCA`, `ACCDB2`, `PROCDB2`, `CONTDB2`)
  - `db2jcl/`: Db2 JCL scripts and DDL definitions
  - `docs/`: Generated technical documentation and reports
  - `graph/`: Architecture schemas, ERDs, and visual diagrams

---


## Exercise 1: Application-Wide SQL Statement Inventory & Analysis

### Context
Enterprise mainframe applications often combine multiple data stores (VSAM, Db2, IMS DL/I). Before optimizing database operations or designing services, architects and developers must create an accurate catalog of all SQL statements and identify any anti-patterns.

### Bob Mode to Use
🧰 **Z Code**

Agent mode allows executing system commands and manipulating files.

### Prompt to Execute

```text
create a md report about SQL statements in the application. For each COBOL module, SQL statements should be listed with a text explaining the potential optimizations or SQL statements best practice deviations.
```

### Expected Output & Verification Steps

1. **File Generated**: [`docs/CBSA-analysis-sql-statements.md`](docs/CBSA-analysis-sql-statements.md:1)
2. **Key Concepts to Verify in the Generated Report**:
   - **Programs Identified (10 modules)**:
     - [`cobol_src/BANKDATA.cbl`](cobol_src/BANKDATA.cbl:1) (Batch data initialization)
     - [`cobol_src/CREACC.cbl`](cobol_src2/CREACC.cbl:1) (Create Account service)
     - ...
   - **Identified Anti-Patterns**:
     - Concurrency hotspot on `CONTROL` table sequence management.
     - Full-row rewriting during balance updates in `DBCRFUN` and `XFRFUN`.
     - Single-row cursor fetching in `INQACCCU` instead of Multi-Row Fetch (MRF).
     - Single-row cursor overhead for unique key lookups in `INQACC`.

---
## Exercise 2: Retrieve DDL JCLs

### Context
CBSA database is populated from a set of JCLs provided in the CBSA sub-directory of our git repository. Let's copy them into our workspace for a wider analyze.

### Bob Mode to Use
🧰 **Agent**

### Prompt to Execute

```text
Retrieve the directory named "CBSA/etc/install/base/db2jcl" from the GitHub repository https://github.com/ovallod/Bob4z-a-thon.git and place it in this workspace as "db2jcl". Then remove any temporary working directory you would have created.
```

### Expected Output & Verification Steps

Bob exceute the git command and create db2jcl directory under the workspace with the jcls.

---
## Exercise 3: Reverse-Engineering DDL to an Entity Relationship Diagram (ERD)

### Context
Db2 physical databases on z/OS are configured using JCL jobs running `IKJEFT01` and `DSNTEP2` to execute DDL statements. In this step, you will analyze the DDL files under `db2jcl/` to understand the data model and relationship constraints.

### Bob Mode to Use
🧰 **Z Code**

### Prompt to Execute

```text
using DDL files in @db2jcl create an entity relationship diagram of the database
```

### Expected Output & Verification Steps

1. **File Generated**: [`graph/CBSA-archi-database-erd.md`](graph/CBSA-archi-database-erd.md:1)
2. **Key Concepts to Verify**:
   - **Tables and Data Structures**:
     - `IBMUSER.ACCOUNT` ([`db2jcl/CRETB01.jcl`](db2jcl/CRETB01.jcl:20)): Primary account master table. Composite Primary Key on `(ACCOUNT_SORTCODE, ACCOUNT_NUMBER)`.
     - `IBMUSER.PROCTRAN` ([`db2jcl/CRETB02.jcl`](db2jcl/CRETB02.jcl:20)): Transaction and audit event log. Foreign Key relationship to `ACCOUNT`.
     - `IBMUSER.CONTROL` ([`db2jcl/CRETB03.jcl`](db2jcl/CRETB03.jcl:21)): Parameter and sequence generator table. Unique key on `CONTROL_NAME`.
     -...
   - **Mermaid Diagrams**:
     - A Mermaid ER diagram showing the `ACCOUNT` $1:N$ `PROCTRAN` relationship.
     - A Mermaid hierarchy diagram mapping Storage Groups $\rightarrow$ Tablespaces $\rightarrow$ Tables $\rightarrow$ Indexes.

---

## Exercise 4: Full-Stack Performance Improvement Analysis (DDL + SQL)

### Context
Achieving optimal throughput and low latency on mainframe workloads requires aligning physical database design (clustering, indexes, partition properties, buffer pools) with application SQL access paths.

### Bob Mode to Use
🧰 **Z Code**

### Prompt to Execute

```text
according to the DDL definitions and SQL statements in the application, identify all potential performance improvements either in the SQL statements writing or in the database definition
```

### Expected Output & Verification Steps

1. **File Generated**: [`docs/CBSA-analysis-db2-performance-improvements.md`](docs/CBSA-analysis-db2-performance-improvements.md:1)
2. **Key Performance Findings to Inspect**:
   - **DDL Optimizations**:
     - *Critical*: Missing index on `PROCTRAN` — creates table scans on history lookups. Recommendation: Add a composite clustering index.
     - *Critical*: Procedural locking on `CONTROL` — recommend replacing with native Db2 `SEQUENCE` objects.
     - *Modernization*: Migrate default tablespaces to Universal Table Spaces (UTS Partition-By-Growth) with `LOCKSIZE ROW`.
   - **SQL Optimizations**:
     - Narrow `UPDATE ACCOUNT` `SET` clauses to only modified columns (`AVAILABLE_BALANCE`, `ACTUAL_BALANCE`) to cut logging volume by ~50%.
     - Convert `INQACCCU` fetch loop to `FETCH NEXT ROWSET FOR 20 ROWS` (Multi-Row Fetch).
     - Replace cursor in `INQACC` with a singleton `SELECT ... INTO`.
     - Eliminate transfer deadlocks in `XFRFUN` by enforcing canonical lock ordering (`MIN(account_key)` first).

---

## Exercise 5: Full-Stack Performance Improvement Analysis (DDL + SQL)

### Context
Getting recommendations is a first point, applying them is better.

### Bob Mode to Use
🧰 **Z Code**

### Prompt to Execute

```text
create a new JCL in order to create the missing index on PROCTRAN as pointed by  paragraph 3.1 in @docs\CBSA-analysis-db2-performance-improvements.md
```

### Expected Output & Verification Steps

1. **File Generated**: db2jcl/CREI401.jcl
2. **Key Performance Findings to Inspect**:
   - **File Content**:
CREATE INDEX IBMUSER.PROCTRAN_IX1
   ON IBMUSER.PROCTRAN (PROCTRAN_SORTCODE ASC,
                        PROCTRAN_NUMBER   ASC,
                        PROCTRAN_DATE     DESC,
                        PROCTRAN_TIME     DESC)
   USING STOGROUP PROCTRAN
   CLUSTER;

---

## Exercise 6: Generating an Architectural Diagram in draw.io Format

### Context
While markdown diagrams are convenient for documentation, system architects frequently need editable diagrams in standard diagramming formats like draw.io / diagrams.net.

### Prompt to Execute

```text
create a draw.io chart for the Physical Storage Hierarchy in @graph\CBSA-archi-database-erd.md
```

### Expected Output & Verification Steps

1. **File Generated**: [`graph/CBSA-archi-physical-storage-hierarchy.drawio`](graph/CBSA-archi-physical-storage-hierarchy.drawio:1)
2. **Visual Verification**:
   - Open the `.drawio` file using the **Draw.io Integration** extension in VS Code or upload it to [app.diagrams.net](https://app.diagrams.net).
   - Verify the visual containment layers:
     - **Database Layer**: `Database CBSA` (`BP1`, `BP2`).
     - **Storage Groups**: `ACCOUNT`, `PROCTRAN`, `CONTROL` (`VCAT DSNV12DP`).
     - **Tablespaces**: `CBSA.ACCOUNT`, `CBSA.PROCTRAN`, `CBSA.CONTROL`.
     - **Tables**: `IBMUSER.ACCOUNT`, `IBMUSER.PROCTRAN`, `IBMUSER.CONTROL`.
     - **Indexes**: `ACCTINDX`, `ACCTCUST`...

---

## Next steps...

- Ask Bob to update SQL documentation according to the new index creation
- Create a "skill" to generate the documentation and the recommendations

## Conclusion & Key Takeaways

Through this lab session, students have mastered the workflow of analyzing a mission-critical mainframe database subsystem:
- How to perform automated cross-module SQL discovery across enterprise COBOL sources.
- How to evaluate Db2 access paths and locking behavior to prevent deadlocks and race conditions.
- How to translate z/OS JCL DDL scripts into standard relational diagrams and visual draw.io models.
- <b>These kind of <b>static</b> analysis does not replace DB2 expert optimization works connected to a populated database</b>
