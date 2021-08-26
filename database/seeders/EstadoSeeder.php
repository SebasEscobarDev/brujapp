<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Estado;

class EstadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
    	$estado = new Estado;
    	$estado->name = 'Nuevo';
    	$estado->description = 'Contacto nuevo';
    	$estado->clase = 'list-group-item-info';
    	$estado->save();

    	$estado = new Estado;
    	$estado->name = 'Pendiente';
    	$estado->description = 'Contacto asignado a un maestro';
    	$estado->clase = 'list-group-item-secondary';
    	$estado->save();

        $estado = new Estado;
        $estado->name = 'Efectivo';
        $estado->description = 'Contacto que ha empezado consulta con maestro';
        $estado->clase = 'list-group-item-success';
        $estado->save();

    	$estado = new Estado;
    	$estado->name = 'No Efectivo';
    	$estado->description = 'Contacto que se le escribe sin respuesta por su parte';
    	$estado->clase = 'list-group-item-warning';
    	$estado->save();

    	$estado = new Estado;
    	$estado->name = 'No Contesta';
    	$estado->description = 'Contacto que no sirve el número';
    	$estado->clase = 'list-group-item-danger';
    	$estado->save();
    }
}
