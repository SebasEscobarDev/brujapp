<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\TipoDato;
use Carbon\Carbon;


class Dato extends Model
{
  use HasFactory;

  // public function maestros()
  // {
  //   //return $this->belongsToMany(User::class, 'maestros_datos', 'id', 'id');
  // 	return $this->belongsToMany(User::class, 'maestros_datos', 'dato_id', 'user_id');
  // }

  public function tipo()
  {
    return $this->belongsTo(TipoDato::class);
  }

  public function getCreatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }

  public function getUpdatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }
}
