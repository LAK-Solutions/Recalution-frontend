## ADR Index
- ADR-001 Frontend split: Vite SPA at `/app`, SSG at `/`

---

## ADR-001 — Frontend split: `/app` SPA + `/` SSG

### Decision
- `/app` is a Vite-based SPA.
- `/` is statically generated (SSG).

### Reason
- Core application features are behind authentication → SSR provides no value for `/app`.
- The public homepage needs fast load times and SEO → SSG is sufficient and cost-effective.

### Alternatives considered
- Full Next.js application → rejected: SSR complexity and operational cost are not justified at the MVP stage. The application is user-centric and authentication-gated, so SSR is not seen as useful for this app even later.

---

