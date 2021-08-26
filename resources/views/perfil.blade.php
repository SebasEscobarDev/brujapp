@extends('layouts.master')

@section('container')

@php

@endphp
	
	@include('layouts.menu-top2', ['modelo' => 'Mi Perfil!'] )
	<div class="container">
		<div class="row">
			<div class="col-12 dev-box-perfil">
				<br>
				<br>
				<br>
				<h2 class="text-center text-white">{{$userName}}</h2>
				<p class="col-12 text-center">
					<i class="icon-perfil text-white">
					  @include('svgs.person', ['width'=>80, 'height'=>80])
					</i>
				</p>
			</div>
			<div class="col-12 line-text">
				<div class="row align-items-center line-content">
					<div class="col-12 line-title text-center">
						<h4>Contactos: {{$totalContactos}}</h4>
					</div>
					<div class="col-6 text-center">
						<div class="facturados bg-success">
							Facturados<br> {{$contactosFacturados}}
						</div>
					</div>
					<div class="col-6 text-center">
						<div class="no-facturados bg-danger">
							No Facturados<br> {{$contactosNoFacturados}} 
						</div>
					</div>
				</div><!-- /.row -->
			</div><!-- /.line-text -->

			<div class="col-12 line-text">
				<div class="row align-items-center line-content">
					<div class="col-12 line-title text-center">
						<h4>Facturaciones</h4>
					</div>
					<div class="col-4 text-center bg-info">
						En Revisión<br> {{$facturacionesEnRevision}}
					</div>
					<div class="col-4 text-center bg-success">
						Aprobadas<br> {{$facturacionesAprobadas}}
					</div>
					<div class="col-4 text-center bg-danger">
						Rechazadas<br> {{$facturacionesRechazadas}} 
					</div>
				</div><!-- /.row -->
			</div><!-- /.line-text -->

			<div class="col-12">
				@foreach( $monedas as $moneda )
					@if( count($tableFacturaciones[$moneda->id]) > 0 )
						<br>
						<table class="table">
							<thead style="background: #89cdec;">
								<tr>
									@if( $moneda->short_name != 'COP' )
										<th colspan="<?=( ( $admin ) ? "5" : "4" );?>">Recibos en {{$moneda->name}} ({{$moneda->short_name}})
										</th>
									@else
										<th colspan="<?=( ( $admin ) ? "4" : "3" );?>">
											Recibos en {{$moneda->name}} ({{$moneda->short_name}})
										</th>
									@endif
								</tr>
								<tr>
									<th>#</th>
									@if( $admin )
										<th>Maestro</th>
									@endif
									<th>Valor</th>
									@if( $verAcumuladosySueldos )
										@if( $moneda->short_name != 'COP' )
											<th>Acumulado</th>
										@endif
										<th>Sueldo (COP)</th>
									@endif
								</tr>
							</thead>
							<tbody>
								{{-- Mostrar Facturaciones del tipo de moneda --}}
								@php
								$id_tables = 0;
								@endphp
								{{-- <pre class="col-12">
								{{ dd($tableFacturaciones[$moneda->id])  }}
								</pre> --}}
								@php
									$contadorPesos = 0;
								@endphp
								@foreach( $tableFacturaciones[$moneda->id] as $billing )
									@php
									$id_tables++;
									@endphp
									<tr>
										<td>{{$id_tables}}</td>
										@if( $admin )
										<td>{{$billing->user->name}}</td>
										@endif
										<td>${{number_format($billing->valor_moneda, 0)}}</td>
										@php
											$meta = 0.30;
											$acumulado = ($billing->valor_moneda * $meta);
											$sueldo = ($billing->valor_pesos * $meta);
										@endphp
										@if( $verAcumuladosySueldos )
											@php
												if( $moneda->short_name == 'COP' ){
													if( $totalPesos >= 1000000 ){
														$acumulado = ($billing->valor_moneda * 0.40);
														$sueldo = ($billing->valor_pesos * 0.40);
														$meta = 0.40;
													}
												}
												if( $moneda->short_name == 'USD' ){
													if( $totalDolares >= 1000 ){
														$acumulado = ($billing->valor_moneda * 0.40);
														$sueldo = ($billing->valor_pesos * 0.40);
														$meta = 0.40;
													}
												}
											@endphp
											@if( $moneda->short_name != 'COP' )
												<td>${{ number_format( $acumulado, 0) }}</td>
											@endif
											<td>${{ number_format( $sueldo, 0) }}</td>
										@endif
									</tr>
									@php
										$contadorPesos += $billing->valor_pesos;
									@endphp
								@endforeach
								@if( $verAcumuladosySueldos )
									@if( $moneda->short_name == 'COP' )
										<tr>
											<td colspan="5" class="meta-tag-table text-center">
												<b>Meta: </b> {{ number_format ( $totalPesos, 0) }}<b> / 1.000.000</b>
											</td>
										</tr>
									@endif
									@if( $moneda->short_name == 'USD' )
										<tr>
											<td colspan="5" class="meta-tag-table text-center">
												<b>Meta: </b> {{ number_format ( $totalDolares, 0) }}<b> / 1.000</b>
											</td>
										</tr>
									@endif
									<tr>
										<td colspan="5" class="text-center">
											Mi Sueldo En Pesos x( {!! $meta !!}0% ) = ${{ number_format( ($contadorPesos * $meta), 0 ) }}
										</td>
									</tr>
								@endif
							</tbody>
						</table>
						
						<br>
					@endif
				@endforeach
			</div>

			<div class="col-12 dev-box-perfil">
				<h4 class="text-center text-white">
					@if( $admin == 1 )
						Maestros:
					@else
						Maestro
					@endif
				</h4>
			</div>
			@if( $admin == 1 )
				<div class="col-12 text-center" style="padding: 0px;">
					<br>
					<div class="btns-perfiles">
						@foreach( $maestros as $maestro )
							<a class="col-12 btnForm" href="{{route('perfil')}}/{{$maestro->id}}" >{{$maestro->name}}</a>
						@endforeach
					</div>
					<br>
				</div>
			@endif
		</div>
	</div>

@endsection

@push('scripts')
	<script type="text/javascript">
		var maestros = {!! json_encode($maestros) !!}
	</script>
	<script type="text/javascript" src="{{asset('/js/perfil.js?v=0.0.4')}}"></script>
@endpush