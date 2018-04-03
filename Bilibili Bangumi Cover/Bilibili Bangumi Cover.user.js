// ==UserScript==
// @name         Bilibili Bangumi Cover
// @name:zh-CN   哔哩哔哩番剧封面
// @namespace    hoothin
// @version      0.7
// @description        Show Bilibili Bangumi Cover
// @description:zh-CN  在哔哩哔哩番剧页面中显示封面
// @grant        GM_xmlhttpRequest
// @author       hoothin
// @include      http*://bangumi.bilibili.com/anime/*
// @include      http*://www.bilibili.com/bangumi/play/*
// ==/UserScript==

(function() {
    'use strict';
    var vSmall=document.querySelector(".bangumi-recom");
    console.log(vSmall);
    if(!vSmall)return;
    var title=document.createElement("h4");
    title.id="coverTitle";
    title.classList.add("recom-title");
    title.style.display="block";
    title.innerHTML="封面";
    var coverLink=document.createElement("a");
    var cover=document.createElement("img");
    cover.style.width="270px";
    coverLink.target="_blank";
    coverLink.appendChild(cover);
    /*var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(records){
    });
    var option = {
        'childList': true
    };
    observer.observe(vSmall, option);*/
    if(!vSmall.querySelector("h3#coverTitle")){
        vSmall.insertBefore(coverLink,vSmall.firstChild);
        vSmall.insertBefore(title,vSmall.firstChild);
        refreshCover();
    }
    function refreshCover(){
        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://bangumi.bilibili.com/web_api/episode/"+location.href.replace(/.*ep/i,"")+".json",
            onload: function(result) {
                console.log(11);
                try {
                    var bangumiData = JSON.parse(result.responseText);
                    coverLink.href=cover.src=bangumiData.result.currentEpisode.cover;
                }catch (e) {
                    console.log(e);
                }
            }
        });
    }
})();