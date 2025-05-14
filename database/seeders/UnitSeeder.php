<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($index = 0; $index < 10; $index++) {
            /** @var Unit $unit */
            $unit = Unit::factory()->create();

            // Create 5 rooms for each unit using the RoomFactory
            for ($i = 0; $i < 5; $i++) {
                $unit->rooms()->create([
                    'name' => 'Room - '.$unit->name.' - '.($i + 1),
                    'capacity' => random_int(1, 100),
                ]);
            }
        }
    }
}
