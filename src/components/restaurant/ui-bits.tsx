import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, text, light }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="mb-3 flex items-center justify-center gap-3 text-gold">
        <span className="h-px w-10 bg-gold/60" />
        <span className="font-display text-lg">{eyebrow}</span>
        <span className="h-px w-10 bg-gold/60" />
      </div>
      <h2 className={`font-display text-3xl font-bold leading-tight md:text-5xl ${light ? "text-cream" : "text-char"}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-cream/70" : "text-char/70"}`}>{text}</p>}
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-char/15 bg-white px-4 py-3 text-char placeholder:text-char/40 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-char">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-sm text-wine">{error}</span>}
    </label>
  );
}

export const isValidPhone = (p: string) => /^(\+?20|0)?1[0-25]\d{8}$/.test(p.replace(/[\s-]/g, ""));
