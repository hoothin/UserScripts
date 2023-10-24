// ==UserScript==
// @name         DownloadAllContent ZIP addon
// @name:zh-CN   怠惰小说下载器 ZIP 扩展
// @name:zh-TW   怠惰小説下載器 ZIP 擴充
// @namespace    hoothin
// @version      0.3
// @description  Save content as ZIP for DownloadAllContent
// @description:zh-CN  下载时分章节保存 TXT 并打包为 ZIP
// @description:zh-TW  下載時分章節儲存 TXT 並打包為 ZIP
// @author       hoothin
// @match        *://*/*
// @grant        unsafeWindow
// @require      https://unpkg.com/jszip@3.7.1/dist/jszip.js
// ==/UserScript==

(function() {
    'use strict';
    var _unsafeWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var zipTips;
    _unsafeWindow.downloadAllContentSaveAsZip = (rCats, info, callback) => {
        if (!zipTips) {
            zipTips = document.createElement("div");
        }
        if (!zipTips.parentNode) {
            let txtDownWords = document.getElementById("txtDownWords");
            if (txtDownWords) {
                txtDownWords.appendChild(zipTips);
            }
        }
        console.log("Begin compress to ZIP...");
        zipTips.innerText = "Begin compress to ZIP...";
        var zip = new JSZip();
        zip.file("readme.txt", info);
        var index = 1;
        rCats.forEach(cat => {
            let catTitle = cat.match(/.*?\r\n/);
            if (!catTitle) return;
            catTitle = catTitle[0].trim();
            zip.file(index++ + " - " + catTitle.replace(/[\*\/:<>\?\\\|\r\n]/g, "_").slice(0, 50) + ".txt", cat.replace(catTitle, "").replace(/^[\n\r]+/, ""));
        });
        zip.generateAsync({type: "blob", compression: "DEFLATE"}, meta => {zipTips.innerText = "percent: " + ((meta && meta.percent && meta.percent.toFixed(2)) || "100") + "%"}).then(function(content){
            callback(content);
            zipTips.innerText = "";
        })
    }
})();