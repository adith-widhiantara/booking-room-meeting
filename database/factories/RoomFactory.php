<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Room>
 */
class RoomFactory extends Factory
{
    protected $model = Room::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'capacity' => $this->faker->numberBetween(1, 100),
            'unit_id' => Unit::factory(), // Assuming you have a UnitFactory
        ];
    }
}
