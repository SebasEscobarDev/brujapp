<!-- Modal to Show  -->
<div class="dev-full-view-card" data-cardid="">
	<div class="dev-icon-arrow-card text-left">
    @include('svgs.back', ['width'=>'30', 'height'=>'30'])
    <span>Volver</span>
	</div>
		@php
		$adminfacturacion = '';
		if( $admin == 1 ){
			$adminfacturacion = ' admin-btns-facturacion';
		}
		@endphp
	<div class="btns-actions{{$adminfacturacion}}" id="btns-actions">
		<h6 class="text-center"><b>Estado de la facturación</b> <span></span> </h6>
		@foreach( $estados as $estado )
			@if( $estado->id == 1 && $admin == 1 )
			@else
			<button class="btn {{$estado->clase}}" 
				data-state="{{$estado->id}}" 
				data-name="{{$estado->name}}"
				@if( $admin == 0 && $estado->id == 3 || $admin == 0 && $estado->id == 4 )
				disabled="" 
				@endif
				>
				<span>
				@if( $estado->id == 1 )
					@include('svgs.chat-square-quote', ['width'=> 20 , 'height' => 20])<br>
				@elseif( $estado->id == 2 )
					@include('svgs.chat-square-dots', ['width'=> 20 , 'height' => 20])<br>
				@elseif( $estado->id == 3 )
					@include('svgs.checkmark', ['width'=> 20 , 'height' => 20])<br>
				@elseif( $estado->id == 4 )
					@include('svgs.closemark', ['width'=> 20 , 'height' => 20])<br>
				@endif
				</span>
				<span class="detail">{{ $estado->name }}</span>
			</button>
			@endif
		@endforeach
	</div>

	<div class="dev-show-card">
		<div class="dev-card-details">
			
		</div>
		<div class="dev-images"></div>
	</div>
	
	<div class="dev-options-card">
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
		<br>
		<button class="btn cancelPanel" id="cancelPanel">
			Volver
			<i class="float-left">
    		@include('svgs.back', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
	</div>
	<div class="zona-modal-out"></div>
	
</div>