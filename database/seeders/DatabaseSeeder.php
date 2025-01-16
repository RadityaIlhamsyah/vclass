<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        User::factory()->create([
            'nama_user' => 'Taufik Hidayat',
            'npm' => '1012244890',
            'role' => 'guru',
            'username' => 'taufik',
            'email' => 'taufik@gmail.com',
        ]);

        $this->call([
            MatkulSeeder::class,
            PertemuanSeeder::class,
            TugasSeeder::class,
            ForumSeeder::class,
            EnrollMatkulSeeder::class
        ]);
    }
}
