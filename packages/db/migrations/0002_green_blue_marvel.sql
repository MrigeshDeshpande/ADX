CREATE TABLE "fee_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fee_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"payment_mode" text NOT NULL,
	"reference_id" text,
	"receipt_number" text NOT NULL,
	"paid_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "fee_transactions_receipt_number_unique" UNIQUE("receipt_number")
);
--> statement-breakpoint
CREATE TABLE "fees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" text NOT NULL,
	"course_id" text NOT NULL,
	"base_price" integer NOT NULL,
	"scholarship" integer DEFAULT 0,
	"final_amount" integer NOT NULL,
	"ledger_code" text NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "fees_ledger_code_unique" UNIQUE("ledger_code")
);
--> statement-breakpoint
CREATE TABLE "test_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"status" text DEFAULT 'registered',
	"source" text DEFAULT '10_min_test',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "test_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"topic" text NOT NULL,
	"question" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_answer" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "test_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"test_type" text DEFAULT '10_min_test' NOT NULL,
	"status" text DEFAULT 'started' NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"score" integer,
	"questions_snapshot" jsonb,
	"evaluation_snapshot" jsonb
);
--> statement-breakpoint
ALTER TABLE "enquiries" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "enquiries" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "enquiries" ALTER COLUMN "message" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "enquiries" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "enquiries" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "enquiries" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "fee_transactions" ADD CONSTRAINT "fee_transactions_fee_id_fees_id_fk" FOREIGN KEY ("fee_id") REFERENCES "public"."fees"("id") ON DELETE no action ON UPDATE no action;