<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Estado;
use Carbon\Carbon;

class Contacto extends Model
{
  use HasFactory;


  /*
  protected $casts = [
    'created_at' => 'datetime:H:i d.m.Y',
    'updated_at' => 'datetime:H:i d.m.Y',
  ];
  */

  public function getCreatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }

  public function getUpdatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }


  public function maestro()
  {
  	/* relacion para obtener el nombre del maestro 									local_key,	foreign_key */
  	return $this->belongsToMany(User::class, 'maestros_contactos', 'contacto_id', 'user_id');
  }

  public function estado()
  {
  	/* relacion para obtener el nombre del estado 									local_key,	foreign_key */
  	return $this->belongsToMany(Estado::class, 'contactos_estados', 'contacto_id', 'estado_id');
  }

  public function facturaciones()
  {
    return $this->hasMany(Facturacion::class);
  }

  public function etiquetas()
  {
    return $this->hasMany(Etiqueta::class);
  }

}
