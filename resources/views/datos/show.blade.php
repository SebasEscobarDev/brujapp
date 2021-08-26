<!-- Modal to Show  -->
@php 
if( $admin == 1 ){
	$claseMaestro = '';
}else{
	$claseMaestro = 'd-none ';
}
@endphp
<div class="dev-full-view-card" data-cardid="">
	<div class="dev-icon-arrow-card text-left">
    @include('svgs.back', ['width'=>'30', 'height'=>'30'])
    <span>Volver</span>
	</div>

	<div class="dev-show-card">
		<div class="dev-title-card">
			<i>
				@include('svgs.bi-person-badge-fill', ['width'=>40, 'height'=>40])
			</i>
		</div>
		<div class="dev-card-details">
			
		</div>
	</div>
	@if( $admin != 1 )
		<div class="row send-datas">
			<h6 class="title-dc col-12 ibg-primary text-center"><b>Enviar Datos a Contacto</b></h6>
			<div class="list list-contacts">
				<ul>
				@foreach( $contactos as $contacto )
					<li>
						<a class="btn dev-send-wpp" data-cardid="" data-prefix="{{$contacto->prefix}}" data-phone="{{$contacto->phone}}" >
							{{ $contacto->name }}
							<i>@include('svgs.whatsapp', ['width'=>'32', 'height'=>'32'])</i>
						</a>
					</li>
				@endforeach
				</ul>
			</div>
		</div>
	@endif
	<div class="dev-options-card">
		@if( $claseMaestro)
		@else
		<button class="btn viewEditCard" id="editCard" data-cardid="">
			Editar
			<i class="float-left">
    		@include('svgs.bi-pencil-square', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
		<button class="btn" id="trashCard" data-cardid="">
			Eliminar
			<i class="float-left">
    		@include('svgs.bi-trash', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
		@endif
		<button class="btn cancelPanel" id="cancelPanel">
			Volver
			<i class="float-left">
    		@include('svgs.back', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
	</div>
	<div class="zona-modal-out"></div>
	
</div>