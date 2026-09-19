import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Screens } from '@/components/sections/Screens';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Screens />
      </main>
    </>
  );
}
