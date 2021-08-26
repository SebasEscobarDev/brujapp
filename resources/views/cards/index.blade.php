@extends('layouts.master')

@section('container')
	
	@include('layouts.menu')

	<div class="container ios-panel" id="panel-ios-1">
	  <div class="row" id="principal-container">
	    

	  	<div class="input-group mb-3">
			  <input type="text" class="form-control" placeholder="Buscar Datos" aria-label="Buscar Datos De Persona" aria-describedby="button-addon2">
		    <button class="btn ibg-primary float-right" type="button" id="searchCards">
        	@include('svgs.bi-x', ['width'=>'1em', 'height'=>'1em'])
				</button>
			</div>
		  <div id="selectionable-items" class="col-12">
		    <div class="list-group" id="cards-list-tab" role="tablist" data-newid="{{count($cards)}}">
		    	@if( count($cards) > 0 )
		    	@php $countContacts = 0; @endphp
						@foreach( $cards as $card )
						@php $countContacts++; @endphp
			      <button class="list-group-item list-group-item-action" id="list-home-{{$card->id}}">
			      	<span class="float-left icon-list-cards">
        				@include('svgs.person', ['width'=>'20', 'height'=>'20'])
							</span>
							<span class="float-left num-card">{{$countContacts}}</span>
			      	<span class="infoMaster"><b>Nombre: </b><span class="nombre">{{ $card->nombre }}</span></span>
							<span class="infoMaster d-none"><b>Identificación: </b><span class="identificacion">{{ $card->identificacion }}</span></span>
							<span class="infoMaster d-none"><b>Ciudad: </b><span class="ciudad">{{ $card->ciudad }}</span></span>
							<span class="infoMaster d-none"><b>Estado: </b><span class="estado">{{ $card->estado }}</span></span>
							<span class="infoMaster d-none"><b>País: </b><span class="pais">{{ $card->pais }}</span></span>
							<span class="infoMaster d-none"><b>Direccion: </b><span class="direccion">{{ $card->direccion }}</span></span>
							<span class="infoMaster d-none"><b>Telefono: </b><span class="telefono">{{ $card->telefono }}</span></span>
							<span class="infoMaster d-none"><b>Tipo de cuenta: </b><span class="tipo_cuenta">{{ $card->tipo_cuenta }}</span></span>
			      </button>
						@endforeach
					@else
					<h2>Agrega nuevos elementos a la lista</h2>
					@endif
		    </div>
		  </div>


	  </div>
	</div>

	<div class="container ios-panel ocultar-panel-2" id="panel-ios-2">
	  <div class="row">
	    <div class="col-12" id="frmViewCards">
	      @include('cards.form')
	    </div>
	  </div>
	</div>

	<!-- Venatana para ver lo datos de la card -->
	@include('cards.show')

@endsection