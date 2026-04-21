# Recalution-frontend

This repository is responsible for the web client of Recalution.
For a full description of the product vision and goals, see:
- Project overview: [LINK_TO_MAIN_PROJECT_DOCS](https://docs.google.com/document/d/1rVIXDW3yb_tYRrazl4toEDbBXGfARA6R96kuV3lunlY/edit?tab=t.0)

## Getting Started

## Contributing

We use **type-based branching** to keep development organized and coherent.

### Branch Naming
Use the format: `<type>/<issue-number>/<short-description>`

**Type options:**
- `feature` → new features
- `bugfix` → bug fixes
- `chore` → maintenance tasks
- `refactor` → code restructuring

**Rules:**
1. Use lowercase letters only.  
2. Separate words with hyphens (`-`).  
3. Keep names concise and descriptive.

**Examples:**  
`feature/12/add-transaction-crud`  
`bugfix/34/fix-budget-validation`  
`chore/78/update-dependencies`  
`refactor → code restructuring without changing external behavior`

### Workflow
1. Make sure there is a GitHub issue for your work.
2. Create a new branch from `dev`:
```bash
git checkout dev
git pull
git checkout -b issue-12/add-transaction-crud
```
3. Commit your changes with clear messages:
```
<type>(<scope>): <description>
```
4. Push the branch and open a Pull Request linking the issue (e.g., `Closes #12`).
5. Wait for review and approval before merging.
