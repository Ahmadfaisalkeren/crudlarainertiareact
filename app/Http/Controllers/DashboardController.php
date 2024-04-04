<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index()
    {
        $citizens = $this->dashboardService->getCitizens();
        $cities = $this->dashboardService->getCities();
        $provinces = $this->dashboardService->getProvinces();

        return Inertia::render('Dashboard', [
            'message' => 'Data Fetched Successfully',
            'citizens' => $citizens,
            'cities' => $cities,
            'provinces' => $provinces,
        ]);
    }
}
