<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];
    protected $table = "provinces";
    protected $fillable = [
        'province_name',
    ];

    public function city()
    {
        return $this->hasMany(City::class, 'id', 'province_id');
    }
}
