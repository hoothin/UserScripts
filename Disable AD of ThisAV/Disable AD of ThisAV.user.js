// ==UserScript==
// @name               ThisAV去广告
// @name:en            Disable AD of ThisAV
// @name:zh-TW         ThisAV去廣告
// @namespace          hoothin
// @version            0.62
// @description        去除ThisAV页面中的弹出广告与导航栏广告，添加视频下载按钮
// @description:en     Just disable popup AD & tab menu AD of ThisAV.com
// @description:zh-TW  去除ThisAV頁面中的彈出廣告與導航欄廣告，添加視頻下載按鈕
// @author             hoothin
// @include            http*://thisav.com/*
// @include            http*://www.thisav.com/*
// @grant              unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var _unsafeWindow=(typeof unsafeWindow=='undefined')?window:unsafeWindow;
    document.onclick=null;
    var tabsmenus=document.querySelectorAll("#slidetabsmenu>ul>li>a");
    for(var i=0;i<tabsmenus.length;i++){
        var tabsmenu=tabsmenus[i];
        if(tabsmenu.href.indexOf("thisav")==-1){
            tabsmenu.remove();
        }
    }
    var ratingText=document.querySelector("#rating_text");
    if(ratingText){
        ratingText.style.float="left";
        ratingText.style.width="55px";
        ratingText.style.marginLeft="5px";
        var downBtn=document.createElement("a");
        downBtn.style.display="flex";
        if(_unsafeWindow.so){
            downBtn.href=_unsafeWindow.so.variables.file;
        }else if(_unsafeWindow.jwplayer){
            downBtn.href=_unsafeWindow.jwplayer("myElement").config.file;
        }else if(_unsafeWindow.videojs){
            var vplayer = _unsafeWindow.videojs('my-video', {
                techOrder: ['shaka', 'html5'],
                plugins: {
                    videoJsResolutionSwitcher: {
                        default: 'high',
                        dynamicLabel: true,
                    },
                },
            });
            var mpd=vplayer.options_.sources[0].src;
            downBtn.href=mpd.replace(/\.mpd$/,"_dashinit.mp4");
        }else{
            downBtn.href=document.querySelector("source").src;
        }
        ratingText.parentNode.insertBefore(downBtn,ratingText.nextSibling);
        downBtn.innerHTML="<input type='button' value='下載視頻' style='float: left;padding: 2px 5px 2px 5px!important; cursor: pointer;'></input>";
    }
})();