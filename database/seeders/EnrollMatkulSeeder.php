<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EnrollMatkul;
use App\Models\User;
use App\Models\Matkul;


class EnrollMatkulSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matkuls = Matkul::all();

        foreach ($matkuls as $matkul) {
            $siswaIds = User::where('role', 'guru')->inRandomOrder()->take(5)->pluck('id');

            foreach ($siswaIds as $siswaId) {
                EnrollMatkul::create([
                    'user_id' => $siswaId,
                    'matkul_id' => $matkul->id,
                ]);
            }
        }
    }
}
