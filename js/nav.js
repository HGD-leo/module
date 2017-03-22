/*
	作者：leo
	时间：2017-01-12
	描述：nav.js
	html结构如下：
		<div id="nav">
			<ul>
				<li class="active"><a href="#">推荐</a></li>
				<li><a href="#">电影</a></li>
				<li><a href="#">电视剧</a></li>
			</ul>
		</div>
*/
(function(global, $) {
	'use strict';
    //Make sure jQuery exists
    if (!$) throw new Error('nav requires jQuery to work.');
    
    $.fn.nav = function(options) {
    	var self = this;
		//默认参数
		var defaults = {
			idname : 'nav_border',
			height : '30px',
			border : '1px solid #fff',
			radius : '16px',
			speed  : 300,
			padding: 20
		};
		var settings = $.extend(defaults, options || {});		
		var ul = self.children('ul'),
			li = ul.children("li"),
			ali = ul.children("li[class='active']"),
			ulWidth = 0;
		
    	// 初始化
    	var init = function(){
			for (var i = 0,len = li.length; i < len; i++) ulWidth += li.eq(i).outerWidth();
			ul.css('width', ulWidth + 'px');
			settings['width'] = ali.width() + settings['padding'] * 2 + 'px';
			settings['left'] = ali.offset().left + (ali.outerWidth() - parseInt(settings['width']) - 2) / 2 + 'px';
			settings['top'] = (ali.height() - parseInt(settings['height']) - 2) / 2 + 'px';
			_create();
			_hover();
			_click();
    	}
    	
    	// 创建
    	var _create = function(){
    		var nav_border = document.createElement("div");
			nav_border.id = settings['idname'];
			nav_border.style.position = "absolute";
			nav_border.style.left = settings['left'];
			nav_border.style.top = settings['top'];
			nav_border.style.width = settings['width'];
			nav_border.style.height = settings['height'];
			nav_border.style.borderRadius = settings['radius'];
			nav_border.style.border = settings['border'];
			$(nav_border).appendTo(self);
    	}
    	
    	// hover
    	var _hover = function(){
    		li.hover(
				function(){
					var $t = $(this),
						oW = $t.width(),
						oL = $t.offset().left,
						aW = $t.outerWidth();
					$(nav_border).stop(true).animate({
						left  : oL + (aW - oW - settings['padding'] * 2 - 2) / 2 + 'px',
						width : oW + settings['padding'] * 2 + 'px'
					}, settings['speed'], function(){
						$t.addClass('active').siblings().removeClass('active');
					});
				}, function(){
					$(nav_border).stop(true).animate({
						left  : settings['left'],
						width : settings['width']
					}, settings['speed'], function(){
						ali.addClass('active').siblings().removeClass('active');
					});
				}
			);
    	}
    	
    	// click
    	var _click = function(){
    		li.click(function(){
    			ali = ul.children("li[class='active']");
    			settings['width'] = ali.width() + settings['padding'] * 2 + 'px';
    			settings['left'] = ali.offset().left + (ali.outerWidth() - parseInt(settings['width']) - 2) / 2 + 'px';
    			nav_border.style.width = settings['width'];
    			nav_border.style.left = settings['left'];
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
    	
    	_attachEvent(window, 'resize', function(){
    		settings['left'] = ali.offset().left + (ali.outerWidth() - parseInt(settings['width']) - 2) / 2 + 'px';
    		nav_border.style.left = settings['left'];
    	})
	}		 
})(this, jQuery);