// ==UserScript==
// @name         百Bing图
// @name:en      BingBgForBaidu
// @namespace    hoothin
// @version      1.2
// @description     把百度首页背景图换成Bing的
// @description:en  Just change the background image of baidu.com to bing.com
// @author       hoothin
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @connect      global.bing.com
// @include      *://www.baidu.com/
// @include      *://www.baidu.com/home*
// @include      *://www.baidu.com/?tn=*
// @include      *://www.baidu.com/index.php*
// ==/UserScript==

(function() {
    'use strict';
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var head=document.querySelector("#head");
    if(GM_getValue("baiBing")===undefined){
        GM_setValue("baiBing",true);
        GM_setValue("baiBingWhiteLogo",true);
    }
    if(GM_getValue("baiBing")){
        setBingBg();
    }
    var setObserver = new MutationObserver(function(records){
        var definedBtn=document.querySelector(".defined-btn-no");
        var check=document.querySelector("#bingCheck");
        if(definedBtn && !check){
            var label=document.createElement("label");
            label.setAttribute("style","float:left;margin-top:25px;margin-left:10px;");
            label.innerHTML="<input id='bingCheck' type='checkbox'>Bing图";
            label.classList.add("recommend");
            definedBtn.after(label);
            check=document.querySelector("#bingCheck");
            document.querySelector(".defined-btn-yes").addEventListener("click", function(){
                if(check.checked){
                    if(!GM_getValue("baiBing"))setBingBg();
                }else{
                    if(GM_getValue("baiBing"))location.reload();
                }
                GM_setValue("baiBing",check.checked);
                GM_setValue("baiBingWhiteLogo",document.querySelector("#s_skin_exhibition_options").classList.contains("white"));
            });
            check.checked=!!GM_getValue("baiBing");
        }
    });
    var option = {
        'childList': true
    };
    setObserver.observe(head, option);

    function setBingBg(){
        var ctnerContents=document.querySelector("#s_ctner_contents");
        var menuContainer=document.querySelector(".s-menu-container");
        if(!head.classList.contains("s-skin-hasbg")){
            head.classList.add("s-skin-hasbg");
            GM_addStyle(".s-mod-weather .unknown-text, .unknown-city, .city-wather a, .city-wather em, .city-wather span, .show-pollution a, .show-pollution em, .show-pollution span, .s-upfunc-menus .s-icons a {color: #fff!important;}");
            GM_addStyle(".s-skin-hasbg .s-top-wrap {border: none;background: none;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(15,25,50,.3)),to(rgba(15,25,50,.3)));background-image: -moz-linear-gradient(rgba(15,25,50,.3) 0,rgba(15,25,50,.3) 100%);background-image: -ms-linear-gradient(rgba(15,25,50,.3) 0,rgba(15,25,50,.3) 100%);background-image: -o-linear-gradient(rgba(15,25,50,.3) 0,rgba(15,25,50,.3) 100%);background-image: linear-gradient(rgba(15,25,50,.3) 0,rgba(15,25,50,.3) 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#330f1932,endColorstr=#330f1932);}");
            GM_addStyle(".s-opacity-50 .s-ctner-menus .s-menu-item:hover {color: #333 !important;background-color: transparent !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(240,240,240,.2)),to(rgba(240,240,240,.2))) !important;background-image: -moz-linear-gradient(rgba(240,240,240,.2) 0,rgba(240,240,240,.2) 100%) !important;background-image: -ms-linear-gradient(rgba(240,240,240,.2) 0,rgba(240,240,240,.2) 100%) !important;background-image: -o-linear-gradient(rgba(240,240,240,.2) 0,rgba(240,240,240,.2) 100%) !important;background-image: linear-gradient(rgba(240,240,240,.2) 0,rgba(240,240,240,.2) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#33f0f0f0,endColorstr=#33f0f0f0) !important;}");
            if(ctnerContents)ctnerContents.setAttribute("style", "background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.5)),to(rgba(255,255,255,0.5))) !important;background-image: -moz-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FFFFFFF,endColorstr=#7FFFFFFF) !important;");
            if(menuContainer)menuContainer.setAttribute("style", "background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.5)),to(rgba(255,255,255,0.5))) !important;background-image: -moz-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FFFFFFF,endColorstr=#7FFFFFFF) !important;");
        }
        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://global.bing.com/HPImageArchive.aspx?format=js&idx=0&pid=hp&video=1&n=1",
            onload: function(result) {
                var jsonData = null;
                try {
                    jsonData = JSON.parse(result.responseText);
                    var bgUrl=jsonData.images[0].url;
                    if(!/^https?:\/\//.test(bgUrl)){
                        bgUrl="http://global.bing.com"+bgUrl;
                    }
                    bgUrl="url(\""+bgUrl+"\")";
                    var skinContainer=document.querySelector(".s-skin-container");
                    if(!skinContainer){
                        return;
                    }
                    var bingBgLink=document.createElement("a");
                    bingBgLink.title="Bing图";
                    bingBgLink.href=jsonData.images[0].url;
                    bingBgLink.innerHTML="<span class='title'>Bing图</span>";
                    document.querySelector("#s_icons").appendChild(bingBgLink);
                    if(skinContainer.style.backgroundImage != bgUrl){
                        skinContainer.style.backgroundImage = bgUrl;
                    }
                    var observer = new MutationObserver(function(records){
                        if(skinContainer.style.backgroundImage != bgUrl){
                            skinContainer.style.backgroundImage = bgUrl;
                        }
                    });
                    var option = {
                        'attributes': true
                    };
                    observer.observe(skinContainer, option);
                    if(GM_getValue("baiBingWhiteLogo")){
                        var logo=document.querySelector("#s_lg_img");
                        logo.src=logo.src.replace(/\/[^\/]+$/,"/logo_white.png");
                    }
                }catch (e) {
                    console.log(e);
                }
            }
        });
    }
})();