<div>
    {{-- To attain knowledge, add things every day; To attain wisdom, subtract things every day --}}
    <h5 class="mt-3"><strong>Lista de mensajes:</strong></h5>

    @foreach( $mensajes as $mensaje )
    	<li>{{$mensaje["nombre"]}} - {{$mensaje["mensaje"]}}</li>
    @endforeach


    <script>

	    // Enable pusher logging - don't include this in production
	    Pusher.logToConsole = true;

	    var pusher = new Pusher('bcbe5402ddc086e03ebd', {
	      cluster: 'us3'
	    });

	    var channel = pusher.subscribe('chat-channel');
	    channel.bind('chat-event', function(data) {
	      //alert(JSON.stringify(data));
	      window.livewire.emit('mensajeRecibido', data);
	    });
  	</script>


</div>
