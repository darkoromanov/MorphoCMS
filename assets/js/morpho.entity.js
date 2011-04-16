Morpho.Entity = function (){
	return {
		Property: function (){},
		
		save: function (check_properties){
			
			if(check_properties != undefined && check_properties) {
				//check for properties
				var props_no = $(".properties.panel .pcode").size();
				if(props_no == 0) {
					Morpho.UI.confirm({
						title:'Confirm',
						text:'No properties were added, do you want to save anyway ?',
						callback: Morpho.Entity.save
					});	
					return;
				}
			}
			
			Morpho.UI.show_loading();
			
			// check 1 : empty name
			var name = $("input[name=name]").val();
			if(name == "") {
				Morpho.UI.alert({
					title: "Attention",
					text: "Insert the name of the entity",
					resizable: false
				});
				Morpho.UI.close_loading();
				return false;							
			}
			
			// check 2 : empty code
			var code = $("input[name=code]").val();
			if(code == "") {
				Morpho.UI.alert({
					title: "Attention",
					text: "Insert the code of the entity",
					resizable: false
				});
				return false;
			}	
			console.debug();
			// check 3 name already in db
			$.post("/index.php/entity/get_list/", {name: name}, function(data) {
				if(data.length > 0) {
					Morpho.UI.alert({
						title: "Attention",
						text: "Name '"+name+"' already used",
						resizable: false
					});
					Morpho.UI.close_loading();
					return false;					
				}
				else {	
					// check 4 code already in db
					$.post("/index.php/entity/get_list/", {code: code}, function(data) {						
						if(data.length > 0) {
							Morpho.UI.alert({
								title: "Attention",
								text: "Code '"+code+"' already used",
								resizable: false
							});
							Morpho.UI.close_loading();
							return false;					
						}
						else {												
							//all checks are ok, we're going to insert the entity							
							var entity = {
									id: 0,
									name: name,
									code: code,
									properties : []
							};
							if(! isNaN(parseInt($('#entity-id').val())))
								entity.id = parseInt($('#entity-id').val());
								
							//adding all properties
							$(".properties.panel .item").each(function () {
								var property = {};
								
								//common attributes
								property.type = $(this).find('a.type').attr('name');
								property.label = $(this).find('.label').val();
								property.code = $(this).find('.pcode').val();
								property.pattern = $(this).find('.pattern:checked').size() > 0;
								property.mandatory = $(this).find('.mandatory:checked').size() > 0;
								property.tip = $(this).find('.tip').val();
								
								//property type specific attributes
								switch(property.type)
								{
									case 'text':
										property.html = $(this).find('.html:checked').size() > 0;
										property.multiline = $(this).find('.multiline:checked').size() > 0;
										property.default_value = $(this).find('.defval').val();
										property.validation = {};
										property.validation.minlen = parseInt($(this).find('.minlen').val());
										if(isNaN(property.validation.minlen))
												property.validation.minlen = -1;
											
										property.validation.maxlen = parseInt($(this).find('.maxlen').val());
										if(isNaN(property.validation.maxlen))
											property.validation.maxlen = -1;
										
										property.regexp = $(this).find('.regexp').val();
										break;								
								}
								entity.properties.push(property);
							});
							
							$.post('/index.php/entity/save', entity, function (id) {
								$('#page-title').text('Editing entity \''+name+'\'');
								Morpho.UI.close_loading();
								if(id > 0) {
									$('#entity-id').val(id);
									Morpho.UI.alert({
										title: "Confirm",
										text: "Enity '"+name+"' saved",
										resizable: false
									});									
									return true;									
								}
							});
						}
					});
				}
			});
		}
	};
}();
Morpho.Entity.Property = function (){
	return {		
		add: function () {			
			var $prop = $(".data.panel .properties .prop:visible");
		
			//missing label?
			var label = $prop.find(".label").val();								
			if(label.length == 0) {
				Morpho.UI.alert({
					title: "Attention",
					text: "Insert the label for the property",
					resizable: false
				});
				return false;
			}
			
			//missing code?
			var code = $prop.find(".pcode").val();
			if(code.length == 0) {
				Morpho.UI.alert({
					title: "Attention",
					text: "Insert the code for the property",
					resizable: false
				});
				return false;
			}				

			//duplicated label?
			var exit = false;
			$(".properties.panel .label").each(function () {
				if($(this).val() == label) {
					Morpho.UI.alert({
						title: "Attention",
						text: "A property with label '"+label+"' already present",
						resizable: false
					});
					exit = true;
					return false;					
				}
			});
			if(exit)
				return false;
			
			var type = $(".add-property-panel select").val();
			
			//duplicated code?
			$(".properties.panel .pcode").each(function () {
				if($(this).val() == code) {
					Morpho.UI.alert({
						title: "Attention",
						text: "A property with code '"+code+"' already present",
						resizable: false
					});
					exit = true;
					return false;					
				}
			});
			if(exit)
				return false;
			
			$(".properties.panel .empty").hide();
			
			var $panel = $("<div></div>")
							.addClass("item")
							.hide();
			var $title = $("<p></p>")
							.text(label)
							.append("<span>("+type+")");
			
			var $delete = $("<a href='#'>X</a>")
							.addClass("delete")
							.addClass("ui-icon")
							.addClass("ui-icon-closethick")
							.click(function () {
								$(this).parents(".item").slideUp(function () {
									$(this).remove();									
								});
								return false;
							});
			var $edit = $("<a href='#'>edit</a>")
							.addClass("edit")
							.addClass("ui-icon")
							.addClass("ui-icon-triangle-1-e")
							.click(function () {
								$(this).parents(".item").find(".prop").slideToggle();
								$(this).toggleClass("ui-icon-triangle-1-e");
								$(this).toggleClass("ui-icon-triangle-1-s");
								
								return false;
							});			
			
			$prop = $prop.clone();
			//$button = $("<div class='buttons'><a class='button' href='#'>Update</a></div>");
			//$prop.append($button);
			
			$title.append($delete);
			$title.append($edit);
			$panel.append($title);
			
			$prop.find(".help-panel,.ui-icon-help").remove();
			$panel.append($prop.hide());
			
			$(".properties.panel").append($panel);
			$panel.slideDown();
			
			//auto slug of the property name
			$prop.find("input.label").keyup(function () {
		        var v = $(this).val();            
		        v = Morpho.Utils.slug(v);        
		        $prop.find("input.pcode").val(v);
		    });
			return false;
		}				
	};
}();