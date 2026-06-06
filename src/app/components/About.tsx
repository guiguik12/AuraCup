import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import auracupMobile from '@/assets/auracup_mobile.gif';
import ShinyText from './ShinyText';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-[#E3E3E3]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-3xl mt-9">
              <img
                src={auracupMobile}
                alt="AuraCup logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C9A84C] rounded-full opacity-20 blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <ShinyText
              text={t('about.title')}
              speed={3}
              delay={0}
              color="#2C1A0E"
              shineColor="#E2DADD"
              spread={150}
              direction="left"
              yoyo
              pauseOnHover
              disabled={false}
              className="font-['Inter'] text-4xl md:text-5xl lg:text-6xl mb-6 font-bold"
            />

            <p className="font-['Inter'] text-[#141517]/80 text-md mb-6 leading-relaxed text-justify">
              {t('about.p1')}
            </p>

            <p className="font-['Inter'] text-[#141517]/80 text-md mb-8 leading-relaxed text-justify">
              {t('about.p2')}
            </p>

            <div className="relative pl-6 border-l-4 border-[#5B3130] my-8">
              <p className="font-['Inter'] text-[#5B3130] text-sm md:text-lg italic text-justify">
                {t('about.quote')}
              </p>
              <p className="font-['Inter'] text-[#5B3130] mt-5 text-sm font-medium italic text-justify">
                {t('about.founder')}
              </p>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="font-['Inter'] text-[#5B3130] text-3xl md:text-4xl mb-2 font-medium">
                  10+
                </div>
                <div className="font-['Inter'] text-[#141517]/70 text-sm font-medium">
                  {t('about.stats.experience')}
                </div>
              </div>
              <div className="text-center">
                <div className="font-['Inter'] text-[#5B3130] text-3xl md:text-4xl mb-2 font-medium">
                  50k+
                </div>
                <div className="font-['Inter'] text-[#141517]/70 text-sm font-medium">
                  {t('about.stats.customers')}
                </div>
              </div>
              <div className="text-center">
                <div className="font-['Inter'] text-[#5B3130] text-3xl md:text-4xl mb-2 font-medium">
                  100%
                </div>
                <div className="font-['Inter'] text-[#141517]/70 text-sm font-medium">
                  {t('about.stats.beans')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
