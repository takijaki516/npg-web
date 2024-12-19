// NOTE: COMMON
export type ExerciseType = "cardio" | "weights";

export type ExerciseDetail =
  | {
      exercise_type: "weights";
    }
  | {
      exercise_type: "cardio";
    };

export type ExcersiceComment =
  | { difficulty: "너무 쉬워요"; comments: "this exercise is too easy" }
  | { difficulty: "쉬워요"; comments: "this exercise is easy" }
  | { difficulty: "보통이에요"; comments: "this exercise is moderate" }
  | { difficulty: "어려워요"; comments: "this exercise is hard" }
  | { difficulty: "너무 어려워요"; comments: "this exercise is too hard" };

export const WEIGHT_BODY_PARTS = [
  "chests",
  "arms",
  "back",
  "legs",
  "shoulders",
] as const;

export const CHEST_WORKOUT_NAMES = [
  "push-up",
  "flat-bench-press",
  "flat-dumbbell-press",
  "incline-bench-press",
  "incline-dumbbell-press",
  "chest-fly",
  "dips",
] as const;

export const ARM_WORKOUT_NAMES = [
  "dumbbell-curl",
  "barbell-curl",
  "overhead-triceps-extension",
  "cable-push-down",
] as const;

export const BACK_WORKOUT_NAMES = [
  "dumbbell-row",
  "barbell-row",
  "pull-up",
  "lat-pulldown",
  "deadlift",
  "long-pull",
] as const;

export const LEG_WORKOUT_NAMES = [
  "squat",
  "leg-press",
  "leg-extension",
  "leg-curl",
  "hip-abduction",
] as const;

export const SHOULDER_WORKOUT_NAMES = [
  "dumbbell-shoulder-press",
  "barbell-shoulder-press",
  "side-lateral-raise",
  "front-raise",
  "rear-delt-flys",
  "face-pull",
] as const;

export const TOTAL_WEIGHT_WORKOUTS = [
  ...CHEST_WORKOUT_NAMES,
  ...ARM_WORKOUT_NAMES,
  ...BACK_WORKOUT_NAMES,
  ...LEG_WORKOUT_NAMES,
  ...SHOULDER_WORKOUT_NAMES,
] as const;

export const CARDIO_WORKOUT_NAMES = [
  "run",
  "bike",
  "treadmill",
  "stepper",
] as const;

export type WORKOUT_OPTIONS =
  | typeof ARM_WORKOUT_NAMES
  | typeof CHEST_WORKOUT_NAMES
  | typeof BACK_WORKOUT_NAMES
  | typeof LEG_WORKOUT_NAMES
  | typeof SHOULDER_WORKOUT_NAMES;
