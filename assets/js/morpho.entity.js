Morpho.Entity = function (){
	return {
		Property: function (){},
		
		save: function (){
			Morpho.UI.show_loading();
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
					var code = $("input[name=code]").val();
					if(code == "") {
						Morpho.UI.alert({
							title: "Attention",
							text: "Insert the code of the entity",
							resizable: false
						});
						return false;
						
						
					} else {
						$.post("/index.php/entity/get_list/", {code: code}, function(data) {
							if(data.length > 0) {
								Morpho.UI.alert({
									title: "Attention",
									text: "Code '"+code+"' already used",
									resizable: false
								});
								return false;					
							}
							else {					
								
							}
						});
					}
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