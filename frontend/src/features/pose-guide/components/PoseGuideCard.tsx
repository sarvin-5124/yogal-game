import { StepCarousel } from "./StepCarousel";
import { BenefitsChip } from "./BenefitsChip";
import { SignupForm } from "../../signup/components/SignupForm";
import type { PoseGuide } from "../types/pose.types";

const difficultyLabel = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};
const categoryLabel: Record<string, string> = {
  STANDING: "Standing",
  SEATED: "Seated",
  INVERSION: "Inversion",
  BACKBEND: "Backbend",
  FORWARD_BEND: "Forward Bend",
  TWIST: "Twist",
  BALANCE: "Balance",
  SUPINE: "Supine",
};

type Props = {
  guide: PoseGuide;
  poseId: number;
  cluesUsed: number;
};

export function PoseGuideCard({ guide, poseId, cluesUsed }: Props) {
  return (
    <div className="rounded-2xl border border-stone-100 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-5 py-4">
        <h2 className="font-serif text-xl font-semibold text-stone-800">
          {guide.nameEnglish}
        </h2>
        <p className="mt-0.5 text-base text-stone-500">{guide.nameHindi}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-400">
          <span>{guide.nameSanskrit}</span>
          <span>·</span>
          <span>{difficultyLabel[guide.difficulty]}</span>
          <span>·</span>
          <span>{categoryLabel[guide.category] ?? guide.category}</span>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
            How to do it
          </h3>
          <StepCarousel steps={guide.steps} />
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Benefits
          </h3>
          <div className="flex flex-wrap gap-2">
            {guide.benefits.map((b) => (
              <BenefitsChip key={b} label={b} />
            ))}
          </div>
        </div>

        {guide.avoid.length > 0 && (
          <div>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-400">
              Avoid if
            </h3>
            <p className="text-sm text-stone-500">{guide.avoid.join(" · ")}</p>
          </div>
        )}

        <div className="rounded-xl border border-green-100 bg-green-50 p-4">
          <p className="mb-3 text-sm font-medium text-stone-700">
            Practice <span className="text-green-700">{guide.nameEnglish}</span>{" "}
            with Habuild — free
          </p>
          <SignupForm
            poseId={poseId}
            poseName={guide.nameEnglish}
            cluesUsed={cluesUsed}
            trigger="POST_SOLVE"
          />
        </div>
      </div>
    </div>
  );
}
