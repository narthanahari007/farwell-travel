<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id', 'tag', 'name', 'img', 'days', 'max_people',
        'price_per_person', 'description', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function getPriceLabelAttribute(): string
    {
        return '₹' . number_format($this->price_per_person);
    }

    public function getDaysLabelAttribute(): string
    {
        return $this->days . ' days';
    }

    public function getPeopleLabelAttribute(): string
    {
        return $this->max_people . ' adults';
    }
}
