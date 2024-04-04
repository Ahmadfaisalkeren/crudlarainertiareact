<?php

namespace App\Repositories;

use App\Models\Citizen;
use Illuminate\Support\Collection;

interface CitizenRepositoryInterface
{
    public function getById(string $id): ?Citizen;

    public function getAll(): Collection;

    public function create(array $data): Citizen;

    public function update(string $id, array $data): Citizen;

    public function delete(string $id): bool;
}
