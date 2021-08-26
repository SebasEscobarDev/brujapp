@extends('layouts.master')

@section('container')
	
	@include('layouts.menu-top2', ['modelo' => 'Maestros'])

	<div class="container ios-panel bg-maestros panel-active" id="panel-ios-1">
	  <div class="row" id="principal-container">
	  	<div class="input-group mb-3">
			  <input type="text" class="form-control" placeholder="Buscar Datos" aria-label="Buscar Datos De Persona" aria-describedby="button-addon2">
		    <button class="btn ibg-primary float-right" type="button" id="searchCards">
		    	@include('svgs.bi-x', ['width'=>'1em', 'height'=>'1em'])
				</button>
			</div>

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

			<div class="btn-add-row">
				<button id="btnAddCards">
					@include('svgs.plus', ['width'=>'30', 'height'=>'30']) Agregar Maestro
				</button>
			</div>

		  <div id="selectionable-items" class="col-12">
		    <div class="list-group" id="cards-list-tab" role="tablist" data-newid="{{count($datos)}}">
		    	@if( count($datos) > 0 )
						@foreach( $datos as $card )
							@if( $card->id > 1 )
				      <button class="list-group-item list-group-item-action" id="list-home-{{$card->id}}" data-btnactive="{{$card->active}}">
		      			<span class="active-mark">
									@include('svgs.checkmark', ['width'=>'40', 'height'=>'40'])
								</span>
								<span class="close-mark">
									@include('svgs.closemark', ['width'=>'40', 'height'=>'40'])
								</span>
								</span>
				      	<span class="d-none float-left icon-list-cards">
			    				@include('svgs.person', ['width'=>'20', 'height'=>'20'])
								</span>
								<span class="float-left num-card d-none">{{$card->id}}</span>
				      	<span class="infoMaster"><b>Nombre: </b><span class="name">{{ $card->name }}</span></span><br>
								<span class="infoMaster"><b>Correo: </b><span class="email">{{ $card->email }}</span></span><br>
								<span class="infoMaster d-none"><b>Contraseña: </b><span class="password">*********</span></span>
								<span class="infoMaster"><b>Contactos: </b><span class="contactos">{{count( $card->contactos )}}</span></span><br>
								<div class="info-dates">
									<div class="dd-one">
										<span class="infoMaster">
											<b>Fecha De Creación: </b>
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
				      @endif
						@endforeach
					@else
						<button class="list-group-item list-group-item-action" id="list-home-0" data-btnactive="1">
	      			<span class="active-mark">
								@include('svgs.checkmark', ['width'=>'40', 'height'=>'40'])
							</span>
							<span class="close-mark">
								@include('svgs.closemark', ['width'=>'40', 'height'=>'40'])
							</span>
							</span>
			      	<span class="d-none float-left icon-list-cards">
		    				@include('svgs.person', ['width'=>'20', 'height'=>'20'])
							</span>
							<span class="float-left num-card d-none">{{$card->id}}</span>
			      	<span class="infoMaster"><b>Nombre: </b><span class="name">{{ $card->name }}</span></span><br>
							<span class="infoMaster"><b>Correo: </b><span class="email">{{ $card->email }}</span></span><br>
							<span class="infoMaster d-none"><b>Contraseña: </b><span class="password">*********</span></span>
							<span class="infoMaster"><b>Contactos: </b><span class="contactos">{{count( $card->contactos )}}</span></span><br>
							<div class="info-dates">
								<div class="dd-one">
									<span class="infoMaster">
										<b>Fecha De Creación: </b>
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
						<h2 class="info-txt">Agregue nuevos <b>Maestros</b> a la lista.</h2>

					@endif
		    </div>
		  </div>
	  </div>
	</div>

	<div class="container ios-panel bg-maestros" id="panel-ios-2">
	  <div class="row">
	    <div class="col-12" id="frmViewCards">
	      @include('maestros.form')
	    </div>
	  </div>
	</div>

	<!-- Venatana para ver lo datos de la card -->
	@include('maestros.show')


@endsection

@prepend('scripts')

	<script type="text/javascript" src="{{asset('/js/maestros.js?v=0.6.7.7')}}"></script>

@endprepend