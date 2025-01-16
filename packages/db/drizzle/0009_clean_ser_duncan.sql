CREATE TABLE "site-options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_email" text NOT NULL,
	"site" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "site-options" ADD CONSTRAINT "site-options_profile_email_profile_email_fk" FOREIGN KEY ("profile_email") REFERENCES "public"."profile"("email") ON DELETE no action ON UPDATE no action;