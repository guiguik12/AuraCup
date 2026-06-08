<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'table_number' => 'required|integer',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = DB::transaction(function () use ($request) {
            $order = Order::create([
                'table_number' => $request->table_number,
                'status' => OrderStatus::PENDING,
                'total_price' => 0,
            ]);

            $order->syncOrderItems($request->items);

            return $order;
        });

        return response()->json([
            'message' => 'Pedido realizado com sucesso!',
            'order' => $order->load('products'),
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $order = Order::with('products')->findOrFail($id);

        return response()->json($order);
    }
}
