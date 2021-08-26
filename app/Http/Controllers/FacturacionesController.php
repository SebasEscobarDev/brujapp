<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\FacturacionEstado;
use App\Models\Facturacion;
use App\Models\Moneda;
use App\Models\Semana;
use App\Models\Contacto;
use App\Models\User;
use App\Models\Dato;
use App\Models\Foto;
use App\Models\Estadof;
use File;

class FacturacionesController extends Controller
{
  //
  public function index(Request $req){
    if( Auth::user() ){
      $login;
      $admin;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }

      if( $req->from ){
        $from =  $req->from;
        $to =  $req->to;
      }else{
        $fecha = Semana::where(['active' => 1])->first();
        if( $fecha ){
          $from = Carbon::parse($fecha->Inicio);
          $to = Carbon::parse($fecha->Fin);
        }else{
          $from = Carbon::now();
          $to = Carbon::now();
        }
      }

      if( $login >= 2 ){
        $admin = 0;
        $facturaciones = Facturacion::whereBetween('created_at', [$from, $to])
          ->where('user_id', Auth::user()->id)
          ->with('user')
          ->with('contacto')
          ->with('estado')
          ->with('dato')
          ->get();
        $contactos = Contacto::whereHas('maestro', function($q){
                              $q->where(['user_id' => Auth::user()->id]);
                            })->with('estado')->get();
        $datos = Dato::with('tipo')->get();
      }else{
        $admin=1;
        $facturaciones = Facturacion::whereBetween('created_at', [$from, $to])
          ->with('user')
          ->with('contacto')
          ->with('estado')
          ->with('dato')
          ->with('moneda')
          ->get();
        $contactos = Contacto::whereHas('maestro')->with('estado')->get();
        $datos = Dato::where(['active' => 1])->with('tipo')->get();
      }
      $semanas = Semana::all();
      $estados = Estadof::all();
      $maestros = User::where(['active' => 1])->get();
      $monedas = Moneda::all();

      $from = Carbon::parse($from)->timezone(config('app.timezone'))->format('H:i d-m-Y');
      $to = Carbon::parse($to)->timezone(config('app.timezone'))->format('H:i d-m-Y');

      return view('facturaciones.index', compact(
        'facturaciones', 
        'maestros', 
        'datos', 
        'contactos', 
        'estados', 
        'admin', 
        'semanas', 
        'from', 
        'to', 
        'monedas'
      ));
    }else{
      return view('login');
    }
  }

  public function getImagesFacturacion($facturacion_id){
    if( Auth::user() ){
      $facturacion = Facturacion::find($facturacion_id);
      if( $facturacion->foto ){
        return $facturacion->foto;
      }else{
        return $facturacion;
      }
    }else{
      return view('login');
    }
  }

  public function edit(Request $request){
    if( Auth::User() ){
      if($request->ajax()){
        $this->validate($request, [
          'user_id' => 'required',
          'contacto_id' => 'required',
          'dato_id' => 'required',
        ]);

        /* OBTENGO LA FACTURACIÓN */
        $facturacion = Facturacion::find($request->exo)
          ->with('user')
          ->with('contacto')
          ->with('dato')
          ->with('moneda')
          ->first();
        $facturacion->user_id = $request->user_id;
        $facturacion->contacto_id = $request->contacto_id;
        $facturacion->dato_id = $request->dato_id;
        $facturacion->envia = $request->envia;
        $facturacion->save();

        $facturacion->refresh();
        $facturacion->user;
        $facturacion->contacto;
        $facturacion->dato;
        $facturacion->dato->tipo->nombre;
        $facturacion->moneda;

        $logs='';

        /* RECORRO LAS IMAGENES PARA GUARDARLAS */
        if($request->hasfile('filenames')){

          $i = 0;
          $img=[];
          foreach($request->file('filenames') as $file){
            $file->move(public_path().'/uploads/', $img[] = '/uploads/img_'.Str::random(15).'.jpg');
            $i++;
          }
        }else{
          $logs .= 'Error al agregar Fotos<br>';
        }

        if( isset($facturacion->foto) ){
          $foto = Foto::find($facturacion->foto->id);
        }else{
          $foto = new Foto();
        }

        $foto->name = json_encode($img);
        $foto->url = json_encode($img);
        $foto->facturacion_id = $facturacion->id;
        if( $foto->save() ){
          $logs .= 'Se han Actualizado las fotos de la facturacion';
        }
        
        return response()->json([
          'yes' => 'Facturación Actualizada',
          'card' => $facturacion,
          'logs' => $logs,
          'exo' => 0
        ]);
      }else{
        Auth::logout();
        return view('login');
      }
    }else{
      return view('login');
    }
  }


  public function delete(Request $request){

    if( Auth::User() ){
      if( $request->ajax() ){

        $facturacionEstado = FacturacionEstado::where('facturacion_id', $request->id)->first();
        $oldState = $facturacionEstado->estado_id;
        $foto = Foto::where('facturacion_id', $request->id)->delete();
        $card = Facturacion::find($request->id);
        $facturacionEstado->delete();

        if( $card->delete() ){
          return response()->json([
                'yes' => 'Facturacion Eliminada Correctamente',
                'id' => $request->id,
                'oldstate' => $oldState
              ]);
        }else{
          return response()->json([
            'error' => 'Ha ocurrido un error inesperado',
            'msj' => 'don"t AJAX peticion request'
          ]);
        }
      }else{
        Auth::logout();
        return view('login');
      }
    }else{
      return view('login');
    }
  }


  public function create(Request $request)
  {
    if( Auth::User() ){
      if($request->ajax()){

        $this->validate($request, [
          'user_id' => 'required',
          'contacto_id' => 'required',
          'dato_id' => 'required',
        ]);

        $logs = '';

        /* CREO LA FACTURACIÓN */
        $facturacion = new Facturacion;
        $facturacion->active = 1;
        $facturacion->user_id = Auth::user()->id;
        $facturacion->contacto_id = $request->contacto_id;
        $facturacion->dato_id = $request->dato_id;
        $facturacion->moneda_id = 1;
        $facturacion->envia = $request->envia;
        $facturacion->save();

        /* CREO EL ESTADO DE LA FACTURACION (validarSiEsBorrador) */
        $facturacionEstado = new FacturacionEstado;
        $facturacionEstado->facturacion_id = $facturacion->id;
        $facturacionEstado->estadof_id = 1;
        $facturacionEstado->save();

        /* RECORRO LAS IMAGENES PARA GUARDARLAS */
        if($request->hasfile('filenames')){

          $i = 0;
          $img=[];
          foreach($request->file('filenames') as $file){
            $file->move(public_path().'/uploads/', $img[] = '/uploads/img_'.Str::random(15).'.jpg');
            $i++;
          }
        }else{
          $logs .= 'Error al agregar Fotos<br>';
        }

        if( isset($facturacion->foto) ){
          $foto = Foto::find($facturacion->foto->id);
        }

        if( isset($foto) ){}else{
          $foto = new Foto();
        }

        $foto->name = json_encode($img);
        $foto->url = json_encode($img);
        $foto->facturacion_id = $facturacion->id;
        if( $foto->save() ){
          $logs .= 'Se han Actualizado las fotos de la facturacion';
        }

        // $userName = User::find($request->user_id);
        // $contactoName = Contacto::find($request->contacto_id);

        // $facturacion = Facturacion::where('id', $facturacion->id)
        //   ->with('user')
        //   ->with('contacto')
        //   ->with('dato')
        //   ->with('moneda')
        //   ->get();¨

        $facturacion->refresh();

        $facturacion->user;
        $facturacion->contacto;
        $facturacion->dato;
        $facturacion->dato->tipo->nombre;
        $facturacion->moneda;

        return response()->json([
          'yes' => 'Agregado Correctamente',
          'card' => $facturacion,
          'logs' => $logs,
          'exo' => 0
        ]);
      }else{
        Auth::logout();
        return view('login');
      }
    }else{
      return view('login');
    }
  }


  public function deleteImage(Request $req){
    if( Auth::user() ){
      if( $req->ajax() ){
        $this->validate($req, [
          'cardid' => 'required',
          'name' => 'required',
          'url' => 'required'
        ]);
        $msj='';
        $fotos = Foto::where('facturacion_id', $req->cardid)->first();
        $allFotos = json_decode($fotos->url);
        $pos = array_search( $req->url, $allFotos);
        if( $pos >= 0 ){
          $delete = File::delete(public_path($req->url));
          if( $delete ){
            array_splice($allFotos, $pos, 1); 
            $msj.='Imagen Eliminada!';
          }
        }
        $fotos->url = $allFotos;
        $fotos->name = $allFotos;
        if( $fotos->save() ){
          return response()->json([
            'yes' => $msj
          ]);
        }
        // $foto->delete();
        // $fotoPath = str_replace('storage', 'public', $foto->url);
        // Storage::delete($fotoPath);
      }
    }
  }


  public function postImage(Request $request){
    if( Auth::User() ){
      if($request->ajax()){
         $this->validate($request, [
          'user_id' => 'required',
          'contacto_id' => 'required',
          'dato_id' => 'required',
        ]);
        /* RECORRO LAS IMAGENES PARA GUARDARLAS */
        if($request->hasfile('filenames')){

          $i = 0;
          $img=[];
          foreach($request->file('filenames') as $file){
            $file->move(public_path().'/uploads/', $img[] = '/uploads/img_'.Str::random(15).'.jpg');
            $i++;
          }
        }else{
          return response()->json([
            'error' => 'Error al agregar Fotos',
          ]);
        }

        $facturacion = Facturacion::find($request->facturacion_id);

        if( isset($facturacion->foto) ){
          $foto = Foto::find($facturacion->foto->id);
        }else{
          $foto = new Foto();
        }

        $foto->name = json_encode($img);
        $foto->url = json_encode($img);
        $foto->facturacion_id = $facturacion->id;
        if( $foto->save() ){
          return response()->json([
            'yes' => 'Se han Actualizado las fotos de la facturacion'
          ]);
        }

      }else{
        Auth::logout();
        return view('login');
      }
    }else{
      return view('login');
    }
  }

  public function getFotos($facturacion_id){
    $facturacion = Facturacion::find($facturacion_id);
    return response()->json([
      'foto' => $facturacion->foto
    ]);
  }

  public function destroy(Foto $foto){
      $foto->delete();
      $fotoPath = str_replace('storage', 'public', $foto->url);
      Storage::delete($fotoPath);
      return back()->with('flash', 'Foto eliminada');
  }

  public function updateEstado(Request $req){
    if( Auth::user() ){
      if( $req->ajax() ){

        //state 1) = borrador
        //state 2) = revision
        //state 3) = aprobada
        //state 4) = rechazada
        $facturacion = Facturacion::find($req->facturacion_id);
        if( $req->state == 1 ){
          $facturacion->moneda_id = 1;
          $facturacion->valor_moneda = 0;
          $facturacion->valor_pesos = 0;
          $facturacion->descripcion = '';
        }else if( $req->state == 2 ){
          $facturacion->moneda_id = 1;
          $facturacion->valor_moneda = 0;
          $facturacion->valor_pesos = 0;
          $facturacion->descripcion = '';
        }else if( $req->state == 3 ){
          $facturacion->descripcion = '';
        }else if( $req->state == 4 ){
          $facturacion->moneda_id = 1;
          $facturacion->valor_moneda = 0;
          $facturacion->valor_pesos = 0;
        }
        $facturacion->save();

        $newEstado = FacturacionEstado::where('facturacion_id', $req->facturacion_id)->first();
        $newEstado->estadof_id = $req->state;
        if( $newEstado->save() ){
          return response()->json([
            'yes' => 'Se ha actualizado el estado'
          ]);
        }else{
          return response()->json([
            'no' => 'Ha ocurrido un error inesperado'
          ]);
        }
      }else{
        Auth::logout();
        return view('login');
      }
    }else{
      return view('login');
    }
  }

  public function search(Request $req){
    //contacto, dato, user,
    if( Auth::user() ){
      if( $req->ajax() ){
        /* LOGIN VALIDATE */
        $login;
        foreach( Auth::User()->roles as $rol ){
          $login = $rol->id;
        }
        $semana = Semana::where('active', 1)->first();
        $from = $semana->Inicio;
        $to = $semana->Fin;
        if( $login >= 2 ){
          //hacer busqueda de las facturaciones del maestro
          $search = Facturacion::whereBetween('created_at', [$from, $to])
            ->where('user_id', Auth::user()->id)
            ->where('valor_moneda', 'like', '%'.$req->value.'%')
            ->orWhere('valor_pesos', 'like', '%'.$req->value.'%')
            ->orWhereHas('contacto', function($q) use ($req) {
              $q->where('name', 'like', '%'.$req->value.'%');
            })
            ->orWhereHas('dato', function($q) use ($req) {
              $q->where('campos', 'like', '%'.$req->value.'%');
              $q->orWhereHas('tipo', function($qq) use ($req) {
                $qq->where('nombre', 'like', '%'.$req->value.'%');
              });
            })
            ->orWhereHas('user', function($q) use ($req) {
              $q->where('name', 'like', '%'.$req->value.'%');
            })
            ->orWhere('envia', 'like', '%'.$req->value.'%')
            ->with('contacto')
            ->with('user')
            ->with('estado')
            ->with('dato')
            ->get();

        }else{
          $search = Facturacion::whereBetween('created_at', [$from, $to])
            ->where('valor_moneda', 'like', '%'.$req->value.'%')
            ->orWhere('valor_pesos', 'like', '%'.$req->value.'%')
            ->orWhereHas('contacto', function($q) use ($req) {
              $q->where('name', 'like', '%'.$req->value.'%');
            })
            ->orWhereHas('dato', function($q) use ($req) {
              $q->where('campos', 'like', '%'.$req->value.'%');
              $q->orWhereHas('tipo', function($qq) use ($req) {
                $qq->where('nombre', 'like', '%'.$req->value.'%');
              });
            })
            ->orWhereHas('user', function($q) use ($req) {
              $q->where('name', 'like', '%'.$req->value.'%');
            })
            ->orWhere('envia', 'like', '%'.$req->value.'%')
            ->with('contacto')
            ->with('user')
            ->with('estado')
            ->with('dato')
            ->get();
          
        }
        return response()->json([
          'yes' => 'Busqueda de facturaciones',
          'search' => $search
        ]);
      }
    }
  }


  public function updateValor(Request $request){
    if( Auth::user() ){
      if( $request->ajax() ){
        $facturacion = Facturacion::where('id', $request->facturacion_id)->with('user')->first();
        $facturacion->valor_moneda = $request->valor_moneda;
        $facturacion->valor_pesos = $request->valor_pesos;
        $facturacion->moneda_id = $request->tipo_moneda;
        if( $facturacion->save() ){
          return response()->json([
            'yes' => 'Se ha actualizado el valor de la Facturación de '.$facturacion->user->name
          ]);
        }else{
          return response()->json([
            'no' => 'Ha ocurrido un error inesperado'
          ]);
        }
      }else{
        Auth::logout();
        return view('login');
      }
    }else{
      return view('login');
    }
  }

  public function updateRechazo(Request $request){
    if( Auth::user() ){
      if( $request->ajax() ){

        $facturacion = Facturacion::where('id', $request->facturacion_id)->with('user')->first();
        $facturacion->descripcion = $request->rechazo;
        $name = $facturacion->user->name;
        if( $facturacion->save() ){
          return response()->json([
            'yes' => 'Se ha actualizado la descripcion de la Facturación de '.$name
          ]);
        }else{
          return response()->json([
            'no' => 'Ha ocurrido un error inesperado'
          ]);
        }
      }else{
        Auth::logout();
        return view('login');
      }
    }else{
      return view('login');
    }
  }

}
