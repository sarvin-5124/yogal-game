import prisma from "../prisma/client.ts";
import { poseService } from "./pose.service.ts";

function getTodaysDayIndex(): number {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(Date.now() + IST_OFFSET);
  const epoch = new Date("2025-01-01T00:00:00Z");
  return Math.floor((nowIST.getTime() - epoch.getTime()) / 86400000);
}

function normalize(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, " ");
}

function isMatch(
  guess: string,
  pose: { nameEnglish: string; nameHindi: string; nameSanskrit: string },
): boolean {
  const g = normalize(guess);
  const names = [pose.nameEnglish, pose.nameHindi, pose.nameSanskrit].map(
    normalize,
  );
  return names.some((n) => n === g || n.includes(g) || g.includes(n));
}

function buildPoseGuide(
  pose: Awaited<ReturnType<typeof poseService.getPoseById>>,
) {
  if (!pose) return null;
  return {
    id: pose.id,
    nameEnglish: pose.nameEnglish,
    nameHindi: pose.nameHindi,
    nameSanskrit: pose.nameSanskrit,
    difficulty: pose.difficulty,
    category: pose.category,
    steps: pose.steps,
    benefits: pose.benefits,
    avoid: pose.avoid,
  };
}

export const gameService = {
  async getTodaysPose() {
    const total = await poseService.getTotalPoseCount();
    if (total === 0) throw new Error("No poses seeded yet.");
    const dayIndex = getTodaysDayIndex() % total;
    const pose = await poseService.getPoseByDayIndex(dayIndex);
    if (!pose) throw new Error(`No pose found for dayIndex ${dayIndex}.`);
    return {
      poseId: pose.id,
      dayIndex: pose.dayIndex,
      firstClue: pose.clues[0],
    };
  },

  async processGuess(poseId: number, guess: string, cluesRevealed: number) {
    const pose = await poseService.getPoseById(poseId);
    if (!pose) throw new Error("Pose not found.");

    if (isMatch(guess, pose)) {
      return {
        correct: true,
        solved: true,
        failed: false,
        poseGuide: buildPoseGuide(pose),
      };
    }

    // attempts exhausted (cluesRevealed reaches 5 means all clues shown, no more chances)
    if (cluesRevealed >= 5) {
      return {
        correct: false,
        solved: false,
        failed: true,
        poseGuide: buildPoseGuide(pose),
      };
    }

    return {
      correct: false,
      solved: false,
      failed: false,
      nextClue: pose.clues[cluesRevealed] ?? null,
    };
  },

  async processSkip(poseId: number, cluesRevealed: number) {
    const pose = await poseService.getPoseById(poseId);
    if (!pose) throw new Error("Pose not found.");

    if (cluesRevealed >= 5) {
      return { failed: true, poseGuide: buildPoseGuide(pose) };
    }

    return { failed: false, nextClue: pose.clues[cluesRevealed] ?? null };
  },

  async logGameSession(
    poseId: number,
    cluesUsed: number,
    solved: boolean,
    shared = false,
  ) {
    return prisma.gameSession.create({
      data: { poseId, cluesUsed, solved, shared },
    });
  },
};
