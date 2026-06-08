import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  HamburgerMenuIcon,
  Cross2Icon,
  ArrowTopRightIcon,
} from '@radix-ui/react-icons';
import { ShoppingCart, Globe } from 'lucide-react';

type CardNavLink = {
  label: string;
  href?: string;
  onClick?: () => void;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  onLogoClick?: () => void;
  lang?: string;
  onToggleLang?: () => void;
  langLabel?: string;
  cartCount?: number;
  onCartClick?: () => void;
  cartLabel?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  items,
  className = '',
  ease = 'circ.out',
  baseColor = '#fff',
  menuColor,
  buttonTextColor,
  onLogoClick,
  lang,
  onToggleLang,
  langLabel,
  cartCount = 0,
  onCartClick,
  cartLabel = 'Shopping cart',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = globalThis.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      '-=0.1'
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const closeMenu = () => {
    const tl = tlRef.current;
    if (!tl || !isExpanded) return;

    tl.reverse();

    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (isExpanded) {
      closeMenu();
    } else {
      setIsExpanded(true);
      tl.play(0);
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[50%] max-w-[500px] z-[99] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[70px] p-0 shadow-md relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1rem] pr-[1rem] z-[2]">
          <button
            className={`hamburger-menu group h-full flex items-center justify-center cursor-pointer transition-opacity duration-300`}
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            style={{ color: menuColor || '#000' }}
          >
            {isExpanded ? (
              <Cross2Icon
                className="w-6 h-6 group-hover:opacity-85"
                aria-hidden="true"
              />
            ) : (
              <HamburgerMenuIcon
                className="w-6 h-6 group-hover:opacity-85"
                aria-hidden="true"
              />
            )}
          </button>

          <div
            className="logo-container flex items-center gap-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 cursor-pointer"
            onClick={onLogoClick}
          >
            <img src={logo} alt={''} className="logo h-[28px]" />
            <span
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: menuColor || '#000' }}
            >
              {logo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleLang && langLabel && (
              <button
                type="button"
                className="lang-toggle inline-flex items-center gap-1 h-10 px-3 rounded-full cursor-pointer transition-colors duration-300 hover:opacity-75 text-xs font-semibold"
                style={{ color: buttonTextColor }}
                onClick={onToggleLang}
                aria-label={`Switch to ${lang === 'en' ? 'Portuguese' : 'English'}`}
              >
                <Globe className="w-4 h-4" />
                {langLabel}
              </button>
            )}
            <button
              type="button"
              className="cart-button relative inline-flex h-10 items-center justify-center cursor-pointer transition-colors duration-300 hover:opacity-75"
              style={{ color: buttonTextColor }}
              onClick={onCartClick}
              aria-label={cartLabel}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C9A84C] px-1 font-['Inter'] text-[11px] font-bold text-[#2C1A0E]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded
              ? 'visible pointer-events-auto'
              : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[10px_15px] rounded-2xl min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={lnk.href || '#'}
                    onClick={e => {
                      if (lnk.onClick) {
                        e.preventDefault();
                        setIsExpanded(false);
                        lnk.onClick();
                        const tl = tlRef.current;
                        if (tl) {
                          tl.reverse();
                        }
                      }
                    }}
                    aria-label={lnk.ariaLabel}
                  >
                    <ArrowTopRightIcon
                      className="nav-card-link-icon shrink-0"
                      aria-hidden="true"
                    />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
