import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { SITE } from "@/config/site";
import { toast } from "@/hooks/use-toast";

export type CartLine = { id: string; name: string; price: number; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: { id: string; name: string; price: number }, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  deliveryFee: (isDelivery: boolean) => number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartCtx>(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    return {
      lines,
      subtotal,
      count: lines.reduce((s, l) => s + l.qty, 0),
      add: (item, qty = 1) => {
        setLines((prev) => {
          const found = prev.find((l) => l.id === item.id);
          if (found) return prev.map((l) => (l.id === item.id ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { ...item, qty }];
        });
        toast({ title: "تمت الإضافة للطلب", description: item.name });
      },
      setQty: (id, qty) =>
        setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 50) } : l)))),
      clear: () => setLines([]),
      deliveryFee: (isDelivery) => {
        if (!isDelivery || subtotal === 0) return 0;
        if (SITE.freeDeliveryFrom > 0 && subtotal >= SITE.freeDeliveryFrom) return 0;
        return SITE.deliveryFee;
      },
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
