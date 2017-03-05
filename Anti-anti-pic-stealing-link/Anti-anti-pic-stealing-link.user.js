// ==UserScript==
// @name         反图片防盗链
// @name:en      Anti-anti-pic-stealing-link
// @namespace    hoothin
// @version      0.2
// @description  破解图片防盗链
// @description:en  crack Anti-pic-stealing-link to show real picture
// @author       hoothin
// @include      http*://*/*
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';
    const sites={
        "qq.com":          "photo\.store\.qq\.com",
        "baidu.com":       "a\.hiphotos\.baidu\.com\/image",
    };
    var customRule=GM_getValue("aaslr");
    function refererChanger(item){
        var frameid = 'frameimg' + Math.random();
        unsafeWindow.img = '<img id="aapslImg" src="'+item.src+'?'+Math.random()+'"/><script>window.onload=function(){parent.document.getElementById("'+frameid+'").height=document.getElementById("aapslImg").height+"px";}</script>';
        var iframe=document.createElement("iframe");
        iframe.id=frameid;
        iframe.src="javascript:parent.img;";
        iframe.frameBorder="0";
        iframe.scrolling="no";
        iframe.width="100%";
        item.parentNode.replaceChild(iframe,item);
    }
    GM_registerMenuCommand("Anti-anti-pic-stealing-link rule", function(){
        var input=prompt("Set up Anti-anti-pic-stealing-link rule:",customRule?customRule:"");
        if(input){
            customRule=input;
            GM_setValue("aaslr",customRule);
        }
    });
    [].forEach.call(document.querySelectorAll("img"),function(item){
        for (var i in sites) {
            var sitePatt=new RegExp(sites[i],"i");
            if(sitePatt.test(item.src)){
                if(!(new RegExp(i,"i")).test(location.href)){
                    refererChanger(item);
                }
                break;
            }
        }
        if(customRule && (new RegExp(customRule,"i")).test(item.src)){
            refererChanger(item);
        }
    });
})();
