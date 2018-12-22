/**
 * 滑块插件
 * 
 * @author 赵凡
 */
+(function($){
	
	function init(target) {
		
		// 鼠标按下，触发slider-bar拖拽开始的事件
		var $target = $(target);
		// 获取选项
		var options = $.data(target, 'myslider').options;
		// 初始化滑块插件的总长度
		$target.css("width", parseInt(options.width) + "px");
		// 初始化滑块的位置
		var $bar = $target.find(".slider-bar");
		var value = parseInt(options.value);
		$bar.css("left", (value - 7) + "px");
		// 初始化已滑动的距离
		var $done = $target.find(".slider-done");
		$done.css("width", value + "px");
		// 为滑块绑定滑动事件
		$bar.on("mousedown", function(e) {
		
			// 鼠标移动，触发slider-bar拖拽移动事件
			$(document).on("mousemove", move).on("mouseup", function(e){// 鼠标弹起，解绑移动事件
				
				$(document).off("mousemove");
				
			});
		
		});
		
		$target.on("click", move);
		
		function move(e){
			
			// 防止拖拽时选中div
			e.preventDefault();
			// 计算出滑动的宽度
			var width = e.clientX - $target.offset().left;
			_change(width, $target, $bar, $done, options);
		}
		
	}
	
	function _change(width, $target, $bar, $done, options) {
		// 获取可以滑动的最大宽度
		var maxWidth = parseInt($target.css("width"));
		// 限制滑动范围
		if (width < 0) {
			width = 0;
		} else if (width > maxWidth) {
			width = maxWidth;
		}
		$bar.css("left", (width - 7) + "px");
		$done.css("width", width + "px");
		
		// 调用滑块的onChange事件
		options && options['onChange'] && options.onChange(width / maxWidth);
	}
	
	$.fn.myslider = function(options, param) {
		if (typeof options == "string") {// 调用相应方法
			return $.fn.myslider.methods[options](this, param);
		}
		
		// 初始化插件
		options = options || {};
		return this.each(function(){
			
			var state = $.data(this, 'myslider');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'myslider', {
					options: $.extend({}, $.fn.myslider.defaults, $.fn.myslider.parseOptions(this), options)
				});
				init(this);
			}
		});
	}
	
	/**
	 * 声明插件方法
	 * 
	 */
	$.fn.myslider.methods = {
		change : function(jq, param) {
			$(jq).each(function(){
				var $target = $(this);
				var $bar = $target.find(".slider-bar");
				var $done = $target.find(".slider-done");
				var otpions = ($.data(this, 'myslider') || {options: {width: 100}}).options;
				_change(param * otpions.width/100, $target, $bar, $done, otpions);
			});
		}
	}
	
	/**
	 * 声明默认选项和事件
	 * 
	 */
	$.fn.myslider.defaults = {
		value : 0,
		width : 100,// 滑块插件总宽度
		onChange : function(percent) {// 滑块值改变事件
			
		}
	}
	
	$.fn.myslider.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, [
			'width',{min:'number',max:'number',step:'number'}
		]), {
			value: (t.val() || undefined)
		});
	};
	
}(jQuery));