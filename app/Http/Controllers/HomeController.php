<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Semana;
use App\Models\Contacto;
use App\Models\Estado;
use App\Models\Estadof;
use App\Models\MaestroContacto;
use App\Models\FacturacionEstado;
use App\Models\Facturacion;

class HomeController extends Controller
{
  //
  public function index(){
  	if( Auth::User() ){
      $login;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }
      return redirect('contactos');

    }else{
  		return view('login');
  	}
  }

  public function chat(){
  	if( Auth::User() ){ 
  		return view('home.chat');
  	}else{
  		return view('login');
  	}
  }

  public function logout(){
    Auth::logout();
    return view('login');
  }

  public function date(){

    $maestros = User::where('id', '>', 1)->get(['id', 'name']);
    $maestros2 = User::where('id', '=', Auth::user()->id)->get(['id','name']);
    $getDateF = now()->subDays( (7) )->format('Y-m-d');

    return response()->json([
     'maestros' => $getDateF
    ]);
  }

  public function graficos(){
    if( Auth::User() ){ 
      /*
      -numero de contactos de un maestro semanal
      -facturación semanal por maestro
      -facturación total ( grafica comparativa entre maestros, numero de contactos y facturas )
      */

      $login;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }
      $user_id = Auth::user()->id;
      $maestros;
      $dias = 6;
      $admin;
      if( $login == 1 ){ // Super Admin || admin
        $admin = 1;
        $maestros = User::where('active',1)->get(['id', 'name']);
      }else if( $login >= 2 ){ // Maestros
        $admin=0;
        $maestros = User::where('id', Auth::user()->id)->get(['id','name']);
      }

      for ($i=0; $i < count($maestros); $i++) { 
        $datosDias = [];
        for( $y = 0; $y <= $dias; $y++ ){
          //estado = 3 facturaciones aprobadas
          $totalFacturacionesDia = Facturacion::where('user_id',$maestros[$i]->id)
            ->whereHas('estado', function($q) use ($dias,$y){
              $q->where(['estadof_id' => 3],['updated_at' => now()->subDays( ($dias-$y) )]);
            })
            ->whereDate('created_at', now()->subDays( ($dias-$y) ))
            ->get();
          $totalContactosDia = MaestroContacto::where('user_id',$maestros[$i]->id)
            ->whereDate('created_at', now()->subDays( ($dias-$y) ) )
            ->get();

          $getDateF = now()->subDays( ($dias-$y) )->format('y-m-d');
          $datosDias[] = [$getDateF => [$totalContactosDia->count(), $totalFacturacionesDia->count()] ];
        }
        $maestros[$i]['dias'] = $datosDias;
      }
      return view('graficos.index', compact(['maestros','admin']) );
    }else{
      return view('login');
    }
  }

  public function savesemanas(Request $req){
    if( Auth::User() ){
      if($req->ajax()){
        if( $req->id == 0 ){
          $semana = new Semana;
          $operacion = 'Creado';
        }else{
          $semana = Semana::find($req->id);
          $operacion = 'Actualizado';         
        }
        $semana->active = 0;
        $semana->inicio = $req->inicio;
        $semana->fin = $req->fin;
        
        if( $semana->save() ){
          //event( DatoUpdate($card) );
          //CardUpdate::
          return response()->json([
                  'yes' => $operacion.' Correctamente',
                  'semana' => $semana,
                  'id' => $req->id
                ]);
        }
      }//end peticion ajax
    }//end user loged
  }


  public function activesemanas(Request $req){
    if( Auth::User() ){
      if($req->ajax()){
        $updateSemana = Semana::where('active', 1)->update(['active'=>0]);
        $semana = Semana::find($req->id);     
        $semana->active = 1;
        if( $semana->save() ){
          return response()->json([
            'yes' => 'Actualizado Correctamente',
            'semana' => $semana,
            'id' => $req->id
          ]);
        }
      }//end peticion ajax
    }//end user loged
  }

  public function deletesemanas(Request $req){
    if( Auth::User() ){
      if($req->ajax()){
        $semana = Semana::find($req->id);     
        if( $semana->delete() ){
          return response()->json([
            'yes' => 'Eliminado Correctamente',
            'id' => $req->id
          ]);
        }
      }//end peticion ajax
    }//end user loged
  }

}
