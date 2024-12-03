// ==UserScript==
// @name         DownloadAllContent ZIP addon
// @name:zh-CN   怠惰小说下载器 ZIP 扩展
// @name:zh-TW   怠惰小説下載器 ZIP 擴充
// @namespace    hoothin
// @version      0.6.1
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
    const threadNum = 20;//圖片下載綫程數
    const ocrApi = "";
    //const ocrApi = "http://127.0.0.1:416/?img=%t";//ocr 識別 api
    var _unsafeWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var zipTips, loadingImgs = [], loadingIndex = 0, loadedNum = 0, ocrNum = 0, zip, blobDict = {}, ocrDict = {};

    async function dataURLToBlob(dataurl, ext = "jpeg") {
        return await new Promise((resolve) => {
            if (!dataurl) return resolve(null);
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.setAttribute("crossOrigin", "anonymous");
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for(var i = 0; i < imageData.data.length; i += 4) {
                    if(imageData.data[i + 3] == 0) {
                        imageData.data[i] = 255;
                        imageData.data[i + 1] = 255;
                        imageData.data[i + 2] = 255;
                        imageData.data[i + 3] = 255;
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                canvas.toBlob(blob => {
                    resolve(blob);
                }, `image/${ext}`);
            };
            img.onerror = function() {
                resolve(null);
            };
            img.src = dataurl;
        });
    }

    async function blobToDataURL(blob) {
        return await new Promise((resolve) => {
            var a = new FileReader();
            a.readAsDataURL(blob);
            a.onload = function (e) {
                resolve(e.target.result);
            };
            a.onerror = function (e) {
                resolve(null);
            };
        });
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
                onload: async function(d) {
                    resolve(d.response);
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
        if (loadedNum >= loadingImgs.length || loadingIndex >= loadingImgs.length) return;
        let i = loadingIndex;
        loadingIndex++;
        let src = loadingImgs[i];
        let blob = await urlToBlob(src);
        if (blob) {
            zip.file("imgs/" + i + ".jpg", blob);
            zipTips.innerText = `Download images ${loadedNum + "/" + loadingImgs.length}...`;
            blobDict[src] = blob;
        }
        loadedNum++;
        if (loadedNum >= loadingImgs.length) {
            if (ocrApi) {
                loadingIndex = 0;
                let length = Math.min(loadingImgs.length, threadNum);
                for (let i = 0; i < length; i++) {
                    recognizeImage(cb);
                }
            } else {
                cb();
            }
        } else downloadImage(cb);
    }

    async function recognizeImage(cb) {
        if (ocrNum >= loadingImgs.length || loadingIndex >= loadingImgs.length) return;
        let i = loadingIndex;
        loadingIndex++;
        let src = loadingImgs[i];
        let dataURL = await blobToDataURL(blobDict[src]);
        let blob = await dataURLToBlob(dataURL, "jpeg");
        dataURL = await blobToDataURL(blob);
        let result = await new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: ocrApi.replace("%t", encodeURIComponent(dataURL.replace("data:image/jpeg;base64,", ""))),
                timeout:20000,
                onload: function(d) {
                    resolve(d.response);
                },
                onerror: function() {
                    resolve(null);
                },
                ontimeout: function() {
                    resolve(null);
                }
            });
        });
        ocrNum++;
        zipTips.innerText = `Recognize images ${ocrNum + "/" + loadingImgs.length}...`;
        if (result) {
            ocrDict[i] = result;
        }
        if (ocrNum >= loadingImgs.length) {
            cb();
        } else recognizeImage(cb);
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
        loadingIndex = 0;
        loadedNum = 0;
        ocrNum = 0;
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
        let zipTemp = [];
        for (let i = 0; i < rCats.length; i++) {
            let cat = rCats[i];
            if (!cat) continue;
            let catTitle = cat.match(/.*?\r\n/);
            if (!catTitle) continue;
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
            zipTemp.push({title: catTitle.replace(/[\*\/:<>\?\\\|\r\n]/g, "_").slice(0, 50), hasImg: hasImg, content: cat});
        }
        downloadImages(() => {
            zipTemp.forEach(d => {
                if (ocrApi) {
                    d.hasImg = false;
                    Object.keys(ocrDict).forEach(key => {
                        d.content = d.content.replace(new RegExp(`!\\[img\\]\\(imgs/${key}\\.jpg\\)`, 'g'), ocrDict[key]);
                    });
                }
                zip.file(d.title + (d.hasImg ? ".md" : ".txt"), d.content);
            });
            zip.generateAsync({type: "blob", compression: "DEFLATE"}, meta => {zipTips.innerText = "percent: " + ((meta && meta.percent && meta.percent.toFixed(2)) || "100") + "%"}).then(function(content){
                callback(content);
                zipTips.innerText = "";
            })
        });
    }
})();