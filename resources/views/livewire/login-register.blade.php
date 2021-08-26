<div>
  <div class="row">
    <div class="col-md-12">
      @if (session()->has('message'))
        <div class="alert alert-success">
          {{ session('message') }}
        </div>
      @endif
      @if (session()->has('error'))
        <div class="alert alert-danger">
          {{ session('error') }}
        </div>
      @endif
    </div>
  </div>
  @if($registerForm)
    <form>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="name">Nombre :</label>
            <input type="text" wire:model="name" class="form-control" placeholder="Nombre" name="name">
            @error('name') <span class="text-danger error">{{ $message }}</span>@enderror
          </div>
          <div class="form-group">
            <label for="email">Correo :</label>
            <input type="text" wire:model="email" class="form-control" placeholder="Correo" name="email">
            @error('email') <span class="text-danger error">{{ $message }}</span>@enderror
          </div>
          <div class="form-group">
            <label for="password">Contraseña :</label>
            <input type="password" wire:model="password" class="form-control" placeholder="Contraseña" name="password">
            @error('password') <span class="text-danger error">{{ $message }}</span>@enderror
          </div>
        </div>
        <div class="col-md-12 text-center">
          <button class="btn ibg-primary" wire:click.prevent="registerStore">
            <span>Registrar</span>
          </button>
          <button class="btn ibg-primary" wire:click.prevent="register">
            <span>Iniciar Session</span>
          </button>
        </div>
      </div>
    </form>
  @else
    <form>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="email">Correo :</label>
            <input type="text" wire:model="email" class="form-control" placeholder="Correo" name="email">
            @error('email') <span class="text-danger error">{{ $message }}</span>@enderror
          </div>
          <div class="form-group">
            <label for="password">Contraseña :</label>
            <input type="password" wire:model="password" class="form-control" placeholder="Contraseña" name="password">
            @error('password') <span class="text-danger error">{{ $message }}</span>@enderror
          </div>
        </div>
        <div class="col-md-12 text-center">
          <button class="btn bg-white" wire:click.prevent="login">
            <span>Iniciar Session</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
          </button>
          <button class="btn bg-white" wire:click.prevent="register" id="btnRegisterAccount">
            <span>Registrar</span>
          </button>
        </div>
      </div>
    </form>
  @endif
</div>