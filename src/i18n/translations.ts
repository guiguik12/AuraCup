export type Lang = 'en' | 'pt-br';

export type TranslationKeys = (typeof translations)['en'];

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    'nav.logo': 'aura cup',
    'nav.menu': 'Menu',
    'nav.coffee': 'Coffee',
    'nav.about': 'About',
    'nav.history': 'History',
    'nav.mission': 'Mission',
    'nav.contacts': 'Contacts',
    'nav.gallery': 'Gallery',
    'nav.location': 'Location',
    'nav.feedback': 'Feedback',
    'nav.cart': 'Shopping cart',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',

    // Hero / Home
    'hero.brand': 'AURA CUP',
    'hero.subtitle': 'Coffee Shop',
    'hero.viewMenu': 'View Menu',
    'hero.brandIdentity': 'Brand Identity by Богдана Собко',

    // About
    'about.title': 'Our Story',
    'about.p1':
      "AuraCup's mission has always been to offer more than just great flavors. We wanted to build an experience — an environment where the aroma of fresh coffee, warm service, and a tranquil atmosphere make every customer feel at home.",
    'about.p2':
      'The name AuraCup carries exactly that essence. It represents the different moments that coffee accompanies: the first sip of the morning, the afternoon conversation, the break between commitments, and the encounters that stay in memory.',
    'about.quote':
      '"Coffee is not just a drink, but an experience created with love and filled with different sensations."',
    'about.founder': 'Luiz Ribeiro, Founder',
    'about.stats.experience': 'Years of Excellence',
    'about.stats.customers': 'Happy Customers',
    'about.stats.beans': 'Natural Beans',

    // Menu
    'menu.title': 'MENU',
    'menu.viewMore': 'View More',
    'menu.item1': 'Artisan Espresso',
    'menu.item2': 'Classic Cappuccino',
    'menu.item3': 'Butter Croissant',
    'menu.item4': 'Latte Macchiato',
    'menu.item5': 'Special Cold Brew',
    'menu.item6': 'Cheese Bread',
    'menu.description': 'yadayadayada',

    // Gallery
    'gallery.title': 'GALLERY',
    'gallery.subtitle': 'Where coffee meets the perfect atmosphere.',
    'gallery.heroSubtitle':
      "More than images, it invites coffee lovers to exploring flavors, atmosphere, and the brand's identity in a simple and engaging way.",
    'gallery.scrollText': 'Scroll to view images',
    'gallery.slideText': 'Slide to explore',

    // Feedback / Testimonials
    'feedback.title': 'WHAT OUR CLIENTS SAY',
    'feedback.subtitle': 'Read what some of our loyal customers have said:',
    'feedback.person1': 'Ana Silva',
    'feedback.role1': 'Coffee Lover',
    'feedback.text1':
      'The best coffee experience in town! The atmosphere is cozy, the baristas are knowledgeable, and every cup is perfect.',
    'feedback.person2': 'Carlos Mendes',
    'feedback.role2': 'Regular Customer',
    'feedback.text2':
      'I come here every morning. The cappuccino is consistently excellent, and the staff always greets me with a warm smile.',
    'feedback.person3': 'Julia Santos',
    'feedback.role3': 'Food Blogger',
    'feedback.text3':
      'A wonderful caf\u00e9! Every detail in the coffees and desserts is worthy of praise. The latte art is definitely worth the wait.',
    'feedback.person4': 'Roberto Lima',
    'feedback.role4': 'Businessman',
    'feedback.text4':
      'Perfect place for meetings. Great coffee, comfortable seating, and a productive atmosphere. Highly recommended!',

    // Location
    'location.title': 'Visit Us',
    'location.subtitle':
      'Transform your break into an encounter with the art of coffee.',
    'location.heroTitle': 'FIND US',
    'location.heroSubtitle':
      'Come visit us and enjoy the best coffee experience.',
    'location.scrollText': 'Scroll to more details',
    'location.addressLabel': 'ADDRESS',
    'location.addressText': '250 Lafayette Street',
    'location.district': 'Soho, New York, NY 10012',
    'location.country': 'United States',
    'location.hoursLabel': 'HOURS',
    'location.weekdays': 'Monday - Friday',
    'location.weekdayTime': '7:00 AM - 8:00 PM',
    'location.saturday': 'Saturday',
    'location.saturdayTime': '8:00 AM - 9:00 PM',
    'location.sunday': 'Sunday',
    'location.sundayTime': '8:00 AM - 7:00 PM',
    'location.phoneLabel': 'PHONE',
    'location.phoneNumber': '(212) 431-5830',
    'location.phoneAvailability': 'Available 24/7',
    'location.emailLabel': 'EMAIL',
    'location.emailAddress': 'hello@auracup.com',
    'location.emailResponse': 'Response within 24h',
    'location.contactButton': 'Contact',

    // Footer
    'footer.coffeeShop': '— Coffee Shop',
    'footer.home': 'Home',
    'footer.menu': 'Menu',
    'footer.about': 'About',
    'footer.gallery': 'Gallery',
    'footer.contacts': 'Contacts',
    'footer.copyright': '\u00a9 Copyright 2026 \u2014 All Rights Reserved.',
    'footer.terms': 'Terms of Use',
    'footer.privacy': 'Privacy Policy',

    // Language toggle
    'lang.en': 'EN',
    'lang.pt-br': 'PT-BR',
  },
  'pt-br': {
    // Navbar
    'nav.logo': 'aura cup',
    'nav.menu': 'Menu',
    'nav.coffee': 'Caf\u00e9',
    'nav.about': 'Sobre',
    'nav.history': 'Hist\u00f3ria',
    'nav.mission': 'Miss\u00e3o',
    'nav.contacts': 'Contatos',
    'nav.gallery': 'Galeria',
    'nav.location': 'Localiza\u00e7\u00e3o',
    'nav.feedback': 'Depoimentos',
    'nav.cart': 'Carrinho de compras',
    'nav.openMenu': 'Abrir menu',
    'nav.closeMenu': 'Fechar menu',

    // Hero / Home
    'hero.brand': 'AURA CUP',
    'hero.subtitle': 'Cafeteria',
    'hero.viewMenu': 'Ver Menu',
    'hero.brandIdentity': 'Identidade Visual por Богдана Собко',

    // About
    'about.title': 'Nossa Hist\u00f3ria',
    'about.p1':
      'A proposta da AuraCup sempre foi oferecer mais do que sabores marcantes. Quer\u00edamos construir uma experi\u00eancia — um ambiente em que o aroma do caf\u00e9 fresco, o atendimento pr\u00f3ximo e a atmosfera tranquila fizessem cada cliente se sentir em casa.',
    'about.p2':
      'O nome AuraCup carrega justamente essa ess\u00eancia. Ele representa os diferentes momentos que o caf\u00e9 acompanha: o primeiro gole da manh\u00e3, a conversa da tarde, a pausa entre compromissos e os encontros que ficam na mem\u00f3ria.',
    'about.quote':
      '"O caf\u00e9 n\u00e3o \u00e9 apenas uma bebida, mas uma experi\u00eancia criada com amor e repleta de diferentes sensa\u00e7\u00f5es."',
    'about.founder': 'Luiz Ribeiro, Fundador',
    'about.stats.experience': 'Anos de Excel\u00eancia',
    'about.stats.customers': 'Clientes Satisfeitos',
    'about.stats.beans': 'Gr\u00e3os Naturais',

    // Menu
    'menu.title': 'MENU',
    'menu.viewMore': 'Ver mais',
    'menu.item1': 'Espresso Artesanal',
    'menu.item2': 'Cappuccino Cl\u00e1ssico',
    'menu.item3': 'Croissant Amanteigado',
    'menu.item4': 'Latte Macchiato',
    'menu.item5': 'Cold Brew Especial',
    'menu.item6': 'P\u00e3o de Queijo',
    'menu.description': 'yadayadayada',

    // Gallery
    'gallery.title': 'GALERIA',
    'gallery.subtitle': 'Onde o caf\u00e9 encontra a atmosfera perfeita.',
    'gallery.heroSubtitle':
      'Mais do que imagens, convida amantes do café para explorar sabores, atmosfera e identidade da marca de forma simples e envolvente.',
    'gallery.scrollText': 'Role para ver imagens',
    'gallery.slideText': 'Deslize para explorar',
    // Feedback / Testimonials
    'feedback.title': 'O QUE OS CLIENTES DIZEM?',
    'feedback.subtitle':
      'Leia o que alguns de nossos maiores clientes j\u00e1 falaram:',
    'feedback.person1': 'Ana Silva',
    'feedback.role1': 'Apaixonada por Caf\u00e9',
    'feedback.text1':
      'A melhor experi\u00eancia de caf\u00e9 da cidade! O ambiente \u00e9 aconchegante, os baristas s\u00e3o conhecedores, e cada x\u00edcara \u00e9 perfeita.',
    'feedback.person2': 'Carlos Mendes',
    'feedback.role2': 'Cliente Frequente',
    'feedback.text2':
      'Eu venho aqui toda manh\u00e3. O cappuccino \u00e9 consistentemente excelente, e a equipe sempre me recebe com um sorriso caloroso.',
    'feedback.person3': 'Julia Santos',
    'feedback.role3': 'Blogueira de Comida',
    'feedback.text3':
      'Um \u00f3timo caf\u00e9! Todos os detalhes nos caf\u00e9s e doces s\u00e3o dignos de parab\u00e9ns. A arte nos caf\u00e9s com certeza vale a espera.',
    'feedback.person4': 'Roberto Lima',
    'feedback.role4': 'Empres\u00e1rio',
    'feedback.text4':
      'Local perfeito para reuni\u00f5es. \u00d3timo caf\u00e9, assentos confort\u00e1veis e um ambiente produtivo. Altamente recomendado!',

    // Location
    'location.title': 'Nos visite',
    'location.subtitle':
      'Transforme sua pausa em um encontro com a arte do caf\u00e9.',
    'location.heroTitle': 'ENCONTRE-NOS',
    'location.heroSubtitle':
      'Venha nos visitar e aproveite a melhor experiência de café.',
    'location.scrollText': 'Role para mais detalhes',
    'location.addressLabel': 'ENDEREÇO',
    'location.addressText': 'Rua Lafayette, 250',
    'location.district': 'Soho, Nova York, NY 10012',
    'location.country': 'Estados Unidos',
    'location.hoursLabel': 'HORÁRIOS',
    'location.weekdays': 'Segunda - Sexta',
    'location.weekdayTime': '7:00 - 20:00',
    'location.saturday': 'Sábado',
    'location.saturdayTime': '8:00 - 21:00',
    'location.sunday': 'Domingo',
    'location.sundayTime': '8:00 - 19:00',
    'location.phoneLabel': 'TELEFONE',
    'location.phoneNumber': '(212) 431-5830',
    'location.phoneAvailability': 'Disponível 24/7',
    'location.emailLabel': 'EMAIL',
    'location.emailAddress': 'hello@auracup.com',
    'location.emailResponse': 'Resposta em 24h',
    'location.contactButton': 'Contato',

    // Footer
    'footer.coffeeShop': '— Cafeteria',
    'footer.home': 'In\u00edcio',
    'footer.menu': 'Menu',
    'footer.about': 'Sobre',
    'footer.gallery': 'Galeria',
    'footer.contacts': 'Contatos',
    'footer.copyright':
      '\u00a9 Copyright 2026 \u2014 Todos os Direitos Reservados.',
    'footer.terms': 'Termos de Uso',
    'footer.privacy': 'Pol\u00edtica de Privacidade',

    // Language toggle
    'lang.en': 'EN',
    'lang.pt-br': 'PT-BR',
  },
};

export function getTranslation(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations['en'][key] ?? key;
}
