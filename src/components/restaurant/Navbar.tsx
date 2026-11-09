import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { NAV_LINKS, SITE } from "@/config/site";
import { useCart } from "@/context/cart";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label={SITE.name}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-wine font-display text-xl text-gold">د</span>
      <span className={`font-display text-2xl font-bold ${light ? "text-cream" : "text-char"}`}>{SITE.name}</span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "bg-char/95 shadow-lg backdrop-blur" : "bg-gradient-to-b from-char/80 to-transparent"}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label="القائمة الرئيسية" className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="relative text-[15px] font-medium text-cream/85 transition hover:text-gold">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#order" aria-label={`سلة الطلب (${count})`} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-gold hover:text-gold">
            <ShoppingBag size={18} />
            {count > 0 && <span className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-char">{count}</span>}
          </a>
          <a href="#reservation" className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-char transition hover:bg-cream sm:block">
            احجز طاولتك
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="فتح القائمة" className="flex h-10 w-10 items-center justify-center rounded-full text-cream xl:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="قائمة الجوال" className="border-t border-cream/10 bg-char px-4 pb-6 pt-2 xl:hidden">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-cream/10 py-3 text-lg text-cream/90 hover:text-gold">
              {l.label}
            </a>
          ))}
          <a href="#reservation" onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-gold py-3 text-center font-bold text-char">
            احجز طاولتك
          </a>
        </nav>
      )}
    </header>
  );
}
