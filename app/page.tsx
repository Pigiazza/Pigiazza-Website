import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Screens } from '@/components/sections/Screens';
import { Team } from '@/components/sections/Team';
import { About } from '@/components/sections/About';
import { Commissions } from '@/components/sections/Commissions';
import { Footer } from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Screens />
        <Team />
        <About />
        <Commissions />
      </main>
      <Footer />
    </>
  );
}
