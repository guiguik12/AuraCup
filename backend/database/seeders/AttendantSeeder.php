<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AttendantSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'atendente@auracup.com'],
            [
                'name' => 'Atendente AuraCup',
                'password' => 'Auracup@123',
                'is_attendant' => true,
            ]
        );
    }
}
