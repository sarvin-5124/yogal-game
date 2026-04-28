# Yogal — The Daily Yoga Puzzle Game

> Wordle proved that one daily challenge, shared as an emoji grid on WhatsApp, can go viral with zero paid marketing. Nobody has brought this mechanic to yoga. Yogal is first.

---

## The Core Idea

Every day, one yoga pose is chosen as the **"Pose of the Day."**

Players get **5 clues**, revealed one at a time. Each clue narrows it down. Guess the pose in as few clues as possible.

After solving (or failing), the game auto-generates a **shareable emoji grid** — just like Wordle — showing how many clues you needed. Players share it on WhatsApp, Instagram stories, and Twitter with a link.

Every share is a landing page visit. Every visitor has context (their friend just played). Conversion is natural.

---

## Example Gameplay

```
🧘 YOGAL — Day 47

Clue 1: This pose engages the hamstrings and calves.
→ [Guess] ________________

Clue 2: It is an inversion — your head is below your heart.
→ [Guess] ________________

Clue 3: It is one of the 12 poses in Surya Namaskar.
→ [Guess] ________________

✅ Correct! The pose was: Adho Mukha Svanasana (Downward Dog)

Your result:
🟩🟨🟥🟩🟩
Yogal #47 — Guessed in 3/5 clues
habuild.in/yogal
```

The emoji grid is copied with one tap and pasted into any chat.

---

## Why the Wordle Mechanic Works Here

| Wordle Property | Why It Creates Virality | Yogal Equivalent |
|----------------|------------------------|-----------------|
| One puzzle per day | Creates urgency, everyone synced | One pose per day |
| Same puzzle for everyone | "Did you get it?" conversation starter | Same pose globally |
| Emoji grid share | No spoilers, pure curiosity bait | Same grid format |
| Streak mechanic | Daily return habit | Yoga knowledge streak |
| No app required | Zero friction, browser-based | Mobile web-first |
| Free forever | No paywall barrier to sharing | Free to play |

---

## User Base

### Primary — The Curious Non-Yogi (Biggest Lead Pool)
- Age 22–38, urban India
- Does not practice yoga actively
- Plays word/puzzle games (Wordle, NYT Connections, Quordle)
- Will play Yogal because it's a *game*, not a *wellness app*
- Gets curious about yoga through the puzzle → clicks "Try this pose today" → **LEAD**

### Secondary — The Existing Yogi
- Already practices yoga or is on Habuild
- Plays to test their knowledge
- Higher share rate because they feel validated when they guess correctly in 1–2 clues
- Shares to their yoga group → brings in more yogis

### Tertiary — Corporate Groups
- Office WhatsApp groups adopt it as a daily ritual ("Did you get today's Yogal?")
- Becomes a team bonding moment
- HR notices → asks about the full Habuild for Business platform → **B2B LEAD**

---

## How It Works — Full User Flow

```
1. Player visits habuild.in/yogal (no signup required)
         ↓
2. Reads Clue 1 → types a guess
         ↓
3. Correct? → Celebrate screen + share grid
   Wrong?  → Next clue revealed
         ↓
4. After solving or failing all 5 clues:
   → Pose explanation card (what is this pose, benefits, how to do it)
   → "Try this pose today" CTA → free Habuild session → LEAD CAPTURE
   → "Save your streak" CTA → account creation → LEAD CAPTURE
         ↓
5. Share grid → friend sees it on WhatsApp
         ↓
6. Friend taps link → plays today's Yogal → same funnel
         ↓
7. Loop
```

---

## The Two Lead Conversion Moments

### Moment 1 — After Solving
Player just learned about a yoga pose. They're curious. They're in a wellness headspace.
> *"Try Downward Dog in today's free Habuild session →"*

This is the highest-intent moment. They just spent 2 minutes thinking about yoga. Strike now.

### Moment 2 — Streak Save
After 3+ days of consecutive play, show:
> *"You're on a 3-day Yogal streak. Create a free account to save it — streaks reset if you don't."*

The streak has value now. People will sign up to protect something they've built. This is the Duolingo guilt mechanic applied at the right moment.

---

## Viral Loop Mechanics

```
Player shares grid on WhatsApp
    ↓
5 contacts see it
    ↓
2 tap the link (40% CTR on WhatsApp — much higher than social ads)
    ↓
1.5 play to completion (75% completion rate for short games)
    ↓
1.2 share their own grid
    ↓
K-factor ≈ 1.2 (viral — each user brings more than 1 new user)
```

With Habuild's existing 14.6M member base as seed users, even a K-factor of 0.8 generates enormous volume.

---

## Content Engine — The Pose Library

Habuild already has years of yoga content. Each day's puzzle needs:
- 1 pose name (English + Sanskrit)
- 5 clues ordered easy → hard
- A short explanation card
- 1 linked Habuild session featuring that pose

This is **weeks of content that already exists** inside Habuild's knowledge base. The puzzle format just structures it differently.

**Pose categories to rotate through:**
- Beginner vs. Advanced (accessibility for all skill levels)
- Themed weeks (back pain week, energy week, sleep week)
- Festival-tied poses (Diwali, New Year, etc.)
- Seasonal (monsoon, winter morning)

---

## Name Ideas (Working Title: Yogal)

| Name | Why |
|------|-----|
| **Yogal** | Yoga + Wordle. Obvious. Memorable. |
| **Asana** | The Sanskrit word for pose — clean, single word |
| **Posle** | Pose + Wordle portmanteau |
| **Dhyana** | Sanskrit for meditation/focus — but less obvious |
| **Samasthiti** | Too complex |
| **YogaGram** | Instagram feel, but dated |
| **Namastle** | Namaste + Wordle — fun, punny |
| **Chakral** | Chakra + Wordle |

**Recommendation:** Keep **Yogal** for now. Revisit after validating the concept. A good name matters less than a good mechanic at hackathon stage.

---

## What Makes This Hackathon-Ready

- **Demonstrable live during pitch** — judges can play it on their phones in real time
- **No backend complexity for MVP** — pose library can be hardcoded JSON for day 1
- **No AI required** — clues are written once per pose, reused forever
- **Shareable output works on day 1** — emoji grid generation is a solved problem
- **Lead capture is a single form** — email/phone, nothing more
- **Mobile web-first** — no app store approval needed

---

## MVP Scope (1-Day Build)

| Feature | Priority |
|---------|----------|
| Daily pose puzzle (5 clues) | P0 — must have |
| Emoji grid share output | P0 — must have |
| Pose explanation card after solving | P0 — must have |
| "Try this pose" CTA → lead capture form | P0 — must have |
| Streak counter (local storage) | P1 — should have |
| "Save streak" → account creation flow | P1 — should have |
| Pose archive (play yesterday's) | P2 — nice to have |
| Leaderboard | P2 — nice to have |
| Hint system (skip a clue, lose points) | P2 — nice to have |

---

## Why This Wins the Hackathon

1. **Judges can experience it** — not a slide, a live product
2. **The viral mechanic is proven** — Wordle data is public, the case is airtight
3. **Lead conversion is clear** — two specific moments with specific CTAs
4. **Builds on Habuild's existing strength** — uses their content library, not new content
5. **It's fun** — the best lead gen tool is one people use because they want to, not because they're asked to
6. **First in yoga globally** — no competitor has done this

---

## Open Questions to Resolve

- [ ] How many poses in the initial library? (Recommend: 60 — 2 months of content)
- [ ] Clues written by team or generated by AI?
- [ ] Does sharing require an account, or is it fully anonymous?
- [ ] One global leaderboard, or city-based?
- [ ] English only, or Hindi clue mode?
- [ ] Partner with Habuild's existing social media for daily reveal (organic amplification)?
