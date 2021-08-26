<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Contacto;
use App\Models\Facturacion;
use App\Models\FacturacionEstado;
use App\Models\MaestroContacto;
use App\Models\Moneda;
use App\Models\User;
use App\Models\Semana;

class PerfilController extends Controller
{
    //
	public function index(Request $request){
		if( Auth::user() ){
			$login;
      $admin;
      foreach( Auth::User()->roles as $rol ){
        $login = $rol->id;
      }

      //definir fechas de la semana 
      // si la fecha viene por peticion POST HTTP, capturo los campos
      // from, to -> desde formulario
      if( $request->from ){
        $from =  $request->from;
        $to =  $request->to;
      }else{
      	//si no viene por POST HTTP consulto la Semana Activa
        $fecha = Semana::where(['active' => 1])->first();
        if( $fecha ){
          $from = Carbon::parse($fecha->Inicio);
          $to = Carbon::parse($fecha->Fin);
        }else{
          $from = Carbon::now();
          $to = Carbon::now();
        }
      }


			$monedas = Moneda::where('id', '>', 1)->get();
      if( $login >= 2 ){
        $admin = 0;
        $verAcumuladosySueldos = 1;

				$facturaciones = Facturacion::whereBetween('updated_at', [$from, $to])
					->where( 'user_id', Auth::user()->id )
					->with('user')
          ->with('contacto')
          ->with('estado')
          ->with('dato')
					->get();
				$contactos = MaestroContacto::where( 'user_id', Auth::user()->id )->get();
				$contactosFacturados = Facturacion::select('contacto_id')
																		->distinct()
																		->whereHas('estado', function($q){
															        $q->where(['estadof_id' => 3]);
															      })
															      ->where('user_id', Auth::user()->id)
															      ->get();
				$facturacionesEnBorrador = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 1);
															      })
															      ->where('user_id', Auth::user()->id)
																		->get() );
				$facturacionesEnRevision = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 2);
															      })
															      ->where('user_id', Auth::user()->id)
																		->get() );
				$facturacionesAprobadas = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
															      ->where('user_id', Auth::user()->id)
																		->get() );
				$facturacionesRechazadas = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 4);
															      })
															      ->where('user_id', Auth::user()->id)
																		->get() );
				$totalDolares = Facturacion::whereBetween('updated_at', [$from, $to])
																		->where('user_id', Auth::user()->id)
																		->where('moneda_id', '=', 2)
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
																		->get()
																		->sum('valor_moneda');

				$totalPesos = Facturacion::whereBetween('updated_at', [$from, $to])
																		->where('user_id', Auth::user()->id)
																		->where('moneda_id', '=', 3)
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
																		->get()
																		->sum('valor_pesos');

				//foreach para recorrer tipo de moneda para guardar facturaciones aprobadas por monedas
				$tableFacturaciones = [];
				foreach ( $monedas as $moneda ) {
					$tableFacturaciones[$moneda->id] = Facturacion::whereBetween('updated_at', [$from, $to])
						->where( 'user_id', Auth::user()->id )
						->whereHas('estado', function($q){
			        $q->where('estadof_id', '=', 3);
			      })
						->where('moneda_id', $moneda->id)
						->with('user')
						->with('contacto')
						->with('estado')
						->with('dato')
	          ->get();
				}
			}else{
				$admin = 1;
				$verAcumuladosySueldos = 0;
				$facturaciones = Facturacion::with('user')
          ->with('contacto')
          ->with('estado')
          ->with('dato')
          ->get();
				$contactos = MaestroContacto::all();
				$contactosFacturados = Facturacion::select('contacto_id')
																		->distinct()
																		->whereHas('estado', function($q){
															        $q->where(['estadof_id' => 3]);
															      })->get();
				$facturacionesEnBorrador = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 1);
															      })->get() );
				$facturacionesEnRevision = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 2);
															      })->get() );
				$facturacionesAprobadas = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })->get() );
				$facturacionesRechazadas = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 4);
															      })->get() );
				$totalDolares = Facturacion::whereBetween('updated_at', [$from, $to])
																		->where('moneda_id', '=', 2)
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
																		->get()
																		->sum('valor_moneda');

				$totalPesos = Facturacion::whereBetween('updated_at', [$from, $to])
																		->where('moneda_id', '=', 3)
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
																		->get()
																		->sum('valor_pesos');


				//foreach para recorrer tipo de moneda para guardar facturaciones aprobadas por monedas
				$tableFacturaciones = [];
				foreach ( $monedas as $moneda ) {
					$tableFacturaciones[$moneda->id] = Facturacion::whereBetween('updated_at', [$from, $to])
						->whereHas('estado', function($q){
			        $q->where('estadof_id', '=', 3);
			      })
						->where('moneda_id', $moneda->id)
						->with('user')
						->with('contacto')
						->with('estado')
						->with('dato')
	          ->get();
				}

			}
			$maestros = User::where('active',1)->get();
			$totalContactos = count($contactos);
			$contactosFacturados = count($contactosFacturados);
			$contactosNoFacturados = $totalContactos - $contactosFacturados;
			$userName = Auth::user()->name;



			$mySueldoDolares = $totalDolares * .30;

			if( $totalDolares >= 1000 ){
				$claseMetaDolares = "pro";
				$mySueldoDolares = $totalDolares * .40;
			}else if( $totalDolares >= 700 ){
				$claseMetaDolares = "advanced";
			}else if( $totalDolares >= 300 ){
				$claseMetaDolares = "medium";
			}else if( $totalDolares >= 0 ){
				$claseMetaDolares = "bad";
			}

			$mySueldoPesos = $totalPesos * .30;

			if( $totalPesos >= 1000000 ){
				$claseMetaPesos = "pro";
				$mySueldoPesos = $totalPesos * .40;
			}else if( $totalPesos >= 700000 ){
				$claseMetaPesos = "advanced";
			}else if( $totalPesos >= 300000 ){
				$claseMetaPesos = "medium";
			}else if( $totalPesos >=0 ){
				$claseMetaPesos = "bad";
			}


			return view('perfil', compact(
				'userName',
				'facturaciones', 
				'contactos', 
				'admin', 
				'maestros', 
				'totalContactos', 
				'contactosFacturados',
				'contactosNoFacturados',
				'facturacionesEnBorrador',
				'facturacionesEnRevision',
				'facturacionesAprobadas',
				'facturacionesRechazadas',
				'totalDolares',
				'totalPesos',
				'claseMetaDolares',
				'mySueldoDolares',
				'claseMetaPesos',
				'mySueldoPesos',
				'monedas',
				'tableFacturaciones',
				'verAcumuladosySueldos'
			));
		}else{
			return view('login');
		}
	}

	public function getPerfil($id){

		if( Auth::user() ){

			$login;
	    $admin;
	    foreach( Auth::User()->roles as $rol ){
	      $login = $rol->id;
	    }

	    //definir fechas de la semana 
      // si la fecha viene por peticion POST HTTP, capturo los campos
      // from, to -> desde formulario
      
    	//si no viene por POST HTTP consulto la Semana Activa
      $fecha = Semana::where(['active' => 1])->first();
      if( $fecha ){
        $from = Carbon::parse($fecha->Inicio);
        $to = Carbon::parse($fecha->Fin);
      }else{
        $from = Carbon::now();
        $to = Carbon::now();
      }


	    $monedas = Moneda::where('id', '>', 1)->get();
	    $verAcumuladosySueldos = 1;
	    if( $login == 1 ){
	    	$admin=1;
	    	$facturaciones = Facturacion::whereBetween('updated_at', [$from, $to])
	    																->where( 'user_id', $id )->get();
				$contactos = MaestroContacto::where( 'user_id', $id )->get();
				$contactosFacturados = Facturacion::whereBetween('updated_at', [$from, $to])
																		->select('contacto_id')
																		->distinct()
																		->whereHas('estado', function($q){
															        $q->where(['estadof_id' => 3]);
															      })
															      ->where('user_id', $id)
															      ->get();
				$facturacionesEnBorrador = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 1);
															      })
															      ->where('user_id', $id)
																		->get() );
				$facturacionesEnRevision = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 2);
															      })
															      ->where('user_id', $id)
																		->get() );
				$facturacionesAprobadas = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
															      ->where('user_id', $id)
																		->get() );
				$facturacionesRechazadas = count( Facturacion::whereBetween('updated_at', [$from, $to])
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 4);
															      })
															      ->where('user_id', $id)
																		->get() );


				$totalDolares = Facturacion::whereBetween('updated_at', [$from, $to])
																		->where('user_id', $id)
																		->where('moneda_id', '=', 2)
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
																		->get()
																		->sum('valor_moneda');

				$totalPesos = Facturacion::whereBetween('updated_at', [$from, $to])
																		->where('user_id', $id)
																		->where('moneda_id', '=', 3)
																		->whereHas('estado', function($q){
															        $q->where('estadof_id', '=', 3);
															      })
																		->get()
																		->sum('valor_pesos');


				//foreach para recorrer tipo de moneda para guardar facturaciones aprobadas por monedas
				$tableFacturaciones = [];
				foreach ( $monedas as $moneda ) {
					$tableFacturaciones[$moneda->id] = Facturacion::whereBetween('updated_at', [$from, $to])
						->where( 'user_id', $id )
						->whereHas('estado', function($q){
			        $q->where('estadof_id', '=', 3);
			      })
						->where('moneda_id', $moneda->id)
						->with('user')
						->with('contacto')
						->with('estado')
						->with('dato')
	          ->get();
				}


				$maestros = User::where('active',1)->get();
				$totalContactos = count($contactos);
				$contactosFacturados = count($contactosFacturados);
				$contactosNoFacturados = count($contactos) - $contactosFacturados;
				$userName = User::find($id);
				$userName = $userName->name;

				if( $totalDolares > 1000 ){
					$claseMetaDolares = "pro";
					$mySueldoDolares = $totalDolares * .40;
				}else if( $totalDolares >= 700 ){
					$claseMetaDolares = "advanced";
					$mySueldoDolares = $totalDolares * .30;
				}else if( $totalDolares >= 400 ){
					$claseMetaDolares = "medium";
					$mySueldoDolares = $totalDolares * .30;
				}else if( $totalDolares >=0 ){
					$claseMetaDolares = "bad";
					$mySueldoDolares = $totalDolares * .30;
				}

				if( $totalPesos > 1000000 ){
					$claseMetaPesos = "pro";
					$mySueldoPesos = $totalPesos * .40;
				}else if( $totalPesos >= 700000 ){
					$claseMetaPesos = "advanced";
					$mySueldoPesos = $totalPesos * .30;
				}else if( $totalPesos >= 400000 ){
					$claseMetaPesos = "medium";
					$mySueldoPesos = $totalPesos * .30;
				}else if( $totalPesos >=0 ){
					$claseMetaPesos = "bad";
					$mySueldoPesos = $totalPesos * .30;
				}

				return view('perfil', compact(
					'userName',
					'facturaciones', 
					'contactos', 
					'admin', 
					'maestros', 
					'totalContactos', 
					'contactosFacturados',
					'contactosNoFacturados',
					'facturacionesEnBorrador',
					'facturacionesEnRevision',
					'facturacionesAprobadas',
					'facturacionesRechazadas',
					'totalDolares',
					'totalPesos',
					'claseMetaDolares',
					'mySueldoDolares',
					'claseMetaPesos',
					'mySueldoPesos',
					'monedas',
					'tableFacturaciones',
					'verAcumuladosySueldos'
				));
	    }else{
	    	Auth::logout();
	    	return view('login');
	    }
	  }else{
	  	return view('login');
	  }
	}
}
