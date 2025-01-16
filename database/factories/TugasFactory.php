<?php

namespace Database\Factories;

use App\Models\Matkul;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Pertemuan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tugas>
 */
class TugasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::where('role', 'siswa')->inRandomOrder()->first()->id,
            'matkul_id' => Matkul::inRandomOrder()->first()->id,
            'pertemuan_id' => Pertemuan::inRandomOrder()->first()->id,
            'tugas' => 'Tugas ' . $this->faker->lexify('?????'),
            'status' => true,
            'nilai' => null,
            'deadline' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
