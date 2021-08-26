<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Rol;
use App\Models\Dato;
use App\Models\Contacto;
use Carbon\Carbon;

class User extends Authenticatable
{
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'name',
      'email',
      'password',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
      'password',
      'remember_token',
  ];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
      'email_verified_at' => 'datetime',
  ];

  public function roles(){
    return $this->belongsToMany(Rol::class, 'roles_users', 'user_id', 'rol_id');
  }

  public function datos()
  {
    return $this->belongsToMany(Dato::class, 'maestros_datos', 'user_id', 'dato_id');
  }

  public function contactos()
  {
    return $this->belongsToMany(Contacto::class, 'maestros_contactos', 'user_id', 'contacto_id');
  }

  public function getCreatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }

  public function getUpdatedAtAttribute($value){
    return Carbon::parse($value)->timezone(config('app.timezone'))->format('H:i d-m-Y');
  }

  /*
  public function datos()
  {
    //relacion para obtener el nombre del dato                  local_key,  foreign_key
    return $this->belongsToMany(Dato::class, 'maestros_datos', 'user_id', 'dato_id');
  }
  */
}
