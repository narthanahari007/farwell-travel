<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'mode', 'from_location', 'to_location',
        'depart_date', 'return_date', 'travelers',
    ];

    protected $casts = [
        'depart_date' => 'date',
        'return_date' => 'date',
    ];
}
