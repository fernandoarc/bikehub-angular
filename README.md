# BikeHub Angular

Angular SPA built as an intensive learning lab to strengthen Angular fundamentals and common enterprise patterns (routing, forms, RxJS, interceptors, and state management). The app will consume **DummyJSON** as a public backend for realistic CRUD and authentication flows.

## Stack

- Angular CLI 21.1.0 / Angular 21
- Node 22 (via nvm)
- Prettier + ESLint
- VS Code (Ubuntu/macOS friendly)

## API (DummyJSON)

This project will use DummyJSON as a public API to simulate:

- Auth (token-based flows)
- CRUD resources (e.g., products/users/carts)
- Search + pagination

Docs and endpoints used by the app will be tracked under `docs/`.

## Conventions

- Branches: `feature/BKH-XXX-short-description`
- Commits: `type(BKH-XXX): short message`
  - Common types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `build`

- `main` must remain buildable and runnable at all times.

---

## Angular CLI (generated)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
