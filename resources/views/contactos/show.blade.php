<!-- Modal to Show  -->
@php 
if( $admin ){
	$claseMaestro = '';
}else{
	$claseMaestro = 'd-none ';
}
@endphp
<div class="dev-full-view-card" data-cardid="0">
	<div class="dev-icon-arrow-card text-left">
    @include('svgs.back', ['width'=>'30', 'height'=>'30'])
    <span>Volver</span>
	</div>

	<div class="btns-actions" id="btns-actions">
		<h6 class="text-center"><b>Estado del contacto</b> <span></span> </h6>
		@foreach( $estados as $estado )
			@if( $estado->id == 1 && $admin == 0 || $estado->id == 2 && $admin == 1 )
				<!-- Estos se manejan desde la interfaz -->
			@else
			<button class="btn {{$estado->clase}}" data-state="{{$estado->id}}" data-name="{{$estado->name}}">
				<span>
				@if( $estado->id == 1 )
					@include('svgs.chat-square-quote', ['width'=> 30 , 'height' => 30])
				@elseif( $estado->id == 2 )
					@include('svgs.chat-square-dots', ['width'=> 30 , 'height' => 30])<br>
				@elseif( $estado->id == 3 )
					@include('svgs.chat-square-text', ['width'=> 30 , 'height' => 30])<br>	
				@elseif( $estado->id == 4 )
					@include('svgs.chat-square', ['width'=> 30 , 'height' => 30])<br>	
				@elseif( $estado->id == 5 )
					@include('svgs.bi-x', ['width'=> 30 , 'height' => 30])<br>
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
	</div>
	
	{{-- <div class="etiquetas-contacto">
		<h5 class="col text-center bg-white" style="padding: 0px;padding-top:10px;padding-bottom: 10px;margin-bottom:0px">
	    Etiquetas del contacto
	    <button id="showFrmAddTags" class="btn">
				<svg width="30" height="30" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  				<path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
				</svg>	    		
			</button>
	  </h5>
	  <div class="frmEtiquetas">
	  	<ul id="listOfEtiquetas">
	  		
	  	</ul>
	  </div>
	</div> --}}

	<div class="{{$claseMaestro}}row add-item">			
		<h6 class="col-12"><b>Agregar contacto a Maestro</b></h6>
		<div class="col-12 ibg-primary">
			<select class="ibg-primary form-select" id="addContactToMaster" data-idcontact="">
				<option value="0" selected="selected">Seleccione un Maestro...</option>
				@foreach( $maestros as $maestro )
					<span class="d-none">{{$maestro}}</span>
					@if( $maestro->roles[0]->id > 1 )
						<option value="{{$maestro->id}}">{{$maestro->name}}</option>
					@endif
				@endforeach
			</select>
		</div>
		<div class="col-12 ibg-primary">
			<span>Seleccionado:</span>
			<div id="masterselect"></div>
		</div>
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
		<button class="btn cancelPanel" id="cancelPanel">
			Volver
			<i class="float-left">
    		@include('svgs.back', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
	</div>
	<div class="zona-modal-out"></div>
</div>