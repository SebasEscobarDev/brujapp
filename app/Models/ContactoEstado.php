<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Estado;

class ContactoEstado extends Model
{
  use HasFactory;
  protected $table = "contactos_estados";
	protected $fillable = ["contacto_id", "estado_id"];

	public function estado(){
  	//return $this->belongsToMany(Estado::class, 'contactos_estados', 'contacto_id', 'estado_id');
  	return $this->belongsToMany(Estado::class);
	}
}
