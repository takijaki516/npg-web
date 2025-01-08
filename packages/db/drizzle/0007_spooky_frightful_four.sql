ALTER TABLE "each_weights_exercises" DROP CONSTRAINT "each_weights_exercises_weights_exercise_id_daily_weights_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "weights_set_info" DROP CONSTRAINT "weights_set_info_each_weights_exercise_id_each_weights_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "foods" DROP CONSTRAINT "foods_meal_id_meals_id_fk";
--> statement-breakpoint
ALTER TABLE "each_weights_exercises" ADD CONSTRAINT "each_weights_exercises_weights_exercise_id_daily_weights_exercises_id_fk" FOREIGN KEY ("weights_exercise_id") REFERENCES "public"."daily_weights_exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weights_set_info" ADD CONSTRAINT "weights_set_info_each_weights_exercise_id_each_weights_exercises_id_fk" FOREIGN KEY ("each_weights_exercise_id") REFERENCES "public"."each_weights_exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_meal_id_meals_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON DELETE cascade ON UPDATE no action;