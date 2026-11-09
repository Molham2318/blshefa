import { useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES, MENU, formatPrice } from "@/config/site";
import { useCart } from "@/context/cart";
import { Reveal, SectionHeading } from "./ui-bits";

const PREVIEW_COUNT = 6;

export default function Menu() {
  const [cat, setCat] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const { add } = useCart();

  const filtered = cat === "all" ? MENU : MENU.filter((m) => m.category === cat);
  const visible = cat === "all" && !showAll ? filtered.slice(0, PREVIEW_COUNT) : filtered;

  return (
    <section id="menu" className="bg-char py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading light eyebrow="المنيو" title="أطباق تحكي قصة" text="اختر من تشكيلتنا المحضّرة يومياً بأجود المكونات، وأضف ما يعجبك لطلبك مباشرة." />
        <div role="tablist" aria-label="أقسام المنيو" className="mb-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center">
          {[{ id: "all", label: "الكل" }, ...CATEGORIES].map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-full border px-5 py-2 font-medium transition ${cat === c.id ? "border-gold bg-gold text-char" : "border-cream/25 text-cream/80 hover:border-gold hover:text-gold"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" width={600} height={420} className="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-char">{m.name}</h3>
                    <span className="shrink-0 rounded-full bg-wine px-3 py-1 text-sm font-bold text-gold">{formatPrice(m.price)}</span>
                  </div>
                  <p className="mt-2 flex-1 leading-relaxed text-char/70">{m.description}</p>
                  <button onClick={() => add({ id: m.id, name: m.name, price: m.price })} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-char py-3 font-bold text-cream transition hover:bg-wine">
                    <Plus size={18} /> أضف للطلب
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {cat === "all" && !showAll && MENU.length > PREVIEW_COUNT && (
          <div className="mt-12 text-center">
            <button onClick={() => setShowAll(true)} className="rounded-full border-2 border-gold px-9 py-3.5 text-lg font-bold text-gold transition hover:bg-gold hover:text-char">
              عرض المنيو بالكامل
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
