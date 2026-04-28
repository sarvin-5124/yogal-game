import prisma from "../prisma/client.ts";
import { SignupTrigger } from "@prisma/client";

export const statsService = {
  async getStats() {
    const [totalSignups, signupsByTriggerRaw, signupsByPoseRaw, recentSignups] =
      await Promise.all([
        prisma.signup.count(),
        prisma.signup.groupBy({
          by: ["trigger"],
          _count: { _all: true },
        }),
        prisma.signup.groupBy({
          by: ["poseId"],
          _count: { _all: true },
          orderBy: { _count: { poseId: "desc" } },
          take: 5,
        }),
        prisma.signup.findMany({
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            poseId: true,
            cluesUsed: true,
            trigger: true,
            createdAt: true,
          },
        }),
      ]);

    const triggerMap = Object.fromEntries(
      signupsByTriggerRaw.map((g) => [g.trigger, g._count._all]),
    ) as Partial<Record<SignupTrigger, number>>;

    const signupsByTrigger: Record<SignupTrigger, number> = {
      POST_SOLVE: triggerMap.POST_SOLVE ?? 0,
      STREAK_SAVE: triggerMap.STREAK_SAVE ?? 0,
      POSE_GUIDE: triggerMap.POSE_GUIDE ?? 0,
    };

    const poseIds = signupsByPoseRaw.map((p) => p.poseId);
    const poses = poseIds.length
      ? await prisma.pose.findMany({
          where: { id: { in: poseIds } },
          select: { id: true, nameEnglish: true },
        })
      : [];
    const poseNameById = new Map(poses.map((p) => [p.id, p.nameEnglish]));
    const topPosesBySignup = signupsByPoseRaw.map((p) => ({
      poseId: p.poseId,
      name: poseNameById.get(p.poseId) ?? "Unknown",
      signups: p._count._all,
    }));

    return {
      generatedAt: new Date().toISOString(),
      totalSignups,
      signupsByTrigger,
      topPosesBySignup,
      recentSignups,
    };
  },
};
