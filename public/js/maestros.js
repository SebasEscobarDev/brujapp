$(document).ready(function(){
	
	boton_busqueda_de_registros()

	$('#btnShowFechas').hide()

	//ocultar boton agregar Tarjeta
	$('#btnAddCard').hide()
	//ocultar boton editar Tarjeta
	$('#btnEditCard').hide()

	$('#btnBackView').click(function(){
		var ide = $(this).data('cardid')
		funciones_volver_vista_principal('list-home-'+ide)
	})

	//cerrar modal de vista card
	$('.dev-icon-arrow-card, .cancelPanel, .zona-modal-out').click(function(){
		$('.dev-full-view-card').toggleClass('show-full-card')
		//validar click para obtener posicion de elemento
		if( $(this).hasClass('dev-icon-arrow-card') ){
			var idCerrar = $(this).parent().data('cardid')
		}
		if( $(this).hasClass('cancelPanel') ){
			var idCerrar = $(this).parent().parent().data('cardid')
		}
		if( $(this).hasClass('zona-modal-out') ){
			var idCerrar = $(this).parent().data('cardid')
		}
		
		$('#panel-ios-1').addClass('panel-active')

		var position = $( '#list-home-'+idCerrar ).offset().top;
		var alto = $('#list-home-'+idCerrar).height();
		alto += parseInt( $('#list-home-'+idCerrar).css('padding-top').replace('px', '') )
		//alto -= $('.tab-head').height();
		alto -= 100

		$("body, html").animate({
			scrollTop: position-alto
		}, 0);

		$('.dev-full-view-card').data('cardid',0)


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

		animacion_cambiar_panel_ios('Nuevo Registro', 2)

		limpiar_formulario_cards()

		//LLENAR FORMULARIO PARA AGREGAR PRUEBA
		//prueba_formulario_registro_cards()

		//ocultar boton de buscar
		$('#btnSearchCards').hide()
		//ocultar boton editar
		$('#btnEditCard').hide()
		$('#menu-dash-left').hide()
		//mostrar boton agregar
		$('#btnAddCard').show()

		$('#btnBackView').data('cardid',0)
		$('#btnBackView').show()



	})

	//btn CREATE
	$('#btnAddCard').click(function(){
		$('.bg-spinner').removeClass('end-this')
		// VARIABLE exo = 0 // CREAR
		// VARIABLE exo = 1 // EDITAR
		var exo = 0
		setTimeout(function(){
    	ejecutar_funcion_AJAX_SEND_HTTP_REQUEST(exo)
		},200)

	}) //end CREATE








	/**********************************/
	/*               EDIT             */
	function_to_view_edit_card()

	/* FUNCTION TO SEND DATA CONTROLLER EDIT CARD  */
	$('#btnEditCard').click(function(){
		$('.bg-spinner').removeClass('end-this')
		var ide = $(this).data('cardid')
		var exo = ide;
		setTimeout(function(){
			ejecutar_funcion_AJAX_SEND_HTTP_REQUEST(exo)
		},200)

	})
	/**********************************/



	/*        DELETE        */
	$('#trashCard').click(function(){
		let cardid = $(this).data('cardid')
		Swal.fire({
		  title: 'Estás Seguro?',
		  text: "No podrás revertir esto.",
		  icon: 'warning',
		  showCancelButton: true,
		  cancelButtonText: 'Cancelar',
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, Eliminar Maestro!'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	trash_card( cardid )
		  }
		})
	})


	active_or_inactive_menu()

	$('#cards-list-tab button[data-btnactive="0"]').hide()

	activos_e_inactivos()

})

//modifi function ffor maestros 
function boton_busqueda_de_registros(){
	$('#btnSearchCards').click(function(){
		$('#hover-search').empty()
		$('#search-txt').show('fast')
		$('#txtSearch').focus()
	})

	$('#txtSearch').keypress(function(event){
		if( $('#txtSearch').val().length >= 2 ){
			//enviar valor para buscar contactos
			let value = $('#txtSearch').val(),
					url = window.location.origin+'/maestros/busqueda',
					method = 'GET';

			$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
		  $.ajax({
		    url: url,
		    method: method,
		    data: { value:value },
		    success: function(result){

		    	if( $('#hover-search').length == 0 ){
				  	$('#search-txt').append('<div id="hover-search"></div>')
		    	}else{
		    		$('#hover-search').empty()
		    	}

		    	if( result.error ){
		      	
		      }
		    	
		    	if( result.yes ){
		    		for ( let y = 0; y < result.search.length; y++){
		    			let maestro = result.search[y];
		    			$('#hover-search')
		    				.append('<span class="list-contacto" data-id="list-home-'+maestro.id+'">'+
		    					'<b>Nombre: </b>'+maestro.name+'<br>'+
		    					'<b>Correo: </b>'+maestro.email+'<br>'+
		    				'</span>')
		    				if( y == result.search.length-1 ){
		    					open_modal_card()
		    				}
		    		}
		    		function open_modal_card(){
		    			$('.list-contacto').click(function(){
		    				$('#'+$(this).data('id')).click()
		    				$('#hover-search').empty()
								$('#search-txt').hide('fast')
								$('#txtSearch').val('')
		    			})
		    		}
			  	}
			    console.log( "$$$$$$$$$$$$$$$$$$$$$$$$$$" )
			    console.log( result.search )
			    console.log( "$$$$$$$$$$$$$$$$$$$$$$$$$$" )

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
	})

	$('#close-search').click(function(){
		$('#search-txt').hide('fast')
		$('#hover-search').empty()
		$('#txtSearch').val('')
	})
}


function activos_e_inactivos(){
	$('#btnStates button').click(function(){
		var active = $(this).data('btnactive')
		$('#cards-list-tab button').hide()
		$('#cards-list-tab button[data-btnactive="'+active+'"]').show()

	})
}


function active_or_inactive_menu(){
	$('.menu-actives button').click(function(){
		if( $(this).hasClass('active') ){
		}else{
			$('.menu-actives button').removeClass('active')
			$(this).addClass('active')
		}
	})
}

function active_or_inactive_data(maestro_id,state){
	$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: window.location.origin+'/maestro/estado',
    method: 'post',
    data: { maestro_id:maestro_id, state:state },
    success: function(data){
    	if( data.error ){
       	Swal.fire({
				  title: 'Error!',
				  text: data.error,
				  icon: 'error',
				  confirmButtonText: 'Ok!'
				})
      }
      if( data.yes ){
        Swal.fire({
				  title: 'Hecho!',
				  text: data.yes,
				  icon: 'success',
				  confirmButtonText: 'Ok!'
				})
				$('#list-home-'+data.id).attr('data-btnactive', data.active)
				$('#list-home-'+data.id).data('btnactive', data.active)
			}
    },
    error: function(data){
    	console.log(data)
    }
  });
}

function animacion_cambiar_panel_ios(msj,vista){
	//cambio entre el panel 1 y el panel 2 para la animación de las vistas
	if( vista == 2 ){
		$('#panel-ios-1').removeClass('panel-active')
		$('#panel-ios-2').addClass('panel-active')
	}else{
		$('#panel-ios-1').addClass('panel-active')
		$('#panel-ios-2').removeClass('panel-active')
	}
	$('.navbar-brand > span').html(msj)
}

function funciones_volver_vista_principal(cardid){
	animacion_cambiar_panel_ios('Maestros Disponibles',1)
	$('#btnEditCard').hide()
	$('#btnBackView').hide()
	$('#btnAddCard').hide()
	$('#btnAddCards').show()
	$('#btnSearchCards').show()
	$('#menu-dash-left').show()

	if( cardid != 'list-home-0' ){
		var position = $('#'+cardid).offset().top;
		var alto = $('#'+cardid).height();
		alto += parseInt( $('#'+cardid).css('padding-top').replace('px', '') )
			//alto -= $('.tab-head').height();
		alto -= 100
	}else{
		var position = 0;
		var alto = 0;
	}
	$("body, html").animate({
		scrollTop: position-alto
	}, 0);

}


function function_to_view_edit_card(){
	$('#editCard').click(function(){
		$("body, html").animate({
			scrollTop: 0
		}, 0);
		animacion_cambiar_panel_ios('Editar Registro',2)
		//limpiar formulario cards
		limpiar_formulario_cards()
		//obtener ide a editar
		var ide = $(this).data('cardid')
		//obtener datos de la card para editar
		var card = {
			name: $('#list-home-'+ide+' .name').text(),
			email: $('#list-home-'+ide+' .email').text(),
			password: '',
		}

		//poner datos en el formulario de creacion
		$('#formCards #name').val( card.name )
		$('#formCards #email').val( card.email )
		$('#formCards #password').val( card.password )
		
		//ocultar 
		$('.dev-full-view-card').data('cardid',0)
		$('.dev-full-view-card').toggleClass('show-full-card')
		//ocultar boton crear 
		$('#btnAddCard').hide()
		$('#menu-dash-left').hide()
		//mostrar boton editar y agregar ide
		$('#btnBackView').attr('data-cardid',ide)
		$('#btnBackView').data('cardid', ide)
		$('#btnBackView').show()


		$('#btnEditCard').data('cardid', ide)
		$('#btnEditCard').show()

	})
}

function limpiar_formulario_cards(){
	$('#formCards #name').val('')
	$('#formCards #email').val('')
	$('#formCards #password').val('')
	$('#formCards input').css({'border':0,'border-bottom':'1px solid lightgrey'})
}


function get_inputs_form_cards(){
	var card
	return card = {
		name: $('#formCards #name').val(),
		email: $('#formCards #email').val(),
		password: $('#formCards #password').val()
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

	//valido inputs vacios retorno mensaje de validacion
	var vacios = validate_inputs_form_cards()
	if ( vacios ) {
		Swal.fire({
		  title: 'Error!',
		  text: 'Ingrese Todos Los Campos Requeridos!',
		  icon: 'error',
		  confirmButtonText: 'Ok!'
		})
		return 
	}

	//guardar datos para enviar contenido AJAX
	var card = get_inputs_form_cards()

	if( exo ){
		var url = window.location.origin+"/maestros/edit"
		var method = "put"
	}else{
		var url = window.location.origin+"/maestros/create"
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

      if( result.error ){
      	
      	Swal.fire({
				  title: 'Error!',
				  text: result.error,
				  icon: 'error',
				  confirmButtonText: 'Ok!'
				})

      }

      if( result.yes ){

      	Swal.fire({
				  title: 'Hecho!',
				  text: result.yes,
				  icon: 'success',
				  confirmButtonText: 'Ok!'
				})

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

	        //agregar numero de fila al nuevo elemento
	        $('#'+cardId)
	        	.find('.num-card')
	        	.html($('#cards-list-tab button').length)

        	//inicializo funciones ( JS ) agregadas a este elemento
	        //funcion ver elemento en modal
	        show_data_in_modal('#'+cardId)
	        //aumento el identificador para las pruebas
	        var newid = $('#cards-list-tab').data('newid')
	        newid++
	        $('#cards-list-tab').data('newid', newid)

	        //function_to_view_edit_card()

        }

        //MODIFICO ELEMENTO CON LOS NUEVOS DATOS DEL CARD
        $('#'+cardId+' .name').html( result.card.name )
        $('#'+cardId+' .email').html( result.card.email )
        $('#'+cardId+' .password').html( '*************' )
        $('#'+cardId+' .contactos').html('0')
        $('#'+cardId+' .datos').html('0')


        //broadcast event create or update result.card.id
        /*
        Echo.private(`cards.${result.card.id}`)
		    .listen('CardUpdate.cards.update', (e) => {
		        console.log(e);
		    });*/


        $('#menu-dash-left').show()

        //limpio formulario registro
        limpiar_formulario_cards()

	    	funciones_volver_vista_principal(cardId)

				$('.bg-spinner').addClass('end-this')

	    	/*
    		window.Echo.channel('dev-canal')
        	.listen('dev-evento', (e) => {
        		console.log(e)
        	});*/
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

	$('#formCards #name').val('prueba: '+ide)
	$('#formCards #email').val('prueba'+ide+'@admin.com')
	$('#formCards #password').val('qaws12pj-22')
}

/*////////////////////////////////////////////*/
/*  FUNCION QUE MUESTRA LOS DATOS EN EL MODAL  */
function show_data_in_modal(element){
	$(element).click(function(e){

		///////////////////////
		//RESET SEARCH BAR
		///////////////////////
		$('#search-txt').hide('fast')
		$('#hover-search').empty()
		$('#txtSearch').val('')

		var numberId = $(this).closest('button').attr('id').replace('list-home-', '')
		var tClass = 'none';
		if( $(e.target).prop("tagName") == 'path' ){
			if( $(e.target).parent('svg').attr('class').includes('bi-bookmark-check') ||
				$(e.target).parent('svg').attr('class').includes('bi-bookmark-x') ){
				tClass = $(e.target).parent('svg').attr('class')
			}
		}else{
			tClass = $(e.target).attr('class')
			if( tClass == undefined ){
				tClass = 'none';
			}
		}
		if( tClass.includes('active-mark') ||
			tClass.includes('bi-bookmark-check') ||
			tClass.includes('close-mark') ||
			tClass.includes('bi-bookmark-x') ){
			var state = $(this).closest('button').data('btnactive')
			//funcion activar o desactivar DATA
			active_or_inactive_data(numberId, state)

		}else{
			var id = $(this).attr('id')
			setTimeout(function(){
				$('#cards-list-tab button').removeClass('active-click')
				$(this).addClass('active-click')
				$('.dev-card-details').empty()

				//agregar identificador de elemento
				$('.dev-full-view-card').data('cardid',numberId)
				$('.dev-full-view-card').toggleClass('show-full-card')
				$('.show-full-card').css({'min-height':window.outerHeight+'px'})

				//add ID card to btnEditCard and btnDestroy
				$('#trashCard').data('cardid',numberId)
				$('#editCard').data('cardid',numberId)

				$('#'+id+' > .infoMaster').each(function(i,obj){
					var item = $(obj).clone().removeClass('d-none').html()
					$('.dev-card-details').append('<div class="cell-ios">'+item+'</div>')
				})
				setTimeout(function(){

					$("body, html").animate({
						scrollTop: 0
					}, 0);
				},200)
				
				$('#panel-ios-1').removeClass('panel-active')
			},200)

			
		}
			
	})
}


function trash_card(id){

	var url = window.location.origin+"/maestros/delete"
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

      if( result.error ){

      	Swal.fire({
				  title: result.error,
				  html: result.msj,
				  icon: 'error',
				  confirmButtonText: 'Ok!'
				})

      }


      if( result.yes ){

		    //click btn-volver
				animacion_cambiar_panel_ios('Lista De Contactos',1)		    
        //remover elemento HTML
        $('#list-home-'+result.id).remove()

				Swal.fire(
		      result.yes,
		      result.msj,
		      'success'
		    )

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