<!-- Modal to Show  -->
<div class="dev-full-view-card">
	<div class="dev-icon-arrow-card text-center">
    @include('svgs.bi-chevron-compact-up', ['width'=>'1em', 'height'=>'1em'])
	</div>
	<div class="dev-show-card">
		<div class="dev-title-card">
			<i class="float-left">
    		@include('svgs.bi-person-badge-fill', ['width'=>'1em', 'height'=>'1em'])
			</i>
			<span class="h-nombre"></span>
		</div>
		<div class="dev-card-details">
			
		</div>
		<div class="d-none" contenteditable="true" id="copy-text">
			
		</div>
	</div>
	<div class="dev-options-card">
		<button class="btn ibg-primary viewEditCard" id="editCard" data-cardid="">
			Editar
			<i class="float-left">
    		@include('svgs.bi-pencil-square', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
		<button class="btn ibg-primary" id="trashCard" data-cardid="">
			Eliminar
			<i class="float-left">
    		@include('svgs.bi-trash', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
		<br>
		<button class="btn ibg-primary" id="cancelPanel">
			Cancelar
			<i class="float-left">
    		@include('svgs.bi-x', ['width'=>'1em', 'height'=>'1em'])
			</i>
		</button>
	</div>
	<div class="zona-modal-out"></div>
</div>