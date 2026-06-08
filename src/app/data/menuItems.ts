import type { Lang } from '@/i18n/translations';

export type MenuItem = {
  id: number;
  nameEn: string;
  namePt: string;
  descriptionEn: string;
  descriptionPt: string;
  price: number;
  image: string;
  available: boolean;
  category: string;
};

export const fallbackMenuItems: MenuItem[] = [
  {
    id: 1,
    nameEn: 'Expresso Artesanal',
    namePt: 'Expresso Artesanal',
    descriptionEn: 'Intense and aromatic shot, extracted from premium roasted beans.',
    descriptionPt: 'Shot intenso e aromático, extraído de grãos torrados premium.',
    price: 600,
    category: 'Especial',
    available: true,
    image:
      'https://images.unsplash.com/photo-1771956649576-647bbaaffa4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cCUyMGhhbmRzfGVufDF8fHx8MTc3NDI3MzEwNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    nameEn: 'Café com Leite',
    namePt: 'Café com Leite',
    descriptionEn: 'Traditional Brazilian coffee with steamed milk, creamy and comforting.',
    descriptionPt: 'Café tradicional brasileiro com leite vaporizado, cremoso e reconfortante.',
    price: 900,
    category: 'Especial',
    available: true,
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWYlMjBjb21fbGVpdGV8ZW58MXx8fHwxNzc0MjI5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    nameEn: 'Latte Macchiato',
    namePt: 'Latte Macchiato',
    descriptionEn: 'Three layers of hot milk, espresso and foam for a creamy experience.',
    descriptionPt: 'Três camadas de leite quente, espresso e espuma para uma experiência cremosa.',
    price: 1250,
    category: 'Especial',
    available: true,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMG1hY2NoaWF0b3xlbnwxfHx8fHwxNzYxMTMzODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    nameEn: 'Special Cold Brew',
    namePt: 'Cold Brew Especial',
    descriptionEn: 'Smooth and refreshing cold brew, steeped for 12 hours.',
    descriptionPt: 'Cold brew suave e refrescante, extraído por 12 horas.',
    price: 1250,
    category: 'Especial',
    available: true,
    image:
      'https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzc0MjI4NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    nameEn: 'Cheese Bread',
    namePt: 'Pão de Queijo Mineiro',
    descriptionEn: 'Always warm and crunchy.',
    descriptionPt: 'Sempre quentinho e crocante.',
    price: 500,
    category: 'Para Acompanhar',
    available: true,
    image:
      'https://images.unsplash.com/photo-1559141680-d0bd7bc5af84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW8lMjBkZSUyMHF1ZWlqb3xlbnwxfHx8fHwxNzYxMTMzODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    nameEn: 'Butter Croissant',
    namePt: 'Croissant Amanteigado',
    descriptionEn: 'Golden pastry with a buttery center.',
    descriptionPt: 'Massa dourada com centro amanteigado.',
    price: 3500,
    category: 'Para Acompanhar',
    available: true,
    image:
      'https://images.unsplash.com/photo-1675125530909-15213f01a9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwYXN0cnklMjBjcm9pc3NhbnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc0MjczMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 7,
    nameEn: 'Mocha',
    namePt: 'Mocha',
    descriptionEn: 'Espresso with premium chocolate and steamed milk, topped with cocoa.',
    descriptionPt: 'Espresso com chocolate premium e leite vaporizado, finalizado com cacau.',
    price: 1400,
    category: 'Especial',
    available: true,
    image:
      'https://th.bing.com/th/id/OIP.xLJovChpldA0KIEX70x54QHaLH?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 8,
    nameEn: 'Affogato',
    namePt: 'Affogato',
    descriptionEn: 'Hot espresso over vanilla ice cream, a perfect hot-cold contrast.',
    descriptionPt: 'Espresso quente sobre sorvete de baunilha, um contraste perfeito entre quente e frio.',
    price: 1500,
    category: 'Especial',
    available: true,
    image:
      'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZmZvZ2F0b3xlbnwxfHx8fDE3NTkxOTk5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    nameEn: 'Special Macchiato',
    namePt: 'Macchiato Especial',
    descriptionEn: 'Bold espresso with a delicate layer of microfoam.',
    descriptionPt: 'Espresso marcado com uma camada delicada de microespuma.',
    price: 1100,
    category: 'Especial',
    available: true,
    image:
      'https://images.unsplash.com/photo-1485808191679-5f86510681a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaWF0b3xlbnwxfHx8fDE3NTkwMzE0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 11,
    nameEn: 'Chicken Croquette',
    namePt: 'Coxinha de Frango',
    descriptionEn: 'Golden teardrop-shaped croquette filled with shredded chicken.',
    descriptionPt: 'Coxinha dourada em forma de gota recheada com frango desfiado.',
    price: 900,
    category: 'Para Acompanhar',
    available: true,
    image:
      'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3hpbmhhfGVufDF8fHx8MTc1OTE5OTk1NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 12,
    nameEn: 'Grilled Ham & Cheese',
    namePt: 'Tosta Mista',
    descriptionEn: 'Toasted bread with ham and melted cheese.',
    descriptionPt: 'Pão torrado com presunto e queijo derretido.',
    price: 1000,
    category: 'Para Acompanhar',
    available: true,
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU5MTk5OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function getMenuItemName(item: MenuItem, lang: Lang) {
  return lang === 'pt-br' ? item.namePt : item.nameEn;
}

export function getMenuItemDescription(item: MenuItem, lang: Lang) {
  return lang === 'pt-br' ? item.descriptionPt : item.descriptionEn;
}

export function formatMenuPrice(priceInCents: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'pt-br' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100);
}
