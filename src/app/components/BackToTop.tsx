import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const visibility = () => {
    if (globalThis.window !== undefined && globalThis.window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const toTop = () => {
    if (globalThis.window !== undefined) {
      globalThis.window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    globalThis.window.addEventListener('scroll', visibility);
    return () => {
      globalThis.window.removeEventListener('scroll', visibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={toTop}
          className="fixed bottom-4 right-4 bg-[#5B3130]/90 hover:bg-[#4a2625] text-[#E3E3E3] p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 z-40 animate-bounce"
          aria-label="Voltar para o topo"
          title="Voltar para o topo"
        >
          <ChevronUp size={19} />
        </button>
      )}
    </>
  );
}
