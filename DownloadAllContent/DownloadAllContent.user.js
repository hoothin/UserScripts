// ==UserScript==
// @name         DownloadAllContent
// @name:zh-CN   怠惰小说下载器
// @name:zh-TW   怠惰小説下載器
// @name:ja      怠惰者小説ダウンロードツール
// @namespace    hoothin
// @version      2.8.3.15
// @description  Lightweight web scraping script. Fetch and download main textual content from the current page, provide special support for novels
// @description:zh-CN  通用网站内容爬虫抓取工具，可批量抓取任意站点的小说、论坛内容等并保存为TXT文档
// @description:zh-TW  通用網站內容爬蟲抓取工具，可批量抓取任意站點的小說、論壇內容等並保存為TXT文檔
// @description:ja     軽量なWebスクレイピングスクリプト。ユニバーサルサイトコンテンツクロールツール、クロール、フォーラム内容など
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
    var indexReg=/^(\w.*)?PART\b|^Prologue|^(\w.*)?Chapter\s*[\-_]?\d+|分卷|^序$|^序\s*[·言章]|^前\s*言|^附\s*[录錄]|^引\s*[言子]|^摘\s*要|^[楔契]\s*子|^后\s*记|^後\s*記|^附\s*言|^结\s*语|^結\s*語|^尾\s*[声聲]|^最終話|^最终话|^番\s*外|^\d+[\s\.、,，）\-_：:][^\d#\.]|^(\d|\s|\.)*[第（]?\s*[\d〇零一二两三四五六七八九十百千万萬-]+\s*[、）章节節回卷折篇幕集话話]/i;
    var innerNextPage=/^\s*(下一[页頁张張]|next\s*page|次のページ)/i;
    var lang=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n={};
    var rCats=[];
    var processFunc, nextPageFunc;
    const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
    var win=(typeof unsafeWindow=='undefined'?window:unsafeWindow);
    switch (lang){
        case "zh-CN":
        case "zh-SG":
            i18n={
                fetch:"开始下载小说",
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
                saveAsJSON: "存为 JSON",
                downThreadNum:"设置同时下载的线程数，负数为单线程下载间隔",
                enableTouch:"在移动端按→↓←↑的方向滑动屏幕画正方形立即开始下载",
                customTitle:"自定义章节标题，输入内页文字对应选择器",
                saveUrl: "储存 URL",
                disableAutoStartSave: "禁用自动保存",
                maxDlPerMin:"每分钟最大下载数",
                reSortDefault:"默认按页面中位置排序章节",
                reverseOrder:"反转章节排序",
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
                reverse:"反选",
                dacUseIframe:"使用 iframe 后台加载内容（慢速）",
                dacSaveAsZip:"下载为 zip",
                dacSetCustomRule:"修改规则",
                dacAddUrl:"添加章节",
                prefix:"给章节名称添加前缀",
                dacStartDownload:"下载选中",
                downloadShortcut:"下载章节快捷键",
                downloadSingleShortcut:"下载单页快捷键",
                downloadCustomShortcut:"自定义下载快捷键"
            };
            break;
        case "zh":
        case "zh-TW":
        case "zh-HK":
            i18n={
                fetch:"開始下載小說",
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
                saveAsJSON: "存爲 JSON",
                downThreadNum:"設置同時下載的綫程數，負數為單線程下載間隔",
                enableTouch:"在行動端按→↓←↑的方向滑動螢幕畫方立即開始下載",
                customTitle:"自訂章節標題，輸入內頁文字對應選擇器",
                saveUrl: "儲存 URL",
                disableAutoStartSave: "禁用自動保存",
                maxDlPerMin:"每分鐘最大下載數",
                reSortDefault:"預設依頁面中位置排序章節",
                reverseOrder:"反轉章節排序",
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
                reverse:"反選",
                dacUseIframe:"使用 iframe 背景載入內容（慢速）",
                dacSaveAsZip:"下載為 zip",
                dacSetCustomRule:"修改規則",
                dacAddUrl:"新增章節",
                prefix:"為章節名稱加上前綴",
                dacStartDownload:"下載選取",
                downloadShortcut:"下載章節快速鍵",
                downloadSingleShortcut:"下載單頁快速鍵",
                downloadCustomShortcut:"自設下載快速鍵"
            };
            break;
        case "ar":
        case "ar-AE":
        case "ar-BH":
        case "ar-DZ":
        case "ar-EG":
        case "ar-IQ":
        case "ar-JO":
        case "ar-KW":
        case "ar-LB":
        case "ar-LY":
        case "ar-MA":
        case "ar-OM":
        case "ar-QA":
        case "ar-SA":
        case "ar-SY":
        case "ar-TN":
        case "ar-YE":
            i18n={
                encode: true,
                fetch: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84",
                info: "%D8%A7%D9%84%D9%85%D8%B5%D8%AF%D8%B1:%20#t#%0A%D8%AA%D9%85%20%D8%AA%D9%86%D8%B2%D9%8A%D9%84%20%D8%A7%D9%84%D9%80%20TXT%20%D8%A8%D9%88%D8%A7%D8%B3%D8%B7%D8%A9%20'DownloadAllContent'",
                error: "%D9%81%D8%B4%D9%84%20%D9%81%D9%8A%20%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D9%81%D8%B5%D9%84%20%D8%A7%D9%84%D8%AD%D8%A7%D9%84%D9%8A",
                downloading: "......%25s%20%D8%AA%D8%AD%D9%85%D9%8A%D9%84%3Cbr%3E%D8%B5%D9%81%D8%AD%D8%A7%D8%AA%20%D9%85%D8%AA%D8%A8%D9%82%D9%8A%D8%A9%20%25s%20%D8%B5%D9%81%D8%AD%D8%A7%D8%AA%20%D8%AA%D9%85%20%D8%AA%D8%AD%D9%85%D9%8A%D9%84%D9%87%D8%A7%D8%8C%20%D9%87%D9%86%D8%A7%D9%83%20%25s",
                complete: "%D8%B5%D9%81%D8%AD%D8%A7%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%85%D8%AC%D9%85%D9%88%D8%B9%20%25s%20%D8%A7%D9%83%D8%AA%D9%85%D9%84!%20%D8%AD%D8%B5%D9%84%D8%AA%20%D8%B9%D9%84%D9%89",
                del: "%D9%84%D8%AA%D8%AC%D8%A7%D9%87%D9%84%20CSS%20%D8%AA%D8%B9%D9%8A%D9%8A%D9%86%20%D9%85%D8%AD%D8%AF%D8%AF%D8%A7%D8%AA",
                custom: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D9%85%D8%AE%D8%B5%D8%B5",
                customInfo: "%D9%84%D8%B1%D9%88%D8%A7%D8%A8%D8%B7%20%D8%A7%D9%84%D9%81%D8%B5%D9%88%D9%84%20sss%20%D8%A5%D8%AF%D8%AE%D8%A7%D9%84%20%D8%A7%D9%84%D8%B1%D9%88%D8%A7%D8%A8%D8%B7%20%D8%A3%D9%88%20%D9%85%D8%AD%D8%AF%D8%AF%D8%A7%D8%AA",
                reSort: "%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D8%AD%D8%B3%D8%A8%20%D8%A7%D9%84%D8%B9%D9%86%D9%88%D8%A7%D9%86",
                reSortUrl: "%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D8%AD%D8%B3%D8%A8%20%D8%A7%D9%84%D8%B1%D9%88%D8%A7%D8%A8%D8%B7",
                setting: "%D9%81%D8%AA%D8%AD%20%D8%A7%D9%84%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D8%A7%D8%AA",
                searchRule: "%D9%82%D8%A7%D8%B9%D8%AF%D8%A9%20%D8%A7%D9%84%D8%A8%D8%AD%D8%AB",
                abort: "%D8%A5%D9%8A%D9%82%D8%A7%D9%81",
                save: "%D8%AD%D9%81%D8%B8",
                saveAsMd: "Markdown%20%D8%AD%D9%81%D8%B8%20%D9%83%D9%80",
                saveAsJSON: "JSON%20%D8%AD%D9%81%D8%B8%20%D9%83%D9%80",
                downThreadNum: "%D8%AA%D8%B9%D9%8A%D9%8A%D9%86%20%D8%B9%D8%AF%D8%AF%20%D8%A7%D9%84%D8%AE%D9%8A%D9%88%D8%B7%20%D9%84%D9%84%D8%AA%D8%AD%D9%85%D9%8A%D9%84",
                enableTouch: "On%20the%20mobile%20device,%20slide%20the%20screen%20in%20the%20direction%20of%20%E2%86%92%E2%86%93%E2%86%90%E2%86%91%20to%20draw%20a%20square%20will%20start%20downloading%20immediately",
                customTitle: "%D8%AA%D8%AE%D8%B5%D9%8A%D8%B5%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%D8%A7%D9%84%D9%81%D8%B5%D9%84%D8%8C%20%D8%A5%D8%AF%D8%AE%D8%A7%D9%84%20%D8%A7%D9%84%D9%85%D8%AD%D8%AF%D8%AF%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AF%D8%A7%D8%AE%D9%84%D9%8A%D8%A9",
                saveUrl: "%D8%AD%D9%81%D8%B8%20URL",
                disableAutoStartSave: "%D8%AA%D8%B9%D8%B7%D9%8A%D9%84%20%D8%A7%D9%84%D8%AD%D9%81%D8%B8%20%D8%A7%D9%84%D8%AA%D9%84%D9%82%D8%A7%D8%A6%D9%8A",
                maxDlPerMin: "%D8%A7%D9%84%D8%AD%D8%AF%20%D8%A7%D9%84%D8%A3%D9%82%D8%B5%D9%89%20%D9%84%D8%B9%D8%AF%D8%AF%20%D8%A7%D9%84%D8%AA%D9%86%D8%B2%D9%8A%D9%84%D8%A7%D8%AA%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AF%D9%82%D9%8A%D9%82%D8%A9",
                reSortDefault: "%D8%A7%D9%84%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D8%A7%D9%84%D8%A7%D9%81%D8%AA%D8%B1%D8%A7%D8%B6%D9%8A%20%D8%AD%D8%B3%D8%A8%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9",
                reverseOrder: "%D8%B9%D9%83%D8%B3%20%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D8%A7%D9%84%D9%81%D8%B5%D9%88%D9%84",
                saveBtn: "%D8%AD%D9%81%D8%B8%20%D8%A7%D9%84%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D8%A7%D8%AA",
                saveOk: "%D8%AA%D9%85%20%D8%A7%D9%84%D8%AD%D9%81%D8%B8",
                nextPage: "%D8%A7%D9%84%D8%AA%D8%AD%D9%82%D9%82%20%D9%85%D9%86%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%81%D8%B5%D9%84",
                nextPageReg: "%D9%85%D8%AE%D8%B5%D8%B5%20%D9%84%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D8%A7%D9%84%D9%8A%D8%A9%20RegExp",
                retainImage: "%D8%A7%D9%84%D8%A7%D8%AD%D8%AA%D9%81%D8%A7%D8%B8%20%D8%A8%D8%B9%D9%86%D9%88%D8%A7%D9%86%20%D8%A7%D9%84%D8%B5%D9%88%D8%B1%D8%A9%20%D8%A5%D8%B0%D8%A7%20%D9%83%D8%A7%D9%86%D8%AA%20%D9%87%D9%86%D8%A7%D9%83%20%D8%B5%D9%88%D8%B1%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%86%D8%B5",
                minTxtLength: "%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D9%88%D9%84%D8%A9%20%D9%85%D8%B1%D8%A9%20%D8%A3%D8%AE%D8%B1%D9%89%20%D8%B9%D9%86%D8%AF%D9%85%D8%A7%20%D9%8A%D9%83%D9%88%D9%86%20%D8%B7%D9%88%D9%84%20%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D9%88%D9%89%20%D8%A3%D9%82%D9%84%20%D9%85%D9%86%20%D9%87%D8%B0%D8%A7",
                showFilterList: "%D8%B9%D8%B1%D8%B6%20%D9%86%D8%A7%D9%81%D8%B0%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B5%D9%81%D9%8A%D8%A9%20%D9%88%D8%A7%D9%84%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D9%82%D8%A8%D9%84%20%D8%A7%D9%84%D8%AA%D8%AD%D9%85%D9%8A%D9%84",
                ok: "%D9%85%D9%88%D8%A7%D9%81%D9%82",
                close: "%D8%A5%D8%BA%D9%84%D8%A7%D9%82",
                dacSortByPos: "%D8%A7%D9%84%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D8%AD%D8%B3%D8%A8%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9",
                dacSortByUrl: "%D8%A7%D9%84%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D8%AD%D8%B3%D8%A8%20%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B7",
                dacSortByName: "%D8%A7%D9%84%D8%AA%D8%B1%D8%AA%D9%8A%D8%A8%20%D8%AD%D8%B3%D8%A8%20%D8%A7%D9%84%D8%A7%D8%B3%D9%85",
                reverse: "%D8%B9%D9%83%D8%B3%20%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1",
                dacUseIframe: "%D9%84%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D9%85%D8%AD%D8%AA%D9%88%D9%89%20(%D8%A8%D8%B7%D9%8A%D8%A1)%20iframe%20%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85",
                dacSaveAsZip: "zip%20%D8%AD%D9%81%D8%B8%20%D9%83%D9%80",
                dacSetCustomRule: "%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF",
                dacAddUrl: "%D8%A5%D8%B6%D8%A7%D9%81%D8%A9%20%D9%81%D8%B5%D9%84",
                prefix:"Prefix%20of%20chapter%20name",
                dacStartDownload: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D9%85%D8%AD%D8%AF%D8%AF",
                downloadShortcut: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%A7%D9%84%D9%81%D8%B5%D9%84",
                downloadSingleShortcut: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D8%B5%D9%81%D8%AD%D8%A9%20%D9%88%D8%A7%D8%AD%D8%AF%D8%A9",
                downloadCustomShortcut: "%D8%AA%D8%AD%D9%85%D9%8A%D9%84%20%D9%85%D8%AE%D8%B5%D8%B5"
            };
            break;
        default:
            i18n={
                fetch:"Download",
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
                saveAsJSON: "Save as JSON",
                downThreadNum:"Set threadNum for download, negative means interval of single thread",
                enableTouch:"On the mobile device, slide the screen in the direction of →↓←↑ to draw a square will start downloading immediately",
                customTitle: "Customize the chapter title, enter the selector on inner page",
                saveUrl: "Save URL",
                disableAutoStartSave: "Disable auto save",
                maxDlPerMin:"Maximum number of downloads per minute",
                reSortDefault: "Default sort by position in the page",
                reverseOrder:"Reverse chapter ordering",
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
                reverse:"Reverse selection",
                dacUseIframe: "Use iframe to load content (slow)",
                dacSaveAsZip: "Save as zip",
                dacSetCustomRule:"Modify rules",
                dacAddUrl:"Add Chapter",
                prefix:"Prefix of chapter name",
                dacStartDownload:"Download selected",
                downloadShortcut:"Download chapter Shortcut",
                downloadSingleShortcut:"Download single page Shortcut",
                downloadCustomShortcut:"Custom download Shortcut"
            };
            break;
    }
    if (i18n.encode) {
        for (let k in i18n) {
            if (k != "encode") {
                i18n[k] = decodeURI(i18n[k]);
            }
        }
    }
    var firefox=navigator.userAgent.toLowerCase().indexOf('firefox')!=-1,curRequests=[],useIframe=false,iframeSandbox=false,iframeInit=false;
    var filterListContainer,txtDownContent,txtDownWords,txtDownQuit,dacLinksCon,dacUseIframe,shadowContainer,downTxtShadowContainer;

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

    var dragOverItem, dragFrom, linkDict;
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
        linkDict[aEle.href] = item;
        dacLinksCon.appendChild(item);
    }

    var saveAsZip = true;
    function filterList(list) {
        if (!GM_getValue("showFilterList")) {
            indexDownload(list);
            return;
        }
        if (txtDownContent) {
            txtDownContent.style.display = "none";
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
                <div id="dacFilterBg" style="height: 100%; width: 100%; position: fixed; top: 0; z-index: 2147483646; opacity: 0.3; filter: alpha(opacity=30); background-color: #000;"></div>
                <div id="filterListBody">
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
                        <input id="reverse" value="${i18n.reverse}" type="button"/>
                    </div>
                    <div id="dacLinksCon" style="max-height: calc(80vh - 100px); min-height: 100px; display: grid; grid-template-columns: auto auto; width: 100%; overflow: auto; white-space: nowrap;"></div>
                    <p style="margin: 5px; text-align: center; font-size: 14px; height: 20px;"><span><input id="dacUseIframe" type="checkbox"/><label for="dacUseIframe"> ${i18n.dacUseIframe}</label></span> <span style="display:${win.downloadAllContentSaveAsZip ? "inline" : "none"}"><input id="dacSaveAsZip" type="checkbox" checked="checked"/><label for="dacSaveAsZip"> ${i18n.dacSaveAsZip}</label></span></p>
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
            let reverse = filterListContainer.querySelector("#reverse");
            let dacSetCustomRule = filterListContainer.querySelector("#dacSetCustomRule");
            let dacCustomInput = filterListContainer.querySelector("#dacCustomInput");
            let dacConfirmRule = filterListContainer.querySelector("#dacConfirmRule");
            let dacCustomClose = filterListContainer.querySelector("#dacCustomClose");
            let dacAddUrl = filterListContainer.querySelector("#dacAddUrl");
            let dacStartDownload = filterListContainer.querySelector("#dacStartDownload");
            let dacLinksClose = filterListContainer.querySelector("#dacLinksClose");
            let dacFilterBg = filterListContainer.querySelector("#dacFilterBg");
            let dacSaveAsZip = filterListContainer.querySelector("#dacSaveAsZip");
            dacUseIframe = filterListContainer.querySelector("#dacUseIframe");
            dacSaveAsZip.onchange = e => {
                saveAsZip = dacSaveAsZip.checked;
            };
            dacSortByPos.onclick = e => {
                let linkList = [].slice.call(dacLinksCon.children);
                if (linkList[0].children[1].href != list[0].href) {
                    list.reverse().forEach(a => {
                        let link = linkDict[a.href];
                        if (!link) return;
                        dacLinksCon.insertBefore(link, dacLinksCon.children[0]);
                    });
                } else {
                    list.forEach(a => {
                        let link = linkDict[a.href];
                        if (!link) return;
                        dacLinksCon.insertBefore(link, dacLinksCon.children[0]);
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
            reverse.onclick = e => {
                let linkList = [].slice.call(dacLinksCon.children);
                linkList.forEach(link => {
                    link.children[0].checked=!link.children[0].checked;
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
                    color: black;
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
                #filterListBody {
                    padding: 5px;
                    box-sizing: border-box;
                    overflow: hidden;
                    width: 600px;
                    height: auto;
                    max-height: 80vh;
                    min-height: 200px;
                    position: fixed;
                    left: 50%;
                    top: 10%;
                    margin-left: -300px;
                    z-index: 2147483646;
                    background-color: #ffffff;
                    border: 1px solid #afb3b6;
                    border-radius: 10px;
                    opacity: 0.95;
                    filter: alpha(opacity=95);
                    box-shadow: 5px 5px 20px 0px #000;
                }
                @media screen and (max-width: 800px) {
                    #filterListBody {
                        width: 90%;
                        margin-left: -45%;
                    }
                }
            `);
            dacLinksCon = filterListContainer.querySelector("#dacLinksCon");
            shadowContainer = document.createElement("div");
            shadowContainer.id = "download-all-content";
            document.body.appendChild(shadowContainer);
            let shadow = shadowContainer.attachShadow({ mode: "open" });
            shadow.appendChild(listStyle);
            shadow.appendChild(filterListContainer);
        }
        if (shadowContainer.parentNode) shadowContainer.parentNode.removeChild(shadowContainer);
        linkDict = {};
        list.forEach(a => {
            createLinkItem(a);
        });
        dacUseIframe.checked = useIframe;
        document.body.appendChild(shadowContainer);
    }

    function initTxtDownDiv() {
        if (txtDownContent) {
            txtDownContent.style.display = "";
            document.body.appendChild(downTxtShadowContainer);
            return;
        }
        txtDownContent = document.createElement("div");
        txtDownContent.id = "txtDownContent";
        downTxtShadowContainer = document.createElement("div");
        document.body.appendChild(downTxtShadowContainer);
        let shadow = downTxtShadowContainer.attachShadow({ mode: "open" });
        shadow.appendChild(txtDownContent);
        txtDownContent.innerHTML = createHTML(`
            <style>
            #txtDownContent>div{
              font-size:16px;
              color:#333333;
              width:342px;
              height:110px;
              position:fixed;
              left:50%;
              top:50%;
              margin-top:-25px;
              margin-left:-171px;
              z-index:2147483647;
              background-color:#ffffff;
              border:1px solid #afb3b6;
              border-radius:10px;
              opacity:0.95;
              filter:alpha(opacity=95);
              box-shadow:5px 5px 20px 0px #000;
            }
            #txtDownWords{
              position:absolute;
              width:275px;
              height: 90px;
              max-height: 90%;
              border: 1px solid #f3f1f1;
              padding: 8px;
              border-radius: 10px;
              overflow: auto;
            }
            #txtDownQuit{
              width: 30px;height: 30px;border-radius: 30px;position:absolute;right:2px;top:2px;cursor: pointer;background-color:#ff5a5a;
            }
            #txtDownQuit>span{
              height: 30px;line-height: 30px;display:block;color:#FFF;text-align:center;font-size: 12px;font-weight: bold;font-family: arial;background: initial; float: initial;
            }
            #txtDownQuit+div{
              position:absolute;right:0px;bottom:2px;cursor: pointer;max-width:85px;
            }
            #txtDownQuit+div>button{
              background: #008aff;border: 0;padding: 5px;border-radius: 6px;color: white;float: right;margin: 1px;height: 25px;line-height: 16px;cursor: pointer;overflow: hidden;
            }
            </style>
            <div>
                <div id="txtDownWords">
                    Analysing......
                </div>
                <div id="txtDownQuit">
                    <span>╳</span>
                </div>
                <div>
                    <button id="abortRequest" style="display:none;">${getI18n('abort')}</button>
                    <button id="tempSaveTxt">${getI18n('save')}</button>
                    <button id="saveAsMd" title="${getI18n('saveAsMd')}">Markdown</button>
                    <button id="saveAsJSON" title="${getI18n('saveAsJSON')}">JSON</button>
                </div>
            </div>`);
        txtDownWords=txtDownContent.querySelector("#txtDownWords");
        txtDownQuit=txtDownContent.querySelector("#txtDownQuit");
        txtDownQuit.onclick=function(){
            txtDownContent.style.display="none";
        };
        initTempSave(txtDownContent);
        win.txtDownWords = txtDownWords;
    }

    function saveContent() {
        if (win.downloadAllContentSaveAsZip && saveAsZip) {
            win.downloadAllContentSaveAsZip(rCats, i18n.info.replace("#t#", location.href), content => {
                saveAs(content, document.title.replace(/[\*\/:<>\?\\\|\r\n,]/g, "_") + ".zip");
            });
        } else {
            var blob = new Blob([i18n.info.replace("#t#", location.href) + "\r\n\r\n" + rCats.join("\r\n\r\n")], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title.replace(/[\*\/:<>\?\\\|\r\n,]/g, "_") + ".txt");
        }
    }

    function initTempSave(txtDownContent){
        var tempSavebtn = txtDownContent.querySelector('#tempSaveTxt');
        var abortbtn = txtDownContent.querySelector('#abortRequest');
        var saveAsMd = txtDownContent.querySelector('#saveAsMd');
        var saveAsJSON = txtDownContent.querySelector('#saveAsJSON');

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
            saveAs(blob, document.title.replace(/[\*\/:<>\?\\\|\r\n,]/g, "_") + ".md");
        }
        saveAsJSON.onclick = function(){
            let txt = [];
            rCats.forEach(cat => {
                let catArr = cat.split("\r\n", 3);
                let saveUrl = GM_getValue("saveUrl");
                let catJson = {
                    title: catArr[0].trim(),
                    content: catArr[1].trim()
                };
                if (saveUrl){
                    catJson = {
                        title: catArr[0].trim(),
                        url: catArr[1].trim(),
                        content: catArr[2].trim()
                    };
                }
                txt.push(catJson);
            });
            txt = JSON.stringify(txt, null, 2);
            var blob = new Blob([txt], {type: "text/plain;charset=utf-8"});
            saveAs(blob, document.title.replace(/[\*\/:<>\?\\\|\r\n,]/g, "_") + ".json");
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
        const minute=60000;
        var minTxtLength=GM_getValue("minTxtLength") || 100;
        var customTitle=GM_getValue("customTitle");
        var prefix=GM_getValue("prefix");
        var disableNextPage=!!GM_getValue("disableNextPage");
        var customNextPageReg=GM_getValue("nextPageReg");
        var maxDlPerMin=GM_getValue("maxDlPerMin") || 0;
        var dlCount=0;
        if (customNextPageReg) {
            try {
                innerNextPage = new RegExp(customNextPageReg);
            } catch(e) {
                console.warn(e);
            }
        }
        var linkIndex = 1;
        function packLink(doc, item) {
            if (customTitle) {
                try {
                    let title = doc.querySelector(customTitle);
                    if (title && title.innerText) {
                        item.innerText = title.innerText;
                    }
                } catch(e) {
                    console.warn(e);
                }
            }
            if (prefix) {
                item.innerText = prefix.replace(/\$i/g, linkIndex) + item.innerText;
                linkIndex++;
            }
        }
        var insertSigns=[];
        // var j=0,rCats=[];
        var downIndex=0,downNum=0,downOnce=function(wait){
            if(downNum>=aEles.length)return;
            if(maxDlPerMin){
                if(dlCount===-1){
                    setTimeout(() => {
                        downOnce(wait);
                    }, minute);
                    return;
                }else if(dlCount>=maxDlPerMin){
                    dlCount=-1;
                    setTimeout(() => {
                        dlCount=0;
                        downOnce(wait);
                    }, minute);
                    return;
                }else dlCount++;
            }
            let curIndex=downIndex;
            let aTag=aEles[curIndex];
            let request=(aTag, curIndex)=>{
                if (aTag && aTag.cloneNode) {
                    aTag = aTag.cloneNode(true);
                }
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
                        onload: async function(result) {
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
                            let nextPages = !disableNextPage && !processFunc && await checkNextPage(doc, base ? base.href : aTag.href);
                            if (nextPages) {
                                if (!nextPages.length) nextPages = [nextPages];
                                nextPages.forEach(nextPage => {
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
                                });
                            }
                            if (result.status >= 400) {
                                console.warn("error:", `status: ${result.status} from: ${aTag.href}`);
                            } else {
                                console.log(result.status);
                            }
                            packLink(doc, aTag);
                            let validData = processDoc(curIndex, aTag, doc, (result.status>=400?` status: ${result.status} from: ${aTag.href} `:""), validTimes < 5);
                            if (!validData && validTimes++ < 5) {
                                downIndex--;
                                downNum--;
                                setTimeout(() => {
                                    requestDoc();
                                }, Math.random() * 500 + validTimes * 1000);
                                return;
                            }
                            if (wait) {
                                setTimeout(() => {
                                    downOnce(wait);
                                }, wait);
                            } else downOnce();
                        },
                        onerror: function(e) {
                            console.warn("error:", e, aTag.href);
                            if(tryTimes++ < 5){
                                setTimeout(() => {
                                    requestDoc();
                                }, Math.random() * 500 + tryTimes * 1000);
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
                            console.warn("timeout: times="+(tryTimes+1)+" url="+aTag.href);
                            //console.log(e);
                            if(tryTimes++ < 5){
                                setTimeout(() => {
                                    requestDoc();
                                }, Math.random() * 500 + tryTimes * 1000);
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
                    let iframe = document.createElement('iframe'), inited = false, failedTimes = 0;
                    let loadtimeout;
                    let loadIframe = src => {
                        iframe.src = src;
                        clearTimeout(loadtimeout);
                        loadtimeout = setTimeout(() => {
                            iframe.src = src;
                        }, 20000);
                    };
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
                        clearTimeout(loadtimeout);
                        async function checkIframe() {
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
                                if (!processFunc && validTimes++ > 5 && failedTimes++ < 2) {
                                    loadIframe(iframe.src);
                                    validTimes = 0;
                                    inited = false;
                                    return;
                                }
                                let base = doc.querySelector("base");
                                let nextPages = !disableNextPage && !processFunc && await checkNextPage(doc, base ? base.href : aTag.href);
                                if (nextPages) {
                                    if (!nextPages.length) nextPages = [nextPages];
                                    nextPages.forEach(nextPage => {
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
                                    });
                                }
                                packLink(doc, aTag);
                                downIndex++;
                                downNum++;
                                let validData = processDoc(curIndex, aTag, doc, "", failedTimes < 2);
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
                    loadIframe(aTag.href);
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
                let isHref = "";
                let saveUrl = GM_getValue("saveUrl");
                if (saveUrl){
                    isHref = aTag.href + '\r\n';
                }
                rCats[i]=(aTag.innerText.replace(/[\r\n\t]/g, "") + "\r\n" + isHref + (cause || '') + content.replace(/\s*$/, ""));
                curRequests = curRequests.filter(function(e){return e[0]!=i});
                txtDownContent.style.display="block";
                txtDownWords.innerHTML=getI18n("downloading",[downNum,(aEles.length-downNum),aTag.innerText]);
                if(downNum==aEles.length){
                    if(waitForComplete) clearTimeout(waitForComplete);
                    waitForComplete=setTimeout(()=>{
                        if(downNum==aEles.length){
                            txtDownWords.innerHTML=getI18n("complete",[downNum]);
                            sortInnerPage();
                            var disableAutoStartSave = GM_getValue("disableAutoStartSave");
                            if(!disableAutoStartSave){
                                saveContent();
                            }
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
        }
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

    async function checkNextPage(doc, baseUrl) {
        let nextPage = null;
        if (nextPageFunc) {
            nextPage = await nextPageFunc(doc, baseUrl);
            if (nextPage && nextPage.length === 0) nextPage = null;
        } else {
            let aTags = doc.querySelectorAll("a");
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
        if(doc.body && !doc.body.children.length)return doc.body.innerText;
        if(processFunc){
            return processFunc(doc, cb, url);
        }
        [].forEach.call(doc.querySelectorAll("span,div,ul"),function(item){
            var thisStyle=doc.defaultView?doc.defaultView.getComputedStyle(item):item.style;
            if(thisStyle && (thisStyle.display=="none" || (item.nodeName=="SPAN" && thisStyle.fontSize=="0px"))){
                item.innerHTML="";
            }
        });
        var i,j,k,rStr="",pageData=(doc.body?doc.body:doc).cloneNode(true);
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
        [].forEach.call(pageData.querySelectorAll("script,style,link,noscript,iframe"),function(item){
            if (item && item.parentNode) {
                item.parentNode.removeChild(item);
            }
        });
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
        function getContentByLargest() {
            var childlist=pageData.querySelectorAll(largestContent.nodeName);//+(largestContent.className?"."+largestContent.className.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, '.'):""));
            function getRightStr(ele, noTextEnable){
                [].forEach.call(ele.querySelectorAll("a[href]"), a => {
                    a.parentNode && a.parentNode.removeChild(a);
                });
                if(retainImage){
                    [].forEach.call(ele.querySelectorAll("img[src]"), img => {
                        let imgTxtNode=document.createTextNode(`![img](${canonicalUri(img.getAttribute("src"), url || location.href)})`);
                        img.parentNode.replaceChild(imgTxtNode, img);
                    });
                }
                let childNodes=ele.childNodes,cStr="\r\n",hasText=false;
                for(let j=0;j<childNodes.length;j++){
                    let childNode=childNodes[j];
                    if(childNode.nodeType==3 && childNode.data && !/^[\s\-\_\?\>\|]*$/.test(childNode.data))hasText=true;
                    if(childNode.innerHTML){
                        childNode.innerHTML=childNode.innerHTML.replace(/\<\s*br\s*\>/gi,"\r\n").replace(/\n+/gi,"\n").replace(/\r+/gi,"\r");
                    }
                    let content=childNode.textContent;
                    if(content){
                        if(!content.trim())continue;
                        cStr+=content.replace(/[\uFEFF\xA0 ]+/g," ").replace(/([^\r]|^)\n([^\r]|$)/gi,"$1\r\n$2");
                    }
                    if(childNode.nodeType!=3 && !/^(I|A|STRONG|B|FONT|IMG)$/.test(childNode.nodeName))cStr+="\r\n";
                    else if(childNode.nextSibling && /^P$/.test(childNode.nextSibling.nodeName))cStr+="\r\n";
                }
                if(hasText || noTextEnable || ele==largestContent)rStr+=cStr+"\r\n";
            }
            var sameDepthChildren=[];
            for(i=0;i<childlist.length;i++){
                var child=childlist[i];
                if(getDepth(child)==getDepth(largestContent)){
                    if(largestContent.className != child.className)continue;
                    sameDepthChildren.push(child);
                }
            }
            var minLength = largestNum>>2;
            var tooShort = sameDepthChildren.length <= 3;
            sameDepthChildren.forEach(child => {
                if(tooShort && child.innerText.length < minLength) return;
                if((largestContent.className && largestContent.className == child.className) || largestContent.parentNode == child.parentNode){
                    getRightStr(child, true);
                }else {
                    getRightStr(child, false);
                }
            });
            rStr = rStr.replace(/[\n\r]+/g,"\n\r");
        }
        getContentByLargest();
        if (rStr.length < 100) {
            let articles = pageData.querySelectorAll("article");
            if (articles && articles.length == 1) {
                largestContent = articles[0];
                largestNum = largestContent.innerText.length;
                if (largestNum > 100) {
                    rStr = "";
                    getContentByLargest();
                }
            }
        }
        return rStr;
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

    async function sleep(time) {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    }

    async function fetch(forceSingle){
        forceSingle=forceSingle===true;
        processFunc=null;
        initTxtDownDiv();
        var aEles=document.body.querySelectorAll("a"),list=[];
        txtDownWords.innerHTML=`Analysing ( 1/${aEles.length} )......`;
        txtDownContent.style.pointerEvents="none";
        for(var i=0;i<aEles.length;i++){
            if (i % 100 == 0) {
                await sleep(1);
            }
            txtDownWords.innerHTML=`Analysing ( ${i + 1}/${aEles.length} )......`;
            var aEle=aEles[i],has=false;
            if(aEle.dataset.href && (!aEle.href || aEle.href.indexOf("javascript")!=-1)){
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
        txtDownContent.style.display="none";
        txtDownContent.style.pointerEvents="";
        txtDownWords.innerHTML="Analysing......";
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
                        if(e.className)cssSelStr+="."+CSS.escape(e.className.replace(/\s+/g, ".")).replace(/\\\./g, '.');
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
            if (evalCode) {
                evalCode = evalCode.trim();
                if (/^iframe:/.test(evalCode)) {
                    evalCode = evalCode.replace("iframe:", "");
                    useIframe = true;
                    iframeSandbox = false;
                    iframeInit = false;
                    while (/^(sandbox|init):/.test(evalCode)) {
                        iframeSandbox = evalCode.match(/^sandbox:\{(.*?)\}/);
                        if (iframeSandbox) {
                            evalCode = evalCode.replace(iframeSandbox[0], "");
                            iframeSandbox = iframeSandbox[1];
                        }
                        iframeInit = evalCode.match(/^init:\{(.*?)\}/);
                        if (iframeInit) {
                            evalCode = evalCode.replace(iframeInit[0], "");
                            iframeInit = iframeInit[1];
                        }
                    }
                }
                let charsetMatch = evalCode.match(/^charset:{(.+?)}/);
                if (charsetMatch) {
                    charset = charsetMatch[1];
                    evalCode = evalCode.replace(charsetMatch[0], "");
                }
                let nextMatch = evalCode.match(/^next:(\{+)/);
                if (nextMatch) {
                    let splitLen = nextMatch[1].length;
                    nextMatch = evalCode.match(new RegExp(`^next:\\{{${splitLen}}(.*?)\\}{${splitLen}}`));
                    if (nextMatch) {
                        let nextCode = nextMatch[1];
                        evalCode = evalCode.replace(nextMatch[0], "");
                        nextPageFunc = async (doc, url) => {
                            let result;
                            if (/\breturn\b/.test(nextCode)) {
                                result = await new AsyncFunction('doc', 'url', '"use strict";' + nextCode)(doc, url);
                            } else {
                                try {
                                    result = doc.querySelectorAll(nextCode);
                                    if (result && result.length) {
                                        [].forEach.call(result, ele => {
                                            ele.href = canonicalUri(ele.getAttribute("href"), url || location.href);
                                        });
                                    } else result = null;
                                } catch(e) {}
                            }
                            return result;
                        }
                    }
                }
            }
            if(evalCode){
                processFunc=(data, cb, url)=>{
                    let doc=data;
                    if(evalCode.indexOf("return ")==-1){
                        if(evalCode.indexOf("@")==0){
                            let content="";
                            var selectors=GM_getValue("selectors");
                            if(selectors){
                                [].forEach.call(data.querySelectorAll(selectors),function(item){
                                    item.innerHTML="";
                                });
                            }
                            [].forEach.call(data.querySelectorAll("script,style,link,noscript,iframe"),function(item){
                                if (item && item.parentNode) {
                                    item.parentNode.removeChild(item);
                                }
                            });
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
    var downloadShortcut = GM_getValue("downloadShortcut") || {ctrlKey: true, shiftKey: false, altKey: false, metaKey: false, key: 'F9'};
    var downloadSingleShortcut = GM_getValue("downloadSingleShortcut") || {ctrlKey: true, shiftKey: true, altKey: false, metaKey: false, key: 'F9'};
    var downloadCustomShortcut = GM_getValue("downloadCustomShortcut") || {ctrlKey: true, shiftKey: false, altKey: true, metaKey: false, key: 'F9'};

    var enableTouch = GM_getValue("enableTouch");
    if (enableTouch) {
        const minLength = 256, tg = 0.5, atg = 2;
        var lastX, lastY, signs, lastSign;
        function tracer(e) {
            let curX = e.changedTouches[0].clientX, curY = e.changedTouches[0].clientY;
            let distanceX = curX - lastX, distanceY = curY - lastY;
            let distance = distanceX * distanceX + distanceY * distanceY;
            if (distance > minLength) {
                lastX = curX;
                lastY = curY;
                let direction = "";
                let slope = Math.abs(distanceY / distanceX);
                if (slope > atg) {
                    if (distanceY > 0) {
                        direction = "↓";
                    } else {
                        direction = "↑";
                    }
                } else if (slope < tg) {
                    if (distanceX > 0) {
                        direction = "→";
                    } else {
                        direction = "←";
                    }
                }
                if (direction && lastSign != direction) {
                    signs += direction;
                    lastSign = direction;
                }
            }
        }
        document.addEventListener("touchstart", function(e) {
            lastX = e.changedTouches[0].clientX;
            lastY = e.changedTouches[0].clientY;
            lastSign = signs = "";
            document.addEventListener("touchmove", tracer, false);
        }, false);
        document.addEventListener("touchend", function(e) {
            document.removeEventListener("touchmove", tracer, false);
            if (signs == "→↓←↑") {
                e.stopPropagation();
                e.preventDefault();
                startCustom();
            }
        }, false);
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
        function formatShortcut(e) {
            let result = [];
            if (e.ctrlKey) {
                result.push("Ctrl");
            }
            if (e.shiftKey) {
                result.push("Shift");
            }
            if (e.altKey) {
                result.push("Alt");
            }
            if (e.metaKey) {
                result.push("Meta");
            }
            result.push(e.key);
            return result.join(" + ");
        }
        function geneShortcutData(str) {
            if (!str) return "";
            let result = {ctrlKey: false, shiftKey: false, altKey: false, metaKey: false, key: ''};
            str.split(" + ").forEach(item => {
                switch(item) {
                    case "Ctrl":
                        result.ctrlKey = true;
                        break;
                    case "Shift":
                        result.shiftKey = true;
                        break;
                    case "Alt":
                        result.altKey = true;
                        break;
                    case "Meta":
                        result.metaKey = true;
                        break;
                    default:
                        result.key = item;
                        break;
                }
            });
            return result;
        }
        let showFilterList = createOption(i18n.showFilterList, !!GM_getValue("showFilterList"), "checkbox");
        let downloadShortcutInput = createOption(i18n.downloadShortcut, formatShortcut(downloadShortcut) || "");
        let downloadSingleShortcutInput = createOption(i18n.downloadSingleShortcut, formatShortcut(downloadSingleShortcut) || "");
        let downloadCustomShortcutInput = createOption(i18n.downloadCustomShortcut, formatShortcut(downloadCustomShortcut) || "");
        downloadShortcutInput.setAttribute("readonly", "true");
        downloadSingleShortcutInput.setAttribute("readonly", "true");
        downloadCustomShortcutInput.setAttribute("readonly", "true");
        downloadShortcutInput.style.cursor = "cell";
        downloadSingleShortcutInput.style.cursor = "cell";
        downloadCustomShortcutInput.style.cursor = "cell";
        let keydonwHandler = e => {
            if (e.key) {
                if (e.key == "Backspace") {
                    e.target.value = "";
                } else if (e.key != "Control" && e.key != "Shift" && e.key != "Alt" && e.key != "Meta") {
                    e.target.value = formatShortcut(e);
                }
            }
            e.preventDefault();
            e.stopPropagation();
        };
        downloadShortcutInput.addEventListener("keydown", keydonwHandler);
        downloadSingleShortcutInput.addEventListener("keydown", keydonwHandler);
        downloadCustomShortcutInput.addEventListener("keydown", keydonwHandler);
        let enableTouchInput = createOption(i18n.enableTouch, !!enableTouch, "checkbox");

        let delSelector = createOption(i18n.del, GM_getValue("selectors") || "");
        delSelector.setAttribute("placeHolder", ".mask,.ksam");
        let downThreadNum = createOption(i18n.downThreadNum, GM_getValue("downThreadNum") || "20", "number");
        let maxDlPerMin = createOption(i18n.maxDlPerMin, GM_getValue("maxDlPerMin") || "0", "number");
        let customTitle = createOption(i18n.customTitle, GM_getValue("customTitle") || "");
        let saveUrl = createOption(i18n.saveUrl, !!GM_getValue("saveUrl"), "checkbox");
        let disableAutoStartSave = createOption(i18n.disableAutoStartSave, !!GM_getValue("disableAutoStartSave"), "checkbox");
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
        let reverse = createOption(i18n.reverseOrder, !!GM_getValue("reverse"), "checkbox");
        let prefix = createOption(i18n.prefix, GM_getValue("prefix") || "");
        let disableNextPage = !!GM_getValue("disableNextPage");
        let nextPage = createOption(i18n.nextPage, !disableNextPage, "checkbox");
        let nextPageReg = createOption(i18n.nextPageReg, GM_getValue("nextPageReg") || "");
        let retainImage = createOption(i18n.retainImage, !!GM_getValue("retainImage"), "checkbox");
        prefix.setAttribute("placeHolder", "第 $i 章：");
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
            GM_setValue("downThreadNum", parseInt(downThreadNum.value || 20));
            GM_setValue("maxDlPerMin", parseInt(maxDlPerMin.value || 20));
            GM_setValue("minTxtLength", parseInt(minTxtLength.value || 100));
            GM_setValue("customTitle", customTitle.value || "");
            GM_setValue("disableAutoStartSave", disableAutoStartSave.checked);
            GM_setValue("saveUrl", saveUrl.checked);
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
            GM_setValue("enableTouch", enableTouchInput.checked);
            GM_setValue("retainImage", retainImage.checked);
            GM_setValue("showFilterList", showFilterList.checked);
            GM_setValue("disableNextPage", !nextPage.checked);
            GM_setValue("nextPageReg", nextPageReg.value || "");
            GM_setValue("prefix", prefix.value || "");
            GM_setValue("downloadShortcut", geneShortcutData(downloadShortcutInput.value) || "");
            GM_setValue("downloadSingleShortcut", geneShortcutData(downloadSingleShortcutInput.value) || "");
            GM_setValue("downloadCustomShortcut", geneShortcutData(downloadCustomShortcutInput.value) || "");
            alert(i18n.saveOk);
        };
        return;
    }

    function setDel(){
        GM_openInTab(configPage + "#操作說明", {active: true});
    }

    function checkKey(shortcut1, shortcut2) {
        return shortcut1.ctrlKey == shortcut2.ctrlKey && shortcut1.shiftKey == shortcut2.shiftKey && shortcut1.altKey == shortcut2.altKey && shortcut1.metaKey == shortcut2.metaKey && shortcut1.key == shortcut2.key;
    }

    function startCustom() {
        var customRules = GM_getValue("DACrules_" + document.domain);
        var urls = window.prompt(i18n.customInfo + ":\nhttps://xxx.xxx/book-[20-99].html, https://xxx.xxx/book-[01-10].html", customRules || "");
        if (urls) {
            customDown(urls);
        }
    }

    document.addEventListener("keydown", function(e) {
        if (checkKey(downloadCustomShortcut, e)) {
            startCustom();
        } else if (checkKey(downloadSingleShortcut, e)) {
            fetch(true);
        } else if (checkKey(downloadShortcut, e)) {
            fetch(false);
        }
    });
    GM_registerMenuCommand(i18n.custom, () => {
        startCustom();
    });
    GM_registerMenuCommand(i18n.fetch, fetch);
    GM_registerMenuCommand(i18n.setting, setDel);
    GM_registerMenuCommand(i18n.searchRule, searchRule);
})();
