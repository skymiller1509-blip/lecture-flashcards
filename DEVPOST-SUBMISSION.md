# SLAY HACKS 2026 — Devpost submission, filled template

Source template: Eddie's screenshots of the Devpost submission form from the
Kiroween Crypt submission (2026-11-18, devpost.com/submit-to...). The field
order below follows those screenshots. Kiroween-only fields are marked and
do NOT appear on the SLAY form.

Deadline: 7 Dec 2026, 17:00 EST = 23:00 WAT.
Project: Lecture-to-Flashcards Tutor.
Form: https://slayy-hacks.devpost.com/

## 1. Project name

```
Lecture-to-Flashcards Tutor
```

## 2. Elevator pitch (tagline)

```
Paste a lecture, get flashcards. No account, no key, nothing leaves your browser.
```

## 3. Inspiration

```
I study from long lecture notes and making flashcards by hand takes hours. I wanted a tool that turns a lecture into cards I can study from in one tap, without an account or a paid plan.
```

## 4. What it does

```
Paste lecture text, upload a .txt file, or tap the sample lecture, then tap Make flashcards. The app builds definition, number, and fill-in-the-blank cards. Flip each card to see the answer, mark it I know this or Not yet, and at the end you get a score and a second round with only the cards you missed. You can shuffle the deck too.
```

## 5. How we built it

```
Plain HTML, CSS, and JavaScript. No build step, no dependencies, no server, no API. Everything runs in the browser. The card maker splits the lecture into sentences, scores each sentence by how often its key words appear, and turns the top sentences into cards.
```

## 6. Challenges we ran into

```
Two real bugs. The first definition finder made nonsense questions from sentences that were not definitions, so it now only uses simple "X is ..." sentences. The number card blanked the "3" inside words like "glyceraldehyde-3-phosphate", so it now only blanks a standalone number. Both were caught by testing with real lectures.
```

## 7. Accomplishments we are proud of

```
The sample photosynthesis lecture makes 8 unique, sensible cards, and asking for 12 gives 12. A 2-sentence text is rejected with a clear message instead of bad cards. A second topic, Roman history, also makes 8 good cards. The whole study flow works end to end: paste, make, flip, mark, score, study the unknowns again.
```

## 8. What we learned

```
Dense, jargon-heavy notes make better cards than chatty ones, because the scoring follows repeated key words. Simple rules can carry a study tool when the flow is tight. Testing with a second topic caught problems the first topic hid.
```

## 9. What's next

```
Save cards between sessions so a refresh does not wipe the deck, and add a simple spaced review that brings the cards you missed back the next day.
```

## 10. Built with

```
HTML, CSS, JavaScript
```

## 11. Public GitHub repo URL

LIVE 2026-11-24 (9 files, commit f3028c39, verified by Mabel):

```
https://github.com/skymiller1509-blip/lecture-flashcards
```

## 12. Demo URL (working demo, hosted application or test build)

LIVE 2026-11-24 (Pages build finished, index HTTP 200, app.js HTTP 200, verified by Mabel):

```
https://skymiller1509-blip.github.io/lecture-flashcards/
```

## 13. Demo video URL

TODO, film 2 to 4 minutes from VIDEO-SCRIPT.md and upload to YouTube.

## 14. Testing instructions or credentials for judges

```
No account, no key, no setup. Open the demo link, tap "Try the sample lecture", tap "Make flashcards", flip a card, mark it, and finish the deck to see the score. Or paste any lecture text of your own.
```

## 15. How the project meets the technology requirement

```
SLAY HACKS asks for an AI project. This app uses extractive text analysis, a form of natural language processing, that runs entirely in the browser: it scores sentences by key word frequency and turns the best ones into study cards. There is no large language model and no API call, and the submission says so plainly.
```

## 16. Pre-existing code disclosure

```
None. Built from scratch in this project. No frameworks, no libraries, no starter template, no copied code.
```

## 17. Sponsor / Special Prizes

None to select for SLAY. The prizes are Grand, Runner-Up, and 3rd place.
Best Beginner Hack is for first-time hackathon participants only, and Eddie
is not a first-time participant, so do not enter it.

## 18. Submitter Country of Residence

```
Nigeria
```

## 19. Submitter Type

```
Individual
```

## 20. Organization name

Leave blank. Submitting as an individual, not for an organization.

## 21. Eligible jurisdiction checkbox

Tick it. Nigeria is not on the excluded list.

## Kiroween-only fields (do NOT look for these on the SLAY form)

- The Kiro questions: employee of the hackathon sponsor (AWS), how much the
  hackathon helped you develop new skills, how likely you are to use Kiro
  again. These were Kiroween survey questions.
- The Kiroween category picker: Resurrection, Frankenstein, Skeleton Crew,
  Costume Contest.
- The Kiro technology requirement: "Your project must use Kiro."

Note: the SLAY form's exact additional questions may differ slightly from
Kiroween's. If the SLAY form asks something extra, send Mabel a screenshot
of that field and she will write the answer.
