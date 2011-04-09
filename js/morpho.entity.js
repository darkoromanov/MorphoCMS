Morpho.Entity = function (){
	return {
		Property: function (){}
	};
}();
Morpho.Entity.Property = function (){
	return {
		add: function () {
			//missing label?
			var label = $(".data.panel .properties .prop:visible .label").val();								
			if(label.length == 0) {
				Morpho.UI.alert({
					title: "Attention",
					text: "Insert the label for the property",
					resizable: false
				});
				return false;
			}
			
			//missing code?
			var code = $(".data.panel .properties .prop:visible .code").val();
			if(code.length == 0) {
				Morpho.UI.alert({
					title: "Attention",
					text: "Insert the code for the property",
					resizable: false
				});
				return false;
			}				

			//duplicated label?
			if($(".properties.panel .label[value="+label+"]").size() > 0) {
				Morpho.UI.alert({
					title: "Attention",
					text: "A property with label '"+label+"' already present",
					resizable: false
				});
				return false;		
			}
			
			//duplicated code?
			if($(".properties.panel .code[value="+code+"]").size() > 0) {
				Morpho.UI.alert({
					title: "Attention",
					text: "A property with code '"+code+"' already present",
					resizable: false
				});
				return false;		
			}
		}				
	};
}();