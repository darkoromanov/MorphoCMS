var __startup_duties = [];

var Morpho = function () {
	return {
		Core: function(){},
		Entity: function(){},
		UI: function () {},
		Utils: function(){}
	};
}();
Morpho.Core = function (){
	return {
		addToStartupDuties: function(f) {
			__startup_duties.push(f);
		}
	};
}();


$(function () {
	$.each(__startup_duties, function (i, f) {
		if($.isFunction(f)){
			f.call(window);			
		}
	});
});