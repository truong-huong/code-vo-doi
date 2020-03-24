var doc = document ;
var getId = id => doc.getElementById( id );

// Custom Font Size
(function(){
    Array.prototype.forEach.call(doc.querySelectorAll('a[data-size]'), (el) => {
        el.addEventListener('click', function(){
               doc.body.setAttribute('font-size',this.getAttribute('data-size') );
               localStorage.setItem("font-size", this.getAttribute('data-size'));
           })
    });
    Array.prototype.forEach.call(doc.querySelectorAll('span.theme'), (el) => {
        el.addEventListener('click', function(){
               doc.body.setAttribute('theme-color',this.getAttribute('id'));
               localStorage.setItem("theme-color", this.getAttribute('id'));
           })
    });

})();
// Chia sẻ ra ngoài 
var share = (social) => {
    var a = window.location.href ;
    if (social == 'facebook') {
        window.open('https://www.facebook.com/dialog/share?app_id=1148726895462441&href='+a, '_blank');
    }
    if (social == 'twitter') {
        window.open('https://twitter.com/intent/tweet?url='+a, '_blank');
    }
    if (social == 'pinterest') {
        window.open('https://www.pinterest.com/pin/create/button/?url='+a, '_blank');
    }
    if (social == 'linkedin') {
        window.open('https://www.linkedin.com/sharing/share-offsite/?url='+a, '_blank');
    }   
}
//Thiết lập màu nền và kích thước phông chữ
(function(){
    doc.body.setAttribute('font-size',localStorage.getItem("font-size") );
    doc.body.setAttribute('theme-color',localStorage.getItem("theme-color"));
})();
// tạo click ảo 
function clickVirtual(el){
  var evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 20
  });
  el.dispatchEvent(evt);
}