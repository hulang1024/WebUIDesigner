(function($){

	$.fn.select = function(options){
	    options = options || {};
		var $this = $(this);
		//var $selectList = $this.find(".select-item-list");
		var $selectItem = $this.find(".select-item");
		$this.on("mouseover", function(){
			$this.css("overflow", "visible");
		});/*.on("mouseout", function(){
			$this.css("overflow", "hidden");
		});*/
		$selectItem.on("click", function(){
			$selectItem.removeClass("select-active");
			$(this).addClass("select-active");
			$this.css("overflow", "hidden");
			var value = $(this).html();
			$this.find(".select-selected").html(value);
			if (options.onSelect) {
				options.onSelect($(this).data("value"));
			}
		});
	}

}(jQuery));