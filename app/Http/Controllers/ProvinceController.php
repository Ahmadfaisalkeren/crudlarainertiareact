<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Province;
use Illuminate\Http\Request;
use App\Services\ProvinceService;
use App\Http\Requests\Province\ProvinceStoreRequest;
use App\Http\Requests\Province\ProvinceUpdateRequest;

class ProvinceController extends Controller
{
    protected $provinceService;

    public function __construct(ProvinceService $provinceService)
    {
        $this->provinceService = $provinceService;
    }

    public function index()
    {
        $provinces = $this->provinceService->getProvinces();

        return Inertia::render('Province/Province',[
            'message' => 'Province Fetched Successfully',
            'provinces' => $provinces,
        ]);
    }

    public function store(ProvinceStoreRequest $request)
    {
        $this->provinceService->storeProvince($request->validated());

        return response()->json(
            [
                'status' => 200,
                'message' => 'Province Created Successfully',
            ],
            200,
        );
    }

    public function edit($id)
    {
        $province = Province::findOrFail($id);

        return response()->json(
            [
                'province' => $province,
                'status' => 200,
                'message' => 'Province Fetched Successfully',
            ],
            200,
        );
    }

    public function update(ProvinceUpdateRequest $request, $id)
    {
        $province = Province::findOrFail($id);

        $this->provinceService->updateProvince($province, $request->validated());

        return response()->json(
            [
                'message' => 'Province Updated Successfully',
                'status' => 200,
                'Province' => $province,
            ],
            200,
        );
    }

    public function destroy($id)
    {
        $province = Province::findOrFail($id);
        $this->provinceService->deleteProvince($province);

        return response()->json(
            [
                'status' => 200,
                'message' => 'Province Deleted Successfully',
            ],
            200,
        );
    }
}
