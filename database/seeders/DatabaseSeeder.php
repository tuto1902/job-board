<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
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
        // User::factory(10)->create();

        User::factory()
        ->has(
            Post::factory()->count(9)
        )
        ->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory()
        ->has(
            Post::factory()->count(1)
        )
        ->create([
            'name' => 'Arturo',
            'email' => 'arturo@example.com',
        ]);
    }
}
