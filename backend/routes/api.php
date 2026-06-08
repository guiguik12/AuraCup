<?php

use App\Http\Controllers\Attendant\AuthController as AttendantAuthController;
use App\Http\Controllers\Attendant\OrderController as AttendantOrderController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/demo', function () {
    return response()->json([
        'message' => 'Hello from the Laravel SQLite backend!',
        'data' => ['item1', 'item2', 'item3'],
    ]);
});

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);

Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);

Route::prefix('attendant')->group(function () {
    Route::post('/login', [AttendantAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AttendantAuthController::class, 'me']);
        Route::post('/logout', [AttendantAuthController::class, 'logout']);
        Route::get('/orders', [AttendantOrderController::class, 'index']);
        Route::get('/orders/{order}', [AttendantOrderController::class, 'show']);
        Route::patch('/orders/{order}', [AttendantOrderController::class, 'update']);
        Route::post('/orders/{order}/complete', [AttendantOrderController::class, 'complete']);
        Route::post('/orders/{order}/cancel', [AttendantOrderController::class, 'cancel']);
    });
});
