<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('search_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('mode', ['flights', 'stays', 'packages']);
            $table->string('from_location')->nullable();
            $table->string('to_location');
            $table->date('depart_date');
            $table->date('return_date')->nullable();
            $table->unsignedTinyInteger('travelers')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('search_logs');
    }
};
