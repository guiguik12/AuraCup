<?php

use Illuminate\Support\Facades\Route;

Route::get('/demo', function () {
    return response()->json([
        'message' => 'Hello from the Laravel SQLite backend!',
        'data' => ['item1', 'item2', 'item3']
    ]);
});