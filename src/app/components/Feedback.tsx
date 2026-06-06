import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Slider from 'react-slick';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import ShinyText from './ShinyText';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CustomArrow({
  direction,
  onClick,
}: Readonly<{
  direction: 'prev' | 'next';
  onClick?: () => void;
}>) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === 'prev'
          ? 'left-0 -translate-x-20 lg:-translate-x-24'
          : 'right-0 translate-x-20 lg:translate-x-24'
      } z-10 bg-[#5B3130] hover:bg-[rgb(61, 41, 24)] text-[#E3E3E3] rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden lg:block`}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="w-6 h-6" />
      ) : (
        <ChevronRight className="w-6 h-6" />
      )}
    </button>
  );
}

export function Feedback() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  const feedbacks = [
    {
      id: 1,
      nameKey: 'feedback.person1',
      roleKey: 'feedback.role1',
      rating: 5,
      textKey: 'feedback.text1',
      avatar: 'AS',
    },
    {
      id: 2,
      nameKey: 'feedback.person2',
      roleKey: 'feedback.role2',
      rating: 5,
      textKey: 'feedback.text2',
      avatar: 'CM',
    },
    {
      id: 3,
      nameKey: 'feedback.person3',
      roleKey: 'feedback.role3',
      rating: 5,
      textKey: 'feedback.text3',
      avatar: 'JS',
    },
    {
      id: 4,
      nameKey: 'feedback.person4',
      roleKey: 'feedback.role4',
      rating: 5,
      textKey: 'feedback.text4',
      avatar: 'RL',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      id="feedback"
      ref={ref}
      className="py-20 md:py-32 bg-[#E3E3E3] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 mt-8 md:mt-0"
        >
          <ShinyText
            text={t('feedback.title')}
            speed={3}
            delay={0}
            color="#2C1A0E"
            shineColor="#E2DADD"
            spread={150}
            direction="left"
            yoyo
            pauseOnHover
            disabled={false}
            className="font-['Inter'] text-2xl md:text-4xl lg:text-5xl mb-4 font-bold"
          />
          <p className="font-['Inter'] text-[#141517]/70 text-sm md:text-lg max-w-2xl mx-auto px-4">
            {t('feedback.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative px-0 lg:px-16"
        >
          <Slider {...settings}>
            {feedbacks.map(fb => (
              <div key={fb.id} className="px-1 md:px-3">
                <div className="bg-[#5B3130] rounded-2xl p-6 md:p-8 shadow-lg h-full text-center">
                  <div className="flex gap-1 mb-4 justify-center">
                    {Array.from({ length: fb.rating }, (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 md:w-5 md:h-5 fill-[#fbe188] text-[#ecc725]"
                      />
                    ))}
                  </div>

                  <p className="font-['Inter'] text-[#E3E3E3] text-sm md:text-md leading-relaxed mb-6">
                    "{t(fb.textKey)}"
                  </p>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#6a6a6a] flex items-center justify-center flex-shrink-0">
                      <span className="font-['Inter'] text-white text-sm md:text-md font-medium">
                        {fb.avatar}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="font-['Inter'] text-[#E3E3E3] font-semibold text-sm md:text-md">
                        {t(fb.nameKey)}
                      </div>
                      <div className="font-['Inter'] text-[#E3E3E3]/60 text-sm md:text-md">
                        {t(fb.roleKey)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

      <style>{`
        .slick-slider {
          display: block;
          box-sizing: border-box;
          user-select: none;
          touch-action: pan-y;
        }
        .slick-list {
          position: relative;
          display: block;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        .slick-list:focus {
          outline: none;
        }
        .slick-list.dragging {
          cursor: pointer;
        }
        .slick-slider .slick-track,
        .slick-slider .slick-list {
          transform: translate3d(0, 0, 0);
        }
        .slick-track {
          position: relative;
          top: 0;
          left: 0;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .slick-track:before,
        .slick-track:after {
          display: table;
          content: '';
        }
        .slick-track:after {
          clear: both;
        }
        .slick-loading .slick-track {
          visibility: hidden;
        }
        .slick-slide {
          display: none;
          float: left;
          height: 100%;
          min-height: 1px;
        }
        .slick-slide img {
          display: block;
        }
        .slick-slide.slick-loading img {
          display: none;
        }
        .slick-slide.dragging img {
          pointer-events: none;
        }
        .slick-initialized .slick-slide {
          display: block;
        }
        .slick-loading .slick-slide {
          visibility: hidden;
        }
        .slick-vertical .slick-slide {
          display: block;
          height: auto;
          border: 1px solid transparent;
        }
        .slick-arrow.slick-hidden {
          display: none;
        }

<<<<<<< HEAD
=======
        .slick-slide {
          height: auto !important;
        }

        .slick-track {
          display: flex !important;
          align-items: stretch !important;
        }

        .slick-slide > div {
          height: 100%;
        }

        .slick-list {
          margin: 0 -4px;
        }

        @media (min-width: 768px) {
          .slick-list {
            margin: 0 -12px;
          }
        }

>>>>>>> a75f87c (feat: página de feedback com visual feito.)
        .slick-dots {
          position: relative;
          bottom: -50px;
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          text-align: center;
        }

        .slick-dots li {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 0 5px;
          padding: 0;
          cursor: pointer;
        }

        .slick-dots li button {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 20px;
          height: 20px;
          padding: 5px;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: transparent;
        }

        .slick-dots li button:before {
          font-size: 12px;
          line-height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          content: '\u2022';
          text-align: center;
          opacity: 0.4;
          color: #5B3130;
        }

        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #5B3130;
        }

        @media (max-width: 767px) {
          .slick-dots li button:before {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}
