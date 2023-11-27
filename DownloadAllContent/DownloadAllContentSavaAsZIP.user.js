// ==UserScript==
// @name         DownloadAllContent ZIP addon
// @name:zh-CN   怠惰小说下载器 ZIP 扩展
// @name:zh-TW   怠惰小説下載器 ZIP 擴充
// @namespace    hoothin
// @version      0.4
// @description  Save content as ZIP for DownloadAllContent
// @description:zh-CN  下载时分章节保存 TXT 并打包为 ZIP
// @description:zh-TW  下載時分章節儲存 TXT 並打包為 ZIP
// @author       hoothin
// @match        *://*/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @require      https://unpkg.com/jszip@3.7.1/dist/jszip.js
// ==/UserScript==

(function() {
    'use strict';
    const threadNum = 20;
    var _unsafeWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var zipTips, loadingImgs = [], loadingIndex = 0, loadedNum = 0, zip;

    function dataURLToCanvas(dataurl, cb) {
        if (!dataurl) return cb(null);
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            cb(canvas);
        };
        img.onerror = function() {
            cb(null);
        };
        img.src = dataurl;
    }

    async function urlToBlob(url) {
        return await new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                responseType:'blob',
                timeout:20000,
                headers: {
                    origin: location.origin,
                    referer: location.href,
                    accept: "*/*"
                },
                onload: function(d) {
                    let blob = d.response;
                    let ext = blob.type.replace(/.*image\/(\w+).*/, "$1");
                    if (ext == "webp") {
                        var self = this;
                        var a = new FileReader();
                        a.readAsDataURL(blob);
                        a.onload = function (e) {
                            dataURLToCanvas(e.target.result, canvas => {
                                canvas.toBlob(blob => {
                                    resolve(blob);
                                }, "image/png");
                            });
                        };
                        a.onerror = function (e) {
                            resolve(null);
                        }
                    } else {
                        resolve(blob);
                    }
                },
                onerror: function() {
                    resolve(null);
                },
                ontimeout: function() {
                    resolve(null);
                }
            });
        })
    }

    async function downloadImage(cb) {
        let i = loadingIndex;
        loadingIndex++;
        let src = loadingImgs[i];
        if (!src) return;
        let blob = await urlToBlob(src);
        if (blob) {
            zip.file("imgs/" + i + ".jpg", blob);
            zipTips.innerText = `Download images ${i + "/" + loadingImgs.length}...`;
        }
        loadedNum++;
        if (loadedNum >= loadingImgs.length) {
            cb();
        } else downloadImage(cb);
    }

    function downloadImages(cb) {
        let length = Math.min(loadingImgs.length, threadNum);
        if (length == 0) {
            return cb();
        }
        for (let i = 0; i < length; i++) {
            downloadImage(cb);
        }
    }

    const mdImgReg = /!\[img\]\((http.+?)\)/;
    _unsafeWindow.downloadAllContentSaveAsZip = async (rCats, info, callback) => {
        if (!zipTips) {
            zipTips = document.createElement("div");
        }
        if (!zipTips.parentNode) {
            let txtDownWords = _unsafeWindow.txtDownWords;
            if (txtDownWords) {
                txtDownWords.appendChild(zipTips);
            }
        }
        console.log("Begin compress to ZIP...");
        zipTips.innerText = "Begin compress to ZIP...";
        zip = new JSZip();
        zip.file("readme.txt", info);
        var index = 1;
        rCats.forEach(cat => {
            let catTitle = cat.match(/.*?\r\n/);
            if (!catTitle) return;
            catTitle = catTitle[0].trim();
            cat = cat.replace(catTitle, "").replace(/^[\n\r]+/, "");
            let imgMatch = cat.match(mdImgReg), hasImg = false;
            while (imgMatch) {
                let index = loadingImgs.indexOf(imgMatch[1]);
                if (index == -1) {
                    index = loadingImgs.length;
                    loadingImgs.push(imgMatch[1]);
                }
                cat = cat.replace(imgMatch[0], `![img](imgs/${index}.jpg)`);
                imgMatch = cat.match(mdImgReg);
                hasImg = true;
            }
            zip.file(index++ + " - " + catTitle.replace(/[\*\/:<>\?\\\|\r\n]/g, "_").slice(0, 50) + (hasImg ? ".md" : ".txt"), cat);
        });
        downloadImages(() => {
            zip.generateAsync({type: "blob", compression: "DEFLATE"}, meta => {zipTips.innerText = "percent: " + ((meta && meta.percent && meta.percent.toFixed(2)) || "100") + "%"}).then(function(content){
                callback(content);
                zipTips.innerText = "";
            })
        });
    }
})();