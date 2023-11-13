<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test',
            'lastname' => 'User',
            'address' => '6th street 145',
            'phone' => '1150403020',
            'title' => 'Developer',
            'status' => 'Contact status message',
            'email' => 'a@a.com',
            'password' => '123456',
        ]);
    }
}
