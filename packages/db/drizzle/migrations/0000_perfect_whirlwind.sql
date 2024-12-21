CREATE TABLE "daily_cardio_exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"duration_minutes" smallint NOT NULL,
	"exercise_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_intakes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"date" timestamp NOT NULL,
	"intake_calories_kcal" real NOT NULL,
	"intake_carbohydrates_g" real NOT NULL,
	"intake_protein_g" real NOT NULL,
	"intake_fat_g" real NOT NULL,
	"goal_calories_kcal" real NOT NULL,
	"goal_carbohydrates_g" real NOT NULL,
	"goal_protein_g" real NOT NULL,
	"goal_fat_g" real NOT NULL,
	"llm_description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_weights_exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "each_weights_exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"weights_exercise_id" uuid NOT NULL,
	"workout_name" text NOT NULL,
	"body_part" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"meal_id" uuid NOT NULL,
	"food_name" text NOT NULL,
	"food_pic" text,
	"food_calories_kcal" real NOT NULL,
	"food_carbohydrates_g" real NOT NULL,
	"food_protein_g" real NOT NULL,
	"food_fat_g" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "health_infos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"measured_data" timestamp NOT NULL,
	"height_cm" real NOT NULL,
	"weight_kg" real NOT NULL,
	"body_fat_mass_kg" real NOT NULL,
	"skeletal_muscle_mass_kg" real NOT NULL,
	"age" smallint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"meal_time" timestamp NOT NULL,
	"total_calories_kcal" real NOT NULL,
	"total_carbohydrates_g" real NOT NULL,
	"total_protein_g" real NOT NULL,
	"total_fat_g" real NOT NULL,
	"llm_description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"cognito_sub_id" uuid,
	"image" text,
	"timezone" text DEFAULT 'Asia/Seoul' NOT NULL,
	"language" text DEFAULT 'ko' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email"),
	CONSTRAINT "profiles_cognito_sub_id_unique" UNIQUE("cognito_sub_id")
);
--> statement-breakpoint
CREATE TABLE "user_goals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"weight_kg" real NOT NULL,
	"body_fat_mass_kg" real NOT NULL,
	"skeletal_muscle_mass_kg" real NOT NULL,
	"goal_description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weights_set_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"each_weights_exercise_id" uuid NOT NULL,
	"reps" smallint NOT NULL,
	"weight" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "daily_cardio_exercises" ADD CONSTRAINT "daily_cardio_exercises_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_intakes" ADD CONSTRAINT "daily_intakes_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_weights_exercises" ADD CONSTRAINT "daily_weights_exercises_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "each_weights_exercises" ADD CONSTRAINT "each_weights_exercises_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "each_weights_exercises" ADD CONSTRAINT "each_weights_exercises_weights_exercise_id_daily_weights_exercises_id_fk" FOREIGN KEY ("weights_exercise_id") REFERENCES "public"."daily_weights_exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_meal_id_meals_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_infos" ADD CONSTRAINT "health_infos_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meals" ADD CONSTRAINT "meals_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weights_set_info" ADD CONSTRAINT "weights_set_info_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weights_set_info" ADD CONSTRAINT "weights_set_info_each_weights_exercise_id_each_weights_exercises_id_fk" FOREIGN KEY ("each_weights_exercise_id") REFERENCES "public"."each_weights_exercises"("id") ON DELETE no action ON UPDATE no action;