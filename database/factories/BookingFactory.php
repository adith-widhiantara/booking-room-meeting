<?php

namespace Database\Factories;

use App\Enums\StatusBooking;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $room = Room::query()->inRandomOrder()->first();
        $user = User::query()->inRandomOrder()->first();

        return [
            'room_id' => $room->id,
            'user_id' => $user->id,
            'date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'start_time' => $this->faker->dateTimeBetween('00:00:00', '12:00:00'),
            'end_time' => $this->faker->dateTimeBetween('12:00:01', '23:59:59'),
            'number_of_guests' => $this->faker->numberBetween(1, $room->capacity),
            'status' => StatusBooking::PENDING,
        ];
    }
}
