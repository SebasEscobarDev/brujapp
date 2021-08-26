$(document).ready(function(){
	$('#btnShowFechas').hide()
	$('#btnSearchCards').hide()

	$('.btns-perfiles a').each(function(i,obj){
        if( $(this).attr('href') == window.location.href ){
            $(this).addClass('active')
        }
    })
})


function generarNumero(numero){
	return (Math.random()*numero).toFixed(0)
}

function colorRGB(){
	var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255) +", 0.2)";
	return "rgba" + coolor;
}

function colorRGB2(){
	var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255) +", 1)";
	return "rgba" + coolor;
}