import { FormEvent, useState } from "react";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SITE, TABLES, formatPrice } from "@/config/site";
import { useCart } from "@/context/cart";
import { toast } from "@/hooks/use-toast";
import { Field, SectionHeading, inputCls, isValidPhone } from "./ui-bits";

type Errors = Partial<Record<"name" | "phone" | "address" | "cart", string>>;

export default function Order() {
  const { lines, subtotal, setQty, clear, deliveryFee } = useCart();
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState("cash");
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ total: number; name: string } | null>(null);

  const fee = deliveryFee(mode === "delivery");
  const total = subtotal + fee;
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (lines.length === 0) err.cart = "أضف أطباقاً إلى الطلب أولاً.";
    if (form.name.trim().length < 2) err.name = "من فضلك أدخل اسمك.";
    if (!isValidPhone(form.phone)) err.phone = "أدخل رقم هاتف مصري صحيح، مثال: 01001234567";
    if (mode === "delivery" && form.address.trim().length < 6) err.address = "من فضلك أدخل عنوان التوصيل بالتفصيل.";
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    try {
      const { error } = await window.ezsite.apis.tableCreate(TABLES.orders, {
        customer_name: form.name.trim(),
        phone: form.phone.trim(),
        order_type: mode === "delivery" ? "توصيل" : "استلام من المطعم",
        address: mode === "delivery" ? form.address.trim() : "",
        notes: form.notes.trim(),
        payment_method: payment === "cash" ? "الدفع عند الاستلام" : "الدفع أونلاين",
        items: lines.map((l) => `${l.name} × ${l.qty} (${l.price * l.qty})`).join(" | "),
        subtotal,
        delivery_fee: fee,
        total,
      });
      if (error) throw new Error(String(error));
      setDone({ total, name: form.name.trim() });
      clear();
      setForm({ name: "", phone: "", address: "", notes: "" });
    } catch (ex) {
      console.error(ex);
      toast({ title: "تعذّر إرسال الطلب", description: "حاول مرة أخرى أو تواصل معنا على واتساب.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order" className="bg-gradient-to-b from-char to-wine py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading light eyebrow="الطلب أونلاين" title="اطلب الآن" text="راجع طلبك، أدخل بياناتك، ونوصّله لك سخن أو جهّزه لك للاستلام." />
        {done ? (
          <div role="status" className="mx-auto max-w-xl rounded-3xl bg-cream p-10 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-16 w-16 text-wine" />
            <h3 className="mt-4 font-display text-3xl font-bold">تم استلام طلبك بنجاح</h3>
            <p className="mt-3 text-lg leading-relaxed text-char/75">شكراً يا {done.name}! هيتواصل معاك فريق {SITE.name} قريباً لتأكيد الطلب. الإجمالي: <strong className="text-wine">{formatPrice(done.total)}</strong></p>
            <button onClick={() => setDone(null)} className="mt-6 rounded-full bg-char px-8 py-3 font-bold text-cream hover:bg-wine">طلب جديد</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-3xl bg-cream p-6 shadow-2xl lg:col-span-2">
              <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold"><ShoppingBag className="text-wine" /> سلة الطلب</h3>
              {lines.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-char/25 p-8 text-center">
                  <p className="text-char/70">السلة فارغة. اختر أطباقك من المنيو.</p>
                  <a href="#menu" className="mt-4 inline-block rounded-full bg-char px-6 py-2.5 font-bold text-cream hover:bg-wine">تصفح المنيو</a>
                </div>
              ) : (
                <ul className="divide-y divide-char/10">
                  {lines.map((l) => (
                    <li key={l.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold">{l.name}</p>
                        <p className="text-sm text-char/60">{formatPrice(l.price)}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label={l.qty === 1 ? "حذف" : "تقليل الكمية"} className="flex h-8 w-8 items-center justify-center rounded-full border border-char/20 hover:border-wine hover:text-wine">
                          {l.qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                        </button>
                        <span className="w-6 text-center font-bold" aria-live="polite">{l.qty}</span>
                        <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label="زيادة الكمية" className="flex h-8 w-8 items-center justify-center rounded-full border border-char/20 hover:border-wine hover:text-wine"><Plus size={14} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {errors.cart && <p role="alert" className="mt-2 text-sm text-wine">{errors.cart}</p>}
              <dl className="mt-5 space-y-2 border-t border-char/15 pt-4">
                <div className="flex justify-between"><dt>المجموع الفرعي</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt>رسوم التوصيل</dt><dd>{mode === "pickup" ? "—" : fee === 0 && subtotal > 0 ? "مجاناً" : formatPrice(fee)}</dd></div>
                <div className="flex justify-between border-t border-char/15 pt-3 font-display text-xl font-bold text-wine"><dt>الإجمالي</dt><dd>{formatPrice(total)}</dd></div>
              </dl>
              {SITE.freeDeliveryFrom > 0 && <p className="mt-3 text-sm text-char/60">توصيل مجاني للطلبات من {formatPrice(SITE.freeDeliveryFrom)}.</p>}
            </div>

            <div className="space-y-4 rounded-3xl bg-cream p-6 shadow-2xl lg:col-span-3">
              <h3 className="font-display text-2xl font-bold">بيانات الطلب</h3>
              <div role="radiogroup" aria-label="طريقة الاستلام" className="grid grid-cols-2 gap-3">
                {([["delivery", "🛵 توصيل"], ["pickup", "🏪 استلام من المطعم"]] as const).map(([v, t]) => (
                  <button key={v} type="button" role="radio" aria-checked={mode === v} onClick={() => setMode(v)} className={`rounded-xl border-2 py-3 font-bold transition ${mode === v ? "border-wine bg-wine text-cream" : "border-char/15 hover:border-gold"}`}>{t}</button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="الاسم" error={errors.name}><input className={inputCls} value={form.name} onChange={set("name")} autoComplete="name" placeholder="اسمك الكريم" /></Field>
                <Field label="رقم الهاتف" error={errors.phone}><input className={inputCls} dir="ltr" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="01XXXXXXXXX" /></Field>
              </div>
              {mode === "delivery" && (
                <Field label="العنوان" error={errors.address}><input className={inputCls} value={form.address} onChange={set("address")} autoComplete="street-address" placeholder="الشارع، المبنى، الدور، الشقة" /></Field>
              )}
              <Field label="ملاحظات (اختياري)"><textarea className={inputCls} rows={2} value={form.notes} onChange={set("notes")} placeholder="مثال: بدون بصل" /></Field>
              <fieldset>
                <legend className="mb-1.5 text-sm font-bold">طريقة الدفع</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {([["cash", "الدفع عند الاستلام"], ["online", "الدفع أونلاين"]] as const).map(([v, t]) => (
                    <label key={v} className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${payment === v ? "border-gold bg-gold/10" : "border-char/15"}`}>
                      <input type="radio" name="payment" checked={payment === v} onChange={() => setPayment(v)} className="accent-wine" />
                      <span className="font-medium">{t}</span>
                    </label>
                  ))}
                </div>
                {payment === "online" && <p className="mt-2 text-sm text-char/60">سيرسل لك فريقنا رابط الدفع الآمن بعد تأكيد الطلب.</p>}
              </fieldset>
              <button disabled={loading} className="w-full rounded-full bg-wine py-4 text-lg font-bold text-cream transition hover:bg-char disabled:opacity-60">
                {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
              </button>
              <p className="text-center text-xs text-char/55">نستخدم بياناتك فقط لتنفيذ طلبك والتواصل معك بخصوصه.</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
