import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Slider from 'react-slick';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

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
          ? 'left-0 -translate-x-12'
          : 'right-0 translate-x-12'
      } z-10 bg-[#C9A84C] hover:bg-[#d4b55c] text-[#2C1A0E] rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hidden lg:block`}
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
      className="py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Inter'] text-[#2C1A0E] text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('feedback.title')}
          </h2>
          <p className="font-['Inter'] text-[#2C1A0E]/70 text-lg max-w-2xl mx-auto">
            {t('feedback.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative px-4 lg:px-16"
        >
          <Slider {...settings}>
            {feedbacks.map(fb => (
              <div key={fb.id} className="px-4">
                <div className="bg-[#F5ECD7] rounded-2xl p-8 shadow-lg h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: fb.rating }, (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]"
                      />
                    ))}
                  </div>

                  <p className="font-['Inter'] text-[#2C1A0E]/80 text-base leading-relaxed mb-6">
                    "{t(fb.textKey)}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#8A9E7B] flex items-center justify-center">
                      <span className="font-['Inter'] text-white text-lg">
                        {fb.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-['Inter'] text-[#2C1A0E] text-lg">
                        {t(fb.nameKey)}
                      </div>
                      <div className="font-['Inter'] text-[#2C1A0E]/60 text-sm">
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
          position: relative;
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
          font-size: 10px;
          line-height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          content: '\u2022';
          text-align: center;
          opacity: 0.4;
          color: #C9A84C;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #C9A84C;
        }
      `}</style>
    </section>
  );
}
