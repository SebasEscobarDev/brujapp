$(document).ready(function(){
	mostrar_boton_de_registro()
	resaltar_boton_activo_menu()
	ancho_maximo_de_cabecera()

	$('#menu-dash-left').click(function(){
		$('#menu-full-left').addClass('active')
		$('.bg-image').addClass('active')
	})

	$('#close-menu, .bg-image').click(function(){
		$('#menu-full-left').removeClass('active')
		$('.bg-image').removeClass('active')
	})

	setTimeout(function(){
		hide_spinner()
	},300)

	if( window.location.href.indexOf('perfil') > 1 ){
		$('.dev-perfil a').addClass('active')
	}

});

function mostrar_boton_de_registro(){
	if( window.location.href.indexOf('developer') > 1 ){
		$('#btnRegisterAccount').show()
	}
}

function resaltar_boton_activo_menu(){
	$('nav.dd-menu-left a').each(function(i,obj){
		var nameUrl = window.location.pathname
		if( nameUrl != '/' ){
			if( $(obj).attr('href').indexOf(nameUrl) > 0 ){
				$(this).addClass('active')
			}
		}
	})

	$('nav.dd-menu-left a').click(function(i,obj){
		$('.bg-spinner').removeClass('end-this')
	})
}

function ancho_maximo_de_cabecera(){
	setTimeout(function(){
		$('.fixed-menu').css({'max-width':window.outerWidth})
		$('.navbar-brand span').addClass('active')
	},500)
}

function hide_spinner(){
	$('.bg-spinner').addClass('end-this')
}
