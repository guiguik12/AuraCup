<?php

namespace Tests\Feature;

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

    public function test_categories_endpoint_lists_seeded_categories(): void
    {
        $this->getJson('/api/categories')
            ->assertOk()
            ->assertJsonCount(2)
            ->assertJsonFragment(['name' => 'Cafés Especiais'])
            ->assertJsonFragment(['name' => 'Para Acompanhar']);
    }

    public function test_products_endpoint_lists_seeded_products(): void
    {
        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonCount(12)
            ->assertJsonPath('0.name_pt', 'Expresso Artesanal')
            ->assertJsonPath('0.price', 600);
    }

    public function test_product_model_accepts_translated_menu_fields(): void
    {
        $product = Product::create([
            'category_id' => 1,
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
