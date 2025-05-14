<?php

namespace App\Http\Controllers;

use App\Models\Consumption;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConsumptionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $consumptions = Consumption::query()
            ->select('name', 'price')
            ->get()
            ->map(function ($consumption) {
                return [
                    'name' => $consumption->name,
                    'price' => (int) $consumption->price,
                ];
            });

        return response()->json([
            'consumptions' => $consumptions,
        ]);
    }
}
