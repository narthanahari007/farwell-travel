<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('package_id')->nullable()->constrained()->nullOnDelete();
            $table->string('booking_reference')->unique(); // e.g. FW-8K2M1Q
            $table->enum('mode', ['flights', 'stays', 'packages']);
            $table->unsignedInteger('total_amount'); // smallest currency unit (paise)
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->date('travel_date');
            $table->unsignedTinyInteger('travelers')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
