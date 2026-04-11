"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { mockStudentsLedger } from "./mockData";

const FeeContext = createContext();

export function FeeProvider({ children }) {
  const [students, setStudents] = useState(mockStudentsLedger);

  const addStudent = useCallback((newStudent) => {
    setStudents((prev) => [
      ...prev,
      {
        ...newStudent,
        id: Math.floor(Math.random() * 10000).toString(),
        balance: newStudent.total - newStudent.paid,
        status: newStudent.paid >= newStudent.total ? "Full Paid" : (newStudent.paid > 0 ? "Partially Paid" : "Pending"),
        lastPayment: new Date().toISOString().split("T")[0],
      },
    ]);
  }, []);

  const addPayment = useCallback((studentId, amount) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newPaid = s.paid + amount;
          const newBalance = Math.max(0, s.total - newPaid);
          return {
            ...s,
            paid: newPaid,
            balance: newBalance,
            status: newPaid >= s.total ? "Full Paid" : "Partially Paid",
            lastPayment: new Date().toISOString().split("T")[0],
          };
        }
        return s;
      })
    );
  }, []);

  const getStudent = useCallback((id) => {
    return students.find((s) => s.id === id);
  }, [students]);

  return (
    <FeeContext.Provider value={{ students, addStudent, addPayment, getStudent }}>
      {children}
    </FeeContext.Provider>
  );
}

export function useFees() {
  const context = useContext(FeeContext);
  if (!context) {
    throw new Error("useFees must be used within a FeeProvider");
  }
  return context;
}
