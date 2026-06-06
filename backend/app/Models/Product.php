<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    public function orders(): BelongsToMany {
        return $this->belongsToMany(Order::class, 'order_items')
        ->withPivot('quantity', 'price')
        ->withTimestamps();
    }
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'image_url',
        'is_available',
    ];
}
