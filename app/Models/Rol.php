<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Rol extends Model
{
  use HasFactory;

  protected $table = "roles";
  public $timestamps = false;

  public function user(){
  	return $this->belongsToMany(User::class, 'roles_users', 'id', 'id');
  }
}
