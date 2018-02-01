// ==UserScript==
// @name         VIP视频破解
// @name:en      VIP Video Cracker
// @namespace    hoothin
// @version      1.8.7
// @description  解析并破解各大视频站的VIP权限
// @description:en  Crack VIP permissions of some chinese video sites
// @author       hoothin
// @include       *://v.qq.com/x/*
// @include       *://m.v.qq.com/*
// @include       *://*.mgtv.com/*b/*
// @include       *://*.le.com/ptv/vplay/*
// @include       *://m.le.com/*
// @include       *://v.youku.com/v_show/*
// @include       *://m.youku.com/video/*
// @include       *://*.iqiyi.com/v_*
// @include       *://*.iqiyi.com/dianying/*
// @include       *://*.tudou.com/albumplay/*
// @include       *://*.tudou.com/listplay/*
// @include       *://*.tudou.com/programs/view/*
// @include       *://*.wasu.cn/*Play/show/id/*
// @include       *://*tv.sohu.com/*
// @include       *://*film.sohu.com/album/*
// @include       *://ddp.vip.pptv.com/vod_detail/*
// @include       *://*.pptv.com/show/*
// @include       *://*.acfun.cn/v/*
// @include       *://*.fun.tv/vplay/*
// @include       *://vip.1905.com/play/*
// @include       *://vip.pptv.com/show/*
// @include       *://v.yinyuetai.com/video/*
// @include       *://v.yinyuetai.com/playlist/*
// @include       *://*.bilibili.com/video/*
// @exclude       *?url=*
// @exclude       *?qt=*
// @exclude       *?v=*
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_openInTab
// @grant         unsafeWindow
// @grant         GM_xmlhttpRequest
// @license       MIT License
// @connect       cache.video.qiyi.com
// ==/UserScript==

(function() {
    'use strict';
    var cracks=[
        {name:"47影视云(s)",url:"https://api.47ks.com/webcloud/?v=%s",title:"首选"},
        {name:"无名小站",url:"http://www.wmxz.wang/video.php?url=%s",title:"次选"},
        {name:"石头解析(s)",url:"https://jiexi.071811.cc/jx.php?url=%s"},
        {name:"最小品(s)",url:"https://www.zuixiaopin.com/api/cloudVideo?url=%s"},
        {name:"妹儿云(s)",url:"https://www.yymeier.com/api.php?url=%s"},
        {name:"那片(s)",url:"https://jxapi.nepian.com/ckparse/?url=%s"},
        {name:"FlvSP(s)",url:"https://api.flvsp.com/?url=%s"},
        {name:"海播",url:"http://www.0335haibo.com/tong.php?url=%s"},
        {name:"眼睛会下雨",url:"http://www.vipjiexi.com/yun.php?url=%s",title:"域名改成海播了，https证书也没了"},
        {name:"小海解析(s)",url:"https://ckplaer.duapp.com/hai2.php?url=%s",title:"播放器放在百度开发者平台"},
        {name:"爱看TV",url:"http://aikan-tv.com/?url=%s"},
        {name:"噗噗电影",url:"http://pupudy.com/webcloud/index.php?url=%s"},
        {name:"米沃",url:"http://jx.mihatv.com/miwo1.php?url=%s"},
        {name:"速度牛",url:"http://api.wlzhan.com/tong/?url=%s"},
        {name:"资源帝",url:"http://www.ziyuand.cn/jx1/jx.php?url=%s"},
        {name:"旋风解析",url:"http://api.xfsub.com/index.php?url=%s"},
        {name:"Relon",url:"http://yyygwz.com/index.php?url=%s"},
        {name:"SO视频",url:"http://parse.colaparse.cc/?url=%s"},
        {name:"5奇异",url:"http://www.jiexi.cx/5qiyi/?url=%s"},
        {name:"Moondown",url:"http://moon.moondown.net/?url=%s"},
        {name:"选片网",url:"http://jx.xuanpianwang.com/parse?url=%s"},
        {name:"云上",url:"http://www.ou522.cn/t2/1.php?url=%s"},
        {name:"强强卷",url:"http://000o.cc/jx/ty.php?url=%s"},
        {name:"Lewei369",url:"http://s1y2.com/?url=%s"},
        {name:"紫狐云",url:"http://yun.zihu.tv/api.php?url=%s"},
        {name:"土豪网",url:"http://www.tuhao13.com/yunparse/index.php?url=%s"},
        {name:"舞动秋天",url:"http://qtzr.net/s/?qt=%s"},
        {name:"97在线看",url:"http://www.97zxkan.com/jiexi/97zxkanapi.php?url=%s"},
        {name:"百域阁",url:"http://api.svip.baiyug.cn/svip/index.php?url=%s",title:"会检测是否frame,只能跳转不能嵌"},
        {name:"言朋影院",url:"http://vip.yingyanxinwen.cn/vip/index.php?url=%s",title:"会检测是否frame,只能跳转不能嵌"},
        {name:"迷失之梦",url:"http://mt2t.com/yun?url=%s",title:"这个解析站似乎不大稳定"},
        {name:"无名小站源",url:"http://www.sfsft.com/admin.php?url=%s",title:"无名小站的源"},
        {name:"VIP看看",url:"http://2.jx.72du.com/video.php?url=%s",title:"嵌了无名小站的服务"},
        {name:"歪歪电影",url:"http://www.yydy8.com/common/?url=%s",title:"嵌了47影视云的服务"},
        {name:"梦中人",url:"http://www.wpswan.com/mzr/vipparse/index.php?url=%s",title:"嵌了47影视云的服务"},
        {name:"71ki解析",url:"http://jx.71ki.com/tong.php?url=%s"},
        {name:"CloudParse",url:"http://api.cloudparse.com/?url=%s"},
        {name:"10号影院",url:"http://player.gakui.top/?url=%s"},
        {name:"PPYPP",url:"http://www.ppypp.com/yunparse/?url=%s"},
        {name:"疯狂解析",url:"http://vip.ifkdy.com/?url=%s",title:"仅是简单嵌了47影视云、小海解析等几个解析站"},
    ],video,videoWidth,videoHeight,i=0;
    var isMobile=function() {
        var userAgentInfo = navigator.userAgent.toLowerCase();
        var Agents=["android", "iphone",
                      "symbianos", "windows phone",
                      "ipad", "ipod" ,"midp" ,"ucweb"];
        var flag=false;
        for (var v=0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag=true;
                break;
            }
        }
        return flag;
    }();
    var iqiyi=location.hostname.indexOf("iqiyi.com")!=-1;
    var vipVideoCrackJump=GM_getValue(location.hostname+"_vipVideoCrackJump");
    var vipVideoCrackEmbed=GM_getValue("vipVideoCrackEmbed");
    var vipVideoCrackUrl=GM_getValue("vipVideoCrackUrl");
    var iframe=document.createElement("iframe");
    iframe.style.border="0";
    var selectStyle=document.createElement("style");
    selectStyle.innerHTML=".crackJump{font-size:12px;margin-left:5px;color:white;text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;*filter: Glow(color=#000, strength=1);}.crackJump input{vertical-align:middle;}.vipSelect{background:black;color:white;font-size:12px;border:none;}.crackArea{position:absolute;z-index:999999;left:0px;top:0px;opacity:0.50;filter:alpha(opacity=50);transition:opacity 0.3s ease,width 0.3s ease;width:18px;height:18px;overflow:hidden;white-space:nowrap;border:1px solid #666;background:black;}.crackArea:hover{opacity:1;filter:alpha(opacity=100);width:230px;}.crackArea>p{display:block;font-size:13px;text-align:center;float:left;position:absolute;top:0px;background-color:black;width:100%;height:100%;margin:0 auto}.crackArea:hover>p{display:none;}.crackArea>label{display:none;}.crackArea:hover>label{display:initial;}";
    document.getElementsByTagName("head")[0].appendChild(selectStyle);
    var placeholder=document.createElement("div");
    placeholder.style.cssText="width:100%;height:100%;text-align:center;font-size:x-large;cursor:pointer;color:#666;";
    placeholder.innerHTML="点击恢复视频播放";
    placeholder.addEventListener("click",function(){
        if(placeholder.parentNode){
            placeholder.parentNode.replaceChild(video,placeholder);
        }
    });
    var select=document.createElement("select");
    select.className="vipSelect";
    select.innerHTML="<option value=''>💎 VIP解析</option>";
    if(!GM_getValue("hacgGodTurnVisited")){
        select.innerHTML+="<option value='https://greasyfork.org/scripts/23316/code/hacg.user.js'>\u2605\u4e0a\u8f66\u2605</option>";
    }
    cracks.forEach(function(item){
        var optionStr="<option value='"+item.url+"'"+(item.title?"title='"+item.title+"'":"")+">"+item.name+"</option>";
        select.innerHTML+=optionStr;
    });
    select.onchange=function(){
        var value=select.options[select.options.selectedIndex].value;
        if(value){
            var url=value.replace("%s",(iqiyi&&location.href.indexOf("#")!=-1?decodeURIComponent(document.querySelector(".sns-icon>li>a").href.replace(/.*url=(.*)%3Fsrc.*/,"$1")):location.href));
            if(value.indexOf("hacg.user.js")!=-1){
                GM_setValue("hacgGodTurnVisited",true);
                select.options.remove(select.options.selectedIndex);
            }else{
                vipVideoCrackUrl=value;
                GM_setValue("vipVideoCrackUrl",vipVideoCrackUrl);
                if(video.parentNode)video.parentNode.replaceChild(placeholder,video);
            }
            if(!vipVideoCrackEmbed || !embedCrack(url)){
                unsafeWindow.open(url);
            }
            select.options.selectedIndex=0;
        }
    };
    var quickAccess=document.createElement("label");
    quickAccess.className="crackJump";
    quickAccess.title="立即利用上次选择的接口破解";
    quickAccess.innerHTML="<input type='checkbox'>立即破解";
    var jumpCheck=quickAccess.querySelector("input");
    jumpCheck.onclick=function(){
        vipVideoCrackJump=jumpCheck.checked;
        GM_setValue(location.hostname+"_vipVideoCrackJump",vipVideoCrackJump);
        crackJump();
    };
    var embedLabel=document.createElement("label");
    embedLabel.className="crackJump";
    embedLabel.title="能嵌入当前站点的接口就直接嵌入页面";
    embedLabel.innerHTML="<input type='checkbox'>能嵌就嵌";
    var embedCheck=embedLabel.querySelector("input");
    embedCheck.onclick=function(){
        vipVideoCrackEmbed=embedCheck.checked;
        GM_setValue("vipVideoCrackEmbed",vipVideoCrackEmbed);
        crackJump();
    };
    var showP=document.createElement("p");
    showP.innerHTML="💎";
    var crackArea=document.createElement("div");
    crackArea.className="crackArea";
    crackArea.appendChild(select);
    crackArea.appendChild(showP);
    crackArea.appendChild(quickAccess);
    crackArea.appendChild(embedLabel);
    function crackJump(){
        if(vipVideoCrackJump){
            var value=vipVideoCrackUrl?vipVideoCrackUrl:cracks[0].url;
            var url=value.replace("%s",(iqiyi?location.href.replace(/#.*/,""):location.href));
            if(!vipVideoCrackEmbed || !embedCrack(url)){
                GM_openInTab(url,false);
                if(video.parentNode)video.parentNode.replaceChild(placeholder,video);
            }
        }
    }
    function embedCrack(url){
        var canEmbed=false;
        if(/^https/.test(url)){
            url=location.protocol+url.slice(6);
            canEmbed=true;
        }else if(location.protocol=="http:"){
            canEmbed=true;
        }
        var htmlVideo=document.querySelector("video");
        if(htmlVideo){
            var vi=setInterval(function(){
                if(htmlVideo.src){
                     setTimeout(function() {
                         htmlVideo.click();
                     },1000);
                    clearInterval(vi);
                }
            },500);
        }
        if(canEmbed){
            if(iqiyi){
                var plgcontainer=document.querySelector('[data-player-hook=plgcontainer]');
                var videoLoading=document.querySelector('[data-player-hook=videoLoading]');
                var isi=setInterval(function(){
                    var jplayUnderFrame=document.querySelector('.J_play-underFrame');
                    if(jplayUnderFrame){
                        clearInterval(isi);
                        var flashArea_paypop=document.querySelector('#flashArea_paypop');
                        if(flashArea_paypop)flashArea_paypop.parentNode.parentNode.removeChild(flashArea_paypop.parentNode);
                        jplayUnderFrame.parentNode.removeChild(jplayUnderFrame);
                    }
                },500);
                if(plgcontainer)plgcontainer.parentNode.removeChild(plgcontainer);
                if(videoLoading)videoLoading.parentNode.removeChild(videoLoading);
            }
            iframe.width=videoWidth;
            iframe.height=videoHeight;
            iframe.src=url;
            if(!iframe.parentNode){
                if(video.parentNode){
                    video.parentNode.replaceChild(iframe,video);
                }else{
                    placeholder.parentNode.replaceChild(iframe,placeholder);
                }
                video=iframe;
            }
        }
        return canEmbed;
    }
    if(isMobile){
        crackArea.style.position="fixed";
        document.body.appendChild(crackArea);
    }else{
        var si=setInterval(function(){
            [].every.call(document.querySelectorAll("object,embed,video"),function(item){
                var style=unsafeWindow.getComputedStyle(item, null);
                if(style.width.replace("px","")>100 && style.height.replace("px","")>100){
                    video=item;
                    return false;
                }
                return true;
            });
            if(video){
                clearInterval(si);
                var videoStyle=unsafeWindow.getComputedStyle(video, null);
                videoWidth=videoStyle.width;
                videoHeight=videoStyle.height;
                var videoParent=video.parentNode;
                videoParent.appendChild(crackArea);
                placeholder.style.lineHeight=unsafeWindow.getComputedStyle(videoParent).height;
                if(location.hostname.indexOf("v.yinyuetai.com")!=-1){
                    if (!/^https?:\/\/v\.yinyuetai\.com\/video\/h5\//.test(location.href)) {
                        unsafeWindow.location.href = unsafeWindow.location.href.replace(/^https?:\/\/v\.yinyuetai\.com\/video\//,"http://v.yinyuetai.com/video/h5/");
                    }else{
                        videoParent.parentNode.style.position="absolute";
                        setTimeout(function(){
                            videoStyle=unsafeWindow.getComputedStyle(video, null);
                            videoWidth=videoStyle.width;
                            videoHeight=videoStyle.height;
                        },1000);
                    }
                }else if(location.hostname.indexOf("v.youku.com")!=-1){
                    if(vipVideoCrackEmbed)videoHeight="580px";
                }else if(location.hostname.indexOf("le.com")!=-1){
                    document.querySelector('.juji_cnt').addEventListener('click', function(e){
                        if(!vipVideoCrackJump)return;
                        var target=e.target;
                        if(target.tagName!="A")return;
                        location.href="http://www.le.com/ptv/vplay/"+target.getAttribute("data-vid")+".html";
                    });
                }else if(iqiyi){
                    document.querySelector('#widget-dramaseries').addEventListener('click', function(e){
                        if(!vipVideoCrackJump)return;
                        var target=e.target.parentNode.tagName=="LI"?e.target.parentNode:(e.target.parentNode.parentNode.tagName=="LI"?e.target.parentNode.parentNode:e.target.parentNode.parentNode.parentNode);
                        if(target.tagName!="LI")return;
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: "http://cache.video.qiyi.com/jp/vi/"+target.dataset.videolistTvid+"/"+target.dataset.videolistVid+"/?callback=crackIqiyi",
                            onload: function(result) {
                                var crackIqiyi=function(d){
                                    location.href=d.vu;
                                };
                                eval(result.responseText);
                            }
                        });
                    });
                    unsafeWindow.addEventListener("hashchange",function(){
                        crackJump();
                    });
                }
                if(vipVideoCrackJump){
                    jumpCheck.checked=true;
                }
                if(vipVideoCrackEmbed){
                    embedCheck.checked=true;
                }
                crackJump();
                unsafeWindow.eval(`
                var pushState = window.history.pushState;
                window.history.pushState=function(a){
                    window.postMessage("pushState","*");
                    return pushState.apply(history, arguments);
                };
                var replaceState = window.history.pushState;
                window.history.replaceState=function(a){
                    window.postMessage("replaceState","*");
                    return pushState.apply(history, arguments);
                };`);
                unsafeWindow.addEventListener('message',function(e) {
                    if(e.data=="pushState" || e.data=="replaceState"){
                        setTimeout(function(){crackJump();},1);
                    }
                });
            }
        },500);
        setTimeout(function(){
            clearInterval(si);
        },20000);
    }
})();