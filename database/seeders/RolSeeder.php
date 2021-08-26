<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Rol::truncate();
    	$rol = new Rol;
    	$rol->name = 'Super Admin';
    	$rol->description = 'Super Administrador';
    	$rol->save();

    	$rol = new Rol;
    	$rol->name = 'Admin';
    	$rol->description = 'Administrador';
    	$rol->save();

    	$rol = new Rol;
    	$rol->name = 'Maestros';
    	$rol->description = 'Maestros';
    	$rol->save();
    }
}
