<?php

namespace App\Providers;

use App\Models\Citizen;
use App\Repositories\CitizenRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\CitizenRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
