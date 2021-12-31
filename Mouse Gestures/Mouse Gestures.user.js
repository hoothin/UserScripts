// ==UserScript==
// @name               Greasemonkey Mouse Gestures
// @name:zh-CN         油猴鼠标手势
// @name:zh-TW         油猴滑鼠手勢
// @namespace          hoothin
// @version            0.70
// @description        Just a Mouse Gestures script
// @description:zh-CN  就是个鼠标手势脚本
// @description:zh-TW  就是個滑鼠手勢脚本
// @author             hoothin
// @include            *
// @grant              GM_openInTab
// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow
// @grant              GM_info
// @license            MIT License
// @compatible        chrome
// @compatible        firefox
// ==/UserScript==

var lastX,lastY,lastSign,afterGestures,gesturesWords,gesturesContent,gestures,signs;
const defaultFun={
    close:()=>{unsafeWindow.opener=null;unsafeWindow.open('', '_self', '');unsafeWindow.close();},
    openNew:()=>{GM_openInTab('about:newtab', false)},
    scrollToTop:()=>{unsafeWindow.scrollTo(0, 0)},
    scrollToBottom:()=>{unsafeWindow.scrollTo(0, 1073741824)},
    back:()=>{unsafeWindow.history.back()},
    forward:()=>{unsafeWindow.history.forward()},
    reload:()=>{unsafeWindow.location.reload()}
};
function initEventListener(start,move,end,tracer,clientX,clientY,startBool){
    var isMouse=start=="mousedown";
    var moveFun=function(e){
        tracer(clientX(e),clientY(e),isMouse);
        gesturesWords.innerHTML=signs;
        var gesturesWidth=signs.length*51+40;
        gesturesContent.style.width=gesturesWidth+"px";
        gesturesContent.style.marginLeft=-gesturesWidth/2+"px";
    };
    document.addEventListener(start, function(e) {
        if(!startBool || startBool(e)){
            lastX=clientX(e);
            lastY=clientY(e);
            lastSign=signs="";
            document.addEventListener(move, moveFun, false);
        }
    }, false);
    var endFun=function(e) {
        document.removeEventListener(move, moveFun, false);
        setTimeout(function(){if(gesturesContent.parentNode)gesturesContent.parentNode.removeChild(gesturesContent);},500);
        if(signs){
            if(afterGestures)afterGestures();
            for(var g of gestures){
                var gSign=g.gesture;
                if(signs==gSign){
                    if(!isMouse)document.body.appendChild(gesturesContent);
                    var fun=defaultFun[g.fun];
                    if(fun===undefined || !fun){
                        eval(g.fun);
                    }else {
                        fun();
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue=false;
                    e.cancelBubble=true;
                    return false;
                }
            }
            signs="";
        }
    };
    document.addEventListener(end, endFun, false);
    document.addEventListener("mouseup", endFun, false);
}
(function() {
    'use strict';
    var i18n;
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    const minLength=256,tg=0.5;
    switch (lang){
        case "zh-CN":
            i18n={
                close:"关闭页面",
                openNew:"新建标签页",
                scrollToTop:"滚动至最上",
                scrollToBottom:"滚动至最下",
                back:"后退",
                forward:"前进",
                reload:"刷新",
                addListener:"点击监听鼠标手势",
                listening:"正在监听鼠标手势",
                bind:"绑定功能",
                custom:"自定义代码",
                ok:"确定",
                del:"删除",
                saved:"已设定的手势",
                alert1:"请先监听手势",
                alert2:"还没有绑定功能",
                alert3:"请输入自定义代码",
                configure:"鼠标手势设置",
                update:"鼠标手势脚本已更新，是否覆盖脚本设置？"
            };
            break;
        default:
            i18n={
                close:"Close tab",
                openNew:"Open new tab",
                scrollToTop:"Scroll to top",
                scrollToBottom:"Scroll to bottom",
                back:"Back",
                forward:"Forward",
                reload:"Reload",
                addListener:"Click to add gesture listener",
                listening:"Listening",
                bind:"Bind function",
                custom:"Custom code",
                ok:"Ok",
                del:"Delete",
                saved:"Saved gestures",
                alert1:"Please add gesture first",
                alert2:"Nothing bind",
                alert3:"Input custom code please",
                configure:"Mouse Gestures - Configure",
                update:"Greasemonkey Mouse Gestures has updated, recover config?"
            };
            break;
    }
    gestures=GM_getValue("gestures");
    if(GM_info.script.version != GM_getValue("gmMouseGestureVersion")){
        if(!gestures || window.confirm(i18n.update))
            gestures=[{gesture:"↓→",fun:"close"},
                  {gesture:"→↑",fun:"openNew"},
                  {gesture:"←↑",fun:"scrollToTop"},
                  {gesture:"←↓",fun:"scrollToBottom"},
                  {gesture:"→↑←",fun:"back"},
                  {gesture:"←↑→",fun:"forward"},
                  {gesture:"↑↓",fun:"reload"},
                  {gesture:"↓↑↓",fun:"var t=((unsafeWindow.getSelection&&unsafeWindow.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var e=(document.charset||document.characterSet);if(t!=''){GM_openInTab('http://translate.google.cn/?text='+t+'&hl=zh-CN&langpair=auto|zh-CN&tbb=1&ie='+e,false);}else{GM_openInTab('http://translate.google.cn/translate?u='+encodeURIComponent(location.href)+'&hl=zh-CN&langpair=auto|zh-CN&tbb=1&ie='+e,false);}"},
                  {gesture:"↓↑↓←",fun:'var d=document,b=d.body;with(b.onselectstart=b.oncopy=b.onpaste=b.onkeydown=b.oncontextmenu=b.onmousemove=b.ondragstart=d.oncopy=d.onpaste=null,d.onselectstart=d.oncontextmenu=d.onmousedown=d.onkeydown=function(){return!0},d.wrappedJSObject||d)onmouseup=null,onmousedown=null,oncontextmenu=null;for(var a=d.getElementsByTagName("*"),i=a.length-1;i>=0;i--){var o=a[i];with(o.wrappedJSObject||o)onmouseup=null,onmousedown=null}var h=d.getElementsByTagName("head")[0];if(h){var s=d.createElement("style");s.innerHTML="html,*{user-select:text!important;-moz-user-select:text!important;-webkit-user-select:text!important;-webkit-user-drag:text!important;-khtml-user-select:text!important;-khtml-user-drag:text!important;pointer-events:auto!important;}",h.appendChild(s)}unsafeWindow.Event.prototype.preventDefault=function(){};'},
                  {gesture:"↓↑↓↑",fun:"var d = document, e = d.getElementById('wappalyzer-container') ; if ( e !== null ) { d.body.removeChild(e); } var u = 'https://wappalyzer.com/', t = new Date().getTime(), c = d.createElement('div'), p = d.createElement('div'), l = d.createElement('link'), s = d.createElement('script') ; c.setAttribute('id', 'wappalyzer-container'); l.setAttribute('rel', 'stylesheet'); l.setAttribute('href', u + 'css/bookmarklet.css'); d.head.appendChild(l); p.setAttribute('id', 'wappalyzer-pending'); p.setAttribute('style', 'background-image: url(' + u + 'images/spinner.gif) !important'); c.appendChild(p); s.setAttribute('src', u + 'bookmarklet/wappalyzer.js'); s.onload = function() { s = d.createElement('script'); s.setAttribute('src', u + 'bookmarklet/apps.js'); s.onload = function() { s = d.createElement('script'); s.setAttribute('src', u + 'bookmarklet/driver.js'); c.appendChild(s); }; c.appendChild(s); }; c.appendChild(s); d.body.appendChild(c);"}
                 ];
        GM_setValue("gestures",gestures);
        GM_setValue("gmMouseGestureVersion",GM_info.script.version);
    }
    function tracer(curX,curY,showSign) {
        let distanceX=curX-lastX,distanceY=curY-lastY;
        let distance=distanceX*distanceX+distanceY*distanceY;
        if (distance>minLength) {
            lastX=curX;
            lastY=curY;
            let direction="";
            let slope=Math.abs(distanceY/distanceX);
            if(slope>tg){
                if(distanceY>0) {
                    direction="↓";
                }else{
                    direction="↑";
                }
            }else if(slope<=1/tg) {
                if(distanceX>0) {
                    direction="→";
                }else{
                    direction="←";
                }
            }
            if(lastSign!=direction) {
                signs+=direction;
                lastSign=direction;
                if(showSign)document.body.appendChild(gesturesContent);
            }
        }
    }
    gesturesContent=document.createElement("div");
    gesturesContent.id="gesturesContent";
    gesturesContent.style.cssText="width:300px;height:70px;position:fixed;left:50%;top:50%;margin-top:-25px;margin-left:-150px;z-index:999999999;background-color:#000;border:1px solid;border-radius:10px;opacity:0.65;filter:alpha(opacity=65);box-shadow:5px 5px 20px 0px #000;";
    gesturesContent.innerHTML='<div id="gesturesWords" style="position:absolute;left:20px;top:5px;font:bold 50px \'黑体\';color:#ffffff"></div>';
    gesturesWords=gesturesContent.querySelector("#gesturesWords");
    initEventListener("touchstart","touchmove","touchend",tracer,e=>{return e.changedTouches[0].clientX},e=>{return e.changedTouches[0].clientY});
    initEventListener("mousedown","mousemove","contextmenu",tracer,e=>{return e.clientX},e=>{return e.clientY},e=>{return e.which === 3});
    if(location.href=="https://github.com/hoothin/UserScripts/tree/master/Mouse%20Gestures"){
        var entryContent=document.querySelector("article.entry-content"),mobile=false;
        if(!entryContent){
            mobile=true;
            entryContent=document.querySelector(".files-list");
        }
        var configBody=document.createElement("div");
        configBody.id="configBody";
        configBody.style.cssText="opacity:0.65;filter:alpha(opacity=65);box-shadow:5px 5px 20px 0px #000;height:160px";
        configBody.innerHTML='<div id="configContent" style="position:relative;left:20px;top:5px;"></div>';
        var configContent=configBody.querySelector("#configContent");
        var newOrEdit=document.createElement("div");
        configContent.appendChild(newOrEdit);
        var newOrEditSign=document.createElement("div");
        newOrEditSign.innerHTML="";
        newOrEditSign.style.float="left";
        newOrEdit.appendChild(newOrEditSign);
        var newOrEditBtn=document.createElement("input");
        newOrEditBtn.type="button";
        newOrEditBtn.value=i18n.addListener;
        newOrEdit.appendChild(newOrEditBtn);
        var functionArea=document.createElement("p");
        newOrEdit.appendChild(functionArea);
        var functionSelect=document.createElement("select");
        functionSelect.innerHTML="<option>"+i18n.bind+"</option><option value='custom'>"+i18n.custom+"</option>";
        for(var key in defaultFun){
            var optionStr="<option value='"+key+"'>"+i18n[key]+"</option>";
            functionSelect.innerHTML+=optionStr;
        }
        functionArea.appendChild(functionSelect);
        var newOrEditEval=document.createElement("input");
        newOrEditEval.style.width=(mobile?"230":"750")+"px";
        newOrEditEval.style.display="none";
        functionArea.appendChild(newOrEditEval);
        var newOrEditOkBtn=document.createElement("input");
        newOrEditOkBtn.type="button";
        newOrEditOkBtn.value=i18n.ok;
        newOrEdit.appendChild(newOrEditOkBtn);
        var gesturesHas=document.createElement("p");
        newOrEdit.appendChild(gesturesHas);
        var gesturesSelect=document.createElement("select");
        var refreshGestures=function(){
            gesturesSelect.innerHTML="<option>"+i18n.saved+"</option>";
            gestures.forEach(function(item){
                var optionStr="<option value='"+item.gesture+"'>"+item.gesture+"</option>";
                gesturesSelect.innerHTML+=optionStr;
            });
        };
        refreshGestures();
        gesturesHas.appendChild(gesturesSelect);
        var newOrEditDelBtn=document.createElement("input");
        newOrEditDelBtn.type="button";
        newOrEditDelBtn.value=i18n.del;
        gesturesHas.appendChild(newOrEditDelBtn);
        entryContent.insertBefore(configBody,entryContent.firstChild);
        functionSelect.onchange=function(){
            if(functionSelect.options.selectedIndex===0)return;
            var value=functionSelect.options[functionSelect.options.selectedIndex].value;
            newOrEditEval.style.display=(value=="custom"?"initial":"none");
        };
        gesturesSelect.onchange=function(){
            if(gesturesSelect.options.selectedIndex===0)return;
            var value=gesturesSelect.options[gesturesSelect.options.selectedIndex].value;
            newOrEditSign.innerHTML=value;
            gestures.every(function(item){
                if(item.gesture==value){
                    functionSelect.options[1].selected = true;
                    for (var i=2;i<functionSelect.options.length;i++) {
                        if (functionSelect.options[i].value == item.fun) {
                            functionSelect.options[i].selected = true;
                            break;
                        }
                    }
                    functionSelect.onchange();
                    newOrEditEval.value=item.fun;
                    return false;
                }
                return true;
            });
        };
        newOrEditBtn.onclick=function(e){
            newOrEditBtn.value=i18n.listening;
            newOrEditBtn.setAttribute("disabled","disabled");
            afterGestures=function(){
                newOrEditBtn.removeAttribute("disabled");
                afterGestures=null;
                newOrEditSign.innerHTML=signs;
                newOrEditBtn.value=i18n.addListener;
            };
        };
        newOrEditOkBtn.onclick=function(e){
            if(!newOrEditSign.innerHTML){
                alert(i18n.alert1);
            }else if(functionSelect.options.selectedIndex===0){
                alert(i18n.alert2);
            }else {
                var op=functionSelect.options;
                var selIndex=op.selectedIndex;
                if(selIndex===1 && !newOrEditEval.value){
                    alert(i18n.alert3);
                }else{
                    var code=op[selIndex].value;
                    if(selIndex===1){
                        code=newOrEditEval.value;
                    }
                    for(var index in gestures){
                        if(gestures[index].gesture==newOrEditSign.innerHTML){
                            gestures.splice(index,1);
                            break;
                        }
                    }
                    gestures.push({gesture:newOrEditSign.innerHTML,fun:code});
                    GM_setValue("gestures",gestures);
                    refreshGestures();
                }
            }
        };
        newOrEditDelBtn.onclick=function(e){
            var value=gesturesSelect.options[gesturesSelect.options.selectedIndex].value;
            for(var index in gestures){
                if(gestures[index].gesture==value){
                    gestures.splice(index,1);
                    GM_setValue("gestures",gestures);
                    break;
                }
            }
            refreshGestures();
        };
    }
    function goSetting(){
        GM_openInTab("https://github.com/hoothin/UserScripts/tree/master/Mouse%20Gestures", false);
    }
    GM_registerMenuCommand(i18n.configure, goSetting);
})();