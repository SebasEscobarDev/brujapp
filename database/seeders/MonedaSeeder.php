<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Moneda;

class MonedaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Sin Moneda';
    $moneda->short_name = '...';
    $moneda->save();

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Dolares';
    $moneda->short_name = 'USD';
    $moneda->save();

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Pesos Colombianos';
    $moneda->short_name = 'COP';
    $moneda->save();

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Pesos Chilenos';
    $moneda->short_name = 'CLP';
    $moneda->save();

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Pesos Méxicanos';
    $moneda->short_name = 'MX';
    $moneda->save();

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Pesos Argentinos';
    $moneda->short_name = 'ARS';
    $moneda->save();

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Bolivares';
    $moneda->short_name = 'VES';
    $moneda->save();

    $moneda = new Moneda;
    $moneda->active = 1;
    $moneda->name = 'Soles';
    $moneda->short_name = 'PEN';
    $moneda->save();
  }
}
