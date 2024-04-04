<?php

namespace App\Services;

use App\Models\Citizen;
use App\Models\City;
use App\Models\Province;
use Illuminate\Support\Facades\Storage;

/**
 * Class CitizensService.
 */
class CitizensService
{
    public function getCitizens()
    {
        $citizen = Citizen::with('city','province')->orderBy('created_at', 'DESC')->get();

        return $citizen;
    }

    public function getCities()
    {
        $cities = City::all();

        return $cities;
    }

    public function getProvinces()
    {
        $provinces = Province::all();

        return $provinces;
    }

    private function storeImage($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $imagePath = $image->storeAs('images/citizen', $imageName, 'public');

        return $imagePath;
    }

    public function storeCitizen(array $data)
    {
        if (isset($data['image'])) {
            $data['image'] = $this->storeImage($data['image']);
        }
        Citizen::create($data);
    }

    public function getCitizenById($id)
    {
        $citizen = Citizen::findOrFail($id);

        return $citizen;
    }

    private function updateImage(Citizen $citizen, $image = null)
    {
        if ($image && $image->isValid()) {
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('public/images/citizen', $imageName);

            if ($citizen->image) {
                Storage::delete('public/' . $citizen->image);
            }

            $citizen->image = str_replace('public/', '', $imagePath);
        }
    }

    public function updateCitizen(Citizen $citizen, array $data)
    {
        $citizen->name = $data['name'] ?? $citizen->name;
        $citizen->pob = $data['pob'] ?? $citizen->pob;
        $citizen->dob = $data['dob'] ?? $citizen->dob;
        $citizen->gender = $data['gender'] ?? $citizen->gender;
        $citizen->address = $data['address'] ?? $citizen->address;
        $citizen->city_id = $data['city_id'] ?? $citizen->city_id;
        $citizen->province_id = $data['province_id'] ?? $citizen->province_id;

        $this->updateImage($citizen, $data['image'] ?? null);

        $citizen->save();

        return $citizen;
    }

    private function deleteImage($imagePath)
    {
        if ($imagePath) {
            Storage::delete('public/' . $imagePath);
        }
    }

    public function deleteCitizen(Citizen $citizen)
    {
        $this->deleteImage($citizen->image);

        $citizen->delete();
    }
}
