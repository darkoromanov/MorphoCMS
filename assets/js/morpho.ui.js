Morpho.UI = function (){
	var $_loading_dialog;
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
		},
		confirm: function(options) {
			var $confirm = $("<div title='"+options.title+"'></div>")
			.html(options.text)
			.dialog({
				modal:true,
				buttons: {				
					No: function() {
						$confirm.dialog("destroy");
					},
					Yes: function() {
						if($.isFunction(options.callback)) {
							$confirm.dialog('destroy');
							options.callback.call(this);
						}
					}
				}
			});
		},
		show_loading: function () {
			$_loading_dialog = $("<div><img class='spinner' src='/assets/images/spinner.gif' alt='Loading...' /></div>")
				.dialog({
					modal:true,
					dialogClass: 'loading',
					resizable: false,
					draggable: false,
					width:100,
					height:100,
					closeOnEsc: false
				});
		},
		close_loading: function () {
			try {
			$_loading_dialog.dialog('destroy');
			} catch(e){}
		}
	};
}();