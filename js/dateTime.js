/*
	作者：leo
	时间：2017-01-12
	描述：dataTime.js
*/
(function(global, $) {
	'use strict';
    //Make sure jQuery exists
    if (!$) throw new Error('nav requires jQuery to work.');
    
    $.fn.dateTime = function(options) {
    	var self = this,    		
    		defaults = { type: 'dateTime' },
    		settings = $.extend(defaults, options || {});
    		
    	var	weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    		now = new Date(),
			year = now.getFullYear(),
        	month = now.getMonth() + 1,
        	day = now.getDate(),
        	hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
       		minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
        	second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds(),
        	week = weeks[now.getDay()];
    		
    	// 初始化
    	var init = function(){
    		if(settings.type == 'date'){
	    		_getDate();
	    	}else if(settings.type == 'time'){
	    		_getTime();
	    	}else{
	    		_getDateTime();
	    	}
    	}
	    
	    // 更新时间
	    var update = function(){
	    	now = new Date();
			year = now.getFullYear();
        	month = now.getMonth() + 1;
        	day = now.getDate();
        	hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
       		minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        	second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
	    }
    	
    	var _getDate = function(){
    		self.html(year + "年"+ month + "月" + day + "日&nbsp;&nbsp;" + week);
	        setInterval(function(){
	        	update();
	        	self.html(year + "年"+ month + "月" + day + "日&nbsp;&nbsp;" + week);	        	
	        }, 1000);
    	}
    	
    	var _getTime = function(){
    		self.html(hour + ":" + minute + ":" + second);
	        setInterval(function(){
	        	update();
	        	self.html(hour + ":" + minute + ":" + second);	        	
	        }, 1000);
    	}
    	
    	var _getDateTime = function(){
    		self.html(year + "年"+ month + "月" + day + "日&nbsp;&nbsp;" + hour + ":" + minute + ":" + second + '&nbsp;&nbsp;' + week);
	        setInterval(function(){
	        	update();
	        	self.html(year + "年"+ month + "月" + day + "日&nbsp;&nbsp;" + hour + ":" + minute + ":" + second + '&nbsp;&nbsp;' + week);	        	
	        }, 1000);	        
    	}
    	
    	init();
	}    
})(this, jQuery);