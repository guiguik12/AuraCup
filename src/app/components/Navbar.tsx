import CardNav from './CardNav';
import { type Section, useSection } from '../context/SectionContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../../i18n/LanguageContext';

export function Navbar() {
  const { setActiveSection } = useSection();
  const { cartItemCount, openCart } = useCart();
  const { t, lang, setLang } = useLanguage();

  const handleNavigation = (section: string) => {
    setActiveSection(section as Section);
  };

  const navItems = [
    {
      label: t('nav.menu'),
      bgColor: '#5B3130',
      textColor: '#E3E3E3',
      links: [
        {
          label: t('nav.coffee'),
          onClick: () => handleNavigation('menu'),
          ariaLabel: t('nav.coffee'),
        },
      ],
    },
    {
      label: t('nav.about'),
      bgColor: '#5B3130',
      textColor: '#E3E3E3',
      links: [
        {
          label: t('nav.history'),
          onClick: () => handleNavigation('about'),
          ariaLabel: t('nav.history'),
        },
        {
          label: t('nav.gallery'),
          onClick: () => handleNavigation('gallery'),
          ariaLabel: t('nav.gallery'),
        },
      ],
    },
    {
      label: t('nav.contacts'),
      bgColor: '#5B3130',
      textColor: '#E3E3E3',
      links: [
        {
          label: t('nav.location'),
          onClick: () => handleNavigation('location'),
          ariaLabel: t('nav.location'),
        },
        {
          label: t('nav.feedback'),
          onClick: () => handleNavigation('feedback'),
          ariaLabel: t('nav.feedback'),
        },
        {
          label: t('nav.attendant'),
          onClick: () => handleNavigation('attendant'),
          ariaLabel: t('nav.attendant'),
        },
      ],
    },
  ];

  return (
    <CardNav
      logo="aura cup"
      items={navItems}
      baseColor="#E3E3E3"
      menuColor="#5B3130"
      buttonTextColor="#5B3130"
      ease="circ.out"
      className="fixed top-0 left-0 right-0 w-full max-w-none z-50"
      onLogoClick={() => handleNavigation('home')}
      lang={lang}
      onToggleLang={() => setLang(lang === 'en' ? 'pt-br' : 'en')}
      langLabel={lang === 'en' ? t('lang.pt-br') : t('lang.en')}
      cartCount={cartItemCount}
      onCartClick={openCart}
      cartLabel={t('nav.cart')}
    />
  );
}
