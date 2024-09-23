// ==UserScript==
// @name         百Bing图
// @name:en      BingBgForBaidu
// @namespace    hoothin
// @version      2.3.41
// @description     给百度首页换上Bing的背景图，并添加背景图链接与日历组件
// @description:en  Just change the background image of baidu.com to bing.com
// @author       hoothin
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        unsafeWindow
// @connect      global.bing.com
// @connect      cn.bing.com
// @license      MIT License
// @match      *://www.baidu.com/
// @match      *://www.baidu.com/home*
// @match      *://www.baidu.com/?tn=*
// @match      *://www.baidu.com/index.php*
// @match      *://ipv6.baidu.com/
// @match      *://ipv6.baidu.com/home*
// @match      *://ipv6.baidu.com/?tn=*
// @match      *://ipv6.baidu.com/index.php*
// ==/UserScript==

(function() {
    'use strict';
    if(/&wd=/.test(location.href))return;
    var head=document.querySelector("#head");
    if(!head.classList.contains("s-skin-hasbg")){
        head.classList.add("s-skin-hasbg");
        head.classList.add("s-opacity-50");
        GM_addStyle(".s-opacity-50 .s-opacity-border1-top{border-top-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border1-bottom{border-bottom-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border1-left{border-left-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border1-right{border-right-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-border2-top{border-top-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border2-bottom{border-bottom-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border2-left{border-left-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border2-right{border-right-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-border3-top{border-top-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border3-bottom{border-bottom-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border3-left{border-left-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border3-right{border-right-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-border4-top{border-top-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border4-bottom{border-bottom-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border4-left{border-left-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border4-right{border-right-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-border5-top{border-top-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border5-bottom{border-bottom-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border5-left{border-left-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border5-right{border-right-color: rgba(243,243,243,0.5) !important;}.s-opacity-50 .s-opacity-border6-top{border-top-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border6-bottom{border-bottom-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border6-left{border-left-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border6-right{border-right-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-border7-top{border-top-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-border7-bottom{border-bottom-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-border7-left{border-left-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-border7-right{border-right-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-blank1{border-color: rgba(206,206,206,0.5) !important;}.s-opacity-50 .s-opacity-blank2{border-color: rgba(233,233,233,0.5) !important;}.s-opacity-50 .s-opacity-blank3{border-color: rgba(240,240,240,0.5) !important;}.s-opacity-50 .s-opacity-blank4{border-color: rgba(218,218,218,0.5) !important;}.s-opacity-50 .s-opacity-blank5{border-color: rgba(216,216,216,0.5) !important;}.s-opacity-50 .s-opacity-blank6{border-color: rgba(238,238,238,0.5) !important;}.s-opacity-50 .s-opacity-blank7{border-color: rgba(234,234,234,0.5) !important;}.s-opacity-50 .s-opacity-blank8{border-color: rgba(226,226,226,0.5) !important;}.s-opacity-50 .s-opacity-scroll{border-color: rgba(227,227,227,0.5) !important;}.s-opacity-50 .s-opacity-scroll{border-left-color: rgba(225,225,225,0.5) !important;}.s-opacity-50 .s-opacity-scroll{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(227,227,227,0.5)),to(rgba(227,227,227,0.5))) !important;background-image: -moz-linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;background-image: linear-gradient(rgba(227,227,227,0.5) 0%,rgba(227,227,227,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FE3E3E3,endColorstr=#7FE3E3E3) !important;}.s-opacity-50 .s-opacity-scroll-slider{border-color: rgba(225,225,225,0.5) !important;}.s-opacity-50 .s-opacity-scroll-slider{border-bottom-color: rgba(212,212,212,0.5) !important;}.s-opacity-50 .s-opacity-scroll-slider{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.5)),to(rgba(255,255,255,0.5))) !important;background-image: -moz-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FFFFFFF,endColorstr=#7FFFFFFF) !important;}.s-opacity-50 .s-opacity-background1{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(243,243,243,0.5)),to(rgba(243,243,243,0.5))) !important;background-image: -moz-linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;background-image: linear-gradient(rgba(243,243,243,0.5) 0%,rgba(243,243,243,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FF3F3F3,endColorstr=#7FF3F3F3) !important;}.s-opacity-50 .s-opacity-background2{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(248,248,248,0.5)),to(rgba(248,248,248,0.5))) !important;background-image: -moz-linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;background-image: linear-gradient(rgba(248,248,248,0.5) 0%,rgba(248,248,248,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FF8F8F8,endColorstr=#7FF8F8F8) !important;}.s-opacity-50 .s-opacity-white-background{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.5)),to(rgba(255,255,255,0.5))) !important;background-image: -moz-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -ms-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: -o-linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;background-image: linear-gradient(rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7FFFFFFF,endColorstr=#7FFFFFFF) !important;}.s-opacity-50 .s-opacity-menu1{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0.4)),to(rgba(0,0,0,0.4))) !important;background-image: -moz-linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;background-image: -ms-linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;background-image: -o-linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;background-image: linear-gradient(rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#66000000,endColorstr=#66000000) !important;}.s-opacity-50 .s-opacity-foreground{opacity: 0.5;filter: alpha(opacity=50);}.s-opacity-50 .s-opacity-max{opacity: 0.4;filter: alpha(opacity=40);}.s-opacity-50 .s-opacity-bottommoremenu{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,0.45))) !important;background-image: -moz-linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;background-image: -ms-linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;background-image: -o-linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;background-image: linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.45) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#72000000) !important;}.s-opacity-50 .s-opacity-topmoremenu{background: none !important;background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0.45)),to(rgba(0,0,0,0))) !important;background-image: -moz-linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;background-image: -ms-linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;background-image: -o-linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;background-image: linear-gradient(rgba(0,0,0,0.45) 0%,rgba(0,0,0,0) 100%) !important;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#72000000,endColorstr=#00000000) !important;}");
    }
    var bingBgLink=document.createElement("a");
    bingBgLink.innerHTML="<span class='title'>Bing图</span>";
    var riliLink=document.createElement("a"),date=new Date();
    var icons=document.querySelector("#s_icons");
    if(!icons){
        icons=document.querySelector("#u1");
        bingBgLink.classList.add("s-top-right-text","c-font-normal","mnav","c-color-t");
        riliLink.classList.add("s-top-right-text","c-font-normal","mnav","c-color-t");
    }
    if(icons)icons.insertBefore(bingBgLink,icons.children[1]||icons.firstChild);
    var iframe=document.createElement("iframe");
    iframe.src="/s?wd=%E6%97%A5%E5%8E%86";
    iframe.setAttribute("scrolling","no");
    iframe.style.display="none";
    iframe.style.top="30px";
    iframe.style.left="0px";
    iframe.style.position="fixed";
    iframe.style.zIndex="99";
    iframe.style.borderRadius="16px";
    iframe.name="pagetual-iframe";
    iframe.style.border="none";
    var sUpfuncMenus=document.querySelector("#s_upfunc_menus");
    if(!sUpfuncMenus){
        sUpfuncMenus=document.querySelector(".head_wrapper");
        iframe.style.top="50px";
        iframe.style.left="";
        iframe.style.right="30px";
    }
    if(sUpfuncMenus){
        sUpfuncMenus.appendChild(iframe);
    }
    var dateDay=date.getDate(),dateMonth=date.getMonth()+1;
    if(dateDay<10)dateDay="0"+dateDay;
    if(dateMonth<10)dateMonth="0"+dateMonth;
    var week=["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"];
    var riliurl=GM_getValue("riliurl")||"https://www.rili.com.cn/";
    riliLink.innerHTML="<span class='title' style='cursor: pointer; border-bottom: solid 1px; padding: 2px 0;'>"+date.getFullYear()+"-"+dateMonth+"-"+dateDay+" \u661f\u671f"+week[date.getDay()]+"</span>";
    riliLink.onclick=function(){
        window.open(riliurl);
    };
    riliLink.oncontextmenu=function(e){
        let newRiliurl=prompt("自定义 url", riliurl);
        if(newRiliurl){
            riliurl=newRiliurl;
            GM_setValue("riliurl", newRiliurl);
        }
        e.preventDefault();
    };
    if(icons)icons.insertBefore(riliLink,icons.children[1]||icons.firstChild);
    iframe.onload=function(){
        var contentHead=iframe.contentDocument.querySelector("#head");
        if(contentHead && contentHead.parentNode)contentHead.parentNode.removeChild(contentHead);
        var $=unsafeWindow.$;
        var iframeDoc=$(iframe.contentDocument);
        var rili=$("div.op-calendar-new,div.op-calendar-pc,div.result-op.c-container.xpath-log.new-pmd>div",iframe.contentDocument);
        rili.after("<br/><br/>");
        $("#head,.head_nums_cont_outer,#searchTag",iframe.contentDocument).hide();
        iframe.setAttribute("scrolling","no");
        var t;
        //riliLink.innerHTML="<span class='title' style='text-decoration:overline;cursor:crosshair'>"+$(".op-calendar-new-right-date,.op-calendar-pc-right-date",iframe.contentDocument).html()+"</span>";
        riliLink.onmouseenter=function(){
            clearTimeout(t);
                $(iframe).show(200);
                iframeDoc.scrollTop(137);
                iframeDoc.scrollLeft(134);
                iframe.width=592;
                iframe.height=665;
        };
        riliLink.onmouseleave=function(){
            clearTimeout(t);
            t=setTimeout(function(){
                $(iframe).hide(500);
            },300);
        };
        iframe.onmouseenter=function(){
            clearTimeout(t);
        };
        iframe.onmouseleave=function(){
            clearTimeout(t);
            t=setTimeout(function(){
                $(iframe).hide(500);
            },100);
        };
        var holiday=$('.cos-search-link,.sc-search-link',iframe.contentDocument)[0];
        if(holiday){
            var title=holiday.innerText.slice(0, -1);
            riliLink.innerHTML+=title?" <font color='#FFFF66' style='background-color:#e02d2d;font-weight:bold;border-radius: 8px; padding: 3px; border: solid 1px #e02d2d;'>"+title+"</font>":"";
            riliLink.title=title;
        }
    };
    var skinContainer=document.querySelector(".s-skin-container");
    if(!skinContainer){
        skinContainer=document.getElementsByTagName("body")[0];
        GM_addStyle(".s-news-rank-content{max-height: 180px; width: 99%; overflow-y: auto; overflow-x: hidden;}.s-top-right .ai-entry-right-nologin,.s-top-right .operate-wrapper-nologin{right:362px;}.hot-refresh{padding-bottom:7px;}.hot-title>div,.hot-refresh{border-radius: 3px 3px 0 0}.s-hotsearch-content{position: absolute; background-color: #f0f8ff95; border-radius: 0 0 5px 5px;padding-right: 2px;}.s_ipt{margin:0!important;}.s_ipt_wr{border-radius: 10px 4px 4px 10px;border-radius: 10px 0 0 10px;background: #fff!important;}#qrcodeCon{display:none}body{position:fixed;_position:absolute;top:0;left:0;height:100%;width:100%;min-width:1000px;z-index:-10;background-position:center 0;background-repeat:no-repeat;background-size:cover;-webkit-background-size:cover;-o-background-size:cover;zoom:1;}");
        var inputsu=document.querySelector("input#su");
        var clickHandler=e=>{
            if(skinContainer)skinContainer.style.backgroundImage="";
            else inputsu.removeEventListener("click",clickHandler);
        };
        inputsu.addEventListener("click",clickHandler);
    }
    var bingImgObj=GM_getValue("bingImgObj");
    if(bingImgObj){
        skinContainer.style.backgroundImage = "url(\""+bingImgObj.base64+"\")";
    }
    var logo=document.querySelector("#s_lg_img_new");
    if(logo)logo.parentNode.removeChild(logo);
    logo=document.querySelector("#s_lg_img");
    var whiteData= "data:image/png;base64,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";
    if(logo && logo.src){
        if(/\/pcindex\_|bd\_logo1|img\/PCtm/.test(logo.src)){
            logo.src=whiteData;
            logo.style.display="initial";
        }
    }else{
        logo=document.querySelector(".index-logo-srcnew");
        if(logo)logo.parentNode.removeChild(logo);
        logo=document.querySelector("#lg>img");
        if(logo && logo.src && /.*\/img\/pcindex\_|bd\_logo1|img\/PCtm/.test(logo.src)){
            logo.src=whiteData;
            logo.style.display="initial";
        }
    }
    var input=document.querySelector("#kw");
    var headWrapper=document.querySelector("#head_wrapper");
    let inputHandler = e => {
        setTimeout(() => {
            if(headWrapper.children[0].id=="ent_sug"){
                if(skinContainer)skinContainer.style.backgroundImage="";
                skinContainer=null;
                input.removeEventListener('input', inputHandler);
            }
        }, 0);
    };
    input.addEventListener('input', inputHandler);
    GM_xmlhttpRequest({
        method: 'GET',
        url: "https://global.bing.com/HPImageArchive.aspx?format=js&idx=0&pid=hp&video=1&n=1",
        onload: function(result) {
            var jsonData=null;
            try {
                jsonData=JSON.parse(result.responseText);
                var bgUrl=jsonData.images[0].url;
                if(!/^https?:\/\//.test(bgUrl)){
                    bgUrl="https://global.bing.com"+bgUrl;
                }
                bingBgLink.title=jsonData.images[0].copyright;
                bingBgLink.href=bgUrl;
                if(bingImgObj && bingImgObj.url==bgUrl)return;
                if(skinContainer && !bingImgObj)skinContainer.style.backgroundImage="url(\""+bgUrl+"\")";
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: bgUrl,
                    responseType: "blob",
                    onload: function(r) {
                        var blob=r.response;
                        var fr=new FileReader();
                        fr.readAsDataURL(blob);
                        fr.onload=function (e) {
                            var base64ImgData=e.target.result;
                            GM_setValue("bingImgObj",{url: bgUrl, base64: base64ImgData});
                        };
                    }
                });
            }catch (e) {
                console.log(e);
            }
        }
    });
})();