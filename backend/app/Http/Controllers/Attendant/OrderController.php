<?php

namespace App\Http\Controllers\Attendant;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        $orders = Order::with('products')
            ->orderByRaw('CASE WHEN status = ? THEN 0 ELSE 1 END', [OrderStatus::PENDING->value])
            ->orderBy('created_at')
            ->orderBy('id')
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json([
            'order' => $order->load('products'),
        ]);
    }

    public function update(Request $request, Order $order): JsonResponse
    {
        $validated = $request->validate([
            'table_number' => 'sometimes|required|integer|min:1',
            'status' => ['sometimes', 'required', Rule::enum(OrderStatus::class)],
            'items' => 'sometimes|required|array|min:1',
            'items.*.product_id' => 'required_with:items|exists:products,id',
            'items.*.quantity' => 'required_with:items|integer|min:1',
        ]);

        DB::transaction(function () use ($order, $validated) {
            if (array_key_exists('table_number', $validated)) {
                $order->table_number = $validated['table_number'];
            }

            if (array_key_exists('status', $validated)) {
                $order->status = OrderStatus::from($validated['status']);
            }

            $order->save();

            if (array_key_exists('items', $validated)) {
                $order->syncOrderItems($validated['items']);
            }
        });

        return response()->json([
            'message' => 'Pedido atualizado com sucesso.',
            'order' => $order->fresh('products'),
        ]);
    }

    public function complete(Order $order): JsonResponse
    {
        $order->update([
            'status' => OrderStatus::DELIVERED,
        ]);

        return response()->json([
            'message' => 'Pedido concluido com sucesso.',
            'order' => $order->fresh('products'),
        ]);
    }

    public function cancel(Order $order): JsonResponse
    {
        $order->update([
            'status' => OrderStatus::CANCELED,
        ]);

        return response()->json([
            'message' => 'Pedido cancelado com sucesso.',
            'order' => $order->fresh('products'),
        ]);
    }
}
