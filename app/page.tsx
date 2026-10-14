import { Header } from '@/components/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
