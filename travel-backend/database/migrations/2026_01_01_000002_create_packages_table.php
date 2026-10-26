<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->nullable()->constrained()->nullOnDelete();
            $table->string('tag');          // e.g. "Beach", "Culture", "Adventure"
            $table->string('name');
            $table->string('img');
            $table->unsignedTinyInteger('days');
            $table->unsignedTinyInteger('max_people')->default(2);
            $table->unsignedInteger('price_per_person'); // smallest currency unit (paise)
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
