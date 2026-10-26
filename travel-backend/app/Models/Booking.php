<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'package_id', 'offer_id', 'booking_reference', 'mode',
        'total_amount', 'status', 'travel_date', 'travelers',
    ];

    protected $casts = [
        'travel_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function offer(): BelongsTo
    {
        return $this->belongsTo(TravelOffer::class, 'offer_id');
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }
}
