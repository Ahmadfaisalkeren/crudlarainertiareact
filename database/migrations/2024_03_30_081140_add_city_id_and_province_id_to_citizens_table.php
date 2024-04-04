<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('citizens', function (Blueprint $table) {
            $table->foreignUuid('city_id')->after('id');
            $table->foreignUuid('province_id')->after('city_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('citizens', function (Blueprint $table) {
            if (Schema::hasColumn('citizens', 'city_id', 'province_id')) {
                $table->dropColumn('city_id', 'province_id');
            }
        });
    }
};
