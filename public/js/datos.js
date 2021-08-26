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
		//limpiar informacion de maestro que tiene el dato
		$('.master-to-data.active').removeClass('active')
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

		animacion_cambiar_panel_ios('Gestionar Datos',2)

		limpiar_formulario_cards()

		//LLENAR FORMULARIO PARA AGREGAR PRUEBA
		//prueba_formulario_registro_cards()

		//ocultar boton de buscar
		$('#btnSearchCards').hide()
		//ocultar boton editar
		$('#btnEditCard').hide()
		//mostrar boton agregar
		$('#btnAddCard').show()
		$('#btnBackView').data('cardid',0)
		$('#btnBackView').show()


		$('.addTypeAccount').click()

		$('#saveType')
			.data('edit', 0)

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
		// var borrar = confirm('Esta seguro que desea eliminar el registro?')
		// if( borrar ){
		// 	trash_card( $(this).data('cardid') )
		// }
		let cardid = $(this).data('cardid')
		Swal.fire({
		  title: 'Estás Seguro?',
		  text: "No podrás revertir esto.",
		  icon: 'warning',
		  showCancelButton: true,
		  cancelButtonText: 'Cancelar',
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, Eliminar Datos!'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	trash_card( cardid )
		  }
		})

	})

	/* OCULTAR PANELES DATOS */
	$('#addTypeAccount').hide()
	$('#addAccount').hide()


	$('#btnBackViewType').click(function(){
		animacion_cambiar_panel_ios('Gestionar Datos',2)
		$('#btnBackViewType').hide()
		$('#btnBackView').show()
	})

	/* AGREGAR DATOS A MAESTROS */
	datos_agregados_a_maestros()

	enviar_datos_al_contacto_wpp()

	active_or_inactive_menu()

	$('#cards-list-tab button[data-btnactive="0"]').hide()

	activos_e_inactivos()

	duplicate_txt()

	botones_para_mostrar_formulario_registro()

	guardar_nuevo_tipo_de_cuenta()

	inicializar_tipos()


})

/* JAVASCRIPT ORIENTADO A OBJETOS */

function TipoDato(nombre,campos) {
  this.nombre = nombre;
  this.campos = campos;
}

function Dato(active,campos,tipo_id) {
  this.active = active;
  this.campos = campos;
  this.tipo_id = tipo_id;
}

function boton_busqueda_de_registros(){
	$('#btnSearchCards').click(function(){
		$('#search-txt').show('fast')
		$('#txtSearch').focus()
	})

	$('#txtSearch').keypress(function(event){
		if( $('#txtSearch').val().length >= 2 ){
			//enviar valor para buscar contactos
			let value = $('#txtSearch').val(),
					url = window.location.origin+'/dato/busqueda',
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
		    			let dato = result.search[y];
		    			console.log( "%%%%%%%%%%%%%%%%%%%%%%%", "font-size: 25px; color:orange;" )
		    			console.log( "%c"+dato.tipo.nombre, "font-size: 25px; color:orange;" )
		    			console.log( "%%%%%%%%%%%%%%%%%%%%%%%", "font-size: 25px; color:orange;" )

		    			// $('#hover-search')
		    				// .append('<span class="list-contacto" data-id="list-home-'+contacto.id+'">'+
		    				// 	'<b>Nombre: </b>'+contacto.name+'<br>'+
		    				// 	'<b>Número: </b>+('+contacto.prefix+') '+contacto.phone+'<br>'+
		    				// 	'<b>Fecha de ingreso: </b>'+contacto.created_at+'<br>'+
		    				// 	'<span class="mi-maestro">'+maestro+'</span>'+
		    				// '</span>')

		    	 		let campos = JSON.parse(dato.campos)
		    	 		let camposTipo = JSON.parse(dato.tipo.campos)
		    	 		var txtCamps = ''
							for ( let y = 0; y < campos.length ; y++ ){
								txtCamps += '<b>'+camposTipo[y]+'</b> '+campos[y]+'<br>'
							}

							$('#hover-search')
		    				.append('<span class="list-contacto" data-id="list-home-'+dato.id+'">'+
		    					'<b>Tipo de cuenta: </b>'+dato.tipo.nombre+'<br>'+
		    					txtCamps+
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
			    console.log( "$$$$$$$$$$$$$$$$$$$$$$$$$$" )
			    console.log( result.search.length )
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

function render_html_tipo(tipo){
	$('#render-edit-table-tipos tbody')
		.append('<tr>'+
			'<td class="btn btnForm" data-tipoid="'+tipo.id+'">'+
				'<span>'+tipo.nombre+'</span>'+
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">'+
  				'<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>'+
					'</svg>'+
			'</td>'+
		'</tr>')

	$('#render-add-table-tipos tbody')
		.append('<tr>'+
			'<td class="btn btnForm" data-tipoid="'+tipo.id+'">'+
				'<span>'+tipo.nombre+'</span>'+
				'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">'+
  				'<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>'+
				'</svg>'+
			'</td>'+
		'</tr>')
		click_edit_table_tipos()
		click_add_table_tipos()
}

function click_edit_table_tipos(){
	$('#render-edit-table-tipos > tbody > tr:last-of-type > td').click(function(){
		$("body, html").animate({
			scrollTop: 0
		}, 300);
		construir_formulario_para_editar($(this).data('tipoid'))
	})
}

function click_add_table_tipos(){
	$('#render-add-table-tipos > tbody > tr:last-of-type > td').click(function(){
		$("body, html").animate({
			scrollTop: 0
		}, 300);
		construir_formulario_para_agregar($(this).data('tipoid'))
	})
}

function svg_trash_close_targeta(){
	let txt = 
	'<div id="btns-edit-actions">'+
		'<button class="btn" id="delete-this">'+
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
		  	'<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>'+
		  	'<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>'+
			'</svg>'+
		'</button>'+
		'<button class="btn" id="cancel-this">'+
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">'+
		  	'<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>'+
		  	'<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'+
			'</svg>'+
		'</button>'+
	'</div>'

	return txt
}

function construir_formulario_para_editar(id){
	$('#addtxtcamps').empty()
	if( $('#btns-edit-actions').length != -1 ){
		$('#btns-edit-actions').remove()
	}
	let txt = svg_trash_close_targeta()
	$('#addTypeAccount').prepend(txt)
	$("#delete-this").click(function(){
		Swal.fire({
		  title: 'Desea eliminar el registro?',
		  showCancelButton: true,
		  confirmButtonText: `Confirmar`,
		  cancelButtonText: `Cancelar`
		}).then((result) => {
		  /* Read more about isConfirmed, isDenied below */
		  if (result.isConfirmed) {
		  	//enviar metodo ajax delete
		  	delete_this_type(id)
		  }
		})
	})
	$("#cancel-this").click(function(){
		$('input[type="text"]').val('')
		$('#saveType')
			.data('edit', 0)

		$('#addtxtcamps').empty()
		$("#btns-edit-actions").remove()

	})
	//BUSCAR EN ARRAY ASOCIATIVO DE TIPOS MASTER!
  var result = $.grep(tipos, function(obj){ 
  	return obj.id == id; 
  });
	$('#nombre_tipo')
		.attr('style', 'border-bottom:1px solid lightgrey;')
		.val(result[0].nombre)

	let campos = JSON.parse(result[0].campos)

	for ( let y = 0; y < campos.length ; y++ ){
		$('#copy-txt-name')
			.clone()
			.removeClass('d-none')
			.removeAttr('id')
			.appendTo('#addtxtcamps')

		var number = $('#addtxtcamps > div').length

		var lastDiv = $('#addtxtcamps div:last-of-type')
		lastDiv.find('.number-txt').html(number);
		lastDiv.find('input')
			.attr({
				'id':'campo_'+number,
				'name':'campo_'+number,
				'placeholder':'Nombre del campo '+number
			})
			.val(campos[y]);

			close_button_txt()

	}
	//identificar si el boton esta en funcion de editar
	$('#saveType')
		.data('edit', id)

}

function construir_formulario_para_agregar(id){

	$('#add-data').empty()
	
	animacion_cambiar_panel_ios('Agregar Nuevo Dato', 3)
	$('#btnBackView').hide()
	$('#btnBackViewType').show()
	//active, campos, tipo_id

	//BUSCAR EN ARRAY ASOCIATIVO DE TIPOS MASTER!
  var result = $.grep(tipos, function(obj){ 
  	return obj.id == id; 
  });

  //CONSTRUIR FORMULARIO
	$('#add-data')
		.append('<h4 data-tipoid="'+result[0].id+'">'+result[0].nombre+'</h4>')

	let campos = JSON.parse(result[0].campos)

	for ( let y = 0; y < campos.length ; y++ ){
		let name = campos[y].replace(" ", "_")
		$('#copy-txt-name')
			.clone()
			.removeClass('d-none')
			.removeAttr('id')
			.appendTo('#add-data')

		var lastDiv = $('#add-data div:last-of-type')

		lastDiv.find('label')
			.html(campos[y])

		lastDiv.find('.close-txt').remove()

		lastDiv.find('input')
			.attr({
				'id':name,
				'name':name,
				'placeholder':'Ingrese '+campos[y]
			})
			.val('');
	}

	//AGREGO BOTON E IDENTIFICADOR saveDato

	//identificar si el boton esta en funcion de editar
	$('#saveType')
		.clone()
		.attr({'id':'saveDato','data-edit':0})
		.html('Guardar Nuevo Dato')
		.appendTo('#add-data')

	guardar_nuevo_dato()

}

function guardar_nuevo_dato(){
	$('#saveDato').click(function(){
		var id = $(this).data('edit')

		$('.bg-spinner').removeClass('end-this')

		setTimeout(function(){
			var vacios;
			//validar vacios
			$('#add-data .form-group').each(function(){
				if( $(this).val() == '' || $(this).val() == undefined ){
					vacios++;
				}
			})
			if( vacios > 0 ){
				$('.bg-spinner').addClass('end-this')
				return vacios;
			}
			
			let url, method, nombre, campos=[];
			url = window.location.origin+"/datos/save-dato"
			method = 'POST'
			/*CAPTURAR VALORES DE CAMPOS NUEVOS*/
			$('#add-data .form-group').each(function(i,obj){
				campos.push( $(obj).find('input').val() )
			})
			var tipo_id = $('#add-data h4').data('tipoid')

			//POST HTTP TYPE ACCOUNT
			$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
		  $.ajax({
		    url: url,
		    method: method,
		    data: {
		    	id:id,
		      campos:campos,
		    	tipo_id:tipo_id
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
		    	}

		    	if( result.dato ){

		    		var cardId = 'list-home-'+result.dato.id;

		    		if( id == 0 ){

					  	//CLONO ELEMENTO HTML agrego ID
						  $('#list-home-0')
						  	.clone()
						  	.removeClass('d-none')
						  	.attr('id', cardId)
						  	.appendTo('#cards-list-tab')


						  //funciones asociadas al dato
						  setTimeout(function(){
				    		show_data_in_modal('#'+cardId)
								funciones_volver_vista_principal( cardId )
						  },100)

		    			//PUSH global datos
			    		datos.push(result.dato)
			    		datos[(datos.length-1)].id = result.dato.id

			    		//renderizo nuevos cambios del dato en HTML
			    		render_html_dato(datos[(datos.length-1)])

		    		}else{
		    			//Busco id que llega y actualizo variable global datos
			    		datos.map(function(obj){
			    			if(obj.id == id){
							    obj.campos = result.dato.campos
							    obj.tipo_id = result.dato.tipo_id
							  }
							  return obj;
			    		})

		    			var dato = $.grep(datos, function(obj){ 
						  	return obj.id == result.dato.id;
						  });
		    			//renderizo nuevos cambios del dato en HTML
			    		render_html_dato(dato[0])

		    		}//end result.dato

						$('.bg-spinner').addClass('end-this')


		    		/*window.Echo.channel('dev-canal')
		        	.listen('dev-evento', (e) => {
		        		console.log(e)
		        	});*/

		    	}

		    	

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

function render_html_dato(dato){
	//AGREGO ELEMENTO HTML
  var cardId = 'list-home-'+dato.id;
	//inicializo funciones ( JS ) agregadas a este elemento
  let tipo = $.grep(tipos, function(obj){ 
  	return obj.id == dato.tipo_id;
  });

  //MODIFICO ELEMENTO CON LOS NUEVOS DATOS DEL CARD
  $('#'+cardId+' .tipo_cuenta').html( tipo[0].nombre )
  $('#'+cardId+' .dinamyc-camps').html('')

  let campos = JSON.parse(dato.campos)
	let campos_tipo = JSON.parse(tipo[0].campos)
	for ( let y = 0; y < campos.length ; y++ ){
		$('#'+cardId+' .dinamyc-camps')
			.append('<span class="infoMaster"><b>'+
					campos_tipo[y]+
				' : </b><span class="campo_'+y+'">'+
					campos[y]+
				'</span></span><br>')
	}
  $('#'+cardId+' .created_at').html( dato.created_at )
  $('#'+cardId+' .updated_at').html( dato.updated_at )

}

function delete_this_type(id){
	$('.bg-spinner').removeClass('end-this')
	setTimeout(function(){
		var url, method;
		url = window.location.origin+"/datos/delete-type-account"
		method = 'POST'
		//POST HTTP TYPE ACCOUNT
		$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
	  $.ajax({ url:url, method:method, data:{id:id},
	    success: function(result){
	    	if( result.yes ){
	    		//eliminar registro de variable global [tipos] de cuenta
	    		tipos = $.grep(tipos, function(obj) {
	    			return obj.id != id; 
	    		});
	    		//eliminar registro renderizado html en agregar y editar tipos
					$('#render-edit-table-tipos tbody td[data-tipoid="'+id+'"]').parent('tr').remove()
					$('#render-add-table-tipos tbody td[data-tipoid="'+id+'"]').parent('tr').remove()

					//reiniciar campos de texto
					$('#addtxtcamps').html('')
					$('#nombre_tipo').val('')

					//reiniciar boton para crear o editar
					$('#saveType')
						.data('edit', 0)

		    	Swal.fire({
					  title: 'Hecho!',
					  text: "Tipo de cuenta Eliminado Correctamente!",
					  icon: 'success',
					  confirmButtonText: 'Ok!'
					})

	    	}


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
}

//el arreglo de [tipos] se inciializa globalmente desde el index
function inicializar_tipos(){
	for( let i = 0; i < tipos.length; i++ ){
		render_html_tipo(tipos[i])
	}
}
/* END JAVASCRIPT OBJECTS */



function guardar_nuevo_tipo_de_cuenta(){
	$('#saveType').click(function(){
		var id = $(this).data('edit')

		$('.bg-spinner').removeClass('end-this')

		setTimeout(function(){

			var vacios = validar_inputs_vacios();
			if( vacios > 0 ){
				$('.bg-spinner').addClass('end-this')
				return vacios;
			}

			let url, method, nombre, campos;

			url = window.location.origin+"/datos/save-type-account"
			method = 'POST'
			nombre = $('#nombre_tipo').val()
			campos = [];
			$('#addtxtcamps input').each(function(){
				campos.push( $(this).val() )
			})

			console.log(campos)
			console.log('-----------------')

			//POST HTTP TYPE ACCOUNT
			$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
		  $.ajax({
		    url: url,
		    method: method,
		    data: {
		    	id:id,
		    	nombre:nombre,
		      campos:campos
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

		    	if( result.datos ){
		    		var encuentra = 0;
		    		//Busco id que llega y actualizo variable global tipos
		    		tipos.map(function(obj){
		    			if(obj.id == result.id){
		    				encuentra++;
						    obj.nombre = result.datos.nombre
						    obj.campos = result.datos.campos
						  }
						  return obj;
		    		})

		    		//creo nuevo elemento en render y agrego a variable global tipos
		    		if( encuentra == 0 ){
			    		tipos.push(result.datos)
			    		tipos[(tipos.length-1)].id = result.id
			    		render_html_tipo(tipos[(tipos.length-1)])
		    		}else{
		    			//actualizo render HTML de id
		    			$('#render-edit-table-tipos td[data-tipoid="'+result.id+'"] span').html(result.datos.nombre)
		    			$('#render-add-table-tipos td[data-tipoid="'+result.id+'"] span').html(result.datos.nombre)
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

function close_button_txt(){
	$('.close-txt').click(function(){
		$(this).parent('.form-group').remove()
		$('#addtxtcamps label').each(function(i,obj){
			$(this).html('Campo '+(i+1)+':')
		})
		$('#editTypeAcc label').each(function(i,obj){
			$(this).html('Campo '+(i+1)+':')
		})
	})
}

function botones_para_mostrar_formulario_registro(){
	$('.btn-datos-add').click(function(){
		$('.btn-datos-add').removeClass('active')
		$(this).addClass('active')
		$('input[type="text"]').val('')
		$('#saveType')
			.data('edit', 0)

		if( $(this).hasClass('addTypeAccount') ){
			$('#addtxtcamps').empty()
			$('#addTypeAccount').show()
			$('#addAccount').hide()
		}else{
			$('#addTypeAccount').hide()
			$('#addAccount').show()
		}
	})
}

function validar_inputs_vacios(){
	var vacios = 0;
	$('#addTypeAccount input').each(function(){
		if( $(this).attr('id') != 'campo_0' ){
			if( $(this).val() == '' ){
				vacios++;
				$(this).attr('style', 'border:1px solid red;')
			}
		}
	})
	return vacios;
}


function duplicate_txt(){
	$('#duplicate-txt').click(function(){
		if( $('#nombre_tipo').val() == '' ){
			$('#nombre_tipo').attr('style', 'border:1px solid red;')
		}else{
			var vacios = validar_inputs_vacios();
			if( vacios > 0 ){
				return vacios;
			}

			$('#nombre_tipo').attr('style', 'border-bottom:1px solid lightgrey;')
			$('#addTypeAccount input').attr('style', 'border-bottom:1px solid lightgrey;')
			$('#copy-txt-name')
				.clone()
				.removeClass('d-none')
				.removeAttr('id')
				.appendTo('#addtxtcamps')

			var number = $('#addtxtcamps > div').length

			var lastDiv = $('#addtxtcamps div:last-of-type')
			lastDiv.find('.number-txt').html(number);
			lastDiv.find('input')
				.attr({
					'id':'campo_'+number,
					'name':'campo_'+number,
					'placeholder':'Nombre del campo '+number
				});

			close_button_txt()
		}

	})
}

function activos_e_inactivos(){
	$('#btnStates button').click(function(){
		var active = $(this).data('btnactive')
		$('#cards-list-tab button').hide()
		$('#cards-list-tab button[data-btnactive="'+active+'"]').show()

	})
}

function datos_agregados_a_maestros(){
	$('.master-to-data').click(function(){
		$('.bg-spinner').removeClass('end-this')
		var master_id = $(this).data('masterid')
		var dato_id = $('.dev-full-view-card').data('cardid')
		var url = window.location.origin+"/datos/addmaestros"
		var method = "post"

		setTimeout(function(){
		  if( $('.master-to-data[data-masterid="'+master_id+'"]').hasClass('active') ){
		  	var active = 0;
		  }else{
		  	var active = 1;
		  }

			$.ajaxSetup({headers:{'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
		  $.ajax({ url: url, method: method, data: { user_id:master_id, dato_id:dato_id } ,
		  	success: function(result){
		    	if( result.delete ){
		    		$('.master-to-data[data-masterid="'+result.user_id+'"]').removeClass('active')
		    	} 		    	
		    	if( result.active ){
		    		$('.master-to-data[data-masterid="'+result.user_id+'"]').addClass('active')
		    	}
		    	Swal.fire({
					  title: 'Hecho!',
					  text: "Actualizado Correctamente!",
					  icon: 'success',
					  confirmButtonText: 'Ok!'
					})
					$('.bg-spinner').addClass('end-this')

		    },
		    error: function(i,o,u){
		      location.reload();
		      console.log('Error al validar')
		      console.log(i)
		      console.log(o)
		      console.log(u)
		    }
		  });
		},200)

	})//emd clo
}

function active_or_inactive_data(dato_id,state){
	$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
  $.ajax({ 
  	url: window.location.origin+'/dato/estado', 
  	method: 'post', 
  	data: { dato_id:dato_id, state:state },
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
    	location.reload();
    	console.log(data)
    }
  });
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

function enviar_datos_al_contacto_wpp(){

	$('.dev-send-wpp').click(function(){

		console.log( 'click send data wpp' )

		var prefix = $(this).data('prefix')
		var phone = $(this).data('phone')
		var id = $(this).data('cardid')
		var apiWppUrl;

		console.log( "%c"+prefix, "font-size:22px;color:blue" )
		console.log( "%c"+phone, "font-size:22px;color:blue" )
		console.log( "%c"+id, "font-size:22px;color:blue" )

		apiWppUrl='https://api.whatsapp.com/send?phone=+'+prefix+''+phone+'&text=Datos%20De%20Envio%0D%0A'

		var compare = $('.dev-card-details .cell-ios').length
		compare--;
		console.log( compare )

		$('.dev-card-details .cell-ios').each(function(i,obj){
			apiWppUrl += $(this).find('b').text().replace(/\s/g, '%20')
			apiWppUrl += $(this).find('span').text().replace(/\s/g, '%20')+'%0D%0A'

			if( compare == i ){
				window.open(apiWppUrl)
			}
		})


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
	// $('.navbar-brand > span').html('Datos Disponibles')
	// $('#panel-ios-1').addClass('panel-active')
	// $('#panel-ios-2').removeClass('panel-active')
	// $('#panel-ios-3').removeClass('panel-active')

	// $('#btnEditCard').hide()
	// $('#btnAddCard').hide()

	animacion_cambiar_panel_ios('Datos Disponibles',1)

	$('#btnBackView').hide()
	$('#btnAddCards').show()
	$('#btnSearchCards').show()

	if( cardid != 'list-home-0' ){
		var position = $('#'+cardid).offset().top;
		var alto = $('#'+cardid).height();
		alto += parseInt( $('#'+cardid).css('padding-top').replace('px', '') )
			//alto -= $('.tab-head').height();
		alto -= 100
	}else{
		var position = 120;
		var alto = 0;
	}


	$("body, html").animate({
		scrollTop: position-alto
	}, 0);


}

// function function_to_view_edit_card(){
// 	$('#editCard').click(function(){
// 		$("body, html").animate({
// 			scrollTop: 0
// 		}, 0);
// 		animacion_cambiar_panel_ios('Editar Registro',2)
// 		//limpiar formulario cards
// 		limpiar_formulario_cards()
// 		//obtener ide a editar
// 		var ide = $(this).data('cardid')
// 		//obtener datos de la card para editar
// 		var card = {
// 			nombre: $('#list-home-'+ide+' .nombre').text(),
// 			identificacion: $('#list-home-'+ide+' .identificacion').text(),
// 			ciudad: $('#list-home-'+ide+' .ciudad').text(),
// 			estado: $('#list-home-'+ide+' .estado').text(),
// 			pais: $('#list-home-'+ide+' .pais').text(),
// 			direccion: $('#list-home-'+ide+' .direccion').text(),
// 			telefono: $('#list-home-'+ide+' .telefono').text(),
// 			tipo_cuenta: $('#list-home-'+ide+' .tipo_cuenta').text()
// 		}
// 		//poner datos en el formulario de creacion
// 		$('#formCards #nombre').val( card.nombre )
// 		$('#formCards #identificacion').val( card.identificacion )
// 		$('#formCards #ciudad').val( card.ciudad )
// 		$('#formCards #estado').val( card.estado )
// 		$('#formCards #pais').val( card.pais )
// 		$('#formCards #direccion').val( card.direccion )
// 		$('#formCards #telefono').val( card.telefono )
// 		$('#formCards #tipo_cuenta').val( card.tipo_cuenta )
		
// 		//ocultar 
// 		$('.dev-full-view-card').data('cardid',0)
// 		$('.dev-full-view-card').toggleClass('show-full-card')
// 		//ocultar boton crear
// 		$('#btnAddCard').hide()
// 		//mostrar boton editar y agregar ide
// 		$('#btnBackView').attr('data-cardid',ide)
// 		$('#btnBackView').data('cardid',ide)
// 		$('#btnBackView').show()

// 		$('#btnEditCard').data('cardid',ide)
// 		$('#btnEditCard').show()

// 	})
// }


function function_to_view_edit_card(){
	$('#editCard').click(function(){
		$("body, html").animate({
			scrollTop: 0
		}, 0);

		var ide = $(this).data('cardid')
			

		$('#add-data').empty()
		animacion_cambiar_panel_ios('Editar Datos', 3)
		$('#btnBackView').show()
		$('#btnBackViewType').hide()
		//active, campos, tipo_id

		var dato = $.grep(datos, function(obj){ 
	  	return obj.id == ide; 
	  });

		//BUSCAR EN ARRAY ASOCIATIVO DE TIPOS MASTER!
	  var tipo = $.grep(tipos, function(obj){ 
	  	return obj.id == dato[0].tipo_id; 
	  });



	  //CONSTRUIR FORMULARIO
		$('#add-data')
			.append('<h4 data-tipoid="'+tipo[0].id+'">'+tipo[0].nombre+'</h4>')

		let campos = JSON.parse(tipo[0].campos)
		let camposValue = JSON.parse(dato[0].campos)

		for ( let y = 0; y < campos.length ; y++ ){
			let name = campos[y].replace(" ", "_")
			$('#copy-txt-name')
				.clone()
				.removeClass('d-none')
				.removeAttr('id')
				.appendTo('#add-data')

			var lastDiv = $('#add-data div:last-of-type')

			lastDiv.find('label')
				.html(campos[y])

			lastDiv.find('.close-txt').remove()

			lastDiv.find('input')
				.attr({
					'id':name,
					'name':name,
					'placeholder':'Ingrese '+campos[y]
				})
				.val(camposValue[y]);
		}

		//AGREGO BOTON E IDENTIFICADOR saveDato

		//identificar si el boton esta en funcion de editar
		$('#saveType')
			.clone()
			.attr({'id':'saveDato','data-edit':ide})
			.html('Editar Datos')
			.appendTo('#add-data')

		guardar_nuevo_dato()


		//ocultar 
		$('.dev-full-view-card').data('cardid',0)
		$('.dev-full-view-card').removeClass('show-full-card')
		//ocultar boton crear
		$('#btnAddCard').hide()
		//mostrar boton editar y agregar ide
		$('#btnBackView').attr('data-cardid',ide)
		$('#btnBackView').data('cardid',ide)
		$('#btnBackView').show()

		$('#btnEditCard').data('cardid',ide)
		$('#btnEditCard').show()

	})
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
	$('#formCards input').css({'border':0,'border-bottom':'1px solid lightgrey'})
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
		var url = window.location.origin+"/datos/edit"
		var method = "put"
	}else{
		var url = window.location.origin+"/datos/create"
		var method = "post"
	}

	$.ajaxSetup({headers:{'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
  $.ajax({ url: url, method: method, data: { id:exo, card: card },
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

	        //function_to_view_edit_card(cardId)

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
        /*Echo.private(`cards.${result.card.id}`)
		    .listen('CardUpdate.cards.update', (e) => {
		        console.log(e);
		    });*/

        //limpio formulario registro
        limpiar_formulario_cards()

	    	funciones_volver_vista_principal( cardId )

				$('.bg-spinner').addClass('end-this')


    		/*window.Echo.channel('dev-canal')
        	.listen('dev-evento', (e) => {
        		console.log(e)
        	});*/
      }

    },
    error: function(i,o,u){
      location.reload();
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
	$(element).click(function(e){

		///////////////////////
		//RESET SEARCH BAR
		///////////////////////
		$('#search-txt').hide('fast')
		$('#hover-search').empty()
		$('#txtSearch').val('')

		var dato_id = $(this).closest('button').attr('id').replace('list-home-', '')
		var tClass = $(this).closest('button').attr('class')
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
		if( tClass.includes('active-mark') ||
			tClass.includes('bi-check') ||
			tClass.includes('close-mark') ||
			tClass.includes('bi-x') ){
			var state = $(this).closest('button').data('btnactive')
			//funcion activar o desactivar DATA
			active_or_inactive_data(dato_id, state)

		}else{

			var id = $(this).attr('id')
			var numberId = id.replace('list-home-','')
			$('#cards-list-tab button').removeClass('active-click')
			$(this).addClass('active-click')

			setTimeout(function(){
				$('.dev-card-details').empty()
				//agregar identificador de elemento
				$('.dev-full-view-card').data('cardid',numberId)
				$('.dev-full-view-card').toggleClass('show-full-card')
				$('.show-full-card').css({'min-height':window.outerHeight+'px'})

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
			
		}

	})
}

function trash_card(id){

	var url = window.location.origin+"/datos/delete"
	var method = "post"

	$.ajaxSetup({headers:{'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
  $.ajax({ url: url, method: method, data: { id:id },
    success: function(result){

      
      if( result.error ){
      	
      	Swal.fire({
				  title: result.error,
				  html: result.msj,
				  icon: 'error',
				  confirmButtonText: 'Ok!'
				})

      }

      if( result.error ){

       	Swal.fire({
				  title: result.error,
				  html: result.msj,
				  icon: 'error',
				  confirmButtonText: 'Ok!'
				})

      }

      if( result.yes ){

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