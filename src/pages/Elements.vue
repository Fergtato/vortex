<template>
	<div>
		
		<home-nav></home-nav>

		<h1>Home Page</h1>
		<div class="uk-margin">
			<button class="uk-button uk-button-default">Default</button>
			<button class="uk-button uk-button-primary">Primary</button>
			<button class="uk-button uk-button-secondary">Secondary</button>
		    <button class="uk-button uk-button-text">Text</button>
		    <button class="uk-button uk-button-link">Link</button>
	    </div>

	    <ul class="uk-breadcrumb">
		    <li><a href="#">Item</a></li>
		    <li><a href="#">Item</a></li>
		    <li class="uk-disabled"><a href="#">Disabled</a></li>
		    <li><span href="#">Active</span></li>
		</ul>

	    <span class="uk-label uk-margin">Year &#215;</span>
	    <span class="uk-label uk-margin">Genre &#215;</span>
	    <span class="uk-label uk-margin">Rating &#215;</span>
	    <span class="uk-label uk-margin">Keyword &#215;</span>


	    <div class="uk-child-width-1-2@s uk-grid-collapse uk-text-center" uk-grid>
		    <div>
		        <div class="uk-tile uk-tile-default">
		            <p class="uk-h4">Default</p>
		        </div>
		    </div>
		    <div>
		        <div class="uk-tile uk-tile-muted">
		            <p class="uk-h4">Muted</p>
		        </div>
		    </div>
		    <div>
		        <div class="uk-tile uk-tile-primary">
		            <p class="uk-h4">Primary</p>
		        </div>
		    </div>
		    <div>
		        <div class="uk-tile uk-tile-secondary">
		            <p class="uk-h4">Secondary</p>
		        </div>
		    </div>
		</div>

		<div class="uk-child-width-1-2@s" uk-grid>
		    <div>
		        <div class="uk-background-secondary uk-padding uk-light">
		            <h3 class="">Light</h3>
		            <p class="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		            <button class="uk-button uk-button-primary">Button</button>
		            <span class="uk-label uk-margin">Year &#215;</span>

		            <!-- <div class="form-group">
						<input type="text">
						<label for="input" class="control-label">Email</label>
						<i class="bar"></i>
					</div> -->

		        </div>
		    </div>
		</div>

		<form>
		    <fieldset class="uk-fieldset">

		        <legend class="uk-legend">Legend</legend>

		        <div class="uk-margin">
		            <input class="uk-input" type="text" placeholder="Input">
		        </div>

		        <div class="uk-margin">
		            <select class="uk-select">
		                <option>Option 01</option>
		                <option>Option 02</option>
		            </select>
		        </div>

		        <div class="uk-margin">
		            <textarea class="uk-textarea" rows="5" placeholder="Textarea"></textarea>
		        </div>

		        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
		            <label><input class="uk-radio" type="radio" name="radio2" checked> A</label>
		            <label><input class="uk-radio" type="radio" name="radio2"> B</label>
		        </div>

		        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
		            <label><input class="uk-checkbox" type="checkbox" checked> A</label>
		            <label><input class="uk-checkbox" type="checkbox"> B</label>
		        </div>

		        <div class="uk-margin">
		            <input class="uk-range" type="range" value="2" min="0" max="10" step="0.1">
		        </div>

		    </fieldset>
		</form>

		

	</div>
</template>