<?php

namespace App\Http\Services;

use App\Enums\Consumption;
use App\Http\Requests\Booking\StoreRequest;
use App\Models\Booking;
use App\Models\Unit;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class BookingService extends BaseService
{
    /**
     * @param  FormRequest  $request
     *
     * @throws Exception
     */
    public function store(StoreRequest|FormRequest $request): Booking
    {
        $unit = Unit::query()
            ->where('name', $request->unit)
            ->with(['rooms'])
            ->first();

        $room = $unit->rooms()
            ->where('name', $request->room)
            ->first();

        if ($request->number_of_guests > $room->capacity) {
            throw ValidationException::withMessages([
                'number_of_guests' => 'Jumlah tamu melebihi kapasitas ruangan. Maksimal '.$room->capacity.' orang.',
            ]);
        }

        // check booking conflict
        $conflict = Booking::query()
            ->where('room_id', $room->id)
            ->where('date', $request->date)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                    ->orWhereBetween('end_time', [$request->start_time, $request->end_time]);
            })
            ->exists();

        if ($conflict) {
            throw ValidationException::withMessages([
                'date' => 'Ruangan sudah dipesan pada waktu tersebut.',
            ]);
        }

        try {
            // start transaction
            DB::beginTransaction();

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
     * @return mixed
     */
    public function update(Model $model, FormRequest $request)
    {
        // TODO: Implement update() method.
    }

    /**
     * @return mixed
     */
    public function delete(Model $model)
    {
        // TODO: Implement delete() method.
    }
}
