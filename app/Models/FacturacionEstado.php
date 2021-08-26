<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacturacionEstado extends Model
{
  use HasFactory;

  protected $table = "facturacion_estado";
	protected $fillable = ["facturacion_id", "estado_id"];

	public function estado(){
  	return $this->belongsToMany(Estadof::class);
	}
}
