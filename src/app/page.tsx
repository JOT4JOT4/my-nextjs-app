import Image from "next/image";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import Services from "../components/services";
import Stats from "../components/stats";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MenuSection />
        <Services />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
