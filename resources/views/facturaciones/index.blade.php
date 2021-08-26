@extends('layouts.master')

@section('container')
	
	@include('layouts.menu-top2', ['modelo' => 'Facturaciones'])

	@php

  $clasy = ( ($admin == 0) ? "En borrador" : "En revisión" );
  $mostrarMaestro = ( ($admin == 0) ? " d-none" : "" );
  $maestro = ( ( $admin == 0 ) ? 1 : 0 );
	@endphp

	<div class="container ios-panel bg-facturaciones panel-active" id="panel-ios-1" data-master="{{$maestro}}">
	  <div class="row" id="principal-container">
	  	<div class="input-group mb-3">
			  <input type="text" class="form-control" placeholder="Buscar facturaciones" aria-label="Buscar facturaciones De Persona" aria-describedby="button-addon2">
		    <button class="btn ibg-primary float-right" type="button" id="searchCards">
		    	@include('svgs.bi-x', ['width'=>'1em', 'height'=>'1em'])
				</button>
			</div>
			<div class="col-12 masterTabs">
				<div class="row masterTabs-head justify-content-center">
					@foreach( $estados as $estado )
						@if( $estado->id == 1 && $admin )
						@else
						<button class="tab-head btn {{$estado->clase}}" data-state="{{$estado->id}}" data-name="{{$estado->name}}" data-active="<?=( ( $estado->id == 1 ) ? 1 : 0 );?>">
							<span>
							@if( $estado->id == 1 && $maestro == 1 )
								@include('svgs.chat-square-quote', ['width'=> 25 , 'height' => 25])
							@elseif( $estado->id == 2 )
								@include('svgs.chat-square-dots', ['width'=> 25 , 'height' => 25])
							@elseif( $estado->id == 3 )
								@include('svgs.checkmark', ['width'=> 25 , 'height' => 25])
							@elseif( $estado->id == 4 )
								@include('svgs.closemark', ['width'=> 25 , 'height' => 25])
							@endif
							</span>
						</button>
						@endif
					@endforeach
					<h2 class="col-12">{{$clasy}}</h2>
				</div>
			</div>

			<div class="col-12">
				<div class="row">
					<div class="col text-left poderes">
						<div class="row">
							<div class="col-12">
								<span style="margin-bottom: 3px; display: inline-block;">Desde:</span> {{$from}} <br> <span style="display: inline-block;">Hasta:</span> {{$to}}
							</div>
							<div class="col-12 icon-change-semanas-index" style="padding: 0px;">
								<button class="icon-change-semanas">
        					@include('svgs.calendar', ['width'=>25, 'height'=>25])
        				</button>
							</div>
							<div class="col-12 change-fechas">
								<form class="searched-fechas" method="get" action="{{route('facturaciones.desde.hasta')}}">
									<div class="form-group" style="margin-bottom: 0px">
						        <label>Fecha Inicio: </label>
						        <input type=datetime-local class="form-control" name="from" id="from" required="" placeholder="Ingrese Fecha de inicio">
						      </div>
						      <div class="form-group" style="margin-bottom: 0px">
						        <label>Fecha Final: </label>
						        <input type=datetime-local class="form-control" name="to" id="to" required="" placeholder="Ingrese Fecha final">
						      </div>
						      <div class="d-none">
						      	<input type="hidden" name="fromValue" id="fromValue" value="{{$from}}">
						      	<input type="hidden" name="toValue" id="toValue" value="{{$to}}">
						      </div>
						      <button type="subbmit" class="btn bg-white btnForm" id="updateSemanas" data-edit="0">
						        <span>Actualizar Registros</span>
						      </button>
						      <a href="#" class="btn btnForm" id="cerrarFechas">
										Cerrar
									</a>
						    </form>
						  </div>
						</div>
					</div>
				</div>
			</div>

			@if( $maestro )
			<div class="btn-add-row">
				<button id="btnAddCards">
					@include('svgs.plus', ['width'=>'30', 'height'=>'30']) Agregar Facturación
				</button>
			</div>
			@endif

		  <div id="selectionable-items" class="col-12">
		    <div class="list-group" id="cards-list-tab" role="tablist" data-newid="{{count($facturaciones)}}">
		    	@php 
	    		$countDolares = 0;
		    	$countContacts = 0; 

					$countBorrador = 0;
					$countEnRevision = 0;
					$countAprobados = 0;
					$countRechazados = 0;
			    @endphp
		    	@if( count($facturaciones) > 0 )
						@foreach( $facturaciones as $card )
						@php
							$countContacts++;
							$clase;
							$estadoId = 0;
							foreach ($card->estado as $estado ) {
								switch ($estado->id) {
									case 1:
										$countBorrador++;	
										break;
									case 2:
										$countEnRevision++;
										break;
									case 3:
										$countAprobados++;
										break;
									case 4:
										$countRechazados++;
										break;
								}
								$clase = $estado->clase;
								$estadoId = $estado->id;
							}
						@endphp
			      <button class="list-group-item list-group-item-action {{$clase}}" id="list-home-{{$card->id}}">
			      	<span class="d-none float-left icon-list-cards">
        				@include('svgs.facturate', ['width'=>25, 'height'=>25])
							</span>
							<span class="float-left num-card d-none">{{$countContacts}}</span>
							<div class="details-box">
			      		<span class="infoMaster{{$mostrarMaestro}}"><b>Maestro : </b><span class="d-none user_id">{{$card->user->id}}</span><span class="userName">{{ $card->user->name }}</span></span><br class="{{$mostrarMaestro}}">
								<span class="infoMaster"><b>Contacto : </b><span class="contacto_id d-none">{{$card->contacto->id}}</span><span class="contactoName">{{ $card->contacto->name }}</span></span><br>
								@php
								$newCampos = json_decode($card->dato->campos);
								@endphp
								<span class="infoMaster"><b>Datos : </b><span class="dato_id d-none">{{$card->dato->id}}</span><span class="datoName">{{ $newCampos[0] }} - {{ $card->dato->tipo->nombre }}</span></span><br>
								<span class="infoMaster"><b>Por donde envía: </b><span class="envia">{{$card->envia}}</span></span><br>
								@if( isset( $card->valor_pesos ) && $card->valor_pesos > 0 )
									<span class="infoMaster"><b>Tipo de Moneda : </b><span class="moneda_id d-none">{{$card->moneda->id}}</span><span class="moneda_name">{{ $card->moneda->name }}</span></span><br>
									<span class="infoMaster"><b>Valor Moneda: </b> <span class="short_name">({{$card->moneda->short_name}})</span><span class="valor_moneda"> $ {{number_format($card->valor_moneda,0)}}</span></span><br>
									<span class="infoMaster"><b>Valor en Pesos (COP) : </b><span class="valor_pesos"> $ {{number_format($card->valor_pesos,0)}}</span></span><br>
								@else
									<span class="infoMaster d-none"><b>Moneda : </b><span class="moneda_id d-none"></span><span class="moneda_name"></span></span><br class="d-none">
									<span class="infoMaster d-none"><b>Valor Moneda: </b> <span class="short_name"></span><span class="valor_moneda"></span></span><br class="d-none">
									<span class="infoMaster d-none"><b>Valor en Pesos (COP) : </b><span class="valor_pesos"></span></span><br class="d-none">
								@endif

								@if( !empty($card->descripcion) )
									<span class="infoMaster"><b>Motivo de rechazo: </b><span class="descripcion">{{$card->descripcion}}</span></span><br>
								@else
									<span class="infoMaster d-none"><b>Motivo de rechazo: </b><span class="descripcion"></span></span><br class="d-none">
								@endif
								<div class="info-dates">
									<div class="dd-one">
										<span class="infoMaster">
											<b>Fecha de Creación: </b>
											<span class="created_at">{{$card->created_at}}</span>
										</span>
									</div>
									<div class="dd-two">
										<span class="infoMaster">
											<b>Ultima Modificación: </b>
											<span class="updated_at">{{$card->updated_at}}</span>
										</span>
									</div>
								</div>
							</div>
			      </button>
						@endforeach
					@else


						<!-- HOME - 0 TO CLONE -->

						<button class="list-group-item list-group-item-action list-group-item-success d-none" id="list-home-0">
			      	<span class="d-none float-left icon-list-cards">
        				@include('svgs.facturate', ['width'=>25, 'height'=>25])
							</span>
							<span class="float-left num-card d-none"></span>
							<div class="details-box">
			      		<span class="infoMaster{{$mostrarMaestro}}"><b>Maestro : </b><span class="d-none user_id"></span><span class="userName"></span></span><br class="{{$mostrarMaestro}}">
								<span class="infoMaster"><b>Contacto : </b><span class="contacto_id d-none"></span><span class="contactoName"></span></span><br>
								<span class="infoMaster"><b>Datos : </b><span class="dato_id d-none"></span><span class="datoName"></span></span><br>
								<span class="infoMaster"><b>Por donde envía: </b><span class="envia"></span></span><br>
								<span class="infoMaster d-none"><b>Moneda : </b><span class="moneda_id d-none"></span><span class="moneda_name"></span></span><br class="d-none">
								<span class="infoMaster d-none"><b>Valor Moneda: </b> <span class="short_name"></span><span class="valor_moneda"></span></span><br class="d-none">
								<span class="infoMaster d-none"><b>Valor en Pesos (COP) : </b><span class="valor_pesos"></span></span><br class="d-none">
								<span class="infoMaster d-none"><b>Motivo de rechazo: </b><span class="descripcion"></span></span><br class="d-none">
								<div class="info-dates">
									<div class="dd-one">
										<span class="infoMaster">
											<b>Fecha de Creación: </b>
											<span class="created_at"></span>
										</span>
									</div>
									<div class="dd-two">
										<span class="infoMaster">
											<b>Ultima Modificación: </b>
											<span class="updated_at"></span>
										</span>
									</div>
								</div>
							</div>
			      </button>

					@endif
		    </div>
		  </div>




	  </div>
	</div>

	<div class="container ios-panel bg-facturaciones" id="panel-ios-2">
	  <div class="row">
	    <div class="col-12" id="frmViewCards">
	      @include('facturaciones.form')
	    </div>
	  </div>
	</div>

	<div class="container ios-panel bg-datos" id="panel-ios-3">
    <div id="addNewSemana" class="col-12" style="padding: 0px;">
      <br>
      <div class="form-group" style="margin-bottom: 0px">
        <label>Fecha Inicio: </label>
        <input type=datetime-local class="form-control" name="inicio" id="inicio" required="" placeholder="Ingrese Fecha de inicio">
      </div>
      <div class="form-group" style="margin-bottom: 0px">
        <label>Fecha Final: </label>
        <input type=datetime-local class="form-control" name="fin" id="fin" required="" placeholder="Ingrese Fecha final">
      </div>
      <button class="btn bg-white btnForm" id="saveSemana" data-edit="0">
        <span>Guardar Semana</span>
      </button>
    	<br>
	    <br>
	    <br>
	  </div>
    <div id="listSemanas" class="col-12" style="padding: 0px;">
	    <div class="row">
	    	<h5 class="col text-center bg-white" style="padding: 0px;padding-top:10px;padding-bottom: 10px;margin-bottom:0px">
	    		Lista de Semanas
	    		@if( $admin == 1 )
	    		<button id="showFrmAddSemana" class="btn">
						@include('svgs.plus', ['width'=>'30', 'height'=>'30'])
	    		</button>
	    		@endif
	    	</h5>
	    </div>
	    <div class="row">
		    <table id="render-edit-table-semanas" class="table">
		      <tbody>
		      </tbody>
		    </table>
      </div>
    </div>

	  <div class="row">
	    <div class="col-12" id="add-data">
	      <!-- Copiar contenido de form. cuando abro el dato a agregar -->
	    </div>
	  </div>
	</div>
	
	<!-- Venatana para ver lo facturaciones de la card -->
	@include('facturaciones.show')

@endsection


@push('scripts')
	<script type="text/javascript">
		var countBorrador = {!! $countBorrador !!} ; //1
		var countEnRevision = {!! $countEnRevision !!} ; //2
		var countAprobados = {!! $countAprobados !!} ; //3
		var countRechazados = {!! $countRechazados !!} ; //4
		var semanas = {!! $semanas !!} ;
		var monedas = {!! $monedas !!} ;
	</script>
	<script type="text/javascript" src="{{asset('/js/facturaciones.js?v=0.2.1.1')}}"></script>
@endpush