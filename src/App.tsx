import Layout from './components/Layout';
import Hero from './components/Hero';
import Founders from './components/Founders';
import Programs from './components/Programs';
import Events from './components/Events';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FooterV2 from './components/FooterV2';

export default function App() {
  return (
    <Layout>
      <main className="relative z-10">
        <Hero />
        <Founders />
        <Programs />
        <Events />
        <Testimonials />

        {/* ── FooterV2: Novo estilo para comparação ── */}
        <FooterV2 />
      </main>
    </Layout>
  );
}
