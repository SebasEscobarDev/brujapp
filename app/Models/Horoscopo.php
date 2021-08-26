<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horoscopo extends Model
{
    use HasFactory;
    protected $casts = [
        'predicciones' => 'array'
    ];
}
