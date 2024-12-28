ALTER TABLE "daily_cardio_exercises" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "daily_intakes" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "daily_weights_exercises" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "each_weights_exercises" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "weights_set_info" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "health_infos" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "foods" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "meals" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "user_goals" RENAME COLUMN "user_id" TO "profile_email";--> statement-breakpoint
ALTER TABLE "daily_cardio_exercises" DROP CONSTRAINT "daily_cardio_exercises_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "daily_intakes" DROP CONSTRAINT "daily_intakes_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "daily_weights_exercises" DROP CONSTRAINT "daily_weights_exercises_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "each_weights_exercises" DROP CONSTRAINT "each_weights_exercises_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "weights_set_info" DROP CONSTRAINT "weights_set_info_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "health_infos" DROP CONSTRAINT "health_infos_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "foods" DROP CONSTRAINT "foods_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "meals" DROP CONSTRAINT "meals_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_goals" DROP CONSTRAINT "user_goals_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "daily_cardio_exercises" ADD CONSTRAINT "daily_cardio_exercises_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_intakes" ADD CONSTRAINT "daily_intakes_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_weights_exercises" ADD CONSTRAINT "daily_weights_exercises_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "each_weights_exercises" ADD CONSTRAINT "each_weights_exercises_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weights_set_info" ADD CONSTRAINT "weights_set_info_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_infos" ADD CONSTRAINT "health_infos_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meals" ADD CONSTRAINT "meals_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;