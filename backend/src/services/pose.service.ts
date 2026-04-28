import prisma from "../prisma/client.ts";

export const poseService = {
  getPoseById(id: number) {
    return prisma.pose.findUnique({
      where: { id },
      include: { steps: { orderBy: { stepNumber: "asc" } } },
    });
  },

  getPoseByDayIndex(dayIndex: number) {
    return prisma.pose.findUnique({
      where: { dayIndex },
      include: { steps: { orderBy: { stepNumber: "asc" } } },
    });
  },

  getTotalPoseCount() {
    return prisma.pose.count();
  },
};
