<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Events\EnviarMensaje;

class ChatForm extends Component
{

	public $nombre;
	public $mensaje;

	public function mount(){
		$this->nombre = "";
		$this->mensaje = "";
	}

    public function render()
    {
        return view('livewire.chat-form');
    }


    //validacion en tiempo real
    public function updated($field){
    	$this->validateOnly($field, [
    		"nombre" => "required|min:3",
    		"mensaje" => "required"
    	]);
    }



    public function enviarMensaje(){
    	$this->emit("mensajeEnviado");


    	$this->validate([
    		"nombre" => "required|min:3",
    		"mensaje" => "required"
    	]);

    	$datos = [
    		"nombre" => $this->nombre,
    		"mensaje" => $this->mensaje
    	];

    	//esto se puede enviar desde el cliente con Javascript!
    	//window.livewire.emit
    	//$this->emit("mensajeRecibido", $datos);

    	event(new EnviarMensaje($this->nombre, $this->mensaje));
    }
}
