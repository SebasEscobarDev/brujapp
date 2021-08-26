<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <!--meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"-->
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" /> 
  <meta name="theme-color" content="#000000">
  <title>{{ config('app.name') }} - @yield('meta-title')</title>
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="manifest" href="manifest.webmanifest?v=2.0">
  <link rel="apple-touch-icon" href="{{ asset('images/logo-192.jpg') }}">
  <meta name="apple-mobile-web-app-title" content="MasterApp">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="1080x1080" href="{{ asset('images/logo-1080.jpg') }}">
  <link rel="apple-touch-icon" sizes="512x512" href="{{ asset('images/logo-512.jpg') }}">
  <link rel="apple-touch-icon" sizes="192x192" href="{{ asset('images/logo-192.jpg') }}">
  <link rel="icon" type="image/png" href="{{ asset('images/logo-192.jpg') }}">
  <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Bungee+Inline&family=Londrina+Shadow&family=Monoton&family=Pacifico&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
<!--
font-family: 'Monoton', cursive;
font-family: 'Bungee Inline', cu rsive;
font-family: 'Londrina Shadow', cursive;
font-family: 'Monoton', cursive;
font-family: 'Pacifico', cursive;
font-family: 'Source Sans Pro', sans-serif;
-->
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
  <!-- BOOTSTRAP CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

  @livewireStyles

  <!-- Styles -->
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">
  
  <!-- MY CSS -->
  <link rel="stylesheet" href="{{ asset('/css/master.css?v=9.5.1.7') }}">
  @stack('styles')

</head>
<body>
  <div class="bg-spinner text-center">
    <div class="rotating">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-disc" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 4a4 4 0 0 0-4 4 .5.5 0 0 1-1 0 5 5 0 0 1 5-5 .5.5 0 0 1 0 1zm4.5 3.5a.5.5 0 0 1 .5.5 5 5 0 0 1-5 5 .5.5 0 0 1 0-1 4 4 0 0 0 4-4 .5.5 0 0 1 .5-.5z"/>
      </svg>
    </div>
  </div>
  <div class="bg-image"></div>
  @if( Auth::User() )
    @include('layouts.menu-left')
  @endif

  @yield('container')

@if( Auth::user() )
  <div class="float-left float-btn-fechas flotantes-btns">
    <button id="btnShowFechas">
      @include('svgs.calendar', ['width'=>35, 'height'=>35])
    </button>
  </div>

  <div class="float-right float-btn-update flotantes-btns">
    <button id="btnUpdateAll" onclick="location.reload();">
      @include('svgs.reload', ['width'=>35, 'height'=>35])
    </button>
  </div>

@endif
  <!-- JQUERY -->
  <script
    src="https://code.jquery.com/jquery-3.5.1.js"
    integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
    crossorigin="anonymous"></script>
  <!-- BOOTSTRAP JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

  <!-- SWAL ALERTT  -->
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>


  <script src="{{ mix('js/app.js') }}" defer></script>


  @stack('scripts')

  @livewireScripts

  <!-- MY JS -->
  <script src="{{ asset('/js/sebas.js?v=1.0.5.9') }}"></script>

  <!-- SERVICE WORKER JS PWA APP -->
  <script src="{{ asset('/js/index.js') }}"></script>

  @yield('scripts')
</body>
</html>