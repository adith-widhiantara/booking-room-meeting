<?php

namespace App\Http\Controllers;

use App\Http\Requests\Booking\StoreRequest;
use App\Http\Services\BookingService;
use App\Models\Booking;
use App\Models\Unit;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class BookingController extends Controller
{
    private BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {
        $bookings = Booking::query()
            ->with(['room', 'user', 'consumptions'])
            ->withSum('consumptions', 'price')
            ->get()
            ->map(function ($booking) {
                $booking->total_price = $booking->consumptions_sum_price * $booking->number_of_guests;

                return $booking;
            });

        return inertia('Booking/Index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        $units = Unit::query()
            ->with(['rooms'])
            ->get();

        return inertia('Booking/Create', [
            'units' => $units,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws Exception
     */
    public function store(StoreRequest $request): RedirectResponse
    {
        $this->bookingService->store($request);

        return redirect()
            ->route('booking.index')
            ->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking
            ->load(['room.unit', 'consumptions'])
            ->loadSum('consumptions', 'price');

        $booking->total_price = $booking->consumptions_sum_price * $booking->number_of_guests;
        $booking->consumptions_data = $booking->consumptions->pluck('name')->implode(', ');

        return inertia('Booking/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
