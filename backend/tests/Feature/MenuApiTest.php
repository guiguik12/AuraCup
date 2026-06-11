<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Database\Seeders\MenuSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MenuApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(MenuSeeder::class);
    }

    public function test_lista_as_categorias_cadastradas_no_cardapio(): void
    {
        $this->getJson('/api/categories')
            ->assertOk()
            ->assertJsonCount(2)
            ->assertJsonFragment(['name' => 'Especial'])
            ->assertJsonFragment(['name' => 'Para Acompanhar']);
    }

    public function test_lista_os_produtos_cadastrados_no_cardapio(): void
    {
        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonCount(11)
            ->assertJsonPath('0.name_pt', 'Expresso Artesanal')
            ->assertJsonPath('0.price', 600);
    }

    public function test_salva_produto_com_campos_traduzidos(): void
    {
        $category = Category::firstOrFail();

        $product = Product::create([
            'category_id' => $category->id,
            'name_en' => 'Filtered Coffee',
            'name_pt' => 'Café Filtrado',
            'description_en' => 'Freshly brewed coffee.',
            'description_pt' => 'Café passado na hora.',
            'price' => 800,
            'image_url' => 'https://example.com/coffee.jpg',
            'is_available' => true,
        ]);

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name_en' => 'Filtered Coffee',
            'name_pt' => 'Café Filtrado',
            'price' => 800,
        ]);
    }
}
