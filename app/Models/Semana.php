<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Semana extends Model
{
    use HasFactory;

  public function getCreatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }

  public function getUpdatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }

  public function getInicioAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }

  public function getFinAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }
}
