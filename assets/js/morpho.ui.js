Morpho.UI = function (){
	return {
		alert: function(options) {
			var $alert = $("<div title='"+options.title+"'></div>")
				.html(options.text)
				.dialog({
					modal:true,
					buttons: {				
						Ok: function() {
							$alert.dialog("destroy");
						}
					}
				});
		}
	};
}();