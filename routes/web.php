<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ConsumptionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group([
    'middleware' => ['auth', 'verified'],
], function () {
    Route::put('/booking/{booking}/{status}', [BookingController::class, 'updateStatus'])->name('booking.status');
    Route::resource('booking', BookingController::class)->only(['index', 'create', 'store', 'show']);

    Route::get('consumption', ConsumptionController::class)->name('consumption.index');
});

require __DIR__.'/auth.php';
