<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('travel_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('mode', ['flights', 'stays']);
            $table->string('title');
            $table->string('subtitle');
            $table->string('provider');
            $table->string('img');
            $table->unsignedInteger('price');
            $table->string('duration');
            $table->decimal('rating', 2, 1)->default(4.5);
            $table->json('details')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('travel_offers');
    }
};
