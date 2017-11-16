<template>
	<div>
		
		<div class="test-bar"></div>

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

	    <span class="uk-label uk-margin">Default</span>

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
		        </div>
		    </div>
		</div>

	</div>
</template>