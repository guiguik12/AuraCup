<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    public function orders(): BelongsToMany {
        return $this->belongsToMany(Order::class, 'order_items')
        ->withPivot('quantity', 'price', 'description')
        ->withTimestamps();
    }
    protected $fillable = [
        'category_id',
        'name_en',
        'name_pt',
        'description_en',
        'description_pt',
        'price',
        'image_url',
        'is_available',
    ];
}
