import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import Plasma from './Plasma';
import { useSection } from '../context/SectionContext';
import { useLanguage } from '../../i18n/LanguageContext';

export function Footer() {
  const { setActiveSection } = useSection();
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-[#E3E3E3] py-16 relative">
      <div className="absolute inset-0 h-full w-full">
        <Plasma
          color="#5B3130"
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={false}
        />
      </div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 mb-4">
          <div className="flex flex-col justify-center items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-1">
              <span className="font-['Inter'] text-2xl text-[#E3E3E3]">
                AURA CUP
              </span>
              <span className="text-sm text-[#E3E3E3]/50">
                {t('footer.coffeeShop')}
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-2 text-lg">
              <ul className="space-x-4 flex flex-wrap justify-center md:justify-start">
                <li>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setActiveSection('home');
                    }}
                    className="font-['Inter'] text-[#E3E3E3] hover:text-[#6E6C68] transition-colors duration-300 text-sm border-none cursor-pointer"
                  >
                    {t('footer.home')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setActiveSection('menu');
                    }}
                    className="font-['Inter'] text-[#E3E3E3] hover:text-[#6E6C68] transition-colors duration-300 text-sm border-none cursor-pointer"
                  >
                    {t('footer.menu')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setActiveSection('about');
                    }}
                    className="font-['Inter'] text-[#E3E3E3] hover:text-[#6E6C68] transition-colors duration-300 text-sm border-none cursor-pointer"
                  >
                    {t('footer.about')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setActiveSection('gallery');
                    }}
                    className="font-['Inter'] text-[#E3E3E3] hover:text-[#6E6C68] transition-colors duration-300 text-sm border-none cursor-pointer"
                  >
                    {t('footer.gallery')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setActiveSection('location');
                    }}
                    className="font-['Inter'] text-[#E3E3E3] hover:text-[#6E6C68] transition-colors duration-300 text-sm border-none cursor-pointer"
                  >
                    {t('footer.contacts')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setActiveSection('attendant');
                    }}
                    className="font-['Inter'] text-[#E3E3E3] hover:text-[#6E6C68] transition-colors duration-300 text-sm border-none cursor-pointer"
                  >
                    {t('footer.attendant')}
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-end justify-center gap-2">
              <div className="flex gap-2">
                <motion.a
                  href="https://github.com/guiguik12/CafeMadeira"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#5B3130] p-2 rounded-full text-[#E3E3E3] transition-all duration-300 inline-block"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E3E3E3]/20 pt-4">
          <p className="font-['Inter'] text-[#E3E3E3]/60 text-sm text-center mb-4">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-3 font-['Inter'] text-[#E3E3E3]/60 text-sm underline justify-center">
            <p>{t('footer.terms')}</p>
            <p>{t('footer.privacy')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
