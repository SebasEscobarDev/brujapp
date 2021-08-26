$(document).ready(function(){

    $('#btnShowFechas').hide()
    $('#btnSearchCards').hide()

	//curvatura de graficos sirve para estadisticas de facturación de maestros

	/*
	{
    label: 'Sebas',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }

    */

    var labels = [];
    function crearDataSetsParaGraficos(maestros,grafico){
    	var dataSetsGraficoContactos=[];
    	var colors=[255,54,255,75,153,255];
    	var colors2=[99,162,206,192,102,159];
    	var colors3=[132,235,86,192,255,64];
    	for ( let i = 0; i < maestros.length; i++){
    		var label = maestros[i].name;
    		var datas=[];
    		var arrayColors = [colorRGB(),colorRGB(),colorRGB(),colorRGB(),colorRGB(),colorRGB(),colorRGB()];
            var arrayBorders = [colorRGB2(),colorRGB2(),colorRGB2(),colorRGB2(),colorRGB2(),colorRGB2(),colorRGB2()];
            //array for contactos contactos
    		for ( let y in maestros[i].dias ){
    			for( let d in maestros[i].dias[y] ){
    				if( labels.includes(d)  ){
    				}else{
    					labels.push(d);
    				}
    				//validacion para determinar graficos de maestros ( 1=contactos, 2=facturaciones... )
    				if( grafico == 1 ){
    					datas.push(maestros[i].dias[y][d][0])
    				}else if( grafico == 2 ){
    					datas.push(maestros[i].dias[y][d][1])
    				}else if( grafico == 3 ){}
    				//console.log(d+' = '+)
    			}
    		}

            dataSetsGraficoContactos[i] = {
            	label:label,
            	data:datas,
            	backgroundColor:arrayColors,
            	borderColor:arrayBorders,
            	borderWidth:1,
                pointRadius: 10,
            };
    	}
    	return dataSetsGraficoContactos;
    }

    var graficosContactos = crearDataSetsParaGraficos(maestros,1)
    var graficosFacturaciones = crearDataSetsParaGraficos(maestros,2)

    console.log( graficosContactos )
    console.log('================================')
    console.log( graficosFacturaciones )
    console.log('================================')


    //console.log( maestros )

	var ctx = document.getElementById('contactos').getContext('2d');
	var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: graficosContactos
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
	});

	var ctx = document.getElementById('facturaciones').getContext('2d');
	var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: graficosFacturaciones
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                onComplete: function() {
                    //alert('Line Chart Rendered Completely!');
                    //$('.fixed-menu').css({'max-width':window.outerWidth})
                    //$('html,body').css({'max-width':window.outerWidth, 'overflow-x':none})

                }
            },
        }
	});
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