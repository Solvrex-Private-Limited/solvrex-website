# Welcome to Solvrex — Intern Onboarding (Week 1)

This is your first week. The goal isn't to ship a big feature — it's to learn this codebase by reading it closely and fixing something real in it, and to get comfortable with the actual Git/GitHub workflow we use here. Everything below is specific to this repo (`solvrexpvt/solvrex-website`), the Solvrex marketing site.

## 1. Get access

1. Accept the GitHub invite email (check spam if it doesn't show up). You've been added as a collaborator on this one repo only — you won't see any other Solvrex repos, and that's intentional.
2. Once accepted, clone the repo:
   ```bash
   git clone https://github.com/solvrexpvt/solvrex-website.git
   cd solvrex-website
   ```

## 2. Local setup

This is an **npm-workspaces monorepo** — one shared component library (`packages/ui`), two Next.js apps (`apps/us` for solvrex.us, `apps/in` for solvrex.in).

```bash
npm install                 # run once, at the repo root
npm run dev -w apps/us      # http://localhost:3000 — career-services homepage
# or
npm run dev -w apps/in      # business-enablement homepage
```

Full details: [README.md](./README.md) and [DEPLOYMENT.md](./DEPLOYMENT.md).

## 3. Git workflow — how we actually work here

- **Never commit directly to `main`.** It's protected — you can't push to it even by accident.
- **Branch naming:** `intern/<your-name>/<short-description>`, e.g. `intern/asha/navbar-keyboard-nav`.
- **Commits:** small, descriptive messages. No need for a strict format, but "fix stuff" isn't enough — say what changed.
- **Opening a PR:** push your branch, open a PR against `main`, fill out the PR template (it auto-loads), and request a review from the tech lead.
- **Review:** the tech lead reviews within ~24h. Expect comments — that's normal, not a sign something's wrong. Push follow-up commits to the same branch; don't open a new PR.
- **Merging:** the tech lead merges once approved. You don't need — and won't have — permission to merge to `main` yourself.

## 4. Your Week 1 assignment

Everyone does two things this week: (a) read your assigned module closely enough to explain it to someone else, and (b) open 1–2 small PRs actually fixing what you find. A written report alone isn't the deliverable — a merged (or review-ready) PR is.

| You | Module | What to look at | What a good PR looks like |
|---|---|---|---|
| _[frontend intern name]_ | `packages/ui/src/components/Navbar.tsx` (~341 lines) | State handling for the mega-menu, mobile scroll-lock, ARIA attributes | Extract the mega-menu into its own sub-component; add keyboard navigation (arrow keys, Escape to close) |
| _[fullstack intern #1 name]_ | `packages/ui/src/components/Home.tsx` + `PricingPage.tsx` (~273 + 274 lines) | Repeated inline styles, section composition | Break large sections into sub-components; pull repeated grid breakpoints into `lib/theme.ts` |
| _[fullstack intern #2 name]_ | `packages/ui/src/components/ConsultationForm.tsx` (~189 lines) | Async submit flow, error handling, the honeypot spam field | Add a retry UI when the submit request fails; fix the bare `catch (Error)` so real errors surface |
| _[fullstack intern #3 name]_ | Repo-wide: there is currently **no test runner and no linter configured** | `package.json`, existing component patterns | Add Vitest (or Jest) + one real test for `Reveal.tsx` or `ConsultationForm.tsx`; add an ESLint config and fix whatever it flags |

If you finish early: read someone else's assigned module and leave review comments on their PR — that's genuinely useful, not busywork.

## 5. Definition of done for Week 1

- [ ] You can explain, out loud, what your module does and one thing you'd improve about it
- [ ] At least 1 PR opened against `main`, using the PR template, with a clear description and (for anything visual) a before/after screenshot
- [ ] PR has been through at least one round of review from the tech lead

## 6. Daily standup

Post 3 bullets — **yesterday / today / blockers** — in the team channel every day. Keep it short. If you're stuck for more than ~30 minutes, post the blocker rather than sitting on it — that's what the tech lead is there for.

## 7. Who to ask

- Code/PR questions, stuck on something → tech lead, in the team channel
- Anything about scope, priorities, or "should I even be doing this" → also the tech lead first — he'll loop in the founder if it's a bigger call
