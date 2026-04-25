ALTER TABLE "payments" ADD COLUMN "receipt_status" text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "receipt_version" integer DEFAULT 1;