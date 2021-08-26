<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Dato;
use App\Models\Facturacion;
use App\Models\User;
use App\Models\MaestroDato;
use App\Models\TipoDato;
use App\Models\Contacto;

class DatosController extends Controller
{
    //
  public function index(){
  	if( Auth::user() ){
  		/* LOGIN VALIDATE */
  		$login;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }
      $user_id = Auth::user()->id;

      $verBotones = 1;

      $admin = 0;

      if( $login >= 2 ){
      	$admin = 0;
	  		$datos = Dato::where('active',1)->with('tipo')->get();
	  		$contactos = Contacto::whereHas('maestro', function($q){
                              $q->where(['user_id' => Auth::user()->id]);
                            })->with('estado')->get();
      	$verBotones = 0;
      }else{
      	$admin = 1;
      	$verBotones = 1;
      	$datos = Dato::with('tipo')->get();
      	$contactos = Contacto::with('estado')->with('maestro')->get();
      }
      $tipos = TipoDato::all();

  		$maestros = User::where(['active' => 1])->get();
  		return view('datos.index', compact('datos', 'maestros', 'verBotones', 'contactos', 'tipos', 'admin'));
  	}else{
  		return view('login');
  	}
  }


  public function create(Request $req){
  	if( Auth::User() ){
    	if($req->ajax()){
    		if( $req->id == 0 ){
	    		$dato = new Dato;
					$operacion = 'Creado';
    		}else{
	    		$dato = Dato::find($req->id);
					$operacion = 'Actualizado';	    		
    		}
				$dato->active = 1;
	    	$dato->campos = json_encode($req->campos,JSON_UNESCAPED_UNICODE);
	    	//$dato->campos = $req->campos;
				$dato->tipo_id = $req->tipo_id;
				
				if( $dato->save() ){
					//event( DatoUpdate($card) );
					//CardUpdate::
					return response()->json([
			            'yes' => $operacion.' Correctamente',
			            'dato' => $dato
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

  public function edit(Request $request){

  	if( Auth::User() ){

    	if($request->ajax()){
    	//$this->validate($request, ['nombre' => 'required']);
	    	$card = Dato::find($request->id);
				$card->nombre = $request->card['nombre'];
				$card->identificacion = $request->card['identificacion'];
				$card->ciudad = $request->card['ciudad'];
				$card->estado = $request->card['estado'];
				$card->pais = $request->card['pais'];
				$card->direccion = $request->card['direccion'];
				$card->telefono = $request->card['telefono'];
				$card->tipo_cuenta = $request->card['tipo_cuenta'];
				//if( $event ){}else{}
				if( $card->save() ){
					//event( DatoUpdate($card) );
					return response()->json([
			            'yes' => 'Editado Correctamente',
			            'card' => $card ,
			            'exo' => $card->id
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


  public function delete(Request $request){

  	if( Auth::User() ){
    	if( $request->ajax() ){

    		$datosEliminados = "";
    		$dato = Dato::find($request->id);

        // - Obtener Facturaciónes Del Contacto
        $facturaciones = Facturacion::select('id')->where('dato_id', $dato->id)->get();

        if( !empty($facturaciones) ){
          foreach ( $facturaciones as $facturacion ) {
            // - Fotos de la Facturación
            $fotos = Foto::where('facturacion_id', $facturacion->id);
            if( $fotos->delete() ){
              $datosEliminados .= "Se Elimino una Foto Indexada<br>";
            }

            // - Estado de la facturación
            $estado = FacturacionEstado::where('facturacion_id', $facturacion->id);
            if( $estado->delete() ){
              $datosEliminados .= "Se Eliminó Un estado Indexado <br>";
            }

            // -  Borrar Facturación
            if( $facturacion->delete() ){
              $datosEliminados .= "Se Eliminaron las facturaciones indexadas al dato<br>";
            }

          }

        }//end facturaciones asociadas al dato

    		if( $dato->delete() ){

    			return response()->json([
            'yes' => 'Datos Eliminados Correctamente<br> '.$datosEliminados,
            'id' => $request->id
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

  public function updateEstado(Request $request){
  	if( Auth::user() ){
  		if( $request->ajax() ){
  			$dato = Dato::find($request->dato_id);
  			$dato->active = ( ( $request->state == 1 ) ? 0 : 1 );
  			if( $dato->save() ){
  				$dato->refresh();
  				return response()->json([
            'yes' => 'Actualizado Correctamente',
            'id' => $dato->id,
            'active' => $dato->active
          ]);
  			}else{
  				return response()->json([
            'error' => 'No Se Pudo Actualizar El Maestro',
            'active' => $request->state
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

  public function getdato($id){
  	$dato = Dato::find($id);
  	return response()->json([
  		'dato' => $dato
  	]);
  }

  public function savetypeaccount(Request $req){
  	if( Auth::User() ){
    	if($req->ajax()){
    		//$this->validate($request, ['nombre' => 'required']);
    		if( $req->id == 0 ){
	    		$datos = new TipoDato;
	    		$operacion = "Creado";
    		}else{
    			$datos = TipoDato::find($req->id);
	    		$operacion = "Actualizado";
    		}
	    	$datos->nombre = $req->nombre;
	    	$datos->campos = json_encode($req->campos,JSON_UNESCAPED_UNICODE);
	    	if( $datos->save() ){
	    		return response()->json([
            'yes' => $operacion.' Correctamente',
            'datos' => $datos,
            'id' => $datos->id
          ]);
	    	}
	    }
	  }
  }

  public function deletetypeaccount(Request $req){
  	if( Auth::User() ){
    	if($req->ajax()){
    		//$this->validate($request, ['nombre' => 'required']);
	    	$datos = TipoDato::find($req->id);
	    	if( $datos->delete() ){
	    		return response()->json([
            'yes' => 'Eliminado Correctamente'
          ]);
	    	}
	    }
	  }
  }


  public function search(Request $req){
  	if( Auth::user() ){
			if( $req->ajax() ){
	      	//hacer busqueda de todos los contactos
          $search = Dato::whereHas('tipo', function($q) use($req) {
            $q->where('nombre', 'like', '%'.$req->value.'%');
          })->with('tipo')->get();

          if( count($search) > 0 ){}else{
  	      	$search = Dato::where('campos', 'like', '%'.$req->value.'%')
  	      		->with('tipo')
  	      		->get();
          }
	      	return response()->json([
			  		'yes' => 'Busqueda de datos',
			  		'search' => $search
			  	]);
			}
		}
  }

}
