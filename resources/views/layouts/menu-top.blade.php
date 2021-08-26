<div class="container fixed-menu">
  <div class="row">
    <nav class="col-12 navbar navbar-light ibg-primary text-center">
      <a class="navbar-brand">
        @if( $verBotones )
          <button class="btn ibg-primary float-left" id="btnAddCards">
            @include('svgs.plus', ['width'=>'1em', 'height'=>'1em'])
          </button>
          <button class="btn ibg-primary float-left btn-back-view" id="btnBackView">
            @include('svgs.back', ['width'=>'1em', 'height'=>'1em'])
            <span>Volver</span>
          </button>
        @endif
        <span>{{$modelo}} Disponibles</span>
        @if( $verBotones )
          <button class="btn ibg-primary float-right" id="btnSearchCards">
            @include('svgs.search', ['width'=>'1em', 'height'=>'1em'])
          </button>
          <button class="btn ibg-primary float-right btnAddElement" id="btnAddCard">
            <span>Agregar</span>
            @include('svgs.add', ['width'=>'1em', 'height'=>'1em'])
          </button>
          <button class="btn ibg-primary float-right btnAddElement" id="btnEditCard" data-cardid="0">
            <span>Actualizar</span>
            @include('svgs.update', ['width'=>'1em', 'height'=>'1em'])
          </button>
        @endif
      </a>
    </nav>
  </div>
</div>