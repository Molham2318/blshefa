import { ABOUT, SITE } from "@/config/site";
import { Reveal } from "./ui-bits";

export default function About() {
  return (
    <section id="about" className="pattern-dots relative py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={ABOUT.image} alt="صالة مطعم دار النكهة من الداخل" loading="lazy" width={900} height={650} className="aspect-[4/3] w-full rounded-t-[8rem] rounded-b-2xl object-cover shadow-2xl" />
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-wine px-6 py-4 text-cream shadow-xl md:block">
            <p className="font-display text-3xl text-gold">{SITE.stats[0].value}</p>
            <p className="text-sm">{SITE.stats[0].label}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-3 font-display text-lg text-wine">من نحن</p>
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">حكاية طعم بدأت من مطبخ مصري أصيل</h2>
          <p className="mt-6 text-lg leading-loose text-char/75">{ABOUT.text}</p>
          <dl className="mt-10 grid grid-cols-2 gap-4">
            {SITE.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-gold/30 bg-white p-5 text-center">
                <dd className="font-display text-3xl font-bold text-wine">{s.value}</dd>
                <dt className="mt-1 text-sm text-char/70">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
