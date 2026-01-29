## ADR Index

- ADR-001 Frontend split: Vite SPA at `/app`, SSG at `/`
- ADR-002 Styling choice: Vanilla CSS

---

## ADR-001 — Frontend split: `/app` SPA + `/` SSG

Date: 2026-01-18

### Decision

- `/app` is a Vite-based SPA.
- `/` is statically generated (SSG).

### Reason

- Core application features are behind authentication → SSR provides no value for `/app`.
- The public homepage needs fast load times and SEO → SSG is sufficient and cost-effective.

### Alternatives considered

- Full Next.js application → rejected: SSR complexity and operational cost are not justified at the MVP stage. The application is user-centric and authentication-gated, so SSR is not seen as useful for this app even later.

---

## ADR-002 — Styling choice: Vanilla CSS

Date: 2026-01-23

### Decision

- Use vanilla CSS as the primary styling solution.

### Reason

- Modern CSS provides a stable and capable foundation for efficient development, removing the necessity for additional styling frameworks or preprocessors.

### Alternatives considered

- Tailwind CSS → rejected: Not considered future-proof due to the current financial and strategic uncertainty of the Tailwind CSS project.
- SCSS → rejected: Adds complexity without providing sufficient benefits over modern, native CSS capabilities.
