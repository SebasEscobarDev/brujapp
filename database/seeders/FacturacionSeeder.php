<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Facturacion;
use App\Models\User;
use App\Models\Contacto;
use Illuminate\Support\Str;

class FacturacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$dato = new Facturacion;		
		$dato->user_id = 3;
		$dato->contacto_id = Contacto::all()->random()->id;
		$dato->dolares = 300;
		$dato->save();
    }
}
