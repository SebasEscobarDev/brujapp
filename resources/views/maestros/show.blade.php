<!-- Modal to Show  -->
<div class="dev-full-view-card">
	<div class="dev-icon-arrow-card text-left">
    @include('svgs.back', ['width'=>'30', 'height'=>'30'])
    <span>Volver</span>
	</div>

	<div class="dev-show-card">
		<div class="dev-title-card">
			<i>
    		@include('svgs.bi-person-badge-fill', ['width'=>40, 'height'=>40])
			</i>
		</div>
		<div class="dev-card-details">
			
		</div>
		<div class="d-none" contenteditable="true" id="copy-text">
			
		</div>
	</div>
	<div class="dev-options-card">
		<button class="btn viewEditCard" id="editCard" data-cardid="">
			Editar
			<i class="float-left">
    		@include('svgs.bi-pencil-square', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
		<button class="btn" id="trashCard" data-cardid="">
			Eliminar
			<i class="float-left">
    		@include('svgs.bi-trash', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
		<br>
		<button class="btn cancelPanel" id="cancelPanel">
			Volver
			<i class="float-left">
    		@include('svgs.back', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
	</div>
	<div class="zona-modal-out"></div>
	
</div>