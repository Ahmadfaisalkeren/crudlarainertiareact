<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Citizen extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];
    protected $table = "citizens";
    protected $fillable = [
        'name',
        'pob',
        'dob',
        'gender',
        'address',
        'image',
        'city_id',
        'province_id'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }
}
