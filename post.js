// Hiển thị nhãn
(function(){
        if ( doc.getElementsByTagName("template").length ) {
        var temp = doc.getElementsByTagName("template")[0];
        var clon = temp.content.cloneNode(true);
        var a = doc.createElement("div");
        var b = getId('thanks') ;
        b.insertAdjacentElement('beforebegin', a);
        a.appendChild(clon) }
    })();
// Chọn ngôn ngữ để convert
var convertLanguage ;
(function(){
    Array.prototype.forEach.call(doc.querySelectorAll('a[data-language]'), (el) => {
        el.addEventListener('click', function(){
               convertLanguage = this.getAttribute('data-language');
               clickVirtual(doc.querySelector('label[for=drop-btn-code]'));
               doc.querySelector('label[for=drop-btn-code] a').innerHTML = convertLanguage;
           })
    });
    getId('convert-me').addEventListener('click',function(){
        var a = getId('codeForm').value ;
        
        if ( convertLanguage == undefined ) {
            convertLanguage = 'html';
        }
        //document.getElementById('convertCode').innerText 
        getId('codeForm').value =  '[code class="language-'+convertLanguage+'"]'+a.replace(/\&/gim, '&amp;').replace( /\</gim , '&lt;' ).replace(/\>/gim, '&gt;').replace(/(\r\n|\n|\r)/gim,'&#10;') + '[/code]';
        // copy to clipboard 
        getId('codeForm').select();
        getId('codeForm').setSelectionRange(0, 99999)
        document.execCommand("copy");
        getId('codeForm').value = 'Đã chuyển đổi và sao chép và bộ nhớ tạm. Paste vào comment để sử dụng';
})})();
// Kiểm tra comment có code hay những thứ hay ho khác hay không 
(function(){
    Array.prototype.forEach.call(getId('comments').querySelectorAll('.somebody-said'), (el) => {
        var comment = el.innerHTML ;
        /* Chrome và một số thằng tiên tiến hơn firefox *//*
        regex = /\[code(.*?)\](.*?)\[\/code\]/gims ;
        el.innerHTML = comment.replace(regex ,function(str){
        return '<pre>'+str.replace(/\[/gims,'<').replace(/\]/gims,'>')+'</pre>';
            }).replace(/\<br\>/gim,'&#10;')*/
        /* Cho toàn bộ mẹ kiếp thằng firefox là code dài ra */
        var regex = /\[code(.*?)\]/gim;
        el.innerHTML = comment.replace(regex,function(str){
          return str.replace(/\[/gim,'<').replace(/\]/gim,'>')
        }).replace(/\[\/code\]/gim,'</code>').replace(/\<br\>/gim,'&#10;')
    });
})(); 
// Chuyên dùng để load code làm đẹp 
var expand =(obj)=> {
  var keys = Object.keys(obj);
  for (let i = 0; i < keys.length; ++i) {
      let key = keys[i],
      subkeys = key.split(/,\s?/),
      target = obj[key];
      delete obj[key];
      subkeys.forEach(key => obj[key] = target)
  }
  return obj;
}
var languages_array = expand({
  "html, xml, svg, mathml": "markup",
  "shell": "bash",
  "js,jquery": "javascript",
  "hs": "haskell",
  "py": "python",
  "adoc": "asciidoc",
  "rbnf": "bnf",
  "rb": "ruby",
  "conc": "concurnas",
  "tex, context": "latex",
  "cs, dotnet": "csharp",
  "coffee": "coffeescript",
  "emacs, elisp, emacs-lisp": "lisp",
  "sln": "solution-file",
  "rq": "sparql",
  "md": "markdown",
  "jinja2": "django",
  "dns-zone": "dns-zone-file",
  "dockerfile": "docker",
  "gamemakerlanguage": "gml",
  "px": "pcaxis",
  "objectpascal": "pascal",
  "n4jsd": "n4js",
  "moon": "moonscript",
  "robot": "robotframework",
  "sln": "solution-file",
  "rq": "sparql",
  "ts": "typescript",
  "t4": "t4-cs",
  "vb": "visual-basic",
  "yml": "yaml" });
var codeArray = ['https://cdn.jsdelivr.net/gh/truong-huong/nullshell-js/main.js'];
var checkCodeLanguage=()=> {
  if (doc.querySelectorAll('code[class*=language-]').length) {
    Array.prototype.forEach.call(doc.querySelectorAll('code[class*=language-]'), (el, i) => {
      let language = 'https://cdn.jsdelivr.net/gh/truong-huong/nullshell-js/prism-' + fixLanguages(el.getAttribute('class').trim().replace('language-', '').trim()) + '.min.js';
      if (codeArray.includes(language) == true) {} else {
          codeArray.push(language);
      }
    })
    loadLanguageScript(codeArray)
}}
var loadLanguageScript = (scripts) => {
	var script = scripts.shift();
	var hongtham = doc.createElement('script');
	doc.head.appendChild(hongtham);
	hongtham.onload = () => {
		if (codeArray.length) {
		  loadLanguageScript(codeArray);
		} else {
		  Prism.highlightAll();
		}
	};
	hongtham.src = script;
}
var fixLanguages=(language)=> {
	var language = language;
	if (languages_array[language] != undefined) {
	  language = languages_array[language];
	}
	return language;
}
checkCodeLanguage();
   