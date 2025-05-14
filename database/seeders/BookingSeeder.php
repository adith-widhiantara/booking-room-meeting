<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Consumption;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $booking = Booking::factory()
            ->count(10)
            ->create();

        $booking->each(function ($booking) {
            $booking->consumptions()->attach(
                Consumption::inRandomOrder()->take(2)->pluck('id')->toArray()
            );
        });
    }
}
