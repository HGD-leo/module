/*
	作者：leo
	时间：2017-03-20
	描述：popup.js
*/
var setStyle = function(obj,json){
    for(var i in json){
        obj.style[i] = json[i];
    }
}

var _clone = function(oldObj) {
	if (typeof(oldObj) != 'object' || oldObj == null) return oldObj; 
	var newObj = new Object();  
	for (var i in oldObj){  
		newObj[i] = _clone(oldObj[i]);  
	}
	return newObj;  
};  

var _extend = function() {  
	var args = arguments;  
	if (args.length < 2) return;  
	var temp = _clone(args[0]);
	for (var n = 1; n < args.length; n++) {  
		for (var i in args[n]) {  
			temp[i] = args[n][i];  
		}  
	}  
	return temp;  
}   

var Drag = function(id){
    var _this = this;    
    this.disX = 0;
    this.disY = 0;
    this.speed = 0;
    this.ratX = 0;
    this.ratY = 0;
    this.time = 0;
    this.iTime = null;
    this.oDiv = document.getElementById(id);
    this.divL = this.oDiv.offsetLeft;
    this.divT = this.oDiv.offsetTop;
    this.oDiv.onmousedown = function(){
    	_this.fnDown();
    }
}

Drag.prototype = {
	fnDown : function(ev){
	    var _this  = this;
	    var oEvent = ev || event;
	    clearInterval(this.iTime);
	    this.time = +new Date();
	    this.disX  = oEvent.clientX - this.oDiv.offsetLeft;
	    this.disY  = oEvent.clientY - this.oDiv.offsetTop;
	    document.onmousemove = function(){
	    	_this.fnMove();
	    }
	    document.onmouseup = function(){
	    	_this.fnUp();
	    }
	},
	
	fnMove : function (ev){
	    var oEvent = ev || event,
	    	l = oEvent.clientX - this.disX,
	    	r = document.documentElement.clientWidth - this.oDiv.offsetWidth / 2,
	    	t = oEvent.clientY - this.disY,
	    	b = document.documentElement.clientHeight - this.oDiv.offsetHeight / 2;
    	l = l <= this.oDiv.offsetWidth / 2 ? this.oDiv.offsetWidth / 2 : l;
    	l = l >= r ? r : l;
    	t = t <= this.oDiv.offsetHeight / 2 ? this.oDiv.offsetHeight / 2 : t;
    	t = t >= b ? b : t;
	    this.oDiv.style.left = l + 'px';
	    this.oDiv.style.top = t + 'px';
	},
	
	fnUp : function(){
		var _this = this;
		var now = +new Date();
		this.time = now - this.time;
		var distanceX = this.oDiv.offsetLeft - this.divL,
	        distanceY = this.oDiv.offsetTop - this.divT,
	    	distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
	    this.speed = distance / this.time * 16;
		this.ratX = distanceX / distance;
		this.ratY = distanceY / distance;
		_this.inertia();
		document.onmousemove = null;
    	document.onmouseup = null;
	},
	
	inertia : function(){
		var reverseX = 1, 
		    reverseY = 1;
		this.iTime = setInterval(function(){
			this.speed *= 0.9;
			var	l = this.oDiv.offsetLeft + reverseX * this.speed * this.ratX,
		    	r = document.documentElement.clientWidth - this.oDiv.offsetWidth / 2,
		    	t = this.oDiv.offsetTop + reverseY * this.speed * this.ratY,
		    	b = document.documentElement.clientHeight - this.oDiv.offsetHeight / 2;
			if (l <= this.oDiv.offsetWidth / 2) {
		    	reverseX *= - 1;
		    	l = this.oDiv.offsetWidth / 2;
		    }else if (l >= r) {
		    	reverseX *= - 1;
		    	l = r;
		    }
		    if (t <= this.oDiv.offsetHeight / 2) {
		    	reverseY *= - 1;
		    	t = this.oDiv.offsetHeight / 2;
		    }else if (t >= b) {
		    	reverseY *= - 1;
		    	t = b;
		    }
		    this.oDiv.style.left = l + 'px';
		    this.oDiv.style.top = t + 'px';
			if (this.speed < 1){
				this.divL = this.oDiv.offsetLeft;
				this.divT = this.oDiv.offsetTop;
				clearInterval(this.iTime);
			}
		}.bind(this), 16);
	}
}

var Popup = function(options){
	var defaults = {
		'width'  : '400px',
		'title'  : '提示',
		'content': '内容不见了！',
		'btn'    : null,
		'yes'    : null,
		'no'     : null
	};
	var settings = _extend(defaults, options || {});
	this.width   = settings.width;
	this.height  = settings.height;
	this.title   = settings.title;
	this.content = settings.content;
	this.btn     = settings.btn;
	this.yes     = settings.yes;
	this.no      = settings.no;
	this.init();
}

Popup.prototype = {
	init : function(){
		this._create();
		var popupClose = document.getElementsByName('popup-close');
		for (var i = 0; i < popupClose.length; i++) {
			popupClose[i].onclick = this._close;
		};
		var callBack = document.getElementsByName('call-back');
		if (this.yes) {
			callBack[0].onclick = function(){
				this._close();
				this.yes();
			}.bind(this);
			if (this.no) {
				callBack[1].onclick = function(){
					this._close();
					this.no();
				}.bind(this);
			}
		} else if (this.no) {
			callBack[0].onclick = function(){
				this._close();
				this.no();
			}.bind(this);
		}				
		new Drag('popupDialog');
	},
	
	_create : function(){
		var bg = document.createElement("div"),
			dialog = document.createElement("div"),
			dialogBtn = '';
		bg.id = 'popupBg';
		bg.setAttribute('name', 'popup-close')
		dialog.id = 'popupDialog';
		setStyle(bg, {'width': '100%','height': '100%','position': 'fixed','top': '0','left': '0','z-index': '10000','background-color': 'rgba(0,0,0,.3)'})
		setStyle(dialog, {'width': this.width,'position': 'absolute','top': '50%','left': '50%','transform': 'translate(-50%, -50%)','border-radius': '3px','box-shadow': '1px 1px 50px rgba(0,0,0,.3)','overflow': 'hidden','cursor': 'move','z-index': '10001'})
		dialog.innerHTML  = '<div class="dialog-title">'+ this.title +'<i class="dialog-icon" name="popup-close"></i></div>';
		dialog.innerHTML += '<div class="dialog-content">'+ this.content +'</div>';			
		if (this.btn) {
			while (this.btn.length > 2) {
				this.btn.pop();
			}
			dialogBtn += '<div class="dialog-btn">';
			for (var i = 0; i < this.btn.length; i++) {
				dialogBtn += '<button name="call-back">'+ this.btn[i] +'</button>';
			}
			dialogBtn += '</div>';
		}
		dialog.innerHTML += dialogBtn;
		document.body.appendChild(bg);
		document.body.appendChild(dialog);
	},
	
	_close : function(){
		var popupBg = document.getElementById('popupBg'),
			popupDialog = document.getElementById('popupDialog');
		popupBg.parentNode.removeChild(popupBg);
		popupDialog.parentNode.removeChild(popupDialog);		
	},
	
	
}
