$(document).ready(function(){

	$('#btnShowFechas').hide()

	boton_busqueda_de_registros()

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
		//limpiar informacion de maestro que tiene el contacto
		$('#addContactToMaster').val('');
		$('#masterselect').html('');
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
		var alto = $( '#list-home-'+idCerrar ).height();
		alto += parseInt( $( '#list-home-'+idCerrar ).css('padding-top').replace('px', '') )
		alto -= $('.tab-head').height();
		alto -= 20

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

		/* ocultar buscador */
		$('#hover-search').hide()
		$('#search-txt').hide('fast')

		//ocultar campos para mostrar sólo en formulario EDIT
		$('.solo-edit').hide()

		//$('.bg-spinner').removeClass('end-this')

		animacion_cambiar_panel_ios('Nuevo Registro',2)

		limpiar_formulario_cards()
		//LLENAR FORMULARIO PARA AGREGAR PRUEBA
		//prueba_formulario_registro_cards()
		//ocultar boton de buscar
		$('#btnSearchCards').hide()
		//ocultar boton editar
		$('#btnEditCard').hide()
		//mostrar boton agregar
		$('#menu-dash-left').hide()
		$('#btnAddCard').show()

		$('#btnBackView').data('cardid',0)
		$('#btnBackView').show()


	})

	//btn CREATE
	$('#btnAddCard').click(function(){

		//
		$('.bg-spinner').removeClass('end-this')
		// VARIABLE exo = 0 // CREAR
		// VARIABLE exo = 1 // EDITAR
		var exo = 0;
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
/*
swal("A wild Pikachu appeared! What do you want to do?", {
  buttons: {
    cancel: "Run away!",
    catch: {
      text: "Throw Pokéball!",
      value: "catch",
    },
    defeat: true,
  },
})
.then((value) => {
  switch (value) {
 
    case "defeat":
      swal("Pikachu fainted! You gained 500 XP!");
      break;
 
    case "catch":
      swal("Gotcha!", "Pikachu was caught!", "success");
      break;
 
    default:
      swal("Got away safely!");
  }
});
*/

	$('#trashCard').click(function(){
		/*
		var borrar = confirm('Esta seguro que desea eliminar el registro?')
		if( borrar ){
			trash_card( $(this).data('cardid') )
		}
		*/


		//$('body').append(HTMLTrashCardModal)

		// Swal.fire({
		//   title: 'Hecho!',
		//   text: result.yes,
		//   icon: 'success',
		//   confirmButtonText: 'Ok!',
		// })

		let cardid = $(this).data('cardid')
		

		Swal.fire({
		  title: 'Estás Seguro?',
		  text: "No podrás revertir esto.",
		  icon: 'warning',
		  showCancelButton: true,
		  cancelButtonText: 'Cancelar',
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, Eliminar contacto!'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	trash_card( cardid )
		  }
		})


	})




	/* AGREGAR CONTACTO A MAESTRO */
	agregar_contacto_a_maestro()

	//clone menu sticky mastertabs
	$('.masterTabs-head')
		.clone()
		.attr('id', 'sticky-menu')
		.appendTo('.masterTabs')

	$('#sticky-menu h2').remove()

	//menu sticky
	$(window).on("scroll", function(){
	  menu_sticky_contactos()
	});


	//funcion_tabs_head
	active_tabs_head()

	$('.masterTabs-head button:nth-child(1)')
		.attr('data-anuncio')

	$('.masterTabs-head button:nth-child(1)').click()

	estados_del_contacto()

	agregar_numero_contador_de_contactos()

	mostrar_alerta_contactos_que_no_contestan()


})

function mostrar_alerta_contactos_que_no_contestan(){
}

function boton_busqueda_de_registros(){
	$('#btnSearchCards').click(function(){
		$('#hover-search').hide()
		$('#search-txt').show('fast')
		$('#txtSearch').focus()
	})

	$('#txtSearch').keypress(function(event){
		if( $('#txtSearch').val().length >= 2 ){
			//enviar valor para buscar contactos
			let value = $('#txtSearch').val(),
					url = window.location.origin+'/contacto/busqueda',
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
					$('#hover-search').show()
		    	
		    	if( result.yes ){
		    		for ( let y = 0; y < result.search.length; y++){
		    			let contacto = result.search[y];
		    			let maestro = (( contacto.maestro.length > 0 ) ? contacto.maestro[0].name : 'Sin Maestro' )
		    			$('#hover-search')
		    				.append('<span class="list-contacto" data-id="list-home-'+contacto.id+'">'+
		    					'<b>Nombre: </b>'+contacto.name+'<br>'+
		    					'<b>Número: </b>+('+contacto.prefix+') '+contacto.phone+'<br>'+
		    					'<b>Fecha de ingreso: </b>'+contacto.created_at+'<br>'+
		    					'<span class="mi-maestro">'+maestro+'</span>'+
		    				'</span>')
		    				if( y == result.search.length-1 ){
		    					open_modal_card()
		    				}
		    		}

		    		if( result.search.length == 0 ){
		    			//NO HAY RESULTADOS
		    			$('#hover-search')
		    				.append('<span class="list-contacto" data-id="list-home">'+
		    					'<h6>No hay resultados para la busqueda: <b>'+value+'</b></h6>'+
		    				'</span>')
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

function agregar_numero_contador_de_contactos(){
	$('.masterTabs button[data-state="1"]')
		.append('<span class="notify-number">'+countEstadoNuevo+'</span>')
	$('.masterTabs button[data-state="2"]')
		.append('<span class="notify-number">'+countEstadoPendiente+'</span>')
	$('.masterTabs button[data-state="3"]')
		.append('<span class="notify-number">'+countEstadoEfectivo+'</span>')
	$('.masterTabs button[data-state="4"]')
		.append('<span class="notify-number">'+countEstadoNoEfectivo+'</span>')
	$('.masterTabs button[data-state="5"]')
		.append('<span class="notify-number">'+countEstadoNoContesta+'</span>')
}

function menu_sticky_contactos(){
	if ( $(this).scrollTop() >= 93 ){
	  //Muestra al otro <div>
	  $('#sticky-menu').addClass('on-scroll')
	}
	else{
	  //Lo oculta
	  $('#sticky-menu').removeClass('on-scroll')
	}
}

function activar_lista_de_contactos(clase,name,state){
	$('.masterTabs-head').attr('class', 'row masterTabs-head justify-content-center '+clase)
	$('.masterTabs-head h2').html(name)
	$('.masterTabs-head button').attr('data-active', 0)
	$('.masterTabs-head button[data-state="'+state+'"]').attr('data-active', 1)

	$('#cards-list-tab').attr('data-activethis', clase)
	$('#cards-list-tab').data('activethis', clase)
}

function active_tabs_head(){
	$('.masterTabs-head button').click(function(){
		let state = $(this).data('state')
		let clase = $(this).attr('class')
		let name = $(this).data('name')

		//$('.masterTabs-head button').attr('data-active', 0)
		clase = clase.replace('tab-head btn ', '')
		//$('.masterTabs-head button.'+clase).attr('data-active', 1)
		activar_lista_de_contactos(clase,name,state)

		if( $('.info-txt').length > 0 ){
			if( $('#panel-ios-1').data('master') == 0 ){
				if( state == 1 ){
					$('.info-txt').show()
				}else{
					$('.info-txt').hide()
				}
			}else{
				if( state == 2 ){
					$('.info-txt').show()
				}else{
					$('.info-txt').hide()
				}
			}
		}

		$("body, html").animate({
			scrollTop: 0
		}, 0);

	})

	let master = $('#panel-ios-1').data('master')
	if( master ){
		var clase2 = 'list-group-item-secondary'
	}else{
		var clase2 = 'list-group-item-success'
	}

	$('.masterTabs-head').addClass(clase2)
}

function estados_del_contacto(){
	$('#btns-actions button').click(function(){
		if( $(this).hasClass('active') ){

		}else{			
			var state = $(this).data('state')
			var clase = $(this).attr('class')
			var name = $(this).data('name')
			var contacto_id = $('.dev-full-view-card').data('cardid')
			clase = clase.replace('btn ', '')
			var stateOld = $('#btns-actions button.active').data('state')

			$('#btns-actions button').removeClass('active')
			$(this).addClass('active')
			
			$('.bg-spinner').removeClass('end-this')

			setTimeout(function(){

				$('.dev-show-card').attr('class', 'dev-show-card '+clase)
				//$('#btns-actions h6').attr('class', 'text-center '+clase)

				let url = window.location.origin+'/contacto/estado';
				$.ajaxSetup({
			    headers: {
			      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			    }
		  	});

			  $.ajax({
			    url: url,
			    method: "POST",
			    data: {
			    	contacto_id:contacto_id,
			    	state:state
			    },
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

			        $('#list-home-'+contacto_id).attr('class', 'list-group-item list-group-item-action '+clase+' actived active-click')
							activar_lista_de_contactos(clase,name,state)

							//actualizar notificacion numero estado anterior
							if( stateOld === undefined ){
								var notifyOld = $('.masterTabs button[data-state="2"] .notify-number')
								var numOld = Number(notifyOld.html())
			        	numOld--;
			        	notifyOld.html(numOld)
							}else{
								var notifyOld = $('.masterTabs button[data-state="'+stateOld+'"] .notify-number')
								var numOld = Number(notifyOld.html())
			        	numOld--;
			        	notifyOld.html(numOld)
							}

							//actualizar notificacion numero estado actualizado
							var notify = $('.masterTabs button[data-state="'+state+'"] .notify-number')
							var numActualPendiente = Number(notify.html())
		        	numActualPendiente++;
		        	notify.html(numActualPendiente)

		        	/* ACTUALIZAR VARIABLES GLOBALES EN EL ESTADO DE LA APLICACIÓN */ 

		        	switch(stateOld){
		        		case 1:
		        		countEstadoNuevo--;
		        			break;
		        		case 2:
		        		countEstadoPendiente--;
		        			break;
		        		case 3:
		        		countEstadoEfectivo--;
		        			break;
		        		case 4:
		        		countEstadoNoEfectivo--;
		        			break;
		        		case 5:
		        		countEstadoNoContesta--;
		        			break;
		        	}

		        	switch(state){
		        		case 1:
		        		countEstadoNuevo++;
		        			break;
		        		case 2:
		        		countEstadoPendiente++;
		        			break;
		        		case 3:
		        		countEstadoEfectivo++;
		        			break;
		        		case 4:
		        		countEstadoNoEfectivo++;
		        			break;
		        		case 5:
		        		countEstadoNoContesta++;
		        			break;
		        	}





							$('.bg-spinner').addClass('end-this')

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

			}, 200)
		}
	})
}

function agregar_contacto_a_maestro(){
	$('#addContactToMaster').change(function() {

		$('.bg-spinner').removeClass('end-this')
	  var user_id = $(this).find('option:selected').val()
	  var contacto_id = $('#addContactToMaster').data('idcontact');
	  //console.log('user:' +user_id)
	  //console.log('contacto:' +contacto_id)
	  var url = window.location.origin+"/contactos/addmaestro"
		var method = "post"

		setTimeout(function(){

		  //console.log(maestroSeleccionado);
		  $.ajaxSetup({
		    headers: {
		      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		    }
	  	});

		  $.ajax({
		    url: url,
		    method: method,
		    data: {
		    	user_id:user_id,
		    	contacto_id:contacto_id
		    },
		    success: function(result){

		    	console.log('success')

		      // $('.dev-alert').remove()
		      if( result.error ){
		      	// var alert = alert_bootstrap('error','Error',result.error)
		       //  $('#principal-container').prepend(alert)
		       //  $('body').addClass('dev-ios-alert')
		       	Swal.fire({
						  title: 'Error!',
						  text: result.error,
						  icon: 'error',
						  confirmButtonText: 'Ok!'
						})
		      }

		      if( result.yes ){

		        Swal.fire({
						  title: 'Enviado!',
						  html: result.yes,
						  icon: 'success',
						  confirmButtonText: 'Ok!'
						})

		  			var master = $('#addContactToMaster > option[value="'+result.user_id+'"]').text();
		        $('#masterselect').text(master)

		        $('#addContactToMaster option').removeAttr('selected')
	        	$('#addContactToMaster option[value="'+result.user_id+'"]').attr('selected', 'selected')

		        //agregar clase de fila al nuevo elemento
		        $('#list-home-'+result.contacto_id)
		        	.attr({'class':'list-group-item list-group-item-action '+result.clase+' active-click'})
		        	.show()

						if( $('.dev-show-card.list-group-item-secondary').length > 0 ){
							
						}else{
							//actualizar notificacion numero estado anterior
							var notifyOld = $('.masterTabs button[data-state="'+result.oldstate+'"] .notify-number')
							var numOld = Number(notifyOld.html())
		        	numOld--;
		        	notifyOld.html(numOld)
							

							console.log( 'estado nuevo' )
							console.log( numOld )

							//actualizar notificacion numero estado pendiente
							var notify = $('.masterTabs button[data-state="2"] .notify-number')
							var numActualPendiente = Number(notify.html())
		        	numActualPendiente++;
		        	notify.html(numActualPendiente)

		        	countEstadoPendiente++;
		        	
		        	switch(result.oldstate){
		        		case 1:
		        		countEstadoNuevo--;
		        			break;
		        		case 2:
		        		countEstadoPendiente--;
		        			break;
		        		case 3:
		        		countEstadoEfectivo--;
		        			break;
		        		case 4:
		        		countEstadoNoEfectivo--;
		        			break;
		        		case 5:
		        		countEstadoNoContesta--;
		        			break;
		        	}

						}

						$('.dev-show-card').attr('class', 'dev-show-card '+result.clase)
						$('#btns-actions button').removeClass('active')
						$('#btns-actions button.'+result.clase).addClass('active')
						//$('#btns-actions h6').attr('class', 'text-center '+result.clase)
						activar_lista_de_contactos(result.clase,'Pendiente',2)



						$('#list-home-'+result.contacto_id).find('.maestro').data('masterid', result.user_id)
		        $('#list-home-'+result.contacto_id).find('.maestro').html(master)
						$('.dev-card-details .maestro').html(master);


						$('.bg-spinner').addClass('end-this')

			    	
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
		}, 200)
	  
	});

}


function button_close_alert(){
	$('#principal-container button.close').click(function(){
		$('.dev-alert').remove()
	})
}

function animacion_cambiar_panel_ios(msj,vista){
	//cambio entre el panel 1 y el panel 2 para la animación de las vistas
	if( vista == 1 ){
		$('#panel-ios-1').addClass('panel-active')
		$('#panel-ios-2').removeClass('panel-active')
		$('#panel-ios-3').removeClass('panel-active')
	}else if( vista == 2 ){
		$('#panel-ios-1').removeClass('panel-active')
		$('#panel-ios-2').addClass('panel-active')
		$('#panel-ios-3').removeClass('panel-active')
	}else if( vista == 3 ){
		$('#panel-ios-1').removeClass('panel-active')
		$('#panel-ios-2').removeClass('panel-active')
		$('#panel-ios-3').addClass('panel-active')
	}
	$('.navbar-brand > span').html(msj)
}

function funciones_volver_vista_principal(cardid){
	animacion_cambiar_panel_ios('Lista De Contactos',1)
	$('#btnEditCard').hide()
	$('#btnBackView').hide()
	$('#btnAddCard').hide()
	$('#btnAddCards').show()
	$('#btnSearchCards').show()
	//$('.masterTabs-head button:first-of-type').click()
	$('#menu-dash-left').show()
	console.log(cardid)

	setTimeout(function(){
		if( cardid != 'list-home-0' ){
			var position = $('#'+cardid).offset().top;
			var alto = $('#'+cardid).height();
			alto += parseInt( $('#'+cardid).css('padding-top').replace('px', '') )
			alto -= $('.tab-head').height();
			alto -= 20
		}else{
			var position = 0;
			var alto = 0;
		}
		$("body, html").animate({
			scrollTop: position-alto
		}, 0);
	},200)




}


function function_to_view_edit_card(){
	$('#editCard').click(function(){
		$("body, html").animate({
			scrollTop: 0
		}, 0);
		//mostrar campos sólo en formulario EDIT
		$('.solo-edit').show()

		animacion_cambiar_panel_ios('Editar Registro',2)

		//limpiar formulario cards
		limpiar_formulario_cards()
		//obtener ide a editar
		var ide = $(this).data('cardid')

		//obtener datos de la card para editar

		//Formatear Datos
		var fCountry = ( $('#list-home-'+ide+' .country').text().includes('( Sin Agregar )') ) ? '' : $('#list-home-'+ide+' .country').text()
		var fCity = ( $('#list-home-'+ide+' .city').text().includes('( Sin Agregar )') ) ? '' : $('#list-home-'+ide+' .city').text()
		var fBirth_date = ( $('#list-home-'+ide+' .birth_date').text().includes('( Sin Agregar )') ) ? '' : $('#list-home-'+ide+' .birth_date').text()
		var fState = ( $('#list-home-'+ide+' .state').text().includes('( Sin Agregar )') ) ? '' : $('#list-home-'+ide+' .state').text()


		var card = {
			to: $('#list-home-'+ide+' .to').text(),
			name: $('#list-home-'+ide+' .name').text(),
			prefix: $('#list-home-'+ide+' .prefix').text(),
			phone: $('#list-home-'+ide+' .phone').text(),
			country: fCountry,
			city: fCity,
			state: fState,
			birth_date: fBirth_date
		}

		//poner datos en el formulario de creacion
		$('#to').val(card.to),
		$('#name').val( card.name )
		$('#phone').val( card.phone )
		$('#prefix').val( card.prefix )
		$('#country').val( card.country )
		$('#city').val( card.city )
		$('#state').val( card.state )
		$('#birth_date').val( card.birth_date )
		
		//ocultar 
		$('.dev-full-view-card').data('cardid',0)
		$('.dev-full-view-card').toggleClass('show-full-card')
		//ocultar boton crear
		$('#btnAddCard').hide()
		$('#menu-dash-left').hide()
		//mostrar boton editar y agregar ide
		$('#btnBackView').attr('data-cardid',ide)
		$('#btnBackView').data('cardid',ide)
		$('#btnBackView').show()

		$('#btnEditCard').data('cardid',ide)
		$('#btnEditCard').show()

	})
}


function limpiar_formulario_cards(){
	$('#to').val('')
	$('#name').val('')
	$('#phone').val('')
	$('#prefix').val('')
	$('#country').val('')
	$('#city').val('')
	$('#state').val('')
	$('#birth_date').val('')
	$('#formCards input').css({'border':0,'border-bottom':'1px solid lightgrey'})
}


function get_inputs_form_cards(){
	var card
	return card = {
		to: $('#to').val(),
		name: $('#name').val(),
		prefix: $('#prefix').val(),
		phone: $('#phone').val(),
		country: $('#country').val(),
		city: $('#city').val(),
		state: $('#state').val(),
		birth_date: $('#birth_date').val()
	}
}

function validate_inputs_form_cards(){
	var vacios=0;
	$('#formCards input').each(function(){
		if( $(this).val() == '' || $(this).val() == undefined ){
			if( $(this).attr('id').includes('country') || 
				$(this).attr('id').includes('city') || 
				$(this).attr('id').includes('birth_date') ||
				$(this).attr('id').includes('state') ||
				$(this).attr('id').includes('to') ){

			}else{
				vacios++;
				$(this).css('border', '1px solid red');
			}
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
	//exo >= 1 // EDITAR
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
		var url = window.location.origin+"/contactos/editc"
		var method = "put"
	}else{
		var url = window.location.origin+"/contactos/createc"
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
        	//SI ES UN ELEMENTO EXISTENTE
        }else{

        	//CLONO ELEMENTO HTML
        	//CREO EL ID
	        $('#list-home-0')
	        	.clone()
	        	.attr('id', cardId)
	        	.appendTo('#cards-list-tab')

	        //MODIFICO ID CREADO
	        $('#'+cardId)
	        	.find('.num-card')
	        	.html($('#cards-list-tab button').length-1)

	        //agregar clase de fila al nuevo elemento
	        if( $('#panel-ios-1').data('master') == 0 ){

	        	$('#'+cardId)
	        		.attr('class', 'list-group-item list-group-item-action list-group-item-info')

	        	$('#'+cardId+' .maestro').attr('data-masterid', 0)
	        	$('#'+cardId+' .maestro').data('masterid', 0)
	        	$('#'+cardId+' .maestro').html('( Sin Agregar )')

	        	var numActual = Number($('.masterTabs button[data-state="1"] .notify-number').html())
        		numActual++;

	        	$('.masterTabs button[data-state="1"] .notify-number').html(numActual)

	        }else{

	        	var numActual = Number($('.masterTabs button[data-state="2"] .notify-number').html())
        		numActual++;

	        	$('.masterTabs button[data-state="2"] .notify-number').html(numActual)

		        $('#'+cardId)
		        	.attr('class', 'list-group-item list-group-item-action list-group-item-secondary')
	        }

        	//inicializo funciones ( JS ) agregadas a este elemento
	        //funcion ver elemento en modal
	        show_data_in_modal('#'+cardId)
	        //aumento el identificador para las pruebas
	        var newid = $('#cards-list-tab').data('newid')
	        newid++
	        $('#cards-list-tab').data('newid', newid)        	

	        $('.masterTabs-head button:first-of-type').click()
        }//end validation of create new element

        //MODIFICO ID CREADO CON LOS NUEVOS DATOS
        result.card.country = ( result.card.country == '' ) ? '( Sin Agregar )' : result.card.country
        result.card.city = ( result.card.city == '' ) ? '( Sin Agregar )' : result.card.city
        result.card.state = ( result.card.state == '' ) ? '( Sin Agregar )' : result.card.state

        $('#'+cardId+' .name').html( result.card.name )
        $('#'+cardId+' .prefix').html( result.card.prefix )
        $('#'+cardId+' .phone').html( result.card.phone )
        $('#'+cardId+' .country').html( result.card.country )
        $('#'+cardId+' .city').html( result.card.city )
        $('#'+cardId+' .state').html( result.card.state )
        $('#'+cardId+' .created_at').html( result.card.created_at )
        $('#'+cardId+' .updated_at').html( result.card.updated_at )
        //ACTUALIZAR API WHATSAPP
        $('.ref-api-wpp').attr('href', 'https://api.whatsapp.com/send?phone=+'+result.card.prefix+''+result.card.phone)

        //MOSTRAR ELEMENTO CREADO, este se oculta POR FUNCION DE MASTERTABS
        $('#'+cardId).show()

        $('#menu-dash-left').show()

        //limpio formulario registro
        limpiar_formulario_cards()

	    	funciones_volver_vista_principal( cardId )

	    	//ocultar mensaje de esperando contactos
        if( $('.info-txt').length > 0 ){
        	$('.info-txt').hide()
        }

				$('.bg-spinner').addClass('end-this')


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
	$('#formCards #phone').val(ide+''+ide+''+ide)
	$('#formCards #prefix').val(ide)
}


function obtener_maestro_de_contacto(ide){
	var url = window.location.origin+"/contactos/"+ide+"/getmaestro/"
	var method = "get"
	
	$.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $.ajax({
    url: url,
    method: method,
    data: {
    	id:ide
    },
    success: function(res){

      if( res.yes ){
        /* PARAMETRO A MODIFICAR DESPUES DE ALERTAS **/
        // console.log('name: '+res.name)
        // console.log('id-res: '+res.id)
        $('#masterselect').html(res.name)
        $('#addContactToMaster option').removeAttr('selected')
        $('#addContactToMaster option[value="'+res.id+'"]').attr('selected', 'selected')
        //END LOADER
				$('.bg-spinner').addClass('end-this')
      }

      if( res.msj ){
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


		//INIT LOADER
		//$('.bg-spinner').removeClass('end-this')
		var clase = $(this).attr('class')
		clase = clase.replace('list-group-item list-group-item-action ','')
		clase = clase.replace('actived','')
		clase = clase.replace('active-click','')

		//Defino Clase de validacion
		if( $(e.target).prop("tagName") == 'path' ){
			if( $(e.target).parent('svg').attr('class').includes('bi-bookmark-check') ||
				$(e.target).parent('svg').attr('class').includes('bi-bookmark-x') ){
				tClass = $(e.target).closest('button').attr('class')
			}
		}else{
			tClass = $(e.target).attr('class')
			if( tClass == undefined ){
				tClass = 'none';
			}
		}
		
		if( tClass == 'dev-api-wpp' ||
			tClass == 'ref-api-wpp' || 
			tClass == 'bi bi-whatsapp' ){
			//no hacer nada si doy click en whatsapp
		}else{
			var id = $(this).attr('id')
			var numberId = id.replace('list-home-','')
			$('#cards-list-tab button.active-click').removeClass('active-click')
			$(this).addClass('active-click')
			setTimeout(function(){
				$('.dev-show-card').attr('class', 'dev-show-card '+clase)
				$('#btns-actions button').removeClass('active')
				$('#btns-actions button.'+clase).addClass('active')
				//$('#btns-actions h6').attr('class', 'text-center '+clase)
				$('.dev-card-details').empty()
				//agregar identificador de elemento
				$('.dev-full-view-card').data('cardid',numberId)
				$('.dev-full-view-card').toggleClass('show-full-card')
				$('.show-full-card').css({'min-height':window.outerHeight+'px'})

				$('#addContactToMaster').find('option:selected').removeAttr('selected')
				$('#addContactToMaster').find('option:selected').prop('selected', false)
				$('#addContactToMaster').data('idcontact',numberId)
				var maestro = $('#'+id).find('.maestro').html()
				var masterid = $('#'+id).find('.maestro').data('masterid')
				console.log( masterid )
				$('#addContactToMaster').val(masterid)
				$('#addContactToMaster option[value="'+masterid+'"]').attr('selected', 'selected')
				$('#masterselect').html(maestro)

				//add ID card to btnEditCard and btnDestroy
				$('#trashCard').data('cardid',numberId)
				$('#editCard').data('cardid',numberId)
				//todo span con la clase infoMaster será pasado a la vista del modal
				$('#'+id+' .infoMaster').each(function(i,obj){
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
			//obtener_maestro_de_contacto(numberId)


		}
	})
}




function trash_card(id){

	var url = window.location.origin+"/contactos/delete"
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

      //ocultar vista de registro
      $('.dev-full-view-card').toggleClass('show-full-card');

      if( result.yes ){

				animacion_cambiar_panel_ios('Lista De Contactos',1)

				//actualizar notificacion numero estado anterior
				var notifyOld = $('.masterTabs button[data-state="'+result.oldState+'"] .notify-number')
				var numOld = Number(notifyOld.html())
      	numOld--;
      	notifyOld.html(numOld)

				switch(result.oldState){
      		case 1:
      		countEstadoNuevo--;
      			break;
      		case 2:
      		countEstadoPendiente--;
      			break;
      		case 3:
      		countEstadoEfectivo--;
      			break;
      		case 4:
      		countEstadoNoEfectivo--;
      			break;
      		case 5:
      		countEstadoNoContesta--;
      			break;
      	}
		    
        //remover elemento HTML
        $('#list-home-'+result.id).remove()

				Swal.fire(
		      result.yes,
		      result.msj,
		      'success'
		    )


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