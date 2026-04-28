import { PrismaClient, Difficulty, PoseCategory } from "@prisma/client";

const prisma = new PrismaClient();

const poses = [
  {
    dayIndex: 0,
    nameEnglish: "Downward Dog",
    nameHindi: "अधोमुख श्वानासन",
    nameSanskrit: "Adho Mukha Svanasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.INVERSION,
    clues: [
      "This is one of the most recognised yoga poses in the world.",
      "Your body forms an inverted V-shape in this pose.",
      "Both your hands and feet are on the ground simultaneously.",
      "It is a key transitional pose in Surya Namaskar.",
      "This inversion stretches the hamstrings and calves while strengthening the arms and shoulders.",
    ],
    benefits: [
      "Stretches hamstrings and calves",
      "Strengthens arms and shoulders",
      "Relieves back pain",
      "Calms the mind",
      "Improves circulation",
    ],
    avoid: [
      "Wrist injury",
      "High blood pressure",
      "Late-term pregnancy",
      "Detached retina",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Downward+Dog+Step+1",
        instruction:
          "Start on all fours with wrists under shoulders and knees under hips.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Downward+Dog+Step+2",
        instruction: "Tuck your toes under and lift your knees off the mat.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Downward+Dog+Step+3",
        instruction:
          "Straighten your legs and press your hips up and back, forming an inverted V.",
      },
      {
        stepNumber: 4,
        imageUrl: "https://placehold.co/400x300?text=Downward+Dog+Step+4",
        instruction:
          "Press your heels toward the floor and relax your head between your arms.",
      },
    ],
  },
  {
    dayIndex: 1,
    nameEnglish: "Warrior I",
    nameHindi: "वीरभद्रासन I",
    nameSanskrit: "Virabhadrasana I",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.STANDING,
    clues: [
      "This pose is named after a fierce warrior from Hindu mythology.",
      "You stand in a deep lunge with one leg forward.",
      "Both arms reach straight overhead with palms facing each other.",
      "The back foot is turned outward at a 45-degree angle.",
      "This standing pose builds strength in the thighs and opens the chest and hips.",
    ],
    benefits: [
      "Strengthens thighs and calves",
      "Opens chest and shoulders",
      "Improves balance and stability",
      "Stretches hip flexors",
      "Builds mental focus",
    ],
    avoid: [
      "High blood pressure",
      "Knee or hip injury",
      "Shoulder problems",
      "Heart conditions",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Warrior+I+Step+1",
        instruction:
          "Stand at the top of your mat, then step your left foot back about 4 feet.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Warrior+I+Step+2",
        instruction:
          "Turn your back foot out 45 degrees and align your front heel with your back arch.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Warrior+I+Step+3",
        instruction:
          "Bend your front knee to 90 degrees, keeping it directly over your ankle.",
      },
      {
        stepNumber: 4,
        imageUrl: "https://placehold.co/400x300?text=Warrior+I+Step+4",
        instruction:
          "Raise both arms overhead, palms facing each other, and gaze forward or up.",
      },
    ],
  },
  {
    dayIndex: 2,
    nameEnglish: "Child's Pose",
    nameHindi: "बालासन",
    nameSanskrit: "Balasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.SEATED,
    clues: [
      "This is a resting pose commonly used between more challenging poses.",
      "Your body folds completely forward toward the ground.",
      "Your forehead rests gently on the mat.",
      "It is named after the natural resting position of a young child.",
      "Knees are wide or together, arms extended forward or resting alongside the body.",
    ],
    benefits: [
      "Releases tension in back and hips",
      "Calms the nervous system",
      "Gently stretches the spine",
      "Relieves fatigue",
      "Promotes deep breathing",
    ],
    avoid: [
      "Knee injury",
      "Ankle problems",
      "Late-term pregnancy",
      "Diarrhoea",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Hatha_yoga_child_pose.jpg/250px-Hatha_yoga_child_pose.jpg",
        instruction:
          "Kneel on the mat with your big toes touching and knees hip-width apart.",
      },
      {
        stepNumber: 2,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Balasana.JPG/250px-Balasana.JPG",
        instruction:
          "Sit back onto your heels and exhale as you fold your torso forward.",
      },
      {
        stepNumber: 3,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Hatha_yoga_child_pose.jpg/250px-Hatha_yoga_child_pose.jpg",
        instruction:
          "Extend your arms forward on the mat and rest your forehead on the ground.",
      },
    ],
  },
  {
    dayIndex: 3,
    nameEnglish: "Tree Pose",
    nameHindi: "वृक्षासन",
    nameSanskrit: "Vrikshasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.BALANCE,
    clues: [
      "This pose is named after a tall plant found in nature.",
      "You balance entirely on one leg throughout this pose.",
      "The raised foot rests on the inner thigh or calf — never on the knee joint.",
      "Arms may be raised overhead like branches reaching for the sky.",
      "This standing balance improves focus, ankle strength, and hip flexibility.",
    ],
    benefits: [
      "Improves balance and focus",
      "Strengthens ankles and calves",
      "Opens the hips",
      "Builds core stability",
      "Improves posture",
    ],
    avoid: [
      "Vertigo or dizziness",
      "Low blood pressure",
      "Insomnia",
      "Migraine",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Tree+Pose+Step+1",
        instruction:
          "Stand tall with feet together and arms at your sides. Fix your gaze on a still point.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Tree+Pose+Step+2",
        instruction:
          "Shift your weight onto your left foot. Bend your right knee and open your hip.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Tree+Pose+Step+3",
        instruction:
          "Place your right foot on your inner left thigh or calf — avoid the knee.",
      },
      {
        stepNumber: 4,
        imageUrl: "https://placehold.co/400x300?text=Tree+Pose+Step+4",
        instruction:
          "Bring your palms together at the chest or raise your arms overhead like branches.",
      },
    ],
  },
  {
    dayIndex: 4,
    nameEnglish: "Cobra Pose",
    nameHindi: "भुजंगासन",
    nameSanskrit: "Bhujangasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.BACKBEND,
    clues: [
      "This pose is named after a reptile known for rearing its head up dramatically.",
      "You lie face-down on your mat to begin this pose.",
      "Your hands press into the mat just below your shoulders.",
      "The chest lifts off the ground while the hips and legs remain down.",
      "This backbend is a core pose in Surya Namaskar and strengthens the entire spine.",
    ],
    benefits: [
      "Strengthens the spine",
      "Opens the chest and lungs",
      "Stimulates abdominal organs",
      "Relieves lower back tension",
      "Improves posture",
    ],
    avoid: [
      "Back injury or surgery",
      "Carpal tunnel syndrome",
      "Pregnancy",
      "Headache",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Cobra+Step+1",
        instruction:
          "Lie face-down on your mat with your legs extended and tops of feet on the ground.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Cobra+Step+2",
        instruction:
          "Place your palms flat on the mat just below your shoulders, elbows close to your body.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Cobra+Step+3",
        instruction:
          "Inhale and gently press into your hands, lifting your chest off the mat.",
      },
      {
        stepNumber: 4,
        imageUrl: "https://placehold.co/400x300?text=Cobra+Step+4",
        instruction:
          "Keep your elbows slightly bent, shoulders away from ears, and gaze forward.",
      },
    ],
  },
  {
    dayIndex: 5,
    nameEnglish: "Triangle Pose",
    nameHindi: "त्रिकोणासन",
    nameSanskrit: "Trikonasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.STANDING,
    clues: [
      "This pose takes its name from a three-sided geometric shape.",
      "Your legs are spread wide apart and both remain straight.",
      "The torso bends sideways, not forward or back.",
      "One hand reaches down toward the front shin or floor while the other extends upward.",
      "This standing pose stretches the side body and strengthens the legs.",
    ],
    benefits: [
      "Stretches hips, hamstrings, and calves",
      "Opens the chest and shoulders",
      "Improves digestion",
      "Strengthens the legs",
      "Relieves backache",
    ],
    avoid: ["Low blood pressure", "Diarrhoea", "Migraine", "Neck injury"],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Triangle+Step+1",
        instruction:
          "Stand with feet about 4 feet apart. Turn your right foot out 90 degrees and your left foot slightly in.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Triangle+Step+2",
        instruction:
          "Extend both arms parallel to the floor, then reach actively to the right over the front leg.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Triangle+Step+3",
        instruction:
          "Lower your right hand to your shin or the floor and raise your left arm toward the ceiling.",
      },
    ],
  },
  {
    dayIndex: 6,
    nameEnglish: "Bridge Pose",
    nameHindi: "सेतुबंधासन",
    nameSanskrit: "Setu Bandha Sarvangasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.BACKBEND,
    clues: [
      "This pose is named after a structure that spans across rivers and gaps.",
      "You begin lying flat on your back with knees bent.",
      "Your feet stay flat on the mat, hip-width apart, throughout the pose.",
      "The hips and chest lift toward the sky while the shoulders remain on the ground.",
      "This gentle backbend energises the body and is often used to relieve lower back pain.",
    ],
    benefits: [
      "Stretches the chest, neck, and spine",
      "Calms the brain and reduces anxiety",
      "Stimulates abdominal organs",
      "Relieves menstrual discomfort",
      "Therapeutic for asthma and high blood pressure",
    ],
    avoid: ["Neck injury", "Recent shoulder surgery", "Late-term pregnancy"],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Bridge+Step+1",
        instruction:
          "Lie on your back with knees bent, feet flat on the mat hip-width apart, close to your sit bones.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Bridge+Step+2",
        instruction:
          "Press your feet and arms into the mat and lift your hips toward the sky.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Bridge+Step+3",
        instruction:
          "Clasp your hands beneath your back, roll your shoulders under, and breathe deeply.",
      },
    ],
  },
  {
    dayIndex: 7,
    nameEnglish: "Pigeon Pose",
    nameHindi: "एक पाद राजकपोतासन",
    nameSanskrit: "Eka Pada Rajakapotasana",
    difficulty: Difficulty.INTERMEDIATE,
    category: PoseCategory.SEATED,
    clues: [
      "This pose is named after a common urban bird with a puffed-out chest.",
      "It is widely considered the king of hip-opening poses.",
      "One leg is bent in front of the body while the other extends straight back.",
      "The front shin is roughly parallel to the front edge of the mat.",
      "Many practitioners fold their torso forward over the bent front leg in the resting variation.",
    ],
    benefits: [
      "Deeply opens the hip rotators and flexors",
      "Stretches the thighs, glutes, and psoas",
      "Stimulates abdominal organs",
      "Releases stored tension and emotion",
      "Improves posture",
    ],
    avoid: [
      "Knee, hip, or sacroiliac injury",
      "Recent ankle sprain",
      "Late-term pregnancy",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Pigeon+Step+1",
        instruction:
          "Start in Downward Dog. Bring your right knee forward toward your right wrist.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Pigeon+Step+2",
        instruction:
          "Slide your right shin toward the front of the mat and extend your left leg straight back.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Pigeon+Step+3",
        instruction:
          "Square your hips, then walk your hands forward and lower your torso over the front leg.",
      },
    ],
  },
  {
    dayIndex: 8,
    nameEnglish: "Boat Pose",
    nameHindi: "नावासन",
    nameSanskrit: "Navasana",
    difficulty: Difficulty.INTERMEDIATE,
    category: PoseCategory.BALANCE,
    clues: [
      "This pose is named after a vessel that floats on water.",
      "You balance on your sit bones with both feet lifted off the ground.",
      "The body forms a sharp V-shape from head to toes.",
      "Arms typically reach forward parallel to the floor.",
      "This pose is famous for building core and hip flexor strength.",
    ],
    benefits: [
      "Strengthens the abdomen and hip flexors",
      "Stimulates the kidneys and thyroid",
      "Improves digestion",
      "Aids stress relief",
      "Builds balance and focus",
    ],
    avoid: ["Headache", "Low blood pressure", "Diarrhoea", "Pregnancy"],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Boat+Step+1",
        instruction:
          "Sit with knees bent and feet flat. Lean back slightly and engage your core.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Boat+Step+2",
        instruction:
          "Lift your feet off the floor and bring your shins parallel to the ground.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Boat+Step+3",
        instruction:
          "Straighten your legs into a V and reach your arms forward at shoulder height.",
      },
    ],
  },
  {
    dayIndex: 9,
    nameEnglish: "Plank Pose",
    nameHindi: "फलकासन",
    nameSanskrit: "Phalakasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.STANDING,
    clues: [
      "This pose shares its name with a flat piece of construction lumber.",
      "The whole body forms a single straight line from head to heels.",
      "The arms are fully extended with palms pressing into the mat.",
      "It is a foundational hold in Vinyasa flow sequences.",
      "Despite looking simple, this pose engages nearly every muscle in the body.",
    ],
    benefits: [
      "Strengthens core, arms, and shoulders",
      "Tones the spine",
      "Improves posture",
      "Builds bone density in wrists",
      "Increases full-body endurance",
    ],
    avoid: [
      "Wrist injury",
      "Carpal tunnel syndrome",
      "Recent abdominal surgery",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Plank+Step+1",
        instruction:
          "Start on hands and knees, with wrists directly under shoulders.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Plank+Step+2",
        instruction:
          "Step both feet back, tucking your toes, until your body is in one long line.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Plank+Step+3",
        instruction:
          "Engage your core, draw your shoulder blades down your back, and breathe steadily.",
      },
    ],
  },
  {
    dayIndex: 10,
    nameEnglish: "Lotus Pose",
    nameHindi: "पद्मासन",
    nameSanskrit: "Padmasana",
    difficulty: Difficulty.ADVANCED,
    category: PoseCategory.SEATED,
    clues: [
      "This pose is named after a flower that grows in muddy water and blooms above the surface.",
      "It is one of the most iconic seated postures used in meditation.",
      "Each foot rests on the opposite thigh, soles facing upward.",
      "The hips, knees, and ankles must be very open to enter this pose safely.",
      "Practitioners often hold this position for long meditation sessions.",
    ],
    benefits: [
      "Calms the mind",
      "Stretches ankles and knees",
      "Improves posture",
      "Stimulates the spine and abdomen",
      "Eases menstrual discomfort and sciatica",
    ],
    avoid: [
      "Knee or ankle injury",
      "Tight hips (use Half Lotus instead)",
      "Sciatica",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Lotus+Step+1",
        instruction:
          "Sit on the mat with legs extended forward. Bend your right knee and bring the foot onto the left thigh.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Lotus+Step+2",
        instruction:
          "Bend your left knee and place the left foot on the right thigh, soles facing up.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Lotus+Step+3",
        instruction:
          "Lengthen your spine, rest your hands on the knees, and close your eyes to meditate.",
      },
    ],
  },
  {
    dayIndex: 11,
    nameEnglish: "Corpse Pose",
    nameHindi: "शवासन",
    nameSanskrit: "Savasana",
    difficulty: Difficulty.BEGINNER,
    category: PoseCategory.SUPINE,
    clues: [
      "Despite looking like the simplest pose, many teachers call it the hardest to do well.",
      "The pose's name is borrowed from the appearance of a body completely at rest.",
      "You lie completely flat on your back with limbs slightly apart.",
      "It is traditionally the final pose of every yoga session.",
      "The challenge is not physical — it is letting go of all conscious effort.",
    ],
    benefits: [
      "Calms the central nervous system",
      "Reduces stress and fatigue",
      "Lowers blood pressure",
      "Helps with insomnia",
      "Integrates the benefits of practice",
    ],
    avoid: [
      "Severe back pain (use bolsters under knees)",
      "Late-term pregnancy (lie on the side)",
    ],
    steps: [
      {
        stepNumber: 1,
        imageUrl: "https://placehold.co/400x300?text=Corpse+Step+1",
        instruction:
          "Lie on your back with arms slightly away from the body, palms facing up.",
      },
      {
        stepNumber: 2,
        imageUrl: "https://placehold.co/400x300?text=Corpse+Step+2",
        instruction: "Let your feet fall open naturally and close your eyes.",
      },
      {
        stepNumber: 3,
        imageUrl: "https://placehold.co/400x300?text=Corpse+Step+3",
        instruction:
          "Soften every part of the body. Stay for at least five minutes, breathing naturally.",
      },
    ],
  },
];

async function main() {
  console.log("Seeding poses...");
  for (const pose of poses) {
    const { steps, ...poseData } = pose;
    await prisma.pose.upsert({
      where: { dayIndex: poseData.dayIndex },
      update: {},
      create: {
        ...poseData,
        steps: { create: steps },
      },
    });
    console.log(`✓ ${poseData.nameEnglish}`);
  }
  console.log("Seeding complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
