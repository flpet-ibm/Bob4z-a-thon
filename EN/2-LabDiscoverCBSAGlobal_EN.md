# Lab: Complete Analysis of the CBSA Application with Bob for Z

## Lab Overview

This lab guides you through a complete analysis of the **CICS Banking Sample Application (CBSA)** using **IBM Bob Premium Package for Z**,
the AI assistant specialized for IBM Z mainframe systems. 
As a complement to **LabDiscoverCBSA**, this lab additionally integrates the front-end part (Java, React, API,....).
You will learn to use different Bob modes and formulate effective prompts to obtain detailed analyses, documentation, and architecture diagrams.

---

## Prerequisites

- ✅ git client CLI
- ✅ VSCode with the **IBM Bob Premium Package for Z** extension installed
- ✅ CBSA project cloned locally (see **LabDiscoverCBSA**)
- ✅ Access to Bob's **Z Code** mode
- ✅ Basic knowledge of COBOL, JCL, and mainframe architecture (recommended but not mandatory)

---

## Estimated Duration

**Total time: 2-3 hours**

---

## Table of Contents

0. [Preparation 0: Retrieving the Application Front-end](#preparation-0)  
1. [Exercise 1: Initialization and Creation of AGENTS.md File](#exercise-1)
2. [Exercise 2: Data Dictionary Generation](#exercise-2)
3. [Exercise 3: COBOL Programs Inventory](#exercise-3)
4. [Exercise 4: Frontend Inventory](#exercise-4)
5. [Exercise 5: Architecture Diagrams](#exercise-5)
6. [Exercise 6: Functional Analysis - Local Transfer](#exercise-6)
7. [Exercise 7: User Guide](#exercise-7)
8. [Exercise 8: Technical Analysis - Credit Score](#exercise-8)

---



<a name="preparation-0"></a>
## Preparation 0: Retrieving the Application Front-end

## 🎯 Objective

Retrieve the source code of the CBSA application's front-end part from GitHub and prepare the workspace for the lab.

### 🔧 Bob Mode to Use

**Mode: 💻 Agent**

Agent mode allows executing system commands and manipulating files.

### 📝 Context

Before starting the analysis, you need to retrieve the CBSA application source code from the official GitHub repository. We will use Bob to automate this preparation. 
Open Bob, click on the **File>Open Folder** menu and choose the ~/CBSA directory.


### 💬 Bob Prompt 

```
Retrieve the directories named "src/bank-application-frontend", "src/webui", "src/Z-OS-Connect-Customer-Services-Interface", "src/Z-OS-Connect-Payment-Interface", "src/Z-OS-Connect-Payment-Interface" and "src/zosconnect_artefacts" in the CBSA directory from the GitHub repository https://github.com/ovallod/Bob4z-a-thon.git and place them them in this workspace. Then remove any temporary working directory you would have created.
```

### ✅ Sample Result 

Bob executes the following commands:

```bash
# Clone the repository into a temporary directory
rm -rf /tmp/cbsa-temp && git clone --depth 1 --filter=blob:none --sparse https://github.com/cicsdev/cics-banking-sample-application-cbsa.git /tmp/cbsa-temp
cd /tmp/cbsa-temp && git sparse-checkout set src/bank-application-frontend src/webui src/Z-OS-Connect-Customer-Services-Interface src/Z-OS-Connect-Payment-Interface src/zosconnect_artefacts

mkdir -p ./src && cp -r /tmp/cbsa-temp/src/bank-application-frontend /tmp/cbsa-temp/src/webui /tmp/cbsa-temp/src/Z-OS-Connect-Customer-Services-Interface /tmp/cbsa-temp/src/Z-OS-Connect-Payment-Interface /tmp/cbsa-temp/src/zosconnect_artefacts ./src/

```

**Console output**:
```
The following 5 directories have been retrieved from the GitHub repository and placed in the workspace:
1.	bank-application-frontend/ - Banking frontend application
2.	webui/ - Web user interface
3.	Z-OS-Connect-Customer-Services-Interface/ - z/OS Connect interface for customer services
4.	Z-OS-Connect-Payment-Interface/ - z/OS Connect interface for payments
5.	zosconnect_artefacts/ - z/OS Connect artifacts


```



### 🎓 What You Learn

- **Automation**: Bob can execute Git and system commands
- **Workspace preparation**: Bob can organize files for the lab
- **Verification**: Bob can validate that everything is in place
- **Time savings**: 5 minutes instead of 15-20 minutes manually

### ✅ Technical Prerequisites

Before starting the lab, make sure you have:

- **Bob** installed with the **IBM Z Open Editor** extension
- **IBM Bob Premium Package for Z** activated in Bob IDE
- **Git** installed on your system
- **Internet access** to clone the repository

### 🎯 You're Ready!

Once the workspace is prepared with Bob, if you have already completed LabDiscoverCBSA in this workspace, you can start directly at <a name="exercise-4">Exercise 4 Frontend Inventory</a>.
Otherwise, start at Exercise 1. 

<a name="exercise-1"></a>
## Exercise 1: Initialization and Creation of AGENTS.md File


### Objective
Create an AGENTS.md file that documents the project structure, build commands, coding standards, and key locations to guide Bob in its future analyses.

### Bob Mode to Use
🧰 **Z Code**

### Recommended Prompt
```
/init
```

### What Bob Will Do
1. Analyze the complete project structure
2. Detect the languages used (COBOL, JCL, Java, etc.)
3. Identify build commands (Maven, shell scripts)
4. Locate the data dictionary (bobz/DD.json)
5. Map COBOL programs to their technical documentation
6. Create the AGENTS.md file with all this information

### Sample Result
**File created:** `AGENTS.md`

**Expected content:**
- Workspace type (IBM Enterprise COBOL for z/OS)
- Detected languages (COBOL, JCL, BMS, Java 17)
- Build commands (build.sh, Maven)
- Directory structure
- Data dictionary location
- COBOL programs mapping to documentation
- Documentation rules (French language by default)

### Validation
✅ The AGENTS.md file exists at the project root  
✅ It contains a "Workspace Type" section  
✅ It contains a "Build Commands" section  
✅ It contains a COBOL → Documentation mapping table  
✅ It mentions the data dictionary location

### Estimated Time
⏱️ 5-10 minutes

---

<a name="exercise-2"></a>
## Exercise 2: Data Dictionary Generation

### Objective
Create a data dictionary to document COBOL variables with descriptions in French, facilitating mainframe code understanding.

### Bob Mode to Use
🧰 **Z Code**

### Recommended Prompt
```
Create a data dictionary for the BNKMENU program
```

### What Bob Will Do
1. Check if a dictionary already exists
2. Scan the BNKMENU.cbl COBOL program
3. Extract the most important variables (top 15)
4. Generate French descriptions for each variable
5. Create the bobz/DD.json file
6. Update AGENTS.md with the dictionary location

### Sample Result
**File created:** `bobz/DD.json`

**Expected content:**
```json
{
  "version": "2.0.0",
  "entries": [
    {
      "name": "COMM-EYE",
      "type": "variable",
      "shortDescription": "Communication Eyecatcher",
      "longDescription": "Control identifier for the communication area...",
      "origin": "AI",
      "scope": [{"programName": "BNKMENU"}]
    },
    ...
  ]
}
```

**Number of entries:** 15 documented variables

### Validation
✅ The bobz/DD.json file exists  
✅ It contains at least 15 entries  
✅ Each entry has a short and long description in French  
✅ The "scope" field contains "BNKMENU"  
✅ AGENTS.md has been updated with the dictionary location

### Estimated Time
⏱️ 10-15 minutes

---

<a name="exercise-3"></a>
## Exercise 3: COBOL Programs Inventory

### Objective
Create a complete inventory of all COBOL programs with their dependencies, classifications, and relationships.
(This exercise is also in the 1rst lab - LabDicoverCBSA. If you already did it, skip this exercise)

### Bob Mode to Use
🧰 **Z Code**

### Recommended Prompt
```
Make an inventory of all COBOL programs
```

### What Bob Will Do
1. Scan all COBOL programs (29 programs)
2. Analyze dependencies (copybooks, Db2 tables, VSAM files)
3. Classify programs (BMS, services, utilities, batch)
4. Create dependency matrices
5. Generate a dependency tree
6. Document each program with its role

### Sample Result
**File created:** `docs/COBOL_INVENTORY.md`

**Expected content:**
- Overview (29 programs)
- Classification by type:
  - BMS programs (11)
  - Service programs (13)
  - Utility programs (4)
  - Batch program (1)
- Detailed dependencies for each program:
  - Copybooks used
  - Db2 tables accessed (READ/WRITE)
  - VSAM files accessed
  - Programs called
- Dependency matrices
- Dependency tree
- Detailed documentation per program

### Validation
✅ The docs/COBOL_INVENTORY.md file exists  
✅ It lists the 29 COBOL programs  
✅ Each program has its dependencies documented  
✅ Access types (READ/WRITE) are specified  
✅ Dependency matrices are present

### Estimated Time
⏱️ 15-20 minutes

---

<a name="exercise-4"></a>
## Exercise 4: Frontend Inventory

### Objective
Document the complete frontend architecture including REST APIs, JSON models, and data access layers.

### Bob Mode to Use
🧰 **Z Code**

### Recommended Prompt
```
make an inventory of the front end
```

### What Bob Will Do
1. Analyze JAX-RS REST resources (5 resources)
2. Document all endpoints with HTTP methods
3. Analyze JSON models (13 classes)
4. Document the data access layer (8 classes)
5. Identify COBOL interfaces (8 classes)
6. Create complete structured documentation

### Sample Result
**File created:** `docs/FRONTEND_INVENTORY.md`

**Expected content:**

**1. REST Resources (5):**
- AccountsResource: 5 endpoints
- CustomerResource: 5 endpoints
- ProcessedTransactionResource: 3 endpoints
- CompanyNameResource: 1 endpoint
- SortCodeResource: 1 endpoint

**2. JSON Models (13):**
- AccountJSON, DebitCreditAccountJSON, TransferLocalJSON
- CustomerJSON
- ProcessedTransactionJSON (6 variants)
- CreditScore, CreditScoreCICS540

**3. Data Access Layer (8):**
- Account.java, AccountList.java (Db2)
- Customer.java, CustomerList.java (VSAM)
- GetUserSortCode.java
- HBankDataAccess.java

**4. COBOL Interfaces (8):**
- CRECUST.java, CUSTOMER.java, PROCTRAN.java
- GetCompany.java, GetSortCode.java
- NewAccountNumber.java, NewCustomerNumber.java
- CustomerControl.java

### Validation
✅ The docs/FRONTEND_INVENTORY.md file exists  
✅ The 5 REST resources are documented with all their endpoints  
✅ The 13 JSON models are listed with their attributes  
✅ The 8 data access classes are documented  
✅ The 8 COBOL interfaces are listed  
✅ Architecture patterns are explained

### Estimated Time
⏱️ 15-20 minutes

---

<a name="exercise-5"></a>
## Exercise 5: Architecture Diagrams

### Objective
Create Draw.io diagrams visualizing the global architecture and detailed frontend architecture.

### Bob Mode to Use
🧰 **Z Code**

### Exercise 5A: Global Architecture Diagram

#### Recommended Prompt
```
generate a global diagram (in draw.io) integrating the front-end and backend by distinguishing the different layers of the application
```

#### Sample Result
**File created:** `docs/CBSA_Architecture_Diagram.drawio`

**Expected content:**
- 5 distinct layers with color codes:
  1. **Presentation Layer** (Blue): BMS 3270, Carbon React UI, Spring Boot UI, Mobile
  2. **REST API Layer** (Yellow): 5 JAX-RS resources, z/OS Connect
  3. **Business Logic Layer** (Pink): 29 COBOL programs
  4. **Data Access Layer** (Purple): Db2, VSAM, COBOL Interfaces
  5. **Storage Layer** (Green): Db2 Tables, VSAM Files, BMS Maps
- Arrows showing data flows between layers
- Complete legend
- Technical notes

#### Validation
✅ The file opens correctly in Draw.io  
✅ The 5 layers are visible and distinct  
✅ Data flows are represented by arrows  
✅ The legend is present and complete

### Exercise 5B: Detailed Frontend Diagram

#### Recommended Prompt
```
make a detailed diagram of the front end part
```

#### Sample Result
**File created:** `docs/CBSA_Frontend_Detailed_Diagram.drawio`

**Expected content:**
- 5 layers with complete details:
  1. **Client**: 4 types of interfaces
  2. **REST API**: All detailed endpoints
  3. **JSON Models**: 13 classes with attributes
  4. **Data Access**: 8 classes with methods
  5. **COBOL Backend**: 29 classified programs
- HTTP/REST, JCICS LINK, SQL/VSAM flows
- Technologies used (JAX-RS, JCICS, Carbon Design System)
- Complete statistics

#### Validation
✅ The file opens correctly in Draw.io  
✅ All REST endpoints are listed  
✅ The 13 JSON models are represented  
✅ Communication flows are clear  
✅ Technologies are documented

### Estimated Time
⏱️ 20-25 minutes (10-12 min per diagram)

---

<a name="exercise-6"></a>
## Exercise 6: Functional Analysis - Local Transfer

### Objective
In the previous exercises, you should have discovered the different transactions of the application. Here we are focusing on one of these transaction. Understand in depth how the local funds transfer transaction works.

### Bob Mode to Use
🧰 **Z Code**

### Recommended Prompt
```
what does the Transfer local transaction consist of?
```

### What Bob Will Do
1. Read source files (TransferLocalJSON.java, XFRFUN.cbl, BNK1TFN.cbl)
2. Analyze the transaction flow
3. Identify validations performed
4. Document error handling
5. Explain the anti-deadlock strategy
6. Detail security mechanisms (SYNCPOINT, ROLLBACK)

### Sample Result
**Bob's response containing:**

**1. Components Involved:**
- TransferLocalJSON.java (model)
- BNK1TFN.cbl (BMS interface)
- XFRFUN.cbl (business logic)

**2. Transaction Flow:**
- Initial validation (amount > 0, different accounts)
- Update order (deadlock prevention)
- Source account update (debit)
- Destination account update (credit)
- Audit recording (PROCTRAN)

**3. Error Handling:**
- Code '1': Source account not found
- Code '2': Destination account not found
- Code '3': Unexpected error
- Code '4': Invalid amount

**4. Security Mechanisms:**
- Atomic transaction (ACID)
- SYNCPOINT ROLLBACK
- Deadlock prevention
- Complete audit trail

### Validation
✅ The explanation covers the 3 main components  
✅ The transaction flow is detailed step by step  
✅ The 4 error codes are explained  
✅ Security mechanisms are documented  
✅ The anti-deadlock strategy is explained

### Estimated Time
⏱️ 10-15 minutes

---

<a name="exercise-7"></a>
## Exercise 7: User Guide

### Objective
Create a complete user guide for the local transfer function, intended for end users.

### Bob Mode to Use
🧰 **Z Code**

### Recommended Prompt
```
Make me a user guide for local transfer.
```

### What Bob Will Do
1. Create a professional guide structure
2. Document prerequisites
3. Explain access via the 3 interfaces (BMS, Web, API)
4. Detail the step-by-step procedure
5. List all error messages with solutions
6. Provide practical examples
7. Add FAQ and security tips

### Sample Result
**File created:** `docs/USER_GUIDE_LOCAL_TRANSFER.md`

**Expected content (500 lines):**

**1. Main Sections:**
- Overview
- Prerequisites
- Function access (BMS 3270, Web, REST API)
- Transfer procedure (4 detailed steps)
- Validation and confirmation
- Error messages (6 types)
- Practical examples (3 scenarios)
- Frequently asked questions (8 questions)
- Security tips

**2. Visual Elements:**
- Simulated BMS screenshots
- REST API request examples
- Keyboard shortcut tables
- Balance calculation examples

**3. Technical Information:**
- COBOL programs involved
- Database tables
- CICS transaction codes

### Validation
✅ The file is approximately 500 lines  
✅ The 3 interfaces are documented (BMS, Web, API)  
✅ The procedure is detailed in 4 steps  
✅ The 6 error messages are explained with solutions  
✅ 3 practical examples are provided  
✅ The FAQ contains at least 8 questions  
✅ Security tips are present

### Estimated Time
⏱️ 15-20 minutes

---

<a name="exercise-8"></a>
## Exercise 8: Technical Analysis - Credit Score

### Objective
Understand the credit scoring system and its technical implementation with the JCICS asynchronous API.

### Bob Mode to Use
🧰 **Z Code**

### Exercise 8A: General Operation

#### Recommended Prompt
```
what does the Credit Score function do?
```

#### Sample Result
**Bob's response containing:**

**1. Architecture:**
- CreditScore.java (entry point)
- CreditScoreCICS540.java (advanced implementation)
- CRDTAGY1-5.cbl (5 simulated agencies)

**2. Process:**
- Launch of 5 asynchronous transactions
- Each agency generates a score 1-999
- Random delay 0-3 seconds per agency
- Result collection with getAny()
- Average score calculation

**3. Characteristics:**
- Parallelism (Async JCICS API)
- Resilience (continues if one agency fails)
- Fallback (backup mode if CICS < 5.4)
- Performance (3 sec max instead of 15 sec sequential)

### Exercise 8B: Value Scale

#### Recommended Prompt
```
What is the credit score value scale?
```

#### Sample Result
**Bob's response containing:**

**1. Value Range:**
- Minimum: 1
- Maximum: 999
- Type: Integer

**2. Calculation:**
```
Final Score = (Score1 + Score2 + Score3 + Score4 + Score5) / 5
```

**3. Suggested Interpretation:**
- 1-199: Very Low
- 200-399: Low
- 400-599: Average
- 600-799: Good
- 800-999: Excellent

**4. Comparison:**
- CBSA: 1-999 (fictional)
- FICO: 300-850 (USA)
- Experian: 0-999 (UK)

### Validation
✅ The 3-tier architecture is explained  
✅ The asynchronous process is detailed  
✅ The 1-999 scale is documented  
✅ The calculation formula is provided  
✅ A score interpretation is proposed  
✅ The comparison with real systems is made

### Estimated Time
⏱️ 15-20 minutes (7-10 min per sub-exercise)

---

## Deliverables Summary

At the end of this lab, you will have created the following files:

| # | File | Type | Size |
|---|---------|------|--------|
| 1 | AGENTS.md | Documentation | ~150 lines |
| 2 | bobz/DD.json | Dictionary | 15 entries |
| 3 | docs/COBOL_INVENTORY.md | Inventory | ~800 lines |
| 4 | docs/FRONTEND_INVENTORY.md | Inventory | ~600 lines |
| 5 | docs/CBSA_Architecture_Diagram.drawio | Diagram | 5 layers |
| 6 | docs/CBSA_Frontend_Detailed_Diagram.drawio | Diagram | 5 layers |
| 7 | docs/USER_GUIDE_LOCAL_TRANSFER.md | Guide | ~500 lines |

**Total: 7 files completely documenting the CBSA application**

---

## Skills Acquired

At the end of this lab, you will know how to:

✅ Initialize a mainframe project with Bob  
✅ Create and maintain a data dictionary  
✅ Generate complete COBOL code inventories  
✅ Document frontend/backend architectures  
✅ Create professional architecture diagrams  
✅ Analyze complex CICS transactions  
✅ Write detailed user guides  
✅ Understand the JCICS asynchronous API  
✅ Effectively use Bob's different modes  
✅ Formulate precise and effective prompts

---

## Tips for Success

### 1. Prompt Formulation
- ✅ **Be precise**: "Make an inventory of the frontend" rather than "Analyze the code"
- ✅ **Use French**: Bob is configured to respond in French
- ✅ **One task at a time**: Don't combine multiple complex requests

### 2. Mode Usage
- 🧰 **Z Code**: For all mainframe analyses and documentation generation
- 📐 **Z Architect**: For architecture and design analyses (not used in this lab)
- ❓ **Ask**: For questions without code modification

### 3. Result Validation
- ✅ Always verify that files are created
- ✅ Open files to validate their content
- ✅ Test Draw.io diagrams in the editor
- ✅ Read Bob's explanations to understand the context

### 4. Time Management
- ⏱️ Follow the estimated times for each exercise
- ⏱️ Take breaks between long exercises
- ⏱️ Don't hesitate to ask Bob for clarifications

---

## Troubleshooting

### Problem: Bob doesn't respond
**Solution:** Verify that you are in Z Code mode and that the project is open in VSCode

### Problem: The file is not created
**Solution:** Check write permissions and available disk space

### Problem: The Draw.io diagram doesn't open
**Solution:** Install the Draw.io Integration extension in VSCode


---

## Additional Resources

- **CBSA Documentation**: `doc/CBSA_Architecture_guide.md`
- **Installation Guide**: `etc/install/base/doc/README.md`
- **BMS User Guide**: `etc/usage/base/doc/CBSA_BMS_User_Guide.md`
- **Bob Documentation**: IBM Bob Premium Package for Z Extension

---

## Conclusion

This lab allowed you to discover the power of IBM Bob Premium Package for Z in analyzing and documenting complex mainframe applications. You learned to:

- Use different types of prompts to obtain precise results
- Automatically generate professional documentation
- Create visual architecture diagrams
- Understand complex CICS transactions
- Document REST APIs and data models

**Next Steps:**
- Apply these techniques to your own mainframe projects
- Explore Bob's other modes (Z Architect, Ask)
- Create your own custom skills with the skill-builder
- Share your discoveries with your team

---

**Lab Version:** 1.0  
**Creation Date:** May 12, 2026  
**Author:** IBM CE EMEA Team  
**Total Duration:** 2-3 hours

---

© 2026 IBM - CICS Banking Sample Application Lab
