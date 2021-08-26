<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Rol;
use App\Models\User;


class RolUser extends Model
{
    use HasFactory;

    protected $table = "roles_users";
    
    /*
    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function rol()
    {
        return $this->belongsToMany(Rol::class);
    }
    */
}
