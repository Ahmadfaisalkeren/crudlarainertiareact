<?php

namespace App\Services;

use App\Models\Province;
use Illuminate\Support\Facades\Storage;

/**
 * Class ProvinceService.
 */
class ProvinceService
{
    public function getProvinces()
    {
        $province = Province::orderBy('created_at', 'DESC')->get();

        return $province;
    }

    public function storeProvince(array $data)
    {
        Province::create($data);
    }

    public function getProvinceById($id)
    {
        $province = Province::findOrFail($id);

        return $province;
    }

    public function updateProvince(Province $province, array $data)
    {
        $province->province_name = $data['province_name'] ?? $province->province_name;

        $province->save();

        return $province;
    }

    public function deleteProvince(Province $province)
    {
        $province->delete();
    }
}
