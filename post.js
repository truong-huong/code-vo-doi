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
        getId('codeForm').value =  '[code class="language-'+convertLanguage+'"]'+ 
              a.replace(/\&/gim, '&amp;').replace( /\</gim , '&lt;' ) // Đổi dấu <
                .replace(/\>/gim, '&gt;') // Đổi dấu >
                .replace(/\"/gim,'&quot;') // Đổi dấu "
                .replace(/\'/gim,'&apos;') // Đổi dấu '
                .replace(/\[code(.*?)\]|\[\\code(.*?)\]/gim,function(str){
                  return str.replace(/\[/gim,'&#91;&#91;')
                            .replace(/\]/gim,'&#93;&#93;')
                })
                .replace(/\[/gim,'&#91;') // Đổi dấu [
                .replace(/\]/gim,'&#93;') // Đổi dấu ]
                .replace(/\\/gim,'&#92;') // Đổi dấu \
                .replace(/(\r\n|\n|\r)/gim,'&#10;')
              + '[/code]';
              // Chú ý cả cái đổi [code] nếu tồn tại trong mã nhập vào nhưng có thể bỏ qua vì có ai comment đâu
        // copy to clipboard 
        getId('codeForm').select();
        getId('codeForm').setSelectionRange(0, 99999)
        document.execCommand("copy");
        getId('codeForm').value = 'Đã chuyển đổi và sao chép và bộ nhớ tạm. Paste vào comment để sử dụng';
})})();
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
// Try Catch 
// Load same post
try {
Array.prototype.forEach.call(samePostArray, (el) => {
    var max_results = Math.floor(10/samePostArray.length)
   var request = new XMLHttpRequest();
   var url = '/feeds/posts/summary/-/' + el + '?alt=json&max-results='+max_results;
   var sparent = getId('same-post');
   request.open('GET', url, true);
   request.onload = function() {
       if (request.status >= 200 && request.status < 400) {
           var data = JSON.parse(request.response);
           var feed = data.feed;
           if (feed.entry) {
               var num_post = feed.entry.length;
               for (i = 0; i < num_post; i++) {
                   var href = feed.entry[i].link[feed.entry[i].link.length - 1].href;
                   var title = feed.entry[i].title.$t;
                   var li = doc.createElement('li');
                   li.innerHTML = '<a href="' + href + '">' + title + '</a>';
                   sparent.appendChild(li);
               }
           } else {
               var error = doc.createElement('li');
               error.className = 'notFoundLabel';
               error.innerHTML = '(-.-) Không có bài nào được tìm thấy [<a href="p/label-not-found.html">tìm hiểu thêm</a>]';
               sparent.appendChild(error);
           }
       } else {
           var error = doc.createElement('li');
           error.className = 'notFoundLabel';
           error.innerHTML = '(-.-) Không có bài nào được tìm thấy [<a href="p/label-not-found.html">tìm hiểu thêm</a>]';
           sparent.appendChild(error);
       }
   };
   // Nếu có lỗi xảy ra
   request.onerror = function() { }
   // Send
   request.send();
});
// Kiểm tra comment có code hay những thứ hay ho khác hay không 
(function(){
    Array.prototype.forEach.call(getId('comments').querySelectorAll('.somebody-said'), (el) => {
        var comment = el.innerHTML ;
        var regex = /\[code(.*?)\]/gim;
        el.innerHTML = comment.replace(regex,function(str){
          return str.replace(/\[/gim,'<pre><').replace(/\]/gim,'>')
        }).replace(/\[\/code\]/gim,'</code></pre>')
        /*
          .replace(/\[\[code(.*?)\]\]|\[\[\\code(.*?)\]\]/gim,function(str){
                  return str.replace(/\[\[/gim,'[')
                            .replace(/\]\]/gim,']')
                })*/
          .replace(/\<br\>/gim,'&#10;')
    });
})(); 
// Create table of contents
(function () {
  (function () {
      var toc = "";
      var level = 0;

      document.getElementById("postBody").innerHTML =
          document.getElementById("postBody").innerHTML.replace(
              /<h([\d])>([^<]+)<\/h([\d])>/gi,
              function (str, openLevel, titleText, closeLevel) {
                  if (openLevel != closeLevel) {
                      return str;
                  }

                  if (openLevel > level && level > 0) {
                      toc += (new Array(openLevel - level + 1)).join("<ul>");
                  } else if (openLevel < level) {
                      toc += (new Array(level - openLevel + 1)).join("</ul>");
                  }

                  level = parseInt(openLevel);

                  var anchor = titleText.replace(/ /g, "_");
                  toc += "<li><a href=\"#" + anchor + "\">" + titleText
                      + "</a></li>";

                  return "<h" + openLevel + " id=\"" + anchor.trim() + "\">"
                      + titleText + "</a></h" + closeLevel + ">";
              }
          );

      if (level) {
          toc += (new Array(level + 1)).join("</ul>");
      }

      document.getElementById("toc").innerHTML += toc;
  })();
})();
}catch(e) {}
checkCodeLanguage();
   