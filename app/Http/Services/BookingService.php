<?php

namespace App\Http\Services;

use Exception;
use App\Models\Unit;
use App\Models\Booking;
use App\Enums\Consumption;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;

final class BookingService extends BaseService
{
    /**
     * @param FormRequest $request
     * @return Booking
     * @throws Exception
     */
    public function store(FormRequest $request): Booking
    {
        try {
            // start transaction
            DB::beginTransaction();

            $unit = Unit::query()
                ->where('name', $request->unit)
                ->with(['rooms'])
                ->first();

            $room = $unit->rooms()
                ->where('name', $request->room)
                ->first();

            $booking = Booking::query()
                ->create([
                    'user_id' => auth()->id(),
                    'room_id' => $room->id,
                    'date' => $request->date,
                    'start_time' => $request->start_time,
                    'end_time' => $request->end_time,
                    'number_of_guests' => $request->number_of_guests,
                ]);

            $consumptions = [];

            if ($request->foods['snack_siang']) {
                $consumptions[] = Consumption::SNACK_SIANG;
            }

            if ($request->foods['makan_siang']) {
                $consumptions[] = Consumption::MAKAN_SIANG;
            }

            if ($request->foods['snack_sore']) {
                $consumptions[] = Consumption::SNACK_SORE;
            }

            $consumptionsData = \App\Models\Consumption::query()
                ->whereIn('name', $consumptions)
                ->get()
                ->pluck('id')
                ->toArray();

            $booking->consumptions()->attach($consumptionsData);

            // commit transaction
            DB::commit();

            return $booking;
        } catch (Exception $e) {
            // rollback transaction
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param Model $model
     * @param FormRequest $request
     * @return mixed
     */
    public function update(Model $model, FormRequest $request)
    {
        // TODO: Implement update() method.
    }

    /**
     * @param Model $model
     * @return mixed
     */
    public function delete(Model $model)
    {
        // TODO: Implement delete() method.
    }
}
