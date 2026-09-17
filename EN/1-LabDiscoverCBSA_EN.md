# Lab: Discovering IBM Bob Premium Package for Z
## Analysis and Documentation of a CICS Mainframe Application

**Estimated Duration:** 2-3 hours  
**Level:** Intermediate to Advanced  
**Prerequisites:** Basic knowledge of COBOL and CICS

---

## 📋 Table of Contents

1. [Introduction](#1-introduction)
2. [IBM Bob Premium Package for Z Modes](#2-ibm-bob-premium-package-for-z-modes)
3. [Lab Preparation](#3-lab-preparation)
4. [Lab Context](#4-lab-context)
5. [Learning Objectives](#5-learning-objectives)
6. [Exercise 0: Define Naming and Organization Rules](#exercise-0-define-naming-and-organization-rules)
7. [Exercise 1: Workspace Initialization and Analysis](#exercise-1-workspace-initialization-and-analysis)
8. [Exercise 2: Application Inventory Generation and Coding Standards](#exercise-2-application-inventory-generation-and-coding-standards)
9. [Exercise 3: Architecture Diagram Creation](#exercise-3-architecture-diagram-creation)
10. [Exercise 4: BANKDATA Program Documentation](#exercise-4-bankdata-program-documentation)
11. [Exercise 5a: Business Rules Analysis](#exercise-5a-business-rules-analysis)
12. [Exercise 5b: Business Rules Analysis and inline code generation](#exercise-5b-business-rules-analysis-and-inline-code-generation)
13. [Exercise 6: Change Impact Analysis](#exercise-6-change-impact-analysis)
14. [Exercise 7: User Journey Documentation](#exercise-7-user-journey-documentation)
15. [Exercise 8: Email Search Implementation](#exercise-8-email-search-implementation)
18. [Conclusion](#7conclusion)

---

## 1. Introduction
[↩️](#-table-of-contents)
### What is IBM Bob Premium Package for Z?

**IBM Bob Premium Package for Z** is an AI assistant specialized in analyzing, documenting, and modernizing IBM Z mainframe applications. It combines:

- 🧠 **Advanced Artificial Intelligence** to understand COBOL, PL/I, Assembler, JCL, and REXX code
- 📊 **Automatic analysis** of application structure and dependencies
- 📝 **Documentation generation** technical and functional
- 🔍 **Impact analysis** for evolutions and modifications
- 🎯 **Recommendations** for modernization and optimization

### Why This Lab?

This lab will allow you to concretely discover how Bob Premium for Z can:

1. **Accelerate understanding** of complex mainframe applications
2. **Automate documentation** technical and functional
3. **Facilitate impact analysis** before modifications
4. **Improve quality** of project documentation
5. **Reduce time** for onboarding new developers

---

## 2. IBM Bob Premium Package for Z Modes
[↩️](#-table-of-contents)
Bob Premium for Z offers several specialized modes for different types of tasks:

### 🧰 Z Code
**Specialty:** Mainframe code analysis and documentation
- Analysis of COBOL, PL/I, JCL, Assembler, REXX programs
- Business rules extraction
- Application inventory generation
- Data dictionary creation
- Detailed technical documentation

**When to use it:**
- Source code analysis
- Business logic understanding
- Program documentation
- Pattern extraction

### 📐 Z Architect
**Specialty:** Mainframe application architecture and design
- Architecture diagram creation
- Change impact analysis
- Feasibility assessment
- Evolution planning
- Dependency analysis
- Architectural documentation

**When to use it:**
- Architecture design
- Impact analysis
- Feasibility studies
- Project planning
- Architecture reviews

### ❓ Ask
**Specialty:** Explanations and user documentation
- Non-technical documentation
- User guides
- Educational explanations
- Question answering
- Training

**When to use it:**
- User documentation
- Training guides
- Simplified explanations
- FAQ and support

### 💻 Agent
**Specialty:** Code modification and generation
- Code writing
- Refactoring
- Bug fixes
- Feature implementation

**When to use it:**
- New feature development
- Code modifications
- Corrections

### 📝 Plan
**Specialty:** Planning and strategy
- Project planning
- Strategy definition
- Roadmaps
- Technical specifications

**When to use it:**
- Project planning
- Strategy definition
- Specification creation

---

## 3. Lab Preparation
[↩️](#-table-of-contents)
### 🎯 Objective

Retrieve the CBSA application source code from GitHub and prepare the workspace for the lab.

### 🎯 Prerequisites

- Have git client CLI installed on a workstation (MacOS, Linux, or Windows)
- Have IBM Bob Version 2 installed on a workstation (MacOS, Linux, or Windows)
- Have the following extensions installed:
    - Zowe Explorer 3.5.0 (or higher)
    - IBM Z Open Editor 6.6.0 (or higher)
    - IBM Bob Premium Pac 3.0.0 (or higher)
    - Mermaid (latest version)
    - Draw.io Integration (latest version)


### 🔧 Bob Mode to Use

**Mode: 💻 Agent**

Agent mode allows executing system commands and manipulating files.

### 📝 Context

Before starting the analysis, you need to retrieve the CBSA application source code from the official GitHub repository. We will use Bob to automate this preparation.
First, create a CBSA directory in your home directory.
Open Bob IDE, click on the **File>Open Folder** menu and choose the ~/CBSA directory.


### 💬 Bob Prompt

```
Retrieve the sub-directory named "src/base" in the CBSA directory from the GitHub repository https://github.com/ovallod/Bob4z-a-thon.git and place it in the current workspace folder. Then remove any temporary working directory you would have created.
```


### ✅ Sample Result

Bob executes the git commands, the sub-directory copy and the removal of the working directory where the git repository was cloned.


**Prompt output**:
```
Confirms the "src/base" directory from the GitHub repository has been successfully retrieved.

Prompt ends with the detail of the retrieved context:
README.md 
bms_src/:  CICS screens
cobol_copy/: copybooks 
cobol_src/: COBOL programs 

```



### 🎓 What You Learn

- **Automation**: Bob can execute Git and system commands
- **Workspace preparation**: Bob can organize files for the lab
- **Verification**: Bob can validate that everything is in place
- **Time savings**: 5 minutes instead of 15-20 minutes manually

### ✅ Technical Prerequisites

Before starting the lab, make sure you have:

- **IBM Bob** installed with the **IBM Z Open Editor** extension
- **IBM Bob Premium Pac** activated in Bob
- **Git** installed on your system
- **Internet access** to clone the repository

### 🎯 You're Ready!

Once the workspace is prepared with Bob, you can click on "New Task" and start Exercise 0.

---

## 4. Lab Context
[↩️](#-table-of-contents)
### The Application: CICS Banking Sample Application (CBSA)

You will work on a real banking application that simulates bank teller operations:

**Technical characteristics:**
- **Platform:** IBM z/OS with CICS Transaction Server V5.4+
- **Language:** IBM Enterprise COBOL for z/OS
- **Database:** IBM Db2 V12+
- **Interface:** 3270 terminals with BMS (Basic Mapping Support)
- **Architecture:** Transaction processing with online and batch programs

**Business functionalities:**
- Customer creation and management
- Bank account creation and management
- Account inquiry
- Transfers between accounts
- Account debit/credit
- External credit agency simulation

**Complexity:**
- 29 COBOL programs
- 37 copybooks
- 9 BMS screens
- 4 Db2 tables
- Multi-tier architecture (presentation, business logic, data)

### Initial Situation

You have just joined the maintenance team for this application. You have the source code but:

- ❌ No up-to-date technical documentation
- ❌ No program inventory
- ❌ Undocumented architecture
- ❌ Business rules not formalized
- ❌ Dependencies between programs unknown
- ❌ Impact of modifications difficult to assess

**Your mission:** Use IBM Bob Premium Pac to analyze and document this application in a few hours instead of several weeks.

### Preliminary Remarks


- <span style="color: red;">Bob relies on AI agentics, which by definition is not deterministic. For some exercises, you may therefore notice slight differences between your result and the one described in this lab. And sometimes, you will have to add additional instructions to Bob to get the result you expect. This is, in general, the approach to have with Bob: it always gets to the result, but sometimes you have to take a different path to get there.</span>
- **Counts made by AI can be inaccurate. Therefore, calculations should be done by engineering rather than by AI.**
- IBM Bob Premium Pac relies on existing metadata or metadata it builds in a local database. In the discussion with Bob, it may ask whether to use a centralized metadata repository (e.g., "Do you want to use the Z Understand service for a complete dependency analysis, or analyze only the local workspace?"). **In the context of this lab, we do not use the Z Understand service.**
- In the various exercises to follow, Bob will be able to propose different options in response to a prompt. It is important to choose the right option to obtain the desired result. In any case, you can always go back and test another option.


---

## 5. Learning Objectives
[↩️](#-table-of-contents)
At the end of this lab, you will be able to:

✅ **Initialize** a mainframe workspace with IBM Bob Premium Pac  
✅ **Automatically generate** a complete application inventory  
✅ **Create** visual architecture diagrams  
✅ **Analyze** business rules buried in code  
✅ **Assess** the impact of modifications on the application  
✅ **Document** user journeys  
✅ **Propose** technical evolutions with feasibility analysis  


---

## Exercise 0: Define Naming and Organization Rules
[↩️](#-table-of-contents)

### 🎯 Objective

Before starting your project analysis, establish the rules and conventions to apply.
For example, clear conventions for organizing and naming resources generated by Bob to maintain a structured and consistent workspace.
And specify that documentation will be written in English.


### ✍️ Your Prompt (in a new task)

Write your own prompt to ask Bob to define naming and organization conventions for generated resources.

**Expected in your prompt:**
- specify target directories ([`docs/`](docs) for documentation, [`tools/`](tools) for tools)
- impose a structured naming convention
- provide concrete examples of expected format
- you may explicitly request the creation/update of [`AGENTS.md`](AGENTS.md)

### ✅ Recommended Prompt

```text
Create the following Bob rules (file in .bob/rules): 
- Documents must be stored in the docs/ directory. Documents specific to a program should be stored in a sub-directory of docs/ using the program name. For example, documents about BNKMENU should be stored in docs/BNKMENU/ directory.
- Tools must be stored in the tools/ directory.
- Schemas, drawings and graphs must be stored in graph/ directory.

Document, schemas, drawings and graphs file names must follow these conventions:

-- Prefix: program name (e.g., BNKMENU) if the document concerns a specific program, or CBSA for the application, or GLOBAL for cross-cutting documents

-- Document type: analysis, archi, docu, inv, plan, spec

-- Format: [PREFIX]-[TYPE]-[description].md
```
If Bob propose you to use create-skill skill, decline (anyway, if you accept it should find that he does not need it).
### 🔀 Prompt Variants (to be refined)

```text
Define a standard naming convention for all documents and tools generated in this workspace, then save it in AGENTS.md.
```

```text
Add rules in AGENTS.md for organizing documentation and scripts, with a consistent naming format and examples.
```

### ✅ Sample Result

Bob create .bob/rules or updates the **`AGENTS.md`** file with a dedicated section for conventions and may create a specific document to detail naming conventions:

```markdown

## File Organization

### Directory Structure

- **`docs/`**: All project documents (analyses, architectures, specifications, etc.)
- **`tools/`**: Scripts and utility tools for the project
...

## Document Naming Conventions
...

```

#### Note:
Bob may create the rules in the .bob/rules.md file rather than in AGENTS.md. It will take the rules into account the same way, whether in one file or the other


### 🎓 What You Learn

- **.bob/rules.md** (or **AGENTS.md**) provides the rules that will be applied to the workspace.

- **Structured organization:** A well-organized workspace facilitates navigation and maintenance
- **Clear conventions:** Consistent naming rules allow quick document retrieval
- **Scalability:** The structure supports project growth without disorganization
- **Collaboration:** The entire team follows the same conventions

### 💡 Best Practices

1. **Always respect conventions**: Even for temporary documents
2. **Use descriptive names**: The name should clearly indicate the content
3. **Organize by type**: Group similar documents in the same directories
4. **Document exceptions**: If you must deviate from rules, document why in AGENTS.md

### ⚠️ Mistakes to Avoid

- ❌ Creating documents at the project root
- ❌ Using generic names like `doc1.md`, `analysis.md`
- ❌ Mixing multiple content types in one document
- ❌ Forgetting the prefix (program or CBSA/GLOBAL)
- **Critical patterns:** Bob identifies mandatory compilation directives and error patterns

### 💡 IBM Bob Premium Pac Added Value

| Without Bob | With IBM Bob Premium Pac |
|----------|------------------------|
| Incomplete documentation | Exhaustive and structured documentation |
| Risk of missing critical patterns | All patterns automatically identified |
| No standardization | Conventions established from the start |

---

## Exercise 1: Workspace Initialization and Analysis
[↩️](#-table-of-contents)

### 🎯 Objective

Initialize the workspace and create the `AGENTS.md` file that will serve as a guide for Bob and developers.
Create metadata from existing programs and resources, and generate the data dictionary.


### 🔧 Bob Mode to Use

**Mode: 🧰 Z Code**

Z Code mode is specialized for analyzing and documenting mainframe applications (COBOL, PL/I, JCL, Assembler, REXX).

### 📝 Context

You have a CBSA project that you are discovering. You need to:
- Understand the project structure
- Identify the languages used
- Locate important files
- Build metadata that will facilitate project analysis and the data dictionary that will enable more relevant documentation.

### ✍️ Your Prompt (in a new task)

Write your own prompt to ask Bob to initialize and fully analyze the workspace.

**Expected in your prompt:**
- request workspace initialization
- request a global analysis of the project structure
- request the creation of framing artifacts (like [`AGENTS.md`](AGENTS.md))
- specify that you want to quickly understand the application content

### ✅ Recommended Prompt

```text
/init and create the local metadata database with the scan_program tool.
```

**Note:** The `init` command is a special IBM Bob Premium Pac command that triggers a complete workspace analysis. 
The metadata DB is a Premium Pac specific feature to provide better and accurate analysis about the code in the workspace.

### 🔀 Prompt Variants(to be refined)

```text
Initialize this workspace and analyze the complete project structure.
```

```text
Analyze this mainframe repository, identify key components and prepare necessary framing files.
```

### ⚙️ What Bob Does Automatically

Bob will:

***Analyze the COBOL workspace (structure, languages, files)***
***Detect present mainframe languages***
***Check for data dictionary existence (bobz/DD.json)***
***Search for coding standards***
***Locate technical documentation***
***Map COBOL programs to their documentation***
***Display detected configuration for confirmation***
***Update AGENTS.md with non-obvious information***

### ✅ Add more z/OS knowledge (languages, middleware...) to your repository (will be automatic in the next version)

Update AGENTS.md by adding at the end:

```text
# Workspace Configuration

Target Platform: IBM Z
```

### ✅ Sample Result


**Modified files:**

1. **`AGENTS.md`** (workspace root)

### ✍️ Your Action to generate the data dictionary

To initiate the workflow, click the Start Workflow icon (Play button), select "Generate data dictionary". Then click "Start".
Bob will ask you to select the program from which the data dictionary will be build: BANKDATA (you can only select one program).

### ⚙️ What Bob Does Automatically

Bob will use specific ***Skills*** and ***tools*** from the ***IBM Bob Premium Package for Z***. It will:
- Check for .bobz/local-settings.json and database existence
- **Scan COBOL programs if necessary**
- Extract variables from programs
- **Create the DD.json data dictionary**
- Update AGENTS.md with dictionary location


### ✅ Points of Attention

You will observe that Bob will use specific ***skills*** and ***tools*** from the ***IBM Premium Package for Z***. It may notably use the tools such as `scan_program` (to scan COBOL programs), `get_variables` (to extract variables from programs) or `edit_data_dictionary` (to create the database).

Here is intermediate information provided by Bob:
'''
No database was found for COBOL programs. I need to scan the programs to create the analysis database. I will scan the directory containing the COBOL programs.


***I want to use a tool on IBM Bob Premium Package for Z***

scan_program
Scans COBOL or PL/I programs. This tool uses the folder URI to scan all the programs in the directory. State the file URI to scan a single program.
'''
...
'''
Excellent! The scan succeeded and analyzed 29 COBOL programs. The database was created and its location was stored in .bobz/local-settings.json.

Now, I will extract the variables to create the data dictionary. I will start with the BANKDATA program that we analyzed previously.


***I want to use a tool on IBM Bob Premium Package for Z***

get_variables
Returns up to 200 of the top variables used in the BANKDATA program. These variables are retrieved from metadata generated by the scan_program tool.
'''


### ✅ Sample Result

Data dictionary successfully created for the CBSA banking application.

Summary of actions:

✅ Scan of 29 COBOL programs in base/cobol_src/
✅ Analysis database created and stored in .bobz/local-settings.json
✅ Variable extraction from BANKDATA program
✅ Selection of 15 critical business variables
✅ Expansion and documentation of variables with business context
✅ Creation of bobz/DD.json file with 15 documented entries
✅ Update of AGENTS.md with dictionary location



### 🎓 What You Learn

- **The importance of initialization**: The workspace is the starting point for all analyses. Some steps are essential before going further. You need to generate metadata (see .bobz/local-settings.json) and the data dictionary (see bobz/DD.json) to have quality analyses.
- **Time savings:** Instead of spending 2-3 days manually exploring the code, Bob analyzes everything in a few minutes
- **Standardization:** Conventions are automatically established
- **Living documentation:** The AGENTS.md file serves as a reference for the entire team

---

## Exercise 2: Application Inventory Generation and Coding Standards
[↩️](#-table-of-contents)

### 🎯 Objective of Application Inventory Generation

Generate a complete application inventory with all programs, copybooks, BMS screens, Db2 tables and VSAM files.

### 🔧 Bob Mode to Use

**Mode: 🧰 Z Code**

Z Code mode automatically analyzes mainframe application structure and generates detailed inventories.

### 📝 Context

Now that the workspace is initialized, you need a detailed inventory to:
- Know all application components
- Understand program categories
- Identify dependencies
- Have an overview of the architecture

### ✍️ Your Prompt (in a new task)

Write your own prompt to request a complete CBSA application inventory. Feel free to refine your request with several successive prompts if necessary.

**Expected in your prompt:**
- request a global application inventory
- cover programs, copybooks, screens, and data
- request categorization or role per component
- request an exploitable output in a document

### ✅ Recommended Prompt

```text
Generate a complete inventory of the CBSA application, with for each program, their type, role, and dependencies (used copybooks, BMS screens, DB2 tables and files used - with access mode -, queues, and called programs).
```

### 🔀 Prompt Variants

```text
Create a CBSA application inventory document with technical components, their uses, and main flows.
```

```text
Map CBSA components: COBOL programs, copybooks, BMS maps, Db2 tables, and main dependencies.
```

### ⚙️ What Bob Does Automatically

Bob will scan, analyze, and document all application components by creating a structured inventory. It will use the Premium for Z tool ***execute_sql_query*** to access the metadata database to extract source information and generate a structured Markdown document.

### ✅ Sample Result

**Created file: `docs/CBSA-INV***.md`**

Contains:
- Executive summary with statistics
- Inventory of COBOL programs and their dependencies
- ...

### 🎯 Objective of Coding Standards

Discover and document the current patterns to apply them to new code (or assert them to the current code).

### 🔧 Bob Mode to Use

**Mode: 🧰 Z Code**

Z Code mode automatically analyzes mainframe application structure and generates detailed inventories.

### 📝 Context

Now that the workspace is initialized and you have a detailed inventory, you need to find:
- coding practice
- naming conventions
- error handling practice
...

### ✅ Recommended Prompt (in a new task)

```text
/z-coding-standards-skill-builder
```
Reply Yes when Bob propose you to include ZCodeScan in the skill
### ⚙️ What Bob Does Automatically

Bob will scan, analyze, and document all application components. It will use the IBM bob Premium Package for Z skill tool ***/z-coding-standards-skill-builder*** to analyse the code, varaible and paragraphs names, error handling...

At the end of Bob output, you will find examples on how to activate this new skill.
### ✅ Sample Result

**Created file: `.bob/skills/cbsa-coding-standards/SKILL.md` with more details in references sub-directory**

Contains:
- patterns
- checklist
- sample code
- ...
### ✅ Testing the new skill in a new task
Attention: To be sure the new skill will be found, you have to reload your workspace. To do that, close the folder (Menu : File> Close Folder) then reopen it (Menu: File>Open Folder)

```text
verify @base/cobol_src/BNK1CAC.cbl is respecting cbsa coding standards
```
Only for some lines of code:
Either select a code block. Right click > IBM Bob > Improve code

Or using the prompt:
```text
Improve the following code from base/cobol_src/BNK1CAC.cbl:239-254
```
## Exercise 3: Architecture Diagram Creation
[↩️](#-table-of-contents)


### Step 1 - 🎯 Objective

Create a visual architecture diagram in Draw.io format showing application layers and data flows.

#### 🔧 Bob Mode to Use

**Mode: 📐 Z Architect**

Z Architect mode specializes in creating architecture diagrams and analyzing application flows.

#### 📝 Context

The textual inventory is useful, but a visual representation is essential for communicating the architecture.

#### ✍️ Your Prompt

Write your own prompt to request a visual architecture diagram of the application.

**Expected in your prompt:**
- specify the expected format (Draw.io)
- request application layers
- request key flows and dependencies
- request integration of external resources and data

#### ✅ Recommended Prompt

```text
Build an architecture diagram (in draw.io) illustrating the program dependencies of the CBSA application.
```

#### 🔀 Prompt Variants

```text
Produce a Draw.io diagram of the CBSA architecture with functional layers, components, and data flows.
```

```text
Visually document the CBSA architecture in a Draw.io file representing programs, databases, and major dependencies.
```

#### ✅ Sample Result

**File created: `docs/CBSA-ARCHITECTURE.drawio`**

Editable diagram showing 4 layers:
- Presentation (3270 terminals)
- Business logic (CICS programs)
- Data access (Db2)
- External services (credit agencies)

Note that you can improve the graph with additional prompts, such as:
```text
Modify the diagram with straight links (non-orthogonal).
```
```text
In the diagram, distinguish the different types of access (SELECT, INSERT, DELETE, UPDATE) on tables with distinct colors.
```
```text
change @docs/CBSA-archi-dependances.drawio so that all texts are written in black
```

**Compare this result to that of the prompt:**

```text
generate a program call graph
```

#### 💡 IBM Bob Premium Package for Z Added Value

| Without Bob | With IBM Bob Premium Package for Z |
|----------|------------------------|
| 2-3 days of manual creation | 5 minutes of automatic generation |
| Static diagram (PowerPoint) | Editable format (Draw.io) |
| Difficult to update | Easy regeneration |

### Step 2 — 🎯 Objective: Call Graph Generation
Generate comprehensive call graphs for all programs in the workspace and the local database, organized by functional topics.

#### 🔧 Bob Mode to Use
**Mode: 📐 Z Architect**

Z Architect mode is ideal for mapping inter-program relationships, tracing call chains, and producing structured documentation that shows how programs collaborate across functional domains.

#### 📝 Context
The architecture diagram from Step 1 gives a high-level view of the application layers. Call graphs go one level deeper: they show exactly which program calls which, enabling developers and architects to:

trace execution paths end-to-end
identify shared subroutines and reuse patterns
understand coupling between functional areas
onboard new team members onto specific business flows quickly
Organizing the output by functional topic (e.g., account management, customer management, payment processing) makes the documentation immediately useful even for very large workspaces.

#### ✍️ Your Task
Write your own prompt to request call graph documentation, covering all programs in the workspace and the local database, grouped by business function.

#### Expected in your prompt:

request call graphs for all programs in the workspace
include the local database in the analysis scope
organize the output by functional topics
produce the result as structured documentation (e.g., a Markdown file)

#### 💬 Bob Prompt
```text
Create documentation with comprehensive call graphs of all programs in the workspace and the local database, organized by functional topics.
```

#### ✅ Sample Result
Bob produces a Markdown document (e.g., docs/cbsa-call-graphs.md) containing:

One section per functional topic (Account Management, Customer Management, Payment Processing, Utility Services, …)
For each topic: a Mermaid call graph showing the full call chain between CICS programs, copybooks, and Db2 stored procedures
Cross-references to database tables accessed within each call chain
A summary table listing all programs, their callers, and their callees

---

## Exercise 4: BANKDATA Program Documentation
[↩️](#-table-of-contents)

### 🎯 Objective

Generate complete technical documentation for the BANKDATA batch program that initializes application data.

### 🔧 Bob Mode to Use

**Mode: 🧰 Z Code**

Z Code mode specializes in detailed analysis and documentation of COBOL programs.

### 📝 Context

BANKDATA is the batch data initialization program. It is critical to understand:
- How data is generated
- Which structures are initialized
- Test data generation rules
- Dependencies with VSAM and DB2

### ✍️ Your Prompt

Write your own prompt to request complete technical documentation for the [`BANKDATA`](base/cobol_src/BANKDATA.cbl) program.

**Expected in your prompt:**
- explicitly name the target program
- request to explain or document the program
- you are not required to specify explanation sections, as IBM Bob Premium Package for Z provides a default document structure.

### ✅ Recommended Action

```text
click on the "Play" button of Bob, then start "Explain code". Select BANKDATA.cbl. Select the perspective.
```
nb: you may test the three perspectives. For each perspective, there will a different file with content tailored to the selected job role.

### 🔀 Prompt Variants

```text
/explain @base/cobol_src/BANKDATA.cbl
```
With this prompt Bob will adapt the explanation to the current Bob mode (Z Code or Z Architect).
You will need to ask mode to save the explanation in a md file.

### ✅ Sample Result

IBM Bob Premium Package for Z uses a specialized workflow to generate detailed technical documents from COBOL source code (whole-file-explanation). If you haven't specified the target audience for the explanation, Bob will offer to choose between 3 profiles: ARCHITECT, DEVELOPER, BUSINESS.

If you request an explanation, Bob may not save it to a file. You must then explicitly request it.
```text
save the BANKDATA explanation
```

**File created: **`docs/explain/xxxxxx-BANKDATA.md`**
or (/explain) **`docs/BANKDATA/BANKDATA/docu....md`**


### 🎓 What You Learn

- **Automatic documentation**: Bob analyzes code and generates structured documentation
- **Batch understanding**: Batch processing logic with VSAM and DB2
- **Parameterization**: Using PARMs to make programs flexible
- **Data generation**: Techniques for creating coherent test data sets
- **Error handling**: VSAM and DB2 error handling patterns

### 💡 IBM Bob Premium Package for Z Added Value

| Aspect | Manual Documentation | With IBM Bob Premium Package for Z |
|--------|------------------------|------------------------|
| **Time** | 1-2 days of analysis and writing | 5 minutes of generation |
| **Quality** | Variable depending on writer | Standardized and exhaustive |
| **Diagrams** | Tedious manual creation | Automatic generation |
| **Updates** | Difficult to maintain | Instant regeneration |
| **Coverage** | Often partial | 100% of code analyzed |

**Gain**: **99.7% time reduction**

### 📝 Using the Documentation

This documentation is useful for:

1. **Onboarding**: New developers quickly understand BANKDATA
2. **Maintenance**: Reference when modifying the program
3. **Testing**: Understanding how to generate data sets
4. **Migration**: Documenting behavior before modernization
5. **Audit**: Traceability of initialization logic

---

## Exercise 5a: Business Rules Analysis
[↩️](#-table-of-contents)

### 🎯 Objective

Query Bob about the application to discover and analyze in depth the impact of changing a data element. Here, we start by analyzing a program's variables, then analyze in depth the use of SORTCODE (bank branch code) throughout the application.

### 🔧 Bob Mode to Use

**Mode: 🧰 Z Code**

Z Code mode excels at pattern analysis and extracting business rules embedded in COBOL code.

### 📝 Context

SORTCODE is a critical element:
- 6-digit code identifying the bank branch
- Used in all tables as a composite key
- Current fixed value: 987654

### ✍️ Your Prompt

Start by identifying a program's variables. Then, refine the description of one of these variables' use throughout the application. Finally, analyze the impact of changing this variable across the entire application.

**Expected in your prompt:**
- request a cross-application search
- request occurrences and uses
- request implicit business rules
- request a summary of architectural impacts

### ✅ Recommended Prompt

```text
What variables are used in INQACCCU?
```

### ✅ Sample Result

Analysis of INQACCCU program variables completed successfully.

Results:

15 main business variables identified and documented
13 new entries added to data dictionary
Total: 28 entries in dictionary (15 existing from BANKDATA + 13 new)
Key variables documented for INQACCCU:

CUSTOMER-NUMBER - Customer identifier used for search
NUMBER-OF-ACCOUNTS - Account counter found (max 20)
CUSTOMER-FOUND - Customer existence indicator
COMM-SUCCESS - Operation success indicator
HV-ACCOUNT-* - DB2 host variables for account data (number, type, balances, rates, overdraft)
COMM-FAIL-CODE - Detailed error code
DB2-DATE-REFORMAT - DB2 date conversion to display format
SORTCODE - Bank sort code for branch filtering
Updated file: bobz/DD.json

The data dictionary now contains business definitions for BANKDATA and INQACCCU programs.

### ✅ Prompt to Continue Analysis:

```text
How is the SORTCODE variable used in the application?
```

### ✅ Sample Result

Role in application,usage by program...


### ✅ Prompt to Continue Analysis:

```text
what is the architectural importance of SORTCODE?
```

---
## Exercise 5b: Business Rules Analysis and inline code generation
[↩️](#-table-of-contents)

### 🎯 Objective

Query Bob about the business rules coded in a module, then ask it to create a new one from the editor

### 🔧 Bob Mode to Use

**Mode: 🧰 Z Code**

Z Code mode excels at pattern analysis and extracting business rules embedded in COBOL code.

### 📝 Context

BNK1CAC is the create account program. It verifies the input with a list of rules.

### ✍️ Your Prompt
### ✅ Recommended Prompt

```text
Extract and save in a md file, the business rules from @base/cobol_src/BNK1CAC.cbl
```

**Expected in your prompt:**
- scope the promp to the target module
- request implicit business rules

### ✅ Sample Result

Creation of docs/BNK1CAC/BNK1CAC-business-rules.md file.

It should contain Input Validation Rules
- Customer Number Validation
- Account Type Validation
- Interest Rate Validation
...

There are three verifications on the customer number (length, not underscore, numeric). We will add a new one: the customer number should start with 99.

Comment 1: the file should also contain other sections than "Input Validation Rules". They may be considered to be more technical rules than business rules and removed).

Comment 2: ""Generate Documentation"" workflow can also be used to create a file that will contain the list of business rules (per paragraph). This report contains documentation with many other aspects of a program.

### ✅ Prompt to Create the new rule:

Open BNK1CAC.cbl in the editor. Place your cursor at the beginning of line 458 (Ctrl G 458; this should be just after the validation that the customer number is numeric) and enter in the editor). 
Right click, in the contextual menu, select the menu "IBM Bob">"Add to Context" : it adds the reference as context in the prompt window ("BNK1CAC.cbl:458-458")

In the prompt area of IBM Bob complete the prompt with "add a test to verify a customer number should start with 99":
```text
BNK1CAC.cbl:458-458 add a test to verify a customer number should start with 99
```


### ✅ Sample Result (you may have to close BNK1CAC.cbl out of the editor (do not save it) and reèopen it)
1 - BNK1CAC is updated with a new rule startting at line 459:
```text
           IF CUSTNOI(1:2) NOT = '99'
              MOVE SPACES TO MESSAGEO
              STRING 'Customer number must start with 99'
                    DELIMITED BY SIZE,
                     ' ' DELIMITED BY SIZE
                 INTO MESSAGEO
              MOVE 'N' TO VALID-DATA-SW
              MOVE -1 TO CUSTNOL
              GO TO ED999
           END-IF.
```

2 - BNK1CAC-business-rules.md is updated with the new rule and its associated error message.


### ✅ Missing Copybook.

Edit BNK1CAC.cbl\
In the list of problems at the bottom of the IDE you should see a message indicating  "Copybook BNK1CAM is missing introuvable" \
right click on the message and select "Correct with Bob" \
Accept the prompt

### ✅ Sample result
Bob should find the missing copybook should contain BMS field definitions. From the BMS definition, it should recreate the missing copybook.
After Bob IDE has recreated BNK1CAM.cpy, there still should be errors about the missing DFAID copybook which is part of CICS system libraries.


### ✅ Potential enhancements

### ✅ Prompt to generate the report

```text
Create a markdown formatted report on all of the possible enhancements that could be made on @base/cobol_src/BNK1CAC.cbl
```

### ✅ Exemple de résultat

The report (in docs/BNK1CAC) should find a bug in move to ABND-TIME, duplicated lines...

---

## Exercise 6: Change Impact Analysis
[↩️](#-table-of-contents)

### 🎯 Objective

Evaluate the impact of changing SORTCODE from a fixed value to a variable value to support multiple branches.

### 🔧 Bob Mode to Use

**Mode: 📐 Z Architect**

Z Architect mode is ideal for impact analysis, risk assessment, and architectural change planning.

### 📝 Context

The business wants to deploy the application in multiple branches. You must evaluate the effort and risks.

### ✍️ Your Prompt

Write your own prompt to request an impact analysis of a major design change around SORTCODE.

**Expected in your prompt:**
- clearly describe the target change
- request impacted components
- request effort and risk estimation
- request a transition or migration plan

### ✅ Recommended Prompt

```text
Analyze the impact of changing SORTCODE to support multiple bank branches.
```

### 🔀 Prompt Variants

```text
Evaluate the technical and project consequences of moving to a variable SORTCODE in CBSA.
Provide:
- List of programs to modify
- Estimated development effort
- Identified risks
- Data migration plan
- Estimated cost
```

```text
Perform a complete impact analysis to transform the fixed SORTCODE into multi-branch data, with risks, effort, and migration.
```

### ✅ Sample Result

**File created: `docs/CBSA-archi-impact***.md`**

# Impact Analysis: Multi-Branch Banking Support

**Date**: 2026-05-11  
**Analyst**: Bob (Z Architect)  
**Proposed Change**: Modify architecture to support multiple branch codes (SORTCODE) instead of a single hardcoded value

---
```
## 1. Executive Summary

### Proposed Change
Transform the CBSA application from a **single-branch** architecture (fixed SORTCODE = 987654) to a **multi-branch** architecture allowing management of multiple bank branches with distinct SORTCODEs.

### Global Impact
- **Impact level**: CRITICAL - Major architectural change
- **Affected programs**: 21 out of 28 programs (75%)
- **Impacted components**: Copybooks, DB2 tables, VSAM files, BMS screens, business logic
- **Estimated effort**: 4-6 weeks development + 2-3 weeks testing
- **Risk**: HIGH - Modifications affecting data structures and business logic

---

## 2. Current vs. Target Architecture

### 2.1 Current Architecture (Single-Branch)
...
### 2.2 Target Architecture (Multi-Branch)
## 3. Impacted Components
### 3.1 Copybooks (CRITICAL Impact)
### 3.2 DB2 Tables (HIGH Impact)
### 3.3 VSAM Files (HIGH Impact)
### 3.4 BMS Screens (MEDIUM Impact)
## 4. Impacted Programs by Category
## 5. New Programs Required
## 6. Data Modifications
## 7. User Context Management
## 8. Business Rules to Define
## 9. Implementation Plan
## 10. Risks and Mitigation
## 11. Alternatives Considered
## 12. Success Metrics
## 13. Conclusion
```
---

## Exercise 7: User Journey Documentation
[↩️](#-table-of-contents)

### 🎯 Objective

Create user journey documentation for account consultation, intended for tellers.

### 🔧 Bob Mode to Use

**Mode: 🧰 Z Code**

Z Code mode excels at pattern analysis and extracting business rules embedded in COBOL code.

### 📝 Context

Tellers need a simple, non-technical guide with concrete examples.

### ✍️ Your Prompt

Write your own prompt to request business documentation of the user journey for account consultation.

**Expected in your prompt:**
- specify target audience (tellers)
- request non-technical language
- request complete path from main menu
- request screen examples and practical tips

### ✅ Recommended Prompt

```text
Create user journey documentation for consulting
a customer's accounts in the CBSA application.

The documentation must:
- Be intended for tellers (non-technical)
- Show the path from the main menu
- Include screen examples
- Provide practical tips
```

### 🔀 Prompt Variants

```text
Write a simple business guide explaining how a teller consults a customer's accounts in CBSA.
```

```text
Document step-by-step the customer account consultation journey in CBSA, with a pedagogical tone and visual examples.
```

### ✅ Sample Result

**File created: `docs/CBSA-guide-Account consultation.md`**

Document containing:
- Illustrated step-by-step guide
- 3270 screen examples
- Practical tips
- Troubleshooting guide
- Real use cases

### 💡 IBM Bob Premium Package for Z Added Value

| Without Bob | With IBM Bob Premium Package for Z |
|----------|------------------------|
| 3-4 days of writing | 10 minutes of generation |
| Technical documentation | Adapted business documentation |
| No visual examples | Simulated screens included |

### 📌 Complementary Exercise: Compare with Another Questioning Angle

After writing your own prompt and observing the result, compare it with a more targeted prompt on the application chain.

### ✍️ Your Variant

Write an alternative prompt focused on business explanation of a specific program chain.

### ✅ Recommended Variant

```text
Can you explain (for a business user) the program chain that starts from BNKMENU, goes through BNK1CCA then INQACCCU?
```
---

## Exercise 8: Email Search Implementation
[↩️](#-table-of-contents)

### 🎯 Objective

Design and implement a new feature allowing customer identification by email address.

### 🔧 Bob Mode to Use

**Modes: 📐 Z Architect → 🧰 Z Code**

- 📐 Z Architect: To define and plan the complete solution for Z/OS

- 🧰 Z Code: To generate COBOL code for the new feature


### 📝 Context

The business wants to modernize the application by allowing customers to be identified by email rather than customer number. This evolution requires:
- Adding an email field to data structures
- Creating an alternate VSAM index for search
- Developing a new search program
- Modifying existing programs

You can first verify current search modes to ensure the new feature is consistent with existing functionality. The following prompt allows this verification:

```text
what criteria can be used to search for a customer in CBSA?
```
---

### Part A: Implementation Planning

#### 🔧 Mode: 📐 Z Architect

#### 💬 Bob Prompt

```
What is the plan to implement customer search by email?
```

#### ✅ Sample Result

Bob creates **`docs/CBSA-plan-email-search.md`**:
```
   ## 1. Executive Summary

   **Change Description**: Implementation of a new customer search feature by email address in the CBSA banking application. This feature will allow users to search for customers using partial email search (domain or address beginning).

   **Business Value**: Improves user experience by allowing flexible customer search by email, facilitating quick customer identification without requiring customer number or sort code. Particularly useful for customer support and service operations.

   **Key Risks**:
   1. Performance of LIKE queries on DB2 with large volumes
   2. Absence of email field in existing CUSTOMER VSAM structure
   3. Email data synchronization between systems

   **Workspace Notes**: All analyzed programs are available locally. Current CUSTOMER structure does not contain email field.

   **Prerequisites**: No data dictionary generation required - existing programs are already documented.

   ## 2. Prerequisites

   ## 3. Requirements

   ## 4. Objectives and Non-Objectives

   ## 5. Current State Analysis

   ## 6. Implementation Design

   ## 7. Affected Components

   ## 8. Data Model Modifications


   ## 9. Risks and Mitigations

   ## 10. Testing Strategy

   ## 11. Deployment and Operational Plan
```

#### 🎓 What You Learn

- **Structured planning**: Breakdown into logical sprints
- **Realistic estimation**: Effort and cost based on experience
- **Risk management**: Identification and mitigation
- **Iterative approach**: Progressive value delivery

---

### Part B: Data Structure Modification

**Mode: 🧰 Z Code**

Z Code mode excels at pattern analysis and extracting business rules embedded in COBOL code.

#### 💬 Bob Prompt

```
According to the implementation plan, update the CUSTOMER data structures
```

#### ✅ Sample Result

Bob creates/modifies files in the `baseupdated/cobol_copy/` directory:

**1. CUSTOMER.cpy** (main structure)
```cobol
       03 CUSTOMER-RECORD.
          05 CUSTOMER-EYECATCHER                 PIC X(4).
          05 CUSTOMER-KEY.
             07 CUSTOMER-SORTCODE                PIC 9(6) DISPLAY.
             07 CUSTOMER-NUMBER                  PIC 9(10) DISPLAY.
          05 CUSTOMER-NAME                       PIC X(60).
          05 CUSTOMER-ADDRESS                    PIC X(160).
          05 CUSTOMER-DATE-OF-BIRTH              PIC 9(8).
          05 CUSTOMER-CREDIT-SCORE               PIC 999.
          05 CUSTOMER-CS-REVIEW-DATE             PIC 9(8).
          05 CUSTOMER-EMAIL                      PIC X(100).  ← NEW
          05 CUSTOMER-EMAIL-VERIFIED             PIC X.       ← NEW
             88 EMAIL-VERIFIED                   VALUE 'Y'.
             88 EMAIL-NOT-VERIFIED               VALUE 'N'.
          05 FILLER                              PIC X(39).   ← ADJUSTED
```

**2. CRECUST.cpy** (creation COMMAREA)
```cobol
       01  CRECUST-COMMAREA.
           05  COMM-SORTCODE                     PIC 9(6).
           05  COMM-CUSTNO                       PIC 9(10).
           05  COMM-NAME                         PIC X(60).
           05  COMM-ADDR                         PIC X(160).
           05  COMM-DOB                          PIC 9(8).
           05  COMM-CREDIT-SCORE                 PIC 999.
           05  COMM-CS-REVIEW-DATE               PIC 9(8).
           05  COMM-EMAIL                        PIC X(100).  ← NEW
           05  COMM-EMAIL-VERIFIED               PIC X.       ← NEW
           05  COMM-RESP-CODE                    PIC X.
           05  COMM-RESP-MESSAGE                 PIC X(79).
```

**3. INQCUST.cpy** (inquiry COMMAREA)
```cobol
       01  INQCUST-COMMAREA.
           05  INQCUST-SORTCODE                  PIC 9(6).
           05  INQCUST-CUSTNO                    PIC 9(10).
           05  INQCUST-NAME                      PIC X(60).
           05  INQCUST-ADDR                      PIC X(160).
           05  INQCUST-DOB                       PIC 9(8).
           05  INQCUST-CREDIT-SCORE              PIC 999.
           05  INQCUST-CS-REVIEW-DATE            PIC 9(8).
           05  INQCUST-EMAIL                     PIC X(100).  ← NEW
           05  INQCUST-EMAIL-VERIFIED            PIC X.       ← NEW
           05  INQCUST-RESP-CODE                 PIC X.
           05  INQCUST-RESP-MESSAGE              PIC X(79).
```

**4. UPDCUST.cpy** (update COMMAREA)
```cobol
       01  UPDCUST-COMMAREA.
           05  UPD-SORTCODE                      PIC 9(6).
           05  UPD-CUSTNO                        PIC 9(10).
           05  UPD-NAME                          PIC X(60).
           05  UPD-ADDR                          PIC X(160).
           05  UPD-DOB                           PIC 9(8).
           05  UPD-CREDIT-SCORE                  PIC 999.
           05  UPD-CS-REVIEW-DATE                PIC 9(8).
           05  UPD-EMAIL                         PIC X(100).  ← NEW
           05  UPD-EMAIL-VERIFIED                PIC X.       ← NEW
           05  UPD-RESP-CODE                     PIC X.
           05  UPD-RESP-MESSAGE                  PIC X(79).
```

**5. INQEMAIL.cpy** (new - email search COMMAREA)
```cobol
       01  INQEMAIL-COMMAREA.
           05  COMM-EMAIL                        PIC X(100).
           05  COMM-SORTCODE                     PIC 9(6).
           05  COMM-CUSTNO                       PIC 9(10).
           05  COMM-NAME                         PIC X(60).
           05  COMM-EMAIL-VERIFIED               PIC X.
           05  COMM-RESP-CODE                    PIC X.
           05  COMM-RESP-MESSAGE                 PIC X(79).
```

**6. EMAILVAL.cpy** (new - validation utility)
```cobol
       01  EMAIL-VALIDATION.
           05  EMAIL-INPUT                       PIC X(100).
           05  EMAIL-VALID                       PIC X.
              88  EMAIL-FORMAT-OK                VALUE 'Y'.
              88  EMAIL-FORMAT-INVALID           VALUE 'N'.
           05  EMAIL-ERROR-MSG                   PIC X(50).
```

**Design Decisions**:
- **Email length**: 100 characters (covers 99% of real emails per RFC 5321)
- **Verification flag**: Allows tracking if email has been verified
- **Storage**: Emails in uppercase for consistent search
- **Record length**: Maintained at 399 bytes with FILLER adjustment

#### 🎓 What You Learn

- **Structure consistency**: All copybooks updated together
- **Backward compatibility**: Record length preserved
- **COBOL standards**: Respect for naming conventions
- **Speed**: 6 files modified in minutes vs several hours manually

---

### Part C: Search Program Development

#### 🔧 Mode: 🧰 Z Code

Z Code mode excels at generating COBOL code for Z/OS.

#### 💬 Bob Prompt

```
Create the INQEMAIL program according to the implementation plan
```

#### ✅ Sample Result

Bob develops **`baseupdated/cobol_src/INQEMAIL.cbl`**:

**Implemented Features**:

**1. Email format validation**
```cobol
VALIDATE-EMAIL-FORMAT.
    * Convert to uppercase
    MOVE FUNCTION UPPER-CASE(COMM-EMAIL) TO WS-EMAIL-UPPER
    
    * Check for @ presence
    INSPECT WS-EMAIL-UPPER TALLYING WS-AT-POSITION
        FOR ALL '@'
    
    IF WS-AT-POSITION NOT = 1
       MOVE '3' TO COMM-RESP-CODE
       MOVE 'Invalid email format' TO COMM-RESP-MESSAGE
       GO TO GET-ME-OUT-OF-HERE
    END-IF
    
    * Check domain (min 3 chars after @)
    COMPUTE WS-EMAIL-LENGTH =
        FUNCTION LENGTH(FUNCTION TRIM(WS-EMAIL-UPPER))
    
    IF WS-EMAIL-LENGTH < 5
       MOVE '3' TO COMM-RESP-CODE
       GO TO GET-ME-OUT-OF-HERE
    END-IF.
```

**2. Search via alternate VSAM index**
```cobol
SEARCH-CUSTOMER-BY-EMAIL.
    * Search via VSAM AIX
    EXEC CICS READ FILE('CUSTOMER')
         INTO(CUSTOMER-RECORD)
         RIDFLD(WS-EMAIL-UPPER)
         KEYLENGTH(100)
         RESP(WS-RESP)
         RESP2(WS-RESP2)
    END-EXEC
    
    EVALUATE WS-RESP
       WHEN DFHRESP(NORMAL)
          PERFORM POPULATE-COMMAREA
          MOVE '0' TO COMM-RESP-CODE
       WHEN DFHRESP(NOTFND)
          MOVE '1' TO COMM-RESP-CODE
          MOVE 'Email not found' TO COMM-RESP-MESSAGE
       WHEN DFHRESP(DUPKEY)
          MOVE '2' TO COMM-RESP-CODE
          MOVE 'Multiple matches' TO COMM-RESP-MESSAGE
       WHEN OTHER
          PERFORM HANDLE-SYSTEM-ERROR
    END-EVALUATE.
```

**3. Complete error handling**
```cobol
HANDLE-SYSTEM-ERROR.
    MOVE '9' TO COMM-RESP-CODE
    MOVE 'System error' TO COMM-RESP-MESSAGE
    
    * Prepare information for ABNDPROC
    MOVE EIBRESP TO ABND-RESPCODE
    MOVE EIBRESP2 TO ABND-RESP2CODE
    MOVE WS-EMAIL-UPPER TO ABND-FREEFORM
    
    * Call error handler
    EXEC CICS LINK PROGRAM('ABNDPROC')
         COMMAREA(ABNDINFO-REC)
         LENGTH(LENGTH OF ABNDINFO-REC)
    END-EXEC.
```

**Complete program structure**:
```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. INQEMAIL.

DATA DIVISION.
WORKING-STORAGE SECTION.
01  WS-COMMAREA.
    COPY INQEMAIL.

01  CUSTOMER-RECORD.
    COPY CUSTOMER.

01  WS-EMAIL-UPPER              PIC X(100).
01  WS-AT-POSITION              PIC 9(3).
01  WS-EMAIL-LENGTH             PIC 9(3).
01  WS-RESP                     PIC S9(8) COMP.
01  WS-RESP2                    PIC S9(8) COMP.

PROCEDURE DIVISION.
MAIN-PROCESSING.
    * Validate email format
    PERFORM VALIDATE-EMAIL-FORMAT
    
    * Search customer by email
    IF COMM-RESP-CODE = '0'
       PERFORM SEARCH-CUSTOMER-BY-EMAIL
    END-IF
    
    * Return result
    EXEC CICS RETURN END-EXEC.

VALIDATE-EMAIL-FORMAT.
    * [Detailed validation code above]

SEARCH-CUSTOMER-BY-EMAIL.
    * [Detailed search code above]

POPULATE-COMMAREA.
    MOVE CUSTOMER-SORTCODE TO COMM-SORTCODE
    MOVE CUSTOMER-NUMBER TO COMM-CUSTNO
    MOVE CUSTOMER-NAME TO COMM-NAME
    MOVE CUSTOMER-EMAIL-VERIFIED TO COMM-EMAIL-VERIFIED.

HANDLE-SYSTEM-ERROR.
    * [Detailed error handling code above]

GET-ME-OUT-OF-HERE.
    EXEC CICS RETURN END-EXEC.
```

**Error codes**:
- `'0'` = Success - Customer found
- `'1'` = Email not found in database
- `'2'` = Multiple matches (should not occur with unique index)
- `'3'` = Invalid email format
- `'9'` = System error

#### 🎓 What You Learn

- **COBOL code generation**: Bob creates production-ready code
- **CICS programming**: Proper use of CICS commands
- **Error handling**: Complete error management
- **Code quality**: Structured, commented, maintainable code

---

### Part D: Program Syntax Verification

#### 🔧 Mode: 🧰 Z Code

Z Code mode excels at generating COBOL code for Z/OS.

#### 💬 Bob Prompt

```
Verify the syntax of the INQEMAIL.cbl program
```

#### ✅ Sample Result

Bob performs a **complete syntax verification** of the generated program:

**Analysis Performed**:

1. **COBOL structure verification**
   - ✅ IDENTIFICATION DIVISION present
   - ✅ DATA DIVISION correctly structured
   - ✅ PROCEDURE DIVISION with complete logic
   - ✅ Sections and paragraphs well defined

2. **Copybook verification**
   - ✅ `COPY INQEMAIL` - Input/output COMMAREA
   - ✅ `COPY CUSTOMER` - Customer record structure
   - ✅ `COPY ABNDINFO` - Error handling structure
   - ✅ All copybooks exist in `baseupdated/cobol_copy/`

3. **Variable verification**
   - ✅ All variables declared before use
   - ✅ Consistent data types (PIC clauses)
   - ✅ WORKING-STORAGE variables correctly initialized
   - ✅ No unused variables

4. **CICS command verification**
   - ✅ `EXEC CICS READ` - Correct syntax with RESP/RESP2
   - ✅ `EXEC CICS LINK` - Correct ABNDPROC call
   - ✅ `EXEC CICS RETURN` - Clean termination
   - ✅ DFHRESP return code handling

5. **Logic verification**
   - ✅ Email validation before search
   - ✅ All error cases handled
   - ✅ COMMAREA population on success
   - ✅ No dead code

6. **Standards verification**
   - ✅ Consistent naming (WS- for working storage)
   - ✅ Correct indentation
   - ✅ Comments present
   - ✅ CBSA conventions respected

**Verification Report**:

```
╔════════════════════════════════════════════════════════════╗
║  SYNTAX VERIFICATION - INQEMAIL.cbl                       ║
╠════════════════════════════════════════════════════════════╣
║  Status: ✅ SUCCESS - No errors detected                   ║
║                                                            ║
║  Statistics:                                               ║
║  - Lines of code: 408                                      ║
║  - Sections: 6                                             ║
║  - Paragraphs: 5                                           ║
║  - Variables: 7                                            ║
║  - CICS commands: 3                                        ║
║  - Copybooks: 3                                            ║
║                                                            ║
║  Code Quality:                                             ║
║  - Cyclomatic complexity: 8 (Acceptable)                   ║
║  - Comment coverage: 15%                                   ║
║  - Standards compliance: 100%                              ║
║                                                            ║
║  Recommendations:                                          ║
║  ✓ Code ready for compilation                             ║
║  ✓ Unit tests recommended                                 ║
║  ✓ Code review suggested                                  ║
╚════════════════════════════════════════════════════════════╝
```

**Suggested compilation commands**:

```jcl
//COMPILE  EXEC PGM=IGYCRCTL,PARM='CICS,NODYNAM,NSYMBOL(NATIONAL)'
//STEPLIB  DD DSN=IGY.V6R3M0.SIGYCOMP,DISP=SHR
//SYSPRINT DD SYSOUT=*
//SYSLIN   DD DSN=&&LOADSET,DISP=(MOD,PASS),SPACE=(CYL,(1,1))
//SYSIN    DD DSN=CBSA.COBOL.SOURCE(INQEMAIL),DISP=SHR
```

**Compilation tests**:

Bob can also generate a test script:

```cobol
*================================================================*
* UNIT TEST PROGRAM - INQEMAIL
*================================================================*
IDENTIFICATION DIVISION.
PROGRAM-ID. TESTINQE.

DATA DIVISION.
WORKING-STORAGE SECTION.
01  TEST-COMMAREA.
    COPY INQEMAIL.

PROCEDURE DIVISION.
```

---

### IBM Bob Premium Package for Z ROI

**Investment**:
- IBM Bob Premium Package for Z License: $X/month
- Initial training: 1 day (this lab)

**Measured gains**:
- **Time**: 8-10 weeks → 2 hours (99.5% reduction)
- **Cost**: $80,000 - $120,000 → $2,000 (98% reduction)
- **Quality**: Standardized and complete documentation
- **Maintenance**: Automated updates

**Return on investment**: From the first analysis project

### Acquired Skills

After this lab, you master:

1. ✅ **Architecture analysis** with IBM Bob Premium Package for Z
2. ✅ **Automatic documentation** of business flows
3. ✅ **Impact analysis** on legacy code
4. ✅ **Pattern identification** in code
5. ✅ **AI-based improvement suggestions**
6. ✅ **Technical diagram generation**
7. ✅ **Complete implementation** of new features
8. ✅ **Automation** with Bobshells

---

## 7.Conclusion
[↩️](#-table-of-contents)

### 🎉 Congratulations!

You have completed the IBM Bob Premium Package for Z lab. In a few hours, you have:

+ ✅ Initialized and analyzed a complex mainframe workspace
+ ✅ Generated an exhaustive application inventory
+ ✅ Created a professional architecture diagram
+ ✅ Documented the BANKDATA batch program
+ ✅ Analyzed 210 occurrences of business rules
+ ✅ Evaluated the impact of a major change
+ ✅ Documented a complete user journey
+ ✅ Proposed an evolution with implementation guide


### 🔧 Mode Usage Summary

During this lab, you used different Bob modes according to needs:

| Exercise | Mode Used | Reason for Choice |
|----------|--------------|-----------------|
| 1. Initialization | 🧰 Z Code | Mainframe code analysis and technical documentation creation |
| 2. Inventory | 🧰 Z Code | Exhaustive scan and analysis of COBOL components |
| 3. Architecture | 📐 Z Architect | Diagram creation and flow analysis |
| 4. BANKDATA Documentation | 🧰 Z Code | Detailed technical documentation of a batch program |
| 5. Business Rules | 🧰 Z Code | Pattern and business rule extraction from code |
| 6. Impact Analysis | 📐 Z Architect | Impact assessment and change planning |
| 7. User Journey | ❓ Ask | Non-technical documentation for end users |
| 8. Feasibility | 📐 Z Architect | Feasibility study with estimates and planning |
| 9. Automation | 💻 Code | Bobshell creation to automate documentation |

**Key principle:** Choosing the right mode according to task nature maximizes efficiency and result quality.

### 📊 Gains Summary

| Task | Without Bob | With Bob | Gain |
|-------|----------|----------|------|
| Initialization | 2-3 days | 3 minutes | 99.8% |
| Inventory | 1-2 weeks | 10 minutes | 99.5% |
| Architecture | 2-3 days | 5 minutes | 99.7% |
| BANKDATA Documentation | 1-2 days | 5 minutes | 99.7% |
| Business rules | 1 week | 10 minutes | 99.6% |
| Impact analysis | 2 weeks | 15 minutes | 99.7% |
| User journey | 3-4 days | 10 minutes | 99.6% |
| Feasibility study | 1-2 weeks | 15 minutes | 99.7% |
| Automatic documentation | 2-3 weeks | 3 minutes | 99.8% |
| **TOTAL** | **11-17 weeks** | **76 minutes** | **99.6%** |

### 🚀 Next Steps

Now that you master IBM Bob Premium Package for Z, you can:

1. **Apply these techniques** to your own mainframe applications
2. **Train your team** with this lab
3. **Automate documentation** with Bobshells (Exercise 9)
4. **Accelerate impact analyses** before modifications
5. **Improve quality** of your deliverables
6. **Create your Bobshell library** to automate your repetitive tasks

#### 💡 Additional Bobshell Ideas

Here are other Bobshells you can create for your team:

**1. Code quality analysis**:
- Dead code detection
- Duplication identification
- Cyclomatic complexity measurement

**2. Test generation**:
- Unit test creation
- Test data generation
- Test scenario documentation

**3. Code migration**:
- COBOL → Java conversion
- Syntax modernization
- Automatic refactoring

**4. Security audit**:
- Vulnerability detection
- Sensitive data access analysis
- Access control verification

**5. Report generation**:
- Code coverage report
- Complexity statistics
- Dependency inventory

### 💼 Enterprise Use Cases

IBM Bob Premium Package for Z is particularly useful for:

- **Onboarding**: Accelerate new developer ramp-up
- **Maintenance**: Quickly understand legacy code
- **Modernization**: Analyze evolution feasibility
- **Documentation**: Maintain up-to-date documentation
- **Audit**: Prepare code and architecture reviews
- **Training**: Create educational materials

### 📚 Created Resources

During this lab, you generated:

| Document | Lines | Value |
|----------|--------|--------|
| AGENTS.md | 122 | Reference guide |
| CBSA-INVENTORY.md | 850+ | Complete inventory |
| CBSA-ARCHITECTURE.drawio | - | Visual diagram |
| BANKDATA-docu-technique.md | 450+ | Batch program documentation |
| CBSA-SORTCODE-BUSINESS-RULES.md | 682 | Business rules |
| CBSA-SORTCODE-CHANGE-IMPACT.md | 782 | Impact analysis |
| CBSA-USER-JOURNEY-CUSTOMER-ACCOUNTS.md | 485 | User guide |
| CBSA-EMAIL-ENHANCEMENT-GUIDE.md | 1247 | Evolution guide |
| **TOTAL** | **4618+ lines** | **Complete documentation** |

### 🎯 Business Value

**IBM Bob Premium Package for Z ROI:**

- **Time-to-Market Reduction**: 99.6% time saved
- **Quality Improvement**: Exhaustive and accurate documentation
- **Risk Reduction**: Complete impact analyses
- **Knowledge Transfer**: Documentation accessible to all
- **Compliance**: Complete traceability and audit trail

**Cost avoided:**
- 8-12 weeks × 40h/week × $150/h = **$48,000 - $72,000**
- Bob time: 68 minutes ≈ **$170**
- **Net savings: $47,830 - $71,830 per project**

### 🌟 Testimonials

> "IBM Bob Premium Package for Z has transformed the way we work. What used to take weeks now takes minutes."  
> — Mainframe Architect, Major European Bank

> "The documentation generated by Bob is more complete and accurate than what we did manually."  
> — Project Manager, Insurance Company

> "Automatic impact analysis has helped us avoid several costly errors."  
> — Senior Developer, Public Administration

### 📞 Support and Resources

To go further with IBM Bob Premium Package for Z:

- **Documentation**: Consult user guides
- **Support**: Contact the IBM Bob Premium team
- **Training**: Participate in training sessions
- **Community**: Join the user community

---

**Thank you for participating in this lab!**

**Lab Version:** 1.0  
**Creation date:** 2026-05-04  
**Author:** IBM Bob Premium Package for Z Team
---

## 🚀 Summary: The Value of IBM Bob Premium Package for Z

### Measurable Gains

| Task | Without Bob | With Bob | Gain |
|-------|----------|----------|------|
| Understand architecture | 2-3 days | 5 minutes | **99% faster** |
| Analyze variables | 4-6 hours | 2 minutes | **99% faster** |
| SORTCODE impact analysis | 1-2 weeks | 30 minutes | **98% faster** |
| Business documentation | 3-5 days | 10 minutes | **99% faster** |
| In-depth technical analysis | 2-3 days | 15 minutes | **99% faster** |
| Implementation plan | 1-2 weeks | 20 minutes | **98% faster** |
| Program development | 2-3 days | 30 minutes | **95% faster** |

**Estimated global gain**: **95-99% time reduction** on analysis and documentation tasks.

---

### 💡 Key Capabilities of IBM Bob Premium Package for Z

#### 1. Intelligent Analysis
- Automatic metadata interrogation
- Dependency identification
- Impact assessment

#### 2. Automatic Documentation
- Technical documentation generation
- Translation to business language
- Diagram creation

#### 3. Assisted Development
- COBOL code generation
- Standards compliance
- Consistency with existing code

#### 4. Strategic Planning
- Detailed implementation plans
- Effort estimation
- Risk management

#### 5. Contextual Knowledge
- Architecture understanding
- Existing pattern respect
- Relevant suggestions

---

### 🎯 Main Use Cases

#### 1. Onboarding
- New developers quickly understand the application
- 80% training time reduction
- Accessible and up-to-date documentation

#### 2. Maintenance
- Impact analysis before modification
- Regression prevention
- Automatically updated documentation

#### 3. Modernization
- New feature planning
- Migration to new technologies
- Guided refactoring

#### 4. Audit & Compliance
- Complete and traceable documentation
- Security analysis
- Standards compliance

#### 5. Knowledge Transfer
- Automatic know-how documentation
- Business knowledge preservation
- Continuous training

---

### 📈 IBM Bob Premium Package for Z ROI

**Investment**:
- IBM Bob Premium Package for Z License
- Initial training (1-2 days)

**Returns**:
- **Productivity**: +95% on analysis/documentation
- **Quality**: 70% error reduction
- **Time-to-Market**: 80% acceleration
- **Costs**: 60% maintenance reduction
- **Risks**: Critical incident prevention

**Typical ROI**: Return on investment in **2-3 months**

---

## 📚 Appendix: Useful Prompts

### Code Analysis
```
Explain what the [NAME] program does
What are the dependencies of the [NAME] program?
Where is the [NAME] variable used?
What copybooks are used by [PROGRAM]?
```

### Impact Analysis
```
What is the impact of modifying [VARIABLE/STRUCTURE]?
Which programs are affected by [CHANGE]?
What are the business rules using [DATA]?
Analyze the impact of changing [FIELD] in [COPYBOOK]
```

### Documentation
```
Create business documentation for [FEATURE]
Explain the [TRANSACTION] flow for a business user
Document the architecture of [MODULE]
Generate an application inventory
Create an architecture diagram
```

### Development
```
Create a program for [FEATURE]
Modify [PROGRAM] to add [FEATURE]
Generate data structures for [NEED]
Create a copybook for [STRUCTURE]
```

### Planning
```
What is the plan to implement [FEATURE]?
Estimate the effort for [PROJECT]
What are the risks of [CHANGE]?
Propose a migration strategy for [SYSTEM]
```

---

## 🎓 Next Steps

### To Continue Your Learning

1. **Practice**: Use Bob on your own mainframe applications
2. **Explore**: Test other types of prompts and modes
3. **Share**: Train your team on IBM Bob Premium Package for Z
4. **Optimize**: Integrate Bob into your development processes
5. **Innovate**: Use Bob to modernize your legacy systems

### Additional Resources

- **Bob Documentation**: Detailed guides and tutorials
- **Support**: Technical assistance team
- **Community**: User exchange forum
- **Training**: Advanced training sessions

---

**Version**: 1.0  
**Date**: May 5, 2026  
**Author**: IBM CE EMEA team

**Transform the way you work with mainframe! 🚀**
