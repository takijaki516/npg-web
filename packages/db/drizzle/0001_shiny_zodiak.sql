ALTER TABLE "each_weights_exercises" DROP CONSTRAINT "each_weights_exercises_weights_exercise_id_daily_weights_exerci";
--> statement-breakpoint
ALTER TABLE "weights_set_info" DROP CONSTRAINT "weights_set_info_each_weights_exercise_id_each_weights_exercise";
--> statement-breakpoint
ALTER TABLE "daily_cardio_exercises" ALTER COLUMN "end_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_cardio_exercises" ALTER COLUMN "duration_minutes" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_intakes" ALTER COLUMN "intake_calories_kcal" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_intakes" ALTER COLUMN "intake_carbohydrates_g" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_intakes" ALTER COLUMN "intake_protein_g" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_intakes" ALTER COLUMN "intake_fat_g" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "health_infos" ALTER COLUMN "height_cm" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "health_infos" ALTER COLUMN "weight_kg" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "health_infos" ALTER COLUMN "body_fat_mass_kg" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "health_infos" ALTER COLUMN "skeletal_muscle_mass_kg" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "health_infos" ALTER COLUMN "age" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_goals" ALTER COLUMN "weight_kg" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_goals" ALTER COLUMN "body_fat_mass_kg" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_goals" ALTER COLUMN "skeletal_muscle_mass_kg" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "each_weights_exercises" ADD CONSTRAINT "each_weights_exercises_weights_exercise_id_daily_weights_exercises_id_fk" FOREIGN KEY ("weights_exercise_id") REFERENCES "public"."daily_weights_exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weights_set_info" ADD CONSTRAINT "weights_set_info_each_weights_exercise_id_each_weights_exercises_id_fk" FOREIGN KEY ("each_weights_exercise_id") REFERENCES "public"."each_weights_exercises"("id") ON DELETE no action ON UPDATE no action;