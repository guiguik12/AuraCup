import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export type Section =
  | 'home'
  | 'menu'
  | 'about'
  | 'gallery'
  | 'feedback'
  | 'location'
  | 'attendant';

interface SectionContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const value = useMemo(
    () => ({ activeSection, setActiveSection }),
    [activeSection]
  );
  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used inside a SectionProvider');
  }
  return context;
}
