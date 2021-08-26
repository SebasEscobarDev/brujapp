@extends("layouts.master")

@section("contenido")
	
	<div class="container">

		<h5 class="pb-0 mb-0"></h5>
		<h2 class="pb-0 mb-0"><strong>Laravel 8 + LiveWire + Pusher</strong></h2>
		
		@livewire("chat-form")
		@livewire("chat-list")

	</div>

@endsection