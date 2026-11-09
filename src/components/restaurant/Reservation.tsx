import { FormEvent, useState } from "react";
import { AREAS, MAX_GUESTS, SITE, TABLES, TIME_SLOTS } from "@/config/site";
import { toast } from "@/hooks/use-toast";
import { Field, Reveal, SectionHeading, inputCls, isValidPhone } from "./ui-bits";

const EMPTY = { name: "", phone: "", guests: "2", date: "", time: "", area: AREAS[0], notes: "" };

export default function Reservation() {
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (f.name.trim().length < 2) err.name = "من فضلك أدخل اسمك.";
    if (!isValidPhone(f.phone)) err.phone = "أدخل رقم هاتف مصري صحيح، مثال: 01001234567";
    if (!f.date) err.date = "اختر تاريخ الحجز.";
    else if (f.date < today) err.date = "اختر تاريخاً لم يمر بعد.";
    if (!f.time) err.time = "اختر وقت الحجز.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      const { error } = await window.ezsite.apis.tableCreate(TABLES.reservations, {
        customer_name: f.name.trim(), phone: f.phone.trim(), guests: Number(f.guests),
        reservation_date: f.date, reservation_time: f.time, area: f.area, notes: f.notes.trim(),
      });
      if (error) throw new Error(String(error));
      setDone(true);
      setF(EMPTY);
    } catch (ex) {
      console.error(ex);
      toast({ title: "تعذّر إرسال الحجز", description: "حاول مرة أخرى أو تواصل معنا على واتساب.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="pattern-dots py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading eyebrow="الحجز" title="احجز طاولتك" text="اختر المكان والموعد المناسبين، وإحنا نجهّز لك كل حاجة." />
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            {done ? (
              <div role="status" className="rounded-3xl border border-gold/40 bg-white p-10 text-center shadow-xl">
                <p className="font-display text-3xl font-bold text-wine">تم استلام طلب الحجز بنجاح ❤️</p>
                <p className="mt-4 text-lg text-char/75">سيتواصل معك فريق {SITE.name} لتأكيد الحجز.</p>
                <button onClick={() => setDone(false)} className="mt-6 rounded-full bg-char px-8 py-3 font-bold text-cream hover:bg-wine">حجز جديد</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl border border-gold/30 bg-white p-6 shadow-xl sm:grid-cols-2 md:p-8">
                <Field label="الاسم" error={errors.name}><input className={inputCls} value={f.name} onChange={set("name")} autoComplete="name" /></Field>
                <Field label="رقم الهاتف" error={errors.phone}><input className={inputCls} dir="ltr" inputMode="tel" value={f.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" autoComplete="tel" /></Field>
                <Field label="عدد الأشخاص">
                  <select className={inputCls} value={f.guests} onChange={set("guests")}>
                    {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? "شخص" : "أشخاص"}</option>)}
                  </select>
                </Field>
                <Field label="اختيار المكان">
                  <select className={inputCls} value={f.area} onChange={set("area")}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select>
                </Field>
                <Field label="التاريخ" error={errors.date}><input type="date" min={today} className={inputCls} value={f.date} onChange={set("date")} /></Field>
                <Field label="الوقت" error={errors.time}>
                  <select className={inputCls} value={f.time} onChange={set("time")}>
                    <option value="">اختر الوقت</option>
                    {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2"><Field label="ملاحظات (اختياري)"><textarea rows={2} className={inputCls} value={f.notes} onChange={set("notes")} placeholder="مناسبة خاصة، كرسي أطفال..." /></Field></div>
                <button disabled={loading} className="rounded-full bg-wine py-4 text-lg font-bold text-cream transition hover:bg-char disabled:opacity-60 sm:col-span-2">{loading ? "جاري الإرسال..." : "تأكيد الحجز"}</button>
                <p className="text-center text-xs text-char/55 sm:col-span-2">نستخدم بياناتك فقط لتأكيد حجزك والتواصل معك بخصوصه.</p>
              </form>
            )}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-3xl bg-char p-8 text-cream">
              <p className="font-display text-2xl text-gold">ملاحظة مهمة</p>
              <p className="mt-3 text-lg leading-loose">يفضل الحجز قبل الموعد بوقت كافٍ لضمان توفر الطاولة.</p>
              <ul className="mt-6 space-y-3 text-cream/80">
                {AREAS.map((a) => <li key={a} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-gold" />{a}</li>)}
              </ul>
              <p className="mt-6 border-t border-cream/15 pt-5 text-cream/70">للمجموعات الكبيرة اتصل بنا: <a href={`tel:${SITE.phoneTel}`} dir="ltr" className="font-bold text-gold">{SITE.phoneDisplay}</a></p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
