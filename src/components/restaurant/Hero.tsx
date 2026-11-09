import { SITE } from "@/config/site";

const INFO = ["⭐ تقييم 4.9/5", "🍽️ أكثر من 10,000 عميل", "🔥 أطباق طازجة يومياً"];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-char">
      <img
        src={SITE.heroImage}
        alt="مشويات مصرية على الفحم في دار النكهة"
        fetchPriority="high"
        width={1400}
        height={933}
        className="kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-char/95 via-char/70 to-char/30" />
      <div className="glow-pulse pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgb(var(--brand-gold) / 0.35), transparent 65%)" }} />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 md:px-6">
        <div className="rise max-w-2xl">
          <p className="mb-4 inline-block rounded-full border border-gold/50 px-4 py-1.5 font-display text-gold">{SITE.tagline}</p>
          <h1 className="font-display text-4xl font-bold leading-[1.25] text-cream md:text-6xl lg:text-7xl">
            أهلاً بك في <span className="text-gold">{SITE.name}</span>
          </h1>
          <p className="mt-6 text-lg leading-loose text-cream/85 md:text-xl">
            نكهات مصرية أصيلة بلمسة عصرية، محضّرة بحب لتعيش تجربة مختلفة في كل زيارة.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#menu" className="rounded-full bg-gold px-8 py-3.5 text-lg font-bold text-char transition hover:-translate-y-0.5 hover:bg-cream">
              استكشف المنيو
            </a>
            <a href="#reservation" className="rounded-full border-2 border-cream/60 px-8 py-3.5 text-lg font-bold text-cream transition hover:-translate-y-0.5 hover:border-gold hover:text-gold">
              احجز طاولتك
            </a>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/15 pt-6 text-cream/90">
            {INFO.map((i) => (
              <li key={i} className="text-base font-medium">{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
