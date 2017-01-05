// ==UserScript==
// @name         Highlight Every Code
// @name:zh-CN   代码片段高亮
// @name:zh-TW   程式碼片斷高亮
// @namespace    hoothin
// @version      1.0
// @description  Add a icon to popup a window that allows syntax highlighting and beautify and word count of source code snippets on current page
// @description:zh-CN 选择代码片段后点击图标弹出新窗口显示语法高亮美化与格式化后的代码与字数统计
// @description:zh-TW 選擇程式碼片段後點選圖示彈出新視窗顯示語法高亮美化與格式化後的程式碼與字數統計
// @author       Hoothin
// @grant        GM_openInTab
// @compatible   chrome
// @compatible   firefox
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// @include      *
// ==/UserScript==

(function() {
    'use strict';
    var isChrome=unsafeWindow.chrome;
    var codeIcon=document.createElement("img");
    var codes, selStr, scrollX, scrollY;
    codeIcon.style.cssText="position:fixed;z-index:99999;display:none;cursor: pointer;";
    codeIcon.title="Show this code snippet";
    codeIcon.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYAgMAAACD0OXYAAAACVBMVEX7+/swMDBTU1MLxgsCAAAAJElEQVQI12MIBYEAGLUKBBbAqAUMQICgAoAqoBQ95JaCnASjAAgXMdk3d5HTAAAAAElFTkSuQmCC";
    codeIcon.onmousedown=function(){
        let html='<title>Code Snippet</title>'+
            '<link rel="stylesheet" href="http'+(isChrome?'s':'')+'://cdn.rawgit.com/google/code-prettify/master/styles/sons-of-obsidian.css"/>'+
            '<script>var code,codeStr;window.onload=function(){code=document.querySelector("#code");codeStr=code.innerHTML.replace(/&amp;/g, "&").replace(/&(nbsp;|amp;|#39;|quot;)/g, "&amp;$1");prettyPrint();}</script>'+
            '<script src="http'+(isChrome?'s':'')+'://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js?skin=sons-of-obsidian"></script>'+
            '<script src="http'+(isChrome?'s':'')+'://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.4/beautify.min.js"></script>'+
            '<script src="http'+(isChrome?'s':'')+'://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.4/beautify-html.min.js"></script>'+
            '<script src="http'+(isChrome?'s':'')+'://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.4/beautify-css.min.js"></script>'+
            'Code formatting: <a href="#" onclick="code.innerHTML=js_beautify(codeStr.replace(/&amp;lt;/g, \'&lt;\').replace(/&amp;gt;/g, \'&gt;\'));code.className=\'prettyprint linenums\';prettyPrint();return false;">Javaspcript</a> '+
            '<a href="#" onclick="code.innerHTML=html_beautify(codeStr);code.className=\'prettyprint linenums\';prettyPrint();return false;">Html</a> '+
            '<a href="#" onclick="code.innerHTML=css_beautify(codeStr);code.className=\'prettyprint linenums\';prettyPrint();return false;">Css</a> '+
            '<a href="#" onclick="code.innerHTML=codeStr;code.className=\'prettyprint linenums\';prettyPrint();return false;">Raw</a> <b style="color:red">('+selStr.length+' words)</b>'+
            '<pre id="code" class="prettyprint linenums" style="word-wrap: break-word; white-space: pre-wrap;border: 1px solid rgb(136, 136, 204);border-radius: 8px;">' + codes + "</pre>";
        if(isChrome){
            let c = window.open("", "_blank", "width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=0");
            c.document.write(html);
            c.document.close();
        }else{
            GM_openInTab('data:text/html;charset=utf-8,' + encodeURIComponent(html));
        }
    };
    document.body.appendChild(codeIcon);
    document.addEventListener('mousedown', function(o) {
        codeIcon.style.display="none";
    });
    document.addEventListener('mouseup', function(o) {
        if (o.button === 0 && (o.ctrlKey || o.altKey || o.metaKey || o.shiftKey)) {
            setTimeout(function(){
                selStr=document.getSelection().toString();
                codes=selStr.replace(/&/g, "&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
                if(codes){
                    codeIcon.style.display="block";
                    let pos=getMousePos(o);
                    let left, top;
                    if(isChrome){
                        top=pos.y>document.documentElement.clientHeight-50?(pos.y-25):(pos.y+15);
                        left=pos.x>document.documentElement.clientWidth-50?(pos.x-25):(pos.x+15);
                    }else{
                        top=pos.y-25;
                        left=pos.x+15;
                    }
                    codeIcon.style.top=top+"px";
                    codeIcon.style.left=left+"px";
                }
            },1);
        }
    },false);

    function getMousePos(event) {
        var e = event || window.event;
        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = (e.pageX || e.clientX) - scrollX;
        var y = (e.pageY || e.clientY) - scrollY;
        return { 'x': x, 'y': y };
    }
})();