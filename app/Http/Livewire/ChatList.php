<?php

namespace App\Http\Livewire;

use Livewire\Component;

class ChatList extends Component
{

	public $mensajes;
	public $listeners = ["mensajeRecibido"];

	public function mount(){
		$this->mensajes = [];
	}

	//funcion para suscribirme al canal "listener"
	public function mensajeRecibido($mensaje){
		$this->mensajes[] = $mensaje;
	}
	
    public function render()
    {
        return view('livewire.chat-list');
    }
}
