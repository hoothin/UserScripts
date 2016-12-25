// ==UserScript==
// @name         百Bing图
// @name:en      BingBgForBaidu
// @namespace    hoothin
// @version      1.5
// @description     把百度首页背景图换成Bing的
// @description:en  Just change the background image of baidu.com to bing.com
// @author       hoothin
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @connect      global.bing.com
// @run-at       document-body
// @include      *://www.baidu.com/
// @include      *://www.baidu.com/home*
// @include      *://www.baidu.com/?tn=*
// @include      *://www.baidu.com/index.php*
// ==/UserScript==

(function() {
    'use strict';
    var ctnerContents=document.querySelector("#s_ctner_contents");
    var menuContainer=document.querySelector(".s-menu-container");
    var head=document.querySelector("#head");
    if(!head.classList.contains("s-skin-hasbg")){
        head.classList.add("s-skin-hasbg");
        head.classList.add("s-opacity-50");
        GM_addStyle(".s-opacity-50 .s-opacity-border1-top{border-top-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border1-bottom{border-bottom-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border1-left{border-left-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border1-right{border-right-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border2-top{border-top-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border2-bottom{border-bottom-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border2-left{border-left-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border2-right{border-right-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border3-top{border-top-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border3-bottom{border-bottom-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border3-left{border-left-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border3-right{border-right-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border4-top{border-top-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border4-bottom{border-bottom-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border4-left{border-left-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border4-right{border-right-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border5-top{border-top-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border5-bottom{border-bottom-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border5-left{border-left-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border5-right{border-right-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border6-top{border-top-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border6-bottom{border-bottom-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border6-left{border-left-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border6-right{border-right-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border7-top{border-top-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-border7-bottom{border-bottom-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-border7-left{border-left-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-border7-right{border-right-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-blank1{border-color: rgba(206,206,206,0.5) !important;}.s-opacity-50 .s-opacity-blank2{border-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-blank3{border-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-blank4{border-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-blank5{border-color: rgba(216,216,216,0.5) !important;}.s-opacity-50 .s-opacity-blank6{border-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-blank7{border-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-blank8{border-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-scroll{border-color: rgba(227,227,227,0.5) !important;}.s-opacity-50 .s-opacity-scroll{border-left-color: rgba(225,225,225,0.5) !important;}.s-opacity-50 .s-opacity-scroll{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(227,227,227,0.5)),to(rgba(227,227,227,0.5))) !important;background-image: -moz-linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;background-image: linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FE3E3E3,endColorstr=#7FE3E3E3) !important;}.s-opacity-50 .s-opacity-scroll-slider{border-color: rgba(225,225,225,0.5) !important;}.s-opacity-50 .s-opacity-scroll-slider{border-bottom-color: rgba(212,212,212,0.5) !important;}.s-opacity-50 .s-opacity-scroll-slider{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.5)),to(rgba(255,255,255,0.5))) !important;background-image: -moz-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FFFFFFF,endColorstr=#7FFFFFFF) !important;}.s-opacity-50 .s-opacity-background1{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(243,243,243,0.5)),to(rgba(243,243,243,0.5))) !important;background-image: -moz-linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;background-image: linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FF3F3F3,endColorstr=#7FF3F3F3) !important;}.s-opacity-50 .s-opacity-background2{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(248,248,248,0.5)),to(rgba(248,248,248,0.5))) !important;background-image: -moz-linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;background-image: linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FF8F8F8,endColorstr=#7FF8F8F8) !important;}.s-opacity-50 .s-opacity-white-background{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.5)),to(rgba(255,255,255,0.5))) !important;background-image: -moz-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FFFFFFF,endColorstr=#7FFFFFFF) !important;}.s-opacity-50 .s-opacity-menu1{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0.4)),to(rgba(0,0,0,0.4))) !important;background-image: -moz-linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;background-image: -ms-linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;background-image: -o-linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;background-image: linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#66000000,endColorstr=#66000000) !important;}.s-opacity-50 .s-opacity-foreground{opacity: 0.5;filter: alpha(opacity=50);}.s-opacity-50 .s-opacity-max{opacity: 0.4;filter: alpha(opacity=40);}.s-opacity-50 .s-opacity-bottommoremenu{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,0.45))) !important;background-image: -moz-linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;background-image: -ms-linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;background-image: -o-linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;background-image: linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#72000000) !important;}.s-opacity-50 .s-opacity-topmoremenu{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0.45)),to(rgba(0,0,0,0))) !important;background-image: -moz-linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;background-image: -ms-linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;background-image: -o-linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;background-image: linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#72000000,endColorstr=#00000000) !important;}");
    }
    var bingBgLink=document.createElement("a");
    bingBgLink.innerHTML="<span class='title'>Bing图</span>";
    var icons=document.querySelector("#s_icons");
    if(icons)icons.appendChild(bingBgLink);
    var skinContainer=document.querySelector(".s-skin-container");
    if(!skinContainer){
        skinContainer=document.getElementsByTagName("body")[0];
        skinContainer.setAttribute("style","position:fixed;_position:absolute;top:0;left:0;height:100%;width:100%;min-width:1000px;z-index:-10;background-position:center 0;background-repeat:no-repeat;background-size:cover;-webkit-background-size:cover;-o-background-size:cover;zoom:1;");
    }
    var bingImg=GM_getValue("bingImg");
    if(bingImg){
        skinContainer.style.backgroundImage = "url(\""+bingImg+"\")";
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
                bingBgLink.title=jsonData.images[0].copyright;
                bingBgLink.href=bgUrl;
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: bgUrl,
                    responseType: "blob",
                    onload: function(r) {
                        var blob = r.response;
                        var fr = new FileReader();
                        fr.readAsDataURL(blob);
                        fr.onload = function (e) {
                            var base64ImgData = e.target.result;
                            GM_setValue("bingImg",base64ImgData);
                            skinContainer.style.backgroundImage = "url(\""+base64ImgData+"\")";
                        };
                    }
                });
                bgUrl="url(\""+bgUrl+"\")";
                if(!bingImg)skinContainer.style.backgroundImage = bgUrl;
                var logo=document.querySelector("#s_lg_img");
                if(logo)logo.src=logo.src.replace(/\/[^\/]+$/,"/logo_white.png");
            }catch (e) {
                console.log(e);
            }
        }
    });
})();