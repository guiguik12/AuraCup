<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Product;
use Database\Seeders\MenuSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(MenuSeeder::class);
    }

    public function test_order_can_be_created_with_products_and_real_total(): void
    {
        $espresso = Product::where('name_en', 'Expresso Artesanal')->firstOrFail();
        $cappuccino = Product::where('name_en', 'Cappuccino Clássico')->firstOrFail();

        $response = $this->postJson('/api/orders', [
            'table_number' => 7,
            'items' => [
                ['product_id' => $espresso->id, 'quantity' => 2],
                ['product_id' => $cappuccino->id, 'quantity' => 1],
            ],
        ]);

        $expectedTotal = ($espresso->price * 2) + $cappuccino->price;

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Pedido realizado com sucesso!')
            ->assertJsonPath('order.table_number', 7)
            ->assertJsonPath('order.status', OrderStatus::PENDING->value)
            ->assertJsonPath('order.total_price', $expectedTotal)
            ->assertJsonCount(2, 'order.products');

        $orderId = $response->json('order.id');

        $this->assertDatabaseHas('orders', [
            'id' => $orderId,
            'table_number' => 7,
            'status' => OrderStatus::PENDING->value,
            'total_price' => $expectedTotal,
        ]);

        $this->assertDatabaseHas('order_items', [
            'order_id' => $orderId,
            'product_id' => $espresso->id,
            'quantity' => 2,
            'price' => $espresso->price,
        ]);
    }

    public function test_order_show_returns_products_for_existing_order(): void
    {
        $product = Product::firstOrFail();

        $order = Order::create([
            'table_number' => 3,
            'status' => OrderStatus::PENDING,
            'total_price' => $product->price,
        ]);

        $order->products()->attach($product->id, [
            'quantity' => 1,
            'price' => $product->price,
        ]);

        $this->getJson("/api/orders/{$order->id}")
            ->assertOk()
            ->assertJsonPath('id', $order->id)
            ->assertJsonPath('table_number', 3)
            ->assertJsonCount(1, 'products');
    }

    public function test_order_creation_rejects_invalid_payload(): void
    {
        $this->postJson('/api/orders', [
            'table_number' => 'mesa-a',
            'items' => [
                ['product_id' => 999, 'quantity' => 0],
            ],
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'table_number',
                'items.0.product_id',
                'items.0.quantity',
            ]);
    }
}
