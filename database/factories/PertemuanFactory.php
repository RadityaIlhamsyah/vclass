<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Matkul;
use App\Models\Pertemuan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pertemuan>
 */
class PertemuanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $matkul = Matkul::inRandomOrder()->first();

        if (!$matkul) {
            $matkul = Matkul::factory()->create();
        }

        static $pertemuanCounter = 1;
        if ($pertemuanCounter > 10) {
            $pertemuanCounter = 1;
        }

        $pertemuan = $pertemuanCounter;

        $pertemuanCounter++;

        return [
            'matkul_id' => $matkul->id,
            'pertemuan' => $pertemuan,
            'topik' => $this->faker->sentence,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
