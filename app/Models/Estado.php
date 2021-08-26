<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Contacto;

class Estado extends Model
{
  use HasFactory;
  public $timestamps = false;

  //clase usada para guardar los estados a los que se asignará un contacto

  public function contacto()
  {
    //return $this->belongsToMany(User::class, 'maestros_datos', 'id', 'id');
  	return $this->belongsToMany(Contacto::class, 'contactos_estados', 'estado_id', 'contacto_id');
  }
}
