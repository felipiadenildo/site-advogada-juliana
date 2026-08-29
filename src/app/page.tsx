import Hero from '@/components/Hero';
import Differentials from '@/components/Differentials';
import Services from '@/components/Services';
import About from '@/components/About';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col bg-white font-sans focus:outline-none"
    >
      <Hero />
      <ScrollReveal>
        <Differentials />
      </ScrollReveal>
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Faq />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </main>
  );
}
