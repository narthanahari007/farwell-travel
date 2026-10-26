<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\SearchLog;
use App\Models\TravelOffer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'mode' => ['required', 'in:flights,stays,packages'],
            'from' => ['nullable', 'string', 'max:120'],
            'to' => ['required', 'string', 'max:120'],
            'departDate' => ['required', 'date', 'after_or_equal:today'],
            'returnDate' => ['nullable', 'date', 'after_or_equal:departDate'],
            'travelers' => ['required', 'integer', 'min:1', 'max:9'],
        ]);

        SearchLog::create([
            'user_id' => $request->user()?->id,
            'mode' => $validated['mode'],
            'from_location' => $validated['from'] ?? null,
            'to_location' => $validated['to'],
            'depart_date' => $validated['departDate'],
            'return_date' => $validated['returnDate'] ?? null,
            'travelers' => $validated['travelers'],
        ]);

        if ($validated['mode'] === 'packages') {
            $results = Package::where('is_active', true)
                ->where(function ($query) use ($validated) {
                    $query->where('name', 'like', '%' . $validated['to'] . '%')
                        ->orWhereHas('destination', fn ($q) => $q->where('name', 'like', '%' . $validated['to'] . '%'));
                })
                ->take(10)->get()
                ->map(fn (Package $p) => [
                    'type' => 'package',
                    'id' => $p->id,
                    'tag' => $p->tag,
                    'name' => $p->name,
                    'img' => $p->img,
                    'days' => $p->days_label,
                    'people' => $p->people_label,
                    'price' => $p->price_label,
                    'per' => 'per person',
                    'description' => $p->description,
                ])->values();
        } else {
            $mode = $validated['mode'];
            $results = TravelOffer::with('destination')
                ->where('is_active', true)
                ->where('mode', $mode)
                ->whereHas('destination', fn ($q) => $q->where('name', 'like', '%' . $validated['to'] . '%'))
                ->take(10)->get()
                ->map(fn (TravelOffer $o) => [
                    'type' => $o->mode === 'flights' ? 'flight' : 'stay',
                    'id' => $o->id,
                    'title' => $o->title,
                    'subtitle' => $o->subtitle,
                    'provider' => $o->provider,
                    'img' => $o->img,
                    'price' => $o->price_label,
                    'per' => $o->mode === 'flights' ? 'per traveler' : 'per night',
                    'duration' => $o->duration,
                    'rating' => $o->rating,
                    'details' => $o->details ?? [],
                    'destinationId' => $o->destination_id,
                ])->values();
        }

        return response()->json([
            'query' => $validated,
            'results' => $results,
            'result_count' => $results->count(),
        ]);
    }
}
