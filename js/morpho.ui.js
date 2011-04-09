Morpho.UI = function (){
	return {
		alert: function(options) {
			$("<div title='"+options.title+"'></div>")
				.html(options.text)
				.dialog({
					modal:true
				});
		}
	};
}();