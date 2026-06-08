import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import {
  fallbackMenuItems,
  formatMenuPrice,
  getMenuItemDescription,
  getMenuItemName,
  type MenuItem,
} from '../data/menuItems';
import { listProducts } from '../services/productService';
import ShinyText from './ShinyText';

export function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, lang } = useLanguage();
  const { addItem } = useCart();
  const [products, setProducts] = useState<MenuItem[]>(fallbackMenuItems);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    listProducts().then(result => {
      if (!isMounted) return;
      setProducts(result.products);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + 3);
      setIsLoading(false);
    }, 200);
  };

  const filteredProducts = activeCategory
    ? products.filter(p => p.category === activeCategory)
    : products;
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section id="menu" ref={ref} className="py-20 md:py-32 bg-[#E3E3E3]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16 mt-4 md:mt-0"
        >
          <ShinyText
            text={t('menu.title')}
            speed={3}
            delay={0}
            color="#5B3130"
            shineColor="#C9A84C"
            spread={150}
            direction="left"
            yoyo
            pauseOnHover
            disabled={false}
            className="font-['Inter'] text-3xl md:text-4xl lg:text-5xl font-bold"
          />
          <div className="flex justify-center gap-4 mt-6">
            {[
              { key: null, label: t('menu.filter.all') },
              { key: 'Cafés Especiais', label: t('menu.filter.drinks') },
              { key: 'Para Acompanhar', label: t('menu.filter.snacks') },
            ].map(({ key, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setActiveCategory(key);
                  setVisibleCount(6);
                }}
                className={`px-5 py-2 rounded-full font-['Inter'] text-sm font-bold transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-[#5B3130] text-[#E3E3E3] shadow-lg'
                    : 'bg-[#E3E3E3] text-[#5B3130] hover:bg-[#C9A84C] hover:text-[#E3E3E3]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map((item, index) => {
            const itemName = getMenuItemName(item, lang);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-[#5B3130] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={itemName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#E3E3E3] px-4 py-2 rounded-full font-['Inter'] shadow-lg font-medium">
                      {formatMenuPrice(item.price, lang)}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="mb-2 inline-flex rounded-full bg-[#E3E3E3]/90 px-3 py-1 font-['Inter'] text-xs font-bold uppercase text-[#5B3130]">
                      {item.category}
                    </span>
                    <h3 className="font-['Inter'] text-[#E3E3E3] text-2xl mb-2">
                      {itemName}
                    </h3>
                    <p className="font-['Inter'] text-[#E3E3E3]/70 text-sm leading-relaxed">
                      {getMenuItemDescription(item, lang)}
                    </p>
                    <button
                      type="button"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#E3E3E3] px-5 py-3 font-['Inter'] text-sm font-bold text-[#5B3130] transition-colors hover:bg-[#C9A84C] hover:text-[#E3E3E3] disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => addItem(item)}
                      disabled={!item.available}
                      aria-label={`${t('menu.addToCart')} ${itemName}`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {t('menu.addToCart')}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              type="button"
              onClick={loadMore}
              disabled={isLoading}
              className="bg-[#5B3130] text-[#E3E3E3] px-5 py-3 rounded-full font-['Inter'] text-md hover:bg-[#3d2918] transition-all duration-300 hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('menu.loading')}
                </div>
              ) : (
                t('menu.viewMore')
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
