/*
	作者：leo
	时间：2017-01-12
	描述：nav.js
	html结构如下：
		<div>
			<ul class="slider-img">
				<li class="active"><a href="javascript: void(0);">内容一</a></li>
				<li><a href="javascript: void(0);">内容二</a></li>
				<li><a href="javascript: void(0);">内容三</a></li>
			</ul>
			<ul class="slider-nav">
				<li class="active">一</li>
				<li>二</li>
				<li>三</li>
			</ul>
		</div>
*/
(function(global, $) {
	'use strict';
    //Make sure jQuery exists
    if (!$) throw new Error('nav requires jQuery to work.');
    
    $.fn.slider = function(options) {
    	var self = this;
		//默认参数
		var defaults = {
			'handle': 'hover',
			'type'  : 'roll',
			'speed' : 5000,
			'width' : 0
		};
		var settings = $.extend(defaults, options || {});		
		var img_ul  = self.find('ul.slider-img'),
			img_li  = img_ul.children("li"),
			aimg    = img_ul.find('img'),
			nav_ul  = self.find('ul.slider-nav'),
			nav_li  = nav_ul.children("li"),
			sub     = 0,
			order   = true,
			timer   = null;
		
    	// 初始化
    	var init = function(){
			timer = setInterval(_slider, settings['speed'])
			setStyle();
			settings['handle'] == 'hover' ? _hover() : _click();
    	}
    	
    	// 轮播
    	var _slider = function(){   
    		if (order && sub >= aimg.length - 1){
    			order = false;
    		}else if (order || sub <= 0){
    			order = true;
    		}
    		order ? sub ++ : sub --;
    		settings['type'] ? (settings['type'] == 'fade' ? _fade() : _roll()) : _display();
    	}
    	
    	// 显示隐藏
    	var _display = function(){    		
    		nav_li.eq(sub).addClass('active').siblings('li').removeClass('active');
    		img_li.eq(sub).css('display', 'block').siblings('li').css('display', 'none');
    	}
    	
    	// 淡入淡出
    	var _fade = function(){
    		var prev  = img_ul.find('li:visible');
    		nav_li.eq(sub).addClass('active').siblings('li').removeClass('active');
    		prev.stop().fadeOut('fast', function(){img_li.eq(sub).fadeIn('slow');})
    	}
    	
    	// 滚动
    	var _roll = function(){
    		nav_li.eq(sub).addClass('active').siblings('li').removeClass('active');
    		img_ul.stop().animate({'left': - settings['width'] * sub + 'px'}, 1000)
    	}    		
    	
    	// 设制样式
    	var setStyle = function(){
    		var target = img_ul.children("li.active");
			settings['width'] = self.width();
    		aimg.css('width', settings['width']);
    		var img = new Image();  
    		img.src = aimg.eq(0).attr('src');
		    img.onload =function(){ self.css('height', aimg.height()); }   
    		if (settings['type'] == 'roll') {
    			img_ul.css({    				
    				'width'   : settings['width'] * aimg.length + 'px',
    				'position': 'absolute',  
    				'left'    : - settings['width'] * sub + 'px',
    				'top'     : 0
    			}).children("li").css({
    				'width': settings['width'] + 'px',
    				'float': 'left'
    			})
    		}else {
    			target.show().siblings('li').hide();
    		}
    	}
    	
    	// hover
    	var _hover = function(){
    		nav_li.hover(
    			function(){
	    			var _this = $(this);
					sub = _this.index();
					clearInterval(timer);
					settings['type'] == 'roll' ? _roll() : (settings['type'] == 'fade' ? _fade() : _display());
					_this.addClass('active').siblings('li').removeClass('active');
	    		}, function(){
	    			timer = setInterval(_slider, settings['speed']);
	    		}
	    	)
    	}
    	
    	// click
    	var _click = function(){
    		nav_li.click(function(){
    			var _this = $(this);
				sub = _this.index();
				clearInterval(timer);
				settings['type'] == 'roll' ? _roll() : (settings['type'] == 'fade' ? _fade() : _display());
				_this.addClass('active').siblings('li').removeClass('active');
				timer = setInterval(_slider, settings['speed']);
	    	})
    	}
    	    	
    	init();    	
    	
    	var _attachEvent = function(obj, evt, func){ 
    		if(obj.addEventListener) { 
    			obj.addEventListener(evt, func, false); 
    		} else if(obj.attachEvent) { 
    			obj.attachEvent('on' + evt, func); 
    		}
    	}
    	
    	_attachEvent(window, 'resize', setStyle)
	}		 
})(this, jQuery);