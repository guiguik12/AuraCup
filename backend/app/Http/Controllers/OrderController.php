<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // 1. Validação simples dos dados vindos do Next.js
        $request->validate([
            'table_number' => 'required|integer',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);


        /*
        Exemplo de JSON da requisição POST:
        {
            "table_number": 5,
            "items": [
                {
                "product_id": 1,
                "quantity": 2
                },
                {
                "product_id": 4,
                "quantity": 1
                }
            ]
        }
        */

        // Usamos uma Transaction do Banco para garantir que se algo falhar, nada seja salvo pela metade
        $order = DB::transaction(function () use ($request) {
            
            // 2. Criar o pedido (inicialmente com total 0)
            $order = Order::create([
                'table_number' => $request->table_number,
                'status' => OrderStatus::PENDING,
                'total_price' => 0, 
            ]);

            $totalPrice = 0;
            $itemsToAttach = [];

            // 3. Percorrer os itens enviados para calcular o preço real do momento
            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $totalPrice += $subtotal;

                // Monta o array para a tabela pivot (order_items)
                $itemsToAttach[$product->id] = [
                    'quantity' => $item['quantity'],
                    'price' => $product->price // Preço atualizado do produto
                ];
            }

            // 4. Vincula os produtos ao pedido na tabela pivot
            $order->products()->attach($itemsToAttach);

            // 5. Atualiza o valor total real do pedido
            $order->update(['total_price' => $totalPrice]);

            return $order;
        });

        // Retorna o pedido criado com status 201 (Created)
        return response()->json([
            'message' => 'Pedido realizado com sucesso!',
            'order' => $order->load('products') // Já carrega os itens juntos na resposta
        ], 201);
    }

    // Exibir o status de um pedido específico
    public function show($id): JsonResponse
    {
        $order = Order::with('products')->findOrFail($id);
        return response()->json($order);
    }
}
