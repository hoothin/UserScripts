// ==UserScript==
// @name               Kill Baidu AD
// @name:zh-CN         百度广告(首尾推广及右侧广告)清理
// @name:zh-TW         百度廣告(首尾推廣及右側廣告)清理
// @namespace          hoothin
// @version            1.23.2
// @description        Kill Baidu AD
// @description:zh-CN  彻底清理百度搜索(www.baidu.com)结果首尾的推广广告、二次顽固广告、右侧广告，去除重定向，刪除百家号
// @description:zh-TW  徹底清理百度搜索(www.baidu.com)結果首尾的推廣廣告、二次頑固廣告、右側廣告，去除重定向，刪除百家號
// @author             hoothin
// @match              *://www.baidu.com/*
// @match              *://m.baidu.com/*
// @grant              GM_xmlhttpRequest
// @run-at             document-start
// @license            MIT License
// @compatible         chrome 测试通过
// @compatible         firefox 测试通过
// @compatible         opera 未测试
// @compatible         safari 未测试
// ==/UserScript==

(function() {
    'use strict';
    var MO = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, killBaijiaType = 1;
    if (MO) {
        var observer = new MO(function(records) {
            records.map(function(record) {
                if (record.addedNodes.length) {
                    [].forEach.call(record.addedNodes, function(addedNode) {
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

    function checkBaijia(item) {
        var itemHref = item.querySelector("a").href;
        item.style.display = "none";
        if (itemHref.indexOf("baidu.com") == -1) return;
        var gmxhr = GM_xmlhttpRequest({
            url: itemHref,
            headers: {
                "Accept": "text/html"
            },
            method: "head",
            onreadystatechange: function(response) {
                if (response.readyState == 4) {
                    if (response.finalUrl.indexOf("baijiahao.baidu.com") != -1) {
                        item.remove();
                    } else {
                        item.style.display = "";
                    }
                    gmxhr.abort();
                }
            }
        });
    }

    function checkLeftItem(item) {
        let mu = item.getAttribute("mu");
        if (mu) {
            if (/^https:\/\/baijiahao\.baidu\.com/.test(mu)) {
                item.remove();
                return;
            } else {
                let link = item.querySelector("a[href*='www.baidu.com/link']");
                if (link) link.href = mu;
            }
        }
        let s = item.getAttribute("style");
        if (s && /display:(table|block)\s!important/.test(s)) {
            item.remove();
        } else {
            let baozhang = item.querySelector("[data-baodata]");
            if (baozhang) {
                item.remove();
                return;
            }
            var span = item.querySelector("div>span");
            if (span && span.innerHTML == "广告") {
                item.remove();
            }
            [].forEach.call(item.querySelectorAll("span,a"), function(span) {
                if (span && (span.innerHTML == "广告" || span.getAttribute("data-tuiguang"))) {
                    item.remove();
                }
            });
            if (killBaijiaType == 2) {
                [].forEach.call(item.querySelectorAll("a>div>span+img"), function(img) {
                    if (img && /^https?:\/\/pic\.rmb\.bdstatic\.com/.test(img.src)) {
                        //checkBaijia(item);
                        item.remove();
                    }
                });
            }
        }
    }

    function checkRightTable(item) {
        for (let i = 0; i < item.length; i++) {
            let d = item[i];
            if (d.id != "con-ar") {
                d.remove();
            }
        }
    }

    function checkRightAd(item) {
        var nra = item.querySelectorAll("a");
        for (let i = 0; i < nra.length; i++) {
            let d = nra[i];
            if (d.innerHTML == "广告") {
                item.remove();
                break;
            }
        }
    }

    function removeEcAd(ele) {
        var mAds = ele.querySelectorAll(".ec_wise_ad,.ec_youxuan_card,.page-banner");
        for (let i = 0; i < mAds.length; i++) {
            let mAd = mAds[i];
            mAd.remove();
        }
        var baiduapp = ele.querySelector("#copyright+div");
        if (baiduapp && baiduapp.querySelector("[ref='open']")) {
            baiduapp.remove();
        }
    }

    function clearAD() {
        if (!document.querySelectorAll) return;
        removeEcAd(document);
        var list = document.querySelectorAll("#content_left>div,#content_left>table");
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            checkLeftItem(item);
        }

        var eb = document.querySelectorAll("#content_right>table>tbody>tr>td>div");
        checkRightTable(eb);

        var nr = document.querySelector("#content_right>div>div>div");
        if (nr) {
            checkRightAd(nr);
        }
    }

    function clearOneAD(ele) {
        if (ele.nodeType != 1) return;
        if (ele.classList.contains("ec-tuiguang") || ele.classList.contains("ec_wise_ad") || ele.classList.contains("ec_youxuan_card") || ele.classList.contains("page-banner")) {
            ele.remove();
            return;
        }
        if (ele.parentNode && ele.parentNode.id == "content_left" && (ele.nodeName == "DIV" || ele.nodeName == "TABLE")) {
            checkLeftItem(ele);
        } else if (ele.parentNode && ele.parentNode.id == "content_right") {
            if (ele.nodeName == "TABLE") {
                var eb = ele.querySelectorAll("tbody>tr>td>div");
                checkRightTable(eb);
            }
            if (ele.nodeName == "DIV") {
                var nr = ele.querySelector("div>div");
                if (nr) {
                    checkRightAd(nr);
                }
            }
        } else {
            removeEcAd(ele);
            let eles = ele.querySelectorAll("#content_left>div,#content_left>table");
            [].forEach.call(eles, e => {clearOneAD(e)});
        }
    }
    if (document.readyState == "complete" || document.readyState == "interactive") {
        clearAD();
    } else {
        document.addEventListener("readystatechange", e => {
            if (document.readyState == "complete" || document.readyState == "interactive") {
                clearAD();
            }
        });
    }
})();