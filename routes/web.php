<?php

use App\Http\Controllers\CitizenController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProvinceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('citizen', [CitizenController::class, 'index'])->name('citizen.index');
    Route::post('citizen', [CitizenController::class, 'store'])->name('citizen.store');
    Route::put('citizen/{id}/update', [CitizenController::class, 'update'])->name('citizen.update');
    Route::delete('citizen/{id}/delete', [CitizenController::class, 'destroy'])->name('citizen.destroy');
    Route::get('province', [ProvinceController::class, 'index'])->name('province.index');
    Route::post('province', [ProvinceController::class, 'store'])->name('province.store');
    Route::put('province/{id}/update', [ProvinceController::class, 'update'])->name('province.update');
    Route::delete('province/{id}/delete', [ProvinceController::class, 'destroy'])->name('province.destroy');
    Route::get('city', [CityController::class, 'index'])->name('city.index');
    Route::post('city', [CityController::class, 'store'])->name('city.store');
    Route::put('city/{id}/update', [CityController::class, 'update'])->name('city.update');
    Route::delete('city/{id}/delete', [CityController::class, 'destroy'])->name('city.destroy');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
