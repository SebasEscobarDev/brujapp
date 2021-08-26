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
      <label>Correo :</label>
      <input type="text" class="form-control" name="email" id="email" placeholder="Correo electrónico" required="">
    </div>


    <div class="form-group">
      <label>Contraseña :</label>
      <input type="password" class="form-control" name="password" id="password" placeholder="Contraseña" required="">
    </div>

     <div class="col-12 text-center btnformadd">
      <button class="btn btnForm" id="btnAddCard">
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