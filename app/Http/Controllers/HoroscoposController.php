<?php

namespace App\Http\Controllers;
use App\Models\Horoscopo;
use Illuminate\Http\Request;

class HoroscoposController extends Controller
{
    //

	public function create( Request $request ){
		$horoscopo = Horoscopo::create($request->all());
		//$horoscopo->predicciones = $request->all();		
		return $horoscopo;

	}

}
