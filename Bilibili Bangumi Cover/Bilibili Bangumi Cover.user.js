// ==UserScript==
// @name         Bilibili Bangumi Cover
// @name:zh-CN   哔哩哔哩番剧封面
// @namespace    hoothin
// @version      0.1
// @description        Show Bilibili Bangumi Cover
// @description:zh-CN  在哔哩哔哩番剧页面中显示封面
// @grant        GM_xmlhttpRequest
// @author       hoothin
// @include      http*://bangumi.bilibili.com/anime/v/*
// ==/UserScript==

(function() {
    'use strict';
    var vSmall=document.querySelector(".v_small");
    var title=document.createElement("h3");
    title.classList.add("v1-bangumi-head-h3");
    title.style.display="block";
    title.innerHTML="封面";
    var coverLink=document.createElement("a");
    var cover=document.createElement("img");
    cover.style.width="270px";
    coverLink.target="_blank";
    coverLink.appendChild(cover);
    vSmall.insertBefore(coverLink,vSmall.firstChild);
    vSmall.insertBefore(title,vSmall.firstChild);
    var bangumiIndex=document.querySelector(".v1-bangumi-info-title>a");
    if(bangumiIndex){
        GM_xmlhttpRequest({
            method: 'GET',
            url: bangumiIndex.href,
            onload: function(result) {
                var doc = null;
                try {
                    doc = document.implementation.createHTMLDocument('');
                    doc.documentElement.innerHTML = result.responseText;
                }
                catch (e) {
                    console.log(e);
                }
                if (!doc) {
                    return;
                }
                var img=doc.querySelector("a.v1-complete-text[href='"+location.href+"']>div>img");
                if(img){
                    coverLink.href=cover.src=img.src.replace(/\d+_\d+|_\d+x\d+\.jpg/,"");
                }
            }
        });
    }
})();