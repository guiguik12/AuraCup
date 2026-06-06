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
            'name' => 'Expresso Artesanal',
            'description' => 'Expresso curto com grãos selecionados.',
            'price' => 600, // R$ 6,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1771956649576-647bbaaffa4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cCUyMGhhbmRzfGVufDF8fHx8MTc3NDI3MzEwNXww&ixlib=rb-4.1.0&q=80&w=1080'
           
        ]);

        Product::create([
            'category_id' => $cafes->id,
            'name' => 'Cappuccino Clássico',
            'description' => 'Um Cappu e um ccino.',
            'price' => 1250, // R$ 12,50
            'is_available' => true,
            'image_url'=> 'https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzc0MjI5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ]);

        // 2. Criar a Categoria de Acompanhamentos
        $comidas = Category::create([
            'name' => 'Para Acompanhar',
        ]);

        Product::create([
            'category_id' => $comidas->id,
            'name' => 'Pão de Queijo Mineiro',
            'description' => 'Sempre quentinho e crocante.',
            'price' => 500, // R$ 5,00
            'is_available' => true,
            'image_url' => 'https://images.unsplash.com/photo-1675125530909-15213f01a9e1?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBjcm9pc3NhbnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc0MjczMTA2fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080'
        ]);
        
        Product::create([
            'category_id' => $comidas->id,
            'name' => 'Croisant Amanteigado',
            'description' => 'Quasou',
            'price' => 1400, // R$ 14,00
            'is_available' => true,
             'image_url' => 'https://images.unsplash.com/photo-1675125530909-15213f01a9e1?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBjcm9pc3NhbnQlMjBjb2ZmZWV8ZW58MXx8fHwxNzc0MjczMTA2fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080'
        ]);
    }
}