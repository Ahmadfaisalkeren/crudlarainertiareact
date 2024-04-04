<?php

namespace Database\Seeders;

use App\Models\Citizen;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CitizenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            Citizen::create([
                'id' => Str::uuid(), // Use Str::uuid() to generate UUIDs
                'name' => 'Citizen ' . $i,
                'pob' => 'City ' . $i,
                'dob' => now()->subYears(25)->addDays($i), // Adjust the date of birth as needed
                'gender' => $i % 2 == 0 ? 'male' : 'female', // Assign genders alternately
                'address' => 'Address ' . $i,
                'image' => 'https://via.placeholder.com/150', // Provide a placeholder image URL
            ]);
        }
    }
}
