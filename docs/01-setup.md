# Setup (Ubuntu/macOS)

This guide describes how to run the project locally in a clean environment.

## Prerequisites

- Node.js 22 (recommended via `nvm`)
- npm (comes with Node)
- Angular CLI 21.x
- Git + SSH configured for GitHub (optional for running, required for pushing)

## Verify versions

```bash
node -v
npm -v
ng version
```

Expected:

- Node `v22.x`
- Angular CLI `21.x`

## Install dependencies

From the repository root (where `package.json` is):

```bash
npm install
```

## Run the app

```bash
ng serve
```

Open:

- `http://localhost:4200`

## Formatting (Prettier)

Check formatting:

```bash
npm run format:check
```

Auto-fix formatting:

```bash
npm run format:write
```

## Troubleshooting

- If `ng` is not found, reinstall Angular CLI:

  ```bash
  npm i -g @angular/cli@21
  ```

- If dependencies look corrupted:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
