"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Clock } from "lucide-react";

const OFFER_DURATION = 10 * 60; // 10 minutes in seconds

export function StickyCTABar({ whatsappHref }) {
  const [visible, setVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(OFFER_DURATION);
  const intervalRef = useRef(null);

  // Show bar after user scrolls 300px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Countdown — resets per session (no sessionStorage persistence)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? OFFER_DURATION : s - 1));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const expired = secondsLeft === OFFER_DURATION && false; // never truly expired, just resets

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#dc2626]/40 bg-[#111827] shadow-2xl shadow-black/20"
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
            {/* Left: offer text + timer */}
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#fca5a5]">
                Free Career Counseling
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                <Clock size={11} className="text-[#f97316]" />
                Offer ends in{" "}
                <span className="font-extrabold tabular-nums text-[#fdba74]">
                  {mins}:{secs}
                </span>
              </div>
            </div>

            {/* Right: WhatsApp CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 hover:bg-[#20b857] active:scale-95"
            >
              <MessageCircle size={14} />
              Claim Free Session
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
