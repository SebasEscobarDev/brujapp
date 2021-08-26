<div id="formCards">      
  <div class="dev-body" id="frmCards">
    <div class="row">
    	<div class="col-6 text-center" style="padding: 0px;">
    		<button class="btn-datos-add btn bg-white addTypeAccount">Agregar tipo de cuenta</button>
    	</div>
      <div class="col-6 text-center" style="padding: 0px;">
        <button class="btn-datos-add btn bg-white addAccount">Agregar Datos</button>
      </div>
    </div>



    <div id="addTypeAccount" class="col-12" style="padding: 0px;">
      <br>
      <div class="form-group">
        <label>Nombre del tipo de Cuenta :</label>
        <input type="text" class="form-control" name="nombre_tipo" id="nombre_tipo" placeholder="( Ej: Bancolombia, Money, Western )" required="">
      </div>

      <!-- /campo para copiar los campos de cuenta -->
      <div id="copy-txt-name" class="form-group d-none">
        <label>Campo <span class="number-txt">0</span>: </label>
        <input type="text" class="form-control" name="campo_0" id="campo_0" placeholder=" Nombre del campo 0" required="">
        <span class="close-txt">x</span>
      </div>
      <div id="addtxtcamps">
        <!-- //agregar dinamicamente los campos del tipo de cuenta -->
      </div>
      <button class="btn bg-white btnForm" id="duplicate-txt">
        <span>Nuevo Campo</span>
        @include('svgs.add', ['width'=>25, 'height'=>25])
      </button>
      <button class="btn bg-white btnForm" id="saveType" data-edit="0">
        <span>Guardar tipo de cuenta</span>
      </button>
      <table id="render-edit-table-tipos" class="table">
        <tbody>
          <tr>
            <th>Editar tipos de cuenta</th>
          </tr>
        </tbody>
      </table>
    </div>


    <div id="addAccount" class="col-12" style="padding: 0px;">
      <table id="render-add-table-tipos" class="table">
        <tbody>
          <tr>
            <th>Tipos de cuenta</th>
          </tr>
        </tbody>
      </table>
    </div>





  </div>

</div>