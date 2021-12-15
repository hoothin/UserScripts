// ==UserScript==
// @name         loliconSexPic
// @namespace    hoothin
// @version      0.1
// @description  lolicon色图
// @author       hoothin
// @match        https://api.lolicon.app/setu/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==
//https://api.lolicon.app/setu/v2?r18=1&num=5
(function() {
    'use strict';
    GM_addStyle("img{width:100%}");
    var btns=document.createElement("div");
    var datas=JSON.parse(document.body.innerText).data;

    datas.forEach(function(data){
        var img=document.createElement("img");
        img.src=data.urls?data.urls.original:data.url;
        document.body.appendChild(img);
    });
})();