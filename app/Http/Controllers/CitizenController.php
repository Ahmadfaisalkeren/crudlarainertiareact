<?php

namespace App\Http\Controllers;

use App\Models\Citizen;
use Illuminate\Http\Request;
use App\Services\CitizensService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Citizen\CitizenStoreRequest;
use App\Http\Requests\Citizen\CitizenUpdateRequest;
use Inertia\Inertia;

class CitizenController extends Controller
{
    protected $citizenService;

    public function __construct(CitizensService $citizenService)
    {
        $this->citizenService = $citizenService;
    }

    public function index()
    {
        $citizens = $this->citizenService->getCitizens();
        $cities = $this->citizenService->getCities();
        $provinces = $this->citizenService->getProvinces();

        return Inertia::render('Citizen/Citizen',[
            'message' => 'Citizen Fetched Successfully',
            'citizens' => $citizens,
            'cities' => $cities,
            'provinces' => $provinces,
        ]);
    }

    public function store(CitizenStoreRequest $request)
    {
        $this->citizenService->storeCitizen($request->validated());

        return response()->json(
            [
                'status' => 200,
                'message' => 'Citizen Created Successfully',
            ],
            200,
        );
    }

    public function edit($id)
    {
        $citizen = Citizen::findOrFail($id);

        return response()->json(
            [
                'citizen' => $citizen,
                'status' => 200,
                'message' => 'Citizen Fetched Successfully',
            ],
            200,
        );
    }

    public function update(CitizenUpdateRequest $request, $id)
    {
        $citizen = Citizen::findOrFail($id);

        $this->citizenService->updateCitizen($citizen, $request->validated());

        return response()->json(
            [
                'message' => 'Citizen Updated Successfully',
                'status' => 200,
                'Citizen' => $citizen,
            ],
            200,
        );
    }

    public function destroy($id)
    {
        $citizen = Citizen::findOrFail($id);
        $this->citizenService->deleteCitizen($citizen);

        return response()->json(
            [
                'status' => 200,
                'message' => 'Citizen Deleted Successfully',
            ],
            200,
        );
    }
}
