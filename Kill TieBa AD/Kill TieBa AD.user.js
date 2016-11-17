// ==UserScript==
// @name         Kill TieBa AD
// @name:zh-CN   贴吧伪装广告清理
// @name:zh-TW   貼吧僞裝廣告清理
// @namespace    hoothin
// @version      0.50
// @description        Just Kill TieBa AD
// @description:zh-CN  清理ADB或UBO等未能清理掉的百度贴吧列表伪装广告、帖内伪装广告与推荐应用广告
// @description:zh-TW  清理ADB或UBO等未能清理掉的百度貼吧列表偽裝廣告、帖內偽裝廣告與推薦應用廣告
// @author       hoothin
// @include      http*://tieba.baidu.com/*
// @grant        none
// @run-at       document-body
// @supportURL   http://www.hoothin.com
// @license     MIT License
// @compatible        chrome
// @compatible        firefox
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==

(function() {
    'use strict';
    var observer, option;
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var tcss = ".j_encourage_entry{display: none !important;} #encourage_entry{display: none !important;} .tpoint-skin{display: none !important;} #pb_adbanner{display: none !important;} .iframe_wrapper{display: none !important;} div.tpoint-skin{display: none !important;}";
    var snod = document.createElement('style');
    snod.innerHTML = tcss;
    document.getElementsByTagName("head")[0].appendChild(snod);
    var content = document.querySelector("#content");
    if(content){
        delAD("#thread_list","LI");
        observer = new MutationObserver(function(records){
            delAD("#thread_list","LI");
        });
        option = {
            'childList': true,
            'subtree': true
        };
        observer.observe(content, option);
    }else{
        content=document.querySelector(".content");
        if(!content)return;
        delAD("#j_p_postlist","DIV");
        observer = new MutationObserver(function(records){
            delAD("#j_p_postlist","DIV");
        });
        option = {
            'childList': true,
            'subtree': true
        };
        observer.observe(content, option);
    }

    function delAD(a,b){
        var threadList = document.querySelector(a+">"+a),i;
        if(!threadList) threadList = document.querySelector(a);
        if(!threadList) return;
        var delList = [];
        for(i=0;i<threadList.childNodes.length;i++){
            let thread = threadList.childNodes[i];
            if(thread.tagName == "STYLE"){
                delList.push(thread);
                var previousSibling = thread.previousSibling;
                previousSibling = previousSibling.tagName == b?previousSibling:previousSibling.previousSibling;
                delList.push(previousSibling);
            }else{
                if(thread.getAttribute && thread.getAttribute("data-field")){
                    let tdata=JSON.parse(thread.getAttribute("data-field"));
                    if(tdata.content && tdata.content.pb_tpoint && tdata.content.pb_tpoint.is_tpoint==1)delList.push(thread);
                }
            }
        }
        for(i=0;i<delList.length;i++){
            let del = delList[i];
            threadList.removeChild(del);
        }
        var easyAD, easyADs=document.querySelectorAll("span.label_text");
        for(i=0;i<easyADs.length;i++){
            easyAD = easyADs[i];
            if(easyAD.innerHTML=="广告" && easyAD.parentNode && easyAD.parentNode.parentNode){
                easyAD.parentNode.parentNode.removeChild(easyAD.parentNode);
            }
        }
    }
})();