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