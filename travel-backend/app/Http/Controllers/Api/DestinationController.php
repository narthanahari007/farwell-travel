<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\JsonResponse;

class DestinationController extends Controller
{
    public function trending(): JsonResponse
    {
        $destinations = Destination::where('is_trending', true)
            ->latest()->take(6)->get()->map(fn (Destination $d) => $this->format($d));
        return response()->json($destinations);
    }

    public function show(int $id): JsonResponse
    {
        $destination = Destination::findOrFail($id);
        return response()->json($this->format($destination));
    }

    private function format(Destination $d): array
    {
        return [
            'id' => $d->id,
            'name' => $d->name,
            'country' => $d->country,
            'img' => $d->img,
            'price' => $d->price_label,
            'note' => $d->note,
            'tag' => $d->tag,
            'description' => "Explore {$d->name} with Farwell's curated stays, flights and packages.",
        ];
    }
}
