<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FacturacionEstado;
use App\Models\User;
use App\Models\Contacto;
use App\Models\Foto;
use App\Models\Moneda;
use Carbon\Carbon;


class Facturacion extends Model
{
    use HasFactory;
    protected $table = 'facturaciones';

    public function user(){
    	return $this->belongsTo(User::class);
    }

    // public function maestro(){
    //     return $this->belongsTo(User::class);
    // }

    public function contacto(){
    	return $this->belongsTo(Contacto::class);
    }

    public function foto(){
    	return $this->hasOne(Foto::class);
    }

    public function estado(){
    	return $this->belongsToMany(Estadof::class, 'facturacion_estado', 'facturacion_id', 'estadof_id');
    }

    public function dato(){
        return $this->belongsTo(Dato::class);
    }

    public function moneda(){
        return $this->belongsTo(Moneda::class);
    }


    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
    }

    public function getUpdatedAtAttribute($value){
        return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
    }
}
