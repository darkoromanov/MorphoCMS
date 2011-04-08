var __startup_duties = [];

var Morpho = function () {
	return {
		Core: function(){},
		Entity: function(){},
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

Morpho.Entity = function (){
	return {
		Property: function (){
			return {
				add: function () {
					//duplicated name?
					//duplicated code?
					//missing name?
					//missing code?
				}				
			}
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