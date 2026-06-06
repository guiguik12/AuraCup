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
        ->withPivot('quantity', 'price') // Avisa o Laravel que existem esses campos extras
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

}
