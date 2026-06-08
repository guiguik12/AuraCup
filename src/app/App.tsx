import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Menu } from './components/Menu';
import { Gallery } from './components/Gallery';
import { Feedback } from './components/Feedback';
import { Location } from './components/Location';
import { AttendantArea } from './components/AttendantArea';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { CartDrawer } from './components/CartDrawer';
import { useSection } from './context/SectionContext';

function AppContent() {
  const { activeSection } = useSection();

  useEffect(() => {
    globalThis.scrollTo(0, 0);
    if (globalThis.location.hash) {
      globalThis.history.replaceState(null, '', globalThis.location.pathname);
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        {activeSection === 'home' && <Home />}
        {activeSection === 'menu' && <Menu />}
        {activeSection === 'about' && <About />}
        {activeSection === 'gallery' && <Gallery />}
        {activeSection === 'feedback' && <Feedback />}
        {activeSection === 'location' && <Location />}
        {activeSection === 'attendant' && <AttendantArea />}
      </main>
      {activeSection !== 'home' && <Footer />}
      <BackToTop />
    </div>
  );
}

export default AppContent;
