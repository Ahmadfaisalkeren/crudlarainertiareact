<?php

namespace App\Repositories;

use App\Models\Citizen;
use Illuminate\Support\Collection;

class CitizenRepository implements CitizenRepositoryInterface
{
    public function getById(string $id): ?Citizen
    {
        return Citizen::find($id);
    }

    public function getAll(): Collection
    {
        return Citizen::orderBy('created_at', 'DESC')->get();
    }

    public function create(array $data): Citizen
    {
        return Citizen::create($data);
    }

    public function update(string $id, array $data): Citizen
    {
        $citizen = Citizen::find($id);
        if ($citizen) {
            $citizen->update($data);
        }
        return $citizen;
    }

    public function delete(string $id): bool
    {
        return Citizen::destroy($id);
    }
}
