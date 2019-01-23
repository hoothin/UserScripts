// ==UserScript==
// @name               百度广告(首尾推广及右侧广告)清理
// @name:en            Kill Baidu AD
// @name:zh-TW         百度廣告(首尾推廣及右側廣告)清理
// @namespace          hoothin
// @version            0.89
// @description        彻底清理百度搜索(www.baidu.com)结果首尾的推广广告、二次顽固广告与右侧广告，并防止反复
// @description:en     Just Kill Baidu AD
// @description:zh-TW  徹底清理百度搜索(www.baidu.com)結果首尾的推廣廣告、二次頑固廣告與右側廣告，並防止反復
// @author             hoothin
// @include            http*://www.baidu.com/*
// @include            http*://m.baidu.com/*
// @grant              none
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
    var MO = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if(MO){
        var observer = new MO(function(records){
            clearAD();
        });
        var option = {
            'childList': true,
            'subtree': true
        };
        document.onreadystatechange = function(){
            if(document.readyState == "interactive"){
                observer.observe(document.body, option);
            }
        };
    }

    function clearAD(){
        var mAds=document.querySelectorAll(".ec_wise_ad,.ec_youxuan_card,.page-banner"),i;
        for(i=0;i<mAds.length;i++){
            var mAd=mAds[i];
            mAd.remove();
        }
        var list=document.body.querySelectorAll("#content_left>div,#content_left>table");
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
                [].forEach.call(item.querySelectorAll("a>span"),function(span){
                    if(span && (span.innerHTML=="广告" || span.getAttribute("data-tuiguang"))){
                        item.remove();
                    }
                });
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
    setTimeout(()=>{clearAD();},500);
    setTimeout(()=>{clearAD();},2000);
})();