ALTER TABLE "payments" ADD COLUMN "receipt_number" text;--> statement-breakpoint
CREATE INDEX "payments_receipt_number_idx" ON "payments" USING btree ("receipt_number");