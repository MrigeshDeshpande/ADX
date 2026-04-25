CREATE TABLE "pdf_failures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_id" uuid NOT NULL,
	"error_message" text,
	"created_at" timestamp DEFAULT now()
);
