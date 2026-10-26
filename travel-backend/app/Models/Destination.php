<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'country', 'img', 'price_from', 'note', 'tag', 'is_trending',
    ];

    protected $casts = [
        'is_trending' => 'boolean',
    ];

    public function packages(): HasMany
    {
        return $this->hasMany(Package::class);
    }

    /** Formatted price for the API response, e.g. "₹34,999" */
    public function getPriceLabelAttribute(): string
    {
        return '₹' . number_format($this->price_from);
    }
}
