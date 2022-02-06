// ==UserScript==
// @name               百度广告(首尾推广及右侧广告)清理
// @name:en            Kill Baidu AD
// @name:zh-TW         百度廣告(首尾推廣及右側廣告)清理
// @namespace          hoothin
// @version            1.22
// @description        彻底清理百度搜索(www.baidu.com)结果首尾的推广广告、二次顽固广告、右侧广告，并防止反复
// @description:en     Just Kill Baidu AD
// @description:zh-TW  徹底清理百度搜索(www.baidu.com)結果首尾的推廣廣告、二次頑固廣告、右側廣告，並防止反復
// @author             hoothin
// @include            http*://www.baidu.com/*
// @include            http*://m.baidu.com/*
// @grant              GM_xmlhttpRequest
// @run-at             document-start
// @license            MIT License
// @compatible         chrome 测试通过
// @compatible         firefox 测试通过
// @compatible         opera 未测试
// @compatible         safari 未测试
// @contributionURL    https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==

(function() {
    'use strict';
    var killBaijiaType=2;
    var MO = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if(MO){
        var observer = new MO(function(records){
            records.map(function(record) {
                if(record.addedNodes.length){
                    [].forEach.call(record.addedNodes,function(addedNode) {
                        clearOneAD(addedNode);
                    });
                }
            });
        });
        var option = {
            'childList': true,
            'subtree': true
        };
        observer.observe(document, option);
    }

    function checkBaijia(item){
        var itemHref=item.querySelector("a").href;
        item.style.display="none";
        if(itemHref.indexOf("baidu.com")==-1)return;
        var gmxhr=GM_xmlhttpRequest({
            url: itemHref,
            headers: {
                "Accept": "text/html"
            },
            method: "head",
            onreadystatechange:function(response) {
                if(response.readyState==4){
                    if(response.finalUrl.indexOf("baijiahao.baidu.com")!=-1){
                        item.remove();
                    }else{
                        item.style.display="";
                    }
                    gmxhr.abort();
                }
            }
        });
    }

    function clearAD(){
        if(!document.querySelectorAll)return;
        var mAds=document.querySelectorAll(".ec_wise_ad,.ec_youxuan_card,.page-banner"),i;
        for(i=0;i<mAds.length;i++){
            var mAd=mAds[i];
            mAd.remove();
        }
        var list=document.querySelectorAll("#content_left>div,#content_left>table");
        for(i=0;i<list.length;i++){
            let item = list[i];
            let s = item.getAttribute("style");
            if (s && /display:(table|block)\s!important/.test(s)) {
                item.remove();
            }else{
                var span=item.querySelector("div>span");
                if(span && span.innerHTML=="广告"){
                    item.remove();
                }
                [].forEach.call(item.querySelectorAll("span,a"),function(span){
                    if(span && (span.innerHTML=="广告" || span.getAttribute("data-tuiguang"))){
                        item.remove();
                    }
                });
                if(killBaijiaType==2){
                    [].forEach.call(item.querySelectorAll("a>div>span+img"),function(img){
                        if(img && /^https?:\/\/pic\.rmb\.bdstatic\.com/.test(img.src)){
                            //checkBaijia(item);
                            item.remove();
                        }
                    });
                }
            }
        }

        var eb = document.querySelectorAll("#content_right>table>tbody>tr>td>div");
        for(i=0;i<eb.length;i++){
            let d = eb[i];
            if (d.id!="con-ar") {
                d.remove();
            }
        }

        var nr = document.querySelector("#content_right>div>div>div");
        if(nr){
            var nra=nr.querySelectorAll("a");
            for(i=0;i<nra.length;i++){
                let d = nra[i];
                if (d.innerHTML=="广告") {
                    nr.remove();
                    break;
                }
            }
        }
    }

    function clearOneAD(ele){
        if(ele.nodeType!=1)return;
        if(ele.classList.contains("ec-tuiguang") || ele.classList.contains("ec_wise_ad") || ele.classList.contains("ec_youxuan_card") || ele.classList.contains("page-banner")){
            ele.remove();
            return;
        }
        if(ele.parentNode && ele.parentNode.id=="content_left" && (ele.nodeName=="DIV" || ele.nodeName=="TABLE")){
            let s = ele.getAttribute("style");
            if (s && /display:(table|block)\s!important/.test(s)) {
                ele.remove();
            }else{
                var span=ele.querySelector("div>span");
                if(span && span.innerHTML=="广告"){
                    ele.remove();
                }
                [].forEach.call(ele.querySelectorAll("span,a"),function(span){
                    if(span && (span.innerHTML=="广告" || span.getAttribute("data-tuiguang"))){
                        ele.remove();
                    }
                });
                if(killBaijiaType==2){
                    [].forEach.call(ele.querySelectorAll("a>div>span+img"),function(img){
                        if(img && /^https?:\/\/pic\.rmb\.bdstatic\.com/.test(img.src)){
                            //checkBaijia(ele);
                            ele.remove();
                        }
                    });
                }
            }
        }else if(ele.parentNode && ele.parentNode.id=="content_right"){
            if(ele.nodeName=="TABLE"){
                var eb = ele.querySelectorAll("tbody>tr>td>div");
                for(var i=0;i<eb.length;i++){
                    let d = eb[i];
                    if (d.id!="con-ar") {
                        d.remove();
                    }
                }
            }
            if(ele.nodeName=="DIV"){
                var nr = ele.querySelector("div>div");
                if(nr){
                    var nra=nr.querySelectorAll("a");
                    for(i=0;i<nra.length;i++){
                        let d = nra[i];
                        if (d.innerHTML=="广告") {
                            nr.remove();
                            break;
                        }
                    }
                }
            }
        }else{
            let eles=ele.querySelectorAll("#content_left>div,#content_left>table");
            [].forEach.call(eles, e=>{clearOneAD(e)});
        }
    }
    setTimeout(()=>{clearAD();},2000);
})();