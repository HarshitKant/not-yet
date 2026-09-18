# NotYet

> Software that remembers why you said no — and tells you when the answer should change.

Teams document what they build. The rejected ideas, original trade-offs, and conditions that would make an old “no” worth revisiting usually disappear into a meeting note.

NotYet turns those deferred decisions into a living watchlist.

## The idea

A team records:

- the option it deferred;
- the evidence and trade-offs behind the decision; and
- the measurable conditions that would justify reopening it.

When those conditions shift, NotYet brings back the original context alongside current evidence and asks for a deliberate re-evaluation. It never changes the decision automatically.

## Demo scenario

Prism Labs deferred an **AI voice interface** because latency, inference cost, and Indian-English accuracy were not ready.

NotYet shows that three of four original blockers have cleared:

| Condition | Then | Now |
| --- | ---: | ---: |
| Response latency | 1.8s | 320ms |
| Inference cost | ₹2.10/min | ₹0.38/min |
| Indian-English accuracy | 87.2% | 96.4% |
| User demand | 6% | Awaiting new evidence |

The outcome is not “idea resurrected.” It is **ready for re-evaluation**.

## What the prototype includes

- A decision watchlist that focuses attention on changing assumptions.
- A detailed evidence view with original reasoning, thresholds, owners, and a signal timeline.
- A re-evaluation flow that preserves the distinction between evidence and decision-making.
- A lightweight “new deferred decision” form, so the concept can be explored beyond the seeded example.

## Run it

This is a dependency-free front-end prototype. Open `index.html` directly in any modern browser.

## Built for

Product teams and founders making technology bets that are valid **not yet**, rather than permanently wrong.

---

Built as a hackathon prototype.
