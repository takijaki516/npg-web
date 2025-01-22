// NOTE: COMMON
export type ExerciseType = "cardio" | "weights";

export const WEIGHT_BODY_PARTS = [
  "가슴",
  "팔",
  "등",
  "다리",
  "어깨",
  "코어",
] as const;

export const CHEST_WORKOUT_NAMES = [
  "플랫 벤치 프레스",
  "플랫 덤벨 프레스",
  "인클라인 벤치 프레스",
  "인클라인 덤벨 프레스",
  "팔굽혀펴기",
  "체스트 플라이",
  "딥스",
] as const;

export const ARM_WORKOUT_NAMES = [
  "덤벨 컬",
  "바벨 컬",
  "오버헤드 트리셉스 익스텐션",
  "케이블 푸시 다운",
] as const;

export const BACK_WORKOUT_NAMES = [
  "풀업",
  "랫 풀다운",
  "케이블 풀다운",
  "덤벨 로우",
  "바벨 로우",
  "데드리프트",
  "롱 풀",
] as const;

export const LEG_WORKOUT_NAMES = [
  "스쿼트",
  "레그 프레스",
  "레그 익스텐션",
  "레그 컬",
  "힙 애브덕션",
] as const;

export const SHOULDER_WORKOUT_NAMES = [
  "숄더 프레스",
  "사이드 레터럴 레이즈",
  "프론트 레이즈",
  "리어 델트 플라이",
  "페이스 풀",
] as const;

export const CORE_WORKOUT_NAMES = [
  "플랭크",
  "크런치",
  "레그 레이즈",
  "싯업",
] as const;

export const TOTAL_WEIGHT_WORKOUTS = [
  ...CHEST_WORKOUT_NAMES,
  ...ARM_WORKOUT_NAMES,
  ...BACK_WORKOUT_NAMES,
  ...LEG_WORKOUT_NAMES,
  ...SHOULDER_WORKOUT_NAMES,
  ...CORE_WORKOUT_NAMES,
] as const;

export const CARDIO_WORKOUT_NAMES = [
  "러닝",
  "바이크",
  "트레드밀",
  "스텝퍼",
] as const;

export type WORKOUT_OPTIONS =
  | typeof ARM_WORKOUT_NAMES
  | typeof CHEST_WORKOUT_NAMES
  | typeof BACK_WORKOUT_NAMES
  | typeof LEG_WORKOUT_NAMES
  | typeof SHOULDER_WORKOUT_NAMES;
