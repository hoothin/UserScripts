// ==UserScript==
// @name         VIP视频破解
// @name:en      VIP Video Cracker
// @namespace    hoothin
// @version      1.5.0
// @description  解析并破解各大视频站的VIP权限
// @description:en  Crack VIP permissions of some chinese video sites
// @author       hoothin
// @include       *://v.qq.com/x/*
// @include       *://*.mgtv.com/b/*
// @include       *://*.le.com/ptv/vplay/*
// @include       *://v.youku.com/v_show/*
// @include       *://*.iqiyi.com/v_*
// @include       *://*.iqiyi.com/dianying/*
// @include       *://*.tudou.com/albumplay/*
// @include       *://*.tudou.com/listplay/*
// @include       *://*.tudou.com/programs/view/*
// @include       *://*.wasu.cn/Play/show/id/*
// @include       *://tv.sohu.com/*
// @include       *://film.sohu.com/album/*
// @include       *://ddp.vip.pptv.com/vod_detail/*
// @include       *://*.pptv.com/show/*
// @include       *://www.acfun.cn/v/*
// @include       *://*.fun.tv/vplay/*
// @include       *://vip.1905.com/play/*
// @include       *://vip.pptv.com/show/*
// @include       *://v.yinyuetai.com/video/*
// @include       *://v.yinyuetai.com/playlist/*
// @include       *://www.bilibili.com/video/*
// @exclude       *?url=*
// @exclude       *?qt=*
// @exclude       *?v=*
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_openInTab
// @grant         unsafeWindow
// @license       MIT License
// ==/UserScript==

(function() {
    'use strict';
    var cracks=[
        {name:"47影视云",url:"http://api.47ks.com/webcloud/?v=%s"},
        {name:"疯狂解析",url:"http://vip.ifkdy.com/?url=%s"},
        {name:"小海解析",url:"https://ckplaer.duapp.com/hai.php?url=%s"},
        {name:"无名小站1",url:"http://www.wmxz.wang/video.php?url=%s"},
        {name:"无名小站2",url:"http://www.sfsft.com/admin.php?url=%s"},
        {name:"71ki解析",url:"http://jx.71ki.com/tong.php?url=%s"},
        {name:"VIP看看",url:"http://2.jx.72du.com/video.php?url=%s"},
        {name:"歪歪电影",url:"http://www.yydy8.com/common/?url=%s"},
        {name:"10号影院",url:"http://player.gakui.top/?url=%s"},
        {name:"Relon",url:"http://yyygwz.com/index.php?url=%s"},
        {name:"爱看TV",url:"http://aikan-tv.com/tong.php?url=%s"},
        {name:"SO视频",url:"http://parse.colaparse.cc/?url=%s"},
        {name:"Moondown",url:"http://moon.moondown.net/?url=%s"},
        {name:"选片网",url:"http://jx.xuanpianwang.com/parse?url=%s"},
        {name:"云上",url:"http://www.ou522.cn/t2/1.php?url=%s"},
        {name:"小海解析",url:"http://jx.ck921.com/?url=%s"},
        {name:"强强卷",url:"http://000o.cc/jx/ty.php?url==%s"},
        {name:"Lewei369",url:"http://s1y2.com/?url=%s"},
        {name:"紫狐云",url:"http://yun.zihu.tv/play.html?url=%s"},
        {name:"眼睛会下雨",url:"http://www.vipjiexi.com/yun.php?url=%s"},
        {name:"土豪网",url:"http://www.tuhao13.com/yunparse/index.php?url=%s"},
        {name:"舞动秋天",url:"http://qtzr.net/s/?qt=%s"},
        {name:"CloudParse",url:"http://api.cloudparse.com/?url=%s"},
        {name:"迷失之梦",url:"http://mt2t.com/yun?url=%s"}
    ],video;
    var iqiyi=location.hostname.indexOf("iqiyi.com")!=-1;
    var vipVideoCrackJump=GM_getValue("vipVideoCrackJump");
    var vipVideoCrackUrl=GM_getValue("vipVideoCrackUrl");
    var selectStyle=document.createElement("style");
    selectStyle.innerHTML=".crackJump{margin-left:5px;color:white;text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;*filter: Glow(color=#000, strength=1);}.vipSelect{background:black;color:white;font-size:12px;}.crackArea{position:absolute;z-index:999999;left:0px;top:0px;opacity:0.50;filter:alpha(opacity=50);transition:opacity 0.3s ease,width 0.3s ease;width:95px;overflow:hidden;white-space:nowrap;}.crackArea:hover{opacity:1;filter:alpha(opacity=100);width:200px;}";
    document.getElementsByTagName("head")[0].appendChild(selectStyle);
    var placeholder=document.createElement("div");
    placeholder.style.cssText="width:100%;height:100%;text-align:center;font-size:x-large;cursor:pointer;";
    placeholder.innerHTML="点击恢复视频播放";
    placeholder.addEventListener("click",function(){
        if(placeholder.parentNode){
            placeholder.parentNode.replaceChild(video,placeholder);
        }
    });
    var select=document.createElement("select");
    select.className="vipSelect";
    select.innerHTML="<option value=''>VIP视频解析</option>";
    if(!GM_getValue("hacgGodTurnVisited")){
        select.innerHTML+="<option value='https://greasyfork.org/scripts/23316/code/hacg.user.js'>\u2605\u4e0a\u8f66\u2605</option>";
    }
    cracks.forEach(function(item){
        var optionStr="<option value='"+item.url+"'>"+item.name+"</option>";
        select.innerHTML+=optionStr;
    });
    select.onchange=function(){
        var value=select.options[select.options.selectedIndex].value;
        if(value){
            window.open(value.replace("%s",(iqiyi?decodeURIComponent(document.querySelector(".sns-icon>li>a").href.replace(/.*url=(.*)%3Fsrc.*/,"$1")):location.href.replace(/#.*/,""))));
            if(value.indexOf("hacg.user.js")!=-1){
                GM_setValue("hacgGodTurnVisited",true);
                select.options.remove(select.options.selectedIndex);
            }else{
                vipVideoCrackUrl=value;
                GM_setValue("vipVideoCrackUrl",vipVideoCrackUrl);
                if(video.parentNode && !iqiyi)video.parentNode.replaceChild(placeholder,video);
            }
            select.options.selectedIndex=0;
        }
    };
    var quickAccess=document.createElement("label");
    quickAccess.className="crackJump";
    quickAccess.title="立即跳转到上次选择的站点";
    quickAccess.innerHTML="<input type='checkbox'>立即跳转";
    var jumpCheck=quickAccess.querySelector("input");
    jumpCheck.onclick=function(){
        vipVideoCrackJump=jumpCheck.checked;
        GM_setValue("vipVideoCrackJump",vipVideoCrackJump);
        crackJump();
    };
    var crackArea=document.createElement("div");
    crackArea.className="crackArea";
    crackArea.appendChild(select);
    crackArea.appendChild(quickAccess);
    function crackJump(){
        if(vipVideoCrackJump){
            console.log(value);
            var value=vipVideoCrackUrl?vipVideoCrackUrl:cracks[0].url;
            GM_openInTab(value.replace("%s",(iqiyi&&document.querySelector(".sns-icon>li>a")?decodeURIComponent(document.querySelector(".sns-icon>li>a").href.replace(/.*url=(.*)%3Fsrc.*/,"$1")):location.href.replace(/#.*/,""))),false);
            if(video.parentNode && !iqiyi)video.parentNode.replaceChild(placeholder,video);
        }
    }
    var si=setInterval(function(){
        [].every.call(document.querySelectorAll("object,embed"),function(item){
            var style=getComputedStyle(item, null);
            if(style.width.replace("px","")>100 && style.height.replace("px","")>100){
                video=item;
                return false;
            }
            return true;
        });
        if(video){
            clearInterval(si);
            var videoParent=video.parentNode;
            videoParent.appendChild(crackArea);
            placeholder.style.lineHeight=getComputedStyle(videoParent).height;
            if(vipVideoCrackJump){
                jumpCheck.checked=true;
            }
            crackJump();
            var pushState = unsafeWindow.history.pushState;
            var replaceState = unsafeWindow.history.replaceState;
            unsafeWindow.history.pushState=function(state){
                setTimeout(function(){crackJump();},1);
                return pushState.apply(history, arguments);
            };
            unsafeWindow.history.replaceState=function(state){
                setTimeout(function(){crackJump();},1);
                return replaceState.apply(history, arguments);
            };
            if(iqiyi){
                unsafeWindow.addEventListener("hashchange",function(){
                    crackJump();
                });
            }
        }else{
            //console.log("no player!");
        }
    },500);
})();