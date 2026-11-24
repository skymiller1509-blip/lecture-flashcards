# Lecture-to-Flashcards Tutor

Paste a lecture, get flashcards — no account, no API key, nothing leaves your browser.

**Demo video:** TODO — film from `VIDEO-SCRIPT.md` (2–4 min).
**Demo:** TODO — GitHub Pages link once the repo exists (see `SUBMISSION-CHECKLIST.md`).
**Event:** [SLAY HACKS 2026](https://slayy-hacks.devpost.com/), deadline 7 Dec 2026 23:00 WAT, $4,500 cash.

Paste a lecture, get flashcards, study them.

## Tech stack

Plain HTML, CSS and JavaScript. No build step, no dependencies, no API,
no server. Everything runs in the browser.

## The one flow

1. Paste lecture text, upload a `.txt` file, or tap "Try the sample lecture".
2. Tap **Make flashcards**.
3. Flip each card to see the answer, then mark it **I know this** or **Not yet**.
4. At the end you get your score, and you can study just the unknowns again.

## How the cards are made (honest version)

There is no large language model here, no API and no API key. Everything runs
in your browser and your text never leaves the page.

- The text is split into sentences.
- Each sentence is scored by how often its key words appear in the lecture
  (stopwords removed, longer sentences normalised).
- The top sentences become cards in three shapes:
  - **Definition** — "Photosynthesis is ..." becomes "What is Photosynthesis?"
  - **Number** — a sentence with a standalone number becomes a fill-in-the-blank for that number.
  - **Fill in the blank** — the most repeated key word in the sentence is blanked out.
- Cards are shuffled, duplicates are dropped, and the study screen tracks
  known vs unknown.

## Run it

No build step, no dependencies. Any of these works:

```bash
# Option 1: serve locally
python3 -m http.server 8000
# then open http://localhost:8000/

# Option 2: open index.html directly in a browser
```

Or host the folder on GitHub Pages (Settings → Pages → Deploy from a branch → main → root).

## Files

- `index.html` — the page
- `style.css` — styling
- `app.js` — card generation + study flow (the `generateCards` function is
  exported for Node so it can be tested: `node -e "require('./app.js')"`)
- `sample-lecture.txt` — a short original lecture on photosynthesis for the demo

## Verified

- `node` test: the sample lecture produces 8 unique, sensible cards; asking
  for 12 gives 12; a 2-sentence text is rejected with a clear message; a
  second topic (Roman history) also produces 8 good cards.
- Served locally over HTTP: `index.html`, `app.js` and `style.css` all return
  HTTP 200.

## Honest limits

- Card quality follows the lecture's style. Dense, jargon-heavy notes produce
  better cards than chatty ones. Definition detection only handles simple
  "X is ..." sentences.
- There is no spaced repetition, no account, and no saving: cards live in the
  page session only. Refresh and they are gone.
- This is an extractive helper, not an AI that understands the lecture. The
  submission will say so plainly.

## SLAY HACKS 2026 — submission

Full checklist: `SUBMISSION-CHECKLIST.md`.

Rules verified live on the official Devpost page on 2026-11-23
(https://slayy-hacks.devpost.com/):

- Deadline: **7 Dec 2026, 17:00 EST (22:00 UTC, 23:00 WAT)**
- Prizes: **$4,500 cash** — Grand $2,000, Runner-Up $1,200, 3rd $800,
  Best Beginner Hack $500 (first-time hackathon participants only).
  Header also mentions $5,000 in prizes total (cash plus perks/certificates).
- Solo entry is allowed. Any AI project; education is an explicitly welcome area.
- Eligibility confirmed: Eddie is an enrolled student (confirmed 2026-11-23).
- Submission needs (Devpost form): project name/overview, problem/solution,
  AI implementation, working demo link, screenshots, source repo with docs,
  demo video ~2–4 minutes (recommended).

Still to do before submitting (Eddie's steps):

- [ ] Create the public GitHub repo and push this folder (repo creation)
- [ ] Host the demo (GitHub Pages) and take screenshots
- [ ] Record the 2–4 minute demo video (script: `VIDEO-SCRIPT.md`)
- [ ] Fill in the Devpost form and submit by 7 Dec 23:00 WAT
