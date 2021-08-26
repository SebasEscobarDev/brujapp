<div class="container fixed-menu">
  <div class="row">
    <nav class="col-12 navbar navbar-light ibg-primary text-center">
      <a class="navbar-brand">
        <button class="btn float-left" id="menu-dash-left">
          @include('svgs.list', ['width'=>'40', 'height'=>'40'])
        </button>
        <button class="btn float-left btn-back-view" id="btnBackView" data-cardid="0">
          @include('svgs.back', ['width'=>'30', 'height'=>'30'])
          <span>Volver</span>
        </button>
        <button class="btn float-left btn-back-view" id="btnBackViewType" data-cardid="0">
          @include('svgs.back', ['width'=>'30', 'height'=>'30'])
          <span>Volver</span>
        </button>


        @if( $modelo == 'Mi Perfil!' )
          <span>{{$modelo}}</span>
        @else
          <span>{{$modelo}} Disponibles</span>
        @endif

        <button class="btn float-right" id="btnSearchCards">
          @include('svgs.search', ['width'=>'35', 'height'=>'35'])
        </button>

      </a>
    </nav>
    <div class="col-12" id="search-txt">
      <div class="form-group">
        <label>Busqueda de {{$modelo}}</label>
        <input type="text" class="form-control" name="txtSearch" id="txtSearch" placeholder="Escriba minimo 3 digitos para empezar a buscar" autocomplete="off">
        <button id="close-search">
          @include('svgs.bi-x', ['width'=> 25 , 'height' => 25])
        </button>
      </div>
    </div>
  </div>
</div>