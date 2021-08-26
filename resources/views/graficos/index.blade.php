@extends('layouts.master')

@section('container')

	@include('layouts.menu-top2', ['modelo' => 'Graficos'])

	<div class="container ios-panel bg-graficos panel-active" id="panel-ios-1">
	  <div class="row" id="principal-container">
	  	<br>
			<div class="col-12 dev-box-perfil">
  			<h5 class="text-white text-center">Contactos en los ultimos 7 días</h5>
  		</div>
  		<div class="col-12" style="padding: 0px;">
				<canvas id="contactos" width="500" height="700"></canvas>
	  	</div>
			<div class="col-12">
				<br>
			</div>
			<div class="col-12 dev-box-perfil">
				<h5 class="text-white text-center">Facturaciones en los ultimos 7 días</h5>
			</div>
			<div class="col-12" style="padding: 0px;">
				<canvas id="facturaciones" width="500" height="700"></canvas>
			</div>
	  </div>
	</div>

	<div class="container ios-panel bg-graficos" id="panel-ios-2">
	  <div class="row">

	  </div>
	</div>

@endsection

@push('scripts')
	<script type="text/javascript">
		var maestros = {!! json_encode($maestros) !!}
		console.log( maestros )
	</script>
	<script type="text/javascript" src="{{asset('/js/graficos.js?v=2.0.2.2')}}"></script>
@endpush