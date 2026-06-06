<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Models\Product;

class ProductController extends Controller
{
    //
    public function index(): JsonResponse {
        $product = Product::all();

        return response()->json($product);
    }
}
