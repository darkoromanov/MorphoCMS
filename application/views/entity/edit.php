<div id="yui-main">
	<div class="yui-b">
		<div class="yui-g entities" id="main">
			<h1 id="page-title">Define a new entity</h1>
			<div>
				<div class="data panel">
					<h2>Entity data</h2>
					<input id="entity-id" type="hidden" />
					<div class="name-code">
						<p>
							<label>Name:</label>
							<input type="text" name="name" />
							<a href="#" class="ui-icon ui-icon-help right">Help</a>
							<span class="help-panel ui-widget ui-widget-content ui-corner-all">
								Specify the name of this entity
							</span>
						</p>
						<p>
							<label>Code:</label>
							<input type="text" name="code" />
							<a href="#" class="ui-icon ui-icon-help right">Help</a>
							<span class="help-panel ui-widget ui-widget-content ui-corner-all">
								Specify the code of this entity
							</span>
						</p>
						<div class="add-property-panel">
							<p class="add-property">
								Add a property of type
								<select name="type">
									<option value="text">text</option>
									<option value="integer">integer</option>
									<option value="float">float</option>
									<option value="relation">relation</option>
									<option value="media">media</option>
									<option value="date">date</option>
								</select>
							</p>							
						</div>
						
						<div class="properties">
							<!-- <h2>Options</h2> -->
							<?php include "properties-tpl/text.php" ?>					
							<?php include "properties-tpl/date.php" ?>
						</div>
						<div class="buttons">
							<a href="#" class="button add-property">Add property</a>
							<a href="#" class="button save-property">Save entity</a>
						</div>
					</div>
				</div>
				<div class="properties panel">
					<h2>Entity properties</h2>
					<div class="empty ui-state-highlight ui-corner-all"> 
						<p style="margin:10px"><span style="margin-right: 0.7em;" class="ui-icon ui-icon-info left"></span>
							This entity doesn't have any property yet
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">

Morpho.Core.addToStartupDuties(function () {	
	$(".ui-icon-help").fadeTo(500, .2).hover(
			function() {
				$(this).siblings(".help-panel").show();
			},
			function() {
				$(this).siblings(".help-panel").hide();
			}
	);
	$("#main .data.panel p").hover(
		function () {
			$(this).find(".ui-icon-help").fadeTo(100, 1);
		},
		function () {
			$(this).find(".ui-icon-help").fadeTo(100, .2);
		}
	);

	//load the correct property panel
	$(".add-property select").change(function () {
		var type = $(this).val();
		$("#main .data.panel .properties .prop").hide();
		$("#main .data.panel .properties .prop."+type).show();
	}).change();

	//auto slug of the entity name
	$("input[name=name]").keyup(function () {
        var v = $(this).val();            
        v = Morpho.Utils.slug(v);        
        $("input[name=code]").val(v);
    });
	//auto slug of the property name
	$("input.label").keyup(function () {
        var v = $(this).val();            
        v = Morpho.Utils.slug(v);        
        $(this).parents(".prop").find("input.pcode").val(v);
    });

	//bind add property button click
	$(".button.add-property").click(Morpho.Entity.Property.add);

	//bind save entity button click
	$(".button.save-property").click(function () {Morpho.Entity.save(true);});	
});
</script>

<div class="yui-b" id="sidebar">
	<?php include "sidebar.php"?>
</div>