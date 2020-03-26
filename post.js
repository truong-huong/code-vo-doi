document.addEventListener("DOMContentLoaded", function() {
// cái này dành cho bài viết và trang tĩnh 
document.getElementById('cancel-comment').addEventListener('click', function() {
    document.getElementById("comment-form-reply").style.display = 'none';
});
Array.prototype.forEach.call(document.querySelectorAll('[data-click=reply]'), function(el) {
    el.addEventListener("click", function(t) {
        t.preventDefault(),
            document.getElemetnById("comment-editor")[0].src = el.getAttribute("data-href"),
            el.parent.parent.nextElementSibling.appendChild(document.getElementById("comment-form-reply")[0].style.display = 'block')
    })
});
document.addEventListener('scroll', function() {
    if (check(document.querySelector('iframe[data-comment]'))) {
        document.getElementById('enter-comment-form').src = document.querySelector('iframe[data-comment]').getAttribute("data-comment");
        document.querySelector('iframe[data-comment]').removeAttribute('data-comment');
    };
    Array.prototype.forEach.call(document.querySelectorAll('img[data-image]'), function(el) {
        if (check(el)) {
            el.setAttribute('src', el.getAttribute('data-image'));
            el.removeAttribute('data-image');
        }
    });
})});