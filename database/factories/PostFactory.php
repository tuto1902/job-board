<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(nbWords: 4),
            'location' => fake()->address(),
            'employment_type' => 'other',
            'url' => fake()->url(),
            'company_name' => fake()->company(),
            'salary' => fake()->numberBetween(1000, 3000)
        ];
    }
}
