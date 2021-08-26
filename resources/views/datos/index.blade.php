@extends('layouts.master')

@section('container')
	
	@include('layouts.menu-top2', ['modelo' => 'Datos'])

	@php
	$login;
  foreach( Auth::User()->roles as $rol ){
    $login = $rol->id;
  }
  $maestro = 0;
  if( $login > 2 ){
  	$maestro = 1;
  }
  $mostrarMaestro = ( ($maestro == 1) ? " d-none" : "" );
	@endphp

	<script type="text/javascript">
		var tipos = {!! $tipos !!} ; //tipos de cuentas
		var datos = {!! $datos !!} ; //datos
	</script>

	<div class="container ios-panel bg-datos panel-active" id="panel-ios-1" data-master="{{$maestro}}">
	  <div class="row" id="principal-container">

	  	<div class="input-group mb-3">
			  <input type="text" class="form-control" placeholder="Buscar Datos" aria-label="Buscar Datos De Persona" aria-describedby="button-addon2">
		    <button class="btn ibg-primary float-right" type="button" id="searchCards">
		    	@include('svgs.bi-x', ['width'=>'1em', 'height'=>'1em'])
				</button>
			</div>

			@if( $admin == 1 )
		    @if( count($datos) > 0 )
					<div class="col-12 text-center menu-actives" id="btnStates">
						<button data-btnactive="1" class="active">
							<span>Activos</span>
							@include('svgs.checkmark', ['width'=>'30', 'height'=>'30'])
						</button>
						<button data-btnactive="0">
							<span>Inactivos</span>
							@include('svgs.closemark', ['width'=>'30', 'height'=>'30'])
						</button>
					</div>
				@endif

					<div class="btn-add-row">
						<button id="btnAddCards">
							@include('svgs.plus', ['width'=>'30', 'height'=>'30']) Agregar Datos
						</button>
					</div>

			@endif

		  <div id="selectionable-items" class="col-12">
		    <div class="list-group" id="cards-list-tab" role="tablist" data-newid="{{count($datos)}}">
		    	@if( count($datos) > 0 )
						@foreach( $datos as $card )
			      <button class="list-group-item list-group-item-action" id="list-home-{{$card->id}}" data-btnactive="{{$card->active}}">
			      	@if( $admin == 1 )
		      			<span class="active-mark">
									@include('svgs.checkmark', ['width'=>'40', 'height'=>'40'])
								</span>
								<span class="close-mark">
									@include('svgs.closemark', ['width'=>'40', 'height'=>'40'])
								</span>
							@endif
			      	<span class="d-none float-left icon-list-cards">
    						@include('svgs.bi-credit-card-2-front', ['width'=>'20', 'height'=>'20'])
							</span>
			      	<span class="infoMaster"><b>Tipo de cuenta: </b><span class="tipo_cuenta">{{ $card->tipo->nombre }}</span></span><br>
			      	@php
			      		$y = 0;
			      		$card->campos = json_decode($card->campos);
			      	@endphp
		      		<div class="dinamyc-camps">
				      	@foreach( json_decode($card->tipo->campos) as $campo )
				      		@if( isset($card->campos[$y]) )
				      			<span class="infoMaster"><b>{{ $campo }} : </b><span class="campo_<?=($y+1)?>">{{ $card->campos[$y] }}</span></span><br>
				      			@php $y++; @endphp
				      		@endif
				      	@endforeach
				      </div>
							
							<div class="info-dates d-none">
								<div class="dd-one">
									<span class="infoMaster">
										<b>Fecha de Creación: </b>
										<span class="created_at">{{$card->created_at}}</span>
									</span>
								</div>
								<div class="dd-two">
									<span class="infoMaster">
										<b>Ultima Actualización: </b>
										<span class="updated_at">{{$card->updated_at}}</span>
									</span>
								</div>
							</div>
			      </button>
						@endforeach
					@else
					<h2 class="info-txt">Esperando Datos.</h2>
					@endif
					<button class="list-group-item list-group-item-action d-none" id="list-home-0" data-btnactive="1">
		      	@if( $admin == 1 )
	      			<span class="active-mark">
								@include('svgs.checkmark', ['width'=>'40', 'height'=>'40'])
							</span>
							<span class="close-mark">
								@include('svgs.closemark', ['width'=>'40', 'height'=>'40'])
							</span>
						@endif
		      	<span class="d-none float-left icon-list-cards">
  						@include('svgs.bi-credit-card-2-front', ['width'=>'20', 'height'=>'20'])
						</span>
		      	<span class="infoMaster"><b>Tipo de cuenta: </b><span class="tipo_cuenta"></span></span><br>
		      	<div class="dinamyc-camps">
			      	<span class="infoMaster"><b></b><span class="campo_1"></span></span><br>
			      </div>
						<div class="info-dates d-none">
							<div class="dd-one">
								<span class="infoMaster">
									<b>Fecha de Creación: </b>
									<span class="created_at"></span>
								</span>
							</div>
							<div class="dd-two">
								<span class="infoMaster">
									<b>Ultima Actualización: </b>
									<span class="updated_at"></span>
								</span>
							</div>
						</div>
		      </button>
		    </div>
		  </div>


	  </div>
	</div>

	<div class="container ios-panel bg-datos" id="panel-ios-2">
	  <div class="row">
	    <div class="col-12" id="frmViewCards">
	      @include('datos.form')
	    </div>
	  </div>
	</div>

	<div class="container ios-panel bg-datos" id="panel-ios-3">
	  <div class="row">
	    <div class="col-12" id="add-data">
	      <!-- Copiar contenido de form. cuando abro el dato a agregar -->
	    </div>
	  </div>
	</div>

	<!-- Venatana para ver lo datos de la card -->
	@include('datos.show')

@endsection

@push('scripts')

	<script type="text/javascript" src="{{asset('/js/datos.js?v=0.3.9.0')}}"></script>

@endpush