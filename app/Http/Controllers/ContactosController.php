<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Contacto;
use App\Models\Semana;
use App\Models\User;
use App\Models\MaestroContacto;
use App\Models\ContactoEstado;
use App\Models\FacturacionEstado;
use App\Models\Estado;
use App\Models\Foto;
use App\Models\Facturacion;
use Response;


class ContactosController extends Controller
{
  //
  public function indexc(){
  	if( Auth::user() ){
  		/* LOGIN VALIDATE */
  		$login;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }

      $user_id = Auth::user()->id;
      $admin = 0;

      if( $login >= 2 ){
      	$admin = 0;
	  		$datos = Contacto::whereHas('maestro', function($q) use($user_id){
						$q->where(['user_id' => $user_id]);
					})
	  			->with('estado')->get();
      }else{
      	$admin = 1;
      	$datos = Contacto::with('estado')->with('maestro')->get();
      }


      $semanas = Semana::all();
  		$maestros = User::where(['active' => 1])->with('roles')->get();
  		$estados = Estado::all();
  		//$datos = User::with('datos')->with('contactos')->get();
  		return view('contactos.index', compact('datos', 'maestros', 'estados', 'admin', 'login', 'semanas'));
  	}else{
  		return view('login');
  	}
  }


  public function createc(Request $request){

  	if( Auth::User() ){

  		$login;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }



	    if($request->ajax()){
	    	//$this->validate($request, ['nombre' => 'required']);
	    	$card = new Contacto;
				$card->active = 1;
				$card->from = 'Master App';
				$card->to = $request->card['to'];
				$card->name = $request->card['name'];
				$card->prefix = $request->card['prefix'];
				$card->phone = $request->card['phone'];
				$card->fullnumber = intval((int)($request->card['prefix']."".$request->card['phone']));
				//enviarEvento Broadcast con la $card
				//if( $event ){}else{}
				if( $card->save() ){
					if( $login >= 2 ){
						$newEstado = new ContactoEstado;
						$newEstado->estado_id = 2;
						$newEstado->contacto_id = $card->id;
						$newEstado->save();

						$mcc = new MaestroContacto;
						$mcc->contacto_id = $card->id;
						$mcc->user_id = Auth::user()->id;
						$mcc->save();


					}else{
						$newEstado = new ContactoEstado;
						$newEstado->estado_id = 1;
						$newEstado->contacto_id = $card->id;
						$newEstado->save();
					}

					//event( DatoUpdate($card) );
					//CardUpdate::
					return response()->json([
			            'yes' => 'Nuevo Contacto Creado!',
			            'card' => $card,
			            'exo' => 0
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

  public function editc(Request $request){

  	if( Auth::User() ){
    	if($request->ajax()){
	    	//$this->validate($request, ['nombre' => 'required']);
		    $card = Contacto::find($request->id);
				$card->to = $request->card['to'];
				$card->prefix = $request->card['prefix'];
				$card->phone = $request->card['phone'];
				$card->name = $request->card['name'];
				$card->country = $request->card['country'];
				$card->city = $request->card['city'];
				$card->state = $request->card['state'];
				$card->fullnumber = intval((int)($request->card['prefix']."".$request->card['phone']));
				//if( $event ){}else{}
				if( $card->save() ){
					//event( DatoUpdate($card) );
					return response()->json([
            'yes' => 'Editado Correctamente',
            'card' => $card ,
            'exo' => $card->id
          ]);
				}
			}
		}else{
  		return view('login');
  	}
  }


  public function delete(Request $request){

  	if( Auth::User() ){
    	if( $request->ajax() ){

    		//eliminar datos asociados al contacto
    		$datosEliminados = "";

    		// - MaestroContacto
    		$maestro = MaestroContacto::where('contacto_id', $request->id)->delete();
    		if( $maestro ){
    			$datosEliminados .= "Se Eliminó la indexación con un <b>Maestro.</b><br>";
    		}
    		
    		// - ContactoEstado
    		$oldState = ContactoEstado::where('contacto_id',$request->id)->first();
    		$oldState = $oldState->estado_id;
    		$estado = ContactoEstado::where('contacto_id',$request->id)->delete();
    		if( $estado ){
    			$datosEliminados .= "Se Eliminó la indexación con un <b>Estado.</b><br>";
    		}
    		
    		// - Obtener Facturaciónes Del Contacto
    		$facturaciones = Facturacion::select('id')->where('contacto_id', $request->id)->get();

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

    		// - Borrar Contacto
    		$card = Contacto::find($request->id);
    		if( $card->delete() ){
    			$card->refresh();
    			return response()->json([
            'yes' => 'Contacto Eliminado Correctamente',
            'id' => $request->id,
            'msj' => $datosEliminados,
            'oldState' => $oldState
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

  public function addmaestro(Request $req){
  	if( Auth::user() ){
			if( $req->ajax() ){
				$card = MaestroContacto::where(['contacto_id' => $req->contacto_id])->first();
				if( $card ){
					$card->user_id = $req->user_id;
				}else{
					$card = new MaestroContacto;
					$card->contacto_id = $req->contacto_id;
					$card->user_id = $req->user_id;
				}

				if( $card->save() ){
					$actualizado = 2;
					$estado = ContactoEstado::where(['contacto_id' => $req->contacto_id])->first();
					if( $estado ){
					}else{
						$estado = new ContactoEstado;
						$estado->contacto_id = $req->contacto_id;
					}
					$oldstate = $estado->estado_id; 
					$estado->estado_id = $actualizado;
					$maestro = User::find($req->user_id);

					$es = Estado::find($estado->estado_id);
					if( $estado->save() ){
						return response()->json([
	            'yes' => 'Contacto enviado A: <b>'.$maestro->name.'</b>',
	            'user_id' => $req->user_id,
	            'contacto_id' => $req->contacto_id,
	            'clase' => $es->clase,
	            'state' => $es->id,
	            'oldstate' => $oldstate
	          ]);
					}

				}

			}else{
				Auth::logout();
  			return view('login');
			}
		}else{
  		return view('login');
		}
  }


  public function getmaestro(Request $req, $id){
  	if( Auth::user() ){
	  	if( $req->ajax() ){
	  		//$validateContacto = MaestroContacto::where(['contacto_id'=> $id])->first();
	  		$contacto = Contacto::find($id);

	  		//valido si existe la relacion y envio datos
	  		if( isset($contacto->maestro[0]) ){
	  			$msj = "tiene maestro";
	  			$contacto->maestro;
					return response()->json([
		        'yes' => 'yes',
		        'id' => $contacto->maestro[0]->id,
		        'name' => $contacto->maestro[0]->name
		      ]);
	  		}else{
	  			$msj = "No se ha asignado un Maestro";
	  			$contacto->maestro;
					return response()->json([
		        'yes' => 'yes',
		        'id' => 0,
		        'name' => $msj
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




  public function updateEstado(Request $req){
  	if( Auth::user() ){
			if( $req->ajax() ){
				$newEstado = ContactoEstado::where('contacto_id', $req->contacto_id)->first();
				$newEstado->estado_id = $req->state;
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

  /***********************/
  /*     routes Api     */
  /*********************/
  public function index(){
  	$contactos = Contacto::all()->with('maestro')->get();
  	$contactos->maestro;
  	return response()->json([
  		'contactos' => $contactos
  	]);
  }

  public function store(){
  	$card = new Contacto;
		$card->name = $request->get('name');
		$card->prefix = $request->get('prefix');
		$card->phone = $request->get('phone');
		//enviarEvento Broadcast con la $card
		//if( $event ){}else{}
		if( $card->save() ){
			$newEstado = new ContactoEstado;
			$newEstado->estado_id = 1;
			$newEstado->contacto_id = $card->id;
			$newEstado->save();


			$respuesta = Response::make(json_encode(['data'=>$card]),201)->header('Location','https://masterapk.sebasescobar.com/api/contactos/'.$card->id)->header('Content-Type','application/json');
			return $respuesta;

		}else{
			return response()->json([
				'error' => 'Ha ocurrido un error inesperado',
				'msj' => 'don"t AJAX peticion request'
			]);
		}
  }

  public function create(){
  	
  }

  public function show(){
  	
  }

  public function update(){
  	
  }

  public function destroy(){
  	
  }

  public function edit(){
  	
  }


  public function getcontacto($id){
  	$contacto = Contacto::find($id);
  	return response()->json([
  		'id' => $id,
  		'contacto' => $contacto,
  		'maestro' => $contacto->maestro[0]->name
  	]);
  }


  public function search(Request $req){
  	if( Auth::user() ){
			if( $req->ajax() ){
				/* LOGIN VALIDATE */
	  		$login;
	      foreach( Auth::User()->roles as $rol ){
	        $login = $rol->id;
	      }
	      if( $login >= 2 ){
	      	//hacer busqueda de los contactos del maestro

	      	$search = Contacto::whereHas('maestro', function($q) {
	  					$q->where(['user_id' => Auth::user()->id]);
	  				})
	      		->where('name', 'like', '%'.$req->value.'%')
	      		->orWhere('phone', 'like', '%'.$req->value.'%')
	      		->orWhere('fullnumber', 'like', '%'.$req->value.'%')
	      		->orWhere('state', 'like', '%'.$req->value.'%')
	      		->orWhere('city', 'like', '%'.$req->value.'%')
	      		->orWhere('country', 'like', '%'.$req->value.'%')
	      		->with('maestro')
	      		->with('estado')
	      		->get();
	      }else{
	      	//hacer busqueda de todos los contactos
	      	$search = Contacto::where('email', 'like', '%'.$req->value.'%')
	      		->orWhere('name', 'like', '%'.$req->value.'%')
	      		->orWhere('phone', 'like', '%'.$req->value.'%')
	      		->orWhere('fullnumber', 'like', '%'.$req->value.'%')
	      		->orWhere('state', 'like', '%'.$req->value.'%')
	      		->orWhere('city', 'like', '%'.$req->value.'%')
	      		->orWhere('country', 'like', '%'.$req->value.'%')
	      		->with('maestro')
	      		->with('estado')
	      		->get();
	      }
	      	return response()->json([
			  		'yes' => 'Busqueda de contactos',
			  		'search' => $search
			  	]);
			}
		}
  }


}

