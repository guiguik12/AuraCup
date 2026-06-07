<?php

namespace database\seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Criar a Categoria de Cafés
        $cafes = Category::create([
            'name' => 'Cafés Especiais',
        ]);

        // Criar produtos dentro dessa categoria
        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Expresso Artesanal',
            'name_pt' => 'Expresso Artesanal',
            'description_en' => 'Expresso curto com grãos selecionados.',
            'description_pt' => 'Expresso curto com grãos selecionados.',
            'price' => 600, // R$ 6,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1771956649576-647bbaaffa4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cCUyMGhhbmRzfGVufDF8fHx8MTc3NDI3MzEwNXww&ixlib=rb-4.1.0&q=80&w=1080'

        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Cappuccino Clássico',
            'name_pt' => 'Cappuccino Clássico',
            'description_en' => 'Um Cappu e um ccino.',
            'description_pt' => 'Um Cappu e um ccino.',
            'price' => 1250, // R$ 12,50
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzc0MjI5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Latte Macchiato',
            'name_pt' => 'Latte Macchiato',
            'description_en' => 'Um Cappu e um ccino.',
            'description_pt' => 'Um Cappu e um ccino.',
            'price' => 1250, // R$ 12,50
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzc0MjI5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name_en' => 'Special Cold Brew',
            'name_pt' => 'Cold Brew Especial',
            'description_en' => 'Um Cappu e um ccino.',
            'description_pt' => 'Um Cappu e um ccino.',
            'price' => 1250, // R$ 12,50
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzc0MjI4NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
            'image_url' => 'https://images.unsplash.com/photo-1675125530909-15213f01a9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBjcm9pc3NhbnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc0MjczMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);

        Product::create([
            'category_id' => $comidas->id,
            'name_en' => 'Butter Croisant',
            'name_pt' => 'Croisant Amanteigado',
            'description_en' => 'Quasou',
            'description_pt' => 'Quasou',
            'price' => 3500, // R$ 14,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1675125530909-15213f01a9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBjcm9pc3NhbnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc0MjczMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080'
        ]);
    }
}