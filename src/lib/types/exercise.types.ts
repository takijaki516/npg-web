// NOTE: COMMON
export type ExerciseType = "cardio" | "weights";

export type CommonWorkoutName = {
  ko: string;
  en: string;
};

export type ExerciseDetail =
  | {
      exercise_type: "weights";
      weights_exercises: WeightExercise[];
      cardio_exercises?: never;
    }
  | {
      exercise_type: "cardio";
      cardio_exercises: CardioExercise[];
      weights_exercises?: never;
    };

export type ExcersiceComment =
  | { difficulty: "너무 쉬워요"; comments: "this exercise is too easy" }
  | { difficulty: "쉬워요"; comments: "this exercise is easy" }
  | { difficulty: "보통이에요"; comments: "this exercise is moderate" }
  | { difficulty: "어려워요"; comments: "this exercise is hard" }
  | { difficulty: "너무 어려워요"; comments: "this exercise is too hard" };

// NOTE: WEIGHT
export const WEIGHT_WORKOUT_PARTS = [
  "chests",
  "arms",
  "back",
  "legs",
  "shoulders",
] as const;

export const CHEST_WORKOUTS: WeightWorkoutNames = {
  part: "chests",
  workout: [
    {
      ko: "팔굽혀펴기",
      en: "push-up",
    },
    {
      ko: "플랫 벤치프레스",
      en: "flat-bench-press",
    },
    {
      ko: "플랫 덤벨프레스",
      en: "flat-dumbbell-press",
    },
    {
      ko: "인클라인 벤치프레스",
      en: "incline-bench-press",
    },
    {
      ko: "인클라인 덤벨프레스",
      en: "incline-dumbbell-press",
    },
    {
      ko: "체스트 플라이",
      en: "chest-fly",
    },
    {
      ko: "딥스",
      en: "dips",
    },
  ],
};

export const ARMS_WORKOUTS: WeightWorkoutNames = {
  part: "arms",
  workout: [
    {
      ko: "덤벨 컬",
      en: "dumbbell-curl",
    },
    {
      ko: "바벨 컬",
      en: "barbell-curl",
    },
    {
      ko: "오버헤드 트라이셉스 익스텐션",
      en: "overhead-triceps-extension",
    },
    {
      ko: "케이블 푸시 다운",
      en: "cable-push-down",
    },
  ],
};

export const BACK_WORKOUTS: WeightWorkoutNames = {
  part: "back",
  workout: [
    {
      ko: "덤벨 로우",
      en: "dumbbell-row",
    },
    {
      ko: "바벨 로우",
      en: "barbell-row",
    },
    {
      ko: "풀 업",
      en: "pull-up",
    },
    {
      ko: "렛풀 다운",
      en: "lat-pulldown",
    },
    {
      ko: "데드 리프트",
      en: "deadlift",
    },
    {
      ko: "롱풀",
      en: "long-pull",
    },
  ],
};

export const LEGS_WORKOUTS: WeightWorkoutNames = {
  part: "legs",
  workout: [
    {
      ko: "스쿼트",
      en: "squat",
    },
    {
      ko: "레그 프레스",
      en: "leg-press",
    },
    {
      ko: "레그 익스텐션",
      en: "leg-extension",
    },
    {
      ko: "레그 컬",
      en: "leg-curl",
    },
    {
      ko: "힙 어브덕션",
      en: "hip-abduction",
    },
  ],
};

export const SHOULDERS_WORKOUTS: WeightWorkoutNames = {
  part: "shoulders",
  workout: [
    {
      ko: "덤벨 숄더 프레스",
      en: "dumbbell-shoulder-press",
    },
    {
      ko: "바벨 숄더 프레스",
      en: "barbell-shoulder-press",
    },
    {
      ko: "사이드 레터럴 레이즈",
      en: "side-lateral-raise",
    },
    {
      ko: "프런트 레이즈",
      en: "front-raise",
    },
    {
      ko: "어깨 후면 플라이",
      en: "rear-delt-flys",
    },
    {
      ko: "페이스 풀",
      en: "face-pull",
    },
  ],
};

export const TOTAL_WEIGHT_WORKOUTS = [
  CHEST_WORKOUTS,
  ARMS_WORKOUTS,
  BACK_WORKOUTS,
  LEGS_WORKOUTS,
  SHOULDERS_WORKOUTS,
] as const;

export type WeightWorkoutNames = {
  part: (typeof WEIGHT_WORKOUT_PARTS)[number];
  workout: CommonWorkoutName[];
};

export type WeightExercise = {
  name: WeightWorkoutNames["workout"][number];
  set_infos: {
    set_number: number;
    reps: number;
    weight: number;
  }[];
};

// NOTE: CARDIO
export type CardioExercise = {
  name: (typeof CARDIO_WORKOUT_NAMES)[number];
  difficulty: (typeof CARDIO_DIFFICULTY_LEVELS)[number];
};

export const CARDIO_WORKOUT_NAMES: CommonWorkoutName[] = [
  {
    ko: "러닝",
    en: "running",
  },
  {
    ko: "자전거",
    en: "bicycle",
  },
  {
    ko: "러닝머신",
    en: "treadmill",
  },
  {
    ko: "스텝퍼",
    en: "stepper",
  },
];
export const CARDIO_DIFFICULTY_LEVELS = ["LOW", "MEDIUM", "HIGH"] as const;
