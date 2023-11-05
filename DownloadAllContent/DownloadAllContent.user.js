// ==UserScript==
// @name         DownloadAllContent
// @name:zh-CN   怠惰小说下载器
// @name:zh-TW   怠惰小説下載器
// @name:ja      怠惰者小説ダウンロードツール
// @namespace    hoothin
// @version      2.7.5.7
// @description  Fetch and download main textual content from the current page, provide special support for novels
// @description:zh-CN  通用网站内容抓取工具，可批量抓取任意站点的小说、论坛内容等并保存为TXT文档
// @description:zh-TW  通用網站內容抓取工具，可批量抓取任意站點的小說、論壇內容等並保存為TXT文檔
// @description:ja     ユニバーサルサイトコンテンツクロールツール、クロール、フォーラム内容など
// @author       hoothin
// @match        http://*/*
// @match        https://*/*
// @match        ftp://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        unsafeWindow
// @license      MIT License
// @compatible        chrome
// @compatible        firefox
// @compatible        opera 未测试
// @compatible        safari 未测试
// @contributionURL https://ko-fi.com/hoothin
// @contributionAmount 1
// ==/UserScript==

if (window.top != window.self) {
    try {
        if (window.self.innerWidth < 250 || window.self.innerHeight < 250) {
            return;
        }
    } catch(e) {
        return;
    }
}

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.FileSaver = mod.exports;
  }
})(this, function () {
  "use strict";

  /*
  * FileSaver.js
  * A saveAs() FileSaver implementation.
  *
  * By Eli Grey, http://eligrey.com
  *
  * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
  * source  : http://purl.eligrey.com/github/FileSaver.js
  */
  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

  function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {
      autoBom: false
    };else if (typeof opts !== 'object') {
      console.warn('Deprecated: Expected third argument to be a object');
      opts = {
        autoBom: !opts
      };
    }

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xFEFF), blob], {
        type: blob.type
      });
    }

    return blob;
  }

  function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      saveAs(xhr.response, name, opts);
    };

    xhr.onerror = function () {
      console.error('could not download file');
    };

    xhr.send();
  }

  function corsEnabled(url) {
    var xhr = new XMLHttpRequest();

    xhr.open('HEAD', url, false);

    try {
      xhr.send();
    } catch (e) {}

    return xhr.status >= 200 && xhr.status <= 299;
  }


  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }


  var isMacOSWebView = _global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);
  var saveAs = _global.saveAs || (
  typeof window !== 'object' || window !== _global ? function saveAs() {}

  : 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? function saveAs(blob, name, opts) {
    var URL = _global.URL || _global.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener';

    if (typeof blob === 'string') {
      a.href = blob;

      if (a.origin !== location.origin) {
        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 4E4);

      setTimeout(function () {
        click(a);
      }, 0);
    }
  }
  : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
    name = name || blob.name || 'download';

    if (typeof blob === 'string') {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_blank';
        setTimeout(function () {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  : function saveAs(blob, name, opts, popup) {
    popup = popup || open('', '_blank');

    if (popup) {
      popup.document.title = popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name, opts);
    var force = blob.type === 'application/octet-stream';

    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
      var reader = new FileReader();

      reader.onloadend = function () {
        var url = reader.result;
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
        if (popup) popup.location.href = url;else location = url;
        popup = null;
      };

      reader.readAsDataURL(blob);
    } else {
      var URL = _global.URL || _global.webkitURL;
      var url = URL.createObjectURL(blob);
      if (popup) popup.location = url;else location.href = url;
      popup = null;

      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4E4);
    }
  });
  _global.saveAs = saveAs.saveAs = saveAs;

  if (typeof module !== 'undefined') {
    module.exports = saveAs;
  }
});

(function() {
    'use strict';
    var indexReg=/PART\b|^Prologue|Chapter\s*[\-_]?\d+|分卷|^序$|^序\s*[·言章]|^前\s*言|^附\s*[录錄]|^引\s*[言子]|^摘\s*要|^[楔契]\s*子|^后\s*记|^後\s*記|^附\s*言|^结\s*语|^結\s*語|^尾\s*[声聲]|^最終話|^最终话|^番\s*外|^\d+[\s\.、,，）\-_：:][^\d#\.]+$|^(\d|\s)*[第（]?\s*[\d〇零一二三四五六七八九十百千万萬-]+\s*[、）章节節回卷折篇幕集话話]/i;
    var innerNextPage=/^\s*(下一[页頁张張]|next\s*page|次のページ)/i;
    var lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    var rCats=[];
    var processFunc;
    var win=(typeof unsafeWindow=='undefined'? window : unsafeWindow);
    switch (lang){
        case "zh-CN":
        case "zh-SG":
            i18n={
                fetch:"开始下载小说【Ctrl+F9】",
                info:"来源：#t#\n本文是使用怠惰小说下载器（DownloadAllContent）下载的",
                error:"该段内容获取失败",
                downloading:"已下载完成 %s 段，剩余 %s 段<br>正在下载 %s",
                complete:"已全部下载完成，共 %s 段",
                del:"设置文本干扰码的CSS选择器",
                custom:"自定规则下载",
                customInfo:"输入网址或者章节CSS选择器",
                reSort:"按标题名重新排序章节",
                reSortUrl:"按网址重新排序章节",
                setting:"选项参数设置",
                searchRule:"搜索网站规则",
                abort:"跳过此章",
                save:"保存当前",
                saveAsMd:"存为 Markdown",
                downThreadNum:"设置同时下载的线程数",
                customTitle:"自定义章节标题，输入内页文字对应选择器",
                reSortDefault:"默认按页面中位置排序章节",
                reverse:"反转章节排序",
                saveBtn:"保存设置",
                saveOk:"保存成功",
                nextPage:"嗅探章节内分页",
                nextPageReg:"自定义分页正则",
                retainImage:"保留正文中图片的网址",
                minTxtLength:"当检测到的正文字数小于此数，则尝试重新抓取",
                showFilterList:"下载前显示章节筛选排序窗口",
                ok:"确定",
                close:"关闭",
                dacSortByPos:"按页内位置排序",
                dacSortByUrl:"按网址排序",
                dacSortByName:"按章节名排序",
                dacUseIframe:"使用 iframe 后台加载内容（慢速）",
                dacSetCustomRule:"修改规则",
                dacAddUrl:"添加章节",
                dacStartDownload:"下载选中"
            };
            break;
        case "zh-TW":
        case "zh-HK":
            i18n={
                fetch:"開始下載小說【Ctrl+F9】",
                info:"來源：#t#\n本文是使用怠惰小說下載器（DownloadAllContent）下載的",
                error:"該段內容獲取失敗",
                downloading:"已下載完成 %s 段，剩餘 %s 段<br>正在下載 %s",
                complete:"已全部下載完成，共 %s 段",
                del:"設置文本干擾碼的CSS選擇器",
                custom:"自訂規則下載",
                customInfo:"輸入網址或者章節CSS選擇器",
                reSort:"按標題名重新排序章節",
                reSortUrl:"按網址重新排序章節",
                setting:"選項參數設定",
                searchRule:"搜尋網站規則",
                abort:"跳過此章",
                save:"保存當前",
                saveAsMd:"存爲 Markdown",
                downThreadNum:"設置同時下載的綫程數",
                customTitle:"自訂章節標題，輸入內頁文字對應選擇器",
                reSortDefault:"預設依頁面中位置排序章節",
                reverse:"反轉章節排序",
                saveBtn:"儲存設定",
                saveOk:"儲存成功",
                nextPage:"嗅探章節內分頁",
                nextPageReg:"自訂分頁正規",
                retainImage:"保留內文圖片的網址",
                minTxtLength:"當偵測到的正文字數小於此數，則嘗試重新抓取",
                showFilterList:"下載前顯示章節篩選排序視窗",
                ok:"確定",
                close:"關閉",
                dacSortByPos:"依頁內位置排序",
                dacSortByUrl:"依網址排序",
                dacSortByName:"依章節名排序",
                dacUseIframe:"使用 iframe 背景載入內容（慢速）",
                dacSetCustomRule:"修改規則",
                dacAddUrl:"新增章節",
                dacStartDownload:"下載選取"
            };
            break;
        default:
            i18n={
                fetch:"Download [Ctrl+F9]",
                info:"Source: #t#\nThe TXT is downloaded by 'DownloadAllContent'",
                error:"Failed in downloading current chapter",
                downloading:"%s pages are downloaded, there are still %s pages left<br>Downloading %s ......",
                complete:"Completed! Get %s pages in total",
                del:"Set css selectors for ignore",
                custom:"Custom to download",
                customInfo:"Input urls OR sss selectors for chapter links",
                reSort:"ReSort by title",
                reSortUrl:"Resort by URLs",
                setting:"Open Setting",
                searchRule:"Search rule",
                abort:"Abort",
                save:"Save",
                saveAsMd:"Save as Markdown",
                downThreadNum:"Set threadNum for download",
                customTitle: "Customize the chapter title, enter the selector on inner page",
                reSortDefault: "Default sort by position in the page",
                reverse:"Reverse chapter ordering",
                saveBtn:"Save Setting",
                saveOk:"Save Over",
                nextPage:"Check next page in chapter",
                nextPageReg:"Custom RegExp of next page",
                retainImage:"Keep the URL of image if there are images in the text",
                minTxtLength:"Try to crawl again when the length of content is less than this",
                showFilterList: "Show chapter filtering and sorting window before downloading",
                ok:"OK",
                close:"Close",
                dacSortByPos:"Sort by position",
                dacSortByUrl:"Sort by URL",
                dacSortByName:"Sort by name",
                dacUseIframe: "Use iframe to load content in the background (slow)",
                dacSetCustomRule:"Modify rules",
                dacAddUrl:"Add Chapter",
                dacStartDownload:"Download selected"
            };
            break;
    }
    var firefox=navigator.userAgent.toLowerCase().indexOf('firefox')!=-1,curRequests=[],useIframe=false,iframeSandbox=false,iframeInit=false;
    var filterListContainer,txtDownContent,txtDownWords,txtDownQuit,dacLinksCon,dacUseIframe;

    const escapeHTMLPolicy = (win.trustedTypes && win.trustedTypes.createPolicy) ? win.trustedTypes.createPolicy('dac_default', {
        createHTML: (string, sink) => string
    }) : null;

    function createHTML(html) {
        return escapeHTMLPolicy ? escapeHTMLPolicy.createHTML(html) : html;
    }

    function str2Num(str) {
        str = str.replace(/^番\s*外/, "99999+").replace(/[一①Ⅰ壹]/g, "1").replace(/[二②Ⅱ贰]/g, "2").replace(/[三③Ⅲ叁]/g, "3").replace(/[四④Ⅳ肆]/g, "4").replace(/[五⑤Ⅴ伍]/g, "5").replace(/[六⑥Ⅵ陆]/g, "6").replace(/[七⑦Ⅶ柒]/g, "7").replace(/[八⑧Ⅷ捌]/g, "8").replace(/[九⑨Ⅸ玖]/g, "9").replace(/[十⑩Ⅹ拾]/g, "*10+").replace(/[百佰]/g, "*100+").replace(/[千仟]/g, "*1000+").replace(/[万萬]/g, "*10000+").replace(/\s/g, "").match(/[\d\*\+]+/);
        if (!str) return 0;
        str = str[0];
        let mul = str.match(/(\d*)\*(\d+)/);
        while(mul) {
            let result = parseInt(mul[1] || 1) * parseInt(mul[2]);
            str = str.replace(mul[0], result);
            mul = str.match(/(\d+)\*(\d+)/);
        }
        let plus = str.match(/(\d+)\+(\d+)/);
        while(plus) {
            let result = parseInt(plus[1]) + parseInt(plus[2]);
            str = str.replace(plus[0], result);
            plus = str.match(/(\d+)\+(\d+)/);
        }
        return parseInt(str);
    }

    var dragOverItem, dragFrom;
    function createLinkItem(aEle) {
        let item = document.createElement("div");
        item.innerHTML = createHTML(`
                <input type="checkbox" checked>
                <a class="dacLink" draggable="false" target="_blank" href="${aEle.href}">${aEle.innerText || "📄"}</a>
                <span>🖱️</span>
            `);
        item.title = aEle.innerText;
        item.setAttribute("draggable", "true");
        item.addEventListener("dragover", e => {
            e.preventDefault();
        });
        item.addEventListener("dragenter", e => {
            if (dragOverItem) dragOverItem.style.opacity = "";
            item.style.opacity = 0.3;
            dragOverItem = item;
        });
        item.addEventListener('dragstart', e => {
            dragFrom = item;
        });
        item.addEventListener('drop', e => {
            if (!dragFrom) return;
            if (e.clientX < item.getBoundingClientRect().left + 142) {
                dacLinksCon.insertBefore(dragFrom, item);
            } else {
                if (item.nextElementSibling) {
                    dacLinksCon.insertBefore(dragFrom, item.nextElementSibling);
                } else {
                    dacLinksCon.appendChild(dragFrom);
                }
            }
            e.preventDefault();
        });
        dacLinksCon.appendChild(item);
    }

    function filterList(list) {
        if (!GM_getValue("showFilterList")) {
            indexDownload(list);
            return;
        }
        if (filterListContainer) {
            filterListContainer.style.display = "";
            filterListContainer.classList.remove("customRule");
            dacLinksCon.innerHTML = createHTML("");
        } else {
            document.addEventListener('dragend', e => {
                if (dragOverItem) dragOverItem.style.opacity = "";
            }, true);
            filterListContainer = document.createElement("div");
            filterListContainer.id = "filterListContainer";
            filterListContainer.innerHTML = createHTML(`
                <div id="dacFilterBg" style="height: 100%; width: 100%; position: fixed; top: 0; z-index: 99998; opacity: 0.3; filter: alpha(opacity=30); background-color: #000;"></div>
                <div style="padding: 5px; box-sizing: border-box; overflow: hidden; width: 600px; height: auto; max-height: 80vh; min-height: 200px; position: fixed; left: 50%; top: 10%; margin-left: -300px; z-index: 99998; background-color: #ffffff; border: 1px solid #afb3b6; border-radius: 10px; opacity: 0.95; filter: alpha(opacity=95); box-shadow: 5px 5px 20px 0px #000;">
                    <div class="dacCustomRule">
                    ${i18n.custom}
                        <textarea id="dacCustomInput"></textarea>
                        <div class="fun">
                            <input id="dacConfirmRule" value="${i18n.ok}" type="button"/>
                            <input id="dacCustomClose" value="${i18n.close}" type="button"/>
                        </div>
                    </div>
                    <div class="sort">
                        <input id="dacSortByPos" value="${i18n.dacSortByPos}" type="button"/>
                        <input id="dacSortByUrl" value="${i18n.dacSortByUrl}" type="button"/>
                        <input id="dacSortByName" value="${i18n.dacSortByName}" type="button"/>
                    </div>
                    <div id="dacLinksCon" style="max-height: calc(80vh - 100px); min-height: 100px; display: grid; grid-template-columns: auto auto; width: 100%; overflow: auto; white-space: nowrap;"></div>
                    <p style="margin: 5px; text-align: center; font-size: 14px; height: 20px;"><input id="dacUseIframe" type="checkbox"/><label for="dacUseIframe"> ${i18n.dacUseIframe}</label></p>
                    <div class="fun">
                        <input id="dacSetCustomRule" value="${i18n.dacSetCustomRule}" type="button"/>
                        <input id="dacAddUrl" value="${i18n.dacAddUrl}" type="button"/>
                        <input id="dacStartDownload" value="${i18n.dacStartDownload}" type="button"/>
                        <input id="dacLinksClose" value="${i18n.close}" type="button"/>
                    </div>
                </div>`);
            let dacSortByPos = filterListContainer.querySelector("#dacSortByPos");
            let dacSortByUrl = filterListContainer.querySelector("#dacSortByUrl");
            let dacSortByName = filterListContainer.querySelector("#dacSortByName");
            let dacSetCustomRule = filterListContainer.querySelector("#dacSetCustomRule");
            let dacCustomInput = filterListContainer.querySelector("#dacCustomInput");
            let dacConfirmRule = filterListContainer.querySelector("#dacConfirmRule");
            let dacCustomClose = filterListContainer.querySelector("#dacCustomClose");
            let dacAddUrl = filterListContainer.querySelector("#dacAddUrl");
            let dacStartDownload = filterListContainer.querySelector("#dacStartDownload");
            let dacLinksClose = filterListContainer.querySelector("#dacLinksClose");
            let dacFilterBg = filterListContainer.querySelector("#dacFilterBg");
            dacUseIframe = filterListContainer.querySelector("#dacUseIframe");
            dacSortByPos.onclick = e => {
                let linkList = [].slice.call(dacLinksCon.children);
                if (linkList[0].children[1].href != list[0].href) {
                    list.reverse().forEach(a => {
                        for (let i = 0; i < linkList.length; i++) {
                            let link = linkList[i];
                            if (link.children[1].href == a.href) {
                                dacLinksCon.insertBefore(link, dacLinksCon.children[0]);
                            }
                        }
                    });
                } else {
                    list.forEach(a => {
                        for (let i = 0; i < linkList.length; i++) {
                            let link = linkList[i];
                            if (link.children[1].href == a.href) {
                                dacLinksCon.insertBefore(link, dacLinksCon.children[0]);
                            }
                        }
                    });
                }
            };
            dacSortByUrl.onclick = e => {
                let linkList = [].slice.call(dacLinksCon.children);
                linkList.sort((a, b) => {
                    const nameA = a.children[1].href.toUpperCase();
                    const nameB = b.children[1].href.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                if (linkList[0] == dacLinksCon.children[0]) {
                    linkList = linkList.reverse();
                }
                linkList.forEach(link => {
                    dacLinksCon.appendChild(link);
                });
            };
            dacSortByName.onclick = e => {
                let linkList = [].slice.call(dacLinksCon.children);
                linkList.sort((a, b) => {
                    return str2Num(a.innerText) - str2Num(b.innerText);
                });
                if (linkList[0] == dacLinksCon.children[0]) {
                    linkList = linkList.reverse();
                }
                linkList.forEach(link => {
                    dacLinksCon.appendChild(link);
                });
            };
            dacSetCustomRule.onclick = e => {
                filterListContainer.classList.add("customRule");
                dacCustomInput.value = GM_getValue("DACrules_" + document.domain) || "";
            };
            dacConfirmRule.onclick = e => {
                if (dacCustomInput.value) {
                    customDown(dacCustomInput.value);
                }
            };
            dacCustomClose.onclick = e => {
                filterListContainer.classList.remove("customRule");
            };
            dacAddUrl.onclick = e => {
                let addUrls = window.prompt(i18n.customInfo, "https://xxx.xxx/book-[20-99].html, https://xxx.xxx/book-[01-10].html");
                if (!addUrls || !/^http|^ftp/.test(addUrls)) return;
                let index = 1;
                [].forEach.call(addUrls.split(","), function(i) {
                    var curEle;
                    var varNum = /\[\d+\-\d+\]/.exec(i);
                    if (varNum) {
                        varNum = varNum[0].trim();
                    } else {
                        curEle = document.createElement("a");
                        curEle.href = i;
                        curEle.innerText = "Added Url";
                        createLinkItem(curEle);
                        return;
                    }
                    var num1 = /\[(\d+)/.exec(varNum)[1].trim();
                    var num2 = /(\d+)\]/.exec(varNum)[1].trim();
                    var num1Int = parseInt(num1);
                    var num2Int = parseInt(num2);
                    var numLen = num1.length;
                    var needAdd = num1.charAt(0) == "0";
                    if (num1Int >= num2Int) return;
                    for (var j = num1Int; j <= num2Int; j++) {
                        var urlIndex = j.toString();
                        if (needAdd) {
                            while(urlIndex.length < numLen) urlIndex = "0" + urlIndex;
                        }
                        var curUrl = i.replace(/\[\d+\-\d+\]/, urlIndex).trim();
                        curEle = document.createElement("a");
                        curEle.href = curUrl;
                        curEle.innerText = "Added Url " + index++;
                        createLinkItem(curEle);
                    }
                });
            };
            dacStartDownload.onclick = e => {
                let linkList = [].slice.call(dacLinksCon.querySelectorAll("input:checked+.dacLink"));
                useIframe = !!dacUseIframe.checked;
                indexDownload(linkList, true);
                filterListContainer.style.display = "none";
            };
            dacLinksClose.onclick = e => {
                filterListContainer.style.display = "none";
            };
            dacFilterBg.onclick = e => {
                filterListContainer.style.display = "none";
            };
            let listStyle = GM_addStyle(`
                #filterListContainer * {
                    font-size: 13px;
                    float: initial;
                    background-image: initial;
                    height: fit-content;
                }
                #filterListContainer.customRule .dacCustomRule {
                    display: flex;
                }
                #filterListContainer .dacCustomRule>textarea {
                    height: 300px;
                    width: 100%;
                    border: 1px #DADADA solid;
                    background: #ededed70;
                    margin: 5px;
                }
                #filterListContainer.customRule .dacCustomRule~* {
                    display: none!important;
                }
                #dacLinksCon>div {
                    padding: 5px 0;
                    display: flex;
                }
                #dacLinksCon>div>a {
                    max-width: 245px;
                    display: inline-block;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                #dacLinksCon>div>input {
                    margin-right: 5px;
                }
                #filterListContainer .dacCustomRule {
                    border-radius: 8px;
                    font-weight: bold;
                    font-size: 16px;
                    outline: none;
                    align-items: center;
                    flex-wrap: nowrap;
                    white-space: nowrap;
                    flex-direction: column;
                    display: none;
                }
                #filterListContainer input {
                    border-width: 2px;
                    border-style: outset;
                    border-color: buttonface;
                    border-image: initial;
                    border: 1px #DADADA solid;
                    padding: 5px;
                    border-radius: 8px;
                    font-weight: bold;
                    font-size: 9pt;
                    outline: none;
                    cursor: pointer;
                    line-height: initial;
                    width: initial;
                    min-width: initial;
                    max-width: initial;
                    height: initial;
                    min-height: initial;
                    max-height: initial;
                }
                #dacLinksCon>div:nth-of-type(4n),
                #dacLinksCon>div:nth-of-type(4n+1) {
                    background: #ffffff;
                }
                #dacLinksCon>div:nth-of-type(4n+2),
                #dacLinksCon>div:nth-of-type(4n+3) {
                    background: #f5f5f5;
                }
                #filterListContainer .fun,#filterListContainer .sort {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: nowrap;
                    width: 100%;
                    height: 28px;
                }
                #filterListContainer input[type=button]:hover {
                    border: 1px #C6C6C6 solid;
                    box-shadow: 1px 1px 1px #EAEAEA;
                    color: #333333;
                    background: #F7F7F7;
                }
                #filterListContainer input[type=button]:active {
                    box-shadow: inset 1px 1px 1px #DFDFDF;
                }
            `);
            dacLinksCon = filterListContainer.querySelector("#dacLinksCon");
            let shadowContainer = document.createElement("div");
            document.body.appendChild(shadowContainer);
            let shadow = shadowContainer.attachShadow({ mode: "open" });
            shadow.appendChild(listStyle);
            shadow.appendChild(filterListContainer);
        }
        list.forEach(a => {
            createLinkItem(a);
        });
        dacUseIframe.checked = useIframe;
    }

    function initTxtDownDiv(){
        if(txtDownContent){
            txtDownContent.style.display="";
            return;
        }
        txtDownContent=document.createElement("div");
        txtDownContent.id="txtDownContent";
        let shadowContainer = document.createElement("div");
        document.body.appendChild(shadowContainer);
        let shadow = shadowContainer.attachShadow({ mode: "open" });
        shadow.appendChild(txtDownContent);
        txtDownContent.innerHTML=createHTML(`
            <div style="font-size:16px;color:#333333;width:362px;height:110px;position:fixed;left:50%;top:50%;margin-top:-25px;margin-left:-191px;z-index:100000;background-color:#ffffff;border:1px solid #afb3b6;border-radius:10px;opacity:0.95;filter:alpha(opacity=95);box-shadow:5px 5px 20px 0px #000;">
                <div id="txtDownWords" style="position:absolute;width:275px;height: 90px;max-height: 90%;border: 1px solid #f3f1f1;padding: 8px;border-radius: 10px;overflow: auto;">
                    Analysing......
                </div>
                <div id="txtDownQuit" style="width: 30px;height: 30px;border-radius: 30px;position:absolute;right:2px;top:2px;cursor: pointer;background-color:#ff5a5a;">
                    <span style="height: 30px;line-height: 30px;display:block;color:#FFF;text-align:center;font-size: 12px;font-weight: bold;font-family: arial;background: initial; float: initial;">╳</span>
                </div>
                <div style="position:absolute;right:0px;bottom:2px;cursor: pointer;max-width:85px">
                    <button id="abortRequest" style="background: #008aff;border: 0;padding: 5px;border-radius: 6px;color: white;float: right;margin: 1px;height: 25px;display:none;line-height: 16px;">${getI18n('abort')}</button>
                    <button id="tempSaveTxt" style="background: #008aff;border: 0;padding: 5px;border-radius: 6px;color: white;float: right;margin: 1px;height: 25px;line-height: 16px;cursor: pointer;">${getI18n('save')}</button>
                    <button id="saveAsMd" style="background: #008aff;border: 0;padding: 5px;border-radius: 6px;color: white;float: right;margin: 1px;height: 25px;line-height: 16px;cursor: pointer;overflow: hidden;" title="${getI18n('saveAsMd')}">Markdown</button>
                </div>
            </div>`);
        txtDownWords=txtDownContent.querySelector("#txtDownWords");
        txtDownQuit=txtDownContent.querySelector("#txtDownQuit");
        txtDownQuit.onclick=function(){
            txtDownContent.style.display="none";
        };
        initTempSave(txtDownContent);
    }

    function saveContent() {
        if (win.downloadAllContentSaveAsZip) {
            win.downloadAllContentSaveAsZip(rCats, i18n.info.replace("#t#", location.href), content => {
                saveAs(content, document.title + ".zip");
            });
        } else {
            var blob = new Blob([i18n.info.replace("#t#", location.href) + "\r\n\r\n" + document.title + "\r\n\r\n" + rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title + ".txt");
        }
    }

    function initTempSave(txtDownContent){
        var tempSavebtn = txtDownContent.querySelector('#tempSaveTxt');
        var abortbtn = txtDownContent.querySelector('#abortRequest');
        var saveAsMd = txtDownContent.querySelector('#saveAsMd');
        tempSavebtn.onclick = function(){
            saveContent();
            console.log(curRequests);
        }
        abortbtn.onclick = function(){
            let curRequest = curRequests.pop();
            if(curRequest)curRequest[1].abort();
        }
        saveAsMd.onclick = function(){
            let txt = i18n.info.replace("#t#", location.href)+"\n\n---\n"+document.title+"\n===\n";
            rCats.forEach(cat => {
                cat = cat.replace("\r\n", "\n---").replace(/(\r\n|\n\r)+/g, "\n\n").replace(/[\n\r]\t+/g, "\n");
                txt += '\n\n'+cat;
            });
            var blob = new Blob([txt], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".md");
        }
    }

    let charset = (document.characterSet || document.charset || document.inputEncoding);
    let equiv = document.querySelector('[http-equiv="Content-Type"]'), charsetValid = true;
    if (equiv && equiv.content) {
        let innerCharSet = equiv.content.match(/charset\=([^;]+)/);
        if (!innerCharSet) {
            charsetValid = false;
        } else if (innerCharSet[1].replace("-", "").toLowerCase() != charset.replace("-", "").toLowerCase()) {
            charsetValid = false;
        }
    } else charsetValid = false;
    function indexDownload(aEles, noSort){
        if(aEles.length<1)return;
        initTxtDownDiv();
        if(!noSort) {
            if(GM_getValue("contentSort")){
                aEles.sort((a, b) => {
                    return str2Num(a.innerText) - str2Num(b.innerText);
                });
            }
            if(GM_getValue("contentSortUrl")){
                aEles.sort((a, b) => {
                    const nameA = a.href.toUpperCase();
                    const nameB = b.href.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            }
            if(GM_getValue("reverse")){
                aEles=aEles.reverse();
            }
        }
        rCats=[];
        var minTxtLength=GM_getValue("minTxtLength") || 100;
        var customTitle=GM_getValue("customTitle");
        var disableNextPage=!!GM_getValue("disableNextPage");
        var customNextPageReg=GM_getValue("nextPageReg");
        if (customNextPageReg) {
            try {
                innerNextPage = new RegExp(customNextPageReg);
            } catch(e) {
                console.warn(e);
            }
        }
        var insertSigns=[];
        // var j=0,rCats=[];
        var downIndex=0,downNum=0,downOnce=function(wait){
            if(downNum>=aEles.length)return;
            let curIndex=downIndex;
            let aTag=aEles[curIndex];
            let request=(aTag, curIndex)=>{
                let tryTimes=0;
                let validTimes=0;
                function requestDoc(_charset) {
                    if (!_charset) _charset = charset;
                    return GM_xmlhttpRequest({
                        method: 'GET',
                        url: aTag.href,
                        headers:{
                            referer:aTag.href,
                            "Content-Type":"text/html;charset="+_charset
                        },
                        timeout:10000,
                        overrideMimeType:"text/html;charset="+_charset,
                        onload: function(result) {
                            let doc = getDocEle(result.responseText);
                            if (charsetValid) {
                                let equiv = doc.querySelector('[http-equiv="Content-Type"]');
                                if (equiv && equiv.content) {
                                    let innerCharSet = equiv.content.match(/charset\=([^;]+)/);
                                    if (innerCharSet && innerCharSet[1].replace("-", "").toLowerCase() != _charset.replace("-", "").toLowerCase()) {
                                        charset = innerCharSet[1];
                                        return requestDoc(charset);
                                    }
                                }
                            }
                            downIndex++;
                            downNum++;
                            if (/^{/.test(result.responseText)) {
                                doc.json = () => {
                                    try {
                                        return JSON.parse(result.responseText);
                                    } catch(e) {}
                                    return {};
                                }
                            }
                            let base = doc.querySelector("base");
                            let nextPage = !disableNextPage && !processFunc && checkNextPage(doc, base ? base.href : aTag.href);
                            if(nextPage){
                                var inArr=false;
                                for(var ai=0;ai<aEles.length;ai++){
                                    if(aEles[ai].href==nextPage.href){
                                        inArr=true;
                                        break;
                                    }
                                }
                                if(!inArr){
                                    nextPage.innerText=aTag.innerText+"\t>>";
                                    aEles.push(nextPage);
                                    let targetIndex = curIndex;
                                    for(let a=0;a<insertSigns.length;a++){
                                        let signs=insertSigns[a],breakSign=false;
                                        if(signs){
                                            for(let b=0;b<signs.length;b++){
                                                let sign=signs[b];
                                                if(sign==curIndex){
                                                    targetIndex=a;
                                                    breakSign=true;
                                                    break;
                                                }
                                            }
                                        }
                                        if(breakSign)break;
                                    }
                                    let insertSign = insertSigns[targetIndex];
                                    if(!insertSign)insertSigns[targetIndex] = [];
                                    insertSigns[targetIndex].push(aEles.length-1);
                                }
                            }
                            if (result.status >= 400) {
                                console.warn("error:", `status: ${result.status} from: ${aTag.href}`);
                            } else {
                                console.log(result.status);
                            }
                            if (customTitle) {
                                try {
                                    let title = doc.querySelector(customTitle);
                                    if (title && title.innerText) {
                                        aTag.innerText = title.innerText;
                                    }
                                } catch(e) {
                                    console.warn(e);
                                }
                            }
                            let validData = processDoc(curIndex, aTag, doc, (result.status>=400?` status: ${result.status} from: ${aTag.href} `:""), validTimes < 5);
                            if (!validData && validTimes++ < 5) {
                                downIndex--;
                                downNum--;
                                setTimeout(() => {
                                    requestDoc();
                                }, 500);
                                return;
                            }
                            if (wait) {
                                setTimeout(() => {
                                    downOnce(wait);
                                }, wait);
                            } else downOnce();
                        },
                        onerror: function(e) {
                            console.warn("error:", e);
                            if(tryTimes++ < 5){
                                setTimeout(() => {
                                    requestDoc();
                                }, 500);
                                return;
                            }
                            downIndex++;
                            downNum++;
                            processDoc(curIndex, aTag, null, ` NETWORK ERROR: ${(e.response||e.responseText)} from: ${aTag.href} `);
                            if (wait) {
                                setTimeout(() => {
                                    downOnce(wait);
                                }, wait);
                            } else downOnce();
                        },
                        ontimeout: function(e) {
                            console.warn("timeout: times="+tryTimes+" url="+aTag.href);
                            //console.log(e);
                            if(tryTimes++ < 5){
                                setTimeout(() => {
                                    requestDoc();
                                }, 500);
                                return;
                            }
                            downIndex++;
                            downNum++;
                            processDoc(curIndex, aTag, null, ` TIMEOUT: ${aTag.href} `);
                            if (wait) {
                                setTimeout(() => {
                                    downOnce(wait);
                                }, wait);
                            } else downOnce();
                        }
                    });
                };
                if (useIframe) {
                    let iframe = document.createElement('iframe'), inited = false;
                    iframe.name = 'pagetual-iframe';
                    iframe.width = '100%';
                    iframe.height = '1000';
                    iframe.frameBorder = '0';
                    iframe.sandbox = iframeSandbox || "allow-same-origin allow-scripts allow-popups allow-forms";
                    iframe.style.cssText = 'margin:0!important;padding:0!important;visibility:hidden!important;flex:0;opacity:0!important;pointer-events:none!important;position:fixed;top:0px;left:0px;z-index:-2147483647;';
                    iframe.addEventListener('load', e => {
                        if (e.data != 'pagetual-iframe:DOMLoaded' && e.type != 'load') return;
                        if (inited) return;
                        inited = true;
                        function checkIframe() {
                            try {
                                let doc = iframe.contentDocument || iframe.contentWindow.document;
                                if (!doc || !doc.body) {
                                    setTimeout(() => {
                                        checkIframe();
                                    }, 1000);
                                    return;
                                }
                                doc.body.scrollTop = 9999999;
                                doc.documentElement.scrollTop = 9999999;
                                if (!processFunc && validTimes++ > 5) {
                                    iframe.src = iframe.src;
                                    validTimes = 0;
                                    inited = false;
                                    return;
                                }
                                if (customTitle) {
                                    try {
                                        let title = doc.querySelector(customTitle);
                                        if (title && title.innerText) {
                                            aTag.innerText = title.innerText;
                                        }
                                    } catch(e) {
                                        console.warn(e);
                                    }
                                }
                                downIndex++;
                                downNum++;
                                let validData = processDoc(curIndex, aTag, doc, "", true);
                                if (!validData) {
                                    downIndex--;
                                    downNum--;
                                    setTimeout(() => {
                                        checkIframe();
                                    }, 1000);
                                    return;
                                }
                                if (wait) {
                                    setTimeout(() => {
                                        downOnce(wait);
                                    }, wait);
                                } else downOnce();
                            } catch(e) {
                                console.debug("Stop as cors");
                            }
                            if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
                        }
                        setTimeout(() => {
                            checkIframe();
                        }, 500);
                    }, false);
                    let checkReady = setInterval(() => {
                        let doc;
                        try {
                            doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
                        } catch(e) {
                            clearInterval(checkReady);
                            return;
                        }
                        if (doc) {
                            try {
                                Function('win', 'iframe', '"use strict";' + (iframeInit || "win.self=win.top;"))(iframe.contentWindow, iframe);
                                clearInterval(checkReady);
                            } catch(e) {
                                console.debug(e);
                            }
                        }
                    }, 50);
                    iframe.src = aTag.href;
                    document.body.appendChild(iframe);
                    return [curIndex, null, aTag.href];
                } else {
                    return [curIndex, requestDoc(), aTag.href];
                }
            }
            if(!aTag){
                let waitAtagReadyInterval=setInterval(function(){
                    if(downNum>=aEles.length)clearInterval(waitAtagReadyInterval);
                    aTag=aEles[curIndex];
                    if(aTag){
                        clearInterval(waitAtagReadyInterval);
                        request(aTag, curIndex);
                    }
                },1000);
                return null;
            }
            let result = request(aTag, curIndex);
            if (result) curRequests.push(result);
            return result;
        };
        function getDocEle(str){
            var doc = null;
            try {
                doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = str;
            }
            catch (e) {
                console.log('parse error');
            }
            return doc;
        }
        function sortInnerPage(){
            var pageArrs=[],maxIndex=0,i,j;
            for(i=0;i<insertSigns.length;i++){
                var signs=insertSigns[i];
                if(signs){
                    for(j=0;j<signs.length;j++){
                        var sign=signs[j];
                        var cat=rCats[sign];
                        rCats[sign]=null;
                        if(!pageArrs[i])pageArrs[i]=[];
                        pageArrs[i].push(cat);
                    }
                }
            }
            for(i=pageArrs.length-1;i>=0;i--){
                let pageArr=pageArrs[i];
                if(pageArr){
                    for(j=pageArr.length-1;j>=0;j--){
                        rCats.splice(i+1, 0, pageArr[j]);
                    }
                }
            }
            rCats = rCats.filter(function(e){return e!=null});
        }
        var waitForComplete;
        function processDoc(i, aTag, doc, cause, check){
            let cbFunc=content=>{
                rCats[i]=(aTag.innerText.replace(/[\r\n\t]/g, "") + "\r\n" + (cause || '') + content.replace(/\s*$/, ""));
                curRequests = curRequests.filter(function(e){return e[0]!=i});
                txtDownContent.style.display="block";
                txtDownWords.innerHTML=getI18n("downloading",[downNum,(aEles.length-downNum),aTag.innerText]);
                if(downNum==aEles.length){
                    if(waitForComplete) clearTimeout(waitForComplete);
                    waitForComplete=setTimeout(()=>{
                        if(downNum==aEles.length){
                            txtDownWords.innerHTML=getI18n("complete",[downNum]);
                            sortInnerPage();
                            saveContent();
                        }
                    },3000);
                }
            };
            let contentResult=getPageContent(doc, content=>{
                cbFunc(content);
            }, aTag.href);
            if(contentResult!==false){
                if(check && contentResult && contentResult.replace(/\s/g, "").length<minTxtLength){
                    return false;
                }
                cbFunc(contentResult);
            }
            return true;
        }
        var downThreadNum = parseInt(GM_getValue("downThreadNum"));
        downThreadNum = downThreadNum || 20;
        if (useIframe && downThreadNum > 5) {
            downThreadNum = 5;
        }
        if (downThreadNum > 0) {
            for (var i = 0; i < downThreadNum; i++) {
                downOnce();
                if (downIndex >= aEles.length - 1 || downIndex >= downThreadNum - 1) break;
                else downIndex++;
            }
        } else {
            downOnce(-downThreadNum * 1000);
            if (downIndex < aEles.length - 1 && downIndex < downThreadNum - 1) downIndex++;
        }

        /*for(let i=0;i<aEles.length;i++){
            let aTag=aEles[i];
            GM_xmlhttpRequest({
                method: 'GET',
                url: aTag.href,
                overrideMimeType:"text/html;charset="+document.charset,
                onload: function(result) {
                    var doc = getDocEle(result.responseText);
                    processDoc(i, aTag, doc);
                }
            });
        }*/
    }

    function canonicalUri(src, baseUrl) {
        if (!src) {
            return "";
        }
        if (src.charAt(0) == "#") return baseUrl + src;
        if (src.charAt(0) == "?") return baseUrl.replace(/^([^\?#]+).*/, "$1" + src);
        let origin = location.protocol + '//' + location.host;
        let url = baseUrl || origin;
        url = url.replace(/(\?|#).*/, "");
        if (/https?:\/\/[^\/]+$/.test(url)) url = url + '/';
        if (url.indexOf("http") !== 0) url = origin + url;
        var root_page = /^[^\?#]*\//.exec(url)[0],
            root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
            absolute_regex = /^\w+\:\/\//;
        while (src.indexOf("../") === 0) {
            src = src.substr(3);
            root_page = root_page.replace(/\/[^\/]+\/$/, "/");
        }
        src = src.replace(/\.\//, "");
        if (/^\/\/\/?/.test(src)) {
            src = location.protocol + src;
        }
        return (absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src));
    }

    function checkNextPage(doc, baseUrl) {
        let aTags = doc.querySelectorAll("a"), nextPage = null;
        for (var i = 0; i < aTags.length; i++) {
            let aTag = aTags[i];
            if (innerNextPage.test(aTag.innerText) && aTag.href && !/javascript:|#/.test(aTag.href)) {
                let nextPageHref = canonicalUri(aTag.getAttribute("href"), baseUrl || location.href);
                if (nextPageHref != location.href) {
                    nextPage = aTag;
                    nextPage.href = nextPageHref;
                    break;
                }
            }
        }
        return nextPage;
    }

    function textNodesUnder(el){
        var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
        while(n=walk.nextNode()) a.push(n);
        return a;
    }

    function getPageContent(doc, cb, url){
        if(!doc)return i18n.error;
        if(processFunc){
            return processFunc(doc, cb, url);
        }
        [].forEach.call(doc.querySelectorAll("span,div,ul"),function(item){
            var thisStyle=doc.defaultView?doc.defaultView.getComputedStyle(item):item.style;
            if(thisStyle && (thisStyle.display=="none" || (item.nodeName=="SPAN" && thisStyle.fontSize=="0px"))){
                item.innerHTML="";
            }
        });
        var i,j,k,rStr="",pageData=(doc.body?doc.body:doc).cloneNode(true),delList=[];
        pageData.innerHTML=pageData.innerHTML.replace(/\<\!\-\-((.|[\n|\r|\r\n])*?)\-\-\>/g,"");
        [].forEach.call(pageData.querySelectorAll("font.jammer"),function(item){
            item.innerHTML="";
        });
        var selectors=GM_getValue("selectors");
        if(selectors){
            [].forEach.call(pageData.querySelectorAll(selectors),function(item){
                item.innerHTML="";
            });
        }
        [].forEach.call(pageData.querySelectorAll("script,style,link,img,noscript,iframe"),function(item){delList.push(item);});
        [].forEach.call(delList,function(item){item.innerHTML="";});
        var endEle = ele => {
            return /^(I|STRONG|B|FONT|P|DL|DD|H\d)$/.test(ele.nodeName) && ele.children.length <= 1;
        };
        var largestContent,contents=pageData.querySelectorAll("span,div,article,p,td,pre"),largestNum=0;
        for(i=0;i<contents.length;i++){
            let content=contents[i],hasText=false,allSingle=true,item,curNum=0;
            if(/footer/.test(content.className))continue;
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==3){
                    if(/^\s*$/.test(item.data)){
                        item.innerHTML="";
                    }else hasText=true;
                }else if(/^(I|A|STRONG|B|FONT|P|DL|DD|H\d)$/.test(item.nodeName)){
                    hasText=true;
                }else if(item.nodeType==1&&item.children.length==1&&/^(I|A|STRONG|B|FONT|P|DL|DD|H\d)$/.test(item.children[0].nodeName)){
                    hasText=true;
                }
            }
            for(j=content.childNodes.length-1;j>=0;j--){
                item=content.childNodes[j];
                if(item.nodeType==1 && !/^(I|A|STRONG|B|FONT|BR)$/.test(item.nodeName) && /^[\s\-\_\?\>\|]*$/.test(item.innerHTML)){
                    item.innerHTML="";
                }
            }
            if(content.childNodes.length>1){
                let indexItem=0;
                for(j=0;j<content.childNodes.length;j++){
                    item=content.childNodes[j];
                    if(item.nodeType==1){
                        if(item.innerText && item.innerText.length<50 && indexReg.test(item.innerText))indexItem++;
                        for(k=0;k<item.childNodes.length;k++){
                            var childNode=item.childNodes[k];
                            if(childNode.nodeType!=3 && !/^(I|A|STRONG|B|FONT|BR)$/.test(childNode.nodeName)){
                                allSingle=false;
                                break;
                            }
                        }
                        if(!allSingle)break;
                    }
                }
                if(indexItem>=5)continue;
            }else{
                allSingle=false;
            }
            if(!allSingle && !hasText){
                continue;
            }else {
                if(pageData==document && content.offsetWidth<=0 && content.offsetHeight<=0){
                    continue;
                }
                [].forEach.call(content.childNodes,function(item){
                    if(item.nodeType==3)curNum+=item.data.trim().length;
                    else if(endEle(item) || (item.nodeType == 1 && item.children.length == 1 && endEle(item.children[0]))) curNum += (firefox ? item.textContent.trim().length : item.innerText.trim().length);
                });
            }
            if(curNum>largestNum){
                largestNum=curNum;
                largestContent=content;
            }
        }
        if(!largestContent)return i18n.error+" : NO TEXT CONTENT";
        var retainImage=!!GM_getValue("retainImage");
        var childlist=pageData.querySelectorAll(largestContent.nodeName);//+(largestContent.className?"."+largestContent.className.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, '.'):""));
        function getRightStr(ele, noTextEnable){
            if(retainImage){
                [].forEach.call(ele.querySelectorAll("img[src]"), img => {
                    let imgTxtNode=document.createTextNode(`![img](${canonicalUri(img.getAttribute("src"), url || location.href)})`);
                    img.parentNode.replaceChild(imgTxtNode, img);
                });
            }
            let childNodes=ele.childNodes,cStr="\r\n",hasText=false;
            [].forEach.call(ele.querySelectorAll("a[href]"), a => {
                a.parentNode && a.parentNode.removeChild(a);
            });
            for(let j=0;j<childNodes.length;j++){
                let childNode=childNodes[j];
                if(childNode.nodeType==3 && childNode.data && !/^[\s\-\_\?\>\|]*$/.test(childNode.data))hasText=true;
                if(childNode.innerHTML){
                    childNode.innerHTML=childNode.innerHTML.replace(/\<\s*br\s*\>/gi,"\r\n").replace(/\n+/gi,"\n").replace(/\r+/gi,"\r");
                }
                let content=childNode.textContent;
                if(content){
                    if(!content.trim())continue;
                    cStr+=content.replace(/ +/g," ").replace(/([^\r]|^)\n([^\r]|$)/gi,"$1\r\n$2");
                }
                if(childNode.nodeType!=3 && !/^(I|A|STRONG|B|FONT|IMG)$/.test(childNode.nodeName))cStr+="\r\n";
            }
            if(hasText || noTextEnable || ele==largestContent)rStr+=cStr+"\r\n";
        }
        for(i=0;i<childlist.length;i++){
            var child=childlist[i];
            if(getDepth(child)==getDepth(largestContent)){
                if(largestContent.className != child.className)continue;
                if((largestContent.className && largestContent.className == child.className) || largestContent.parentNode == child.parentNode){
                    getRightStr(child, true);
                }else {
                    getRightStr(child, false);
                }
            }
        }
        return rStr.replace(/[\n\r]+/g,"\n\r");
    }

    function getI18n(key, args){
        var resultStr=i18n[key];
        if(args && args.length>0){
            args.forEach(function(item){
                resultStr=resultStr.replace(/%s/,item);
            });
        }
        return resultStr;
    }

    function getDepth(dom){
        var pa=dom,i=0;
        while(pa.parentNode){
            pa=pa.parentNode;
            i++;
        }
        return i;
    }

    function fetch(forceSingle){
        forceSingle=forceSingle===true;
        processFunc=null;
        var aEles=document.body.querySelectorAll("a"),list=[];
        for(var i=0;i<aEles.length;i++){
            var aEle=aEles[i],has=false;
            if((!aEle.href || aEle.href.indexOf("javascript")!=-1) && aEle.dataset.href){
                aEle.href=aEle.dataset.href;
            }
            if(aEle.href==location.href)continue;
            for(var j=0;j<list.length;j++){
                if(list[j].href==aEle.href){
                    aEle=list[j];
                    list.splice(j,1);
                    list.push(aEle);
                    has=true;
                    break;
                }
            }
            if(!has && aEle.href && /^http/i.test(aEle.href) && ((aEle.innerText.trim()!="" && indexReg.test(aEle.innerText.trim())) || /chapter[\-_]?\d/.test(aEle.href))){
                list.push(aEle);
            }
        }
        if(list.length>2 && !forceSingle){
            useIframe = false;
            filterList(list);
        }else{
            var blob = new Blob([i18n.info.replace("#t#", location.href)+"\r\n\r\n"+document.title+"\r\n\r\n"+getPageContent(document)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title+".txt");
        }
    }

    function customDown(urls){
        processFunc = null;
        useIframe = false;
        if(urls){
            urls=decodeURIComponent(urls.replace(/%/g,'%25'));
            GM_setValue("DACrules_"+document.domain, urls);
            var processEles=[];
            let urlsArr=urls.split("@@"),eles=[];
            if(/^http|^ftp/.test(urlsArr[0])){
                [].forEach.call(urlsArr[0].split(","),function(i){
                    var curEle;
                    var varNum=/\[\d+\-\d+\]/.exec(i);
                    if(varNum){
                        varNum=varNum[0].trim();
                    }else{
                        curEle=document.createElement("a");
                        curEle.href=i;
                        curEle.innerText="Added Url";
                        processEles.push(curEle);
                        return;
                    }
                    var num1=/\[(\d+)/.exec(varNum)[1].trim();
                    var num2=/(\d+)\]/.exec(varNum)[1].trim();
                    var num1Int=parseInt(num1);
                    var num2Int=parseInt(num2);
                    var numLen=num1.length;
                    var needAdd=num1.charAt(0)=="0";
                    if(num1Int>=num2Int)return;
                    for(var j=num1Int;j<=num2Int;j++){
                        var urlIndex=j.toString();
                        if(needAdd){
                            while(urlIndex.length<numLen)urlIndex="0"+urlIndex;
                        }
                        var curUrl=i.replace(/\[\d+\-\d+\]/,urlIndex).trim();
                        curEle=document.createElement("a");
                        curEle.href=curUrl;
                        curEle.innerText="Added Url " + processEles.length.toString();
                        processEles.push(curEle);
                    }
                });
            }else{
                let urlSel=urlsArr[0].split(">>");
                try{
                    eles=document.querySelectorAll(urlSel[0]);
                    eles=[].filter.call(eles, ele=>{
                        return ele.nodeName=='BODY'||(!!ele.offsetParent&&getComputedStyle(ele).display!=='none');
                    })
                }catch(e){}
                if(eles.length==0){
                    eles=[];
                    var eleTxts=urlsArr[0].split(/(?<=[^\\])[,，]/),exmpEles=[],excludeTxts={};
                    [].forEach.call(document.querySelectorAll("a"),function(item){
                        if(!item.offsetParent)return;
                        eleTxts.forEach(txt=>{
                            var txtArr=txt.split("!");
                            if(item.innerText.indexOf(txtArr[0])!=-1){
                                exmpEles.push(item);
                                excludeTxts[item]=txtArr.splice(1);
                            }
                        });
                    })
                    exmpEles.forEach(e=>{
                        var cssSelStr="a",pa=e.parentNode,excludeTxt=excludeTxts[e];
                        if(e.className)cssSelStr+="."+CSS.escape(e.className);
                        while(pa && pa.nodeName!="BODY"){
                            cssSelStr=pa.nodeName+">"+cssSelStr;
                            pa=pa.parentNode;
                        }
                        cssSelStr="body>"+cssSelStr;;
                        [].forEach.call(document.querySelectorAll(cssSelStr),function(item){
                            if(!item.offsetParent)return;
                            var isExclude=false;
                            for(var t in excludeTxt){
                                if(item.innerText.indexOf(excludeTxt[t])!=-1){
                                    isExclude=true;
                                    break;
                                }
                            }
                            if(!isExclude && eles.indexOf(item)==-1){
                                eles.push(item);
                            }
                        });
                    });
                }
                function addItem(item) {
                    let has=false;
                    for(var j=0;j<processEles.length;j++){
                        if(processEles[j].href==item.href){
                            processEles.splice(j,1);
                            processEles.push(item);
                            has=true;
                            break;
                        }
                    }
                    if((!item.href || item.href.indexOf("javascript")!=-1) && item.dataset.href){
                        item.href=item.dataset.href;
                    }
                    if(!has && item.href && /^http/i.test(item.href)){
                        processEles.push(item.cloneNode(1));
                    }
                }
                [].forEach.call(eles,function(item){
                    if(urlSel[1]){
                        item=Function("item",urlSel[1])(item);
                        let items;
                        if (Array.isArray(item)) {
                            items = item;
                        } else items = [item];
                        items.forEach(item => {
                            if(!item || !item.href)return;
                            if(!item.nodeName || item.nodeName!="A"){
                                let href=item.href;
                                let innerText=item.innerText;
                                item=document.createElement("a");
                                item.href=href;
                                item.innerText=innerText;
                            }
                            addItem(item);
                        });
                    } else {
                        addItem(item);
                    }
                });
            }
            if(urlsArr[1]){
                processEles.forEach(ele=>{
                    ele.href=ele.href.replace(new RegExp(urlsArr[1]), urlsArr[2]);
                });
            }
            var retainImage=!!GM_getValue("retainImage");
            var evalCode = urlsArr[3];
            if (evalCode && /^iframe:/.test(evalCode.trim())) {
                evalCode = evalCode.trim().replace("iframe:", "");
                useIframe = true;
                iframeSandbox = false;
                iframeInit = false;
                while (/^(sandbox|init):/.test(evalCode)) {
                    iframeSandbox = evalCode.match(/^sandbox:{(.*?)}/);
                    if (iframeSandbox) {
                        iframeSandbox = iframeSandbox[1];
                        evalCode = evalCode.replace(/^sandbox:{(.*?)}/, "");
                    }
                    iframeInit = evalCode.match(/^init:{(.*?)}/);
                    if (iframeInit) {
                        iframeInit = iframeInit[1];
                        evalCode = evalCode.replace(/^init:{(.*?)}/, "");
                    }
                }
            }
            if(evalCode){
                processFunc=(data, cb, url)=>{
                    let doc=data;
                    if(evalCode.indexOf("return ")==-1){
                        if(evalCode.indexOf("@")==0){
                            let content="";
                            if(retainImage){
                                [].forEach.call(data.querySelectorAll("img[src]"), img => {
                                    let imgTxt=`![img](${canonicalUri(img.getAttribute("src"), location.href)})`;
                                    let imgTxtNode=document.createTextNode(imgTxt);
                                    img.parentNode.replaceChild(imgTxtNode, img);
                                });
                            }
                            [].forEach.call(data.querySelectorAll(evalCode.slice(1)), ele=>{
                                [].forEach.call(ele.childNodes, child=>{
                                    if(child.innerHTML){
                                        child.innerHTML=child.innerHTML.replace(/\<\s*br\s*\>/gi,"\r\n").replace(/\n+/gi,"\n").replace(/\r+/gi,"\r");
                                    }
                                    if(child.textContent){
                                        content+=(child.textContent.replace(/ +/g," ").replace(/([^\r]|^)\n([^\r]|$)/gi,"$1\r\n$2")+"\r\n");
                                    }
                                });
                                content+="\r\n";
                            });
                            return content;
                        }else return eval(evalCode);
                    }else{
                        return Function("data", "doc", "cb", "url", evalCode)(data, doc, cb, url);
                    }
                };
            }else{
                if(win.dacProcess){
                    processFunc=win.dacProcess;
                }
            }
            filterList(processEles);
        }
    }
    const configPage = "https://hoothin.github.io/UserScripts/DownloadAllContent/";
    const copySvg = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style="transition: all ease 0.5s;top: 5px;right: 5px;position: absolute;cursor: pointer;"><title>Copy</title><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
    function searchRule(){
        GM_openInTab(configPage + "#@" + location.hostname, {active: true});
    }
    if (location.origin + location.pathname == configPage) {
        let exampleNode = document.getElementById("example");
        if (!exampleNode) return;

        exampleNode = exampleNode.parentNode;
        let ruleList = exampleNode.nextElementSibling.nextElementSibling;
        let searchInput = document.createElement("input");
        let inputTimer;
        function searchByInput() {
            clearTimeout(inputTimer);
            inputTimer = setTimeout(() => {
                let curValue = searchInput.value;
                let matchRules = [];
                let dontMatchRules = [];
                if (curValue) {
                    for (let i = 0; i < ruleList.children.length; i++) {
                        let curRule = ruleList.children[i];
                        let aHref = curRule.firstChild.href;
                        if (aHref.indexOf(curValue) == -1) {
                            dontMatchRules.push(curRule);
                        } else {
                            matchRules.push(curRule);
                        }
                    }
                } else {
                    dontMatchRules = ruleList.children;
                }
                if (matchRules.length) {
                    for (let i = 0; i < dontMatchRules.length; i++) {
                        let curRule = dontMatchRules[i];
                        curRule.style.display = "none";
                    }
                    for (let i = 0; i < matchRules.length; i++) {
                        let curRule = matchRules[i];
                        curRule.style.display = "";
                    }
                } else {
                    for (let i = 0; i < dontMatchRules.length; i++) {
                        let curRule = dontMatchRules[i];
                        curRule.style.display = "";
                    }
                }
            }, 500);
        }
        searchInput.style.margin = "10px";
        searchInput.style.width = "100%";
        searchInput.placeholder = i18n.searchRule;
        searchInput.addEventListener("input", function(e) {
            searchByInput();
        });
        if (location.hash) {
            let hash = location.hash.slice(1);
            if (hash.indexOf("@") == 0) {
                setTimeout(() => {
                    exampleNode.scrollIntoView();
                }, 500);
                searchInput.value = hash.slice(1);
                searchByInput();
            }
        }
        [].forEach.call(ruleList.querySelectorAll("div.highlight"), highlight => {
            highlight.style.position = "relative";
            highlight.innerHTML = highlight.innerHTML + copySvg;
            let svg = highlight.children[1];
            svg.addEventListener("click", function(e) {
                GM_setClipboard(highlight.children[0].innerText);
                svg.style.opacity = 0;
                setTimeout(() => {
                    svg.style.opacity = 1;
                }, 1000);
            });
        });
        exampleNode.parentNode.insertBefore(searchInput, ruleList);


        let donateNode = document.querySelector("[alt='donate']");
        if (!donateNode) return;
        let insertPos = donateNode.parentNode.nextElementSibling;
        let radioIndex = 0;
        function createOption(_name, _value, _type) {
            if (!_type) _type = "input";
            let con = document.createElement("div");
            let option = document.createElement("input");
            let cap = document.createElement("b");
            option.type = _type;
            option.value = _value;
            option.checked = _value;
            cap.style.margin = "0px 10px 0px 0px";
            if (_type == "radio") {
                let label = document.createElement("label");
                label.innerText = _name;
                radioIndex++;
                option.id = "radio" + radioIndex;
                label.setAttribute("for", option.id);
                cap.appendChild(label);
            } else {
                if (_type == "input") {
                    option.style.flexGrow = "1";
                }
                cap.innerText = _name;
            }
            con.style.margin = "10px 0";
            con.style.display = "flex";
            con.style.alignItems = "center";
            con.appendChild(cap);
            con.appendChild(option);
            insertPos.parentNode.insertBefore(con, insertPos);
            return option;
        }
        let delSelector = createOption(i18n.del, GM_getValue("selectors") || "");
        delSelector.setAttribute("placeHolder", ".mask,.ksam");
        let downThreadNum = createOption(i18n.downThreadNum, GM_getValue("downThreadNum") || "20", "number");
        let customTitle = createOption(i18n.customTitle, GM_getValue("customTitle") || "");
        customTitle.setAttribute("placeHolder", "title");
        let minTxtLength = createOption(i18n.minTxtLength, GM_getValue("minTxtLength") || "100", "number");
        let contentSortUrlValue = GM_getValue("contentSortUrl") || false;
        let contentSortValue = GM_getValue("contentSort") || false;
        let reSortDefault = createOption(i18n.reSortDefault, !contentSortUrlValue && !contentSortValue, "radio");
        let reSortUrl = createOption(i18n.reSortUrl, contentSortUrlValue || false, "radio");
        let contentSort = createOption(i18n.reSort, contentSortValue || false, "radio");
        reSortDefault.name = "sort";
        reSortUrl.name = "sort";
        contentSort.name = "sort";
        let reverse = createOption(i18n.reverse, !!GM_getValue("reverse"), "checkbox");
        let retainImage = createOption(i18n.retainImage, !!GM_getValue("retainImage"), "checkbox");
        let showFilterList = createOption(i18n.showFilterList, !!GM_getValue("showFilterList"), "checkbox");
        let disableNextPage = !!GM_getValue("disableNextPage");
        let nextPage = createOption(i18n.nextPage, !disableNextPage, "checkbox");
        let nextPageReg = createOption(i18n.nextPageReg, GM_getValue("nextPageReg") || "");
        nextPageReg.setAttribute("placeHolder", "^\\s*(下一[页頁张張]|next\\s*page|次のページ)");
        if (disableNextPage) {
            nextPageReg.parentNode.style.display = "none";
        }
        nextPage.onclick = e => {
            nextPageReg.parentNode.style.display = nextPage.checked ? "flex" : "none";
        }
        let saveBtn = document.createElement("button");
        saveBtn.innerText = i18n.saveBtn;
        saveBtn.style.margin = "0 0 20px 0";
        insertPos.parentNode.insertBefore(saveBtn, insertPos);
        saveBtn.onclick = e => {
            GM_setValue("selectors", delSelector.value || "");
            GM_setValue("downThreadNum", downThreadNum.value || 20);
            GM_setValue("minTxtLength", minTxtLength.value || 100);
            GM_setValue("customTitle", customTitle.value || "");
            if (reSortUrl.checked) {
                GM_setValue("contentSortUrl", true);
                GM_setValue("contentSort", false);
            } else if (contentSort.checked) {
                GM_setValue("contentSortUrl", false);
                GM_setValue("contentSort", true);
            } else {
                GM_setValue("contentSortUrl", false);
                GM_setValue("contentSort", false);
            }
            GM_setValue("reverse", reverse.checked);
            GM_setValue("retainImage", retainImage.checked);
            GM_setValue("showFilterList", showFilterList.checked);
            GM_setValue("disableNextPage", !nextPage.checked);
            GM_setValue("nextPageReg", nextPageReg.value || "");
            alert(i18n.saveOk);
        };
        return;
    }

    function setDel(){
        GM_openInTab(configPage + "#操作說明", {active: true});
        /*var selValue=GM_getValue("selectors");
        var selectors=prompt(i18n.del,selValue?selValue:"");
        GM_setValue("selectors",selectors);
        selValue=GM_getValue("downThreadNum");
        var downThreadNum=prompt(i18n.downThreadNum,selValue?selValue:"20");
        GM_setValue("downThreadNum",downThreadNum);
        var sortByUrl=window.confirm(i18n.reSortUrl);
        GM_setValue("contentSortUrl",sortByUrl);
        if(!sortByUrl)GM_setValue("contentSort",window.confirm(i18n.reSort));*/
    }

    document.addEventListener("keydown", function(e) {
        if(e.keyCode == 120 && e.ctrlKey) {
            fetch(e.shiftKey);
        }
    });
    GM_registerMenuCommand(i18n.custom, () => {
        var customRules = GM_getValue("DACrules_" + document.domain);
        var urls = window.prompt(i18n.customInfo, customRules ? customRules : "https://xxx.xxx/book-[20-99].html, https://xxx.xxx/book-[01-10].html");
        if (urls) {
            customDown(urls);
        }
    });
    GM_registerMenuCommand(i18n.fetch, fetch);
    GM_registerMenuCommand(i18n.setting, setDel);
    GM_registerMenuCommand(i18n.searchRule, searchRule);
})();
