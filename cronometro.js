var Cronometro = {}

	var comenzar = false;
	var inter = undefined;
	var tiempo = 0.0;
	var contador = 0;
	var parar = false;
	var presiono = true;
	var tiempo2 = 0;
	Cronometro.init = function(){
		
		$(function(){

			$("#timer").on('tap',function(){
				if(presiono){
					Cronometro.module.actionRecargar.init();
					
				}
				comenzar = !comenzar;
				console.log(comenzar);
				
				
				Cronometro.module.actionChecarTiempo.init()
			});

			$("#timer").on('swipeRight',function(){
				localStorage.clear();
				tiempo = 0.0;
				$("#timer-2").html("0.0");
				$("#lista").html("");
				Cronometro.module.actionParar.init();
				presiono = true;
			})

			$("#btn-izquierda").on('click',function(e){

				
				if(presiono){
					Cronometro.module.actionRecargar.init();
					
				}
				comenzar = !comenzar;
				console.log(comenzar);
				
				
				Cronometro.module.actionChecarTiempo.init()
				
			});

			$("#btn-derecha").on('click',function(e){
				localStorage.clear();
				tiempo = 0.0;
				$("#timer-2").html("0.0");
				$("#lista").html("");
				Cronometro.module.actionParar.init();
				presiono = true;
			})
		});
	}

	Cronometro.module = {
		actionChecarTiempo:{},
		actionRecargar:{},
		actionGuardar:{},
		actionParar:{},
		actionCargarLista:{}

	}

	Cronometro.module.actionChecarTiempo.init = function(){
		if(comenzar){
			parar = true;
			$("#btn-izquierda").css('border',"2px solid #DC2717");
			$("#btn-izquierda").css('color',"#DC2717");
			$("#btn-izquierda p").text("Parar");

			Cronometro.module.actionGuardar.init();
			//$("#lista").html(Cronometro.module.actionCargarLista.init());
			//Cronometro.module.actionParar.init();

			
			
		}else{
			if(tiempo < 10){
				$("#lista").append('<div class="fila">0'+tiempo.toFixed(1)+'</div>');
			}else{
				$("#lista").append('<div class="fila">'+tiempo.toFixed(1)+'</div>');
			}
			
			parar = false;
			$("#btn-izquierda").css('border',"2px solid #63dc17");
			$("#btn-izquierda").css('color',"#63dc17");
			$("#btn-izquierda p").text("Arrancar");
			
		}
	}
	Cronometro.module.actionCargarLista.init = function(){
		var resultado = '' ;
		for(var i = 0; i < localStorage.length; i++){
			resultado += '<div class="fila">'+parseInt(localStorage.getItem("cont"+ i)).toFixed(1)+'</div>';
		}
		return resultado
	}
	Cronometro.module.actionParar.init = function(){
		clearInterval(inter);
	}
	Cronometro.module.actionGuardar.init = function(){
		localStorage.setItem("cont"+contador++,tiempo);
	}

	Cronometro.module.actionRecargar.init = function(){
		presiono = false;
		 inter = setInterval(function(){
		 		if(parar){
		 			tiempo += 0.1;
		 			var a = tiempo.toFixed(1).toString();
		 			
		 			 
		 			$("#timer-1").html("Milisegundos " + a.substring(a.length-1,a.length));
		 			$("#timer-2").html(tiempo.toFixed(1) + " s");
		 		
					
		 		}
		 		
		 	
			
		},100)
	}



Cronometro.init();