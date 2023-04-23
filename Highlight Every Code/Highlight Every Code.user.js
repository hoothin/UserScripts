// ==UserScript==
// @name         Highlight Every Code
// @name:zh-CN   代码片段高亮
// @name:zh-TW   程式碼片斷高亮
// @namespace    hoothin
// @version      2.2.3.1
// @description  Add a icon to popup a window that allows syntax highlighting and beautify and word count of source code snippets on current page
// @description:zh-CN 选择代码片段后点击图标弹出新窗口显示语法高亮美化与格式化后的代码与字数统计
// @description:zh-TW 選擇程式碼片段後點選圖示彈出新視窗顯示語法高亮美化與格式化後的程式碼與字數統計
// @author       Hoothin
// @grant        GM_registerMenuCommand
// @grant        GM.registerMenuCommand
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_getValue
// @grant        GM.getValue
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
    var codes, selStr, scrollX, scrollY, customInput=false,altKey=true,ctrlKey=true,shiftKey=true,metaKey=true,hiding=false;
    var _unsafeWindow=(typeof unsafeWindow=='undefined'? window : unsafeWindow);
    codeIcon.className="codeIcon";
    codeIcon.style.opacity=0;
    codeIcon.title="Show this code snippet";
    codeIcon.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYAgMAAACD0OXYAAAACVBMVEX7+/swMDBTU1MLxgsCAAAAJElEQVQI12MIBYEAGLUKBBbAqAUMQICgAoAqoBQ95JaCnASjAAgXMdk3d5HTAAAAAElFTkSuQmCC";
    codeIcon.onmousedown=highlight;
    var style = document.createElement('style');
    style.textContent = `
    .codeIcon{
     position:fixed;
     z-index:99999;
     cursor:pointer;
     transition:opacity 0.3s ease-in-out 0s;
     opacity:0.3;
     border:5px solid rgba(0, 0, 0, 0.2);
     border-radius:10px;
     max-width:30px;
     max-height:30px;
     overflow:hidden;
    }
    .codeIcon:hover{
     opacity:0.9;
    }
    `;
    style.type = 'text/css';
    document.head.appendChild(style);

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
        if(hiding)return;
        var target=o.target,hasCode=false;
        while(target && target.nodeName!="BODY"){
            if(target.nodeName=="PRE" || target.nodeName=="CODE"){
                hasCode=true;
                break;
            }
            target=target.parentNode;
        }
        if(!hasCode)return;
        if(target.offsetWidth && target.offsetWidth<110)return;
        selStr=target.innerText;
        if(!selStr)return;
        codes=selStr.replace(/&/g, "&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
        document.body.appendChild(codeIcon);
        let pos=getMousePos(o);
        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let top=target.offsetTop-scrollY;
        let left=target.offsetLeft-scrollX;
        codeIcon.style.opacity="";
        codeIcon.style.top=top+"px";
        codeIcon.style.left=left+"px";
    });
    document.addEventListener('mousedown', function(o) {
        hiding=true;
        setTimeout(()=>{hiding=false},1000);
        hideIcon();
    });
    document.addEventListener('mouseup', function(o) {
        if (o.button === 0 && ((!ctrlKey && !altKey && !metaKey && !shiftKey) || (ctrlKey && o.ctrlKey) || (altKey && o.altKey) || (metaKey && o.metaKey) || (shiftKey && o.shiftKey))) {
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
                codeIcon.style.opacity="";
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
            '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.css"/>'+
            '<script>var code,codeStr;window.onload=function(){code=document.querySelector("#code");codeStr=code.innerHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&(nbsp;|amp;|#39;|quot;)/g, "&amp;$1");prettyPrint();'+
            'document.querySelector("#js").onclick=function(){'+
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
            'Code formatting: <a id="js" href="#">Javaspcript</a> '+
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

    var _GM_registerMenuCommand;
    if(typeof GM_registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM_registerMenuCommand;
    }else if(typeof GM!='undefined' && typeof GM.registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM.registerMenuCommand;
    }
    if(typeof _GM_registerMenuCommand=='undefined')_GM_registerMenuCommand=(s,f)=>{};
    var storage={
        supportGM: typeof GM_getValue=='function' && typeof GM_getValue('a','b')!='undefined',
        supportGMPromise: typeof GM!='undefined' && typeof GM.getValue=='function' && typeof GM.getValue('a','b')!='undefined',
        mxAppStorage:(function(){
            try{
                return window.external.mxGetRuntime().storage;
            }catch(e){
            };
        })(),
        operaUJSStorage:(function(){
            try{
                return window.opera.scriptStorage;
            }catch(e){
            };
        })(),
        setItem:function(key,value){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,value);
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,value);
            }else if(this.supportGM){
                GM_setValue(key,value);
            }else if(this.supportGMPromise){
                GM.setValue(key,value);
            }else if(window.localStorage){
                window.localStorage.setItem(key,value);
            };
        },
        getItem:function(key,cb){
            var value;
            if(this.operaUJSStorage){
                value=this.operaUJSStorage.getItem(key);
            }else if(this.mxAppStorage){
                value=this.mxAppStorage.getConfig(key);
            }else if(this.supportGM){
                value=GM_getValue(key);
            }else if(this.supportGMPromise){
                value=GM.getValue(key).then(v=>{cb(v)});
                return;
            }else if(window.localStorage){
                value=window.localStorage.getItem(key);
            };
            cb(value);
        },
    };
    storage.getItem("keyConfig",v=>{
        if(v){
            var keys=v.split("");
            altKey=keys[0]!="0";
            ctrlKey=keys[1]!="0";
            shiftKey=keys[2]!="0";
            metaKey=keys[3]!="0";
        }
        if(/greasyfork\.org\/.*\/scripts\/24150[^\/]*$/.test(location.href)){
            var saveConfig=()=>{
                var conStr="";
                conStr+=altKey?"1":"0";
                conStr+=ctrlKey?"1":"0";
                conStr+=shiftKey?"1":"0";
                conStr+=metaKey?"1":"0";
                storage.setItem("keyConfig",conStr);
            };
            var keyEles=document.querySelectorAll("h1>em>code");
            keyEles[0].style.userSelect="none";
            keyEles[1].style.userSelect="none";
            keyEles[2].style.userSelect="none";
            keyEles[3].style.userSelect="none";
            keyEles[0].style.opacity=altKey?"":"0.3";
            keyEles[1].style.opacity=ctrlKey?"":"0.3";
            keyEles[2].style.opacity=shiftKey?"":"0.3";
            keyEles[3].style.opacity=metaKey?"":"0.3";

            keyEles[0].onclick=e=>{
                altKey=!altKey;
                keyEles[0].style.opacity=altKey?"":"0.3";
                saveConfig();
            };
            keyEles[1].onclick=e=>{
                ctrlKey=!ctrlKey;
                keyEles[1].style.opacity=ctrlKey?"":"0.3";
                saveConfig();
            };
            keyEles[2].onclick=e=>{
                shiftKey=!shiftKey;
                keyEles[2].style.opacity=shiftKey?"":"0.3";
                saveConfig();
            };
            keyEles[3].onclick=e=>{
                metaKey=!metaKey;
                keyEles[3].style.opacity=metaKey?"":"0.3";
                saveConfig();
            };
        }
    });

    _GM_registerMenuCommand("Custom input to highlight", ()=>{
        selStr=document.getSelection().toString();
        codes=selStr.replace(/&/g, "&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
        if(!codes){
            customInput=true;
        }
        highlight();
    });
})();