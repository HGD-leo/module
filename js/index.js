
$('#nav').nav({border: '2px solid #fff'});
$('#date').dateTime({type: 'date'});
$('#time').dateTime({type: 'time'});

var iframe = document.getElementById('iframe');
function setIframeHeight() {
	var	iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
	if (iframeWin.document.body) {
		setTimeout(function(){
			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
		}, 0)
		
	}
};
iframe.onload = setIframeHeight;
window.onresize = setIframeHeight;

var aNav = $('#nav a[nav-href]');
aNav.click(function(){
	var href = $(this).attr('nav-href');
	$('#iframe').attr('src', href + '.html');
})

