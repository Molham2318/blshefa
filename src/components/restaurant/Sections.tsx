import { useEffect, useState } from "react";
import { Clock, MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Star, X } from "lucide-react";
import { CHEF, FEATURES, GALLERY, NAV_LINKS, OFFERS, REVIEWS, SITE, formatPrice } from "@/config/site";
import { useCart } from "@/context/cart";
import { Reveal, SectionHeading } from "./ui-bits";
import { Logo } from "./Navbar";

export function Offers() {
  const { add } = useCart();
  return (
    <section id="offers" className="bg-char py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading light eyebrow="العروض" title="عروض مميزة" text="وجبات متكاملة بسعر أوفر، مناسبة للعائلة والأصدقاء." />
        <div className="grid gap-6 md:grid-cols-2">
          {OFFERS.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-gold/40 bg-wine">
                <img src={o.image} alt={o.title} loading="lazy" width={900} height={500} className="aspect-[16/9] w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" />
                <span className="absolute right-4 top-4 rounded-full bg-gold px-4 py-1 text-sm font-bold text-char">{o.badge}</span>
                <div className="relative p-6 md:p-8">
                  <h3 className="font-display text-3xl font-bold text-cream">{o.title}</h3>
                  <p className="mt-2 text-lg text-cream/80">{o.description}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <p className="flex items-baseline gap-3">
                      <span className="font-display text-4xl font-bold text-gold">{formatPrice(o.price)}</span>
                      {o.oldPrice && <s className="text-lg text-cream/55">{formatPrice(o.oldPrice)}</s>}
                    </p>
                    <button onClick={() => add({ id: o.id, name: o.title.replace(/[^؀-ۿ\s]/g, "").trim(), price: o.price })} className="rounded-full bg-gold px-7 py-3 font-bold text-char transition hover:bg-cream">{o.button}</button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Chef() {
  return (
    <section id="chef" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <Reveal delay={0.1} className="order-2 lg:order-1">
          <p className="mb-3 font-display text-lg text-wine">شيف الدار</p>
          <h2 className="font-display text-3xl font-bold md:text-5xl">{CHEF.name}</h2>
          <p className="mt-6 text-lg leading-loose text-char/75">{CHEF.description}</p>
          <a href="#menu" className="mt-8 inline-block rounded-full bg-wine px-8 py-3.5 font-bold text-cream transition hover:bg-char">جرّب أطباق الشيف</a>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 rounded-[2rem] border-2 border-gold/60" />
            <img src={CHEF.image} alt={CHEF.name} loading="lazy" width={800} height={1000} className="relative aspect-[4/5] w-full rounded-[1.6rem] object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow="لماذا نحن" title="لماذا دار النكهة؟" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-gold/30 bg-cream p-7 text-center transition hover:-translate-y-1 hover:border-gold hover:shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-wine text-3xl" aria-hidden>{f.icon}</div>
                <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-char/70">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const Stars = () => (
  <div className="flex gap-0.5 text-gold" role="img" aria-label="5 من 5 نجوم">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={18} fill="currentColor" />)}
  </div>
);

export function Reviews() {
  return (
    <section id="reviews" className="bg-wine py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading light eyebrow="آراء العملاء" title="ضيوفنا يتحدثون" />
        <div className="mb-10 text-center text-cream">
          <p className="font-display text-6xl font-bold text-gold">{SITE.rating.score} <span className="text-3xl text-cream/70">/ {SITE.rating.outOf}</span></p>
          <div className="mt-2 flex justify-center"><Stars /></div>
          <p className="mt-2 text-cream/80">بناءً على {SITE.rating.count} تقييم</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="h-full rounded-2xl bg-cream p-7">
                <Stars />
                <blockquote className="mt-4 text-lg leading-loose">“{r.text}”</blockquote>
                <figcaption className="mt-5 font-display text-lg font-bold text-wine">— {r.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + GALLERY.length - 1) % GALLERY.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o + 1) % GALLERY.length));
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open]);

  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading eyebrow="معرض الصور" title="لقطات من دار النكهة" />
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <button key={g.src} onClick={() => setOpen(i)} aria-label={`تكبير الصورة: ${g.alt}`} className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid">
              <img src={g.src} alt={g.alt} loading="lazy" width={700} height={g.tall ? 900 : 600} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-char/85 to-transparent p-3 text-sm text-cream opacity-0 transition group-hover:opacity-100">{g.alt}</span>
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={GALLERY[open].alt} onClick={() => setOpen(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-char/95 p-4">
          <button onClick={() => setOpen(null)} autoFocus aria-label="إغلاق" className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-gold hover:text-char"><X /></button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full">
            <img src={GALLERY[open].src.replace("w=700", "w=1400")} alt={GALLERY[open].alt} className="max-h-[80vh] rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-cream">{GALLERY[open].alt}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

export function Visit() {
  return (
    <section id="visit" className="bg-char py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 font-display text-lg text-gold">زورنا</p>
          <h2 className="font-display text-3xl font-bold text-cream md:text-5xl">في انتظارك في دار النكهة</h2>
          <div className="mt-8 space-y-6 text-cream/85">
            <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-gold" /><p className="text-lg">{SITE.address}</p></div>
            <div className="flex gap-4"><Clock className="mt-1 shrink-0 text-gold" />
              <div className="space-y-3">{SITE.hours.map((h) => <p key={h.days}><strong className="block text-cream">{h.days}</strong>{h.time}</p>)}</div>
            </div>
          </div>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 font-bold text-char transition hover:bg-cream">احصل على الاتجاهات</a>
        </Reveal>
        <Reveal delay={0.1}>
          <iframe title="موقع دار النكهة على الخريطة" src={SITE.mapsEmbed} loading="lazy" className="h-80 w-full rounded-3xl border-0 lg:h-full lg:min-h-[360px]" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
      </div>
    </section>
  );
}

const TikTok = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 5 5.7V9a7.3 7.3 0 0 0 4.2 1.3V7.2a4.3 4.3 0 0 1-3.2-1.4z" /></svg>
);

export function Socials({ className = "" }: { className?: string }) {
  const items = [
    { href: SITE.social.facebook, label: "فيسبوك", icon: <Facebook size={20} /> },
    { href: SITE.social.instagram, label: "إنستجرام", icon: <Instagram size={20} /> },
    { href: SITE.social.tiktok, label: "تيك توك", icon: <TikTok /> },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition hover:bg-gold hover:text-char">{s.icon}</a>
      ))}
    </div>
  );
}

export function Contact() {
  const rows = [
    { icon: <Phone />, label: "الهاتف", value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
    { icon: <MessageCircle />, label: "واتساب", value: SITE.whatsappDisplay, href: `https://wa.me/${SITE.whatsapp}` },
    { icon: <Mail />, label: "البريد الإلكتروني", value: SITE.email, href: `mailto:${SITE.email}` },
  ];
  return (
    <section id="contact" className="pattern-dots py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading eyebrow="تواصل معنا" title="يسعدنا سماعك" text="للاستفسارات والحجوزات والطلبات الخاصة، تواصل معنا بالطريقة الأنسب لك." />
        <div className="grid gap-4 md:grid-cols-3">
          {rows.map((r) => (
            <a key={r.label} href={r.href} className="rounded-2xl border border-gold/30 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-gold hover:shadow-xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-wine text-gold">{r.icon}</span>
              <p className="mt-3 text-sm text-char/60">{r.label}</p>
              <p className="mt-1 break-all font-bold" dir="ltr">{r.value}</p>
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-6">
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1FA855] px-10 py-5 text-xl font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#178a45] sm:w-auto">
            <MessageCircle /> تواصل معنا على واتساب
          </a>
          <Socials />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const links = NAV_LINKS.filter((l) => ["#home", "#menu", "#reservation", "#offers", "#contact"].includes(l.href));
  return (
    <footer className="bg-char pt-16 text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 font-display text-lg text-gold">{SITE.tagline}</p>
          <Socials className="mt-5" />
        </div>
        <nav aria-label="روابط سريعة">
          <h3 className="mb-4 font-display text-xl text-cream">روابط سريعة</h3>
          <ul className="space-y-2">{links.map((l) => <li key={l.href}><a href={l.href} className="hover:text-gold">{l.label}</a></li>)}</ul>
        </nav>
        <div>
          <h3 className="mb-4 font-display text-xl text-cream">ساعات العمل</h3>
          {SITE.hours.map((h) => <p key={h.days} className="mb-2"><strong className="block text-cream/95">{h.days}</strong>{h.time}</p>)}
        </div>
        <div>
          <h3 className="mb-4 font-display text-xl text-cream">اتصل بنا</h3>
          <a href={`tel:${SITE.phoneTel}`} dir="ltr" className="block text-lg font-bold text-gold text-right">{SITE.phoneDisplay}</a>
          <p className="mt-3">{SITE.address}</p>
        </div>
      </div>
      <p className="mt-14 border-t border-cream/10 py-6 text-center text-sm text-cream/60">{SITE.copyright}</p>
    </footer>
  );
}
