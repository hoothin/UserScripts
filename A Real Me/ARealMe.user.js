// ==UserScript==
// @name         A Real Me
// @namespace    hoothin
// @version      0.1
// @description  Show results for A Real Me
// @author       hoothin
// @match        https://www.arealme.com/*
// @match        http://www.anol.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function showResult(){
        var answers=document.querySelectorAll("div.answer");
        [].forEach.call(answers,function(item){
            item.innerHTML+=" <font color='red'>"+item.getAttribute("value")+"</font>";
        });
    }
    showResult();
    var start=document.querySelector("#start");
    if(start){
        start.onclick=e=>{setTimeout(()=>{showResult()},1000)};
    }
})();