<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Unit;
use Inertia\Response;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\ResponseFactory;
use App\Http\Services\BookingService;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Booking\StoreRequest;

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
     * @throws Exception
     */
    public function store(StoreRequest $request): RedirectResponse
    {
        $this->bookingService->store($request);

        return redirect()
            ->route('booking-rooms.index')
            ->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
