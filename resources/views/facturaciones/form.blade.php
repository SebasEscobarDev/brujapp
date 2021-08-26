<div id="formCards">
  
      
  <div class="dev-body" id="frmCards">
    <div class="col-12 text-center">
      <i class="icon-form">
        @include('svgs.receipt', ['width'=>'1em', 'height'=>'1em'])
      </i>
    </div>
    <form method="post" action="{{ route('facturaciones.storeImage') }}" id="upload-image" enctype="multipart/form-data">
      @csrf

      @if( $admin == 1 )
      <div class="form-group">
        <label>Maestro : </label>
        <select class="form-control form-select" name="user_id" id="user_id" data-iddata="">
          <option value="" selected="selected">Seleccione un Maestro...</option>
          @foreach( $maestros as $maestro )
            @if( $maestro->id > 1 )
            <option value="{{$maestro->id}}">{{$maestro->name}}</option>
            @endif
          @endforeach
        </select>
      </div>
      @else
        <div class="form-group">
          <input type="text" id="user_id" name="user_id" class="d-none" value="{{ Auth::User()->id }}" />
          <label class="show-label-maestro">Maestro : </label>
          <span class="show-name-maestro">{{ Auth::user()->name }}</span>
        </div>
      @endif


      <div class="form-group">
        <label>Contacto : </label>
        <select class="form-control form-select" name="contacto_id" id="contacto_id" data-iddata="">
          <option value="" selected="selected">Seleccione un Contacto...</option>
          @foreach( $contactos as $contacto )
            <option value="{{$contacto->id}}">{{$contacto->name}}</option>
          @endforeach
        </select>
      </div>

      <div class="form-group">
        <label>Datos : </label>
        <select class="form-control form-select" name="dato_id" id="dato_id" data-iddata="">
          <option value="" selected="selected">Seleccione un Dato...</option>
          @foreach( $datos as $dato )
            @php
            $campos = json_decode($dato->campos);
            @endphp
            <option value="{{$dato->id}}"> {{$campos[0]}} - {{$dato->tipo->nombre}}</option>
          @endforeach
        </select>
      </div>

      <div class="form-group">
        <label>Por dónde envía : </label>
        <input type="text" class="form-control" name="envia" id="envia" placeholder="Tienda dónde envía" required="">
      </div>
      <div class="dev-edit-images"></div>
      <div class="form-group">
        <label>Imágen del Recibo : </label>
        <input type="file" id="filenames" name="filenames[]" class="myfrm form-control" multiple="multiple">
        <span style="background: transparent; border-bottom: 0px;" class="text-danger" id="image-input-error"></span>
      </div>
    </form>

    <div class="col-12 text-center btnformadd">
      <button class="btn btnForm" id="btnAddCard" data-cardid="">
        <span>Agregar</span>
        @include('svgs.add', ['width'=>25, 'height'=>25])
      </button>
    </div>


    <div class="col-12 text-center btnformadd">
      <button class="btn btnForm" id="btnEditCard" data-cardid="0">
        <span>Actualizar</span>
        @include('svgs.update', ['width'=>25, 'height'=>25])
      </button>
    </div>
    <br>
    <br>


  </div>

</div>