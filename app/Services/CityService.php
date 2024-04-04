<?php

namespace App\Services;

use App\Models\City;
use App\Models\Province;

/**
 * Class CityService.
 */
class CityService
{
    public function getCities()
    {
        $city = City::with('province')->orderBy('created_at', 'DESC')->get();

        return $city;
    }

    public function getProvince()
    {
        $province = Province::all();

        return $province;
    }

    public function storeCity(array $data)
    {
        City::create($data);
    }

    public function getCityById($id)
    {
        $city = City::findOrFail($id);

        return $city;
    }

    public function updateCity(City $city, array $data)
    {
        $city->province_id = $data['province_id'] ?? $city->province_id;
        $city->city_name = $data['city_name'] ?? $city->city_name;

        $city->save();

        return $city;
    }

    public function deleteCity(City $city)
    {
        $city->delete();
    }
}
