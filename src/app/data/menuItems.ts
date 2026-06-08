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
    descriptionEn: 'Short espresso made with selected beans.',
    descriptionPt: 'Expresso curto com grãos selecionados.',
    price: 600,
    category: 'Cafés Especiais',
    available: true,
    image:
      'https://images.unsplash.com/photo-1771956649576-647bbaaffa4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cCUyMGhhbmRzfGVufDF8fHx8MTc3NDI3MzEwNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    nameEn: 'Cappuccino Clássico',
    namePt: 'Cappuccino Clássico',
    descriptionEn: 'Classic cappuccino with steamed milk and foam.',
    descriptionPt: 'Cappuccino clássico com leite vaporizado e espuma.',
    price: 1250,
    category: 'Cafés Especiais',
    available: true,
    image:
      'https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjYXBwdWNjaW5vJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzc0MjI5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    nameEn: 'Latte Macchiato',
    namePt: 'Latte Macchiato',
    descriptionEn: 'Layered milk and espresso for a smooth break.',
    descriptionPt: 'Leite e espresso em camadas para uma pausa suave.',
    price: 1250,
    category: 'Cafés Especiais',
    available: true,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMG1hY2NoaWF0b3xlbnwxfHx8fHwxNzYxMTMzODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    nameEn: 'Special Cold Brew',
    namePt: 'Cold Brew Especial',
    descriptionEn: 'Cold extraction with a naturally sweet roasted profile.',
    descriptionPt: 'Extração fria com perfil torrado naturalmente adocicado.',
    price: 1250,
    category: 'Cafés Especiais',
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
      'https://images.unsplash.com/photo-1612203985729-70726954388c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW8lMjBkZSUyMHF1ZWlqb3xlbnwxfHx8fHwxNzYxMTMzODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
    descriptionEn: 'Espresso blended with rich chocolate and steamed milk.',
    descriptionPt: 'Espresso combinado com chocolate rico e leite vaporizado.',
    price: 1400,
    category: 'Cafés Especiais',
    available: true,
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2NoYSUyMGNvZmZlZXxlbnwxfHx8fDE3NjExMzM4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    nameEn: 'Affogato',
    namePt: 'Affogato',
    descriptionEn: 'Hot espresso poured over a scoop of vanilla ice cream.',
    descriptionPt: 'Espresso quente despejado sobre uma bola de sorvete de baunilha.',
    price: 1500,
    category: 'Cafés Especiais',
    available: true,
    image:
      'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZmZvZ2F0b3xlbnwxfHx8fDE3NTkxOTk5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    nameEn: 'Special Macchiato',
    namePt: 'Macchiato Especial',
    descriptionEn: 'Espresso stained with a touch of frothed milk.',
    descriptionPt: 'Espresso com uma pincelada de leite espumado.',
    price: 1100,
    category: 'Cafés Especiais',
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
