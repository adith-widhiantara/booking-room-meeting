<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()
            ->admin()
            ->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ]);

        User::factory()
            ->superAdmin()
            ->create([
                'name' => 'Super Admin User',
                'email' => 'superadmin@example.com',
            ]);
    }
}
