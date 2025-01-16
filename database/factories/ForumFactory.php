<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Matkul;
use App\Models\Pertemuan;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Forum>
 */
class ForumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = User::where('role', 'siswa')->inRandomOrder()->first()->id;
        $matkulId = Matkul::inRandomOrder()->first()->id;
        $pertemuanId = Pertemuan::inRandomOrder()->first()->id;
        return [
            'user_id' => $userId,
            'matkul_id' => $matkulId,
            'pertemuan_id' => $pertemuanId,
            'pesan' => $this->faker->sentence,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
