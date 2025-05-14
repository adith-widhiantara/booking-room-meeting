<?php

namespace Database\Seeders;

use App\Models\Consumption;
use Illuminate\Database\Seeder;

class ConsumptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => \App\Enums\Consumption::SNACK_SIANG,
                'price' => 20000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => \App\Enums\Consumption::MAKAN_SIANG,
                'price' => 30000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => \App\Enums\Consumption::SNACK_SORE,
                'price' => 20000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Consumption::query()
            ->insert($data);
    }
}
