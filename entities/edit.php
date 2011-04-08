<?php include "../page_parts/header.php"?>
<div id="yui-main">
	<div class="yui-b">
		<div class="yui-g entities" id="main">
			<h1>Define a new entity</h1>
			
			<div>
				<div class="data panel">
					<h2>Entity data</h2>
					
					<div class="name-code">
						<p>
							<label>Name:</label>
							<input type="text" name="name" />
						</p>
						<p>
							<label>Code:</label>
							<input type="text" name="code" />
						</p>
						<div class="add-property-panel">
							<p class="add-property">
								Add a property 
								<select name="type">
									<option value="text">text</option>
									<option value="integer">integer</option>
									<option value="float">float</option>
									<option value="relation">relation</option>
									<option value="media">media</option>
									<option value="media">date</option>
								</select>
							</p>
							<a href="#" class="ui-icon ui-icon-plusthick left">Add</a>
						</div>
						
						<div class="properties">
							<h2>Options</h2>
							<div class="prop text">
								<p>
									<label>Label</label>
									<input type="text" class="label" />
									<a href="#" class="ui-icon ui-icon-help right">Help</a>
								</p>
								<p>
									<label>Code</label>
									<input type="text" class="pcode" />
									<a href="#" class="ui-icon ui-icon-help right">Help</a>
								</p>
								<p>
									<label>Default value</label>
									<input type="text" class="defval" />
									<a href="#" class="ui-icon ui-icon-help right">Help</a>
								</p>
								<p>
									<label>Tip</label>
									<input type="text" class="tip" />
									<a href="#" class="ui-icon ui-icon-help right">Help</a>
								</p>
								<p>
									<label>Mandatory</label>
									<input type="checkbox" class="mandatory" /> Yes
									<a href="#" class="ui-icon ui-icon-help right">Help</a>
								</p>
								<p>
									<label>Pattern</label>
									<input type="checkbox" class="pattern" /> Yes
									<a href="#" class="ui-icon ui-icon-help right">Help</a>
								</p>
								<h2 class="validation">Validation</h2>
								<div class="conditions">
									<p>
										<label>Min length</label>
										<input type="text" class="minleng" />
										<a href="#" class="ui-icon ui-icon-help right">Help</a>
									</p>
									<p>
										<label>Max length</label>
										<input type="text" class="maxleng" />
										<a href="#" class="ui-icon ui-icon-help right">Help</a>
									</p>
									<p>
										<label>RegExp</label>
										<input type="text" class="regexp" />
										<a href="#" class="ui-icon ui-icon-help right">Help</a>
									</p>
								</div>								
							</div>							
						</div>
						<div class="buttons">
							<a href="#" class="button">Add property</a>
							<a href="#" class="button">Save entity</a>
						</div>
					</div>
					
					<div class="property">
					
					</div>
				</div>
				<div class="properties panel">
					<h2>Entity properties</h2>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function () {
		$(".ui-icon-help").fadeTo(500, .2);
		$("#main .data.panel p").hover(
			function () {
				$(this).find(".ui-icon-help").fadeTo(100, 1);
			},
			function () {
				$(this).find(".ui-icon-help").fadeTo(100, .2);
			}
		);
	});
</script>

<div class="yui-b" id="sidebar">
	<?php include "sidebar.php"?>
</div>
<?php include "../page_parts/footer.php"?>