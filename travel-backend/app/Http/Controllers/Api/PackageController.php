<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;

class PackageController extends Controller
{
    public function index(): JsonResponse
    {
        $packages = Package::where('is_active', true)
            ->latest()->take(12)->get()->map(fn (Package $p) => $this->format($p));
        return response()->json($packages);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json($this->format(Package::where('is_active', true)->findOrFail($id)));
    }

    private function format(Package $p): array
    {
        return [
            'id' => $p->id,
            'destinationId' => $p->destination_id,
            'tag' => $p->tag,
            'name' => $p->name,
            'img' => $p->img,
            'days' => $p->days_label,
            'people' => $p->people_label,
            'price' => $p->price_label,
            'per' => 'per person',
            'description' => $p->description,
        ];
    }
}
