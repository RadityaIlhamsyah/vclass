<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Matkul;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EnrollMatkul>
 */
class EnrollMatkulFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::where('role', 'guru')->inRandomOrder()->first()->id,
            'matkul_id' => Matkul::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
