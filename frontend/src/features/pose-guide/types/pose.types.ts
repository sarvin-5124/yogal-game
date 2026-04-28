export type PoseStep = {
  stepNumber: number;
  imageUrl: string;
  instruction: string;
};

export type PoseGuide = {
  id: number;
  nameEnglish: string;
  nameHindi: string;
  nameSanskrit: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  steps: PoseStep[];
  benefits: string[];
  avoid: string[];
};
