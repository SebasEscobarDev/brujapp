<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estadof extends Model
{
  use HasFactory;
  protected $table = "estadosf";

  public function facturacion()
  {
    //return $this->belongsToMany(User::class, 'maestros_datos', 'id', 'id');
  	return $this->belongsToMany(Facturacion::class, 'facturacion_estado', 'estado_id', 'facturacion_id');
  }
}
