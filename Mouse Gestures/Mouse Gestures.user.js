// ==UserScript==
// @name               Greasemonkey Mouse Gestures
// @name:zh-CN         鼠标手势
// @name:zh-TW         滑鼠手勢
// @namespace          hoothin
// @version            0.62
// @description        Just a Mouse Gestures
// @description:zh-CN  就是个鼠标手势
// @description:zh-TW  就是個滑鼠手勢
// @author             hoothin
// @include            *
// @grant              GM_openInTab
// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow
// @license            MIT License
// @compatible        chrome
// @compatible        firefox
// ==/UserScript==

(function() {
    'use strict';
    var lastX, lastY, signs, lastSign, gestures, i18n;
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    const minLength=256,tg=0.5,
          defaultFun={
              close:"unsafeWindow.opener=null;unsafeWindow.open('', '_self', '');unsafeWindow.close();",
              openNew:"GM_openInTab('about:newtab', false)",
              scrollToTop:"unsafeWindow.scrollTo(0, 0)",
              scrollToBottom:"unsafeWindow.scrollTo(0, 1073741824)",
              back:"unsafeWindow.history.back()",
              forward:"unsafeWindow.history.forward()",
              reload:"unsafeWindow.location.reload()"
          };
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
                configure:"鼠标手势设置"
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
                configure:"Mouse Gestures - Configure"
            };
            break;
    }
    gestures=GM_getValue("gestures");
    if(!gestures){
        gestures=[{gesture:"↓→",fun:"close"},
                  {gesture:"→↑",fun:"openNew"},
                  {gesture:"←↑",fun:"scrollToTop"},
                  {gesture:"←↓",fun:"scrollToBottom"},
                  {gesture:"→↑←",fun:"back"},
                  {gesture:"←↑→",fun:"forward"},
                  {gesture:"↑↓",fun:"reload"},
                  {gesture:"↓↑↓",fun:"var t=((unsafeWindow.getSelection&&unsafeWindow.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var e=(document.charset||document.characterSet);if(t!=''){GM_openInTab('http://translate.google.cn/?text='+t+'&hl=zh-CN&langpair=auto|zh-CN&tbb=1&ie='+e,false);}else{GM_openInTab('http://translate.google.cn/translate?u='+encodeURIComponent(location.href)+'&hl=zh-CN&langpair=auto|zh-CN&tbb=1&ie='+e,false);}"},
                  {gesture:"↓↑↓←",fun:'function R(a){var ona = "on"+a; if(unsafeWindow.addEventListener) unsafeWindow.addEventListener(a, function (e) { for(var n=e.originalTarget; n; n=n.parentNode) n[ona]=null; }, true); unsafeWindow[ona]=null; document[ona]=null; if(document.body) document.body[ona]=null; } R("contextmenu"); R("click"); R("mousedown"); R("mouseup"); R("selectstart");'},
                  {gesture:"↓↑↓↑",fun:"var d = document, e = d.getElementById('wappalyzer-container') ; if ( e !== null ) { d.body.removeChild(e); } var u = 'https://wappalyzer.com/bookmarklet/', t = new Date().getTime(), c = d.createElement('div'), p = d.createElement('div'), l = d.createElement('link'), s = d.createElement('script') ; c.setAttribute('id', 'wappalyzer-container'); l.setAttribute('rel', 'stylesheet'); l.setAttribute('href', u + 'css/wappalyzer.css'); d.head.appendChild(l); p.setAttribute('id', 'wappalyzer-pending'); p.setAttribute('style', 'background-image: url(' + u + 'images/pending.gif) !important'); c.appendChild(p); s.setAttribute('src', u + 'js/wappalyzer.js?' + t); s.onload = function() { s = d.createElement('script'); s.setAttribute('src', u + 'js/apps.js?' + t); s.onload = function() { s = d.createElement('script'); s.setAttribute('src', u + 'js/driver.js?' + t); c.appendChild(s); }; c.appendChild(s); }; c.appendChild(s); d.body.appendChild(c);"},
                  {gesture:"↓↑↓→",fun:"GM_openInTab('http://just998.com/xiu/photo'+unsafeWindow.location.search,false)"}
                 ];
        GM_setValue("gestures",gestures);
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
    function initEventListener(start,move,end,clientX,clientY,startBool){
        var isMouse=start=="mousedown";
        var moveFun=function(e){
            tracer(eval(clientX),eval(clientY),isMouse);
            gesturesWords.innerHTML=signs;
            var gesturesWidth=signs.length*51+40;
            gesturesContent.style.width=gesturesWidth+"px";
            gesturesContent.style.marginLeft=-gesturesWidth/2+"px";
        };
        document.addEventListener(start, function(e) {
            if(!startBool || eval(startBool)){
                lastX=eval(clientX);
                lastY=eval(clientY);
                lastSign=signs="";
                document.addEventListener(move, moveFun, false);
            }
        }, false);
        document.addEventListener(end, function(e) {
            document.removeEventListener(move, moveFun, false);
            setTimeout(function(){if(gesturesContent.parentNode)gesturesContent.parentNode.removeChild(gesturesContent);},500);
            if(afterGestures)afterGestures();
            for(var g of gestures){
                var gSign=g.gesture;
                if(signs==gSign){
                    if(!isMouse)document.body.appendChild(gesturesContent);
                    var fun=defaultFun[g.fun];
                    if(!fun){
                        eval(g.fun);
                    }
                    eval(fun);
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                }
            }
        }, false);
    }
    initEventListener("touchstart","touchmove","touchend","e.changedTouches[0].clientX","e.changedTouches[0].clientY");
    initEventListener("mousedown","mousemove","contextmenu","e.clientX","e.clientY","e.which === 3");
    var afterGestures;
    var gesturesContent=document.createElement("div");
    gesturesContent.id="gesturesContent";
    gesturesContent.style.cssText="width:300px;height:70px;position:fixed;left:50%;top:50%;margin-top:-25px;margin-left:-150px;z-index:999999999;background-color:#000;border:1px solid;border-radius:10px;opacity:0.65;filter:alpha(opacity=65);box-shadow:5px 5px 20px 0px #000;";
    gesturesContent.innerHTML='<div id="gesturesWords" style="position:absolute;left:20px;top:5px;font:bold 50px \'黑体\';color:#ffffff"></div>';
    var gesturesWords=gesturesContent.querySelector("#gesturesWords");
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
                    break;
                }
            }
            refreshGestures();
        };
    }
    function goSetting(){
        location.href="https://github.com/hoothin/UserScripts/tree/master/Mouse%20Gestures";
    }
    GM_registerMenuCommand(i18n.configure, goSetting);
})();