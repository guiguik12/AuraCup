<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

Route::get('/demo', function () {
    return response()->json([
        'message' => 'Hello from the Laravel SQLite backend!',
        'data' => ['item1', 'item2', 'item3']
    ]);
});


// Rotas do Cardápio (Apenas leitura para as mesas)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);

// Rotas de Pedidos (Criação e acompanhamento)
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);