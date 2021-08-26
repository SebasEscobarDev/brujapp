<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            UserSeeder::class,
            //DatoSeeder::class,
        	//ContactoSeeder::class,
        	RolSeeder::class,
            RolUserSeeder::class,
            EstadoSeeder::class,
            EstadofSeeder::class,
            MonedaSeeder::class,
            //ContactoEstadoSeeder::class
        ]);
    }
}
