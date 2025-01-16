<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Matkul;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Matkul>
 */
class MatkulFactory extends Factory
{
    protected $model = Matkul::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dosenId = User::where('role', 'guru')->inRandomOrder()->first()->id;

        return [
            'dosen_id' => $dosenId,
            'nama_matkul' =>  $this->faker->word,
            'kelas' => 'Kelas ' . rand(1, 10),
            'kode_matkul' => 'MK' . rand(1000, 9999),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
