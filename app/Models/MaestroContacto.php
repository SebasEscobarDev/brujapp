<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class MaestroContacto extends Model
{
  use HasFactory;
  protected $table = "maestros_contactos";

  protected $fillable = ["user_id", "contacto_id"];

}
