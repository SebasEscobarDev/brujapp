@php
if( $admin ){
  $claseMaestro = '';
}else{
  $claseMaestro = 'd-none ';
}
@endphp

<div id="formCards">
  
      
  <div class="dev-body" id="frmCards">

  	<div class="col-12 text-center">
  		<i class="icon-form">
        @include('svgs.person', ['width'=>'1em', 'height'=>'1em'])
			</i>
  	</div>

    <div class="form-group">
      <label>Nombre Completo :</label>
      <input type="text" class="form-control" name="name" id="name" placeholder="Nombre Completo" required="">
    </div>

    <div class="form-group">
      <label>Prefijo (+) :</label>
      <input type="number" class="form-control" name="prefix" id="prefix" placeholder="Prefijo" required="">
    </div>

    <div class="form-group">
      <label>Número :</label>
      <input type="number" class="form-control" name="phone" id="phone" placeholder="Número" required="">
    </div>

    <div class="d-none form-group">
      <label>Para :</label>
      <select class="form-control form-select" name="to" id="to" data-iddata="">
        <option value="">Seleccionar...</option>
        <option value="Agatha">Agatha</option>
        <option value="Natan">Natan</option>
      </select>
    </div>

    <div class="form-group solo-edit">
      <label>País :</label>
      <input type="text" class="form-control" name="country" id="country" placeholder="País">
    </div>

    <div class="form-group solo-edit">
      <label>Ciudad :</label>
      <input type="text" class="form-control" name="city" id="city" placeholder="Ciudad">
    </div>

    <div class="form-group solo-edit">
      <label>Estado :</label>
      <input type="text" class="form-control" name="state" id="state" placeholder="Estado">
    </div>
    
    <div class="col-12 text-center btnformadd">
      <button class="btn btnForm" id="btnAddCard"  data-cardid="">
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

  </div>

</div>