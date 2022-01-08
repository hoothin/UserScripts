// ==UserScript==
// @name         Highlight Every Code
// @name:zh-CN   代码片段高亮
// @name:zh-TW   程式碼片斷高亮
// @namespace    hoothin
// @version      2.0.1
// @description  Add a icon to popup a window that allows syntax highlighting and beautify and word count of source code snippets on current page
// @description:zh-CN 选择代码片段后点击图标弹出新窗口显示语法高亮美化与格式化后的代码与字数统计
// @description:zh-TW 選擇程式碼片段後點選圖示彈出新視窗顯示語法高亮美化與格式化後的程式碼與字數統計
// @author       Hoothin
// @grant        GM_registerMenuCommand
// @grant        GM.registerMenuCommand
// @grant        unsafeWindow
// @compatible   chrome
// @compatible   firefox
// @license      MIT License
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// @include      *
// ==/UserScript==

(function() {
    'use strict';
    var codeIcon=document.createElement("img");
    var codes, selStr, scrollX, scrollY, customInput=false;
    var _unsafeWindow=(typeof unsafeWindow=='undefined'? window : unsafeWindow);
    codeIcon.style.cssText="position:fixed;z-index:99999;cursor:pointer;transition:opacity 0.5s ease-in-out 0s;opacity:0;border:5px solid rgba(0, 0, 0, 0.2);border-radius:10px;";
    codeIcon.title="Show this code snippet";
    codeIcon.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYAgMAAACD0OXYAAAACVBMVEX7+/swMDBTU1MLxgsCAAAAJElEQVQI12MIBYEAGLUKBBbAqAUMQICgAoAqoBQ95JaCnASjAAgXMdk3d5HTAAAAAElFTkSuQmCC";
    codeIcon.onmousedown=highlight;

    document.addEventListener('DOMMouseScroll', function(o) {
        hideIcon();
    });
    document.addEventListener('wheel', function(o) {
        hideIcon();
    });
    document.addEventListener('mousewheel', function(o) {
        hideIcon();
    });
    document.addEventListener('mouseover', function(o) {
        if(o.target.nodeName!="PRE" && o.target.nodeName!="CODE")return;
        if(o.target.offsetWidth && o.target.offsetWidth<100)return;
        selStr=o.target.innerText;
        if(!selStr)return;
        codes=selStr.replace(/&/g, "&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
        document.body.appendChild(codeIcon);
        let pos=getMousePos(o);
        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let top=o.target.offsetTop-scrollY;
        let left=o.target.offsetLeft-scrollX;
        codeIcon.style.opacity=0.9;
        codeIcon.style.top=top+"px";
        codeIcon.style.left=left+"px";
    });
    document.addEventListener('mousedown', function(o) {
        hideIcon();
    });
    document.addEventListener('mouseup', function(o) {
        if (o.button === 0 && (o.ctrlKey || o.altKey || o.metaKey || o.shiftKey)) {
            //var customInputKey=(o.ctrlKey && o.shiftKey);
            setTimeout(function(){
                selStr=document.getSelection().toString();
                codes=selStr.replace(/&/g, "&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
                if(!codes){
                    return;
                }
                document.body.appendChild(codeIcon);
                let pos=getMousePos(o);
                let clientH=(document.documentElement && document.documentElement.clientHeight) || 0;
                let clientW=(document.documentElement && document.documentElement.clientWidth) || 0;
                let top=pos.y>clientH-50?(pos.y-30):(pos.y+20);
                let left=pos.x>clientW-50?(pos.x-30):(pos.x+20);
                codeIcon.style.opacity=0.9;
                codeIcon.style.top=top+"px";
                codeIcon.style.left=left+"px";
            },1);
        }
    },false);

    function highlight(){
        if(customInput){
            selStr=prompt("Input code here","");
            if(!selStr)return;
            codes=selStr.replace(/&/g, "&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
        }
        let html='<title>Code Snippet</title>'+
            '<link rel="stylesheet" href="https://cdn.rawgit.com/google/code-prettify/master/styles/sons-of-obsidian.css"/>'+
            '<script>var code,codeStr;window.onload=function(){code=document.querySelector("#code");codeStr=code.innerHTML.replace(/&amp;/g, "&").replace(/&(nbsp;|amp;|#39;|quot;)/g, "&amp;$1");prettyPrint();'+
            'document.querySelector("body>a:nth-child(1)").onclick=function(){'+
            'code.innerHTML=js_beautify('+
            'codeStr.replace(/&gt;/g, \'>\').replace(/&lt;/g, \'<\').replace(/\'(\\\\\'|[^\'])*?\'/g, function(word){'+
            'return word.replace(/>/g, \'&gt;\').replace(/</g, \'&lt;\');}'+
            ').replace(/\"(\\\\\"|[^\"])*?\"/g, function(word){'+
            'return word.replace(/>/g, \'&gt;\').replace(/</g, \'&lt;\');}'+
            '));code.className=\'prettyprint linenums\';prettyPrint();return false;'+
            '};}</script>'+
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js?skin=sons-of-obsidian"></script>'+
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.4/beautify.min.js"></script>'+
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.4/beautify-html.min.js"></script>'+
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.4/beautify-css.min.js"></script>'+
            'Code formatting: <a href="#">Javaspcript</a> '+
            '<a href="#" onclick="code.innerHTML=html_beautify(codeStr);code.className=\'prettyprint linenums\';prettyPrint();return false;">Html</a> '+
            '<a href="#" onclick="code.innerHTML=css_beautify(codeStr);code.className=\'prettyprint linenums\';prettyPrint();return false;">Css</a> '+
            '<a href="#" onclick="code.innerHTML=codeStr;code.className=\'prettyprint linenums\';prettyPrint();return false;">Raw</a> <b style="color:red">('+selStr.replace(/\s/g,"").length+' words)</b>'+
            '<pre id="code" class="prettyprint linenums" style="word-wrap: break-word; white-space: pre-wrap;border: 1px solid rgb(136, 136, 204);border-radius: 8px;">' + codes + "</pre>";

        let c = _unsafeWindow.open("", "_blank", "width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=0");
        c.document.write(html);
        c.document.close();
    }
    function hideIcon(){
        codeIcon.style.opacity=0;
        customInput=false;
        if(codeIcon.parentNode)codeIcon.parentNode.removeChild(codeIcon);
    }
    function getMousePos(event) {
        var e = event || window.event;
        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = (e.pageX || e.clientX) - scrollX;
        var y = (e.pageY || e.clientY) - scrollY;
        return { 'x': x, 'y': y };
    }
    var _GM_registerMenuCommand=GM_registerMenuCommand||(typeof GM!='undefined' && GM.registerMenuCommand);
    if(!_GM_registerMenuCommand)_GM_registerMenuCommand=(s,f)=>{};
    _GM_registerMenuCommand("Highlight", ()=>{
        selStr=document.getSelection().toString();
        codes=selStr.replace(/&/g, "&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
        if(!codes){
            customInput=true;
        }
        highlight();
    });
})();