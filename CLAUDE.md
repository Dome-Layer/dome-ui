# dome-ui

`@dome-layer/dome-ui`: the shared React components, design tokens and auth helpers used by the five DOME tool
frontends (Process Analyzer, LLM Council, Document Intelligence, Data Intelligence, Governance Dashboard), the
Agent Flow approval page and domelayer.com. DOME is a sole maintainer's portfolio of governed AI tools for
regulated businesses; every consumer is a sibling repo in the `Dome-Layer` organisation.

## How consumers get it

- Consumers pin a **git tag**: `"@dome-layer/dome-ui": "github:Dome-Layer/dome-ui#v1.3.1"`. Never a branch.
- **`dist/` is committed** and there is no `prepare` script: a git install does not build, so a release must
  include the rebuilt `dist/` (`npm run build`). Forgetting it ships stale code, or none of the types (the v1.2.1
  TS7016 incident).
- Entry points (`package.json` `exports`): `.` (components), `./utils` (cookie and host helpers),
  `./tokens.css`, `./components.css`, `./tailwind-preset`. CSS is copied into `dist/` by the build script.
- A release is a version bump in `package.json` plus a `vX.Y.Z` tag on the merged commit. The maintainer tags
  it; a PR only prepares the bump and `dist/`.

## Branches

- `main` is what consumers have released; `staging` is where work lands. **Branch from `staging`, open the PR
  against `staging`**; it is protected with strict checks (`ci`, gitleaks). **Never push to `main`.**
- After a release here, each consumer gets its own PR to bump the tag; those land in a staging window.

## Commands

What `ci` runs; run all of it before asking for review:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run test
npm audit --omit=dev --audit-level=high
```

`npm run storybook` (port 6006) shows the components in both themes; stories live in `stories/`.

## What is here

- `src/components/`: `ToolHeader` (each tool's top bar: logo, tool name, nav led by the "All tools" hub link, account menu with
  sign-out), `ToolFooter`, `StagingBanner`, `ThemeToggle`, `DomeLogo`, `AuthGuard`, `AuthProvider`
  / `useAuth`, `Badge`, `Button`, `Card`.
- `src/tokens.css`: the design tokens as CSS custom properties, both themes. `src/components.css`: shared CSS.
- `src/auth.ts`, `src/utils.ts`: the `dome_auth_token` cookie on `.domelayer.com`, host-aware URLs (production
  vs `*.staging.domelayer.com`), the sign-in and hub URLs.
- `tests/` (Vitest, jsdom), including `houseStyle.test.ts`.

## House rules

- **No em dashes or en dashes anywhere**: code, comments, stories, commit messages, PR text. `tests/houseStyle.test.ts`
  fails on them. Hyphens are fine. British English.
- The design system is `docs/DESIGN_SYSTEM.md` (a snapshot of v2.7). Use tokens, never raw colours a token covers.
  WCAG 2.1 AA: 4.5:1 text contrast, visible focus, `prefers-reduced-motion` respected.
- **The blue surface (v2.7)**: the accent is a large surface only as the top bar on every page and as the opening
  band of an entry page; every screen inside the tools stays neutral apart from the bar. The top bar spec (solid
  `--color-bar`, white wordmark, links and icons, the current page white with a 2px underline, the inverse Sign in
  button) is in "Blue surface" in section 2 of the design system.
- Changes here reach seven apps: keep props backwards compatible, or say clearly in the PR what each consumer must
  change. Every behaviour change gets a test and, for anything visual, a story.

## Done means

A PR against `staging` with `ci` green, `dist/` rebuilt if the release would need it, a description of what
changed for consumers, and screenshots or story names for visual changes.
