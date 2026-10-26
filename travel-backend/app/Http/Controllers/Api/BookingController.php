<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Package;
use App\Models\TravelOffer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $user = AuthController::userFromRequest($request);
        if (!$user) {
            return response()->json(['message' => 'Please log in before booking.'], 401);
        }

        $validated = $request->validate([
            'packageId' => ['nullable', 'integer', 'exists:packages,id'],
            'offerId' => ['nullable', 'integer', 'exists:travel_offers,id'],
            'mode' => ['required', 'in:flights,stays,packages'],
            'travelDate' => ['required', 'date', 'after_or_equal:today'],
            'travelers' => ['required', 'integer', 'min:1', 'max:9'],
        ]);

        if (empty($validated['packageId']) && empty($validated['offerId'])) {
            return response()->json(['message' => 'Select a travel package or offer before booking.'], 422);
        }

        if (!empty($validated['packageId'])) {
            $item = Package::where('is_active', true)->findOrFail($validated['packageId']);
            if ($validated['travelers'] > $item->max_people) {
                return response()->json(['message' => "This package supports up to {$item->max_people} travelers."], 422);
            }
            $unitPrice = $item->price_per_person;
        } else {
            $item = TravelOffer::where('is_active', true)->findOrFail($validated['offerId']);
            $unitPrice = $item->price;
        }

        $booking = Booking::create([
            'user_id' => $user->id,
            'package_id' => $validated['packageId'] ?? null,
            'offer_id' => $validated['offerId'] ?? null,
            'booking_reference' => $this->reference(),
            'mode' => $validated['mode'],
            'total_amount' => $unitPrice * $validated['travelers'],
            'status' => 'confirmed',
            'travel_date' => $validated['travelDate'],
            'travelers' => $validated['travelers'],
        ]);

        return response()->json([
            'bookingReference' => $booking->booking_reference,
            'status' => $booking->status,
            'mode' => $booking->mode,
            'totalAmount' => '₹' . number_format($booking->total_amount),
            'travelDate' => $booking->travel_date->format('Y-m-d'),
            'travelers' => $booking->travelers,
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $user = AuthController::userFromRequest($request);
        if (!$user) return response()->json(['message' => 'Unauthorized.'], 401);

        $bookings = Booking::where('user_id', $user->id)->latest()->get()->map(fn (Booking $b) => [
            'bookingReference' => $b->booking_reference,
            'status' => $b->status,
            'mode' => $b->mode,
            'totalAmount' => '₹' . number_format($b->total_amount),
            'travelDate' => $b->travel_date->format('Y-m-d'),
            'travelers' => $b->travelers,
        ]);

        return response()->json($bookings);
    }

    private function reference(): string
    {
        do {
            $reference = 'FW-' . Str::upper(Str::random(6));
        } while (Booking::where('booking_reference', $reference)->exists());

        return $reference;
    }
}
