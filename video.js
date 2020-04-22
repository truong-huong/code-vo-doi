var _video_iframe = document.querySelectorAll('.b-hbp-video');
var _video_ratio;

function checkVideoRatio() {
 	Array.prototype.forEach.call(_video_iframe, (el) => {
	    var _videoHeight = parseInt(el.height,10);
	   	var _videoWidth = parseInt(el.width,10);
	   	var _oldVideoWidth = parseInt(el.getAttribute('data-width').replace('px',''),10);
	   	var _oldVideoHeight = parseInt(el.getAttribute('data-height').replace('px',''),10);
	   	var _video_windowWidth = window.outerWidth;
	   	if (_video_windowWidth < _oldVideoWidth) {
	   		el.width = _video_windowWidth+'px';
	   		el.height = _videoWidth / _video_ratio ;
	   	} 
	   	if ( _video_windowWidth >= _oldVideoWidth){
	   		el.width = _oldVideoWidth+'px';
	   		el.height = _oldVideoHeight+'px';
	   	}
	});
}
if (_video_iframe) {
Array.prototype.forEach.call(_video_iframe, (el) => {
   	el.setAttribute('data-height',parseInt(el.height,10));
   	el.setAttribute('data-width',parseInt(el.width,10));
   	_video_ratio = parseInt(el.width,10)/parseInt(el.height,10);
   	el.addEventListener('load',function(){
   		el.onload = checkVideoRatio();
   	})
   	el.onload = checkVideoRatio(); 
   		
   	
  });
window.addEventListener('resize',function(){
	 checkVideoRatio();
});
}