# Recalution-frontend

This repository is responsible for the web client of Recalution.
For a full description of the product vision and goals, see:
- Project overview: [LINK_TO_MAIN_PROJECT_DOCS](https://docs.google.com/document/d/1rVIXDW3yb_tYRrazl4toEDbBXGfARA6R96kuV3lunlY/edit?tab=t.0)

## Prerequisites

- Node.js and npm installed locally.
- A `.env` file with the API base URL configured.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root if it does not already exist, and set the API base URL:

```env
VITE_API_URL=<your-backend-api-url>
```

3. Start the development server:

```bash
npm run dev
```

### Useful Scripts

- `npm run build` - type-check and create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally
- `npm run format` - format the codebase with Prettier
- `npm run format:check` - verify formatting without changing files

## Contributing

We use **type-based branching** to keep development organized and coherent.

### Branch Naming
Use the format: `<type>/<issue-number>/<short-description>`

**Type options:**
- `feature` -> new features
- `bugfix` -> bug fixes
- `chore` -> maintenance tasks
- `refactor` -> code restructuring

**Rules:**
1. Use lowercase letters only.
2. Separate words with hyphens (`-`).
3. Keep names concise and descriptive.

**Examples:**
- `feature/12/add-transaction-crud`
- `bugfix/34/fix-budget-validation`
- `chore/78/update-dependencies`
- `refactor` -> code restructuring without changing external behavior

### Workflow
1. Make sure there is a GitHub issue for your work.
2. Create a new branch from `dev`:

```bash
git checkout dev
git pull
git checkout -b issue-12/add-transaction-crud
```

3. Commit your changes with clear messages:

```text
<type>(<scope>): <description>
```

4. Push the branch and open a Pull Request linking the issue (for example, `Closes #12`).
5. Wait for review and approval before merging.
