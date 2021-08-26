@extends('layouts.master')

@section('container')

<div class="container">
	<div class="row">
		<div class="col col-sm-12 col-md-4 col-lg-4 loginView">
			<div class="loginBox">
				<h1 class="text-center">BrujApp</h1>
				@livewire('login-register')
			</div>
		</div>
	</div>
</div>

@endsection

@prepend('scripts')

@endprepend