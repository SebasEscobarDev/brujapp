<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\MaestroContacto;
use App\Models\Facturacion;
use App\Models\Foto;
use App\Models\FacturacionEstado;
use App\Models\RolUser;
use Hash;

class UsersController extends Controller
{
    //
  public function index(){
  	if( Auth::user() ){
  		/* LOGIN VALIDATE */
  		$login;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }
      if( $login >= 2 ){
      	Auth::logout();
        return view('login');
      }
      /* end login */
  		$datos = User::with('contactos')
  							->get();
  		return view('maestros.index', compact('datos'));
  	}else{
  		return view('login');
  	}
  }


  public function create(Request $request){

  	if( Auth::User() ){

    	if($request->ajax()){
    	//$this->validate($request, ['nombre' => 'required']);
	    	$obj = new User;
				$obj->name = $request->card['name'];
				$obj->email = $request->card['email'];
				$obj->active = 1;
				$obj->password = Hash::make($request->card['password']);
				//enviarEvento Broadcast con la $obj
				//if( $event ){}else{}
				if( $obj->save() ){

					$rolUser = new RolUser;
	        $rolUser->user_id = $obj->id;
	        $rolUser->rol_id = 3;
	        $rolUser->save();
					//event( DatoUpdate($obj) );
					//CardUpdate::
					return response()->json([
            'yes' => 'Agregado Correctamente',
            'card' => $obj,
            'exo' => 0
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
	    	$card = User::find($request->id);
				$card->name = $request->card['name'];
				$card->email = $request->card['email'];
				$card->password = Hash::make($request->card['password']);
				//if( $event ){}else{}
				if( $card->save() ){
					//event( DatoUpdate($card) );
					return response()->json([
            'yes' => 'Actualizado Correctamente',
            'card' => $card ,
            'exo' => $card->id
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
  			$user = User::find($request->maestro_id);
  			$user->active = ( ( $request->state == 1 ) ? 0 : 1 );
  			if( $user->save() ){
  				$user->refresh();
  				return response()->json([
            'yes' => 'Actualizado Correctamente',
            'id' => $user->id,
            'active' => $user->active
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


  public function delete(Request $request){

  	if( Auth::User() ){
    	if( $request->ajax() ){
  			$datosEliminados = "";
    		$user = User::find($request->id);

    		$contactoAsociado = MaestroContacto::where('user_id', $user->id);
    		if( $contactoAsociado->delete() ){
    			$datosEliminados .= "Se Eliminó un <b>contacto</b> Asociado<br>";
    		}

        // - Obtener Facturaciónes Del Contacto
        $facturaciones = Facturacion::select('id')->where('contacto_id', $user->id)->get();

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
              $datosEliminados .= "Se Eliminaron las facturaciones indexadas al contacto<br>";
            }

          }

        }

        $rol = RolUser::where('user_id', $user->id);
  			if( $rol->delete() ){
	    		$datosEliminados .= "Se Eliminó Un <b>Rol</b> del Usuario Indexado <br>";
  			}

    		if( $user->delete() ){

    			return response()->json([
		            'yes' => 'Eliminado Correctamente',
		            'id' => $request->id,
		            'msj' => $datosEliminados
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


  public function search(Request $request){
    if( Auth::user() ){
      if( $request->ajax() ){
        //hacer busqueda de todos los usuarios
        $search = User::where('name', 'like', '%'.$request->value.'%')
          ->orWhere('email', 'like', '%'.$request->value.'%')
          ->get();
        return response()->json([
          'yes' => 'Busqueda de maestros',
          'search' => $search
        ]);
      }
    }
  }

}

