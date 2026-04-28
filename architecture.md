# Yogal — Project Architecture

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                        BROWSER                          │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │         Yogal Frontend (Vite + React + TS)      │   │
│   │                                                  │   │
│   │  Game Flow:                                      │   │
│   │  Clue Cards → Guess Input → Result Screen        │   │
│   │  Pose Image Guide → Lead Capture Form            │   │
│   └────────────────────┬────────────────────────────┘   │
└────────────────────────│────────────────────────────────┘
                         │ HTTP (REST)
┌────────────────────────▼────────────────────────────────┐
│               Yogal Backend (Express + TS)               │
│                                                          │
│   Routes → Controllers → Services → Prisma ORM          │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                    PostgreSQL DB                          │
│         Poses | Signups | GameSessions                    │
└─────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
yogal/
├── idea.md
├── architecture.md
│
├── frontend/                         ← Vite + React + TS + Tailwind
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   ├── game/                 ← Core puzzle experience
│   │   │   │   ├── components/
│   │   │   │   │   ├── ClueCard.tsx
│   │   │   │   │   ├── GuessInput.tsx
│   │   │   │   │   ├── ResultScreen.tsx
│   │   │   │   │   └── ShareGrid.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useGame.ts
│   │   │   │   │   └── useStreak.ts
│   │   │   │   ├── api/
│   │   │   │   │   └── game.api.ts
│   │   │   │   ├── types/
│   │   │   │   │   └── game.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── pose-guide/           ← Image-based pose teaching
│   │   │   │   ├── components/
│   │   │   │   │   ├── PoseGuideCard.tsx
│   │   │   │   │   ├── StepImage.tsx
│   │   │   │   │   ├── StepCarousel.tsx
│   │   │   │   │   └── BenefitsChip.tsx
│   │   │   │   ├── types/
│   │   │   │   │   └── pose.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── signup/               ← Signup / lead form
│   │   │       ├── components/
│   │   │       │   ├── SignupForm.tsx
│   │   │       │   └── StreakGate.tsx
│   │   │       ├── api/
│   │   │       │   └── signup.api.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Modal.tsx
│   │   │   └── utils/
│   │   │       ├── date.ts           ← IST date helpers
│   │   │       └── emoji-grid.ts     ← Share grid generator
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── backend/                          ← Express + TS + Prisma
    ├── src/
    │   ├── routes/
    │   │   ├── game.routes.ts
    │   │   └── signup.routes.ts
    │   │
    │   ├── controllers/
    │   │   ├── game.controller.ts
    │   │   └── signup.controller.ts
    │   │
    │   ├── services/
    │   │   ├── game.service.ts       ← Daily pose selection + guess logic
    │   │   ├── pose.service.ts       ← DB queries only, no routes
    │   │   └── signup.service.ts
    │   │
    │   ├── prisma/
    │   │   └── schema.prisma
    │   │
    │   ├── app.ts
    │   └── server.ts
    │
    ├── tsconfig.json
    └── package.json
```

---

## Database Schema (Prisma)

```prisma
// backend/src/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")       // Supabase connection pooler (port 6543)
  directUrl = env("DIRECT_URL")         // Supabase direct connection (port 5432) — used by prisma migrate
}

model Pose {
  id           Int           @id @default(autoincrement())
  nameEnglish  String        // "Downward Dog"
  nameHindi    String        // "अधोमुख श्वानासन"
  nameSanskrit String        // "Adho Mukha Svanasana"
  difficulty   Difficulty
  category     PoseCategory
  clues        String[]      // exactly 5 clues, ordered easy → hard
  steps        PoseStep[]    // image-based teaching steps
  benefits     String[]
  avoid        String[]      // who should avoid this pose
  dayIndex     Int           @unique  // which day number this pose plays on
  createdAt    DateTime      @default(now())
  sessions     GameSession[]
}

model PoseStep {
  id          Int    @id @default(autoincrement())
  pose        Pose   @relation(fields: [poseId], references: [id])
  poseId      Int
  stepNumber  Int    // 1, 2, 3 ...
  imageUrl    String // hosted image of this step
  instruction String // "Stand with feet hip-width apart, arms by your side"
}

model Signup {
  id        Int           @id @default(autoincrement())
  name      String?
  phone     String?
  email     String?
  poseId    Int           // analytics: which pose triggered this signup (no join needed)
  cluesUsed Int           // analytics: how quickly they solved it (1–5)
  trigger   SignupTrigger
  createdAt DateTime      @default(now())
}

model GameSession {
  id         String   @id @default(cuid())
  poseId     Int
  pose       Pose     @relation(fields: [poseId], references: [id])
  cluesUsed  Int
  solved     Boolean
  shared     Boolean  @default(false)
  playedAt   DateTime @default(now())
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum PoseCategory {
  STANDING
  SEATED
  INVERSION
  BACKBEND
  FORWARD_BEND
  TWIST
  BALANCE
  SUPINE
}

enum SignupTrigger {
  POST_SOLVE    // "Try this pose today" CTA after solving
  STREAK_SAVE   // "Save your streak" gate after 3+ days
  POSE_GUIDE    // "Practice with Habuild" from image guide
}
```

---

## API Endpoints

### Game

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/game/today` | — | `{ poseId, dayIndex, firstClue }` |
| `POST` | `/api/game/guess` | `{ poseId, guess }` | `{ correct, solved, failed, nextClue?, poseGuide? }` |
| `POST` | `/api/game/skip` | `{ poseId }` | `{ nextClue?, failed, poseGuide? }` |
| `POST` | `/api/game/share` | `{ poseId }` | `{ ok }` |

> **Note on `/api/game/guess`:** When `solved: true` or `failed: true`, the response includes the full `poseGuide` object (names, steps, benefits, avoid). No separate reveal or pose endpoint needed.

> **Note on `/api/game/skip`:** Skip reveals the next clue without requiring a guess. Counts as one used attempt. On the 5th skip, returns `failed: true` + `poseGuide`.

### Signups

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| `POST` | `/api/signup` | `{ name?, phone?, email?, poseId, trigger }` | `{ ok }` |

---

## Game Logic

### Daily Pose Selection

```typescript
// game.service.ts
function getTodaysDayIndex(): number {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(Date.now() + IST_OFFSET);
  const epoch = new Date('2025-01-01T00:00:00Z');
  return Math.floor((nowIST.getTime() - epoch.getTime()) / 86400000);
}

// dayIndex in DB maps 1:1 to the day number
// Day 0 = Jan 1 2025, Day 1 = Jan 2 2025, etc.
// If dayIndex > total poses, wrap around: dayIndex % totalPoses
```

### Clue Reveal Flow

```
State: { cluesRevealed: 1, attempts: 0, solved: false, failed: false }
       (starts at 1 — first clue shown on load)

On GUESS:
  attempts++
  → if guess matches pose name (fuzzy) → solved = true, return poseGuide
  → if attempts < 5 → cluesRevealed++, return nextClue
  → if attempts === 5 and wrong → failed = true, return poseGuide

On SKIP:
  attempts++
  → if attempts < 5 → cluesRevealed++, return nextClue
  → if attempts === 5 → failed = true, return poseGuide

5 clues max. 5 attempts max (guess + skip combined).
Skip = wrong guess with no text submitted.
```

### Emoji Grid Generator

```typescript
// shared/utils/emoji-grid.ts
function generateShareGrid(cluesUsed: number, solved: boolean): string {
  const grid = Array(5).fill('🟥');
  for (let i = 0; i < cluesUsed - 1; i++) grid[i] = '🟨'; // wrong guesses
  if (solved) grid[cluesUsed - 1] = '🟩';                 // correct guess

  return [
    `🧘 YOGAL #${dayIndex}`,
    grid.join(''),
    solved ? `Guessed in ${cluesUsed}/5 clues` : 'Better luck tomorrow!',
    `habuild.in/yogal`,
  ].join('\n');
}
```

---

## Pose Image Guide (Key Design Decision)

After the game ends (solved or failed), the full pose guide appears. This is the teaching moment — and the primary lead conversion surface.

### Structure

```
┌──────────────────────────────────────────────────┐
│  Downward Dog  ·  अधोमुख श्वानासन                │
│  Adho Mukha Svanasana  ·  Beginner  ·  Inversion │
├──────────────────────────────────────────────────┤
│                                                  │
│  HOW TO DO IT                                    │
│                                                  │
│  ┌─────────┐  Step 1 of 4                 >     │
│  │  [IMG]  │  Start on all fours. Wrists        │
│  │         │  directly under shoulders,          │
│  └─────────┘  knees under hips.                 │
│               ○ ○ ● ○  ← dot navigation          │
│                                                  │
├──────────────────────────────────────────────────┤
│  BENEFITS                                        │
│  [Stretches hamstrings] [Relieves back pain]     │
│  [Calms the mind] [Energises the body]           │
├──────────────────────────────────────────────────┤
│  AVOID IF                                        │
│  Wrist injury · High blood pressure              │
├──────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────┐  │
│  │   Practice this pose with Habuild →        │  │
│  │   [Name] [Phone/Email]  [Start Free]       │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### PoseStep Data Shape

```typescript
// pose-guide/types/pose.types.ts

type PoseStep = {
  stepNumber: number;
  imageUrl: string;      // CDN-hosted image, no video
  instruction: string;   // one clear sentence per step
};

type PoseGuide = {
  id: number;
  nameEnglish:  string;   // "Downward Dog"
  nameHindi:    string;   // "अधोमुख श्वानासन"
  nameSanskrit: string;   // "Adho Mukha Svanasana"
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  steps: PoseStep[];      // 3–5 steps, each with image + instruction
  benefits: string[];
  avoid: string[];
};
```

### StepCarousel Component

- Swipeable on mobile (touch events)
- Dot navigation at the bottom
- Images are lazy-loaded
- No autoplay — user controls the pace
- Each image is a real photograph of the pose step (not illustration, not video)

---

## Frontend State — Game Flow

```
Page Load
  → fetch /api/game/today
  → show Clue 1 only

User guesses
  → POST /api/game/guess { guess, poseId }
  → if correct → solved, go to ResultScreen with poseGuide
  → if wrong   → reveal next clue

User skips
  → POST /api/game/skip { poseId }
  → reveal next clue (counts as one attempt)

ResultScreen (solved or failed)
  → show emoji grid
  → "Share" button → copies grid text to clipboard
  → after 1.5s → slide up PoseGuideCard

PoseGuideCard
  → StepCarousel (images, swipeable)
  → Benefits + Avoid section
  → LeadForm at bottom ("Practice with Habuild")

StreakGate (appears on day 3+)
  → "You're on a 3-day streak. Save it."
  → LeadForm (email/phone only, minimal)
```

---

## Streak Logic (localStorage)

```typescript
// game/hooks/useStreak.ts

type StreakData = {
  currentStreak: number;
  lastPlayedDate: string;  // "2025-06-15" (IST date string)
};

// On game complete:
// → read streak from localStorage
// → if lastPlayedDate === yesterday → streak++
// → if lastPlayedDate === today    → streak unchanged (already played)
// → else                           → streak = 1 (reset)
// → write back to localStorage

// Streak is local until user creates account
// On account creation → sync streak to backend
```

---

## Lead Capture — Two Trigger Points

### Trigger 1: Post-Solve (highest intent)
Appears inside PoseGuideCard, below the step images.
- Fields: Name, Phone (primary), Email (optional)
- CTA: "Practice Downward Dog with Habuild — Free"
- Feels contextual, not like a form

### Trigger 2: Streak Gate (day 3+)
Appears as a bottom sheet before showing the pose guide.
- Fields: Phone only (lowest friction)
- CTA: "Save my 3-day streak"
- Loss aversion is the trigger — they don't want to lose what they built

Both POST to `/api/signup` with a `trigger` field so the team can see which moment converts better.

---

## Tech Stack Summary

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend framework | Vite + React + TypeScript | Habuild standard |
| Styling | Tailwind CSS | Habuild standard |
| Backend | Express + TypeScript | Habuild standard |
| ORM | Prisma | Habuild standard |
| Database | Supabase (PostgreSQL) | Free tier, instant setup, no DevOps |
| Package manager | bun | Habuild standard |
| Image hosting | Habuild CDN / file-service | Already exists |
| Deployment | Existing Habuild infra | No new setup |

---

## What NOT to Build for MVP

- Authentication / login system — localStorage streak is enough for day 1
- Pose archive / play old puzzles — distraction from core loop
- Leaderboard — adds DB complexity, not needed to prove the idea
- Hindi clue mode — scope creep
- AI-generated clues — unnecessary, clues are written once per pose
- Push notifications — out of scope for hackathon
