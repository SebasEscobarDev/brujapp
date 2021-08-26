@php
/** LOGIN VALIDATE **/
/* -1 : Super Admin */
/* -2 : Admin       */
/* -3 : Maestro     */
$login;
foreach( Auth::User()->roles as $rol ){
  $login = $rol->id;
}

$text_menu = ($login==3) ? 'Mis ': '';
@endphp

<div class="menu-dash-left" id="menu-full-left">
  <div class="row">
    <div class="col-12">
      <a class="homedash" id="close-menu">
        <i>
          @include('svgs.xclose', ['width'=>'30','height'=>'30'])
        </i>
      </a>
    </div>
    <div class="dev-perfil">
      <a href="{{route('perfil')}}">
      	<div class="pictu">
          @include('svgs.person', ['width'=>80, 'height'=>80])
          <span> {{Auth::User()->name}} </span>
      	</div>
      </a>
    </div>
    <nav class="dd-menu-left col-12 navbar navbar-light">
      <a href="{{route('contactos')}}" class="btn">
        @include('svgs.user', ['width'=>'25', 'height'=>'25'])
        <span>{{$text_menu}}Contactos</span>
      </a>
      <a href="{{route('datos')}}" class="btn">
        @include('svgs.card', ['width'=>'25', 'height'=>'25'])
        <span>Datos de Consignación</span>
      </a>
      @if( $login == 1 )
      <a href="{{route('maestros')}}" class="btn">
        @include('svgs.users', ['width'=>'25', 'height'=>'25'])
        <span>Maestros</span>
      </a>
      @endif
      <a href="{{route('facturaciones')}}" class="btn">
        @include('svgs.facturate', ['width'=>'25', 'height'=>'25'])
        <span>Facturaciones</span>
      </a>
      <a href="{{route('graficos')}}" class="btn">
        @include('svgs.toparrow', ['width'=>'25', 'height'=>'25'])
        <span>Graficos</span>
      </a>
    </nav>
    <div class="logout col-12">
    	<a href="{{route('logout')}}" class="btn homedash btn-logout">
        @include('svgs.logout', ['width'=>'30', 'height'=>'30'])
        <span>Salir</span>
      </a>
    </div>
  </div>
</div>