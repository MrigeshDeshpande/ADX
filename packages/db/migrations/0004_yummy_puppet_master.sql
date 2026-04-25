CREATE TABLE "plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"total_amount" integer NOT NULL,
	"type" text NOT NULL,
	"previous_plan_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "installments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"amount_due" integer NOT NULL,
	"due_date" timestamp NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "installment_id" uuid;--> statement-breakpoint
ALTER TABLE "plans" ADD CONSTRAINT "plans_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plans" ADD CONSTRAINT "plans_previous_plan_id_plans_id_fk" FOREIGN KEY ("previous_plan_id") REFERENCES "public"."plans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "plans_student_id_idx" ON "plans" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "installments_student_id_idx" ON "installments" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "installments_plan_id_idx" ON "installments" USING btree ("plan_id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_installment_id_installments_id_fk" FOREIGN KEY ("installment_id") REFERENCES "public"."installments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payments_installment_id_idx" ON "payments" USING btree ("installment_id");