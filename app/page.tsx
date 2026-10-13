import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Footer } from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
      </main>
      <Footer />
    </>
  );
}
