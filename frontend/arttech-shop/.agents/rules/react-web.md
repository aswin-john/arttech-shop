---
trigger: glob
globs: src/**/*.tsx, src/**/*.jsx, src/**/*.css
---

# React (Web) Rules

Activation: Glob — apply to `*.tsx, *.jsx, *.css` within React web projects
only (Next.js / Vite / CRA-style browser apps — not React Native).

These build on the global rules. Do not duplicate global security/error
handling/logging rules here — only what's specific to React-for-web.

---

## 1. Styling

- Allowed: vanilla CSS, CSS Modules. Tailwind only if the project already
  uses it or it's explicitly requested — don't introduce it unprompted.
- No inline styles except genuinely dynamic values (computed from state).
- Use CSS custom properties (`:root` variables) for theme values — colors,
  spacing, typography. Don't hardcode values that exist as tokens already.
- One CSS Module (or styled file) per component to keep styles scoped and
  organized.
- Responsive by default — mobile-first breakpoints, not desktop-first
  overrides.

## 2. Components

- Functional components with hooks. Keep components small, single-purpose.
- Reuse existing UI components before creating new ones — check the
  project's component library/design system first.
- Follow existing UX interaction patterns already established in the app.

## 3. Data Fetching

- This is a client-side Vite app — there is no server-rendering step. All
  fetching happens client-side.
- Encapsulate all fetch logic in a `services/` or `api/` layer — never fetch
  directly inside deeply nested UI components (e.g. not inline inside
  `AddPayment.tsx` — call a service function from `services/`).
- Use one data-fetching/caching library consistently once introduced (e.g.
  React Query) — don't mix raw `fetch`-in-`useEffect` with a library
  elsewhere in the app.
- Never swallow fetch errors silently — surface a loading/error state.

## 4. State Management

- Keep state local by default. Reach for global state (Context, Redux,
  Zustand) only when state is genuinely shared across distant parts of the
  tree — justify it, don't default to it.
- Don't duplicate server state into client state unnecessarily; if using a
  data-fetching library with its own cache (React Query, SWR), let it own
  that state.

## 5. Accessibility

- Use semantic HTML first; reach for ARIA attributes only when semantic HTML
  can't express the pattern.
- All interactive elements must be keyboard-navigable (tab order, focus
  states, `Enter`/`Space` activation for custom controls).
- Images need meaningful `alt` text; decorative images get `alt=""`.

## 6. Performance

- Avoid unnecessary re-renders — memoize only where there's a measured cost.
- Lazy-load routes/heavy components with `React.lazy` / dynamic import where
  it meaningfully reduces initial bundle size.
- Minimize new dependencies — check if an existing library already covers
  the need before adding one.