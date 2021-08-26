<div>
    

	@if( Auth::User() )
		LOGEADO
	@else
		NO LOGUEADO
	@endif

	<div class="form-group">
		<label forn="nombre">Nombre</label>
		<input value="" type="text" class="form-control" name="nombre" id="nombre" wire:model="nombre">
		@error("nombre") <small class="text-danger">{{ $message }}</small> @enderror
	</div>

	<div class="form-group">
		<label for="Mensaje">Mensaje</label>
		<input type="text" class="form-control" name="mensaje" id="mensaje" wire:model="mensaje">
		@error("mensaje") <small class="text-danger">{{ $message }}</small> @enderror
	</div>


	<button class="btn btn-primary" wire:click="enviarMensaje">Enviar Mensaje</button>

	<!-- Mensajes De Alerta -->
	<div style="position: absolute;" 
		class="alert alert-success collapse mt-3"
		role="alert"
		id="avisoSuccess"> Se Ha Enviado </div>

	<script type="text/javascript">
		window.livewire.on('mensajeEnviado', function (){
			//mostramos el aviso
			$('#avisoSuccess').fadeIn("slow");

			//ocultamos el aviso a los 3 segundos
			setTimeout(function(){
				$('#avisoSuccess').fadeOut("slow");
			},3000);
		});
	</script>


</div>
