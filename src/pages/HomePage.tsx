import Seo from "@/components/seo";
import { SITE } from "@/config/site";
import { CartProvider } from "@/context/cart";
import Navbar from "@/components/restaurant/Navbar";
import Hero from "@/components/restaurant/Hero";
import About from "@/components/restaurant/About";
import Menu from "@/components/restaurant/Menu";
import Order from "@/components/restaurant/Order";
import Reservation from "@/components/restaurant/Reservation";
import { Offers, Chef, Why, Reviews, Gallery, Visit, Contact, Footer } from "@/components/restaurant/Sections";

export default function HomePage() {
  return (
    <CartProvider>
      <Seo title={SITE.title} description={SITE.description} image={SITE.heroImage} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Offers />
        <Order />
        <Reservation />
        <Chef />
        <Why />
        <Reviews />
        <Gallery />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </CartProvider>
  );
}
