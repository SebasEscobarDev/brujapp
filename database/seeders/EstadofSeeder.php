<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Estadof;

class EstadofSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //
      $estado = new Estadof;
    	$estado->name = 'En Borrador';
    	$estado->description = 'Facturación En Borrador';
    	$estado->clase = 'list-group-item-secondary';
    	$estado->save();

    	$estado = new Estadof;
    	$estado->name = 'En Revision';
    	$estado->description = 'Facturación En Revision';
    	$estado->clase = 'list-group-item-info';
    	$estado->save();

    	$estado = new Estadof;
    	$estado->name = 'Aprobado';
    	$estado->description = 'Facturación con recibo aprobada';
    	$estado->clase = 'list-group-item-success';
    	$estado->save();

    	$estado = new Estadof;
    	$estado->name = 'Rechazado';
    	$estado->description = 'Facturación con recibo rechazado';
    	$estado->clase = 'list-group-item-danger';
    	$estado->save();
    }
}
