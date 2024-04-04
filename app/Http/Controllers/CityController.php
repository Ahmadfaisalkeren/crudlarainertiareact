<?php

namespace App\Http\Controllers;

use App\Models\City;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CityService;
use App\Http\Requests\City\CityStoreRequest;
use App\Http\Requests\City\CityUpdateRequest;

class CityController extends Controller
{
    protected $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index()
    {
        $cities = $this->cityService->getCities();
        $province = $this->cityService->getProvince();

        return Inertia::render('City/City', [
            'message' => 'City Fetched Successfully',
            'cities' => $cities,
            'province' => $province,
        ]);
    }

    public function store(CityStoreRequest $request)
    {
        $this->cityService->storeCity($request->validated());

        return response()->json(
            [
                'status' => 200,
                'message' => 'City Created Successfully',
            ],
            200,
        );
    }

    public function edit($id)
    {
        $city = City::findOrFail($id);

        return response()->json(
            [
                'city' => $city,
                'status' => 200,
                'message' => 'City Fetched Successfully',
            ],
            200,
        );
    }

    public function update(CityUpdateRequest $request, $id)
    {
        $city = City::findOrFail($id);

        $this->cityService->updateCity($city, $request->validated());

        return response()->json(
            [
                'message' => 'City Updated Successfully',
                'status' => 200,
                'City' => $city,
            ],
            200,
        );
    }

    public function destroy($id)
    {
        $city = City::findOrFail($id);
        $this->cityService->deleteCity($city);

        return response()->json(
            [
                'status' => 200,
                'message' => 'City Deleted Successfully',
            ],
            200,
        );
    }
}
