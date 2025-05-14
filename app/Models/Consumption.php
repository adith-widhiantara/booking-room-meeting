<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Consumption extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function bookings(): BelongsToMany
    {
        return $this->belongsToMany(Booking::class, 'booking_consumptions', 'consumption_id', 'booking_id');
    }
}
