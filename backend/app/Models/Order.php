<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    //
    public function products(): BelongsToMany {
        return $this->belongsToMany(Product::class, 'order_items')
        ->withPivot('quantity', 'price', 'description') // Avisa o Laravel que existem esses campos extras
        ->withTimestamps();
    }
    protected $fillable = [
        'table_number',
        'status',
        'total_price',
    ];

    protected function casts(): array {
        return [
            'status' => OrderStatus::class
        ];
    }

    /**
     * @param array<int, array{product_id:int, quantity:int}> $items
     */
    public function syncOrderItems(array $items): int
    {
        $totalPrice = 0;
        $itemsToSync = [];

        foreach ($items as $item) {
            $product = Product::findOrFail($item['product_id']);
            $quantity = (int) $item['quantity'];
            $totalPrice += $product->price * $quantity;

            $itemsToSync[$product->id] = [
                'quantity' => $quantity,
                'price' => $product->price,
                'description' => $product->description_pt ?? $product->name_pt,
            ];
        }

        $this->products()->sync($itemsToSync);
        $this->update(['total_price' => $totalPrice]);

        return $totalPrice;
    }
}
