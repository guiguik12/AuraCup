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

export function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, lang } = useLanguage();
  const { addItem } = useCart();
  const [products, setProducts] = useState<MenuItem[]>(fallbackMenuItems);

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

  return (
    <section id="menu" ref={ref} className="py-20 md:py-32 bg-[#E3E3E3]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Inter'] text-[#5B3130] text-4xl md:text-5xl lg:text-6xl">
            {t('menu.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, index) => {
            const itemName = getMenuItemName(item, lang);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-[#F5ECD7] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={itemName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#2C1A0E] px-4 py-2 rounded-full font-['Inter'] shadow-lg">
                      {formatMenuPrice(item.price, lang)}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="mb-2 inline-flex rounded-full bg-[#8A9E7B]/20 px-3 py-1 font-['Inter'] text-xs font-bold uppercase text-[#5B3130]">
                      {item.category}
                    </span>
                    <h3 className="font-['Inter'] text-[#2C1A0E] text-2xl mb-2">
                      {itemName}
                    </h3>
                    <p className="font-['Inter'] text-[#2C1A0E]/70 text-sm leading-relaxed">
                      {getMenuItemDescription(item, lang)}
                    </p>
                    <button
                      type="button"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#5B3130] px-5 py-3 font-['Inter'] text-sm font-bold text-[#F5ECD7] transition-colors hover:bg-[#3d2918] disabled:cursor-not-allowed disabled:opacity-60"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            type="button"
            className="bg-[#2C1A0E] text-[#F5ECD7] px-8 py-4 rounded-full font-['Inter'] text-lg hover:bg-[#3d2918] transition-all duration-300 hover:scale-105 shadow-xl"
          >
            {t('menu.viewMore')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
