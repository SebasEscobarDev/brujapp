@extends('layouts.master')

@section('container')

   @include('layouts.menu-top2', ['modelo' => 'Contactos'])
	
	<!-- VARIABLE attr data-master="0" admin -->
	<!-- VARIABLE attr data-master="1" maestros -->
	@php

  $clasy = ( ( $admin == 0 ) ? "Pendientes" : "Nuevos" );
  $maestro = ( ( $admin == 0 ) ? 1 : 0 );
  $mostrarMaestro = ( ($admin == 0) ? " d-none" : "" );
	@endphp

	<div class="container ios-panel bg-contactos panel-active" id="panel-ios-1" data-master="{{$maestro}}">
	  <div class="row" id="principal-container">
	  	<div class="input-group mb-3">
			  <input type="text" class="form-control" placeholder="Buscar Datos" aria-label="Buscar Datos De Persona" aria-describedby="button-addon2">
		    <button class="btn ibg-primary float-right" type="button" id="searchCards">
		    	@include('svgs.bi-x', ['width'=>'1em', 'height'=>'1em'])
				</button>
			</div>
			
			<div class="col-12 masterTabs">
				<div class="row masterTabs-head justify-content-center">
					@foreach( $estados as $estado )
						@if( $estado->id == 1 && $admin == 0 )
							<!-- no mostrar primer estado para los maestros -->
						@else
						<button class="tab-head btn {{$estado->clase}}" data-state="{{$estado->id}}" data-name="{{$estado->name}}" data-active="<?=( ($estado->id == 1) ? 1 : 0 );?>">
							<span>
							@if( $estado->id == 1 )
								@include('svgs.chat-square-quote', ['width'=> 25 , 'height' => 25])
							@elseif( $estado->id == 2 )
								@include('svgs.chat-square-dots', ['width'=> 25 , 'height' => 25])
							@elseif( $estado->id == 3 )
								@include('svgs.chat-square-text', ['width'=> 25 , 'height' => 25])
							@elseif( $estado->id == 4 )
								@include('svgs.chat-square', ['width'=> 25 , 'height' => 25])
							@elseif( $estado->id == 5 )
								@include('svgs.bi-x', ['width'=> 25 , 'height' => 25])
							@endif
							</span>
						</button>
						@endif
					@endforeach
					<h2 class="col-12">{{$clasy}}</h2>
				</div>
			</div>

			<div class="btn-add-row">
				<button id="btnAddCards">
					@include('svgs.plus', ['width'=>'30', 'height'=>'30']) Agregar Contacto
				</button>
			</div>

		  <div id="selectionable-items" class="col-12">
		    <div class="list-group" id="cards-list-tab" role="tablist" data-newid="{{count($datos)}}">
	    		@php 
	    		$countContacts = 0; 
					$countEstadoNuevo = 0;
					$countEstadoPendiente = 0;
					$countEstadoEfectivo = 0;
					$countEstadoNoEfectivo = 0;
					$countEstadoNoContesta = 0;
	    		@endphp
		    	@if( count($datos) > 0 )
						@foreach( $datos as $card )
							@php 
								$countContacts++;
								$clase;
								foreach ($card->estado as $estado ) {
									switch ($estado->id) {
										case 1:
											$countEstadoNuevo++;	
											break;
										case 2:
											$countEstadoPendiente++;
											break;
										case 3:
											$countEstadoEfectivo++;
											break;
										case 4:
											$countEstadoNoEfectivo++;
											break;
										case 5:
											$countEstadoNoContesta++;
											break;
									}
									$clase = $estado->clase;
								}
							@endphp
				      <button class="list-group-item list-group-item-action {{$clase}}" id="list-home-{{$card->id}}">
				      	<span class="d-none float-left icon-list-cards">
		  						@include('svgs.user', ['width'=>25, 'height'=>25])			      		
								</span>
				      	<span class="float-left num-card d-none">{{$countContacts}}</span>
				      	<div class="details-box">
					      	<span class="infoMaster"><b>Nombre: </b><span class="name">{{ $card->name }}</span></span><br>
					      	<span class="infoMaster"><b>Número (+) </b><span class="prefix">{{ $card->prefix }}</span></span> 
									<span class="infoMaster"><span class="phone">{{ $card->phone }}</span></span><br>
									<span class="infoMaster"><b>País: </b>
										@if( $card->country != NULL )
											<span class="country">{{ $card->country }}</span>
										@else
											<span class="country">( Sin Agregar )</span>
										@endif
									</span><br>
									<span class="infoMaster d-none"><b>Ciudad: </b>
										@if( $card->city != NULL )
											<span class="city">{{ $card->city }}</span>
										@else
											<span class="city">( Sin Agregar )</span>
										@endif
									</span>
									<span class="infoMaster d-none"><b>Estado: </b>
										@if( $card->city != NULL )
											<span class="state">{{ $card->state }}</span>
										@else
											<span class="state">( Sin Agregar )</span>
										@endif
									</span>
									<span class="infoMaster{{$mostrarMaestro}}">
										<b>Maestro:</b> 
										@if( !empty($card->maestro[0]) )
											<span class="maestro" data-masterid="{{$card->maestro[0]->id}}">{{ $card->maestro[0]->name }}</span>
										@else
											<span class="maestro" data-masterid="0">( Sin Agregar )</span>
										@endif
									</span>
									<div class="info-dates">
										<div class="dd-one">
											<span class="infoMaster">
												<b>Fecha de ingreso: </b>
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
					      <span class="dev-api-wpp">
									<a href="https://api.whatsapp.com/send?phone=+{{$card->prefix}}{{$card->phone}}" target="_blank" class="ref-api-wpp">
										@include('svgs.whatsapp', ['width'=> 40 , 'height' => 40])
									</a>
								</span>
				      </button>
						@endforeach
						@if( $admin == 0 )
							@if( $countEstadoPendiente == 0 )
								<h2 class="info-txt">
									Esperando contactos.
								</h2>
							@endif
						@else
							@if( $countEstadoNuevo == 0 )
								<h2 class="info-txt">
									Esperando contactos.
								</h2>
							@endif
						@endif
					@else
						<h2 class="info-txt">
							Esperando contactos.
						</h2>
					@endif
					<button class="list-group-item list-group-item-action list-group-item-success d-none" id="list-home-0">
		      	<span class="d-none float-left icon-list-cards">
  						@include('svgs.user', ['width'=>25, 'height'=>25])			      		
						</span>
		      	<span class="float-left num-card d-none">0</span>
		      	<div class="details-box">
			      	<span class="infoMaster"><b>Nombre: </b><span class="name"></span></span><br>
			      	<span class="infoMaster"><b>Número (+) </b><span class="prefix"></span></span> 
							<span class="infoMaster"><span class="phone"></span></span><br>
							<span class="infoMaster"><b>País: </b>
								<span class="country"></span>
							</span><br>
							<span class="infoMaster d-none"><b>Ciudad: </b>
								<span class="city"></span>
							</span>
							<span class="infoMaster d-none"><b>Estado: </b>
								<span class="state"></span>
							</span>
							<span class="infoMaster{{$mostrarMaestro}}">
								<b>Maestro:</b> 
								<span class="maestro" data-masterid="0"></span>
							</span>
							<div class="etiquetasDeContacto">
								@if( isset($datos->etiquetas) )
									@foreach( $datos->etiquetas as $etiqueta )
										<span>$etiqueta->nombre</span>
									@endforeach
								@endif
							</div>
							<div class="info-dates">
								<div class="dd-one">
									<span class="infoMaster">
										<b>Fecha de ingreso: </b>
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
			      <span class="dev-api-wpp">
							<a href="https://api.whatsapp.com/send?phone=+0000000" target="_blank" class="ref-api-wpp">
								@include('svgs.whatsapp', ['width'=> 40 , 'height' => 40])
							</a>
						</span>
		      </button>
		    </div>
		  </div>
	  </div>
	</div>

	<div class="container ios-panel bg-contactos" id="panel-ios-2">
	  <div class="row">
	    <div class="col-12" id="frmViewCards">
	      @include('contactos.form')
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
        <input type=datetime-local class="form-control" name="fin" id="fin" required="" placeholder="Ingrese Fecha fin">
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
	    		<button id="showFrmAddSemana" class="btn">
						@include('svgs.plus', ['width'=>'30', 'height'=>'30'])
	    		</button>
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
	<!-- Venatana para ver lo datos de la card -->
	@include('contactos.show')

@endsection

@push('scripts')
	<script type="text/javascript">
		var countEstadoNuevo = {!! $countEstadoNuevo !!} ; //1
		var countEstadoPendiente = {!! $countEstadoPendiente !!} ; //2
		var countEstadoEfectivo = {!! $countEstadoEfectivo !!} ; //3
		var countEstadoNoEfectivo = {!! $countEstadoNoEfectivo !!} ; //4
		var countEstadoNoContesta = {!! $countEstadoNoContesta !!}; //5
		var semanas = {!! $semanas !!}
	</script>
	<script type="text/javascript" src="{{asset('/js/contactos.js?v=3.2.6.8')}}"></script>

@endpush