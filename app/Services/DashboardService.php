<?php

namespace App\Services;

use App\Models\Citizen;
use App\Models\City;
use App\Models\Province;

/**
 * Class DashboardService.
 */
class DashboardService
{
    public function getCitizens()
    {
        $citizens = Citizen::count();

        return $citizens;
    }

    public function getCities()
    {
        $cities = City::count();

        return $cities;
    }

    public function getProvinces()
    {
        $provinces = Province::count();

        return $provinces;
    }
}
