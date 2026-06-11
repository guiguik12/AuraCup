<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Database\Seeders\MenuSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AttendantApiTest extends TestCase
{
    use RefreshDatabase;

    private User $attendant;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(MenuSeeder::class);

        $this->attendant = User::create([
            'name' => 'Atendente Teste',
            'email' => 'atendente.teste@auracup.com',
            'password' => Hash::make('segredo123'),
            'is_attendant' => true,
        ]);
    }

    public function test_atendente_consegue_fazer_login_e_receber_token(): void
    {
        $this->postJson('/api/attendant/login', [
            'email' => 'atendente.teste@auracup.com',
            'password' => 'segredo123',
        ])
            ->assertOk()
            ->assertJsonPath('user.email', 'atendente.teste@auracup.com')
            ->assertJsonStructure(['token']);
    }

    public function test_usuario_comum_nao_consegue_entrar_na_area_de_atendente(): void
    {
        User::create([
            'name' => 'Cliente Teste',
            'email' => 'cliente@auracup.com',
            'password' => Hash::make('segredo123'),
            'is_attendant' => false,
        ]);

        $this->postJson('/api/attendant/login', [
            'email' => 'cliente@auracup.com',
            'password' => 'segredo123',
        ])->assertUnauthorized();
    }

    public function test_lista_pedidos_priorizando_pendentes_e_ordem_de_chegada(): void
    {
        $product = Product::firstOrFail();

        $completed = $this->createOrder($product, OrderStatus::DELIVERED, 4);
        $pendingOld = $this->createOrder($product, OrderStatus::PENDING, 3);
        $pendingNew = $this->createOrder($product, OrderStatus::PENDING, 1);

        $this->actingAs($this->attendant, 'sanctum')
            ->getJson('/api/attendant/orders')
            ->assertOk()
            ->assertJsonPath('orders.0.id', $pendingOld->id)
            ->assertJsonPath('orders.1.id', $pendingNew->id)
            ->assertJsonPath('orders.2.id', $completed->id);
    }

    public function test_atendente_consegue_editar_concluir_e_cancelar_pedido(): void
    {
        $espresso = Product::where('name_en', 'Expresso Artesanal')->firstOrFail();
        $cappuccino = Product::whereKeyNot($espresso->id)->firstOrFail();
        $order = $this->createOrder($espresso, OrderStatus::PENDING, 1);

        $this->actingAs($this->attendant, 'sanctum')
            ->patchJson("/api/attendant/orders/{$order->id}", [
                'table_number' => 9,
                'status' => OrderStatus::PREPARING->value,
                'items' => [
                    ['product_id' => $cappuccino->id, 'quantity' => 2],
                ],
            ])
            ->assertOk()
            ->assertJsonPath('order.table_number', 9)
            ->assertJsonPath('order.status', OrderStatus::PREPARING->value)
            ->assertJsonPath('order.total_price', $cappuccino->price * 2);

        $this->assertDatabaseHas('order_items', [
            'order_id' => $order->id,
            'product_id' => $cappuccino->id,
            'quantity' => 2,
            'price' => $cappuccino->price,
        ]);

        $this->actingAs($this->attendant, 'sanctum')
            ->postJson("/api/attendant/orders/{$order->id}/complete")
            ->assertOk()
            ->assertJsonPath('order.status', OrderStatus::DELIVERED->value);

        $this->actingAs($this->attendant, 'sanctum')
            ->postJson("/api/attendant/orders/{$order->id}/cancel")
            ->assertOk()
            ->assertJsonPath('order.status', OrderStatus::CANCELED->value);
    }

    private function createOrder(Product $product, OrderStatus $status, int $hoursAgo): Order
    {
        $order = Order::create([
            'table_number' => $hoursAgo,
            'status' => $status,
            'total_price' => $product->price,
        ]);

        $order->products()->attach($product->id, [
            'quantity' => 1,
            'price' => $product->price,
        ]);

        $order->forceFill([
            'created_at' => now()->subHours($hoursAgo),
            'updated_at' => now()->subHours($hoursAgo),
        ])->save();

        return $order;
    }
}
