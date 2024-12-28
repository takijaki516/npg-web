CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"timezone" text DEFAULT 'Asia/Seoul' NOT NULL,
	"language" text DEFAULT 'ko' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profile_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_email_user_email_fk" FOREIGN KEY ("email") REFERENCES "public"."user"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "timezone";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "language";