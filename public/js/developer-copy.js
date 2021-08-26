$(document).ready(function(){

	/*
	 Bancolombia cuenta de ahorros: 516-000242-25 Strong fusdo
	 */
	 
	//ancho máximo menu de cabecera
	setTimeout(function(){
		$('.fixed-menu').css({'max-width':window.innerWidth})
	},500)

	//ocultar panel2
	$('#panel-ios-2').hide()
	//ocultar boton agregar Tarjeta
	$('#btnAddCard').hide()
	//ocultar boton editar Tarjeta
	$('#btnEditCard').hide()

	$('#btnBackView').click(function(){
		funciones_volver_vista_principal()
	})

	//cerrar modal de vista card
	$('.dev-icon-arrow-card, #cancelPanel').click(function(){
		$('.dev-full-view-card').toggleClass('show-full-card')
	})

	/****************************/
	// DEFINICION DE VARIABLE "exo"
	// se entiende por el id del registro
	// CREAR o EDITAR un registro
	// VAR exo = 0 // CREAR
	// si no existe se crea
	// VAR exo = 1 // EDITAR
	// si existe se edita el objeto
	// EN LA PETICION AJAX HTTP REQUEST
	/****************************/






	//iniciar funcion para mostrar datos -> paso identificador como variable
	show_data_in_modal('#selectionable-items .list-group-item')
	/* FIN FUNCION QUE MUESTRA LOS DATOS */
	/*///////////////////////////////////*/







	/*//////////////////////////////////////////////////////////////////*/
	/* FUNCION QUE MUESTRA LOS DATOS EN EL FORMULARIO DE CREAR O EDITAR */
	//---titulo del formulario
	//view CREATE
	$('#btnAddCards').click(function(){

		animacion_cambiar_panel_ios('Nuevo Registro')

		limpiar_formulario_cards()

		//LLENAR FORMULARIO PARA AGREGAR PRUEBA
		prueba_formulario_registro_cards()

		//ocultar boton de buscar
		$('#btnSearchCards').hide()
		//ocultar boton editar
		$('#btnEditCard').hide()
		//mostrar boton agregar
		$('#btnAddCard').show()

	})

	//btn CREATE
	$('#btnAddCard').click(function(){


		//validar que no hayan campos vacios
		var vacios = validate_inputs_form_cards()
		if ( vacios ) {
			alert('Ingrese todos los datos requeridos.')
			return 
		}
		// end validacion campos vacios


		// VARIABLE exo = 0 // CREAR
		// VARIABLE exo = 1 // EDITAR
		var exo = 0
    ejecutar_funcion_AJAX_SEND_HTTP_REQUEST(exo)

	}) //end CREATE








	/**********************************/
	/*               EDIT             */
	function_to_view_edit_card()

	/* FUNCTION TO SEND DATA CONTROLLER EDIT CARD  */
	$('#btnEditCard').click(function(){
		var ide = $(this).data('cardid')
		//valido inputs vacios retorno mensaje de validacion
		var vacios = validate_inputs_form_cards()
		if ( vacios ) {
			alert('Ingrese todos los datos requeridos.')
			return 
		}
		//si pasa la validacion envio datos al controlador
		var exo = ide;
		ejecutar_funcion_AJAX_SEND_HTTP_REQUEST(exo)

	})
	/**********************************/



	/*        DELETE        */
	$('#trashCard').click(function(){
		var borrar = confirm('Esta seguro que desea eliminar el registro?')
		if( borrar ){
			trash_card( $(this).attr('data-cardid') )
		}
	})


})

function animacion_cambiar_panel_ios(msj){
	//cambio entre el panel 1 y el panel 2 para la animación de las vistas
	$('#panel-ios-2').show()
	$('#panel-ios-1').toggleClass('ocultar-panel-1')
	$('#panel-ios-2').toggleClass('ocultar-panel-2')

	$('#btnAddCards').hide()
	$('#btnBackView').show()
	$('.navbar-brand > span').html(msj)
}

function funciones_volver_vista_principal(){
	$('.navbar-brand > span').html('Datos Disponibles')
	$('#panel-ios-2').hide('fast')
	$('#panel-ios-1').toggleClass('ocultar-panel-1')
	$('#panel-ios-2').toggleClass('ocultar-panel-2')
	$('#btnEditCard').hide()
	$('#btnBackView').hide()
	$('#btnAddCard').hide()
	$('#btnAddCards').show()
	$('#btnSearchCards').show()
}


function function_to_view_edit_card(){
	$('#editCard').click(function(){
		console.log('click-btn-edit');
		animacion_cambiar_panel_ios('Editar Registro')
		//limpiar formulario cards
		limpiar_formulario_cards()
		//obtener ide a editar
		var ide = $(this).attr('data-cardid')
		console.log('ide: '+ide)
		//obtener datos de la card para editar
		var card = {
			nombre: $('#list-home-'+ide+' .nombre').text(),
			identificacion: $('#list-home-'+ide+' .identificacion').text(),
			ciudad: $('#list-home-'+ide+' .ciudad').text(),
			estado: $('#list-home-'+ide+' .estado').text(),
			pais: $('#list-home-'+ide+' .pais').text(),
			direccion: $('#list-home-'+ide+' .direccion').text(),
			telefono: $('#list-home-'+ide+' .telefono').text(),
			tipo_cuenta: $('#list-home-'+ide+' .tipo_cuenta').text()
		}
		//poner datos en el formulario de creacion
		$('#formCards #nombre').val( card.nombre )
		$('#formCards #identificacion').val( card.identificacion )
		$('#formCards #ciudad').val( card.ciudad )
		$('#formCards #estado').val( card.estado )
		$('#formCards #pais').val( card.pais )
		$('#formCards #direccion').val( card.direccion )
		$('#formCards #telefono').val( card.telefono )
		$('#formCards #tipo_cuenta').val( card.tipo_cuenta )
		
		//ocultar 
		$('.dev-full-view-card').toggleClass('show-full-card')
		//ocultar boton crear
		$('#btnAddCard').hide()
		//mostrar boton editar y agregar ide
		$('#btnEditCard').data('cardid', ide)
		$('#btnEditCard').show()

	})
}


function copyToClipboard(element) {
  var text = $(element).clone().find('br').prepend('\r\n').end().text()
  element = $('<textarea>').appendTo('body').val(text).select()
  document.execCommand('copy')
  element.remove()
}


function limpiar_formulario_cards(){
	$('#formCards #nombre').val('')
	$('#formCards #identificacion').val('')
	$('#formCards #ciudad').val('')
	$('#formCards #estado').val('')
	$('#formCards #pais').val('')
	$('#formCards #direccion').val('')
	$('#formCards #telefono').val('')
	$('#formCards #tipo_cuenta').val('')
}


function get_inputs_form_cards(){
	var card
	return card = {
		nombre: $('#formCards #nombre').val(),
		identificacion: $('#formCards #identificacion').val(),
		ciudad: $('#formCards #ciudad').val(),
		estado: $('#formCards #estado').val(),
		pais: $('#formCards #pais').val(),
		direccion: $('#formCards #direccion').val(),
		telefono: $('#formCards #telefono').val(),
		tipo_cuenta: $('#formCards #tipo_cuenta').val()
	}
}

function validate_inputs_form_cards(){
	var vacios=0;
	$('#formCards input').each(function(){
		if( $(this).val() == '' || $(this).val() == undefined ){
			vacios++;
			$(this).css('border', '1px solid red');
		}
	})
	return vacios;
}


function alert_bootstrap(type,strong,message){
	return '<div class="dev-alert alert alert-'+type+' alert-dismissible fade show" role="alert">'+
	  '<strong>'+strong+'</strong> '+message+' '+
	  '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
	    '<span aria-hidden="true">&times;</span>'+
	  '</button>'+
	'</div>';
}







function ejecutar_funcion_AJAX_SEND_HTTP_REQUEST(exo){

	/******************/
	//exo = 0 // CREAR
	//exo = 1 // EDITAR
	/******************/

	//guardar datos para enviar contenido AJAX
	var card = get_inputs_form_cards()

	if( exo ){
		var url = "http://"+window.location.host+"/card/edit"
		var method = "put"
	}else{
		var url = "http://"+window.location.host+"/card/create"
		var method = "post"
	}

	$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $.ajax({
    url: url,
    method: method,
    data: {
    	id:exo,
      card: card
    },
    success: function(result){

      $('.dev-alert').remove()
      if( result.error ){
      	var alert = alert_bootstrap('error','Error',result.error)
        $('#principal-container').prepend(alert)
        $('body').addClass('dev-ios-alert')
      }

      if( result.yes ){
        var alert = alert_bootstrap('success','Registro',result.yes)
        $('#principal-container').prepend(alert)
        $('body').addClass('dev-ios-alert')

        //volver a vista principal
        

        //agregar nuevo registro a tabla de registros
        //AGREGO ELEMENTO HTML
	      var cardId = 'list-home-'+result.card.id;
        if( result.exo ){


        }else{

        	//CLONO ELEMENTO HTML
	        $('#cards-list-tab > button:last-of-type')
	        	.clone()
	        	.attr('id', cardId)
	        	.appendTo('#cards-list-tab')

        	//inicializo funciones ( JS ) agregadas a este elemento
	        //funcion ver elemento en modal
	        show_data_in_modal('#'+cardId)
	        //aumento el identificador para las pruebas
	        var newid = $('#cards-list-tab').data('newid')
	        newid++
	        $('#cards-list-tab').data('newid', newid)

	        function_to_view_edit_card()

        }

        //MODIFICO ELEMENTO CON LOS NUEVOS DATOS DEL CARD
        $('#'+cardId+' .nombre').html( result.card.nombre )
        $('#'+cardId+' .identificacion').html( result.card.identificacion )
        $('#'+cardId+' .ciudad').html( result.card.ciudad )
        $('#'+cardId+' .estado').html( result.card.estado )
        $('#'+cardId+' .pais').html( result.card.pais )
        $('#'+cardId+' .direccion').html( result.card.direccion )
        $('#'+cardId+' .telefono').html( result.card.telefono )
        $('#'+cardId+' .tipo_cuenta').html( result.card.tipo_cuenta )



        //broadcast event create or update result.card.id
        Echo.private(`cards.${result.card.id}`)
		    .listen('CardUpdate.cards.update', (e) => {
		        console.log(e);
		    });

        //limpio formulario registro
        limpiar_formulario_cards()

        //programar tiempo 5s para remover alerta
        setTimeout(function(){
        	$('.dev-alert').remove()
        },2000)

	    	funciones_volver_vista_principal()

    		window.Echo.channel('dev-canal')
        	.listen('dev-evento', (e) => {
        		console.log(e)
        	});
      }

    },
    error: function(i,o,u){
      //location.reload();
      console.log('Error al validar')
      console.log(i)
      console.log(o)
      console.log(u)
    }
  });
}







//LLENAR FORMULARIO PARA AGREGAR PRUEBA
function prueba_formulario_registro_cards(){
	var ide = $('#cards-list-tab').data('newid')
	ide++;

	$('#formCards #nombre').val('prueba: '+ide)
	$('#formCards #identificacion').val('prueba: '+ide)
	$('#formCards #ciudad').val('prueba: '+ide)
	$('#formCards #estado').val('prueba: '+ide)
	$('#formCards #pais').val('prueba: '+ide)
	$('#formCards #direccion').val('prueba: '+ide)
	$('#formCards #telefono').val('prueba: '+ide)
	$('#formCards #tipo_cuenta').val('prueba: '+ide)
}

/*////////////////////////////////////////////*/
/*  FUNCION QUE MUESTRA LOS DATOS EN EL MODAL  */
function show_data_in_modal(element){
	$(element).click(function(){
		$('.dev-card-details').empty()
		$('.dev-full-view-card').toggleClass('show-full-card')
		var id = $(this).attr('id')
		var numberId = id.replace('list-home-','')
		console.log(numberId)
		//add ID card to btnEditCard and btnDestroy
		$('#trashCard').attr({'data-cardid':numberId})
		$('#editCard').attr({'data-cardid':numberId})

		$('#'+id+' > .infoMaster').each(function(i,obj){
			//si es el primer objeto
			if( $(obj).children('span').hasClass('nombre') ){
				$('.h-nombre').html( $(obj).html() ) 
				$('.dev-full-view-card #copy-text')
					.text( $(obj).text() )
			}else{
				$('.dev-full-view-card #copy-text')
					.text( $('.dev-full-view-card #copy-text').text()+'\r\n '+$(obj).text() )
			}
			var item = $(obj).clone().removeClass('d-none').html()
			$('.dev-card-details').append('<div class="cell-ios">'+item+'</div>')
		})
	})
}


function trash_card(id){

	var url = window.location.origin+"/card/delete"
	var method = "post"

	console.log('id: '+id)

	
	$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $.ajax({
    url: url,
    method: method,
    data: {
    	id:id
    },
    success: function(result){

      $('.dev-alert').remove()
      if( result.error ){
      	var alert = alert_bootstrap('error','Error',result.error)
        $('#principal-container').prepend(alert)
      }

      if( result.yes ){
        var alert = alert_bootstrap('success','Registro',result.yes)
        $('#principal-container').prepend(alert)

        //remover elemento HTML
        $('#list-home-'+result.id).remove()

        //programar tiempo 5s para remover alerta
        setTimeout(function(){
        	$('.dev-alert').remove()
        },2000)



      }

      //ocultar vista de registro
      $('.dev-full-view-card').toggleClass('show-full-card');

    },
    error: function(i,o,u){
      //location.reload();
      console.log('Error al validar')
      console.log(i)
      console.log(o)
      console.log(u)
    }
  });
  
}