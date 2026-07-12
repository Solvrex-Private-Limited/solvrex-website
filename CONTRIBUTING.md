# GitHub Cookbook

The practical, no-theory version of how we work in this repo. If you're new, read this once — it covers everything you'll actually do day to day.

## The rule that matters most

**Nobody pushes to `main` directly — not even admins.** All code lands via a Pull Request (PR). This is enforced by GitHub itself, not just a policy — you'll get an error if you try to push to `main` directly.

## 1. One-time setup

```bash
git clone https://github.com/Solvrex-Private-Limited/solvrex-website.git
cd solvrex-website
npm install
```

## 2. Every time you start new work

```bash
git checkout main
git pull                                    # get the latest before branching
git checkout -b intern/<your-name>/<short-description>
# e.g. git checkout -b intern/asha/navbar-keyboard-nav
```

## 3. Make your changes, then commit

```bash
git add <files you changed>
git commit -m "Add keyboard nav to Navbar mega-menu"
```

Small, focused commits with a message that says *what* changed. Don't `git add .` blindly — check `git status` first so you don't accidentally commit someone else's in-progress files.

## 4. Push and open a PR

```bash
git push -u origin intern/<your-name>/<short-description>
```

Then on GitHub: **Compare & pull request** → the PR template loads automatically → fill it out (what changed, how you tested it, screenshots if it's visual) → **Request review** from one other intern *and* the tech lead.

## 5. How review works here

Every PR needs **2 approvals** before it can merge:
1. **One peer review** — another intern reads your code and either approves or asks questions/requests changes. This is the point — reading real code, not just writing it.
2. **One tech lead review** — final gate, usually easier for the lead once a peer has already asked the obvious questions.

As a **reviewer**, leave comments directly on the lines you have questions about (click the `+` that appears when hovering a line in the "Files changed" tab). Use "Request changes" if something needs to be fixed before merge, "Comment" if it's just a question, "Approve" if it's good to go.

As the **author**, reply to each comment (even if just "done" or "good catch, fixed") and push a follow-up commit if changes are needed — don't open a new PR for the same work.

## 6. Resolving comments

Every conversation thread on a PR must be marked **Resolved** before merge is allowed (this is enforced, not optional). Once you've addressed a comment — either by fixing the code or replying with why it doesn't need a fix — click **Resolve conversation** at the bottom of that thread. Don't resolve comments you haven't actually addressed.

## 7. A note on re-review

If new commits are pushed after someone approves, their approval is automatically cleared and they need to look again. This is intentional — it stops unrelated changes from sneaking in after approval. If you push a small fix after approval, ping your reviewers so they know to re-check.

## 8. Merging

Once both approvals are in and all conversations are resolved, the merge button unlocks. For now, whichever of the author/reviewers is around can click **Merge pull request** (squash merge is fine) — approvals are the actual gate, not who clicks the button. Delete your branch after merging (GitHub prompts you).

## Quick reference

| Situation | What to do |
|---|---|
| Starting new work | Branch off latest `main`: `intern/<name>/<description>` |
| Ready for feedback | Push branch → open PR → request 1 peer + tech lead as reviewers |
| Got review comments | Fix or reply, push follow-up commits, resolve each thread |
| Approved but you pushed more commits | Ping reviewers — their approval was cleared, ask them to re-check |
| PR fully approved + resolved | Anyone can hit Merge; delete the branch after |
| Want to push straight to `main` | You can't — and shouldn't try |
