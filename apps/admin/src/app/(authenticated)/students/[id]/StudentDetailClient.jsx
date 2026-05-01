"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { addStudentPayment, addFlexibleInstallment } from "@/actions/student";
import { formatDate } from "@/lib/format";

import { PlanSection } from "@/components/students/PlanSection";
import { InstallmentsTable } from "@/components/students/InstallmentsTable";
import { TransactionsTable } from "@/components/students/TransactionTable";
import { AddPaymentForm } from "@/components/students/AddPaymentForm";
import { AddInstallmentForm } from "@/components/students/AddInstallmentForm";
import { AssignPlanWizard } from "@/components/students/AssignPlanWizard";

export function StudentDetailClient({ student, initialTransactions, initialPlan, initialInstallments }) {
  const router = useRouter();

  const [plan, setPlan] = useState(initialPlan ?? null);
  const [installments, setInstallments] = useState(initialInstallments ?? []);
  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => { setPlan(initialPlan ?? null); }, [initialPlan]);
  useEffect(() => { setInstallments(initialInstallments ?? []); }, [initialInstallments]);
  useEffect(() => { setTransactions(initialTransactions ?? []); }, [initialTransactions]);

  const [wizardOpen, setWizardOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [installmentModalOpen, setInstallmentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingInstallment, setIsAddingInstallment] = useState(false);

  const [paymentForm, setPaymentForm] = useState({ amount: "", mode: "upi", reference: "" });
  const [installmentContext, setInstallmentContext] = useState(null);

  const openPaymentModal = (installmentId = "") => {
    if (installmentId) {
      const instIdx = installments.findIndex((i) => i.id === installmentId);
      const inst = installments[instIdx];
      if (!inst) return;
      const remaining = inst.amount - inst.paid;
      setInstallmentContext({ label: `Installment ${instIdx + 1}`, remaining });
      setPaymentForm({ amount: String(remaining), mode: "upi", reference: "", installmentId });
    } else {
      setInstallmentContext(null);
      setPaymentForm({ amount: "", mode: "upi", reference: "", installmentId: "" });
    }
    setModalOpen(true);
  };

  const handlePlanCreated = () => {
    router.refresh();
    toast.success("Fee plan assigned");
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const amount = Number(paymentForm.amount);
    if (!amount || amount <= 0) { toast.error("Invalid amount"); return; }

    setIsSubmitting(true);
    try {
      const payment = await addStudentPayment(student.id, {
        amount,
        method: paymentForm.mode,
        note: paymentForm.reference || undefined,
      });

      const instNum = paymentForm.installmentId
        ? installments.findIndex((i) => i.id === paymentForm.installmentId) + 1
        : 0;

      setTransactions(prev => [{
        id: payment.id,
        date: formatDate(payment.createdAt),
        amount: payment.amount,
        mode: payment.method,
        allocatedTo: instNum > 0 ? `Installment ${instNum}` : "Auto",
      }, ...prev]);

      setModalOpen(false);
      router.refresh();
      toast.success("Payment recorded");
    } catch (err) {
      toast.error(err.message || "Failed to record payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddInstallment = async ({ amount, dueDate }) => {
    setIsAddingInstallment(true);
    try {
      const inst = await addFlexibleInstallment(student.id, { amount, dueDate });
      setInstallments(prev => [...prev, {
        id: inst.id,
        dueDate: formatDate(inst.dueDate),
        amount: inst.amountDue,
        paid: 0,
      }]);
      setInstallmentModalOpen(false);
      router.refresh();
      toast.success("Installment added");
    } catch (err) {
      toast.error(err.message || "Failed to add installment");
    } finally {
      setIsAddingInstallment(false);
    }
  };

  const scheduledTotal = installments.reduce((s, i) => s + i.amount, 0);
  const flexibleRemaining = plan ? (plan.total - scheduledTotal) : 0;

  const totalPaid = installments.reduce((s, i) => s + (i.paid ?? 0), 0);
  const isFullyPaid = !!plan && totalPaid >= plan.total;
  const isFlexibleNoExtraInstallments = plan?.type === "Flexible" && (
    installments.length === 0 ||
    (totalPaid >= scheduledTotal && flexibleRemaining > 0)
  );
  const addPaymentDisabled = !plan || isFullyPaid || isFlexibleNoExtraInstallments;

  return (
    <div className="space-y-6">

      <div className="flex justify-end">
        <button
          onClick={() => openPaymentModal()}
          disabled={addPaymentDisabled}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Payment
        </button>
      </div>

      <PlanSection plan={plan} onAssignPlan={() => setWizardOpen(true)} />

      <InstallmentsTable
        installments={installments}
        onPay={openPaymentModal}
        onAddInstallment={plan?.type === "Flexible" && flexibleRemaining > 0 ? () => setInstallmentModalOpen(true) : undefined}
        unscheduled={plan?.type === "Flexible" ? flexibleRemaining : 0}
      />

      <TransactionsTable transactions={transactions} />

      <AssignPlanWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        student={student}
        studentId={student.id}
        onPlanCreated={handlePlanCreated}
      />

      <AddInstallmentForm
        open={installmentModalOpen}
        onClose={() => setInstallmentModalOpen(false)}
        onSubmit={handleAddInstallment}
        remaining={flexibleRemaining}
        isSubmitting={isAddingInstallment}
      />

      <AddPaymentForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        installmentContext={installmentContext}
        isSubmitting={isSubmitting}
        paymentForm={paymentForm}
        setPaymentForm={setPaymentForm}
        onSubmit={handleSubmitPayment}
      />

    </div>
  );
}
