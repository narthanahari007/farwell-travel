<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TravelOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id', 'mode', 'title', 'subtitle', 'provider',
        'img', 'price', 'duration', 'rating', 'details', 'is_active',
    ];

    protected $casts = [
        'rating' => 'float',
        'details' => 'array',
        'is_active' => 'boolean',
    ];

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function getPriceLabelAttribute(): string
    {
        return '₹' . number_format($this->price);
    }
}
