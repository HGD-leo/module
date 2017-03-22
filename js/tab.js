/*
	作者：leo
	时间：2017-01-12
	描述：tab.js
	html结构如下：
		<div class="tab-control" id="tab">
			<ul class="tab-head">
				<li class="tab-btn active" data-href="tab1">推荐</li>
				<li class="tab-btn" data-href="tab2">电影</li>
				<li class="tab-btn" data-href="tab3">电视剧</li>
			</ul>
			<div class="tab-body">
				<div class="tab-content active" data-target="tab1">推荐</div>
				<div class="tab-content" data-target="tab2">电影</div>
				<div class="tab-content" data-target="tab3">电视剧</div>
			</div>
		</div>
*/
(function(global, $) {
	'use strict';
    //Make sure jQuery exists
    if (!$) throw new Error('nav requires jQuery to work.');
    
    $.fn.tab = function(options) {
    	var self = this;
		//默认参数
		var defaults = {
			type   : 'display',
			handle : 'click'  
			
		};
		var settings = $.extend(defaults, options || {});
		
		var ul = self.find('ul.tab-head'),
			li = ul.children("li.tab-btn"),
			tc = self.find('div.tab-content');			
			
		var init = function(){ 
			tc.eq(0).css('display', 'block');
			_handle();
		}
		
		// 操作模式
		var _handle = function(){
			li.on(settings['handle'], function(){
				var _this = $(this);
				settings['href'] = _this.attr('data-href');
				_this.addClass('active').siblings('li.tab-btn').removeClass('active');
				_switch();
			})
		}
		
		// 切换模式
		var _switch = function(){
			var target = self.find('div.tab-content[data-target="'+ settings['href'] +'"]'),
				block  = self.find('div.tab-content:visible');
			if (settings['type'] == 'display') {
				block.css('display', 'none');
				target.css('display', 'block')
			}else if (settings['type'] == 'slide') {
				block.stop().slideUp('fast', function(){target.slideDown('slow');});
			}else if (settings['type'] == 'fade') {
				block.stop().fadeOut('fast', function(){target.fadeIn('slow');});				
			}
		}
		
    	init();
	}		 
})(this, jQuery);