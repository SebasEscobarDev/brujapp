$(document).ready(function(){

	boton_busqueda_de_registros()
	boton_busqueda_de_fechas()
	boton_open_panel_fechas()

	$('#btnSearchCards').show()
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
		//limpiar informacion de maestro que tiene el contcto
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

		animacion_cambiar_panel_ios('Nuevo Registro',2)

		limpiar_formulario_cards()

		//LLENAR FORMULARIO PARA AGREGAR PRUEBA
		//prueba_formulario_registro_cards()

		//ocultar boton de buscar
		$('#btnSearchCards').hide()
		//ocultar boton editar
		//mostrar boton agregar
		$('#btnEditCard').hide()
		//ocultar vista fotos subidas
		$('#menu-dash-left').hide()
		$('.dev-edit-images').hide()
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

		var exo = $(this).data('cardid')
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
		  confirmButtonText: 'Si, Eliminar Facturación!'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	trash_card( cardid )
		  }
		})
	})



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

	$('.masterTabs-head button:nth-child(1)').click()

	estados_de_la_facturacion()

	agregar_numero_contador_de_facturaciones()

})

function boton_busqueda_de_fechas(){
	$('.icon-change-semanas').click(function(){
		$('.change-fechas').show('fast')
	})

	$('#cerrarFechas').click(function(){
		$('.change-fechas').hide('fast')
	})
}

function boton_open_panel_fechas(){



	$('#btnBackViewType').click(function(){
		animacion_cambiar_panel_ios('Facturaciones Disponibles',1)
		$('#btnBackViewType').hide()
		$('#btnBackView').hide()
	})

	$('#btnShowFechas').click(function(){
		$('#addNewSemana').hide()
		animacion_cambiar_panel_ios('Gestionar Semanas', 3)
		$('#btnBackView').hide()
		$('#btnBackViewType').show()
	})


	$('#showFrmAddSemana').click(function(){
		$('#addNewSemana').toggle()
	})

	guardar_semanas()

	inicializar_semanas()

}

//OBJETO Semanas
function Semanas(active,inicio,fin) {
  this.active = active;
  this.nombre = nombre;
  this.campos = campos;
}

//el arreglo de [semanas] se inciializa globalmente desde el index
function inicializar_semanas(){
	for( let i = 0; i < semanas.length; i++ ){
		render_html_semanas(semanas[i])
	}
}
/* END JAVASCRIPT OBJECTS */
function render_html_semanas(semana){
	let active;
	if( semana.active == 1 ){
		active = ' active';
	}else{
		active = '';
	}

	var iconActive = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>'

	var iconDelete = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>'

	$('#render-edit-table-semanas tbody')
		.append('<tr>'+
			'<td class="btn text-left btnForm'+active+'" data-semanaid="'+semana.id+'">'+
				'<span class="finicio">Fecha de inicio: </span>'+semana.Inicio+'<br>	'+
				'<span class="ffin">Fecha fin: </span>'+semana.Fin+'<br>'+
				'<div class="btns-semanas">'+
					'<button class="btn-active-semana">'+iconActive+'</button>'+
					'<button class="btn-delete-semana">'+iconDelete+'</button>'+
				'</div>'+
			'</td>'+
		'</tr>')

	if( $('#panel-ios-1').data('master') == 1 ){
		$('.btn-delete-semana').hide()
	}
	click_activar_semanas()
	click_eliminar_semanas()
}

function click_eliminar_semanas(){
	$('#render-edit-table-semanas > tbody > tr:last-of-type .btn-delete-semana').click(function(){
		$('.bg-spinner').removeClass('end-this')
		var semanaid = $(this).closest('td').data('semanaid')

	  setTimeout(function(){
			let url, method, id;
			url = window.location.origin+"/semanas/delete"
			method = 'POST'
			id = semanaid

			//POST HTTP TYPE ACCOUNT
			$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
		  $.ajax({
		    url: url,
		    method: method,
		    data: {
		    	id:id
		    },
		    success: function(result){
		    	
		    	if( result.yes ){
			    	Swal.fire({
						  title: 'Hecho!',
						  text: result.yes,
						  icon: 'success',
						  confirmButtonText: 'Ok!'
						})
		    	}

					//eliminar registro de variable global [semanas]
	    		semanas = $.grep(semanas, function(obj) {
	    			return obj.id != id; 
	    		});
	    		//eliminar registro renderizado html en agregar y editar tipos
					$('#render-edit-table-semanas tbody td[data-semanaid="'+id+'"]').parent('tr').remove()
					Swal.fire({
					  title: 'Hecho!',
					  text: "Se ha Eliminado Correctamente!",
					  icon: 'success',
					  confirmButtonText: 'Ok!'
					})
					$('.bg-spinner').addClass('end-this')

		    },
		    error: function(i,o,u){
		      //location.reload();
		      console.log('Error al validar')
		      console.log(i)
		      console.log(o)
		      console.log(u)
		    }
		  });

		},200)

	})
}

function click_activar_semanas(){
	$('#render-edit-table-semanas > tbody > tr:last-of-type .btn-active-semana').click(function(){

		var semanaid = $(this).closest('td').data('semanaid')
		$('.bg-spinner').removeClass('end-this')

		//BUSCAR EN ARRAY ASOCIATIVO DE TIPOS MASTER!
	  var result = $.grep(semanas, function(obj){ 
	  	return obj.id == semanaid; 
	  });

		setTimeout(function(){
			let url, method, id, active;
			url = window.location.origin+"/semanas/active"
			method = 'POST'
			id = semanaid
			active = result[0].active

			//POST HTTP TYPE ACCOUNT
			$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
		  $.ajax({
		    url: url,
		    method: method,
		    data: {
		    	id:id,
		    	active:active
		    },
		    success: function(result){
		    	
		    	if( result.yes ){
			    	Swal.fire({
						  title: 'Hecho!',
						  text: result.yes,
						  icon: 'success',
						  confirmButtonText: 'Ok!'
						})
		    	}

					semanas.map(function(obj){
	    			if(obj.id == result.id){
					    obj.active = result.active
					  }
					  return obj;
	    		})

	    		$('#render-edit-table-semanas td').removeClass('active')
	    		$('#render-edit-table-semanas td[data-semanaid="'+result.id+'"]').addClass('active')


		    	$('input[type="text"]').val('')
					$('#saveSemana')
						.data('edit', 0)


					$('.bg-spinner').addClass('end-this')

		    },
		    error: function(i,o,u){
		      //location.reload();
		      console.log('Error al validar')
		      console.log(i)
		      console.log(o)
		      console.log(u)
		    }
		  });

		},200)

		// $('#inicio').val(semana.Inicio)
		// $('#fin').val(semana.Fin)

	})
}

function guardar_semanas(){
	$('#saveSemana').click(function(){
		var id = $(this).data('edit')
		$('.bg-spinner').removeClass('end-this')
		setTimeout(function(){
			//si estan vacios no hago nada
			if( $('#inicio').val() == '' || $('#fin').val() == '' ){
				$('.bg-spinner').addClass('end-this')
				return
			}

			let url, method, inicio, fin;

			url = window.location.origin+"/semanas/save"
			method = 'POST'
			inicio = $('#inicio').val()
			fin = $('#fin').val()

			//POST HTTP TYPE ACCOUNT
			$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
		  $.ajax({
		    url: url,
		    method: method,
		    data: {
		    	id:id,
		    	inicio:inicio,
		      fin:fin
		    },
		    success: function(result){
		    	
		    	if( result.yes ){
			    	Swal.fire({
						  title: 'Hecho!',
						  text: result.yes,
						  icon: 'success',
						  confirmButtonText: 'Ok!'
						})
		    	}

		    	if( result.semana ){
		    		if( result.id == 0 ){
		    			//crear
							semanas.push(result.semana)
			    		semanas[(semanas.length-1)].id = result.id
			    		render_html_semanas(semanas[(semanas.length-1)])
		    		}else{
		    			//actualizar id
			    		semanas.map(function(obj){
			    			if(obj.id == result.id){
							    obj.inicio = result.semana.inicio
							    obj.fin = result.semana.fin
							  }
							  return obj;
			    		})

			    		//actualizo render HTML de id
		    			$('#render-edit-table-semanas td[data-semanaid="'+result.id+'"] span').html('Semana: '+result.semana.id)
		    			$('#render-add-table-semanas td[data-semanaid="'+result.id+'"] span').html('Semana: '+result.semana.id)

		    		}

		    	}

		    	$('input[type="text"]').val('')
					$('#saveType')
						.data('edit', 0)
					
					$('#addtxtcamps').empty()


					$('.bg-spinner').addClass('end-this')

		    },
		    error: function(i,o,u){
		      //location.reload();
		      console.log('Error al validar')
		      console.log(i)
		      console.log(o)
		      console.log(u)
		    }
		  });

		},200)
	})

}

function boton_busqueda_de_registros(){
	$('#btnSearchCards').click(function(){
		$('#search-txt').show('fast')
		$('#txtSearch').focus()
	})

	$('#txtSearch').keypress(function(event){
		if( $('#txtSearch').val().length >= 2 ){
			//enviar valor para buscar contactos
			setTimeout( function(){
				let value = $('#txtSearch').val(),
						fromValue = $('#fromValue').val(),
						toValue = $('#toValue').val(),
						url = window.location.origin+'/facturacion/busqueda',
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
			    			let facturacion = result.search[y];
			    			console.log( facturacion )
			    			let maestro = (( facturacion.user ) ? facturacion.user.name : 'Sin Maestro' )
			    			let contacto = (( facturacion.contacto ) ? facturacion.contacto.name : 'Sin Maestro' )
			    			let campos = JSON.parse(facturacion.dato.campos)
			    			$('#hover-search')
			    				.append('<span class="list-contacto" data-id="list-home-'+facturacion.id+'">'+
			    					'<b>Contacto: </b>'+ contacto+'<br>'+
			    					'<b>Datos: </b>'+campos[0]+' - '+campos[1]+'<br>'+
			    					'<b>Por dónde envía: </b>'+facturacion.envia+'<br>'+
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
			},50 )
		}
	})

	$('#close-search').click(function(){
		$('#search-txt').hide('fast')
		$('#hover-search').empty()
		$('#txtSearch').val('')
	})
}


function agregar_numero_contador_de_facturaciones(){
	$('.masterTabs button[data-state="1"]')
		.append('<span class="notify-number">'+countBorrador+'</span>')
	$('.masterTabs button[data-state="2"]')
		.append('<span class="notify-number">'+countEnRevision+'</span>')
	$('.masterTabs button[data-state="3"]')
		.append('<span class="notify-number">'+countAprobados+'</span>')
	$('.masterTabs button[data-state="4"]')
		.append('<span class="notify-number">'+countRechazados+'</span>')
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
		var state = $(this).data('state')
		var clase = $(this).attr('class')
		var name = $(this).data('name')

		//$('.masterTabs-head button').attr('data-active', 0)
		clase = clase.replace('tab-head btn ', '')
		//$('.masterTabs-head button.'+clase).attr('data-active', 1)
		activar_lista_de_contactos(clase,name,state)

		$("body, html").animate({
			scrollTop: 0
		}, 0);

	})

	var master = $('#panel-ios-1').data('master')
	if( master ){
		var clase2 = 'list-group-item-secondary'
	}else{
		var clase2 = 'list-group-item-info'
	}
		
	$('.masterTabs-head').addClass(clase2)

}

function actualizacion_de_estado_de_facturacion(clase, facturacion_id, state){
	//PROCESO DE ACTUALIZACION DE ESTADO
	setTimeout(function(){
		$('.dev-show-card').attr('class', 'dev-show-card '+clase)
		//$('#btns-actions h6').attr('class', 'text-center '+clase)
		var url = window.location.origin+'/facturacion/estado';
		var stateOld = $('#btns-actions button.active').data('state')

		$.ajaxSetup({
	    headers: {
	      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
  	});

	  $.ajax({
	    url: url,
	    method: "POST",
	    data: {
	    	facturacion_id:facturacion_id,
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
					  title: 'Facturacion Actualizada!',
					  icon: 'success',
					  confirmButtonText: 'Ok!'
					}).then((result) => {
					  if (result.isConfirmed) {
					  	$('.frm-bottom').remove()
					  }
					})

					$('#btns-actions button').removeClass('active')
					$('#btns-actions button[data-state="'+state+'"]').addClass('active')
					
	        $('#list-home-'+facturacion_id).attr('class', 'list-group-item list-group-item-action '+clase+' actived active-click')
					activar_lista_de_contactos(clase,name,state)


					//actualizar notificacion numero estado anterior
					var notifyOld = $('.masterTabs button[data-state="'+stateOld+'"] .notify-number')
					var numOld = Number(notifyOld.html())
        	numOld--;
        	notifyOld.html(numOld)

					//actualizar notificacion numero estado actualizado
					var notify = $('.masterTabs button[data-state="'+state+'"] .notify-number')
					var numActualPendiente = Number(notify.html())
        	numActualPendiente++;
        	notify.html(numActualPendiente)

        	/* ACTUALIZAR VARIABLES GLOBALES EN EL ESTADO DE LA APLICACIÓN */ 
        	switch(stateOld){
        		case 1:
        		countBorrador--;
        			break;
        		case 2:
        		countEnRevision--;
        			break;
        		case 3:
        		countAprobados--;
        			break;
        		case 4:
        		countRechazados--;
        			break;
        	}

        	switch(state){
        		case 1:
        		countBorrador++;
        			break;
        		case 2:
        		countEnRevision++;
        			break;
        		case 3:
        		countAprobados++;
        			break;
        		case 4:
        		countRechazados++;
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
	},200)
}

var svgUpdateIcon = '<svg width="25" height="25" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
	  '<path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>'+
	'</svg>'

var svgXClose = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">'+
	  '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'+
	'</svg>'

var svgMoneySign = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">'+
	  '<path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>'+
	  '<path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>'+
	  '<path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>'+
	  '<path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>'+
	'</svg>'

var svgXOctagon = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">'+
	  '<path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>'+
	  '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'+
	'</svg>'


function estados_de_la_facturacion(){
	$('#btns-actions button').click(function(){
		if( $(this).hasClass('active') ){

		}else{
			var state = $(this).attr('data-state')
			var clase = $(this).attr('class')
			var name = $(this).data('name')
			var facturacion_id = $('.dev-full-view-card').data('cardid')
			clase = clase.replace('btn ', '')

			if( state == 3 ){
	  		//pedir ingreso del tipo de moneda
	  		//monedas, variable global definida en index facturaciones
	  		//crear select de monedas
	  		let HTMLSelectMonedas = '<select name="tipo_moneda" id="tipo_moneda" class="form-control form-select">'
	  		for( let moneda in monedas ){
	  			let obj = monedas[moneda]
	  			HTMLSelectMonedas+='<option value="'+obj.id+'">'+
	  				'('+obj.short_name+') '+
	  				obj.name+
	  				'</option>';
	  		}
	  		HTMLSelectMonedas += '</select>'


	  		//creo el formulario para el ingreso de monedas
	  		let HTMLFrmIngresoDeMoneda = '<div class="frm-bottom" id="frmIngresoMoneda">'+
  				'<div class="row">'+
  					'<div class="col-12">'+
  						'<div class="frm-header">Aprobar Facturación</div>'+
    					'<div class="icon-money-sign">'+
    						svgMoneySign+
    					'</div>'+
    					'<div class="form-group">'+
				        '<label>Seleccione el tipo de Moneda: </label>'+
				        HTMLSelectMonedas+
				      '</div>'+
				      '<div class="form-group">'+
				        '<label>Valor Moneda: </label>'+
				        '<input type="number" class="form-control" name="valor_moneda" id="valor_moneda" placeholder="Ingrese el Valor de la moneda en números enteros" required="">'+
				      '</div>'+
				      '<div class="form-group">'+
				        '<label>Valor en Pesos: </label>'+
				        '<input type="number" class="form-control" name="valor_pesos" id="valor_pesos" placeholder="Ingrese el Valor en pesos en números enteros" required="">'+
				      '</div>'+
				      '<div class="col-12 text-center btnformadd">'+
					      '<button class="btn btnForm" id="btnFrmValor" data-cardid="'+facturacion_id+'" data-clase="'+clase+'" data-state="'+state+'">'+
					        '<span>Aprobar</span>'+
					        svgUpdateIcon+
					      '</button>'+
					      '<button class="btn cancelPanel closePanelBottom">'+
									'<span>Cancelar</span>'+
									'<i class="float-left">'+
						    		svgXClose+
									'</i>'+
								'</button>'+
					    '</div>'+
  					'</div>'+
  				'</div>'

  			//AGREGAR FORMULARIO PARA INGRESO DE MONEDA AL BODY
  			$('body').append(HTMLFrmIngresoDeMoneda)
  			close_panel_bottom()
  			guardar_moneda_y_valor()

	  	}else if( state == 4 ){
	  		//pedir ingreso de campo de texto para facturación rechazada
	  		//creo el formulario para el ingreso de monedas
  			let HTMLFrmIngresoDeRechazo = '<div class="frm-bottom" id="frmIngresoRechazo">'+
  				'<div class="row">'+
  					'<div class="col-12">'+
  						'<div class="frm-header">Rechazo de Facturación</div>'+
    					'<div class="icon-money-sign">'+
    						svgXOctagon+
    					'</div>'+
				      '<div class="form-group">'+
				        '<label>Motivo de Rechazo: </label>'+
				        '<input type="text" class="form-control" name="rechazo" id="rechazo" placeholder="Ingrese el motivo del rechazo" required="">'+
				      '</div>'+
				      '<div class="col-12 text-center btnformadd">'+
					      '<button class="btn btnForm" id="btnFrmRechazo" data-cardid="'+facturacion_id+'" data-clase="'+clase+'" data-state="'+state+'">'+
					        '<span>Rechazar</span>'+
					        svgUpdateIcon+
					      '</button>'+
					      '<button class="btn cancelPanel closePanelBottom">'+
									'<span>Cancelar</span>'+
									'<i class="float-left">'+
						    		svgXClose+
									'</i>'+
								'</button>'+
					    '</div>'+
  					'</div>'+
  				'</div>'

  			//AGREGAR FORMULARIO PARA INGRESO DE MONEDA AL BODY
  			$('body').append(HTMLFrmIngresoDeRechazo)

  			close_panel_bottom()
  			guardar_descripcion_rechazo()

	  	}else{
				$('.bg-spinner').removeClass('end-this')
	  		actualizacion_de_estado_de_facturacion(clase, facturacion_id, state)
	  	}

		}

	})
}

function guardar_moneda_y_valor(){
	$('#btnFrmValor').click(function(){

		$('.bg-spinner').removeClass('end-this')

		let clase = $(this).data('clase')
		let state = $(this).data('state')

		let facturacion_id = $(this).data('cardid')
		let tipo_moneda = Number($('#tipo_moneda').val());
		let valor_moneda = $('#valor_moneda').val()
		let valor_pesos = $('#valor_pesos').val()
		//enviar datos de tipo de moneda y valor

		let url = window.location.origin+'/facturacion/valor';

		$.ajaxSetup({
	    headers: {
	      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
  	});

	  $.ajax({
	    url: url,
	    method: "POST",
	    data: {
	    	facturacion_id:facturacion_id,
	    	tipo_moneda:tipo_moneda,
	    	valor_moneda:valor_moneda,
				valor_pesos:valor_pesos,
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
	        
	        console.log( data.yes )
					actualizacion_de_estado_de_facturacion(clase, facturacion_id, state)

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



	})
}

function guardar_descripcion_rechazo(){
	$('#btnFrmRechazo').click(function(){

		$('.bg-spinner').removeClass('end-this')

		let clase = $(this).data('clase')
		let state = $(this).data('state')

		let facturacion_id = $(this).data('cardid')
		let rechazo = $('#rechazo').val();
		//enviar datos de tipo de moneda y valor

		let url = window.location.origin+'/facturacion/rechazo';

		$.ajaxSetup({
	    headers: {
	      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
  	});

	  $.ajax({
	    url: url,
	    method: "POST",
	    data: {
	    	facturacion_id:facturacion_id,
	    	rechazo:rechazo,
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
	        
	        console.log( data.yes )
					actualizacion_de_estado_de_facturacion(clase, facturacion_id, state)

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



	})
}

function close_panel_bottom(){
	$('.closePanelBottom').click(function(){
		$('.frm-bottom').remove()
	})
}

function button_close_alert(){
	$('#principal-container button.close').click(function(){
		$('.dev-alert').remove()
	})
}

/*
function upload_facturacion_and_foto_server(){

	// VARIABLE exo = 0 // CREAR
	// VARIABLE exo = 1 // EDITAR
	//var exo = 0
	var exo = $('#btnEditCard').data('idcard')
  ejecutar_funcion_AJAX_SEND_HTTP_REQUEST(exo)
	
}
*/


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
	$('.navbar-brand > span').html('Facturaciones Disponibles')
	$('#panel-ios-1').toggleClass('panel-active')
	$('#panel-ios-2').toggleClass('panel-active')
	$('#btnEditCard').hide()
	$('#btnBackView').hide()
	$('#btnAddCard').hide()
	$('#menu-dash-left').show()
	$('#btnAddCards').show()
	$('#btnSearchCards').show()
	//$('.masterTabs-head button:first-of-type').click()
	$('#menu-dash-left').show()

	console.log( cardid )

	setTimeout(function(){
		if( cardid != 'list-home-0' ){
			var position = $('#'+cardid).offset().top;
			var alto = $('#'+cardid).height();
			alto += parseInt( $('#'+cardid).css('padding-top').replace('px', '') )
			alto -= $('.tab-head').height();
			alto -= 20
			//35
		}else{
			var position = 0;
			var alto = 0;
		}
		$("body, html").animate({
			scrollTop: position-alto
		}, 0)
	},200)


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
			user_id: $('#list-home-'+ide+' .user_id').text(),
			contacto_id: $('#list-home-'+ide+' .contacto_id').text(),
			dato_id: $('#list-home-'+ide+' .dato_id').text(),
			envia: $('#list-home-'+ide+' .envia').text(),
		}
		//poner datos en el formulario de creacion
		//$('#formCards #user_id option[value="'+card.user_id+'"]').attr('selected', 'selected')
		//$('#formCards #contacto_id option[value="'+card.contacto_id+'"]').attr('selected', 'selected')

		$('#user_id').val(card.user_id)
		$('#contacto_id').val(card.contacto_id)
		$('#dato_id').val(card.dato_id)
		$('#envia').val(card.envia)

		//traer información de fotos de recibo
		$('.dev-edit-images').show()
		get_fetch_fotos_edit_contacto(ide)

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

function get_fetch_fotos_edit_contacto(facturacion_id){
	$.get( window.location.origin+"/fotos/"+facturacion_id, function( data ) {
		$( ".dev-edit-images" ).html("<span>Recibos Adjuntos:</span><br>")
		var arrayUrl = JSON.parse(data.foto.url)
		var arrayName = JSON.parse(data.foto.name)
		//console.log( JSON.parse(data.foto.url) )
		$.each(arrayUrl, function(i,val){
	  	$( ".dev-edit-images" )
	  		.append('<div class="dev-list-images">'+
					'<a class="delete-image" '+
						'data-cardid="'+facturacion_id+'" data-name="'+arrayName[i]+'" data-url="'+val+'" >Eliminar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
					  '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>'+
					  '<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>'+
					'</svg></a>'+
					'<a class="ibg-primary show-full-image"'+
							'data-name="'+arrayName[i]+'" data-url="'+val+'">'+
						'<img src="'+val+'" alt="'+arrayName[i]+'" />'+
					'</a>'+
				'</div>');
		})
		$('#foto_id').val(data.foto_id)

		modal_open_image()

		delete_image()
	});
}

function delete_image(){
	$('.delete-image').click(function(){
		$('.bg-spinner').removeClass('end-this')
		var cardid = $(this).data('cardid')
		var name = $(this).data('name')
		var url = $(this).data('url')
		//imagen
		//var formData = new FormData(document.getElementById('upload-image'))
		//formData.append('facturacion_id', cardid)
	  //$('#image-input-error').text('');

	  setTimeout(function(){
		  $.ajaxSetup({
			    headers: {
			      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			    }
		  	});

		  $.ajax({
		    url: window.location.origin+'/facturaciones/delete/imagen',
		    method: "PUT",
		    data: {
		    	cardid: cardid,
		    	name: name,
		    	url: url
		    },
		    success: function(result){
		    	console.log( result )

		    	if( result.yes ){
			    	Swal.fire({
						  title: 'Hecho!',
						  text: result.yes,
						  icon: 'success',
						  confirmButtonText: 'Ok!'
						})
			    	$('.delete-image[data-name="'+name+'"]').parent('.dev-list-images').remove();
			    	$('.bg-spinner').addClass('end-this')
		    	}


		    	//limpio formulario registro
		      //limpiar_formulario_cards()
		    	//funciones_volver_vista_principal( 'list-home-'+cardid )

		    },
		    error: function(i,o,u){
					$('.bg-spinner').addClass('end-this')
		      //location.reload();
		      console.log('Error al validar')
		      console.log(i)
		      console.log(o)
		      console.log(u)
		    }
		  });
	  },200)

	})
}


function limpiar_formulario_cards(){
	if( $('#panel-ios-1').data('master') == 0 ){
		$('#formCards input').val('')
	}else{
		$('#formCards input').not('#user_id').val('')
	}
	$('#formCards select').val('')
	$('#formCards select').css({'border':0,'border-bottom':'1px solid lightgrey'})
	$('#formCards input').css({'border':0,'border-bottom':'1px solid lightgrey'})
}


function alert_bootstrap(type,strong,message){
	return '<div class="dev-alert alert alert-'+type+' alert-dismissible fade show" role="alert">'+
	  '<strong>'+strong+'</strong> '+message+' '+
	  '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
	    '<span aria-hidden="true">&times;</span>'+
	  '</button>'+
	'</div>';
}




function get_inputs_form_cards(){
	var card
	return card = {
		user_id: $('#formCards #user_id').val(),
		contacto_id: $('#formCards #contacto_id').val(),
		dato_id: $('#formCards #dato_id').val(),
		envia: $('#formCards #envia').val(),
	}
}

function validate_inputs_form_cards(){
	var vacios=0;
	$('#formCards input[type="number"]').each(function(){
		if( $(this).val() == '' || $(this).val() == undefined ){
			if( $(this).attr('id') != 'filenames' ){
				vacios++;
				$(this).css('border', '1px solid red');
			}
		}
	})

	$('#formCards select').each(function(){
		if( $(this).val() == '' || $(this).val() == undefined ){
			vacios++;
			$(this).css('border', '1px solid red');
		}
	})
	return vacios;
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
		$('.bg-spinner').addClass('end-this')
		return 
	}

	if( exo ){
		var url = window.location.origin+"/facturaciones/edit"
		var method = "post"
	}else{
		var url = window.location.origin+"/facturaciones/create"
		var method = "post"
	}



  //formulario
  
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  
  var formData = new FormData(document.getElementById('upload-image'))
  formData.append('exo', exo)

  $.ajax({
    url: url,
		cache: false,
    contentType: false,
    processData: false,
    method: method,
    data: formData,
    success: function(result){

      if( result.prueba ){
    		Swal.fire({
				  title: 'Hecho!',
				  text: result.prueba,
				  icon: 'success',
				  confirmButtonText: 'Ok!'
				})
    	}

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
        if( exo > 0 ){
        	//si existe la variable exo, ACTUALIZO DATOS EXISTENTES
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

	        //agregar clase de fila al nuevo elemento
	        $('#'+cardId)
	        	.attr('class', 'list-group-item list-group-item-action list-group-item-secondary')

        	//inicializo funciones ( JS ) agregadas a este elemento
	        //funcion ver elemento en modal
	        show_data_in_modal('#'+cardId)

	        var notify = $('.masterTabs button[data-state="1"] .notify-number')
	        var numActual = Number(notify.html())
        	numActual++;
	        notify.html(numActual)

        }

        var obj = result.card

        //MODIFICO ELEMENTO CON LOS NUEVOS DATOS DEL CARD

        console.log("/////////////////////////")
        console.log(obj)
        console.log("/////////////////////////")

        let campos = JSON.parse(obj.dato.campos)

				$('#'+cardId+' .user_id').html( obj.user.id )
				$('#'+cardId+' .userName').html( obj.user.name )
				$('#'+cardId+' .contacto_id').html( obj.contacto.id )
				$('#'+cardId+' .contactoName').html( obj.contacto.name )
				$('#'+cardId+' .dato_id').html( obj.dato.id )
				$('#'+cardId+' .datoName').html( campos[0]+" - "+obj.dato.tipo.nombre )
				$('#'+cardId+' .moneda_id').html( obj.moneda.id )
				$('#'+cardId+' .moneda_name').html( obj.moneda.name )
				$('#'+cardId+' .short_name').html( obj.short_name )
				$('#'+cardId+' .envia').html( obj.envia )
				$('#'+cardId+' .valor_moneda').html( obj.valor_moneda )
				$('#'+cardId+' .valor_pesos').html( obj.valor_pesos )
				$('#'+cardId+' .created_at').html( obj.created_at )
				$('#'+cardId+' .updated_at').html( obj.updated_at )

        //MOSTRAR ELEMENTO CREADO, este se oculta POR FUNCION DE MASTERTABS
        $('#'+cardId).show()

        //broadcast event create or update result.card.id

        $('#menu-dash-left').show()
        //limpio formulario registro
	      limpiar_formulario_cards()
	    	funciones_volver_vista_principal( 'list-home-'+result.card.id )
	    	$('.bg-spinner').addClass('end-this')

	    	//SEND_IMAGE_AJAX(result.card.id)

      }

    },
    error: function(i,o,u){
			$('.bg-spinner').addClass('end-this')
      //location.reload();
      console.log('Error al validar')
      console.log(i)
      console.log(o)
      console.log(u)
    }
  });

}


function SEND_IMAGE_AJAX(cardid){

	//imagen
	var formData = new FormData(document.getElementById('upload-image'))
	formData.append('facturacion_id', cardid)
  $('#image-input-error').text('');
  $.ajax({
    url: window.location.origin+'/facturaciones/imagen',
    cache: false,
    contentType: false,
    processData: false,
    method: "post",
    data: formData,
    success: function(result){
    	console.log( result )
    	//limpio formulario registro
      limpiar_formulario_cards()
    	funciones_volver_vista_principal( 'list-home-'+cardid )
    	$('.bg-spinner').addClass('end-this')

    },
    error: function(i,o,u){
			$('.bg-spinner').addClass('end-this')
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

	$('#formCards #dolares').val(200)
	//$('#formCards #photo').val('prueba: '+ide)
}

/*////////////////////////////////////////////*/
/*  FUNCION QUE MUESTRA LOS DATOS EN EL MODAL  */
function show_data_in_modal(element){
	$(element).click(function(){
		var id = $(this).attr('id')
		var facturacion_id = id.replace('list-home-','')
		var clase = $(this).attr('class')
		clase = clase.replace('list-group-item list-group-item-action ','')
		clase = clase.replace('actived','')
		clase = clase.replace('active-click','')
		$('#cards-list-tab button').removeClass('active-click')
		$(this).addClass('active-click')

		setTimeout(function(){

			$('.dev-card-details').empty()
			//agregar identificador de elemento
			$('.dev-full-view-card').data('cardid',facturacion_id)
			$('.dev-full-view-card').toggleClass('show-full-card')
			$('.show-full-card').css({'min-height':window.outerHeight+'px'})

			$('.dev-show-card').attr('class', 'dev-show-card '+clase)
			$('#btns-actions button').removeClass('active')
			$('#btns-actions button.'+clase).addClass('active')
			//$('#btns-actions h6').attr('class', 'text-center '+clase)

			//add ID card to btnEditCard and btnDestroy
			$('#trashCard').data('cardid',facturacion_id)
			$('#editCard').data('cardid',facturacion_id)

			//Poner toda la información con la clase (.infoMaster) de la tarjeta en modal
			$('#'+id+' .infoMaster').each(function(i,obj){
				var valideItem = $(obj).html()
				var item = $(obj).clone().removeClass('d-none').html()
				var classe = '';
				//validacion para ocultar campos dependiendo del estado de la tarjeta

				console.log(clase)
				if( clase == 'list-group-item-secondary' || clase == 'list-group-item-info' ){

					if( valideItem.indexOf('moneda_name') > 0 || 
							valideItem.indexOf('valor_moneda') > 0 || 
							valideItem.indexOf('valor_pesos') > 0 || 
							valideItem.indexOf('descripcion') > 0 ){
						classe = ' d-none';
					}

				}else if( clase == 'list-group-item-danger' ){
					
					if( valideItem.indexOf('moneda_name') > 0 || 
							valideItem.indexOf('valor_moneda') > 0 || 
							valideItem.indexOf('valor_pesos') > 0 ){
						classe = ' d-none';
					}

				}else if( clase == 'list-group-item-success' ) {
					if( valideItem.indexOf('descripcion') > 0 ){
						classe = ' d-none';
					}
				}

				$('.dev-card-details').append('<div class="cell-ios'+classe+'">'+item+'</div>')
			})

			setTimeout(function(){
				$("body, html").animate({
					scrollTop: 0
				}, 0);
			},200)
			//traer información de fotos de recibo
			get_fetch_fotos_contacto(facturacion_id)
			$('#panel-ios-1').removeClass('panel-active')
		},200)

	})
}

function get_fetch_fotos_contacto(facturacion_id){
	$.get( window.location.origin+"/fotos/"+facturacion_id, function( data ) {
		$( ".dev-images" ).html("<span>Recibos Adjuntos:</span><br>")
		var arrayUrl = JSON.parse(data.foto.url)
		var arrayName = JSON.parse(data.foto.name)
		console.log( JSON.parse(data.foto.url) )
		$.each(arrayUrl, function(i,val){
	  	$( ".dev-images" )
	  		.append('<a class="ibg-primary show-full-image"'+
											'data-name="'+arrayName[i]+'" data-url="'+val+'">'+
										'<img src="'+val+'" alt="'+arrayName[i]+'" />'+
									'</a>');
		})

		modal_open_image()
	});
}


function modal_open_image(){
	$('.show-full-image').click(function(){
		var url = $(this).data('url')
		var name = $(this).data('name')
		console.log('view image:')
		console.log(url)
		$('body').prepend('<div class="modal-view-images">'+
												'<button type="button" class="close modal-view-images-close" aria-label="Close" >'+
												  '<span aria-hidden="true">&times;</span>'+
												'</button>'+
												'<img src="'+window.location.origin+''+url+'" width="100%" alt="'+name+'"/>'+
												'<div class="modal-out"></div>'+
											'</div>')
		$('.modal-view-images').hide()
		$('.modal-view-images').show('fast')
		modal_close_imagen()
	})

}

function modal_close_imagen(){
	$('.modal-view-images-close, .modal-out').click(function(){
		$('.modal-view-images').hide('fast', function(){
			$('.modal-view-images').remove()
		})
	})
}


function trash_card(id){

	var url = window.location.origin+"/facturaciones/delete"
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
				var notifyOld = $('.masterTabs button[data-state="'+result.oldstate+'"] .notify-number')
				var numOld = Number(notifyOld.html())
      	numOld--;
      	notifyOld.html(numOld)

				switch(result.oldState){
      		case 1:
      		countBorrador--;
      			break;
      		case 2:
      		countEnRevision--;
      			break;
      		case 3:
      		countAprobados--;
      			break;
      		case 4:
      		countRechazados--;
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


			$("body, html").animate({
				scrollTop: 0
			}, 0);



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