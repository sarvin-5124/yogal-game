export type SignupTrigger = "POST_SOLVE" | "STREAK_SAVE" | "POSE_GUIDE";

export type RecentSignup = {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  poseId: number;
  cluesUsed: number;
  trigger: SignupTrigger;
  createdAt: string;
};

export type StatsResponse = {
  generatedAt: string;
  totalSignups: number;
  signupsByTrigger: Record<SignupTrigger, number>;
  topPosesBySignup: { poseId: number; name: string; signups: number }[];
  recentSignups: RecentSignup[];
};
