<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('country');
            $table->string('img');
            $table->unsignedInteger('price_from'); // stored in smallest currency unit (paise)
            $table->string('note')->nullable();     // e.g. "5N / 6D"
            $table->string('tag')->nullable();       // e.g. "Trending", "↓ 18% this week"
            $table->boolean('is_trending')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};
