<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Criar a Categoria de Cafés
        $cafes = Category::create([
            'name' => 'Especial',
        ]);

        // Criar produtos dentro dessa categoria
        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Expresso Artesanal',
            'name_pt' => 'Expresso Artesanal',
            'description_en' => 'Intense and aromatic shot, extracted from premium roasted beans.',
            'description_pt' => 'Shot intenso e aromático, extraído de grãos torrados premium.',
            'price' => 600, // R$ 6,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1771956649576-647bbaaffa4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cCUyMGhhbmRzfGVufDF8fHx8MTc3NDI3MzEwNXww&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Café com Leite',
            'name_pt' => 'Café com Leite',
            'description_en' => 'Traditional Brazilian coffee with steamed milk, creamy and comforting.',
            'description_pt' => 'Café tradicional brasileiro com leite vaporizado, cremoso e reconfortante.',
            'price' => 900, // R$ 9,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWYlMjBjb21fbGVpdGV8ZW58MXx8fHwxNzc0MjI5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Latte Macchiato',
            'name_pt' => 'Latte Macchiato',
            'description_en' => 'Three layers of hot milk, espresso and foam for a creamy experience.',
            'description_pt' => 'Três camadas de leite quente, espresso e espuma para uma experiência cremosa.',
            'price' => 1250, // R$ 12,50
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMG1hY2NoaWF0b3xlbnwxfHx8fHwxNzYxMTMzODU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Special Cold Brew',
            'name_pt' => 'Cold Brew Especial',
            'description_en' => 'Smooth and refreshing cold brew, steeped for 12 hours.',
            'description_pt' => 'Cold brew suave e refrescante, extraído por 12 horas.',
            'price' => 1250, // R$ 12,50
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzc0MjI4NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        // 2. Criar a Categoria de Acompanhamentos
        $comidas = Category::create([
            'name' => 'Para Acompanhar',
        ]);

        Product::create([
            'category_id' => $comidas->id,
            'name_en' => 'Cheese Bread',
            'name_pt' => 'Pão de Queijo Mineiro',
            'description_en' => 'Always warm and crunchy.',
            'description_pt' => 'Sempre quentinho e crocante.',
            'price' => 500, // R$ 5,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1559141680-d0bd7bc5af84?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ]);

        Product::create([
            'category_id' => $comidas->id,
            'name_en' => 'Butter Croissant',
            'name_pt' => 'Croissant Amanteigado',
            'description_en' => 'Golden pastry with a buttery center.',
            'description_pt' => 'Massa dourada com centro amanteigado.',
            'price' => 3500, // R$ 35,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1675125530909-15213f01a9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwYXN0cnklMjBjcm9pc3NhbnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc0MjczMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        // 3. Novos cafés especiais
        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Mocha',
            'name_pt' => 'Mocha',
            'description_en' => 'Espresso with premium chocolate and steamed milk, topped with cocoa.',
            'description_pt' => 'Espresso com chocolate premium e leite vaporizado, finalizado com cacau.',
            'price' => 1400, // R$ 14,00
            'is_available' => true,
            'image_url' => 'https://th.bing.com/th/id/OIP.xLJovChpldA0KIEX70x54QHaLH?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Affogato',
            'name_pt' => 'Affogato',
            'description_en' => 'Hot espresso over vanilla ice cream, a perfect hot-cold contrast.',
            'description_pt' => 'Espresso quente sobre sorvete de baunilha, um contraste perfeito entre quente e frio.',
            'price' => 1500, // R$ 15,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZmZvZ2F0b3xlbnwxfHx8fDE3NTkxOTk5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Special Macchiato',
            'name_pt' => 'Macchiato Especial',
            'description_en' => 'Bold espresso with a delicate layer of microfoam.',
            'description_pt' => 'Espresso marcado com uma camada delicada de microespuma.',
            'price' => 1100, // R$ 11,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaWF0b3xlbnwxfHx8fDE3NTkwMzE0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        // 4. Novos salgados
        Product::create([
            'category_id' => $comidas->id,
            'name_en' => 'Chicken Croquette',
            'name_pt' => 'Coxinha de Frango',
            'description_en' => 'Golden teardrop-shaped croquette filled with shredded chicken.',
            'description_pt' => 'Coxinha dourada em forma de gota recheada com frango desfiado.',
            'price' => 900, // R$ 9,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3hpbmhhfGVufDF8fHx8MTc1OTE5OTk1NXww&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        Product::create([
            'category_id' => $comidas->id,
            'name_en' => 'Grilled Ham & Cheese',
            'name_pt' => 'Tosta Mista',
            'description_en' => 'Toasted bread with ham and melted cheese.',
            'description_pt' => 'Pão torrado com presunto e queijo derretido.',
            'price' => 1000, // R$ 10,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU5MTk5OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);
    }
}
